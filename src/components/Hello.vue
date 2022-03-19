<template>
  <div class="main_container">
    <div ref="shadow_block" class="shadow_block"></div>
    <div class="main_block">
      <div ref="ball_block" class="ball_block">
        <div ref="ball_1">
          <div class="ball_1"></div>
        </div>
        <div ref="ball_2">
          <div class="ball_2"></div>
        </div>
        <div ref="ball_3">
          <div class="ball_3"></div>
        </div>
      </div>
      <div ref="curve_block" class="curve_block">
        <svg ref="curve" class="curve" width="300" height="400">
          <path
              class="curve_1"
              ref="curve_1"
              d="
                M 0 0 V 400 H 195 C 201 299 97 278 92 141 C 93 79 112 56 122 47 C 134 35 143 38 151 44 C 160 51 177 38 188 25 C 197 14 202 6 212 0 H 0 L 0 0
              "
              fill="#939393"
              stroke="#939393"/>
          <path
              ref="curve_2"
              d="
                M 0 0 V 400 H 188 C 170 307 91 315 50 231 C -1 139 23 16 41 0 H 0 L 0 0
              "
              fill="#d4d4d4"
              stroke="#d4d4d4"/>
          <path
              ref="curve_3"
              d="
                M 0 359 V 400 H 181 C 177 360 98 339 0 335
              "
              fill="white"
              stroke="white"/>
        </svg>
      </div>
      <div ref="paper_block" class="paper_block">
        <div ref="paper_3">
          <div class="paper_3"></div>
        </div>
        <div ref="paper_2">
          <div class="paper_2"></div>
        </div>
        <div>
          <div ref="paper_1" class="paper_1">
            <div ref="paper_1_content" class="paper_1_content">
              <span style="font-size: 30px">r1ader ?</span>
              <span style="font-size: 13px">
                My friends always call me "reader" for my fancy on a magazine called 《reader》
              </span>
              <span style="font-size: 13px">
                But it's too common as a username,
                so I replace the letter "e" with "1"
              </span>
              <span style="font-size: 13px">
                Just pronounced "r1ader" the same way as "reader"
              </span>
            </div>
          </div>
        </div>
      </div>
      <div ref="hello_block" class="hello_block no_select">
        <div ref="hello">
          Hello
        </div>
        <div ref="dot">,</div>
        <div ref="introduce">
          here is
        </div>
        <div style="margin-right: 0" ref="name_part1">
          r
        </div>
        <div style="margin-right: 0;margin-left: 0;" ref="name_part2">
          <span ref="name_part2_e">e</span>
          <span style="position:absolute;opacity: 0" ref="name_part2_1">
            1
          </span>
        </div>
        <div style="margin-left: 0" ref="name_part3">
          ader
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import R_director from '../utils/r_nimate'
import _ from "lodash";

const clog = console.log
const debug = true
const debounce = (actor) => {
  while (actor.queue.length >= 2) {
    actor.queue.shift()
    actor.queue.shift()
  }
}

