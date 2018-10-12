import progressBarComponent from './ProgressBar'

export default {
  
  progressBarInstance: null,

  install(Vue, options) {

    const progressBarConstructor = Vue.extend(progressBarComponent)
    this.progressBarInstance = new progressBarConstructor().$mount()
    document.body.appendChild(this.progressBarInstance.$el)

    const methods = Vue.$progress = Vue.prototype.$progress = {}

    const emit = eventName => this.progressBarInstance.$emit(eventName)
    methods.start = () => emit('start')
    methods.finish = () => emit('finish')
    methods.error = () => emit('errorFinish')
    methods.warning = () => emit('warningFinish')
    methods.success = () => emit('successFinish')
  }
}