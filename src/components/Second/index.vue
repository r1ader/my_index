<template>
  <div class="main_container">
    <div class="main_block">
      <!--      <div>{{ Math.floor(count / 60) }}.{{ Math.floor(count / 6) % 10 }}</div>-->
      <!--      <div ref="a">{{ data }}</div>-->
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

console.clear()
var cat = { breed: "Russian Blue" } // cat.__proto__ lists all its methods and cat.prototype returns undefined as expected
var dog = { age: 7 } // same for the dog variable
// Now, let's see how we can get the cat object to access the properties of the dog object


Object.setPrototypeOf(cat, dog)
// console.log('age' in cat)
for (let i in cat) {
  console.log('cat', i)
}
for (let i in dog) {
  console.log('dog', i)
}
console.log(Object.keys(cat))
console.log(Object.keys(dog))
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main_container {
  background: #202020;
}

.main_block {
  width: 100vw;
  height: 100vh;
  color: white;
}
</style>
