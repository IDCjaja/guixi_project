import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

export default {
  install () {
    Vue.use(VueAxios, axios)
  },
}
