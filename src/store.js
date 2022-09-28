import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartNum: 0
  },
  getters: {
    getCartNum(state){
      return state.cartNum
    }
  },
  mutations: {
    addCartNum(state, num){
      state.cartNum += num
    },
    subCartNum(state, num){
      state.cartNum -= num
    },
    changeCartNum(state, num){
      state.cartNum = num
    }
  },
  actions: {
    addCartNumAction({commit}, num){
      commit("addCartNum", num)
    },
    subCartNumAction({commit}, num){
      commit("subCartNum", num)
    }
  }
})
