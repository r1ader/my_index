<script setup>
import Welcome from './page/desktop.vue'
import Mobile from './page/mobile.vue'
import Three from './page/three_js_demo.vue'
import Blog from './page/blog.vue'
import Playground from './page/playground.vue'
import { useWindowSize } from "@vueuse/core/index"
import { useRouteHash } from "./utils/hooks";
import { computed } from "vue";

const { width: innerWidth } = useWindowSize()
const hash = useRouteHash()
const Desktop = computed(() => {
  return {
    three: Three,
    playground: Playground,
    blog: Blog,
  }[hash.value] || Welcome
})

</script>

<template>
  <div v-if="innerWidth>1100" class="desktop">
    <div class="header" v-if="hash!==''">
      <a class="link" href="#blog">blog</a>
      <a class="link" href="#playground">playground</a>
      <a class="link" href="#three">three</a>
    </div>
    <Desktop/>
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
  font-family: 'Varela Round', sans-serif;
}

.header {
  background: #d5d5d5;
}

.link {
  padding: 20px;
  line-height: 50px;
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
