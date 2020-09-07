<template>
  <div class="community-home">
    <div class="community-home-head">
      <div class="head-left">
        <img alt class="home-logo" src="../../../public/guixi_app/img/image_logo.png" />
      </div>
      <div class="head-right">
        <div class="company-name">成都高新区桂溪街道办事处</div>
        <slot name="communityBreadcrumns">
          <div class="community-breadcrumns"></div>
        </slot>
      </div>
    </div>
    <div class="community-home-body">
      <slot name="fieldsList"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'Common',
      props: {
        companyName: {
          type: String,
        },
        fields: {
          type: Array
        }
      }
    }
  }
}
</script>

<style scoped>
.community-home-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  height: 6.5rem;
  background-color: white;
  border-radius: .3rem;
  padding: 0 .9rem;
}

.home-logo {
  width: 2.5rem;
  height: 2.5rem;
}

.company-name {
  font-size: .9rem;
  color: #606060;
  line-height: 1.5;
  font-weight: 500;
}

.community-breadcrumns {
  text-align: right;
  color: #bdbdbd;
  font-size: .7rem;
  margin-top: .4rem;
}

.community-breadcrumns > a {
  margin-top: .4rem;
  font-size: .7rem;
  color: #bdbdbd;
  line-height: 1.5;
}

.community-home-body {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  padding-top: 1.2rem;
}

.community-home-body-item {
  height: 4.8rem;
  flex: 0 0 22%;
  background-color: white;
  padding: .6rem .4rem .4rem;
  box-sizing: border-box;
  border-radius: .3rem;
  margin-bottom: .4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 3%;
}
</style>
