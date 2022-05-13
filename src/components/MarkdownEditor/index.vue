<script setup>

import { onMounted, ref, unref } from "vue";
import { H1_PARTTEN } from "../../const";

const edit_el = ref(null)
const props = defineProps(['value'])
const emit = defineEmits(['input'])
const onInput = function (e) {
  const el = e.target
  if (e.data === ' ' && encodeURI(el.innerText) === H1_PARTTEN) {
    el.style.fontSize = '30px'
  }
  emit('input', e.target.innerText)
}

onMounted(() => {
  console.log(edit_el.value)
})

</script>

<template>
  <div>
    <div
        ref="edit_el"
        @input="onInput"
        class="edit_box"
        contenteditable="true">
      {{ props.value }}
    </div>
  </div>
</template>

<style scoped>
.edit_box {
  outline: 0 solid transparent;
}
</style>
