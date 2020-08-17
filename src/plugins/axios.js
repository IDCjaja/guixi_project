import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults['baseURL'] = 'https://yqfw.cdyoue.com/'

export default {
  install () {
    Vue.use(VueAxios, axios)
  },
}
