<template>
  <div class="main_container">
    <svg ref="github" style="opacity:0;pointer-events:none;position:fixed;right:15px;top:15px;z-index: 2;"
         viewBox="0 0 1024 1024" width="50" height="50">
      <path fill="white"
            d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path>
    </svg>
    <div class="main_block">
      <div ref="ball_block" class="ball_block">
        <div ref="ball_1">
          <div class="ball_1"></div>
        </div>
        <div ref="ball_2">
          <div class="ball_2"></div>
        </div>
        <div ref="ball_3">
          <div class="ball_3">
          </div>

          <span style="position: relative;opacity: 1">

            <a target="_blank" href="https://github.com/r1ader/my_index">
              <div class="ball_background" ref="b_b"></div>
            </a>
          </span>
        </div>
      </div>
      <div ref="curve_block" class="curve_block">
        <Curve ref="curve"></Curve>
      </div>
      <div>
        <Hello
            style="position: relative;z-index: 2" ref="hello"
            @enter_over="background_enter"
            @click_name="()=>{this.$refs.paper_1.click()}"
        />
      </div>
      <div ref="shadow_block" class="shadow_block"></div>
      <div ref="paper_block" class="paper_block">
        <div>
          <div ref="paper_3" class="paper_3">
            <div ref="paper_3_content" class="paper_3_content">
              <span style="font-size: 30px">About animation</span>
              <span style="font-size: 20px">
                All these animations
              </span>
              <span style="font-size: 20px">
                was supported by
              </span>
              <a target="_blank" href="https://github.com/r1ader/r_animate">
                <span style="font-size: 20px;color: #434394;position:relative;">
                  r_animate.js
                </span>
                <span style="position: relative;opacity: 1">
                  <div class="r_animate_background" ref="r_a_b_1"></div>
                </span>
              </a>
              <span style="font-size: 20px">
                It’s very lightweight
              </span>
              <span style="font-size: 20px">
                and easy to learn.
              </span>
              <span>
              <span style="font-size: 20px">
                    Refer to
                  </span>
              <a target="_blank" href="https://github.com/r1ader/r_animate">
                  <span style="margin-left:10px;font-size: 20px;color: #434394;position:relative;">
                    r_animate.js
                  </span>
                  <span style="position: relative;opacity: 1">
                  <div class="r_animate_background" ref="r_a_b_2"></div>
                </span>
              </a>
              </span>
              <span style="font-size: 20px">
                if you wanna try it.
              </span>
            </div>
          </div>
        </div>
        <div>
          <div ref="paper_2" class="paper_2">
            <div ref="paper_2_content" class="paper_2_content">
              <span style="font-size: 30px">About me</span>
              <span style="font-size: 20px">
                I am studying a master's degree at HZNU
              </span>
              <span style="font-size: 20px">
                I love Coding, Painting  and  Designing
              </span>
              <span>
              <span style="font-size: 20px;margin-right: 10px">
                My e-mail:
              </span>
                <span style="font-size: 20px;color: #434394;">r1ader.v1@gmail.com</span>

                <span style="position: relative;opacity: 1">
                    <div class="email_background" ref="e_b"></div>
                </span>
                </span>
            </div>
          </div>
        </div>
        <div>
          <div ref="paper_1" class="paper_1">
            <div ref="paper_1_content" class="paper_1_content">
              <span style="font-size: 30px">r1ader ?</span>
              <span style="font-size: 20px;line-height:30px">
                My friends always call me
                <span style="font-size: 20px;color: #bd355e;">"reader"</span>
                for my fancy on a magazine called
                <span style="font-size: 20px;color: #bd355e;">《reader》</span>
              </span>
              <span style="font-size: 20px;line-height:30px">
                But it's too common as a username,
                so I replace the letter
                <span style="font-size: 20px;color: #bd355e;">"e"</span>
                with number
                <span style="font-size: 20px;color: #bd355e;">"1"</span>
              </span>
              <span style="font-size: 20px;line-height:30px">
                Just pronounced
                <span style="font-size: 20px;color: #bd355e;">"r1ader"</span> the same way as
                <span style="font-size: 20px;color: #bd355e;">
                "reader"</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import R_director from '../../utils/r_animate'
import Curve from "./Curve.vue";
import Hello from "./Hello.vue";
import _ from "lodash";
import { debug } from '../../const/config'
import { clog } from '../../utils/index'

