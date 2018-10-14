import Vue from "vue"
import App from "./App"
import ProgressBar from './main'

Vue.use(ProgressBar, {
  mode: 0,
})

new Vue({
  el: '#app',
  render: h => h(App)
})

setTimeout(() => {
  Vue.$progress.start()
  setTimeout(() => {
    Vue.$progress.finish()
  }, 10000)
}, 2000)