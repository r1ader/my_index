<script>

import _ from "lodash";
import R_director from "./utils/r_animate";
import { debug } from './const/config'
import { clog } from './utils/index'

export default {
  components: {
  },
  data() {
    return {
    }
  },
  watch: {
  },
  methods: {
  },
  mounted() {
    const r_director = new R_director()
    r_director.take(this)
  }
}
</script>

<template>
  <div>
    <div>hello</div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Merienda&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');

body {
  margin: 0;
  padding: 0;
}


</style>
