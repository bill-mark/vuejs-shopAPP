import Vue from 'vue'

const state = {
   orderList:[],
   params:{}
}

//vuex规定不能直接从state调用orderlist，用getter中转
const getters = {
   getOrderList: state => state.orderList
}

//异步方法,可以调用mutations里的方法，使用时要提交mutation以便记录
const actions = {
   fetchOrderList ({commit,state}){
        Vue.http.post('http://localhost:3000/getOrderList',state.params)
        .then( (res)=>{
        	commit('updateOrderList',res.data.list)
        	state.total = res.data.total
        },(err)=>{

        })
   }
}

//同步方法 改变store状态
const mutations = {
    updateOrderList (state,payload) {
    	state.orderList = payload
    },      
    updateParams (state,payload) {
        state.params[payload.key] = payload.val
    } 
}

export default {
	state,
	getters,
	actions,
	mutations
}