<template>
  <div :style="{ 'height': this.height + 'px' }" class="simple-progress-1">
    <div :style="style" class="simple-progress-1__bar"></div>
  </div>
</template>

<script>

import config from './GlobalProgressBar.config'

export default {
  name: 'progress-bar1',
  data() {
    return {
      isStart: false,
      height: config.height,
      color: config.theme.primary,
      theme: config.theme,
      duration: config.duration,
      speed: ({ 'slow': '3000ms', 'normal': '2000ms', 'fast': '1000ms' })[config.speed],
    }
  },
  computed: {
    style() {
      if (! this.isStart) return { opacity: 0 }
      return {
        opacity: 1,
        backgroundColor: this.color,
        boxShadow: `0px 0px 10px ${this.color}`,
        animation: `progressAnimate ${this.speed} ${this.duration} infinite`  
      }
    }
  },
  methods: {
    registerEventListener() {
      this.$componentListeners = {
        // 进度条控制类
        'start': this.onStart,
        'finish': this.onFinish,
      }
      Object.keys(this.$componentListeners).forEach(i => {
        this.$on(i, this.$componentListeners[i])
      })
    },

    onStart() {
      this.isStart = true
    },

    onFinish() {
      this.isStart = false
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

<style>
.simple-progress-1 {
  position: fixed;
  z-index: 10000;
  left: 0px;
  top: 0px;
  width: 100%;
}
.simple-progress-1__bar {
  position: absolute;
  left: 0%;
  top: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1000ms;
  transform: translate3d(-100%,0, 0);
}
@keyframes progressAnimate {
  0% {
    transform: translate3d(-100%,0, 0);
  }
  50% {
    transform: translate3d(0%,0, 0);
  }
  100% {
    transform: translate3d(100%,0, 0);
  }
}
</style>

