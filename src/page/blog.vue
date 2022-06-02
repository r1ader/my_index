<script setup>
import { useMarked } from "../utils/hooks";
import { nextTick, onMounted, ref, unref, watch } from "vue";
import MarkdownEditor from "../components/MarkdownEditor/Block.vue";
import { ANCHOR_OFFSET_END } from '../const'
import { useLocalStorage } from "@vueuse/core/index";
import { marked, reverseMarked } from "../utils";

const text = ref(useLocalStorage('blog:text1', '# '))
const body = ref(null)
const rendered_markdown = useMarked(text)
const viewState = ref('edit')
const htmlContent = ref(marked(unref(text)))
reverseMarked(marked(unref(text)))
</script>

<template>
  <div class="main_container">
    <div class="left">
      <textarea v-model="text" @input="nextTick(() => body.update_content())"/>
    </div>
    <div class="blog_body marked">
      <div v-if="viewState==='view'" v-html="rendered_markdown"></div>
      <MarkdownEditor
          ref="body"
          v-if="viewState==='edit'"
          @input="text=$event"
          @htmlChange="htmlContent=$event"
          v-bind:value="text"
      />
      <br>
      <br>
      <br>
      ------
      <br>
      <br>
      <br>
      {{ text }}
      <br>
      <br>
      <br>
      ------
      <br>
      <br>
      <br>
      {{ htmlContent }}
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
  grid-template-columns: 1fr 700px 1fr;
  min-height: calc(100vh - 50px);
}

.blog_body {
  background: white;
  max-width: 1000px;
  padding: 30px;
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
