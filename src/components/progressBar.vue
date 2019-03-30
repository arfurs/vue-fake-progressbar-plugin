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
        // 方法调用时传入的选项
        tempOptions: {}
      }
    },
    computed: {
      // 优先读取方法调用时传入的style选项，不存在时再读取config中的
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
      /**
       * 开启假进度条
       */
      start() {
        clearInterval(this.$waitTimer)
        clearInterval(this.$timerId)
        this.transitionAttr.transitionDuration = '0ms,0ms,200ms,200ms' // 考虑到 start 被重复调用，重复调用时让进度清零（width 的过渡时间先设置为0ms）
        this.$nextTick(() => { // vue的dom更新循环结束，但是浏览器可能未重绘
          window.requestAnimationFrame(() => { // 浏览器重绘，此时dom已被确认真的被修改了
            this.currProgress = 0 // 进度清0
            this.$nextTick(() => { // vue的dom更新循环结束，可能未重绘
              window.requestAnimationFrame(() => { // 重绘，dom已经确认真的被修改
                // 此时设置过渡，以及初始的假进度
                this.transitionAttr.transitionDuration = '250ms,0ms,200ms,200ms'
                let initProgress = this._randomFrom(20, 80)
                this.currProgress = initProgress
                // 持续增加进度，无限趋于100%：直到98%，或者定时器被清除
                this.$timerId = setInterval(() => {
                  if (this.currProgress >= 98) {
                    clearInterval(this.$timerId)
                    this.$timerId = undefined
                  }
                  this.currProgress += (100 - this.currProgress) / this._randomFrom(10, 50)
                }, 400)
              })
            })
          })
        })
      },
      /**
       * 结束假进度条
       */
      finish(callback) {
        // 考虑到 start 与 finish 方法 "同时" 被调用，这里需要不断轮询start中的计时器的timerId是否被设置
        // 只有被设置了之后，清除start中的计时器，让进度到100%，才能保证不出现问题
        this.$waitTimer = setInterval(() => {
          if (this.$timerId) {
            clearInterval(this.$timerId)
            clearInterval(this.$waitTimer)
            this.transitionAttr.transitionDuration = '500ms,2000ms,200ms,200ms'
            this.$nextTick(() => {
              window.requestAnimationFrame(() => {
                this.currProgress = 100
                // transitionEnd时，监听到过渡时间最长的那个属性（opacity）过渡完成，执行调用时传入的callback
                this.transitionEndHandler(this.$refs.progressBar, event => {
                  if (event.propertyName === 'opacity') {
                    callback && callback()
                  }
                })
              })
            })
          }
        }, 4)
      },
      /**
       * 为指定元素设置TransitionEnd事件监听器
       */
      transitionEndHandler(el, callback) {
        ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd']
          .forEach(eventName => {
            el.addEventListener(eventName, callback, {
              passive: true
            })
          })
      },
      /**
       * 随机
       */
      _randomFrom(l, u) {
        return Math.floor(Math.random() * (u - l + 1) + l)
      }
    }
  }
</script>

<style scoped>
.vue-simple-progress-bar {
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 10000;
  width: 0%;
  height: 100%;
  border-bottom-right-radius: 115px;
  border-top-right-radius: 115px;
  transition-property: width, opacity, background-color, box-shadow;
}
</style>