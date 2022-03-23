<script>

import First from './components/First/index.vue'
import Hello2 from './components/Hello2.vue'
import Introduce from './components/Introduce.vue'
import { interpolation_functions } from "./utils/math_util";
import _ from "lodash";
import R_director from "./utils/r_animate";
import { debug } from './const/config'
import { clog, getElSize } from './utils/index'

const debounce = (actor) => {
  while (actor.queue.length >= 2) {
    actor.queue.shift()
    actor.queue.shift()
  }
}
export default {
  components: {
    First,
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
      docking: false,
      is_begin: false,
      cursor_in_animation: false,
      in_interact_area: false,
      cursor_render_Framer: null,
      chase_target: null,
      fit_target: null,
      cursor_target: null
    }
  },
  watch: {
    in_interact_area: function (new_value, old_value) {
      const { cursor, cursor_container } = this.$refs
      const target = this.$data.cursor_target
      let { width, height, padding, top, left } = getElSize(target)
      if (new_value) {
        cancelAnimationFrame(this.$data.cursor_render_Framer)
        this.$data.cursor_render_Framer = null
        this.$data.docking = false
        cursor_container.r_animate({
          top: top + height / 2 + padding,
          left: left + width / 2 + padding,
          duration: 200
        })
        cursor.r_animate({
          width: width,
          height: height,
          duration: 200
        })
      } else {
        cursor.r_animate({
          width: 20,
          height: 20,
          duration: 200
        })
      }
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
      const cursor_show_time = debug ? 100 : 1000
      this.$refs.cursor_container
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
          })
      if (debug) {
        document.body.style.cursor = 'auto!important'
      }
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
    document_mousemove_function(e) {
      const { clientX, clientY } = e
      this.$data.clientX = clientX
      this.$data.clientY = clientY
      this.$data.cursor_target = e.path[0]
      if (this.$data.cursor_lock) return
      if (!this.$data.is_begin) {
        this.$data.is_begin = true
        this.$refs.hello.beginning_motion()
      }
      if (!this.$data.docking && !this.$data.in_interact_area) {
        this.cursor_chase()
      }
      if (this.$data.docking && !this.$data.in_interact_area) {
        this.cursor_move(clientX, clientY)
      }
      this.cursor_event_listen(e)
    },
    cursor_move(x, y) {
      const { cursor_container } = this.$refs
      cursor_container.style.left = `${ x }px`
      cursor_container.style.top = `${ y }px`
    },
    cursor_event_listen(event) {
      const { path } = event
      const target = _.first(path)
      if (!target) return
      const { cursor_container, cursor } = this.$refs
      if (target.cursor_hidden) {
        cursor_container.style.display = 'none'
      } else {
        cursor_container.style.display = ''
      }
      this.$data.in_interact_area = !!target.r_wrap;
    },
    cursor_chase() {
      if (this.$data.cursor_render_Framer) return
      this.$data.cursor_render_Framer = requestAnimationFrame(() => this.cursor_render())
    },
    cursor_render() {
      const time = 20
      const inter_func = interpolation_functions('easeOutCirc')
      const [x, y] = [this.$data.clientX, this.$data.clientY]
      const { cursor_container, cursor } = this.$refs
      const cursor_x = parseFloat(cursor_container.style.left.replace('px', ''))
      const cursor_y = parseFloat(cursor_container.style.top.replace('px', ''))
      let distance_x = (x - cursor_x > 0 ? 1 : -1) * inter_func(Math.abs((x - cursor_x) / window.innerWidth)) * window.innerWidth / time
      let distance_y = (y - cursor_y > 0 ? 1 : -1) * inter_func(Math.abs((y - cursor_y) / window.innerHeight)) * window.innerWidth / time
      if (Math.abs(x - cursor_x) + Math.abs(y - cursor_y) < 2) {
        if (x === this.$data.clientX && y === this.$data.clientY) {
          this.$data.docking = true
        }
        this.$data.cursor_render_Framer = null
      } else {
        this.cursor_move(cursor_x + distance_x, cursor_y + distance_y)
        this.$data.cursor_render_Framer = requestAnimationFrame(() => this.cursor_render())
      }
    },
    document_mousedown_function(e) {
      const { cursor_container } = this.$refs
      cursor_container.r_animate({
        transform: 'scale([1~1.1])', opacity: '[1~0.5]',
        duration: 200, callback: debounce
      })
    },
    document_mouseup_function(e) {
      const { cursor_container } = this.$refs
      cursor_container.r_animate({
        transform: 'scale([1.1~1])', opacity: '[0.5~1]',
        duration: 200, callback: debounce
      })
    },
    document_mouseleave_function(e) {
      if (this.$data.cursor_lock) return
      this.$refs.cursor_container.style.display = 'none'
    },
    document_mouseenter_function(e) {
      if (this.$data.cursor_lock) return
      this.$refs.cursor_container.style.display = ''
    },
    begin() {

    },
  },
  mounted() {
    const r_director = new R_director()
    r_director.take(this)
    this.init_cursor()
    this.init_windows()
    this.init_interaction()
    setTimeout(() => {
      if (!this.$data.is_begin) {
        this.$data.is_begin = true
        this.$refs.hello.beginning_motion()
      }
    }, debug ? 100 : 3000)
  }
}
</script>

<template>
  <div>
    <First ref="hello"/>
    <div ref="cursor_container" class="cursor_container">
      <div ref="cursor" class="cursor"></div>
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
  /*cursor: None !important;*/
  overflow: hidden;
}

a {
  cursor: None !important;
  text-decoration: none !important;
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
  pointer-events: none;
}

.cursor {
  position: absolute;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(222, 222, 222, 1);
  border-radius: 10px;
  background: rgba(93, 93, 93, 1);
  z-index: 1;
  transform: translate(-50%, -50%);
  /*background: url("./assets/cat1.png")  no-repeat;*/
  /*background-size: auto 100vh;*/
  /*background-position: 400px 300px;*/
}


</style>
