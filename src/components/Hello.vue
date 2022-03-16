<script>
import { r_register } from '../utils'

export default {
  name: 'Hello',
  data() {
    return {
      message: 'Hello'
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
      r_register([hello,
        introduce,
        name_part1,
        name_part2,
        name_part2_e,
        name_part2_1,
        name_part3,
        dot])
      const cylinder_enter = {
        start: {
          opacity: 0,
          transform: 'translate(0, -54px) rotateX(90deg)',
        },
        end: {
          opacity: 1,
          transform: 'translate(0, 0) rotateX(0)',
        },
        duration: 1000,
        delay: 0
      }
      const cylinder_out = {
        start: {
          opacity: 1,
          transform: 'translate(0, 0) rotateX(0)',
        },
        end: {
          opacity: 0,
          transform: 'translate(0, 54px) rotateX(90deg)',
        },
        duration: 1000,
        delay: 0
      }
      const spread_width = {
        start: { marginLeft: 0, marginRight: 0 },
        end: { marginLeft: '20px', marginRight: '20px' },
        duration: 400
      }
      const shrink_width = {
        start: { marginLeft: '20px', marginRight: '20px' },
        end: { marginLeft: 0, marginRight: 0 },
        duration: 400
      }
      const disppear = {
        end: { opacity: 0 },
        duration: 0
      }
      const come_out = {
        end: { opacity: 1 },
        duration: 1000
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
          .r_same(name_part2)
          .r_same(name_part3)

      name_part2
          .r_animate(spread_width)
          .r_animate({ duration: 100 })
          .r_then(() => {
            name_part2_1.r_animate(cylinder_enter)
            name_part2_e.r_animate(cylinder_out)
          })
          .r_animate({ duration: 900 })
          .r_animate(shrink_width)
    }
  },
  mounted() {
    console.clear()
    this.beginning_motion()
  }
}

</script>

<template>
  <div class="main_container">
    <div class="main_block">
      <div class="hello_block">
        <div ref="hello">
          {{ message }}
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

.main_block {
  color: white;
  height: 100vh;
  width: 100vw;
}

.main_container {
  background: #202020;
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
  /*transform: scale(1.2,1);*/
}


</style>
