<script setup>
import Examples from "../components/Example";
import Template from "../components/Example/template.vue";
import '../components/Example/index.css'
import { onMounted, ref } from 'vue'
import { r, act } from 'r_animate'
import { clog } from "../utils";


const rect = ref()
const rect2 = ref()

onMounted(() => {
  r(rect.value).r_animate({ duration: 1000 })
      .r_animate({ ...act.IN.SCROLL_DOWN })
      // .r_animate({ ...act.BLUR_IN })
  // .r_animate({ ...act.SHAKE_Y })
  // .r_animate({ ...act.SHAKE_ROTATE })
})
</script>
<template>
  <div class="playground">
    <div class="court">
      <div ref="rect" class="rectangle">1</div>
    </div>
    <!--    <div class="court">-->
    <!--      <div ref="rect2" class="rectangle"></div>-->
    <!--    </div>-->
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