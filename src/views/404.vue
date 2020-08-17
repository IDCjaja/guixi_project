<template>
  <ul>
    <li :key="user" v-for="user in users">{{ user }}</li>
  </ul>
</template>
<script>
import { fetch } from '../lib/tools'
export default {
  data () {
    return {
      users: []
    }
  },
  mounted () {
    var self = this;
    fetch()
      .then(res => {
        res.data.forEach(param => {
          self.users.push(param)
        })
      })
  }
};
</script>