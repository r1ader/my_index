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
        name_part2_1,
        name_part3,
        dot
      } = this.$refs
      hello
          .r_animate({ duration: 100 })
          .r_animate({ opacity: `[${ hello.style.opacity }~0]`, duration: 1000 })

      introduce
          .r_animate({ duration: 100 })
          .r_animate({ opacity: `[${ introduce.style.opacity }~0]`, duration: 1000 })

      name_part1
          .r_animate({ duration: 100 })
          .r_animate({ opacity: `[${ name_part1.style.opacity }~0]`, duration: 1000 })

      name_part2
          .r_animate({ duration: 100 })
          .r_animate({ opacity: `[${ name_part2.style.opacity }~0]`, duration: 1000 })

      name_part2_1
          .r_animate({ duration: 100 })
          .r_animate({ opacity: `[${ name_part2_1.style.opacity }~0]`, duration: 1000 })

      name_part3
          .r_animate({ duration: 100 })
          .r_animate({ opacity: `[${ name_part3.style.opacity }~0]`, duration: 1000 })

      dot
          .r_animate({ duration: 100 })
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
    <div class="navigation_block">
      <div ref="right_top_ball" class="ball"></div>
    </div>
    <div class="main_block">
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

.ball {
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin: 20px;
  background: #dedede;
  opacity: 0;
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

</style>
