import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

// 网络请求
import network from "@/network";
Vue.prototype.$network = network;

// ElementUI 完整引入
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

// ElementUI 按需引入
import { Button, Loading, Breadcrumb, BreadcrumbItem, avatar, drawer, skeleton, SkeletonItem } from 'element-ui';
Vue.use(Button).use(avatar).use(Loading).use(Breadcrumb).use(BreadcrumbItem).use(drawer).use(skeleton).use(SkeletonItem);

// 计算当前时间
store.state.nowDate = {
  time: new Date().getTime(),// 时间戳
  year: new Date().getFullYear(),// 年
  month: new Date().getMonth() + 1,// 月
  date: new Date().getDate(),// 日
  week: new Date().getDay(),// 星期
  hours: new Date().getHours(),// 小时
  minutes: new Date().getMinutes(),// 分钟
  seconds: new Date().getSeconds(),// 秒数
};

new Vue({
  network,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
