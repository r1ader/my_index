<script setup>
import Examples from "../components/Example";
import Template from "../components/Example/template.vue";
import '../components/Example/index.css'
import { onMounted, ref } from 'vue'
import { r, act } from 'r_animate'
import { clog } from "../utils";

const config = act.EMPHASIZE.BORDER_STROKE
const el = ref()
const el2 = ref()
const el3 = ref()
const el4 = ref()
const el5 = ref()
const el6 = ref()
onMounted(() => {
  el.value.begin()
  el2.value.begin()
  el3.value.begin()
  el4.value.begin()
  el5.value.begin()
  el6.value.begin()
})
</script>
<template>
  <div class="header">
    <span style="color: #6752FF">r_animate.js</span>
    <span>Playground</span>
    <span style="opacity: 0">r_animate.js</span>
  </div>
  <div class="playground">
    <Template ref="el" :config="config"></Template>
    <Template :init="{width:'200px'}" ref="el2" :config="config"></Template>
    <Template :init="{height:'200px'}" ref="el3" :config="config"></Template>
    <div>
      <Template :init="{width:'200px',height:'200px'}" ref="el4" :config="config"></Template>
      <Template ref="el5" :init="{borderRadius:'50%'}" :config="config"></Template>
      <Template ref="el6" :init="{width:'200px',height:'200px',borderRadius:'50%'}" :config="config"></Template>
    </div>
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