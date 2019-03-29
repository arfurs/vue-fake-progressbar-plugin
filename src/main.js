import Vue from 'vue'
import vpr from './index'

Vue.use(vpr)

new Vue({
  mounted() {
    test3.call(this)
  },
  render(c) {
    return c('div')
  }
}).$mount('#app')

// eslint-disable-next-line
function test1() {
  this.$progress.start({
    color: 'red',
    shadow: '0px 0px 8px yellow',
    height: '3px'
  })
  setTimeout(() => {
    this.$progress.start()
  }, 1000)
  setTimeout(() => {
    this.$progress.finish()
  }, 5000)
}

// eslint-disable-next-line
function test2() {
  this.$progress.start()
  setTimeout(() => {
    this.$progress.finish()
    this.$progress.start()
  }, 2500)
}

// eslint-disable-next-line
function test3() {
  this.$progress.start()
  setTimeout(() => {
    this.$progress.start()
  }, 10)
}