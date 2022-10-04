import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

// 全局主题样式
import './assets/theme/theme.min.css'

// css默认样式重置文件
import '@/assets/css/normalize/normalize.min.css'

// ElemnetUI样式重置文件
import '@/assets/css/element/reset.min.css'

// 挂载网络请求
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

new Vue({
  network,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
