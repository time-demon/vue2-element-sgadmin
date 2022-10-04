import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局主题样式
import './assets/theme/theme.min.css'

// css默认样式重置器
import 'normalize.css'


Vue.config.productionTip = false;

// 网络请求
import network from "@/network";
Vue.prototype.$network = network;

// ElementUI 完整引入
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

// ElementUI 按需引入
import { Tooltip, Link, Col, Row, Collapse, CollapseItem, Button, Loading, Breadcrumb, BreadcrumbItem, avatar, drawer, skeleton, SkeletonItem, card, tag, Switch, Form, Input, Checkbox, Message, MessageBox, Alert } from 'element-ui';
Vue.use(Tooltip).use(Link).use(Col).use(Row).use(Collapse).use(CollapseItem).use(Button).use(avatar).use(Loading).use(Breadcrumb).use(BreadcrumbItem).use(drawer).use(skeleton).use(SkeletonItem).use(card).use(tag).use(Switch).use(Form).use(Input).use(Checkbox).use(Alert);
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;

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
