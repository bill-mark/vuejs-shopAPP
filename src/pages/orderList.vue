<template>
  <div class="order-wrap">
    <h3>您的产品</h3>
    <div class="order-list-choose">
      <div class="order-list-option">
        选择产品：
        <v-selection :selections="products" @on-change="productChange">
        </v-selection>
      </div>
      
      <div class="order-list-option">
        选择产品2：
        <v-selection :selections="products" @on-change="productChange">
        </v-selection>
      </div>

      <div class="order-list-option">
        开始日期：
        <v-date-picker @on-change="getStartDate"></v-date-picker>
      </div>

      <div class="order-list-option">
        结束日期：
        <v-date-picker @on-change="getEndDate"></v-date-picker>
      </div>

      <div class="order-list-option">
        关键词：
        <input type="text" v-model.lazy="query" class="order-query">
      </div>
    </div>
    <div class="order-list-table">
      <table>
        <tr>
          <th v-for="head in tableHeads" 
              @click="changeOrderType(head)" 
              :class="{active:head.active}"
          >
            {{ head.label }}
          </th>
        </tr>
        <tr v-for="item in tableData" 
            :key="item.period"
        >
            <td v-for="head in tableHeads">
                {{ item[head.key] }}
            </td>
        </tr>
      </table>
      <div class="table-pagenation">
        <v-pagenation :total="total" 
                      :pageSize="pageSize"
                      @on-change="pageChange"
        >
        </v-pagenation>  
      </div>
    </div>
  </div>
</template>

<script>
import VSelection from '../components/base/selection'
import VDatePicker from '../components/base/datepicker'
import VPagenation from '../components/base/pagenation'
import _ from 'lodash'
export default {
  components: {
    VSelection,
    VDatePicker,
    VPagenation
  },
  data () {
    return {
      query: '',
      productId: 0,
      startDate: '',
      endDate: '',
      products: [
        {
          label: '数据统计',
          value: 0
        },
        {
          label: '数据预测',
          value: 1
        },
        {
          label: '流量分析',
          value: 2
        },
        {
          label: '广告发布',
          value: 3
        }
      ],
      tableHeads: [
        {
          label: '订单号',
          key: 'orderId'
        },
        {
          label: '购买产品',
          key: 'product'
        },
        {
          label: '版本类型',
          key: 'version'
        },
        {
          label: '有效时间',
          key: 'period'
        },
        {
          label: '购买日期',
          key: 'date'
        },
        {
          label: '数量',
          key: 'buyNum'
        },
        {
          label: '总价',
          key: 'amount'
        }
      ],
      currentOrder: 'asc',
     // tableData: [],
      pageSize: 10,
      offset: 0
    }
  },
  watch: {   //watch相对于计算属性computed能进行异步操作
    query () {
      this.getList()
    }
  },
  computed: {
    tableData () {  //mounted中ajax请求完成，tabledata会更新
       return this.$store.getters.getOrderList
    },
    total () {
       return this.$store.getters.getTotal
    } 
  },
  methods: {
    productChange (obj) {
      //同步
      this.$store.commit('updateParams',{
        key:'productId',
        val:obj.value
      }) //key和val用来更新vuex中的state中的params
      //异步
      this.$store.dispatch('fetchOrderList')
    },
    getStartDate (date) {
      this.$store.commit('updateParams',{
        key:'startDate',
        val:date
      })
    },
    getEndDate (date) {
      this.endDate = date
      this.getList()
    },
    pageChange (offset) {
      this.$store.commit('updateParams', {
        key: 'offset',
        val: offset * this.pageSize
      })
      this.$store.dispatch('refreshList')
    },
    getList () {
      let reqParams = {
        query: this.query,
        productId: this.productId,
        startDate: this.startDate,
        endDate: this.endDate,
        offset: this.offset,
        pageSizeL: this.pageSize
      }
      this.$http.get('http://localhost:3000/getOrderList', reqParams)
      .then((res) => {
        this.tableData = res.data.list
      }, (err) => {

      })
    },
    changeOrderType (headItem) {
      this.tableHeads.map((item) => {
        item.active = false
        return item
      })
      headItem.active = true
      if (this.currentOrder === 'asc') {
        this.currentOrder = 'desc'
      }
      else if (this.currentOrder === 'desc') {
        this.currentOrder = 'asc'
      }
      this.tableData = _.orderBy(this.tableData, headItem.key, this.currentOrder)
    }
  },
  mounted () {
    //ajax请求,通过dispatch调用store中的action
    this.$store.dispatch('fetchOrderList') 
    //console.log(this.$store)
  }
}
</script>

<style scoped>
.order-wrap {
  width: 1200px;
  min-height: 800px;
  margin: 20px auto;
  overflow: hidden;
}
.order-wrap h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.order-query {
  height: 25px;
  line-height: 25px;
  border: 1px solid #e3e3e3;
  outline: none;
  text-indent: 10px;
}
.order-list-option {
  display: inline-block;
  padding-left: 15px;
}
.order-list-option:first-child {
  padding-left: 0;
}
.order-list-table {
  margin-top: 20px;
}
.order-list-table table {
  width: 100%;
  background: #fff;
}
.order-list-table td,
.order-list-table th {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 10px 0;
}
.order-list-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
  cursor: pointer;
}
.order-list-table th.active {
  background: #35495e;
}
.table-pagenation {
  padding: 15px;
  text-align: right;
}
</style>

