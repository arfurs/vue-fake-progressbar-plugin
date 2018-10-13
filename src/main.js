import * as _ from './common'

import config from './GlobalProgressBar.config'

export default {
  
  progressBarInstance: null,

  async install(Vue, opts) {

    try {
      _.deepMerge(config, opts)
    } catch (e) {
      throw new Error('vue-simple-progressbar: configuration error, please refer to the complete configuration description.')
    }

    const globalProgressBar = (await this.importProgressBarThroughMode(config.mode)).default

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

  },

  importProgressBarThroughMode(mode) {
    try {
      return import(`./GlobalProgressBar${mode}`)
    } catch (e) {
      throw new Error('vue-simple-progressbar: does not support this mode.')
    }
  }

}