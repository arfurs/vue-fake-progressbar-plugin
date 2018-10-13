import Vue from "vue"
import App from "./App"
import ProgressBar from './main'

Vue.use(ProgressBar, {
  theme: {
    error: 'blue',
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})

setTimeout(() => {
  Vue.$progress.start()
  setTimeout(() => {
    Vue.$progress.error()
  }, 10000)
}, 2000)