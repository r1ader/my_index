<template>
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
      <span style="position:absolute;opacity: 0" ref="name_part2_1">
            1
          </span>
      <span ref="name_part2_e">e</span>
    </div>
    <div style="margin-left: 0" ref="name_part3">
      <span>
      ader
        </span>
      <span style="position: relative;opacity: 1">
      <div class="r1ader_background" ref="r_b"></div>
    </span>
    </div>
  </div>
</template>

<script>
import { Director } from "r_animate";
import { debug } from '../../const/config'

export default {
  name: "Hello",
  data: function () {
    return {
      r_director: null,
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
      if (debug) {
        dot.style.opacity = '1'
        hello.style.opacity = '1'
        introduce.style.opacity = '1'
        name_part1.style.opacity = '1'
        name_part2.style.opacity = '1'
        name_part2_e.style.opacity = '0'
        name_part2_1.style.opacity = '1'
        name_part3.style.opacity = '1'
        return
      }
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
      dot.r_animate({ duration: 1000 }).r_animate(cylinder_enter)
      introduce.r_animate({ duration: 1500 }).r_animate(cylinder_enter)
      name_part1.r_animate({ duration: 2500 }).r_animate(cylinder_enter)

      this.r_director.copy(name_part1, [
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
            this.$emit('enter_over')
            this.init_cursor_interact()
          })
    },
    init_cursor_interact() {
      const { r_b } = this.$refs
      r_b.r_wrap = true
      r_b.r_style = {
        borderColor: 'rgb(47,29,253)',
        backgroundColor: 'rgb(128,122,218)',
      }
      const _this = this
      r_b.addEventListener('click', function (e) {
        _this.$emit('click_name')
      })
    }
  },

  mounted() {
    this.r_director = new Director()
    this.r_director.take(this)
  }
}
</script>

<style scoped>

.hello_block > div {
  opacity: 0;
  position: relative;
  font-weight: bolder;
  color: white;
  font-size: 60px;
  margin: 20px;
  letter-spacing: 5px;
}

.no_select {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}

.r1ader_background {
  opacity: 0;
  position: absolute !important;
  z-index: 0;
  height: 100px;
  width: 256px;
  left: -238px;
  top: -15px;
  margin: 0;
  box-sizing: content-box;
  border-radius: 20px;
  background-color: rgb(128, 122, 218);
  border-color: rgb(47, 29, 253);

}

.r1ader_background:hover {
  padding: 150px;
  left: -388px;
  top: -165px;
}
</style>