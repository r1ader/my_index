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
      const {
        cursor,
        cursor_1,
        cursor_2,
        cursor_3,
        cursor_4,
      } = this.$refs
      const cursor_in = {
        opacity: '[0~0]',
        top: `[0~${ window.innerHeight / 1.5 }]px`,
        left: `[0~${ window.innerWidth / 2 }]px`,
        duration: 16
      }
      const cursor_show = {
        opacity: '[0~1]',
        duration: 1000
      }
      cursor_1.r_animate(cursor_in).r_animate({ duration: 6000 }).r_animate(cursor_show)
      cursor_2.r_animate(cursor_in).r_animate({ duration: 6000 }).r_animate(cursor_show)
      cursor_3.r_animate(cursor_in).r_animate({ duration: 6000 }).r_animate(cursor_show)
      cursor_4.r_animate(cursor_in).r_animate({ duration: 6000 }).r_animate(cursor_show)
          .r_then(() => {
            _this.$data.cursor_lock = false
          })


      this.$data.cursorX = window.innerWidth / 2
      this.$data.cursorY = window.innerHeight / 1.5

      document.addEventListener('mousemove', function (e) {
        const { clientX, clientY } = e
        if (_this.$data.cursor_lock) return
        if (!_this.$data.docking) {
          const x_ratio = (e.movementX > 0 ? 1 : -1) * (clientX - _this.$data.cursorX) / window.innerWidth * 10 + 1
          const y_ratio = (e.movementY > 0 ? 1 : -1) * (clientY - _this.$data.cursorY) / window.innerWidth * 10 + 1
          _this.$data.cursorX += e.movementX * x_ratio
          _this.$data.cursorY += e.movementY * y_ratio
          cursor_1.style.left = `${ _this.$data.cursorX }px`
          cursor_1.style.top = `${ _this.$data.cursorY }px`
          cursor_2.style.left = `${ _this.$data.cursorX }px`
          cursor_2.style.top = `${ _this.$data.cursorY }px`
          cursor_3.style.left = `${ _this.$data.cursorX }px`
          cursor_3.style.top = `${ _this.$data.cursorY }px`
          cursor_4.style.left = `${ _this.$data.cursorX }px`
          cursor_4.style.top = `${ _this.$data.cursorY }px`
          if (Math.abs(clientX - _this.$data.cursorX) + Math.abs(clientY - _this.$data.cursorY) < 8) {
            _this.$data.docking = true
          }
        } else {
          cursor_1.style.left = `${ clientX }px`
          cursor_1.style.top = `${ clientY }px`
          cursor_2.style.left = `${ clientX }px`
          cursor_2.style.top = `${ clientY }px`
          cursor_3.style.left = `${ clientX }px`
          cursor_3.style.top = `${ clientY }px`
          cursor_4.style.left = `${ clientX }px`
          cursor_4.style.top = `${ clientY }px`
        }

      })
      document.addEventListener('mouseleave', function (e) {
        _this.$data.docking = false
      })
      document.addEventListener('mouseenter', function (e) {
        _this.$data.docking = false
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
    <div style="transform: translate(-10px,-8px)" class="cursor_container" ref="cursor_1">
      <div class="cursor"></div>
    </div>
    <div style="transform: translate(-10px,8px) rotateZ(180deg)" class="cursor_container" ref="cursor_2">
      <div class="cursor"></div>
    </div>
    <div style="transform: translate(-2px,0) rotateZ(90deg)" class="cursor_container" ref="cursor_3">
      <div class="cursor"></div>
    </div>
    <div style="transform: translate(-18px,0) rotateZ(270deg)" class="cursor_container" ref="cursor_4">
      <div class="cursor"></div>
    </div>
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

.cursor_container {
  position: fixed;
  height: 5px;
  overflow: hidden;
}

.cursor {
  width: 14px;
  height: 14px;
  border: 3px solid #dedede;
  border-radius: 10px;
  /*background: #5d5d5d;*/
  opacity: 1;
}


</style>
