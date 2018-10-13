import * as _ from './common'

import globalProgressBar from './GlobalProgressBar'
import config from './GlobalProgressBar.config'

export default {
  
  progressBarInstance: null,

  install(Vue, opts) {

    try {
      _.deepMerge(config, opts)
    } catch (e) {
      throw new Error('Vue-simple-progressbar configuration error, please refer to the complete configuration description.')
    }

    const globalProgressBarConstructor = Vue.extend(globalProgressBar)

    this.progressBarInstance = new globalProgressBarConstructor().$mount()
    document.body.appendChild(this.progressBarInstance.$el)

    const emit = eventName => this.progressBarInstance.$emit(eventName)

    Vue.$progress = Vue.prototype.$progress = {
      start: () => emit('start'),
      finish: () => emit('finish'),
      error: () => emit('errorFinish'),
      warning: () => emit('warningFinish'),
      success: () => emit('successFinish')
    }

  }
}