<script>

import First from './components/First/index.vue'
import Hello2 from './components/Hello2.vue'
import Introduce from './components/Introduce.vue'
import { interpolation_functions } from "./utils/math_util";
import _ from "lodash";
import R_director from "./utils/r_animate";
import { debug } from './const/config'
import { clog } from './utils/index'

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
      fit_target: null
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
      if (this.$data.cursor_lock) return
      if (!this.$data.is_begin) {
        this.$data.is_begin = true
        this.$refs.hello.beginning_motion()
      }

      if (!this.$data.docking && !this.$data.in_interact_area) {
        this.$data.chase_target = [clientX, clientY]
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

      this.$data.in_interact_area = target.r_wrap;
      // clog(target.r_wrap)
      if (target.r_wrap) {
        this.$data.docking = false
        const viewportOffset = target.getBoundingClientRect();
        const top = viewportOffset.top;
        const left = viewportOffset.left;
        this.$data.chase_target = [left + 10, top + 10]
        let { width, height } = getComputedStyle(target)
        width = width.replace('px', '')
        height = height.replace('px', '')
        this.$data.fit_target = [width, height]
        this.cursor_chase()
      } else {
        this.$data.fit_target = [20, 20]
      }
      // const cursor_style = getComputedStyle(cursor)
      // const cursor_width = cursor_style.width.replace('px', '')
      // const cursor_height = cursor_style.height.replace('px', '')
      // let { width, height } = getComputedStyle(target)
      // width = width.replace('px', '')
      // height = height.replace('px', '')

    },
    cursor_chase() {
      if (this.$data.cursor_render_Framer) return
      this.$data.cursor_render_Framer = requestAnimationFrame(() => this.cursor_render())
    },
    cursor_render() {
      // todo rewrite this function
      const time = 30
      const [x, y] = this.$data.chase_target
      const { cursor_container, cursor } = this.$refs
      const cursor_x = Math.round(parseFloat(cursor_container.style.left.replace('px', '')))
      const cursor_y = Math.round(parseFloat(cursor_container.style.top.replace('px', '')))
      let distance_x = (x - cursor_x > 0 ? 1 : -1) * Math.sqrt(Math.abs((x - cursor_x) / window.innerWidth)) * window.innerWidth / time
      let distance_y = (y - cursor_y > 0 ? 1 : -1) * Math.sqrt(Math.abs((y - cursor_y) / window.innerHeight)) * window.innerWidth / time

      let distance_w = 0
      let distance_h = 0
      if (this.$data.fit_target) {
        const [w, h] = this.$data.fit_target
        const cursor_style = getComputedStyle(cursor)
        const cursor_w = parseFloat(cursor_style.width.replace('px', ''))
        const cursor_h = parseFloat(cursor_style.height.replace('px', ''))
        // distance_w = (w - cursor_w > 0 ? 1 : -1) * Math.sqrt(Math.abs((w - cursor_w) / Math.max(w,cursor_w))) * Math.max(w,cursor_w)/5
        // distance_h = (h - cursor_h > 0 ? 1 : -1) * Math.sqrt(Math.abs((h - cursor_h) / Math.max(h,cursor_h))) * Math.max(h,cursor_h)/5
        distance_w = (w - cursor_w) / 5
        distance_h = (h - cursor_h) / 5
        // clog(w, h, cursor_w, cursor_h, distance_w, distance_h)
        cursor.style.width = `${ cursor_w + distance_w }px`
        cursor.style.height = `${ cursor_h + distance_h }px`
      }

      // clog('render', Math.round(distance_w), Math.round(distance_h))
      if (Math.abs(distance_x) + Math.abs(distance_y) < 2 && Math.abs(distance_w) + Math.abs(distance_h) < 0.3) {
        // clog('done')
        if (x === this.$data.clientX && y === this.$data.clientY) {
          this.$data.docking = true
        }
        this.$data.chase_target = null
        this.$data.fit_target = null
        this.$data.cursor_render_Framer = null
      } else {
        this.cursor_move(cursor_x + distance_x, cursor_y + distance_y)
        requestAnimationFrame(() => this.cursor_render())
      }
    },
    document_mousedown_function(e) {
      const { cursor_container } = this.$refs
      cursor_container.r_animate({
        transform: 'scale([1~1.5])', opacity: '[1~0.5]',
        duration: 200, callback: debounce
      })
    },
    document_mouseup_function(e) {
      const { cursor_container } = this.$refs
      cursor_container.r_animate({
        transform: 'scale([1.5~1])', opacity: '[0.5~1]',
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
  transform: translate(-10px, -10px);
  /*background: url("./assets/cat1.png")  no-repeat;*/
  /*background-size: auto 100vh;*/
  /*background-position: 400px 300px;*/
}


</style>
