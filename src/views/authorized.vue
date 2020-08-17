<template>
  <div class="bg">
    <button class="authorized-btn" @click="goToUrlFunc">确认授权</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Athorized',

  data () {
    return {
      clientId: '3ce843694f2d224f2769851ed5cb06baf201630cb129acfa732bb62b718c5223',
      redirectUrl: 'http://localhost:8080/guixi_test/authorized',
    }
  },

  created () {
    document.title = '一牌一簿'

    const { query: { code, company } } = this.$route
    if(company) {
      localStorage.setItem('company', company)
    }
    this.code = code

    if(!this.code) {
      window.location.href = `https://gxzh.cdht.gov.cn/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUrl}&response_type=code`;
    }
  },

  methods: {
    goToUrlFunc(code) {
      axios({
        method: "POST",
        url: "/oauth/token",
        headers: { "Content-Type": "application/json" },
        params: {
          client_id: "3ce843694f2d224f2769851ed5cb06baf201630cb129acfa732bb62b718c5223",
          client_secret: "22b2d2a2890b7a0ea3ac0fe2689792187b6560268ca98d11e71e04b42ef90737",
          code: this.code,
          grant_type: "authorization_code",
          redirect_uri: "http://localhost:8080/guixi_test/authorized",
        },
      }
      ).then(({ data: { access_token } }) => {
        axios.get(`/v1/user?access_token=${access_token}`).then(({ data: {root_organization_ids} }) => {
          const authorize = root_organization_ids.includes(268)
          this.$router.push({ path :'company', query: {authorize: authorize, company: localStorage.getItem('company')} })
        })
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg {
  position: absolute;
  background: url(../../public/guixi_test/img/image_bg.png) no-repeat;
  background-size: cover;
  top: 0rem;
  bottom: 0rem;
  right: 0rem;
  left: 0rem;
  padding: 0rem 1rem;
  margin: 0 auto;
  overflow: auto;
}

.authorized-btn {
  height: 2rem;;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .7rem;
  color: white;
  line-height: 1.5;
  background: linear-gradient(#f08200, #f45e06);
  margin: 1.2rem 0 1.6rem;
  border-radius: .3rem;
}
</style>



// WEBPACK FOOTER //
// src/components/Authorized.vue
