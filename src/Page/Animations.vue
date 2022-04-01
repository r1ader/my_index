<script setup>
import Examples from "../components/Example";
import Template from "../components/Example/template.vue";
import '../components/Example/index.css'
import { onMounted, ref } from 'vue'
import { r, act } from 'r_animate'
import { clog } from "../utils";
import { isObject } from "lodash";


const in_configs = Object.keys(act.IN).map(key => act.IN[key]).filter(o => isObject(o))
const out_configs = Object.keys(act.OUT).map(key => act.OUT[key]).filter(o => isObject(o))
const em_configs = Object.keys(act.EMPHASIZE).map(key => act.EMPHASIZE[key]).filter(o => isObject(o))
const normal_configs = Object.keys(act.NORMAL).map(key => act.NORMAL[key]).filter(o => isObject(o))

const copy = ref()
const paste = function (name, e) {
  const { pageX, pageY } = e
  navigator.clipboard.writeText(name);
  r(copy.value).r_cancel().r_animate({
    top: `[${ pageY - 50 }~${ pageY - 50 }]px`,
    left: `[${ pageX - 50 }~${ pageX - 50 }]px`,
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
    <span class="page_title">Act Pre-define Animations <span style="color: #8d8d8d">( Updating )</span></span>
    <span></span>
  </div>
  <div class="playground">
    <div class="title">
      act.IN
    </div>
    <Template :init="{opacity:'1'}" v-for="config in in_configs" :config="config"
              v-on:click="(e)=>paste(config.name,e)"></Template>

    <div class="title">
      act.OUT
    </div>
    <Template :init="{opacity:'1'}" v-for="config in out_configs" :config="config"
              v-on:click="(e)=>paste(config.name,e)"></Template>

    <div class="title">
      act.EMPHASIZE
    </div>
    <Template :init="{opacity:'1'}" v-for="config in em_configs" :config="config"
              v-on:click="(e)=>paste(config.name,e)"></Template>

    <div class="title">
      act.NORMAL
    </div>
    <Template :init="{opacity:'1'}" v-for="config in normal_configs" :config="config"
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

.title {
  width: 100vw;
  color: #dadada;
  font-weight: bolder;
  font-size: 40px;
  padding-top: 30px;
  padding-bottom: 30px;
}

.playground {
  background-color: #363636;
  flex-wrap: wrap;
  align-items: center;
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

@media (max-width: 600px) {
  .page_title {
    display: none;
  }
}
</style>