<template>
  <First ref="first"/>
  <div ref="cursor_container" class="cursor_container">
    <div ref="cursor" class="cursor"></div>
  </div>
</template>

<script>

import First from '../components/First/index.vue'
import Second from '../components/Second/index.vue'
import { ease_functions } from "../utils/math_util";
import _ from "lodash";
import { r } from 'ractjs';
import { debug } from '../const/config'
import { clog, getElSize, debounce } from '../utils/index'
import { fromEvent } from 'rxjs'
import { CURSOR_WRAP } from "../const/symbol";

export default {
  components: {
    First,
    Second
  },
  data() {
    return {
      cursor_lock: true,
      clientX: 0,
      clientY: 0,
      in_interact_area: false,
      cursor_render_Framer: null,
      cursor_target: null,
      last_tick: 0,
      target_style: {},
    }
  },
  watch: {
    in_interact_area: function (new_value, old_value) {
      const { cursor, cursor_container } = this.$refs
      const target = this.cursor_target
      let {
        width, height,
        borderColor, backgroundColor, borderRadius,
        padding, top, left
      } = getElSize(target)
      this.target_style = {
        width, height, padding, top, left
      }
      if (new_value) {
        cursor_container.style.zIndex = '1'
        if (target.r_zIndex) {
          cursor_container.style.zIndex = target.r_zIndex
        }
        if (target.r_opacity) {
          cursor.style.opacity = target.r_opacity
        }
        cancelAnimationFrame(this.cursor_render_Framer)
        this.cursor_render_Framer = null
        r(cursor).cancel()
        r(cursor).act({
          width,
          height,
          borderColor,
          backgroundColor,
          borderRadius,
          duration: 500
        })
      } else {
        r(cursor_container).style.zIndex = '999'
        r(cursor).cancel()
        r(cursor).act({
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
    init_cursor() {
      const cursor_show_time = debug ? 100 : 1000

      r(this.$refs.cursor_container)
          .act({
            opacity: 0,
            top: `[0~${ window.innerHeight / 1.5 }]px`,
            left: `[0~${ window.innerWidth / 2 }]px`,
            duration: 16
          })
          .act({
            opacity: '[0~1]',
            transform: 'scale([0~1])',
            delay: cursor_show_time,
            duration: 1000
          })
          .then(() => {
            this.cursor_lock = false
          })
    },
    init_interaction() {
      fromEvent(document, 'mousemove').subscribe(this.document_mousemove_function)
      fromEvent(document, 'mousedown').subscribe(this.document_mousedown_function)
      fromEvent(document, 'mouseup').subscribe(this.document_mouseup_function)
      fromEvent(document, 'mouseleave').subscribe(this.document_mouseleave_function)
      fromEvent(document, 'mouseenter').subscribe(this.document_mouseenter_function)
    },
    document_mousemove_function(e) {
      this.tick()
      const { clientX, clientY } = e
      this.clientX = clientX
      this.clientY = clientY
      this.cursor_target = e.path[0]
      if (this.cursor_lock) return
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
      this.in_interact_area = !!target[CURSOR_WRAP];
      if (target[CURSOR_WRAP]) {
        let {
          width, height, padding, top, left
        } = this.target_style
        this.clientX = left + width / 2 + padding - (left + width / 2 + padding - this.clientX) / 10
        this.clientY = top + height / 2 + padding - (top + height / 2 + padding - this.clientY) / 10
      }
    },
    cursor_chase() {
      if (this.cursor_render_Framer) return
      this.cursor_render_Framer = requestAnimationFrame(() => this.cursor_render())
    },
    cursor_render() {
      const time = 20
      const inter_func = ease_functions('easeOutCirc')
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
      r(cursor_container).act({
        transform: 'scale([1~1.1])', opacity: '[1~0.5]',
        duration: 200, callback: debounce
      })
    },
    document_mouseup_function(e) {
      const { cursor_container } = this.$refs
      r(cursor_container).act({
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
    tick() {
      // const time = Math.round((performance.now() - this.last_tick) * 10) / 10
      // console.log(time)
      // this.last_tick = performance.now()
    }
  },
  mounted() {
    this.init_cursor()
    this.init_interaction()
    if (this.$refs.first) {
      this.$refs.first.beginning_motion()
    }
  }
}
</script>

<style scoped>

a {
  cursor: None !important;
  text-decoration: none !important;
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
