<script setup>

import { onMounted, ref, unref } from "vue";
import { PATTERNS, PLAIN_STYLE } from "../../const";
import { reverseMarked, marked, format_space } from "../../utils";

const props = defineProps(['value', 'autofocus'])
const emit = defineEmits(['input'])
const edit_el = ref(null)
const md_type = ref('text')

const onInput = function (e) {
  const el = e.target
  const text = format_space(el.innerText)
  if (md_type.value === 'text' && e.data === ' ') {
    PATTERNS.forEach(({ PATTERN, MD_TYPE, STYLE }) => {
      if (PATTERN.test(text)) {
        md_type.value = MD_TYPE
        Object.assign(el.style, STYLE)
        emit('input', reverseMarked(marked(text, 'text'), unref(md_type)))
      }
    })
  } else {
    emit('input', reverseMarked(el.innerText, unref(md_type)))
  }
}

const onKeydown = function (e) {
  if (e.key === 'Enter') {
    e.preventDefault()
  }
  if (e.key === 'Backspace') {
    const selection = getSelection()
    if (selection.anchorOffset === 0) {
      md_type.value = 'text'
      Object.assign(e.target.style, PLAIN_STYLE)
      const text = format_space(e.target.innerText)
      emit('input', reverseMarked(marked(text, 'text'), unref(md_type)))
    }
  }
}

onMounted(() => {
  PATTERNS.forEach(({ PATTERN, MD_TYPE, STYLE }) => {
    if (PATTERN.test(props.value)) {
      console.log(PATTERN, MD_TYPE, STYLE)
      md_type.value = MD_TYPE
      Object.assign(unref(edit_el).style, STYLE)
    }
  })
})

</script>

<template>
    <div
        :autofocus="props.autofocus"
        ref="edit_el"
        @input="onInput"
        @keydown="onKeydown"
        class="edit_box"
        contenteditable="true">
      {{ marked(props.value, 'text') }}
    </div>
</template>

<style scoped>
.edit_box {
  outline: 0 solid transparent;
}
</style>
