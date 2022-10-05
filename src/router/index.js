import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

// 网页加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 路由
Vue.use(VueRouter)
// 防止路由重复点击报错
let routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err);
};

// 公共路由，不需要访问权限的路由
let routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "App模板 - 后台" */ '../views'),
    redirect: 'home',
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '首页',
          icon: 'sg sg-dashboard',
        },
        component: () => import(/* webpackChunkName: "后台模板" */ '../views/routesPage'),
      }, {
        path: 'baidumap',
        name: 'baidumap',
        meta: {
          title: '百度地图',
          icon: 'sg sg-dashboard',
        },
        component: () => import(/* webpackChunkName: "百度地图" */ '../views/routesPage/baidumap'),
      },
      {
        path: 'about',
        name: 'about',
        meta: {
          title: '关于',
          icon: 'sg sg-',
        },
        component: () => import(/* webpackChunkName: "关于" */ '../views/routesPage/about'),
        children: [
          {
            path: 'about',
            name: 'about',
            meta: {
              title: '关于1',
              icon: 'sg sg-',
            },
            component: () => import(/* webpackChunkName: "关于" */ '../views/routesPage/about'),
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
        component: () => import(/* webpackChunkName: "角色管理" */ '../views/routesPage/roleManage'),
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
    },
    component: () => import(/* webpackChunkName: "登录" */ '../views/login'),
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册',
    },
    component: () => import(/* webpackChunkName: "注册" */ '../views/register'),
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '404'
    },
    component: () => import(/* webpackChunkName: "404" */ '../views/404'),
  },
  {
    path: '*',
    redirect: '/404',
  }
]

// 需要访问权限的路由，前端自由化，后端只需要对name值进行权限标识(如{"path": "/baidumap1","roles": "admin"})，前端再通过传回的roles进行定向验证
let rolesRoutes = [{
  path: 'baidumap1',
  name: 'baidumap1',
  meta: {
    title: '百度地图1',
    icon: 'sg sg-dashboard',
  },
  component: () => import(/* webpackChunkName: "百度地图1" */ '../views/routesPage/baidumap'),
},
{
  path: 'baidumap2',
  name: 'baidumap2',
  meta: {
    title: '百度地图2',
    icon: 'sg sg-dashboard',
  },
  component: () => import(/* webpackChunkName: "百度地图2" */ '../views/routesPage/baidumap'),
}]

routes.push.apply(routes[0].children, rolesRoutes)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

import { MessageBox } from 'element-ui'
// 导航守卫 · 前
router.beforeEach((to, from, next) => {

  NProgress.start();// 开启网页加载进度条

  // 路由访问时判断是否登录
  if (to.fullPath == '/login' || to.fullPath == '/register') {// 当访问的是登陆注册页面
    if (localStorage.getItem('token') != null) {// 如果存在token
      MessageBox.alert('您已登录，是否访问首页？', '温馨提示', {
        confirmButtonText: '确定',
        showClose: false,
        closeOnClickModal: false,
        callback: action => {
          next('/');
        }
      });
    }
  } else if (localStorage.getItem('token') == null || localStorage.getItem('token') == undefined) {// 如果访问的是其它路由而且token不存在，即为未登录
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

  // 进行页面访问权限判断
  // 首页获取后端是否有当前页面的配置数据，从localStorage里获取，请在登录页面里的登录请求方法的回调里赋值
  // 这里采用的是通过name验证
  if (localStorage.getItem('routesRoles') != null) {// 如果已登录
    let thisPageDta = JSON.parse(localStorage.getItem('routesRoles')).filter(item => item.pathName == to.name);// 获取后端的路由权限配置
    if (thisPageDta.length != 0) {// 如果后端有该页面配置数据
      let thisPageRoles = thisPageDta[0].roles;// 获取当前页面的权限,是个数组
      let userRoles = JSON.parse(localStorage.getItem('userInfo')).roles;// 获取当前用户的权限标识
      if (thisPageRoles.length != 0) {// 如果当前页面已设置权限
        if (thisPageRoles.filter(item => item == userRoles).length == 0) {// 如果权限不匹配
          store.state.roles = false;// 权限不足
          MessageBox.alert('你无权访问当前页面！', '警告', {
            confirmButtonText: '确定',
            showClose: false,
            closeOnClickModal: false,
            callback: action => {
              next(from.fullPath);// 访问上一页
              NProgress.done();// 结束网页加载进度条
            }
          });
          return
        }
      }
    }
  }

  // 设置网站标题
  document.title = to.meta.title + ' - ' + store.state.siteInfo.title;// 本地获取路由标题

  next();
});

// 导航守卫 · 后
router.afterEach((to, from) => {
  NProgress.done();// 结束网页加载进度条
})

export default router
