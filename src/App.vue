<script>
import Playground from "./Page/Playground.vue";
import Document from "./Page/Document.vue";
import _ from "lodash";
import R_director from "./utils/r_animate";
import { debug } from './const/config'
import { clog } from './utils/index'

const routes = {
  '/': Document,
  'playground': Playground
}
export default {
  components: {
    Playground,
    Document
  },
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      clog(this.currentPath.slice(1))
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
