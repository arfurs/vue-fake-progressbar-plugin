/* eslint-disable */
import Vue from 'vue'
import vpr from './index'

Vue.use(vpr)

new Vue({
  mounted() {
    // test0.call(this)
    // test1.call(this)
    // test2.call(this)
    test3.call(this)
    // endedImmediately.call(this)
  },
  render(c) {
    return c('div')
  }
}).$mount('#app')

// 正常延迟使用
function test0() {
  this.$progress.start()
  setTimeout(() => {
    this.$progress.finish()
  }, 3000)
}

// 重复延迟调用 start
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

// 调用完finish立即调用start
function test2() {
  this.$progress.start()
  setTimeout(() => {
    this.$progress.finish()
    this.$progress.start()
  }, 2500)
}

// start重复调用
function test3() {
  this.$progress.start()
  this.$progress.start()
}

// start完立即finish
function endedImmediately() {
  setTimeout(() => {
    this.$progress.start()
    this.$progress.finish()
  }, 1000)
}