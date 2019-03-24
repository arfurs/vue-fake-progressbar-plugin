import Vue from 'vue'
import vpr from './index'
import App from './App'

Vue.use(vpr)

new Vue({
  render: h => h(App)
}).$mount('#app')