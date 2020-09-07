import Vue from 'vue'
import Router from 'vue-router'
import guixiVue from './config'

Vue.use(Router)
Vue.prototype.baseUrl = guixiVue.baseUrl
Vue.prototype.baseCompany = guixiVue.baseCompany
Vue.prototype.baseDescription = guixiVue.baseDescription

export default new Router({
  mode: 'history',
  base: '/guixi_app',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/home')
    },
    {
      path: '/building',
      name: 'building',
      component: () => import('./views/building')
    },
    {
      path: '/unit',
      name: 'unit',
      component: () => import('./views/unit')
    },
    {
      path: '/company',
      name: 'company',
      component: () => import('./views/company')
    },
    {
      path: '/enterprise',
      name: 'enterprise',
      component: () => import('./views/enterprise')
    },
    {
      path: '/authorized',
      name: 'authorized',
      component: () => import('./views/authorized')
    },
    {
      path: '*',
      name: '404',
      component: () => import('./views/404')
    },
  ]
})
