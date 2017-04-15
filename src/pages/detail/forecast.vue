<template>
  <div class="sales-board">
      <div class="sales-board-intro">
        <h2>数据预测</h2>
        <p>未来，大数据会变得越来越重要</p>
      </div>
      <div class="sales-board-form">
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  购买数量：
              </div>
              <div class="sales-board-line-right">
                  <v-counter :max="100" :min="20"></v-counter>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  媒介：
              </div>
              <div class="sales-board-line-right">
                  <v-mul-chooser :selections="versionList"></v-mul-chooser>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  有效时间：
              </div>
              <div class="sales-board-line-right">
                  一年
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  总价：
              </div>
              <div class="sales-board-line-right">
                  500 元
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">&nbsp;</div>
              <div class="sales-board-line-right">
                  <div class="button">
                    立即购买
                  </div>
              </div>
          </div>
      </div>
      <div class="sales-board-des">
        <h2>产品说明</h2>
        <p>2020年的一天，在你驱车前往公司的路上，导航系统通过预测交通流量，会自动帮你选择一条最合适的交通路线.</p>
      </div>
  </div>
</template>

<script>
import VCounter from '../../components/base/counter'
import VMulChooser from '../../components/base/multiplyChooser'
export default {
  components: {
     VMulChooser,
     VCounter
  },	
  data () {
	 return {
       versionList: [
        {
          label: '纸质报告',
          value: 0
        },
        {
          label: 'pdf',
          value: 1
        },
        {
          label: '页面报告',
          value: 2
        },
        {
          label: '邮件',
          value: 3
        }
      ]
	 }
  }	
}
</script>

<style scoped>
	
</style>