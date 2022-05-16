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
  // {
  //   path: '/dashboard',
  //   component: () => import('@/views/dashboard/index').then(m => m.default),
  //   hidden: true
  // },
  {
    // path: '/',
    // component: Layout,
    // redirect: '/dashboard',
    // meta: {
    //   title: '首页',
    
    // },
    // alwaysShow: true,
        
    // children: [
    //   {
    //   path: 'dashboard',
    //   component: () => import('@/views/dashboard/index').then(m => m.default),
    //   meta: {
    //     title: '首页',
    //     icon: '个人中心',
    //     keepAlive: true
        
    //   },
    // },
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
          title: '用户注册',
          icon: '个人客户',
          keepAlive: true,
          iswhite:true
        },
       
      },
             
    ]
  },
  //数据维护
  {
    path: '/DelInfo',
    component: Layout,
    redirect: '/DelInfo',
    alwaysShow: true,
    meta: {
      title: '信息发布',
      icon: '个人客户',
    },
    children: [
      {
        path: 'XDDelInfo',
        component: () => import('@/views/InformationDelivery/XD/XDDelInfoIndex').then(m => m.default),
        name: 'XDDelInfoIndex',
        meta: {
          title: '箱东信息发布',
          icon: '个人客户',
          keepAlive: true
        },
      
      },
    
      {
        path: 'ZKDelInfo',
        component: () => import('@/views/InformationDelivery/ZK/ZKDelInfoIndex').then(m => m.default),
        name: 'ZKDelInfoIndex',
        meta: {
          title: '租客信息发布',
          icon: '个人客户',
          keepAlive: true
        },
      
      },
    
             
    ]
  },
   //
   {
    path: '/OnlineSeach',
    component: Layout,
    redirect: '/OnlineSeach',
    alwaysShow: true,
    meta: {
      title: '在线查询',
      icon: '个人客户',
    },
    children: [
      {
        path: 'ZKSeachInfo',
        component: () => import('@/views/OnlineSearch/ZKSeachInfoIndex').then(m => m.default),
        name: 'ZKSeachInfoIndex',
        meta: {
          title: '箱东查询',
          icon: '个人客户',
          keepAlive: true
        },
      
      },
    
      {
        path: 'XDSeachInfo',
        component: () => import('@/views/OnlineSearch/XDSeachInfoIndex').then(m => m.default),
        name: 'XDSeachInfoIndex',
        meta: {
          title: '租客查询',
          icon: '个人客户',
          keepAlive: true
        },
      
      },
    
             
    ]
  },
  {
    path: '/InRecommond',
    component: Layout,
    redirect: '/InRecommond',  
    alwaysShow: false,
    meta: {
      title: '用户',
      icon: '智能推荐',
    },
    children: [
      {
        path: 'InteRecommend',
        component: () => import('@/views/InteRecommend/InteRecommendIndex').then(m => m.default),
        name: 'InteRecommendIndex',
        meta: {
          title: '智能推荐',
          icon: '个人客户',
          keepAlive: true,
          iswhite:true
        },
       
      },
             
    ]
  },
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




