<script>
import Hello from './components/Hello.vue'
import Hello2 from './components/Hello2.vue'
import Introduce from './components/Introduce.vue'
import { interpolation_functions } from "./utils/math_util";
import _ from "lodash";
import { r_register } from "./utils/r_nimate";

const clog = console.log

export default {
  components: {
    Hello,
    Hello2,
    Introduce
  },
  data() {
    return {
      cursor_lock: true,
      scroll_lock: false,
      clientX: 0,
      clientY: 0,
      scroll_index: 0,
      window_queue: []
    }
  },
  methods: {
    init_windows() {
      this.$data.window_queue = [
        this.$refs.hello,
        this.$refs.hello2,
        this.$refs.introduce,
      ]
    },
    init_cursor() {
      const _this = this
      const cursor = this.$refs.cursor
      r_register(cursor)
      cursor
          .r_animate({
            opacity: '[0~0]',
            top: `[0~${ window.innerHeight / 1.5 }]px`,
            left: `[0~${ window.innerWidth / 2 }]px`,
            duration: 0,
          })
          .r_animate({ duration: 6000 })
          .r_animate({
            opacity: '[0~1]',
            transform: 'scale([0~1])',
            duration: 1000
          })
          .r_then(() => {
            this.$data.cursor_lock = false
            this.$data.scroll_lock = false
          })
      document.addEventListener('mousemove', function (e) {
        const { clientX, clientY, path } = e
        if (_this.$data.cursor_lock) return
        cursor.style.left = `${ clientX - 10 }px`
        cursor.style.top = `${ clientY - 10 }px`
      })
      document.addEventListener('mouseleave', function (e) {
        if (_this.$data.cursor_lock) return
        cursor.style.opacity = '0'
      })
      document.addEventListener('mouseenter', function (e) {
        if (_this.$data.cursor_lock) return
        cursor.style.opacity = '1'
      })
    },
    init_scroll() {
      document.addEventListener('mousewheel', (e) => {
        if (e.ctrlKey) return
        if (this.$data.scroll_lock) return
        const { window_queue } = this.$data
        if (e.deltaY > 0) {
          if (this.$data.scroll_index >= 3) return
          this.$data.scroll_index = Math.round(window.scrollY / window.innerHeight)
          let windows_now = window_queue[this.$data.scroll_index]
          if (_.isFunction(windows_now.exit_motion)) {
            windows_now.exit_motion()
          }
          this.$data.scroll_index += 1
          let windows_next = window_queue[this.$data.scroll_index]
          this.$data.scroll_lock = true
          this.scroll_smooth(window.innerHeight, () => {
            windows_next.beginning_motion()
          })
        } else if (e.deltaY < 0) {
          if (this.$data.scroll_index <= 0) return
          this.$data.scroll_index = Math.round(window.scrollY / window.innerHeight)
          let windows_now = window_queue[this.$data.scroll_index]
          if (_.isFunction(windows_now.exit_motion)) {
            windows_now.exit_motion()
          }
          this.$data.scroll_index -= 1
          let windows_next = window_queue[this.$data.scroll_index]

          this.$data.scroll_lock = true
          this.scroll_smooth(-window.innerHeight, () => {
            windows_next.beginning_motion()
          })
        }
      })
    },
    scroll_smooth(scroll_distance, callback) {
      let plan_duration = 1000
      let frame_index = 0
      const init_scrollY = window.scrollY
      const inter_func = interpolation_functions('easeInOutExpo')
      const render = () => {
        window.scrollTo({
          top: init_scrollY +
              inter_func(frame_index * 16 / plan_duration)
              * scroll_distance,
        })
        frame_index += 1
        if ((frame_index - 1) * 16 < plan_duration) {
          requestAnimationFrame(render)
        } else {
          this.$data.scroll_lock = false
          if (_.isFunction(callback)) {
            callback()
          }
        }
      }
      requestAnimationFrame(render)
    },
  },
  beforeCreate() {

  },
  created() {
    //
  },
  mounted() {
    this.init_cursor()
    this.init_scroll()
    this.init_windows()
    this.$data.scroll_index = Math.round(window.scrollY / window.innerHeight)
    this.$data.window_queue[this.$data.scroll_index].beginning_motion()
  }
}
</script>

<template>
  <div>
    <div ref="cursor" class="cursor"></div>
    <Hello ref="hello"/>
    <Hello2 ref="hello2"/>
    <Introduce ref="introduce"/>
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
  width: 14px;
  height: 14px;
  border: 3px solid #dedede;
  border-radius: 10px;
  background: #5d5d5d;
  opacity: 0;
}


</style>
