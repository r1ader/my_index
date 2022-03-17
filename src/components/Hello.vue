<script>
import R_director from '../utils/r_nimate'

export default {
  name: 'Hello',
  data() {
    return {
      r_director: null
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

      hello
          .r_animate({ duration: 1000 })
          .r_animate(cylinder_enter)

      dot
          .r_animate({ duration: 1500 })
          .r_animate(cylinder_enter)


      introduce
          .r_animate({ duration: 2000 })
          .r_animate(cylinder_enter)

      name_part1
          .r_animate({ duration: 3000 })
          .r_animate(cylinder_enter)

      this.$data.r_director
          .copy(name_part1,
              [
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
    },
    exit_motion() {
      this.$data.r_director.cut()
      const {
        hello,
        introduce,
        name_part1,
        name_part2,
        name_part3,
        dot
      } = this.$refs
      hello.r_animate({ opacity: `[${ hello.style.opacity }~0]`, duration: 1000 })

      introduce
          .r_animate({ opacity: `[${ introduce.style.opacity }~0]`, duration: 1000 })

      name_part1
          .r_animate({ opacity: `[${ name_part1.style.opacity }~0]`, duration: 1000 })

      name_part2
          .r_animate({ opacity: `[${ name_part2.style.opacity }~0]`, duration: 1000 })

      name_part3
          .r_animate({ opacity: `[${ name_part3.style.opacity }~0]`, duration: 1000 })

      dot
          .r_animate({ opacity: `[${ dot.style.opacity }~0]`, duration: 1000 })
    }
  },
  mounted() {
    this.$data.r_director = new R_director()
    this.$data.r_director.take(this)
  }
}

</script>

<template>
  <div class="main_container">
    <div class="main_block">
      <div class="ball_block">
        <div class="ball_1"></div>
        <div class="ball_2"></div>
        <div class="ball_3"></div>
      </div>
      <div class="curve_block">
        <svg class="curve_1" width="300" height="400">
          <path
              d="
                M 0 0 V 400 H 195 C 201 299 97 278 92 141 C 93 79 112 56 122 47 C 134 35 143 38 151 44 C 160 51 177 38 188 25 C 197 14 202 6 212 0 H 0 L 0 0
              "
              fill="#939393"
              stroke="#939393"/>
          <path
              d="
                M 0 0 V 400 H 188 C 184 336 122 329 89 271 C 45 211 17 128 13 77 C 10 28 40 -4 41 0 H 0 L 0 0
              "
              fill="#d4d4d4"
              stroke="#d4d4d4"/>
          <path
              d="
                M 0 0 V 400 H 180 C 163 342 92 373 52 282 C 45 211 17 128 13 77 C 10 28 40 -4 41 0 H 0 L 0 0
              "
              fill="white"
              stroke="white"/>
        </svg>
      </div>
      <div class="paper_block">
        <div class="paper3"/>
        <div class="paper2"/>
        <div class="paper1"/>
      </div>
      <div class="hello_block">
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

<style scoped>
div {
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
  right: 0;
  bottom: 0;
}

.paper1 {
  position: absolute;
  width: 100px;
  height: 150px;
  background: white;
  border-radius: 10px 10px 10px 10px;
  transform: translate(-30px, -100px) scale(2) perspective(229px) rotateY(-40deg) rotateX(20deg) rotateZ(-50deg);
  transition: 0.2s ease-out;
}

.paper1:hover {
  transform: translate(-30px, -100px) scale(2.2) perspective(229px) rotateY(-40deg) rotateX(20deg) rotateZ(-50deg);
  transition: 0.2s ease-out;
}

.paper2 {
  position: absolute;
  width: 100px;
  height: 150px;
  background: #d4d4d4;
  border-radius: 10px 10px 10px 10px;
  transform: translate(-110px, 0px) scale(2) rotateZ(-20deg);
  transition: 0.2s ease-out;
}

.paper2:hover {
  transform: translate(-110px, 0px) scale(2.2) rotateZ(-20deg);
  transition: 0.2s ease-out;
}

.paper3 {
  position: absolute;
  width: 100px;
  height: 150px;
  background: #939393;
  border-radius: 10px 10px 10px 10px;
  transform: translate(-80px, -30px) scale(3) rotateZ(20deg);
  transition: 0.2s ease-out;
}

.paper3:hover {
  transform: translate(-80px, -30px) scale(3.3) rotateZ(20deg);
  transition: 0.2s ease-out;
}

.curve_block {
  position: absolute;
  left: 0;
}

.ball_block {
  position: absolute;
  right: 0;
  top: 0;
}

.curve_1 {
  transform: scale(2.4);
}

</style>
