<template>
  <div ref="court" class="court">
    <div :style="init" :class="shape" ref="target"></div>
  </div>
</template>

<script>
import { r } from "r_animate"
import './index.css'

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
        r(this.$refs.target).r_animate(this.config)
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
    this.$refs.court.addEventListener('mouseleave', function () {
      _this.active = false
    })
  }
}
</script>

<style scoped>

</style>