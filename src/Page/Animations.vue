<script setup>
import Template from "../components/Example/template.vue";
import '../components/Example/index.css'
import { onMounted, ref } from 'vue'
import { r, acts } from 'ractjs'
import { clog } from "../utils";
import { isObject } from "lodash";


const in_configs = Object.keys(acts.IN).map(key => acts.IN[key]).filter(o => isObject(o))
const out_configs = Object.keys(acts.OUT).map(key => acts.OUT[key]).filter(o => isObject(o))
const em_configs = Object.keys(acts.EMPHASIZE).map(key => acts.EMPHASIZE[key]).filter(o => isObject(o))
const normal_configs = Object.keys(acts.NORMAL).map(key => acts.NORMAL[key]).filter(o => isObject(o))

const copy = ref()
const paste = function (name, e) {
  const { pageX, pageY } = e
  navigator.clipboard.writeText(name);
  r(copy.value).cancel().act({
    top: `[${ pageY - 50 }~${ pageY - 50 }]px`,
    left: `[${ pageX - 50 }~${ pageX - 50 }]px`,
    opacity: '[0~1]',
    transform: 'translateY([0~-30]px)'
  }).act({
    opacity: '[1~0]',
  })
}
</script>
<template>
  <div class="header">
    <span style="color: #6752FF"><span style="font-size: 30px">r</span>act.js</span>
    <span class="page_title">acts: Pre-define Animations <span style="color: #8d8d8d">( Updating )</span></span>
    <span></span>
  </div>
  <div class="playground">
    <div class="title">
      acts.IN
    </div>
    <Template :init="{opacity:'1'}" v-for="config in in_configs" :config="config"
              v-on:click="(e)=>paste(config.name,e)"></Template>

    <div class="title">
      acts.OUT
    </div>
    <Template :init="{opacity:'1'}" v-for="config in out_configs" :config="config"
              v-on:click="(e)=>paste(config.name,e)"></Template>

    <div class="title">
      acts.EMPHASIZE
    </div>
    <Template :init="{opacity:'1'}" v-for="config in em_configs" :config="config"
              v-on:click="(e)=>paste(config.name,e)"></Template>

    <div class="title">
      acts.NORMAL
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