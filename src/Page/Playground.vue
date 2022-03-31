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
  act.EMPHASIZE.SHAKE_ROTATE,
  act.EMPHASIZE.ROTATE_90
]
const copy = ref()
const paste = function (name, e) {
  const { clientX, clientY } = e
  navigator.clipboard.writeText(name);
  r(copy.value).r_cancel().r_animate({
    top:`[${ clientY - 50 }~${ clientY - 50 }]px`,
    left:`[${ clientX - 50 }~${ clientX - 50 }]px`,
    opacity: '[0~1]',
    transform: 'translateY([0~-30]px)'
  }).r_animate({
    opacity: '[1~0]',
  })
}
</script>
<template>
  <div class="header">
    <span style="color: #6752FF">r_animate.js</span>
    <span>Act Pre-define Animations <span style="color: #8d8d8d">( Updating )</span></span>
    <span></span>
  </div>
  <div class="playground">
    <Template :init="{opacity:'0'}" v-for="config in in_configs" :config="config"
              v-on:click="(e)=>paste(config.name,e)"></Template>
    <Template :init="{opacity:'1'}" v-for="config in out_configs" :config="config"
              v-on:click="(e)=>paste(config.name,e)"></Template>
    <Template :init="{opacity:'1'}" v-for="config in em_configs" :config="config"
              v-on:click="(e)=>paste(config.name,e)"></Template>
  </div>
  <div ref="copy" class="copy">
    Copied!
  </div>
</template>


<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.playground {
  background-color: #363636;
  flex-wrap: wrap;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
}

.header {
  position: sticky;
  top: 0;
  width: 100vw;
  background-color: #363636;
  color: #dadada;
  font-weight: bolder;
  font-size: 20px;
  padding: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #6752FF;
  justify-content: space-between;
  z-index: 2;
}

.copy {
  position: absolute;
  top: 0;
  z-index: 3;
  color: #ffffff;
  font-weight: bolder;
  background-color: rgba(103, 82, 255, 0.42);
  padding: 10px 20px 10px 20px;
  border: 2px solid white;
  border-radius: 8px;
  opacity: 0;
}
</style>