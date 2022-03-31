<script setup>
import Examples from "../components/Example";
import Template from "../components/Example/template.vue";
import '../components/Example/index.css'
import { onMounted, ref } from 'vue'
import { r, act } from 'r_animate'
import { clog } from "../utils";

const in_configs = [
  act.IN.BLUR,
  act.IN.OPACITY,
  act.IN.SCROLL_UP,
  act.IN.SCROLL_DOWN,
]
const out_configs = [
  act.OUT.BLUR,
  act.OUT.OPACITY,
  act.OUT.SCROLL_UP,
  act.OUT.SCROLL_DOWN,
]
const em_configs = [
  act.EMPHASIZE.SHAKE_X,
  act.EMPHASIZE.SHAKE_Y,
  act.EMPHASIZE.SHAKE_ROTATE
]
onMounted(() => {
})

const begin = function (e) {
  console.log(e.target.children)
}
</script>
<template>
  <div class="playground">
    <div>
      <Template :init="{opacity:'0'}" v-for="config in in_configs" :config="config"></Template>
    </div>
    <div>
      <Template :init="{opacity:'1'}" v-for="config in out_configs" :config="config"></Template>
    </div>
    <div>
      <Template :init="{opacity:'1'}" v-for="config in em_configs" :config="config"></Template>
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
  background-color: #363636;
  flex-wrap: wrap;
  align-items: center;
}

.court {
  border: 2px grey solid;
  border-radius: 10px;
  margin: 5px;
}

@media (min-width: 600px) {
  .court {
    width: 300px;
    height: 300px;
  }
}

@media (min-width: 300px) and (max-width: 600px) {
  .court {
    width: 300px;
    height: 300px;
  }
}

</style>