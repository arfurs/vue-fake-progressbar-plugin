import Vue from 'vue'
import vpr from './index'

Vue.use(vpr)

new Vue({
  created() {
    // vpr.start()
    // Vue.$progress.start()
    this.$progress.start({
      color: 'red',
      shadow: '0px 0px 5px yellow'
    })
    setTimeout(() => {
      this.$progress.finish()
    }, 5000)
  },
  render(c) {
    return c('div')
  }
}).$mount('#app')