<template>
  <div ref="screen" class="main_container">
    <div style="position:absolute;">
      <div ref="me" class="welcome">
        <div style="position:absolute;">
          About me
        </div>
        <div class="shadow_background"/>
        <div ref="me_background" class="info_background">
          <div
              style="font-size:10px;position:absolute;width: 20vh;height: 60vw;display:flex;align-items:center;justify-content: space-between;">
            <span>I am studying</span>
            <span>a master's degree</span>
            <span>at HZNU</span>
            <span>I love Coding, </span>
            <span>Painting  and  Designing</span>
            <span>My e-mail:</span>
            <span>r1ader.v1@gmail.com</span>
          </div>
        </div>
      </div>
      <div ref="ract" class="welcome">
        <div style="position:absolute;">
          About animate
        </div>
        <div class="shadow_background"/>
        <div ref="ract_background" class="info_background">
          <div
              style="font-size:10px;position:absolute;width: 20vh;height: 60vw;display:flex;align-items:center;justify-content: space-between;">
            <span>All these animations</span>
            <span>was supported by</span>
            <span style="background-color: rgba(67,67,148,0.45);padding: 4px 10px;border-radius: 3px">
              " ract.js "
            </span>
            <span>It's easy</span>
            <span>and</span>
            <span>fully documented</span>
            <span>Wish you</span>
            <a :href="doc_link">
              <span ref="have_try" class="have_try">Have a try</span>
            </a>
          </div>
        </div>
      </div>
      <div ref="cat" class="welcome">
        <div ref="cat_pic" class="blur_background"></div>
        <div class="shadow_background"/>
        <div style="position: absolute">My cat !!! <br>(=•ェ•=)~</div>
      </div>
    </div>
  </div>
</template>

<script>

import { r, acts } from 'ractjs'
import { isFunction } from "lodash";

export default {
  name: "index.vue",
  data: function () {
    return {
      cancel_callback: null,
      touch_on: false,
      touch_with: null,
      touch_start: 0,
      touch_end: 0,
      doc_link: '#'
    }
  },
  methods: {
    get_acts() {
      return {
        me_act: {
          color: 'rgba(255, 255, 255, [1~0])',
          transform: 'scale([1~2]) translateY([-25~0]vh) rotateZ([0~90]deg) rotateX([0~360]deg)',
        },
        ract_act: {
          color: 'rgba(255, 255, 255, [1~0])',
          transform: 'scale([1~2]) rotateZ([0~90]deg) rotateX([0~360]deg)'
        },
        cat_act: {
          color: 'rgba(255, 255, 255, [1~0])',
          transform: 'scale([1~2]) translateY([25~0]vh) rotateZ([0~90]deg) rotateX([0~360]deg)'
        },
        cat_pic_act: {
          filter: 'blur([10~0]px)',
          opacity: '[0.4~1]',
        },
        me_background_act: {
          filter: 'blur([10~0]px)'
        },
        ract_background_act: {
          filter: 'blur([10~0]px)'
        },
      }
    },
    show_me() {
      const {
        cat,
        me, ract,
        me_background,
      } = this.$refs
      const {
        me_act, me_background_act
      } = this.get_acts()
      r(me).act(me_act)
      r(me_background).act(me_background_act)
      r(ract).act({ transform: 'translateY([0~60]vh)' })
      r(cat).act({ transform: 'translateY([25~60]vh)' })
      this.cancel_callback = () => {
        r(me).act({ ...me_act, reverse: true })
        r(me_background).act({ ...me_background_act, reverse: true })
        r(ract).act({ transform: 'translateY([0~60]vh)', reverse: true })
        r(cat).act({ transform: 'translateY([25~60]vh)', reverse: true })

      }
    },
    show_ract() {
      const {
        cat,
        me, ract, have_try,
        ract_background,
      } = this.$refs
      const {
        ract_act, ract_background_act,
      } = this.get_acts()
      r(ract).act(ract_act)
      r(ract_background).act(ract_background_act)
      r(me).act({ transform: 'translateY([-25~-60]vh)' })
      r(cat).act({ transform: 'translateY([25~60]vh)' }).then(() => {
        r(have_try).act({
          background: 'rgba(66, 185, 131, [0~1])',
          padding: '[0~10]px [0~30]px [0~10]px [0~30]px'
        })
        this.$data.doc_link = 'https://r1ader.gitbook.io/ractjs_cn/'
      })
      this.cancel_callback = () => {
        r(ract).act({ ...ract_act, reverse: true })
        r(ract_background).act({ ...ract_background_act, reverse: true })
        r(me).act({ transform: 'translateY([-25~-60]vh)', reverse: true })
        r(cat).act({ transform: 'translateY([25~60]vh)', reverse: true })
        r(have_try).act({
          background: 'rgba(66, 185, 131, [0~1])',
          padding: '[0~10]px [0~30]px [0~10]px [0~30]px', reverse: true
        }).then(() => {
          this.$data.doc_link = '#'
        })
      }
    },
    show_cat() {

      const {
        cat, cat_pic,
        me, ract,
      } = this.$refs
      const {
        cat_act, cat_pic_act
      } = this.get_acts()
      r(cat).act(cat_act)
      r(cat_pic).act(cat_pic_act)
      r(me).act({ transform: 'translateY([-25~-60]vh)' })
      r(ract).act({ transform: 'translateY([0~-60]vh)' })
      this.cancel_callback = () => {
        r(cat).act({ ...cat_act, reverse: true })
        r(cat_pic).act({ ...cat_pic_act, reverse: true })
        r(me).act({ transform: 'translateY([-25~-60]vh)', reverse: true })
        r(ract).act({ transform: 'translateY([0~-60]vh)', reverse: true })
      }
    },
    init_interact() {
      const {
        cat,
        me, ract,
        screen,
        have_try
      } = this.$refs
      const _this = this

      r(cat).default.ease = 'easeInOutExpo'
      r(me).default.ease = 'easeInOutExpo'
      r(ract).default.ease = 'easeInOutExpo'
      r(have_try).default.ease = 'easeInOutExpo'
      screen.addEventListener('touchstart', function (e) {
        _this.touch_start = performance.now()
        _this.touch_with = e.target
        _this.touch_on = true


      }, true)
      screen.addEventListener('touchend', function (e) {
        _this.touch_end = performance.now()
        _this.touch_with = e.target
        _this.touch_on = false
      }, true)

    },
    enter() {
      const {
        cat,
        me, ract,
      } = this.$refs
      r(me).act(acts.IN.SCROLL_UP).act({transform: 'translateY([0~-25]vh)'})
      r(cat).act(acts.IN.SCROLL_UP).act({transform: 'translateY([0~25]vh)'})
      r(ract).act(acts.IN.SCROLL_UP)
    }
  },
  watch: {
    touch_on: function (new_value, old_value) {
      if (new_value) return
      if ((this.touch_end - this.touch_start) > 400) return
      if (isFunction(this.cancel_callback)) {
        this.cancel_callback()
        this.cancel_callback = null
        return;
      }
      const {
        cat,
        me, ract,
        screen
      } = this.$refs
      if (me.contains(this.touch_with)) {
        this.show_me()
      }
      if (cat.contains(this.touch_with)) {
        this.show_cat()
      }
      if (ract.contains(this.touch_with)) {
        this.show_ract()
      }
    }
  },
  mounted() {
    this.init_interact()
    this.enter()
    // r(this.$refs.cat).act(this.cat_act)
  }
}
</script>

