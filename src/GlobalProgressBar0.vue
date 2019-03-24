<template>
  <div :style="{ 'height': this.height + 'px' }" class="simple-progress-0">
    <div
    :style="progressBarStyle"
    class="simple-progress-0__bar">
    </div>
  </div>
</template>

<script>
  import * as _ from './common'
  import config from './GlobalProgressBar.config'

  export default {

    name: 'progress-bar0',

    data() {
      return {
        mode: config.mode,
        theme: config.theme,
        decoration: config.decoration,
        height: config.height,
        currProgress: 0,
        color: config.theme.primary,
        transitionAttr: {
          transitionDuration: '800ms, 1500ms, 200ms, 200ms',
          transitionTimingFunction: 'ease, ease, ease, ease'
        }
      }
    },

    computed: {
      progressBarStyle() {
        return {
          backgroundColor: this.color,
          boxShadow: `0px 0px 10px ${this.color}`,
          width: this.currProgress + '%',
          opacity: (this.currProgress >= 100 || this.currProgress == 0) ? 0 : 1,
          ...this.transitionAttr
        }
      }
    },

    methods: {
      
      registerEventListener() {
        this.$componentListeners = {
          // 进度条控制类
          'start': this.onStart,
          'finish': this.onFinish,
          'successFinish': this.onSuccessFinish,
          'warningFinish': this.onWarningFinish,
          'errorFinish': this.onErrorFinish
        }
        Object.keys(this.$componentListeners).forEach(i => {
          this.$on(i, this.$componentListeners[i])
        })
      },

      onStart() {
        let initProgress = _.randomFrom(20, 80)
        this.currProgress = initProgress
        this.transitionAttr = {
          ...this.transitionAttr,
          transitionDuration: '400ms, 0ms, 200ms, 200ms'
        }
        this.$timerId = setInterval(() => {
          if (this.currProgress >= 98) clearInterval(this.$timerId)
          this.currProgress += (100 - this.currProgress) / _.randomFrom(10, 50)
        }, 600)
      },

      onFinish(color = this.theme.primary) {
        clearInterval(this.$timerId)
        this.transitionAttr = {
          ...this.transitionAttr,
          transitionDuration: '300ms, 1500ms, 200ms, 200ms'
        }
        this.color = color
        this.currProgress = 100
      },
      onSuccessFinish() {
        this.onFinish(this.theme.success)
      },
      onErrorFinish() {
        this.onFinish(this.theme.error)
      },
      onWarningFinish() {
        this.onFinish(this.theme.warn)
      },

      deleteEventListener() {
        Object.keys(this.$componentListeners).forEach(i => {
          this.$off(i, this.$componentListeners[i])
        })
      },

    },
    created() {
      this.registerEventListener()
    },
    beforeDestroy() {
      this.deleteEventListener()
    }
  }
</script>

<style scoped>
.simple-progress-0 {
  position: fixed;
  z-index: 10000;
  left: 0px;
  top: 0px;
  width: 100%;
  z-index: 99999;
}
.simple-progress-0__bar {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 0%;
  height: 100%;
  background-color: #6298FA;
  box-shadow: 0px 0px 10px #6298FA;
  border-radius: 10px;
  transition: width linear, opacity, background-color, box-shadow;
}
</style>