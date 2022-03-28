<script setup>
import Examples from "../components/Example";
import Template from "../components/Example/template.vue";
import '../components/Example/index.css'
import { onMounted, ref } from 'vue'

const rotateForFiveRounds =
    {
      transform: 'translateY(100px) perspective(200px) rotateY([0~90]deg)  translateY(-100px) rotateX(90deg) rotateZ(45deg)',
      loop: 2,
      loop_mode: 'alternate'
    }

import { r_register, act, r_default } from 'r_animate'
import { clog } from "../utils";

const rect = ref()

onMounted(() => {
  r_register(rect.value)
  // r_default({ duration: 500 })
  rect.value.r_default({
    duration: 1500,
    ease: 'Linear'
  })
  rect.value.r_animate(rotateForFiveRounds).r_animate(act.FADE_OUT).r_animate(act.FADE_IN)
})
</script>
<template>
  <div class="playground">
    <div class="court">
      <div ref="rect" class="rectangle"></div>
      <!--      <Template shape="rectangle" :config="config"/>-->
    </div>
  </div>
</template>


<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.playground {
  width: 100vw;
  height: 100vh;
  background-color: #dadada;
  flex-wrap: wrap;
  align-items: center;
}

.court {
  border: 1px grey solid;
  border-radius: 5px;
  margin: 5px;
}

@media (min-width: 600px) {
  .court {
    width: 500px;
    height: 500px;
  }
}

@media (min-width: 300px) and (max-width: 600px) {
  .court {
    width: 300px;
    height: 300px;
  }
}

</style>