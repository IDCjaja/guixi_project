import Vue from 'vue'
import Router from 'vue-router'
import guixiVue from './config'

Vue.use(Router)
Vue.prototype.baseUrl = guixiVue.baseUrl
Vue.prototype.baseCompany = guixiVue.baseCompany
Vue.prototype.baseDescription = guixiVue.baseDescription


export default new Router({
  mode: 'history',
  base: '/guixi_test',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('@/components/home')
    },
    {
      path: '/building',
      name: 'building',
      component: () => import('@/components/building')
    },
    {
      path: '/unit',
      name: 'unit',
      component: () => import('@/components/unit')
    },
    {
      path: '/company',
      name: 'company',
      component: () => import('@/components/company')
    },
    {
      path: '/enterprise',
      name: 'enterprise',
      component: () => import('@/components/enterprise')
    },
    {
      path: '/authorized',
      name: 'authorized',
      component: () => import('@/components/authorized')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/components/404')
    },
  ]
})
