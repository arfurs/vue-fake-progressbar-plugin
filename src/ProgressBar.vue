<template>
  <div class="simple-progress">
    <div
    :style="progressBarStyle"
    class="simple-progress__bar"></div>
  </div>
</template>

<script>
  import _ from './common'
  const color = {
    primary: '#66D9EF',
    error: '#F92672',
    warn: '#F6B930',
    success: '#29B479'
  }
  export default {
    name: 'progress-bar',
    data() {
      return {
        currProgress: 0,
        color: color.primary,
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
        this.$progressListeners = {
          'start': this.onStart,
          'finish': this.onFinish,
          'successFinish': this.onSuccessFinish,
          'warningFinish': this.onWarningFinish,
          'errorFinish': this.onErrorFinish
        }
        Object.keys(this.$progressListeners).forEach((val) => {
          this.$on(val, this.$progressListeners[val])
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
      onFinish(color = color.primary) {
        clearInterval(this.$timerId)
        this.transitionAttr = {
          ...this.transitionAttr,
          transitionDuration: '300ms, 1500ms, 200ms, 200ms'
        }
        this.color = color
        this.currProgress = 100
      },
      onSuccessFinish() {
        this.onFinish(color.success)
      },
      onErrorFinish() {
        this.onFinish(color.error)
      },
      onWarningFinish() {
        this.onFinish(color.warn)
      },
      deleteEventListener() {
        Object.keys(this.$progressListeners).forEach((val) => {
          this.$off(val, this.$progressListeners[val])
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