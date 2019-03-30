# Vuejs假进度条插件（网站上方假进度条）
### Vue.js fake progress bar plugin (fake progress bar above the website)

### Usage

`npm i vue-fake-progressbar -S`

```javascript
import fakeProgressBar from 'vue-fake-progressbar'

Vue.use(fakeProgressBar)

Vue.$progress.start()

Vue.$progress.finish()

this.$progress.start({
  color: 'red',
  shadow: '0px 0px 5px yellow',
  height: '4px'
})

setTimeout(() => {
  this.$progress.finish({
    color: 'red',
    shadow: '0px 0px 10px red',
    callback: () => {} // transitionend callback
  })
}, 5000)
```

#### Call through component instance:

`this.$progress.{method}()`

#### Config
```javascript
Vue.use(fakeProgressBar, {
  name: '$xxxProgressBar'
})

Vue.$xxxProgressBar.start()
```
