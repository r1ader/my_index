<template>
  <div class="ball" ref="ball"></div>
</template>

<script>
import R_director from "../../utils/r_animate"
import './index.css'

export default {
  props: {
    config: null
  },
  mounted() {
    const director = new R_director()
    director.take(this)

    if (this.config) {
      this.$refs.ball.r_animate(this.config)
    }
  }
}
</script>

<style scoped>

</style>