export default {
  name: 'First',
  components: {
    Curve,
    Hello
  },
  data() {
    return {
      r_director: null,
      focus_on: false,
      cursorX: 100,
      cursorY: 0,
    }
  },
  methods: {
    beginning_motion() {
      this.$refs.hello.beginning_motion()
    },
    background_enter() {
      const {
        curve_block,
        ball_block,
        paper_block,
        ball_1, ball_2, ball_3,
        paper_1, paper_2, paper_3,
        github,
      } = this.$refs
      const duration = debug ? 500 : 2000
      const opacity_on = { opacity: '[0~1]', duration: 100 }
      const scale_ratio = window.innerHeight / 360
      curve_block.r_animate(opacity_on)
      ball_block.r_animate(opacity_on)
      paper_block.r_animate(opacity_on)
      this.$refs.curve.enter()
      ball_1.r_animate({ transform: 'translate([200~0]px)', duration })
      ball_2.r_animate({ transform: 'translateY([-150~0]px)', duration })
      ball_3.r_animate({ transform: 'translate([100~0]px,[-200~0]px)', duration })
      github.r_animate({ transform: 'translate([100~0]px,[-200~0]px)', duration }).r_animate(opacity_on)
      paper_1.r_animate({
        transform: 'translate([300~-50]px,-100px) scale(0.7) perspective(500px) rotateY(-40deg) rotateX(20deg) rotateZ(-50deg)',
        duration
      })
      paper_2.r_animate({
        transform: 'translate(-70px, [240~-70]px) scale(0.5) perspective(500px) rotateY(40deg) rotateZ(-20deg)',
        duration
      })
      paper_3.r_animate({
        transform: 'translate([300~-80]px, [300~-30]px) rotateZ(20deg)',
        duration
      })
    },
    init_interact() {
      const {
        ball_1, ball_2, ball_3,
        paper_1, paper_2, paper_3,
        paper_1_content, shadow_block,
        b_b, r_a_b_1, r_a_b_2, e_b
      } = this.$refs
      const _this = this
      b_b.r_wrap = true
      r_a_b_1.r_wrap = true
      r_a_b_1.r_opacity = 0.4
      r_a_b_1.r_zIndex = 999
      r_a_b_2.r_wrap = true
      r_a_b_2.r_opacity = 0.4
      r_a_b_2.r_zIndex = 999
      e_b.r_wrap = true
      e_b.r_opacity = 0.4
      e_b.r_zIndex = 999
// todo add an transparent logo in ball,
//  when cursor hover ball, it was drag to wrap the logo,
//  with cursor's background, logo was visible
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
      // ball_3.addEventListener('mouseenter', function (e) {
      //   ball_3
      //       .r_animate({ transform: 'scale([1~1.1])', duration: 200, interpolation: 'easeOutCirc' })
      //       .r_animate({ transform: 'scale([1~1.1])', duration: 200, interpolation: 'easeInCirc', reverse: true })
      // })

      // todo make cursor interact with card
      paper_1.addEventListener('click', function (e) {
        if (_this.focus_on) return
        const card_position_x = Math.round(window.innerWidth / -2)
        const card_position_y = Math.round(window.innerHeight / -2)
        const paper_1_flip_in = {
          background: 'rgb([255~180],[255~180],[255~180])',
          borderRadius: '[20~10]px',
          transform: `translate([-50~${ card_position_x }]px,[-100~${ card_position_y }]px) scale([0.7~1]) perspective([500~1000]px) rotateY([-40~360]deg) rotateX([20~0]deg) rotateZ([-50~0]deg)`,
          duration: 1500,
          interpolation: 'easeInOutExpo',
        }
        paper_1.r_animate(paper_1_flip_in)
        _this['shadow_block_cancel_callback'] = () => {
          return new Promise((resolve, eject) => {
            paper_1.r_animate({
              ...paper_1_flip_in,
              // transform: `translate([-50~${ card_position_x }]px,[-100~${ card_position_y }]px) scale([1~2]) perspective(229px) rotateY([-40~360]deg) rotateX([20~0]deg) rotateZ([-50~0]deg)`,
              reverse: true
            }).r_then(resolve)
          })
        }
        _this.turn_focus_on()
      })
      paper_2.addEventListener('click', function (e) {
        if (_this.focus_on) return
        const card_position_x = Math.round(window.innerWidth / -2)
        const card_position_y = Math.round(window.innerHeight / -2)
        const paper_2_flip_in = {
          background: 'rgb([212~180],[212~180],[212~180])',
          borderRadius: '[20~10]px',
          transform: `translate([-70~${ card_position_x }]px, [-70~${ card_position_y }]px) scale([0.5~1]) perspective(500px) rotateY([40~0]deg) rotateX([0~-360]deg) rotateZ([-20~0]deg)`,
          duration: 1500,
          interpolation: 'easeInOutExpo',
        }
        paper_2.r_animate(paper_2_flip_in)
        _this['shadow_block_cancel_callback'] = () => {
          return new Promise((resolve, eject) => {
            paper_2.r_animate({
              ...paper_2_flip_in,
              // transform: `translate([-70~${ card_position_x }]px, [-70~${ card_position_y }]px) rotateX([20~360]deg) rotateZ([-20~0]deg)`,
              reverse: true
            }).r_then(resolve)
          })
        }
        _this.turn_focus_on()
      })
      paper_3.addEventListener('click', function (e) {
        if (_this.focus_on) return
        const card_position_x = Math.round(window.innerWidth / -2)
        const card_position_y = Math.round(window.innerHeight / -2)
        const paper_3_flip_in = {
          background: 'rgb([147~180],[147~180],[147~180])',
          borderRadius: '[20~10]px',
          transform: `translate([-80~${ card_position_x }]px, [-30~${ card_position_y }]px) rotateZ([20~-360]deg)`,
          duration: 1500,
          interpolation: 'easeInOutExpo',
        }
        paper_3.r_animate(paper_3_flip_in)
        _this['shadow_block_cancel_callback'] = () => {
          return new Promise((resolve, eject) => {
            paper_3.r_animate({
              ...paper_3_flip_in,
              // transform: `translate([-70~${ card_position_x }]px, [-70~${ card_position_y }]px) rotateX([20~360]deg) rotateZ([-20~0]deg)`,
              reverse: true
            }).r_then(resolve)
          })
        }
        _this.turn_focus_on()
      })
      paper_1.hover_event = true
    },
    init_focus_system() {
      const _this = this
      const { shadow_block } = this.$refs
      const shadow_block_click_function = function (e) {
        if (!_this.focus_on) return
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
      if (this.focus_on) return
      this.focus_on = true
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
      if (!this.focus_on) return
      this.focus_on = false
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
    this.r_director = new R_director()
    this.r_director.take(this)
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

.paper_block {
  position: absolute;
  z-index: 3;
  opacity: 0;
  right: 0;
  bottom: 0;
}

.paper_1 {
  position: absolute;
  z-index: 3;
  width: 400px;
  height: 600px;
  background: white;
  border-radius: 20px;
  box-shadow: -18px -16px 20px 0 rgba(0, 0, 0, 0.2);
}

.paper_2 {
  position: absolute;
  z-index: 3;
  width: 600px;
  height: 400px;
  background: rgba(212, 212, 212, 1);
  border-radius: 20px;
  box-shadow: -18px -16px 20px 0 rgba(0, 0, 0, 0.2);
}

.paper_3 {
  position: absolute;
  z-index: 3;
  width: 400px;
  height: 600px;
  background: rgba(147, 147, 147, 1);
  border-radius: 20px;
}

.curve_block {
  opacity: 0;
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
}

.ball_block {
  position: absolute;
  opacity: 0;
  right: 200px;
  top: 200px;
  right: 0;
  top: 0;
}

.paper_1_content {
  height: 397px;
  width: 273px;
  font-weight: bolder;
  color: #202020;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px;
  flex-direction: column;
}

.paper_2_content {
  opacity: 1;
  height: 212px;
  /*width: 260px;*/
  font-weight: bolder;
  color: #202020;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px;
  flex-direction: column;
}

.paper_3_content {
  width: 400px;
  margin: 0;
  box-sizing: border-box;
  height: 600px;
  padding: 60px 0 60px 0;
  opacity: 1;
  font-weight: bolder;
  color: #202020;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}

.shadow_block {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: -3;
}

.ball_background {
  opacity: 0;
  position: absolute !important;
  z-index: 4;
  width: 200px;
  height: 200px;
  box-sizing: content-box;
  border-radius: 100px;
  background-color: rgb(128, 122, 218);
  border-color: rgb(47, 29, 253);
  top: -100px;
  left: -100px;
}

.r_animate_background {
  opacity: 0;
  position: absolute !important;
  z-index: 4;
  width: 140px;
  height: 40px;
  top: -10px;
  left: -125px;
  box-sizing: content-box;
  border-radius: 5px;
  background-color: rgb(128, 122, 218);
  border-color: rgb(47, 29, 253);
}

.r_animate_background:hover {
  padding: 60px;
  top: -70px;
  left: -185px;
}

.email_background {
  opacity: 0;
  position: absolute !important;
  z-index: 4;
  width: 225px;
  height: 40px;
  top: -12px;
  left: -215px;
  box-sizing: content-box;
  border-radius: 5px;
  background-color: rgb(128, 122, 218);
  border-color: rgb(47, 29, 253);
}

.email_background:hover {
  padding: 60px;
  top: -70px;
  left: -275px;
}
</style>
