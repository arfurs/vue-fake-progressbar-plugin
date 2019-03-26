<template>
  <div
  ref="progressBar"
  :style="progressBarStyle"
  class="vue-simple-progress-bar">
  </div>
</template>

<script>
  export default {
    name: 'ProgressBar',
    data() {
      return {
        currProgress: 0,
        transitionAttr: {
          transitionDuration: '800ms, 1500ms, 200ms, 200ms',
          transitionTimingFunction: 'ease, ease, ease, ease'
        },
        options: {
          color: '#66D9EF',
          shadow: '0px 0px 10px #66D9EF'
        }
      }
    },
    computed: {
      progressBarStyle() {
        return {
          backgroundColor: this.options.color,
          boxShadow: this.options.shadow,
          width: this.currProgress + '%',
          opacity: (this.currProgress >= 100 || this.currProgress == 0) ? 0 : 1,
          ...this.transitionAttr
        }
      }
    },
    created() {
      this.$on('start', options => {
        this.dispatch('start', options)
      })
      this.$on('finish', options => {
        this.dispatch('finish', options)
      })
    },
    methods: {
      dispatch(action, options) {
        Object.assign(this.options, options)
        this[action](options)
      },
      start() {
        let initProgress = this._randomFrom(20, 80)
        this.currProgress = initProgress
        this.transitionAttr = {
          ...this.transitionAttr,
          transitionDuration: '400ms, 0ms, 200ms, 200ms'
        }
        this.$timerId = setInterval(() => {
          if (this.currProgress >= 98) clearInterval(this.$timerId)
          this.currProgress += (100 - this.currProgress) / this._randomFrom(10, 50)
        }, 600)
      },
      finish({ callback } = {}) {
        clearInterval(this.$timerId)
        this.transitionAttr = {
          ...this.transitionAttr,
          transitionDuration: '300ms, 1500ms, 200ms, 200ms'
        }
        this.currProgress = 100
        this.$nextTick().then(() => {
          const transitionEndListener = event => {
            event.propertyName === 'opacity' && callback && callback()
          }
          ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd']
            .forEach(eventName => {
              this.$refs.progressBar.addEventListener(eventName, transitionEndListener, {
                passive: true
              })
          } )
        })
      },
      _randomFrom(l, u) {
        return Math.floor(Math.random() * (u - l + 1) + l)
      }
    }
  }
</script>

<style scoped>
.vue-simple-progress-bar {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 0%;
  height: 100%;
  border-radius: 10px;
  transition: width linear, opacity, background-color, box-shadow;
}
</style>