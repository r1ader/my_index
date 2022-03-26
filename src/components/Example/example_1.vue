<template>
  <div class="ball" ref="ball"></div>
</template>

<script>
import R_director from "../../utils/r_animate"
import './index.css'

export default {
  mounted() {
    const director = new R_director()
    director.take(this)

    this.$refs.ball.r_animate({
      opacity: '[1~0]',
      duration: 1000,
      loop: true
    })
  }
}
</script>

<style scoped>

</style>