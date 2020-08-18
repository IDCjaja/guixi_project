import _ from 'lodash'

export default {
  data () {
    return {
      wrapper: null,
      itemWidth: 0,
      element: null,
      moved: null
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.itemWidth = this.$refs.swipeContainer.getBoundingClientRect().width
      this.element = document.querySelector('.layer-page')
      this.bindSwipe()
    })
  },

  computed: {
    length () {
      return this.files.length
    }
  },

  methods: {
    bindSwipe () {
      this.wrapper = this.$refs.swipeWrapperRef
      this.moveTo(this.currentIndex || 0)
      this.bindEvents()
    },

    bindEvents () {
      this.element.addEventListener('touchstart', this.touchstart, false)
    },

    unbindEvents () {
      this.element.removeEventListener('touchstart', this.touchstart, false)
    },

    touchstart (event) {
      var touch
      touch = event.changedTouches[0]
      if (!touch) return
      this._setStart(touch)
      document.body.addEventListener('touchmove', this.touchmove, false)
      return document.body.addEventListener('touchend', this.touchend, false)
    },

    touchmove (event) {
      var touch
      touch = event.changedTouches[0]
      event.preventDefault()
      if (!touch) {
        return
      }
      this.moved = true
      return this._moveByTouch(touch)
    },

    touchend (event) {
      var deltaIndex, deltaX
      const moved = this.moved
      delete this.moved
      const touch = event.changedTouches[0]
      document.body.removeEventListener('touchmove', this.touchmove, false)
      document.body.removeEventListener('touchend', this.touchend, false)
      if (!touch) {
        return
      }
      deltaX = touch.clientX - this.startX
      delete this.startX
      if (!moved) {
        return
      }
      if (Math.abs(deltaX) < 20) {
        deltaIndex = 0
      } else {
        deltaIndex = deltaX < 0 ? 1 : -1
      }
      return this._setIndex(deltaIndex)
    },

    moveTo (index) {
      return this._moveToX(index * this.itemWidth)
    },

    _setStart (touch) {
      this.startX = touch.clientX
    },

    _setIndex (delta) {
      const newIndex = this.currentIndex + delta
      this.currentIndex = Math.max(Math.min(this.length - 1, newIndex), 0)
      this._enableTransition()
      this.moveTo(this.currentIndex)
      this.wrapper.addEventListener('transitionend', this.transitionend, false)
      return this.wrapper.addEventListener('webkitTransitionEnd', this.transitionend, false)
    },

    transitionend () {
      this._disableTransition()
      this.wrapper.removeEventListener('transitionend', this.transitionend, false)
      return this.wrapper.removeEventListener('webkitTransitionEnd', this.transitionend, false)
    },

    _enableTransition () {
      _.extend(this.wrapper.style, {
        transition: 'transform 0.3s ease-in-out',
        webkitTransition: '-webkit-transform 0.3s ease-in-out'
      })
      return this.wrapper.style.transition
    },

    _disableTransition () {
      if (typeof (this.indexChanged) === 'function') {
        this.indexChanged(this.currentIndex)
      }
      return _.extend(this.wrapper.style, {
        transition: 'none',
        webkitTransition: 'none'
      })
    },

    _moveByTouch (touch) {
      var deltaX
      deltaX = touch.clientX - this.startX
      return this._moveToX(this.currentIndex * this.itemWidth - deltaX)
    },

    _moveToX (x) {
      return _.extend(this.wrapper.style, {
        transform: `translateX(${-x}px)`,
        webkitTransform: `translateX(${-x}px)`,
        msTransform: `translateX(${-x}px)`,
        mozTransform: `translateX(${-x}px)`
      })
    }
  },

  destroyed () {
    this.unbindEvents()
  }
}
