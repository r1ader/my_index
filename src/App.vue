<script>

import Hello from './components/Hello.vue'
import Hello2 from './components/Hello2.vue'
import Introduce from './components/Introduce.vue'
import { interpolation_functions } from "./utils/math_util";
import _ from "lodash";
import R_director from "./utils/r_nimate";

const clog = console.log
const debug = true
const debounce = (actor) => {
  while (actor.queue.length >= 2) {
    actor.queue.shift()
    actor.queue.shift()
  }
}
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
      const cursor_show_time = debug ? 1000 : 6000
      this.$refs.cursor
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
          .r_animate({ duration: cursor_show_time })
          .r_animate({
            opacity: '[0~1]',
            transform: 'scale([0~1])',
            duration: 1000
          })
          .r_then(() => {
            this.$data.cursor_lock = false
            this.$data.scroll_lock = false
          })
    },
    init_scroll() {
      this.$data.scroll_index = Math.round(window.scrollY / window.innerHeight)
      this.$data.window_queue[this.$data.scroll_index].beginning_motion()
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
    init_interaction() {
      const _this = this
      const wait_register_event = ['mousemove', 'mousedown', 'mouseup', 'mouseleave', 'mouseenter']
      wait_register_event.forEach(event_name => {
        document.addEventListener(event_name, function (e) {
          if (_.isFunction(_this[`document_${ event_name }_function`])) {
            _this[`document_${ event_name }_function`](e)
          }
        })
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
    document_mousemove_function(e) {
      const { clientX, clientY } = e
      const { cursor } = this.$refs
      if (this.$data.cursor_lock) return
      if (!this.$data.docking) {
        const x_ratio = (e.movementX > 0 ? 1 : -1) * (clientX - this.$data.cursorX) / window.innerWidth * 10 + 1
        const y_ratio = (e.movementY > 0 ? 1 : -1) * (clientY - this.$data.cursorY) / window.innerWidth * 10 + 1
        this.$data.cursorX += e.movementX * x_ratio
        this.$data.cursorY += e.movementY * y_ratio
        cursor.style.left = `${ this.$data.cursorX - 10 }px`
        cursor.style.top = `${ this.$data.cursorY - 10 }px`
        if (Math.abs(clientX - this.$data.cursorX) + Math.abs(clientY - this.$data.cursorY) < 8) {
          this.$data.docking = true
        }
      } else {
        cursor.style.left = `${ clientX - 10 }px`
        cursor.style.top = `${ clientY - 10 }px`
      }
    },
    document_mousedown_function(e) {
      const { cursor } = this.$refs
      cursor.r_animate({
        transform: 'scale([1~1.5])', opacity: '[1~0.5]',
        duration: 200, callback: debounce
      })
    },
    document_mouseup_function(e) {
      const { cursor } = this.$refs
      cursor.r_animate({
        transform: 'scale([1.5~1])', opacity: '[0.5~1]',
        duration: 200, callback: debounce
      })
    },
    document_mouseleave_function(e) {
      if (this.$data.cursor_lock) return
      this.$refs.cursor.style.opacity = '0'
    },
    document_mouseenter_function(e) {
      if (this.$data.cursor_lock) return
      this.$refs.cursor.style.opacity = '1'
    }

  },
  mounted() {
    const r_director = new R_director()
    r_director.take(this)
    this.init_cursor()
    this.init_windows()
    this.init_interaction()
    this.init_scroll()
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
}


</style>
