<script setup>
import { useMarked } from "../utils/hooks";
import { onMounted, ref, unref } from "vue";
import MarkdownEditor from "../components/MarkdownEditor/index.vue";
import { ANCHOR_OFFSET_END } from '../const'

const text = ref(`123456789`)
const body = ref(null)
const rendered_markdown = useMarked(text)
const viewState = ref('edit')

onMounted(() => {
  // unref(body).addEventListener('click', function (e) {
  //   if (e.target !== unref(body)) return
  //   const target_el = unref(body).children[0]
  //   target_el.innerText.length === 0 ? target_el.focus() :
  //       getSelection().setBaseAndExtent(target_el, ANCHOR_OFFSET_END, target_el, ANCHOR_OFFSET_END)
  // })
})
</script>

<template>
  <div class="main_container">
    <div class="left">
      <textarea v-model="text"/>
    </div>
    <div ref="body" class="blog_body marked">
      <div v-if="viewState==='view'" v-html="rendered_markdown"></div>
      <MarkdownEditor
          v-if="viewState==='edit'"
          @input="text=$event"
          v-bind:value="text"
      />
    </div>
    <div class="right">
      <button @click="viewState='edit'">edit</button>
      <button @click="viewState='view'">view</button>
    </div>
  </div>
</template>

<style scoped>
.main_container {
  background: #efefef;
  display: grid;
  grid-template-columns: 1fr 1000px 1fr;
  min-height: calc(100vh - 50px);
}

.blog_body {
  background: white;
  max-width: 1000px;
  /*padding: 30px;*/
  margin: 30px;
  border-radius: 5px;
}

.left {
  padding: 30px 0 30px 30px;
}

.right {
  padding: 30px 30px 30px 0;
}

.left textarea {
  height: 100%;
  width: 100%;
}

.right button {
  height: 40px;
  width: 100%;
  margin-bottom: 10px;
}
</style>
<style>
.marked .code {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
}

.marked .code_span {
  border-radius: 2px;
  padding: 0 5px;
  background: #ef8a8d;
  color: white;
}

.marked h1, h2, h3, h4, h5 {
  margin: 0;
}
</style>
