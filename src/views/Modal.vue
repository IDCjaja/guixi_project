<template>
  <div class="modal" :class="statusClass" @click="close">
    <slot name="header"></slot>
    <slot name="content">
      <div class="content" @click.stop>
        <p>请关注微信公众号【{{ company }}】</p>
        <p>以便接收纠错反馈。</p>
      </div>
    </slot>
    <slot name="footer"></slot>
  </div>
</template>

<script>

export default {
  props: {
    company: {
      type: String
    }
  },

  data () {
    return {
      opened: false
    }
  },

  computed: {
    statusClass () {
      return {
        'open': this.opened
      }
    }
  },

  methods: {
    close () {
      this.opened = true
    },
    open () {
      this.opened = false
    }
  }
}
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,.3);
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
}

.modal.open {
  display: flex;
}

.modal > .content {
  width: 12.5rem;
  height: 5rem;
  font-size: .7rem;
  color: #8d8d8d;
  text-align: center;
  background-color: white;
  border-radius: .3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal > .content > p {
  line-height: 1.5;
}

</style>