export default {
  name: 'Hello',
  data() {
    return {
      r_director: null,
      focus_on: false
    }
  },
  methods: {
    beginning_motion() {
      const {
        hello,
        introduce,
        name_part1,
        name_part2,
        name_part2_e,
        name_part2_1,
        name_part3,
        dot
      } = this.$refs
      const cylinder_enter = {
        transform: 'translate(0, [-50~0]px) rotateX([90~0]deg)',
        opacity: '[0~1]',
        duration: 1000
      }
      const cylinder_out = {
        transform: 'translate(0, [0~50]px) rotateX([0~90]deg)',
        opacity: '[1~0]',
        duration: 1000
      }
      const spread_width = {
        marginLeft: '[0~20]px',
        marginRight: '[0~20]px',
        duration: 400
      }
      const shrink_width = {
        marginLeft: '[20~0]px',
        marginRight: '[20~0]px',
        duration: 400
      }

      hello.r_animate({ duration: 500 }).r_animate(cylinder_enter)
      dot.r_animate({ duration: 750 }).r_animate(cylinder_enter)
      introduce.r_animate({ duration: 1500 }).r_animate(cylinder_enter)
      name_part1.r_animate({ duration: 2500 }).r_animate(cylinder_enter)

      this.$data.r_director.copy(name_part1, [
        name_part2,
        name_part3
      ])

      name_part2
          .r_animate(spread_width)
          .r_animate({ duration: 100 })
          .r_then(() => {
            name_part2_1.r_animate(cylinder_enter)
            name_part2_e.r_animate(cylinder_out)
          })
          .r_animate({ duration: 900 })
          .r_animate(shrink_width)
          .r_animate({ duration: 900 })
          .r_then(() => {
            if (!debug) {
              this.background_enter()
            }
          })
    },
    background_enter() {
      const {
        curve_block,
        ball_block,
        paper_block,
        curve_1, curve_2, curve_3,
        ball_1, ball_2, ball_3,
        paper_1, paper_2, paper_3,
        curve
      } = this.$refs
      const duration = 2000
      const opacity_on = { opacity: '[0~1]', duration: 100 }
      const scale_ratio = window.innerHeight / 360
      curve.r_animate({ transform: `scale([${ scale_ratio }~${ scale_ratio }])`, duration: 100 })
      curve_block.r_animate(opacity_on)
      ball_block.r_animate(opacity_on)
      paper_block.r_animate(opacity_on)
      curve_1.r_animate({ transform: 'scale([2~1]) translate([-100~0]px,[-100~0]px)', duration })
      curve_2.r_animate({ transform: 'translate([-100~0]px,[100~0]px)', duration })
      curve_3.r_animate({ transform: 'translate([-200~0]px,[200~0]px)', duration })
      ball_1.r_animate({ transform: 'translate([200~0]px)', duration })
      ball_2.r_animate({ transform: 'translateY([-150~0]px)', duration })
      ball_3.r_animate({ transform: 'translate([100~0]px,[-200~0]px)', duration })
      paper_1.r_animate({
        transform: 'translate([300~-50]px,-100px) perspective(229px) rotateY(-40deg) rotateX(20deg) rotateZ(-50deg)',
        duration
      })
      paper_2.r_animate({ transform: 'translateY([240~0]px)', duration })
      paper_3.r_animate({ transform: 'translate([200~0]px,[100~0]px)', duration })
    },
    init_interact() {
      const {
        curve_1, curve_2, curve_3,
        ball_1, ball_2, ball_3,
        paper_1, paper_2, paper_3,
        paper_1_content, shadow_block
      } = this.$refs
      const translate_out = {
        transform: 'translateX([0~80]px)',
        interpolation: 'easeInOutExpo',
        duration: 750,
        name: 'translate_out'
      }
      const translate_in = {
        transform: 'translateX([80~0]px)',
        interpolation: 'easeInOutExpo',
        duration: 750,
        name: 'translate_in',
        callback: debounce
      }
      const _this = this
      curve_1.addEventListener('mouseenter', function (e) {
        curve_1.r_animate(translate_out)
      })
      curve_1.addEventListener('mouseleave', function (e) {
        curve_1.r_animate(translate_in)
      })
      curve_2.addEventListener('mouseenter', function (e) {
        curve_2.r_animate(translate_out)
      })
      curve_2.addEventListener('mouseleave', function (e) {
        curve_2.r_animate(translate_in)
      })
      curve_3.addEventListener('mouseenter', function (e) {
        curve_3.r_animate(translate_out)
      })
      curve_3.addEventListener('mouseleave', function (e) {
        curve_3.r_animate(translate_in)
      })

      ball_1.addEventListener('mouseenter', function (e) {
        ball_1
            .r_animate({ transform: 'scale([1~1.1])', duration: 200, interpolation: 'easeOutCirc' })
            .r_animate({ transform: 'scale([1~1.1])', duration: 200, interpolation: 'easeInCirc', reverse: true })
      })
      ball_2.addEventListener('mouseenter', function (e) {
        ball_2
            .r_animate({ transform: 'scale([1~1.1])', duration: 200, interpolation: 'easeOutCirc' })
            .r_animate({ transform: 'scale([1~1.1])', duration: 200, interpolation: 'easeInCirc', reverse: true })
      })
      ball_3.addEventListener('mouseenter', function (e) {
        ball_3
            .r_animate({ transform: 'scale([1~1.1])', duration: 200, interpolation: 'easeOutCirc' })
            .r_animate({ transform: 'scale([1~1.1])', duration: 200, interpolation: 'easeInCirc', reverse: true })
      })

      const paper_1_float = {
        transform: 'translate(-50px,-100px) scale([1~1.1]) perspective(229px) rotateY(-40deg) rotateX(20deg) rotateZ(-50deg)',
        duration: 500,
        callback: debounce
      }
      paper_1.addEventListener('mouseenter', function (e) {
        if (!_this.$data.focus_on) {
          paper_1.r_animate(paper_1_float)
          paper_1_content.r_animate({
            opacity: '[0~1]',
            duration: 200
          })
        }
      })
      paper_1.addEventListener('mouseleave', function (e) {
        if (!_this.$data.focus_on) {
          paper_1.r_animate({ ...paper_1_float, reverse: true })
          paper_1_content.r_animate({ opacity: '[1~0]', duration: 200 })
        }
      })
      paper_1.addEventListener('click', function (e) {
        if (_this.$data.focus_on) return
        const card_position_x = Math.round(window.innerWidth / -2)
        const paper_1_flip_in = {
          zIndex: '[3~3]',
          background: 'rgb([255~180],[255~180],[255~180])',
          borderRadius: '[20~10]px',
          transform: `translate([-50~${ card_position_x }]px,[-100~-500]px) scale([1.1~2]) perspective(229px) rotateY([-40~360]deg) rotateX([20~0]deg) rotateZ([-50~0]deg)`,
          duration: 1500,
          interpolation: 'easeInOutExpo',
        }
        paper_1.r_animate(paper_1_flip_in)
        _this['shadow_block_cancel_callback'] = () => {
          return new Promise((resolve, eject) => {
            paper_1.r_animate({
              ...paper_1_flip_in,
              transform: `translate([-50~${ card_position_x }]px,[-100~-500]px) scale([1~2]) perspective(229px) rotateY([-40~360]deg) rotateX([20~0]deg) rotateZ([-50~0]deg)`,
              reverse: true
            }).r_then(resolve)
            paper_1_content.r_animate({ opacity: '[1~0]', duration: 1500 })
          })
        }
        _this.turn_focus_on()
      })

    },
    init_focus_system() {
      const _this = this
      const { shadow_block } = this.$refs
      const shadow_block_click_function = function (e) {
        if (!_this.$data.focus_on) return
        if (_.isFunction(_this['shadow_block_cancel_callback'])) {
          const cancel_promise = _this['shadow_block_cancel_callback']()
          if (cancel_promise instanceof Promise) {
            cancel_promise.finally(_this.turn_focus_off)
          } else {
            _this.turn_focus_off()
          }
          _this['shadow_block_cancel_callback'] = null
        } else {
          _this.turn_focus_off()
        }
      }
      shadow_block.addEventListener('click', shadow_block_click_function)
    },
    turn_focus_on() {
      if (this.$data.focus_on) return
      this.$data.focus_on = true
      this.$refs.shadow_block
          .r_animate({
            zIndex: '[-1~2]',
            duration: 16
          })
          .r_animate({
            background: 'rgba(0,0,0,[0~0.8])',
            duration: 1000
          })

    },
    turn_focus_off() {
      if (!this.$data.focus_on) return
      this.$data.focus_on = false
      this.$refs.shadow_block.r_animate({
        background: 'rgba(0,0,0,[0.8~0])',
        duration: 1000
      }).r_animate({
        zIndex: '[2~-1]',
        duration: 16
      })
    }
  },
  mounted() {
    this.$data.r_director = new R_director()
    this.$data.r_director.take(this)
    if (debug) {
      this.background_enter()
    }
    this.init_focus_system()
    this.init_interact()
  }
}

