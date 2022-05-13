<script setup>
import { useMarked } from "../utils/hooks";
import { ref } from "vue";

const text = ref(`# default

##h2

\`\`\`code\`\`\`


\`\`\`codcj

de\`\`\`

\`codcjde\`
`)
const rendered_markdown = useMarked(text)
</script>

<template>
  <div class="main_container">
    <div class="left">
      <textarea v-model="text"/>
    </div>
    <div class="blog_body marked" v-html="rendered_markdown"/>
    <div>
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
  padding: 30px;
  margin: 30px;
  border-radius: 5px;
}

.left {
  padding: 30px 0 30px 30px;
}

.left textarea {
  height: 100%;
  width: 100%;
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
.marked h1,h2,h3,h4,h5 {
  margin: 0;
}
</style>
