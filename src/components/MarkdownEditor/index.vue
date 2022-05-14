<script setup>

import { onMounted, ref, unref } from "vue";
import { MD_PATTERNS, PLAIN_STYLE } from "../../const";
import { reverseMarked, marked, format_space } from "../../utils";

const props = defineProps(['value', 'autofocus'])
const emit = defineEmits(['input'])
const edit_el = ref(null)
const md_type = ref('text')

const check_and_convert_md_type = (text) => {
  MD_PATTERNS.forEach(({ PATTERN, MD_TYPE, STYLE }) => {
    if (PATTERN.test(text)) {
      md_type.value = MD_TYPE
      Object.assign(unref(edit_el).style, STYLE)
    }
  })
}

const onInput = function (e) {
  const text = format_space(e.target.innerText)
  if (md_type.value === 'text' && e.data === ' ') {
    check_and_convert_md_type(text)
    emit('input', text)
  } else {
    emit('input', reverseMarked(e.target.innerText, unref(md_type)))
  }
}

const onEnterDown = function (e) {
  e.preventDefault()
}

const onBackspaceDown = function (e) {
  const selection = getSelection()
  if (selection.anchorOffset === 0 && selection.focusOffset === 0) {
    md_type.value = 'text'
    Object.assign(e.target.style, PLAIN_STYLE)
    const text = format_space(e.target.innerText)
    emit('input', text)
  }
}

const onKeydown = function (e) {
  switch (e.key) {
    case 'Enter':
      return onEnterDown(e)
    case 'Backspace':
      return onBackspaceDown(e)
  }
}

onMounted(() => {
  check_and_convert_md_type(props.value)
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
