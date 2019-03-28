<template>
  <div ref="wrapper" class="vue-simple-progress-bar-wrapper" >
    <progress-bar
      ref="progressBars"
      v-for="item in queue"
      :key="item.key"
    />
  </div>
</template>

<script>
import ProgressBar from './progressBar'
export default {
  name: 'Index',
  components: {
    ProgressBar
  },
  data() {
    return {
      queue: []
    }
  },
  created() {
    this.$on('start', this.addProgressBar)
    this.$on('finish', this.removeProgressBar)
  },
  methods: {
    addProgressBar(options = {}) {
      this.queue.push({
        key: this._getIncrementId()
      })
      this.$nextTick(() => {
        const progressBarElNodes = this.$refs.progressBars
        progressBarElNodes[progressBarElNodes.length - 1].$emit('start', options)
      })
    },
    removeProgressBar(options = {}) {
      this.$refs.progressBars[0].$emit('finish', {
        ...options,
        callback: () => {
          this.queue.shift()
          options.callback && options.callback()
        }
      })
    },
    _getIncrementId() {
      if (!this.$progressBarIncrementID) {
        this.$progressBarIncrementID = 0
      }
      return this.$progressBarIncrementID++
    }
  }
}
</script>

<style scoped>
.vue-simple-progress-bar-wrapper {
  position: fixed;
  z-index: 10000;
  left: 0px;
  top: 0px;
  width: 100%;
  z-index: 99999;
}
</style>