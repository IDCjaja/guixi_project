import Vue from 'vue'
import App from './App.vue'
import router from './router'
import plugins from './plugins/index'
import { Modal, Table } from 'view-design';

import './styles/reset.css'

plugins.install()

Vue.component('Modal', Modal);
Vue.component('Table', Table);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
