import Vue from 'vue'
import VueRouter from 'vue-router'
import network from "@/network";
import store from '@/store'

import { MessageBox } from 'element-ui'

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
            component: () => import(/* webpackChunkName: "后台首页" */ '../views/page'),
          },
          {
            path: 'about',
            name: 'about',
            meta: {
              title: '关于',
              icon: 'sg sg-',
            },
            component: () => import(/* webpackChunkName: "关于" */ '../views/page/about'),
            children: [
              {
                path: 'about',
                name: 'about',
                meta: {
                  title: '关于1',
                  icon: 'sg sg-',
                },
                component: () => import(/* webpackChunkName: "关于" */ '../views/page/about'),
              },
            ]
          },
          {
            path: 'roleManage',
            name: 'roleManage',
            meta: {
              title: '角色管理',
              icon: 'sg sg-',
            },
            component: () => import(/* webpackChunkName: "角色管理" */ '../views/page/roleManage'),
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

// 网页加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 路由信息
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// : [
//   {
//     path: '/:catchAll(.*)',
//     component: () => import(/* webpackChunkName: "关于" */ '../views/page/about'),
//     name: 'NotFound'
//   }
// ]

// 导航守卫 · 前
router.beforeEach((to, from, next) => {
  NProgress.start();// 开启网页加载进度条

  // 路由访问时判断是否登录
  if (to.fullPath == '/login') {// 排除页面
    if (localStorage.getItem('token') != null) {
      MessageBox.alert('您已登录，是否访问首页？', '温馨提示', {
        confirmButtonText: '确定',
        showClose: false,
        closeOnClickModal: false,
        duration: 100,
        callback: action => {
          next('/');
        }
      });
    }
  } else if (localStorage.getItem('token') == null) {// 如果访问的是其它路由而且token不存在，即为未登录
    localStorage.clear();
    MessageBox.alert('暂未登录，是否跳转登录？', '温馨提示', {
      confirmButtonText: '确定',
      showClose: false,
      closeOnClickModal: false,
      callback: action => {
        next('/login');
      }
    });
    return
  }

  // 通过云端设置网站名称
  network({
    url: 'api/cloudGet'
  }).then((res) => {
    store.state.siteConfig.title = res.data[0].title;
    document.title = to.meta.title + " - " + store.state.siteConfig.title;
  })

  // 本地设置网站名称
  // let Title='';
  // document.title = to.meta.title + " - " + Title;

  next();
});

// 导航守卫 · 后
router.afterEach((to, from) => {
  NProgress.done();// 结束网页加载进度条
})

export default router
