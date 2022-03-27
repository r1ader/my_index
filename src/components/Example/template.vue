<template>
  <div :class="shape" ref="ball"></div>
</template>

<script>
import { Director } from "r_animate"
import './index.css'

export default {
  props: {
    config: null,
    shape: {
      default: 'ball',
      type: String
    }
  },
  mounted() {
    const director = new Director()
    director.take(this)

    if (this.config) {
      this.$refs.ball.r_animate(this.config)
    }
  }
}
</script>

<style scoped>

</style>