</script>

<style scoped>
div {
  /*font-family: Merienda;*/
  font-family: 'Varela Round', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

a {
  color: #42b983;
}

.ball_1 {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background: #939393;
  transform: translate(20px, 150px) rotateZ(-30deg) scaleY(1.5);
}

.ball_2 {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background: #d4d4d4;
  transform: translate(-150px) rotateZ(30deg) scaleX(1.5);
}

.ball_3 {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background: white;
}

.main_block {
  color: white;
  height: 100vh;
  width: 100vw;
}

.main_container {
  background: #202020;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

.navigation_block {
  position: absolute;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  width: 100vw;
}

.hello_block div {
  /*font-family: Constantia;*/
  /*font-family: fantasy;*/
  opacity: 0;
  position: relative;
  font-weight: bolder;
  color: white;
  font-size: 60px;
  margin: 20px;
  letter-spacing: 5px;
}

.paper_block {
  position: absolute;
  opacity: 0;
  right: 0;
  bottom: 0;
}

.paper_1 {
  position: absolute;
  z-index: 2;
  width: 200px;
  height: 300px;
  background: white;
  box-shadow: -18px -16px 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
}

.paper_2 {
  position: absolute;
  width: 100px;
  height: 150px;
  background: #d4d4d4;
  border-radius: 10px 10px 10px 10px;
  transform: translate(-110px, 0px) scale(2) rotateZ(-20deg);
  transition: 0.2s ease-out;
}

.paper_2:hover {
  transform: translate(-110px, 0px) scale(2.2) rotateZ(-20deg);
  transition: 0.2s ease-out;
}

.paper_3 {
  position: absolute;
  width: 100px;
  height: 150px;
  background: #939393;
  border-radius: 10px 10px 10px 10px;
  transform: translate(-80px, -30px) scale(3) rotateZ(20deg);
  transition: 0.2s ease-out;
}

.paper_3:hover {
  transform: translate(-80px, -30px) scale(3.3) rotateZ(20deg);
  transition: 0.2s ease-out;
}

.curve_block {
  opacity: 0;
  position: absolute;
  left: 0;
}

.ball_block {
  position: absolute;
  opacity: 0;
  right: 0;
  top: 0;
}

.curve {
  transform: scale(2.4);
}

.curve_1:hover {
  transform: scale(1.2);
}

.no_select {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently
                                   supported by Chrome, Edge, Opera and Firefox */
}

.paper_1_content {
  opacity: 0;
  height: 251px;
  width: 200px;
  font-weight: bolder;
  color: #202020;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 20px;
  flex-direction: column;
}

.shadow_block {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: -3;
}
</style>
