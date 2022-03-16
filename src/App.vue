<script>
import Hello from './components/Hello.vue'

export default {
  data() {
    return {
      message: 'Hello'
    }
  },
  mounted() {

  }
}
</script>

<template>
  <div>
    <div ref="cursor" class="cursor"></div>
    <Hello msg="Hello Vue 3 + Vite"/>
  </div>
</template>

<style>
body {
}

.cursor {
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: aliceblue;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}

body {
  margin: 0;
  padding: 0;
}
</style>
