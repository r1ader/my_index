<script setup>
import Playground from "./Page/Playground.vue";
import Animations from "./Page/Animations.vue";
</script>
<script>
import Document from "./Page/Document.vue";
import _ from "lodash";
import { Director } from "r_animate";
import { debug } from './const/config'
import { clog } from './utils/index'
// todo check Composition api
const routes = {
  '/': Document,
  'playground': Playground,
  'animations': Animations
}
export default {
  components: {
  },
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || Document
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
    })
  }
}
</script>

<template>
  <div>
    <component :is="currentView"/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Merienda&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');

body {
  margin: 0;
  padding: 0;
}


</style>
