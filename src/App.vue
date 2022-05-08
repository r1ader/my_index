<script setup>
import Desktop from './page/desktop.vue'
import Mobile from './page/mobile.vue'
import { useWindowSize } from "@vueuse/core/index";
const { width: innerWidth, height } = useWindowSize()

</script>

<template>
  <div class="desktop">
    <Desktop v-if="innerWidth>1100"/>
  </div>
  <div class="mobile">
    <Mobile v-if="innerWidth<=1100"/>
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
