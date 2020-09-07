<template>
  <home-header :companyName="baseCompany" class="bg">
    <template slot="communityBreadcrumns">
      <div class="description">{{ baseDescription }}</div>
    </template>
    <template slot="fieldsList">
      <div class="company-body">
        <div class="title">{{ company }}</div>
        <div class="list">
          <div class="list-item">
            <div class="left-head">企业联络人及联系电话</div>
            <div class="right-body">{{ information.business_contact }}</div>
          </div>
          <div class="list-item">
            <div class="left-head">网格协管员及联系电话</div>
            <div class="right-body">{{ information.grid_coordinator }}</div>
          </div>
          <div class="list-item">
            <div class="left-head">社区民警及联系电话</div>
            <div class="right-body">{{ information.community_police }}</div>
          </div>
        </div>
      </div>
      <router-link
        :to="{name: 'enterprise', query: { company: company }}"
        class="error-correction-button"
        v-if="authorize"
      >
        查看企业信息
      </router-link>
    </template>
  </home-header>
</template>

<script>
import HomeHeader from './pages/header'
import axios from 'axios'

export default {
  name: 'Company',

  data () {
    return {
      information: {},
      authorize: false,
    }
  },

  components: {
    HomeHeader
  },

  created () {
    document.title = '一牌一簿'
    const {query: { company, authorize } } = this.$route
    this.company = company
    this.authorize = authorize
    this.doRequst()
  },

  methods: {
    doRequst () {
      axios.get(`https://gxzh.cdht.gov.cn/house/company?company=${this.company}`).then(({ data: [data] }) => {
        this.information = data || {}
      })
    },

    linkToEnterprise () {
      this.$router.push({path: 'enterprise', query: {company: this.company}})
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
  margin: 0 auto;
  overflow: auto;
}

.bg {
  padding: 0rem 1rem;
}

.description {
  margin-top: 0.4rem;
  font-size: 0.7rem;
  color: #bdbdbd;
  line-height: 1.5;
  text-align: right;
}

.company-body {
  flex: 1;
  width: 100%;
  background-color: white;
  border-radius: 0.3rem;
  padding: 0 0.9rem;
  margin-bottom: 1rem;
}

.company-body > .title {
  height: 2.25rem;
  font-size: 0.7rem;
  color: #95a4b3;
  line-height: 1.5;
  border-bottom: 0.05rem solid #e9eaeb;
  display: flex;
  align-items: center;
}

.company-body .list-item {
  height: 2.25rem;
  font-size: 0.6rem;
  color: #8d8d8d;
  line-height: 1.5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.05rem solid #e9eaeb;
}

.error-correction-button {
  height: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: white;
  line-height: 1.5;
  background: linear-gradient(#f08200, #f45e06);
  margin-bottom: 1.6rem;
  border-radius: 0.3rem;
}
</style>
