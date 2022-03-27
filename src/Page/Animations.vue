
<script setup>
import Template from "../components/Example/template.vue";

const configs = [
  {
    transform: 'scale([1~1.5])',
    loop: 'alternate'
  },
  {
    transform: 'translate([0~40]px)',
    loop: 'alternate'
  },
  {
    transform: 'rotateX([0~40]deg)',
    loop: 'alternate'
  },
  {
    transform: 'rotateX([0~-80]deg) rotateY([0~360]deg)',
    loop: 'alternate'
  },
  {
    borderRadius: '[50~0]px',
    loop: 'alternate'
  },
  {
    borderRadius: '[0~0]px',
    transform: '  rotateY([0~90]deg) perspective(100px) rotateX([110~110]deg) rotateZ([45~45]deg)',
    loop: 'alternate'
  },
  {
    borderRadius: '[0~0]px',
    transform: 'translateY(100px) perspective(200px) rotateY([0~90]deg)  translateY(-100px) rotateX(90deg) rotateZ(45deg)',
    ease: 'Linear',
    loop: true
  },
]

</script>
<template>
  <div class="playground">
    <div v-for="config in configs">
      <Template :config="{
        ...config,
        loop: false
      }"/>
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
  background-color: #dadada;
  flex-wrap: wrap;
  align-items: flex-start;
}

.court, .playground > div {
  width: 200px;
  height: 200px;
  border: 1px grey solid;
  border-radius: 5px;
  margin: 5px;
}

</style>