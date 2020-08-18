import axios from './axios'
import swipe from '../directive/swipe'

export default {
  install () {
    axios.install();
    swipe.install()
  }
}
