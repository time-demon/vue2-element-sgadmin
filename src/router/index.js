import Vue from 'vue'
import VueRouter from 'vue-router'
import network from "@/network";
import store from '@/store'

// 路由
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "App模板 - 后台" */ '../App'),
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "后台模板" */ '../views'),
        redirect: 'index',
        children: [
          {
            path: 'index',
            name: 'index',
            meta: {
              title: '首页',
              icon: 'sg sg-dashboard',
            },
            component: () => import(/* webpackChunkName: "后台首页" */ '../components/page'),
          },
          {
            path: 'about',
            name: 'about',
            meta: {
              title: '关于',
              icon: 'sg sg-',
            },
            component: () => import(/* webpackChunkName: "后台关于" */ '../components/page/about'),
          },
          {
            path: 'roleManage',
            name: 'roleManage',
            meta: {
              title: '角色管理',
              icon: 'sg sg-',
            },
            component: () => import(/* webpackChunkName: "后台关于" */ '../components/page/roleManage'),
          },
        ]
      },
    ]
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: "App模板 - 登录注册" */ '../App'),
    children: [
      {
        path: 'login',
        name: 'login',
        meta: {
          title: '登录',
        },
        component: () => import(/* webpackChunkName: "登录" */ '../views/login'),
      },
      {
        path: 'register',
        name: 'register',
        meta: {
          title: '注册',
        },
        component: () => import(/* webpackChunkName: "注册" */ '../views/register'),
      },
    ]
  }
]

// 防止路由重复点击报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

// 路由信息
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  // 通过云端设置网站名称
  network({
    url: '/cloudGet'
  }).then((res) => {
    store.state.siteConfig.title = res.data[0].title;
    document.title = to.meta.title + " - " + store.state.siteConfig.title;
  })

  // 本地设置网站名称
  // let Title='';
  // document.title = to.meta.title + " - " + Title;

  next();
});

// 页面加载上方进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.afterEach((to, from) => {
  NProgress.done();
})

export default router
