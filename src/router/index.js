import Vue from 'vue'

import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { path: '/home' }
    },
    {
      path: '/home',  //油卡回收、充值主页面
      name: 'home',
      component: () => import('@/views/card/Home.vue'),
    },
  ]
})
