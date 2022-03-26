<script setup>
import Examples from "../components/Example";

</script>
<template>
  <div class="playground">
    <div v-for="Example in Examples" class="court">
      <component :is="Example"/>
    </div>
  </div>
</template>


<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.playground {
  width: 100vw;
  height: 100vh;
}

.court {
  width: 200px;
  height: 200px;
  border: 1px grey solid;
  border-radius: 5px;
  margin: 5px;
}

</style>