<style scoped>

div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.main_container {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  background: #009fff; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right top, #009fff, #ec2f4b); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right top, #009fff, #ec2f4b);
  /*background-color: #ff8080;*/
}

.main_container::before {
  content: '';
  width: 100vw;
  height: 100vh;
  position: absolute;
  /*background-color: rgba(0, 0, 0, 0.5);*/
  pointer-events: none;
  z-index: 0;
}

.welcome {
  width: 80vw;
  height: 20vh;
  border-radius: 10px;
  font-size: 30px;
  font-weight: bolder;
  position: absolute;
  overflow: hidden;
  box-shadow: 3px 1px 20px 0px #0000009c;
  color: white;
}

.welcome:nth-child(1) {
  background-color: #ec2f4b99;
  transform: translateY(-25vh);
}

.welcome:nth-child(2) {
  background-color: #9c7bfd44;
}

.welcome:nth-child(3) {
  background-color: #009fff44;
  transform: translateY(25vh);
}

.blur_background {
  opacity: 0.4;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("../../../assets/cat1.png");
  background-size: 300px 360px;
  background-position: calc(-10vw - 255px) calc(-20vh - 300px);
  filter: blur(4px);
}

.shadow_background {
  box-shadow: inset 0 0 30px 20px rgba(0, 0, 0, 0.6);
  /*background-color: rgba(32, 32, 32, 0.34);*/
  position: absolute;
  width: 100%;
  height: 100%;
  color: white;
}

.info_background {
  filter: blur(10px);
  position: absolute;
  color: white;
  transform: rotateZ(-90deg);
  background: rgba(0, 0, 0, 0);
}

.have_try {
  display: inline-block;
  color: white;
  /*background: rgba(66, 185, 131, 0.82);*/
  /*padding: 10px;*/
  border-radius: 5px;
}
</style>
