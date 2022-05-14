<script setup>

import { nextTick, onMounted, ref, unref } from "vue";
import { MD_PATTERNS, PLAIN_STYLE, INDENT, NEED_PREVENT_KEY } from "../../const";
import { reverseMarked, marked, format_space, textSplice } from "../../utils";

const props = defineProps(['value', 'autofocus'])
const emit = defineEmits(['input'])
const edit_el = ref(null)
const md_type = ref('text')

const post_content = (text = get_display_text()) => {
  emit('input', reverseMarked(text, unref(md_type)))
}

const update_content = (text = props.value) => {
  unref(edit_el).innerHTML = text.replace(/\s/g, '&nbsp;')
}

const get_display_text = () => {
  return unref(edit_el).innerHTML.replace(/&nbsp;/g, ' ')
}

const set_md_type = (type) => {
  console.log('convert to ', type)
  md_type.value = type
  Object.assign(
      unref(edit_el).style,
      MD_PATTERNS.find(o => o.MD_TYPE === type)?.STYLE
  )
}

const check_and_convert_md_type = (text) => {
  return MD_PATTERNS.find(({ PATTERN, MD_TYPE, STYLE }) => {
    console.log(PATTERN, text, PATTERN.test(text))
    if (PATTERN.test(text)) {
      md_type.value !== MD_TYPE && set_md_type(MD_TYPE)
      update_content(marked(text, 'text'))
      return true
    }
    return false
  })
}

const onInput = function (e) {
  const text = get_display_text()
  md_type.value === 'text' && e.data === ' ' &&
  check_and_convert_md_type(text)
  nextTick(() => post_content())
}

const onEnterDown = function (e) {

}

const onTabDown = function (e) {
  const text = get_display_text()
  const { anchorOffset } = getSelection()
  const textInsertedIndent = textSplice(text, anchorOffset, 0, INDENT)

  post_content(textInsertedIndent)
  nextTick(() => check_and_convert_md_type(props.value))
}

const onBackspaceDown = function (e) {
  const selection = getSelection()
  if (selection.anchorOffset === 0 && selection.focusOffset === 0) {
    set_md_type('text')
    post_content()
  }
}

const onKeydown = function (e) {
  NEED_PREVENT_KEY.indexOf(e.key) > -1 && e.preventDefault()
  switch (e.key) {
    case 'Enter':
      return onEnterDown(e)
    case 'Backspace':
      return onBackspaceDown(e)
    case 'Tab':
      return onTabDown(e)
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
      contenteditable="true"
  />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&family=Noto+Sans+SC&family=Varela+Round&display=swap');

.edit_box {
  outline: 0 solid transparent;
  font-family: 'Noto Sans SC', sans-serif;
}
</style>
