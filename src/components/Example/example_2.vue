<template>
  <div class="ball" ref="ball"></div>
</template>

<script>
import { Director } from "../../utils/r_animate"
import './index.css'
import { clog } from "../../utils";

export default {
  mounted() {
    const director = new Director()
    director.take(this)
    this.$refs.ball.r_animate({
      background: 'rgb([40~100],[40~90],[40~18])',
      loop: 'alternate'
    })
  }
}
</script>

<style scoped>

</style>