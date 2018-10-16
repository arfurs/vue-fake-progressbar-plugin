<template>
  <div :style="containerStyle" class="progress-container" >
    <div class="linear-progress" >
      <div :style="style" class="linear-progress__bar"></div>
    </div>
    <div v-if="tip == ''" class="linear-progress__tip" >
      <slot :progress-tip="progressTip" >{{ progressTip + '%' }}</slot>
    </div>
    <div v-if="tip == 'icon'" class="linear-progress__icon-tip" >
      <template v-if="status == 'primary'" >
        <span v-if="progress == 100" ><i class="fa fa-check" ></i></span>
        <span v-else >{{ progressTip + '%' }}</span>
      </template>
      <template v-else class="linear-progress__icon-tip" >
        <i class="fa fa-check" ></i>
      </template>
    </div>
  </div>
</template>

<script>
  import config from './ProgressBar.config.js'
  export default {
    name: 'linear-progress-bar',
    props: {
      progress: {
        type: Number,
        default: 0
      },
      status: {
        validator(val) {
          return ['primary', 'error', 'success', 'warning'].includes(val)
        },
        default: 'primary'
      },
      color: {
        default: config.theme.primary
      },
      direction: {
        validator() {
          return ['transverse', 'vertical']
        },
        default: 'transverse'
      },
      height: {
        type: String,
        default: null
      },
      width: {
        type: String,
        default: null
      },
      tip: {},
      tipTransition: {
        type: Boolean,
        default: true        
      },
      duration: {
        type: Number,
        default: 600
      },
      timingFunction: {
        type: String,
        default: 'ease'
      }
    },
    data() {
      return {
        progressTip: this.progress
      }
    },
    computed: {
      containerStyle() {
        return {
          width: this.width || '100%',
          height: this.height || '5px' 
        }
      },
      style() {
        let color = config.theme[this.color] || this.color
        let style = {
          width: this.progress + '%',
          background: color,
          transitionDuration: this.duration + 'ms',
          transitionTimingFunction: this.timingFunction
        }
        return style
      },
    },
    watch: {
      // 改变tip
      progress(val, beforeVal) {

        if (this.tip === undefined) return clearInterval(this.$tipTimer)
        if (this.tipTransition == false) return this.progressTip = val

        if (this.$tipTimer) {
          this.progressTip = beforeVal
          clearInterval(this.$tipTimer)
        }

        let slice = Math.round((val - beforeVal) / 10)
        this.$tipTimer = setInterval(() => {
          let sur = val - this.progressTip
          if ((Math.abs(slice) == slice && sur <= slice) ||
              (Math.abs(slice) != slice && sur >= slice))
            return this.progressTip = val, clearInterval(this.$tipTimer)
          this.progressTip += slice
        }, 30)
      }
    },
    created() {
      console.log(typeof this.tip)
    }
  }
</script>

<style lang="scss" >
  @import './assets/font-awesome-4.7.0/css/font-awesome.min.css';
  .progress-container {
    display: flex;
    height: 5px;
    align-items: center;
    width: 100%;
  }
  .linear-progress {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #E5E8ED;
    background-size: cover;
    border-radius: 500px 500px;
    overflow: hidden;
    &__bar {
      position: relative;
      width: 0%;
      height: 100%;
      background-color: #0D98FA;
      border-radius: 500px 500px;
      transition: all ease;
    }
    &__tip {
      margin-left: 10px;
      min-width: 35px;
      text-align: center;
      font-size: 14px;
      color: #64676A;
    }
    &__icon-tip {
      margin-left: 10px;
      min-width: 35px;
      text-align: center;
      font-size: 14px;
      color: #64676A;
    }
  }
</style>


