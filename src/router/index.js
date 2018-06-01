import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/HelloWorld'
import login from '@/components/login'
import rankingList from '@/components/rankingList'

Vue.use(Router)

export default new Router({
  routes: [
  	{
      path: '/',
      name: 'login',
      component: login,
      meta: { requiresAuth: true }
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: { requiresAuth: true }
    },
    
    {
      path: '/rankingList',
      name: 'rankingList',
      component: rankingList,
      meta: { requiresAuth: true }
    }
  ]
})
