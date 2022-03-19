<script>

import Hello from './components/Hello.vue'
import Hello2 from './components/Hello2.vue'
import Introduce from './components/Introduce.vue'
import { interpolation_functions } from "./utils/math_util";
import _ from "lodash";
import R_director from "./utils/r_nimate";

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
      cursorX: 0,
      cursorY: 0,
      scroll_index: 0,
      window_queue: [],
      docking: false
    }
  },
  methods: {
    init_windows() {
      this.$data.window_queue = [
        this.$refs.hello,
        // this.$refs.hello2,
        // this.$refs.introduce,
      ]
    },
    init_cursor() {
      const _this = this
      const cursor = this.$refs.cursor
      cursor
          .r_animate({
            opacity: '[0~0]',
            top: `[0~${ window.innerHeight / 1.5 }]px`,
            left: `[0~${ window.innerWidth / 2 }]px`,
            duration: 16,
            callback: () => {
              this.$data.cursorX = window.innerWidth / 2
              this.$data.cursorY = window.innerHeight / 1.5
            }
          })
          .r_animate({ duration: 100 })
          .r_animate({
            opacity: '[0~1]',
            transform: 'translate(-10px, -10px) scale([0~1])',
            duration: 1000
          })
          .r_then(() => {
            this.$data.cursor_lock = false
            this.$data.scroll_lock = false
          })

      document.addEventListener('mousemove', function (e) {
        const { clientX, clientY } = e
        if (_this.$data.cursor_lock) return
        if (!_this.$data.docking) {
          const x_ratio = (e.movementX > 0 ? 1 : -1) * (clientX - _this.$data.cursorX) / window.innerWidth * 10 + 1
          const y_ratio = (e.movementY > 0 ? 1 : -1) * (clientY - _this.$data.cursorY) / window.innerWidth * 10 + 1
          _this.$data.cursorX += e.movementX * x_ratio
          _this.$data.cursorY += e.movementY * y_ratio
          cursor.style.left = `${ _this.$data.cursorX }px`
          cursor.style.top = `${ _this.$data.cursorY }px`
          if (Math.abs(clientX - _this.$data.cursorX) + Math.abs(clientY - _this.$data.cursorY) < 8) {
            _this.$data.docking = true
          }
        } else {
          cursor.style.left = `${ clientX }px`
          cursor.style.top = `${ clientY }px`
        }

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
          if (this.$data.scroll_index >= window_queue.length - 1) return
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
  mounted() {
    const r_director = new R_director()
    r_director.take(this)
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
    <Hello ref="hello"/>
    <div ref="cursor" class="cursor"></div>
    <!--    <Hello2 ref="hello2"/>-->
    <!--    <Introduce ref="introduce"/>-->
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Merienda&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');

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
  pointer-events: none;
  width: 14px;
  height: 14px;
  border: 3px solid #dedede;
  border-radius: 10px;
  background: #5d5d5d;
  opacity: 0;
  transform: translate(-10px, -10px);
}


</style>
