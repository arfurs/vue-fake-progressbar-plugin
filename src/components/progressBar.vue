<template>
  <div
  ref="progressBar"
  :style="progressBarStyle"
  class="vue-simple-progress-bar">
  </div>
</template>

<script>
  import config from '@/config'
  export default {
    name: 'ProgressBar',
    data() {
      return {
        currProgress: 0,
        transitionAttr: {
          transitionDuration: '800ms, 1000ms, 200ms, 200ms',
          transitionTimingFunction: 'ease-in ease ease ease'
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
      this.$on('start', options => {
        this.dispatch('start', options)
      })
      this.$on('finish', options => {
        this.dispatch('finish', options)
      })
    },
    methods: {
      dispatch(action, options) {
        Object.assign(this.tempOptions, options)
        this[action](options.callback)
      },
      start() {
        this.transitionAttr.transitionDuration = '800ms, 1500ms, 200ms, 200ms'
        this.$nextTick(() => {
          setTimeout(() => {
            let initProgress = this._randomFrom(20, 80)
            this.currProgress = initProgress
            this.$timerId = setInterval(() => {
              if (this.currProgress >= 98) clearInterval(this.$timerId)
              this.currProgress += (100 - this.currProgress) / this._randomFrom(10, 50)
            }, 600)
          }, 4)
        })
      },
      finish(callback) {
        clearInterval(this.$timerId)
        this.transitionAttr = {
          ...this.transitionAttr,
          transitionDuration: '300ms, 1500ms, 200ms, 200ms'
        }
        this.currProgress = 100
        this.$nextTick().then(() => {
          const transitionEndHandler = event => {
            event.propertyName === 'opacity' && callback && callback()
          }
          ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd']
            .forEach(eventName => {
              this.$refs.progressBar.addEventListener(eventName, transitionEndHandler, {
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
  border-bottom-right-radius: 115px;
  border-top-right-radius: 115px;
  transition-property: width, opacity, background-color, box-shadow;
  /* transition: width 500ms ease 0ms, opacity 500ms ease 0ms, background-color 500ms ease 0ms, box-shadow 500ms ease 0ms; */
}
</style>