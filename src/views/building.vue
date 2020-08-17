<template>
  <home-header :companyName="baseCompany" class="bg">
    <template slot="communityBreadcrumns">
      <div class="community-breadcrumns">
        <router-link
          :to="{ name: 'home',query:{ home: home, building: building}}"
        >{{home}}</router-link>&gt;
        <span>{{ building }}栋</span>
      </div>
    </template>
    <template slot="fieldsList">
      <div class="building-unit">
        <template v-for="(unit, index) in units">
          <router-link
            :key="index"
            :to="{ name: 'unit', query: { home: home, building: building, unit: unit.unit }}"
            class="community-home-body-item"
          >
            <i class="icon-icon_danyuan"></i>
            <span class="building-name">{{ unit.unit }}单元</span>
          </router-link>
        </template>
      </div>
    </template>
  </home-header>
</template>

<script>
import HomeHeader from './pages/header'
import axios from 'axios'

export default {
  name: 'Building',

  components: {
    HomeHeader
  },

  data () {
    return {
      home: '',
      building: '',
      query: '',
      units: []
    }
  },

  created () {
    this.doRequst()
    document.title = '出租房屋公示'
  },

  methods: {
    doRequst () {
      const { query: { home, building} } = this.$route
      this.home = home
      this.building = building

      axios.get(`/api/building?home=${home}&building=${building}`).then(({ data }) => {
        this.units = data.map(item => ({
          id: item.unit,
          unit: item.unit
        }))
      })
    }
  }
}
</script>

<style scoped>
.bg {
  position: absolute;
  background: url(../../public/guixi_test/img/image_bg.png) no-repeat;
  background-size: cover;
  padding: 0rem 1rem;
  top: 0rem;
  bottom: 0rem;
  right: 0rem;
  left: 0rem;
  margin: 0 auto;
  overflow: auto;
}

.community-name {
  margin-top: 0.4rem;
  font-size: 0.7rem;
  color: #bdbdbd;
  line-height: 1.5;
  text-align: right;
}

.building-unit {
  flex: 1;
  display: flex;
  margin-right: -3%;
}

.community-home-body-item {
  height: 4.8rem;
  flex: 0 0 22%;
  background-color: white;
  padding: 0.6rem 0.4rem 0.4rem;
  box-sizing: border-box;
  border-radius: 0.3rem;
  margin-bottom: 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.icon-icon_danyuan {
  background-image: linear-gradient(to right, #f08200, #f45e06);
  -webkit-background-clip: text;
  background-clip: text;
  text-align: left;
  -webkit-text-fill-color: transparent;
}

.building-name {
  font-size: 0.7rem;
  color: #8d8d8d;
  line-height: 1.5;
  font-weight: 500;
}
</style>
