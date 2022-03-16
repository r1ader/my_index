<script>
import Hello from './components/Hello.vue'
import Introduce from './components/Introduce.vue'
import _ from "lodash";

const clog = console.log
export default {
  components: {
    Hello,
    Introduce
  },
  data() {
    return {}
  },
  methods: {
    init_cursor() {
      const cursor = this.$refs.cursor
      document.addEventListener('mousemove', function (e) {
        const {clientX, clientY, path} = e
        cursor.style.left = `${ clientX - 10 }px`
        cursor.style.top = `${ clientY - 10 }px`
      })
      document.addEventListener('mouseleave', function (e) {
        cursor.style.opacity = '0'
      })
      document.addEventListener('mouseenter', function (e) {
        cursor.style.opacity = '1'
      })
    },
    init_scroll() {
      document.addEventListener('mousewheel', (e) => {
        if (e.deltaY > 0) {
          this.scroll_next()
        }
        else if (e.deltaY < 0) {
          this.scroll_last()
        }
      })
    },
    scroll_next() {
      window.scrollTo({
        top: window.scrollY + window.innerHeight,
        left: 0,
        behavior: 'smooth'
      })
    },
    scroll_last() {
      // this.
      window.scrollTo({
        top: window.scrollY - window.innerHeight,
        left: 0,
        behavior: 'smooth'
      })
    }
  },
  mounted() {
    this.init_cursor()
    this.init_scroll()
  }
}
</script>

<template>
  <div>
    <div ref="cursor" class="cursor"></div>
    <Hello/>
    <Introduce/>
  </div>
</template>

<style>

body {
  margin: 0;
  padding: 0;
  cursor: None;
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}

.cursor {
  position: fixed;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: aliceblue;
}


</style>
