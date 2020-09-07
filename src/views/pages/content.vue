<template>
  <div>
    <div class="community-home-body">
      <div class="home-building">
        <div :key="item.id" class="item" v-for="item in building">
          <a
            class="community-home-body-item"
            href="/guixi_app/building?home=%E9%95%BF%E5%9F%8E%E5%8D%97%E8%8B%91&amp;building=1"
          >
            <i class="icon-icon_dong"></i>
            {{item.id}}
            <span class="building-name">{{item.building}}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      building: [
        {
          id: 1,
          building:"1栋",
          name: 'a小区'
        },
        {
          id: 2,
          building:"1栋",
          name: 'b小区'
        },
        {
          id: 3,
          building:"1栋",
          name: 'c小区'
        },
        {
          id: 4,
          building:"1栋",
          name: 'd小区'
        },
        {
          id: 5,
          building:"1栋",
          name: 'e小区'
        },
        {
          id: 6,
          building:"1栋",
          name: 'f小区'
        }]

    }
  }
}
</script>

<style scoped>
.community-home-body {
  display: flex;
  justify-content: start;
}

.home-building {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.item {
  margin: 1.4rem 0rem 0.4rem;
  flex: 0 0 25%;
}
.community-home-body-item {
  height: 6rem;
  margin: 0px 4px;
  background-color: white;
  background-clip: padding-box;
  padding: 0.6rem 0.4rem 0.4rem;
  box-sizing: border-box;
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.icon-icon_dong {
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#f08200),
    to(#f45e06)
  );
}

.building-name {
  font-size: 0.7rem;
  color: #8d8d8d;
  line-height: 1.5;
  font-weight: 500;
  text-align: left;
}
</style>
