<template>
  <div
  ref="progressBar"
  :style="progressBarStyle"
  class="vue-simple-progress-bar">
  </div>
</template>

<script>
  import config from '../config'
  export default {
    name: 'ProgressBar',
    data() {
      return {
        currProgress: 0,
        transitionAttr: {
          transitionDuration: ''
        },
        tempOptions: {}
      }
    },
    computed: {
      progressBarStyle() {
        return {
          ...this.transitionAttr,
          opacity: (this.currProgress >= 100 || this.currProgress == 0) ? 0 : 1,
          backgroundColor: this.tempOptions.color || config.color,
          boxShadow: this.tempOptions.shadow || config.shadow,
          width: this.currProgress + '%',
          height: this.tempOptions.height || config.height
        }
      }
    },
    created() {
      this.$on('dispatch', this.dispatch)
    },
    methods: {
      dispatch({ action, options = {} }) {
        Object.assign(this.tempOptions, options)
        this[action](options.callback)
      },
      start() {
        clearInterval(this.$timerId)
        this.transitionAttr.transitionDuration = '0ms, 1000ms, 200ms, 200ms'
        this.currProgress = 0
        this.$nextTick(function() {
          setTimeout(() => {
            this.transitionAttr.transitionDuration = '500ms, 1000ms, 200ms, 200ms'
            let initProgress = this._randomFrom(20, 80)
            this.currProgress = initProgress
            this.$timerId = setInterval(() => {
              if (this.currProgress >= 98) clearInterval(this.$timerId)
              this.currProgress += (100 - this.currProgress) / this._randomFrom(10, 50)
            }, 600)
          }, 14)
        })
      },
      finish(callback) {
        clearInterval(this.$timerId)
        this.transitionAttr.transitionDuration = '300ms, 1500ms, 200ms, 200ms'
        this.currProgress = 100
        this.$nextTick(() => {
          const transitionEndHandler = event => {
            if (event.propertyName === 'opacity') {
              this.transitionDuration = '0ms, 1500ms, 200ms, 200ms'
              callback && callback()
            }
          }
          ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd']
            .forEach(eventName => {
              this.$refs.progressBar.addEventListener(eventName, transitionEndHandler, {
                passive: true
              })
            })
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
  border-bottom-right-radius: 115px;
  border-top-right-radius: 115px;
  transition-property: width, opacity, background-color, box-shadow;
}
</style>