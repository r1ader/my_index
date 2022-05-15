<script setup>

import { nextTick, onMounted, ref, unref } from "vue";
import { MD_PATTERNS, INDENT, NEED_PREVENT_KEY } from "../../const";
import { reverseMarked, marked, textSplice, set_cursor_position, get_cursor } from "../../utils";

const props = defineProps(['value', 'autofocus'])
const emit = defineEmits(['input', 'new'])
const edit_el = ref(null)
const md_type = ref('text')

const post_content = (text = get_display_text()) => {
  emit('input', reverseMarked(text, unref(md_type)))
}

const update_content = (text = props.value, offset = 0) => {
  const position_saved = getSelection().anchorOffset
  unref(edit_el).innerHTML = text.replace(/\s/g, '&nbsp;')

  getSelection().anchorNode === unref(edit_el) &&
  set_cursor_position(unref(edit_el), position_saved + offset)
}

const get_display_text = () => {
  return unref(edit_el).innerHTML.replace(/&nbsp;/g, ' ')
}

const set_md_type = (type) => {
  if (md_type.value === type) return
  md_type.value = type
  const MD_CONFIG = MD_PATTERNS.find(o => o.MD_TYPE === type)
  Object.assign(
      unref(edit_el).style,
      MD_CONFIG?.STYLE
  )
  update_content(
      marked(get_display_text(), 'text'),
      MD_CONFIG?.CURSOR_OFFSET
  )
}

const check_and_convert_md_type = (text = props.value) => {
  return MD_PATTERNS.find(({ PATTERN, MD_TYPE, STYLE, CURSOR_OFFSET }) => {
    if (PATTERN.test(text)) {
      set_md_type(MD_TYPE)
      return true
    }
    return false
  })
}

const onInput = function (e) {
  post_content()
  md_type.value === 'text' && e.data === ' ' &&
  nextTick(() => check_and_convert_md_type())
}

const onEnterDown = function (e) {
  const {
    isCursorAtEnd
  } = get_cursor()
  isCursorAtEnd && emit('new')
}

const onTabDown = function (e) {
  const text = get_display_text()
  const { anchorOffset } = getSelection()
  const textInsertedIndent = textSplice(text, anchorOffset, 0, INDENT)
  update_content(textInsertedIndent, 4)
  post_content(textInsertedIndent)
  nextTick(() => check_and_convert_md_type())
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
  props.value && update_content()
  props.value && check_and_convert_md_type()
  // !props.value && unref(edit_el).focus()
})

</script>

<template>
  <span
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
