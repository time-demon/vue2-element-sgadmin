import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    viewSize: {},// 视口尺寸
    siteInfo: {// 网站信息
      title: '时光后台管理系统',
    },
    userInfo: {},
    routeLabel: [],// 路由标签
    roles: true,// 权限状态
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
