import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import shoppingCart from './modules/shoppingCart'
import comments from './modules/comments.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations,
  actions,
  modules: {
    shoppingCart,
    comments
  }
})
