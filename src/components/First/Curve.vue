<template>
  <svg viewBox="0 0 300 400" ref="curve" class="curve" :height="innerHeight">
    <defs>
      <pattern id="img1" patternUnits="userSpaceOnUse" width="300" height="400">
        <image href="../../assets/cat1.png" x="-100" y="0" width="300" height="400"/>
      </pattern>
      <pattern id="img2" patternUnits="userSpaceOnUse" width="605" height="1200">
        <image href="../../assets/me.png" x="-100" y="40" width="303" height="540"/>
      </pattern>
      <pattern id="img3" patternUnits="userSpaceOnUse" width="400" height="300">
        <image href="../../assets/cat2.png" x="0" y="0" width="160" height="160"/>
      </pattern>
      <pattern id="cat_background" patternUnits="userSpaceOnUse" :width="innerWidth" :height="innerHeight">
        <rect fill="#939393" :width="innerWidth" :height="innerHeight"/>
        <path id="CatPath1" fill="none" stroke="none"
              d="M 51 101 Q -4 -2 170 28"/>
        <text style="font-weight: bolder" x="15" y="15" fill="white">
          <textPath href="#CatPath1">
            &#8592; My Cat !!!&nbsp;&nbsp;&nbsp; &#8592; &nbsp;&nbsp;(=•ェ•=)
          </textPath>
        </text>
        <path id="CatPath2" fill="none" stroke="none"
              d="M 33 201 Q 12 268 89 362"/>
        <text style="font-weight: bolder" x="15" y="15" fill="white">
          <textPath href="#CatPath2">
            &#8592; T i m o ! ! !
          </textPath>
        </text>

        <circle
            fill="url(#img1)"
            :r="scopeR"
            :cx="cursorX-curve_1_transform"
            :cy="cursorY"></circle>
      </pattern>
      <pattern id="me_background" patternUnits="userSpaceOnUse" :width="innerWidth" :height="innerHeight">
        <rect fill="#d4d4d4" :width="innerWidth" :height="innerHeight"/>
        <path id="mePath1" fill="none" stroke="none"
              d="M 10 20 H 89"/>
        <text style="font-weight: bolder" fill="#333333">
          <textPath href="#mePath1">
            (^з^)
          </textPath>
        </text>
        <path id="mePath2" fill="none" stroke="none"
              d="M 10 200 C 13 226 27 239 46 246"/>
        <text style="font-weight: bolder" fill="#333333">
          <textPath href="#mePath2">
            Me &#8594;
          </textPath>
        </text>

        <circle
            fill="url(#img2)"
            :r="scopeR"
            :cx="cursorX-curve_2_transform"
            :cy="cursorY"></circle>
      </pattern>
      <pattern id="cat2_background" patternUnits="userSpaceOnUse" :width="innerWidth" :height="innerHeight">
        <rect fill="#ffffff" :width="innerWidth" :height="innerHeight"/>
        <text style="font-weight: bolder" fill="#939393">
          tart
        </text>
        <circle
            fill="url(#img3)"
            :r="scopeR"
            :cx="cursorX-curve_3_transform"
            :cy="cursorY"></circle>
      </pattern>
    </defs>
    <path
        class="curve_1"
        ref="curve_1"
        d="
                M 0 0 V 400 H 195 C 201 299 97 278 92 141 C 93 79 112 56 122 47 C 134 35 143 38 151 44 C 160 51 177 38 188 25 C 197 14 202 6 212 0 H 0 L 0 0
              "
        fill="url(#cat_background)"
    />
    <path
        ref="curve_2"
        d="
                M 0 0 V 400 H 188 C 170 307 91 315 50 231 C -1 139 23 16 60 0 H 0 L 0 0
              "
        fill="url(#me_background)"
    />
    <path
        ref="curve_3"
        d="
                M 0 359 V 400 H 181 C 177 360 98 339 0 335
              "
        fill="url(#cat2_background)"/>
  </svg>
</template>

<script>
import { r } from "ractjs";
import { debug } from '../../const/config'
import { clog, debounce } from '../../utils/index'

export default {
  name: "Curve",
  data() {
    return {
      r_director: null,
      cursorX: 300,
      cursorY: 380,
      innerHeight: 100,
      innerWidth: 100,
      curve_1_transform: -80,
      curve_2_transform: -80,
      curve_3_transform: -80,
      scopeR: 40
    }
  },
  methods: {
    enter() {
      const {
        curve_1, curve_2, curve_3
      } = this.$refs
      const duration = debug ? 500 : 2000
      r(curve_1).act({ transform: 'translate([-188~-80]px)', duration })
      r(curve_2).act({ transform: 'translate([-188~-80]px,[100~0]px)', duration })
      r(curve_3).act({ transform: 'translate([-188~-80]px,[200~0]px)', duration })
    },
    init_interact() {
      const {
        curve_1, curve_2, curve_3, curve
      } = this.$refs
      const translate_out = {
        transform: 'translateX([-80~0]px)',
        ease: 'easeInOutExpo',
        duration: 750,
        name: 'translate_out'
      }
      const translate_in = {
        transform: 'translateX([0~-80]px)',
        ease: 'easeInOutExpo',
        duration: 750,
        name: 'translate_in',
        callback: debounce
      }
      const _this = this
      // curve_1.cursor_hidden = true
      // curve_2.cursor_hidden = true
      // curve_3.cursor_hidden = true
      curve.addEventListener('mousemove', function (e) {
        const scale_ratio = window.innerHeight / 400
        _this.cursorX = e.clientX / scale_ratio
        _this.cursorY = e.clientY / scale_ratio
      })
      curve.addEventListener('mousedown', function (e) {
        r({}).act({
          duration: 200,
          parallel: (ratio) => {
            _this.scopeR = 40 + 40 * ratio
          },
          callback: debounce
        })
      })
      curve.addEventListener('mouseup', function (e) {
        r({}).act({
          duration: 200,
          parallel: (ratio) => {
            _this.scopeR = 80 - 40 * ratio
          },
          callback: debounce
        })
      })
      curve_1.addEventListener('mouseenter', function (e) {
        r(curve_1).act({
          ...translate_out,
          parallel: (ratio) => {
            _this.curve_1_transform = -80 + 80 * ratio
          }
        })
      })
      curve_1.addEventListener('mouseleave', function (e) {
        r(curve_1).act({
          ...translate_in,
          parallel: (ratio) => {
            _this.curve_1_transform = -80 * ratio
          }
        })

      })
      curve_2.addEventListener('mouseenter', function (e) {
        r(curve_2).act({
          ...translate_out,
          parallel: (ratio) => {
            _this.curve_2_transform = -80 + 80 * ratio
          }
        })
      })
      curve_2.addEventListener('mouseleave', function (e) {
        r(curve_2).act({
          ...translate_in,
          parallel: (ratio) => {
            _this.curve_2_transform = -80 * ratio
          }
        })
      })
      curve_3.addEventListener('mouseenter', function (e) {
        r(curve_3).act({
          ...translate_out,
          parallel: (ratio) => {
            _this.curve_3_transform = -80 + 80 * ratio
          }
        })
      })
      curve_3.addEventListener('mouseleave', function (e) {
        r(curve_3).act({
          ...translate_in,
          parallel: (ratio) => {
            _this.curve_3_transform = -80 * ratio
          }
        })
      })
    },
  },
  mounted() {
    this.innerHeight = window.innerHeight
    this.innerWidth = window.innerWidth
    this.init_interact()
  }
}
</script>

<style scoped>
</style>