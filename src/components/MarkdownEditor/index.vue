<script setup>

import Block from './Block.vue'
import { ref, unref, watch } from "vue";

const props = defineProps(['value', 'autofocus'])
const emit = defineEmits(['input', 'new'])

const blocks = ref([
  '# h1',
  '## h2h2h2',
  'txtxtxtx'
])
watch(() => unref(blocks).join('\n\n'), (text) => {
  emit('input', text)
})

const onInput = (e) => {
  const el = getSelection().anchorNode
  const evt = new InputEvent('input', {
    data: e.data
  })
  el.dispatchEvent(evt)
}
const onKeydown = (e) => {
  console.log(e)
  const el = getSelection().anchorNode
  const evt = new KeyboardEvent('keydown', {
    key: e.key,
    keyCode: e.keyCode,
    code: e.code,
    which: e.which,
    shiftKey: e.shiftKey,
    ctrlKey: e.ctrlKey,
    metaKey: e.metaKey
  })
  console.log(evt)
  el.dispatchEvent(evt)
}
</script>

<template>
  <div class="editor_container">
    <Block
        v-for="(text, index) in blocks"
        :value="text"
        @input="blocks[index] = $event"
    />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&family=Noto+Sans+SC&family=Varela+Round&display=swap');

.editor_container {
  box-sizing: border-box;
  padding: 30px;
  height: 100%;
  width: 100%;
}
</style>
