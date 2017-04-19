<template>
  <div class="sales-board">
      <div class="sales-board-intro">
        <h2>流量分析</h2>
        <p>是指在获得网站访问量基本数据的情况下对有关数据进行统计、分析，</p>
      </div>
      <div class="sales-board-form">
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  购买数量：
              </div>
              <div class="sales-board-line-right">
                 <v-counter 
                    @on-change="onParamChange('buyNum',$event)"
                 >
                 </v-counter>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  产品类型：
              </div>
              <div class="sales-board-line-right">
                 <v-selection
                    :selections="buyTypes"
                    @on-change="onParamChange('buyType',$event)"
                 >
                 </v-selection>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  有效时间：
              </div>
              <div class="sales-board-line-right">
                 <v-chooser 
                   :selections="periodList"
                   @on-change="onParamChange('period',$event)"
                 >
                 </v-chooser>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  产品版本：
              </div>
              <div class="sales-board-line-right">
                  <v-mul-chooser 
                     :selections="versionList"
                     @on-change="onParamChange('versions',$event)"
                  >
                  </v-mul-chooser>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  总价：
              </div>
              <div class="sales-board-line-right">
                  {{ price }} 元
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">&nbsp;</div>
              <div class="sales-board-line-right">
                  <div class="button" 
                       @click="showPayDialog"
                  >
                    立即购买
                  </div>
              </div>
          </div>
      </div>
      <div class="sales-board-des">
        <h2>产品说明</h2>
        <p>网站访问统计分析报告的基础数据源于网站流量统计信息，</p>

        <h3>用户行为指标</h3>
        <ul>
          <li>用户行为指标主要反映用户是如何、访问了括：</li>
          <li>用户在网站的停留时间；</li>
        </ul>

        <h3>浏览网站方式</h3>
        <ul>
          <li>用户上网设备类型</li>
        </ul>
      </div>
      <my-dialog :is-show="isShowPayDialog"
                  @on-close="hidePayDialog"
      >
         <table class="buy-dialog-table">
            <tr>
               <th>购买数量</th>
               <th>产品类型</th>
               <th>有效时间</th>
               <th>产品版本</th>
               <th>总价</th>
            </tr>
            <tr>
               <td>{{ buyNum }}</td>
               <td>{{ buyType.label }}</td>
               <td>{{ period.label }}</td>
               <td>
                   <span v-for="item in versions">
                      {{ item.label }}
                   </span>
               </td>
               <td>{{ price }}</td>
            </tr>
         </table>
         <h3 class="buy-dialog-title">请选择银行</h3>
         <bank-chooser @on-change="onChangeBanks"></bank-chooser>
         <div class="button buy-dialog-btn" 
              @click="confirmBuy"
         >
           确认购买
         </div>
      </my-dialog>
      <my-dialog :is-show="isShowErrDialog" 
                 @on-close="hideErrDialog"
      >
           支付失败
      </my-dialog>
      <check-order :isShowCheckDialog="isShowCheckOrder"
                   order-id="orderId"
                   @on-close-check-dialog="hideCheckOrder"         
      >
      </check-order>
  </div>
</template>

<script>
import VSelection from '../../components/base/selection'
import VCounter from '../../components/base/counter'
import VChooser from '../../components/base/chooser'
import VMulChooser from '../../components/base/multiplyChooser'
import Dialog from '../../components/base/dialog'
import _ from 'lodash'
import BankChooser from '../../components/bankChooser'
import  CheckOrder from '../../components/checkOrder'
export default {
  components: {
     VSelection,
     VChooser,
     VCounter,
     VMulChooser,
     MyDialog: Dialog,
     BankChooser,
     CheckOrder
  },
  data () {
	 return {
      buyNum: 1,
      buyType: {},
      versions: [],
      period: {},
      price: 0,
      versionList: [
        {
          label: '客户版',
          value: 0
        },
        {
          label: '代理商版',
          value: 1
        },
        {
          label: '专家版',
          value: 2
        }
      ],
      periodList: [
        {
          label: '半年',
          value: 0
        },
        {
          label: '一年',
          value: 1
        },
        {
          label: '三年',
          value: 2
        }
      ],
      buyTypes: [
        {
          label: '入门版',
          value: 0
        },
        {
          label: '中级版',
          value: 1
        },
        {
          label: '高级版',
          value: 2
        }
      ],
      isShowPayDialog: false,
      bankId: null,
      orderId: null,
      isShowCheckOrder: false,
      isShowErrDialog: false
    }
  },
  methods: {
    onParamChange (attr,val) {
       this[attr] = val
       //console.log(attr,this[attr])
       this.getPrice()
    },
    getPrice () {
       let buyVersionsArray = _.map(this.versions,(item) => {
          return item.value
       })      
       let reqParams = {
        buyNumber: this.buyNum,
        buyType: this.buyType.value,
        period: this.period.value,
        version: buyVersionsArray.join(',')
       }
       this.$http.post('http://localhost:3000/getPrice',reqParams)
       .then((res) => {
           // let data = JSON.parse(res.data)
           this.price = res.data.amount
          // console.log(res)
       })
    },
    showPayDialog () {
        this.isShowPayDialog = true
    },
    hidePayDialog () {
       this.isShowPayDialog = false
    },
    hideErrDialog () {
       this.isShowErrDialog = false
    },
    hideCheckOrder () {
      this.isShowCheckOrder = false
    },
    onChangeBanks (bankObj) {
        this.bankId = bankObj.id
    },
    confirmBuy () {
       let buyVersionsArray = _.map(this.versions,(item) => {
          return item.value
       })      
       let reqParams = {
          buyNumber: this.buyNum,
          buyType: this.buyType.value,
          period: this.period.value,
          version: buyVersionsArray.join(','),
          bankId: this.bankId
       }
       this.$http.post('http://localhost:3000/createOrder',reqParams)
       .then((res) => {
           this.orderId = res.data.orderId
          // console.log(this.orderId)
           this.isShowCheckOrder= true  //弹出支付状态窗口
           this.isShowPayDialog = false
       },(err) => {
           this.isShowBuyDialog = false
           this.isShowErrDialog = true
       })
    }
  },
  mounted () {
     this.buyNum = 1
     this.buyType = this.buyTypes[0]
     this.versions = [this.versionList[0]]
     this.period = this.periodList[0]
     this.getPrice()
  }	
}
</script>

<style scoped>
.buy-dialog-title {
  font-size: 16px;
  font-weight: bold;
}
.buy-dialog-btn {
  margin-top: 20px;
}
.buy-dialog-table {
  width: 100%;
  margin-bottom: 20px;
}
.buy-dialog-table td,
.buy-dialog-table th{
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 5px 0;
}
.buy-dialog-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
}
</style>