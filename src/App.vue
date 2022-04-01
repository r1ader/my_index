<script setup>
import Animations from "./Page/Animations.vue";
import Playground from "./Page/Playground.vue";
import Docpage from "./Page/Document.vue";
import { computed, onMounted, ref } from "vue";

const routes = {
  '/': Animations,
  'playground': Playground,
  'animations': Animations
}
const currentPath = ref(window.location.hash)
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || Animations
})

onMounted(() => {
  window.addEventListener('hashchange', () => {
    currentPath.value = window.location.hash
  })
})

</script>

<template>
  <div>
    <component :is="currentView"/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');

body {
  margin: 0;
  padding: 0;
  background-color: #363636;
  overflow-x: hidden;
  font-family: Varela Round, Arial, sans-serif;
}


</style>
