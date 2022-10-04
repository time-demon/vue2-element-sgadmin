import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    viewSize: {},// 视口尺寸
    siteConfig: {
      title: '',
    },
    routeLabel: [],// 路由标签
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
