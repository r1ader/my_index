<template>
  <div class="ball" ref="ball"></div>
</template>

<script>
import { Director } from "../../utils/r_animate"
import './index.css'

export default {
  mounted() {
    const director = new Director()
    director.take(this)

    this.$refs.ball.r_animate({
      opacity: '[1~0]',
      interpolation: 'Linear',
      loop: 'alternate'
    })
  }
}
</script>

<style scoped>

</style>