import { param } from 'jquery';
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

/* layout */
import Layout from '../views/layout/Layout';

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index').then(m => m.default),
    hidden: true
  },
  {
    path: '/Layout',
    component: () => import('@/views/layout/Layout').then(m => m.default),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index').then(m => m.default),
    hidden: true
  },
  {
    path: '/dashboard',
    component: () => import('@/views/dashboard/index').then(m => m.default),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      title: '首页',
    
    },
    alwaysShow: false,
        
    children: [
      {
      path: 'dashboard',
      component: () => import('@/views/dashboard/index').then(m => m.default),
      meta: {
        title: '首页',
        icon: '个人中心',
        keepAlive: true,
        iswhite:true
        
      },
    },
    // {
    //   path: 'home',
    //   component: () => import('@/views/home/index').then(m => m.default),
     
    // },
  ]
  },
  {
    path: '/authredirect',
    component: () => import('@/views/login/authredirect').then(m => m.default),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404').then(m => m.default),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401').then(m => m.default),
    hidden: true
  },
  {
    path: '/codeCallback',
    component: () => import('@/views/modules/ssoclient/codeCallback').then(m => m.default),
    hidden: true
  },
  {
    path: '/choosedTenement',
    component: () => import('@/views/permission/choosedTenement/choosedTenementIndex').then(m => m.default),
    hidden: true
  }
]

export const asyncRouterMap = [
  //新增用户
  {
    path: '/Users',
    component: Layout,
    redirect: '/Users',  
    alwaysShow: false,
    meta: {
      title: '用户',
      icon: '个人客户',
    },
    children: [
      {
        path: 'userManage',
        component: () => import('@/views/permission/user/userManageIndex').then(m => m.default),
        name: 'userManageIndex',
        meta: {
          title: '用户',
          icon: '个人客户',
          keepAlive: true,
          iswhite:true
        },
       
      },
             
    ]
  },
  // //数据维护
  // {
  //   path: '/payfor',
  //   component: Layout,
  //   redirect: '/payfor',
  //   alwaysShow: true,
  //   meta: {
  //     title: '在线缴费',
  //     icon: '个人客户',
  //   },
  //   children: [
  //     {
  //       path: 'EmptyPayIndex',
  //       component: () => import('@/views/OnlinePay/EmptyPayIndex').then(m => m.default),
  //       name: 'EmptyPayIndex',
  //       meta: {
  //         title: '空箱登记',
  //         icon: '个人客户',
  //         keepAlive: true
  //       },
      
  //     },
  //     {
  //       path: 'FullPayIndex',
  //       component: () => import('@/views/OnlinePay/FullPayIndex').then(m => m.default),
  //       name: 'FullPayIndex',
  //       meta: {
  //         title: '重箱登记',
  //         icon: '个人客户',
  //         keepAlive: true
  //       },
      
  //     },
             
  //   ]
  // },
   
]


export default new Router({
  // mode: 'history', //后端支持可开
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     if (from.meta.keepAlive) {
  //       from.meta.savedPosition = document.body.scrollTop
  //     }
  //     return { x: 0, y: to.meta.savedPosition || 0 }
  //   }
  // },
  routes: constantRouterMap
});




