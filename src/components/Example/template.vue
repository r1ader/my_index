<template>
  <div ref="court" class="court">
    <div :style="init" :class="shape" ref="target"></div>
    <div class="name">{{ config.name.split('.').reverse()[0] }}</div>
    <div class="playing" ref="playing"></div>
  </div>
</template>

<script>
import { r } from "ractjs"
import './index.css'
import { cloneDeep } from "lodash";

export default {
  data: function () {
    return {
      active: false,
      queue: []
    }
  },
  props: {
    config: null,
    shape: {
      default: 'rectangle',
      type: String
    },
    init: null
  },
  methods: {
    begin() {
      if (this.config) {
        const style = {...this.$refs.target.style,...this.init}
        r(this.$refs.playing).cancel().act({
          transform: 'scale([0~1])'
        })
        r(this.$refs.target).cancel().act(this.config).then(() => {
          this.$refs.target.style = style
          r(this.$refs.playing).cancel().act({
            transform: 'scale([1~0])'
          })
        })
      }
    },
  },
  watch: {
    active: function (newValue) {
      if (newValue && !r(this.$refs.target).busy) this.begin()
    }

  },
  mounted() {
    const _this = this
    this.$refs.court.addEventListener('mouseenter', function () {
      _this.active = true
    })
    this.$refs.court.addEventListener('touchstart', function () {
      _this.active = true
    })
    this.$refs.court.addEventListener('mouseleave', function () {
      _this.active = false
    })
    this.$refs.court.addEventListener('touchend', function () {
      _this.active = false
    })
  }
}
</script>

<style scoped>
.name {
  position: absolute;
  color: #dadada;
  font-weight: bolder;
  bottom: 30px
}

.playing {
  position: absolute;
  background: #35ff49;
  top: 30px;
  right: 30px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  transform: scale(0);
}
</style>