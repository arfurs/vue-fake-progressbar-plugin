import Vue from "vue"
import App from "./App"
import ProgressBar from './main'

Vue.use(ProgressBar)

new Vue({
  el: '#app',
  render: h => h(App)
})

setTimeout(() => {
  Vue.$progress.start()
  setTimeout(() => {
    Vue.$progress.error()
  }, 10000)
}, 3000)