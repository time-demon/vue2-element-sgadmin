import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nowDate: {},// 现在的日期时间
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
