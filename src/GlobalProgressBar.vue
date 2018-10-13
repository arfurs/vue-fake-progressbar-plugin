<template>
  <div class="simple-progress">
    <div
    :style="progressBarStyle"
    class="simple-progress__bar"></div>
  </div>
</template>

<script>
  import * as _ from './common'
  import config from './GlobalProgressBar.config'

  export default {

    name: 'progress-bar',

    data() {
      return {
        mode: config.mode,
        theme: config.theme,
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
        let initProgress = _.randomFrom(0, 80)
        this.currProgress = initProgress
        this.$timerId = setInterval(() => {
          this.transitionAttr = {
            ...this.transitionAttr,
            transitionDuration: '400ms, 1500ms, 200ms, 200ms'
          }
          this.currProgress += (100 - this.currProgress) / _.randomFrom(20, 100)
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

<style scoped >
  .simple-progress {
    position: fixed;
    z-index: 10000;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 3px;
  }
  .simple-progress__bar {
    width: 0%;
    height: 3px;
    background-color: #6298FA;
    box-shadow: 0px 0px 10px #6298FA;
    transition: width linear, opacity, background-color, box-shadow;
  }
</style>