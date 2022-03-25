<script>

import First from './components/First/index.vue'
import Introduce from './components/Introduce.vue'
import { interpolation_functions } from "./utils/math_util";
import _ from "lodash";
import R_director from "./utils/r_animate";
import { debug } from './const/config'
import { clog, getElSize, debounce } from './utils/index'

export default {
  components: {
    First,
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
      is_begin: false,
      cursor_in_animation: false,
      in_interact_area: false,
      cursor_render_Framer: null,
      chase_target: null,
      fit_target: null,
      cursor_target: null,
      target_shake_offset: [0, 0]
    }
  },
  watch: {
    in_interact_area: function (new_value, old_value) {
      const { cursor, cursor_container } = this.$refs
      const target = this.cursor_target
      let {
        width, height,
        borderColor, backgroundColor, borderRadius
      } = getElSize(target)
      if (new_value) {
        cursor_container.style.zIndex = '1'
        if (target.r_zIndex) {
          cursor_container.style.zIndex = target.r_zIndex
        }
        clog(target.r_opacity)
        if (target.r_opacity) {
          cursor.style.opacity = target.r_opacity
        }
        cancelAnimationFrame(this.cursor_render_Framer)
        this.cursor_render_Framer = null
        cursor.r_cancel()
        cursor.r_animate({
          width,
          height,
          borderColor,
          backgroundColor,
          borderRadius,
          duration: 500
        })
      } else {
        cursor_container.style.zIndex = '999'
        cursor.r_cancel()
        cursor.r_animate({
          opacity: 1,
          width: 20,
          height: 20,
          borderRadius: 10,
          borderColor: 'rgb(222, 222, 222)',
          backgroundColor: 'rgb(93, 93, 93)',
          duration: 800
        })
      }
    }
  },
  methods: {
    init_windows() {
      this.window_queue = [
        this.$refs.first,
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
              this.cursorX = window.innerWidth / 2
              this.cursorY = window.innerHeight / 1.5
            }
          })
          .r_animate({ duration: cursor_show_time })
          .r_animate({
            opacity: '[0~1]',
            transform: 'scale([0~1])',
            duration: 1000
          })
          .r_then(() => {
            this.cursor_lock = false
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
      this.clientX = clientX
      this.clientY = clientY
      this.cursor_target = e.path[0]
      if (this.cursor_lock) return
      if (!this.is_begin) {
        this.is_begin = true
        this.$refs.first.beginning_motion()
      }
      this.cursor_chase()
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
      this.in_interact_area = !!target.r_wrap;
      if (target.r_wrap) {
        let {
          width, height, padding, top, left
        } = getElSize(target)
        this.target_shake_offset = [
          left + width / 2 + padding - (left + width / 2 + padding - this.clientX) / 10,
          top + height / 2 + padding - (top + height / 2 + padding - this.clientY) / 10,
        ]
        this.clientX = this.target_shake_offset[0]
        this.clientY = this.target_shake_offset[1]
      }
    },
    cursor_chase() {
      if (this.cursor_render_Framer) return
      this.cursor_render_Framer = requestAnimationFrame(() => this.cursor_render())
    },
    cursor_render() {
      const time = 20
      const inter_func = interpolation_functions('easeOutCirc')
      const [x, y] = [this.clientX, this.clientY]
      const { cursor_container } = this.$refs
      const cursor_x = parseFloat(cursor_container.style.left.replace('px', ''))
      const cursor_y = parseFloat(cursor_container.style.top.replace('px', ''))
      let distance_x = (x - cursor_x > 0 ? 1 : -1) * inter_func(Math.abs((x - cursor_x) / window.innerWidth)) * window.innerWidth / time
      let distance_y = (y - cursor_y > 0 ? 1 : -1) * inter_func(Math.abs((y - cursor_y) / window.innerHeight)) * window.innerWidth / time
      if (Math.abs(x - cursor_x) + Math.abs(y - cursor_y) < 2) {
        this.cursor_render_Framer = null
      } else {
        this.cursor_move(cursor_x + distance_x, cursor_y + distance_y)
        this.cursor_render_Framer = requestAnimationFrame(() => this.cursor_render())
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
      if (this.cursor_lock) return
      this.$refs.cursor_container.style.display = 'none'
    },
    document_mouseenter_function(e) {
      if (this.cursor_lock) return
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
      if (!this.is_begin) {
        this.is_begin = true
        this.$refs.first.beginning_motion()
      }
    }, debug ? 100 : 3000)
  }
}
</script>

<template>
  <div>
    <First ref="first"/>
    <div ref="cursor_container" class="cursor_container">
      <div ref="cursor" class="cursor"></div>
    </div>
    <!--    <Introduce ref="introduce"/>-->
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Merienda&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');

body {
  margin: 0;
  padding: 0;
  cursor: None !important;
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

div {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}

.cursor_container {
  position: fixed;
  pointer-events: none;
  z-index: 99;
}

.cursor {
  position: absolute;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(222, 222, 222, 1);
  border-radius: 10px;
  background: rgba(93, 93, 93, 1);
  transform: translate(-50%, -50%);
  /*background: url("./assets/cat1.png")  no-repeat;*/
  /*background-size: auto 100vh;*/
  /*background-position: 400px 300px;*/
}


</style>
