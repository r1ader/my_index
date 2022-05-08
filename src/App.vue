<script setup>
import Desktop from './page/desktop.vue'
import Mobile from './page/mobile.vue'
import Three from './page/three_js_demo.vue'
import { useWindowSize } from "@vueuse/core/index"
import { useRouteHash } from "./utils/hooks";

const { width: innerWidth } = useWindowSize()
const hash = useRouteHash()
</script>

<template>
  <div v-if="innerWidth>1100" class="desktop">
    <Three v-if="hash==='threejs'"/>
    <Desktop v-else/>
  </div>
  <div v-if="innerWidth<=1100" class="mobile">
    <Mobile/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');

a {
  text-decoration: none;
}

body {
  margin: 0;
  padding: 0;
  cursor: None !important;
  overflow: hidden;
  font-family: 'Varela Round', sans-serif;
}

@media (min-width: 1100px) {
  .desktop {
    display: block;
  }

  .mobile {
    display: none;
  }
}

@media (max-width: 1100px) {
  .desktop {
    display: none;
  }

  .mobile {
    display: block;
  }
}
</style>
