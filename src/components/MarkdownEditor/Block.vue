<script setup>

import { nextTick, onMounted, ref, unref } from "vue";
import { MD_PATTERNS, INDENT, NEED_PREVENT_KEY } from "../../const";
import {
  reverseMarked,
  marked,
  textSplice,
  set_cursor_position,
  get_cursor,
  get_node_path,
  get_node_by_path
} from "../../utils";

const props = defineProps(['value', 'autofocus'])
const emit = defineEmits(['input', 'htmlChange'])
const edit_el = ref(null)

const post_content = (text = get_display_text()) => {
  emit('input', reverseMarked(text))
  emit('htmlChange', text)
}

const update_content = (text = props.value, offset = 0) => {
  const position_saved = getSelection().anchorOffset
  const path_saved = get_node_path(unref(edit_el), getSelection().anchorNode)

  unref(edit_el).innerHTML = marked(text)

  path_saved && getSelection().anchorNode === unref(edit_el) &&
  set_cursor_position(get_node_by_path(unref(edit_el), path_saved), position_saved + offset)
}

defineExpose({ update_content })

const get_display_text = () => {
  return unref(edit_el).innerHTML
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
}

const onInput = function (e) {
  post_content()
  e.data === ' ' &&
  nextTick(() => update_content())
}

const onEnterDown = function (e) {

}

const onTabDown = function (e) {
  const text = get_display_text()
  const { anchorOffset } = getSelection()
  const textInsertedIndent = textSplice(text, anchorOffset, 0, INDENT)
  update_content(textInsertedIndent, 4)
  post_content(textInsertedIndent)
  nextTick(() => update_content())
}

const onBackspaceDown = function (e) {
  const selection = getSelection()
  if (selection.anchorOffset === 0 && selection.focusOffset === 0) {

    const node_to_plain = selection.anchorNode.parentNode === unref(edit_el) ?
        selection.anchorNode : selection.anchorNode.parentNode
    console.log(selection.anchorNode, node_to_plain.toString())
    if (['[object HTMLHeadingElement]'].indexOf(node_to_plain.toString()) === -1) return
    e.preventDefault()
    node_to_plain.after(node_to_plain.textContent)
    node_to_plain.parentNode.removeChild(node_to_plain)
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
  unref(edit_el).focus()
  props.value && update_content()
  // !props.value && unref(edit_el).focus()
})

</script>

<template>
  <span
      ref="edit_el"
      @input.capture="onInput"
      @keydown="onKeydown"
      class="edit_box"
      contenteditable="true"
  />
  <br>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&family=Noto+Sans+SC&family=Varela+Round&display=swap');

.edit_box {
  outline: 0 solid transparent;
  font-family: sans-serif;
}
</style>


<style>
.marked .code {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
}

.marked h1, h2, h3, h4, h5 {
  margin: 0;
}

.marked code {
  /*font-size: 15px;*/
  font-weight: bolder;
  border-radius: 2px;
  padding: 0 5px;
  color: white;
}
</style>
