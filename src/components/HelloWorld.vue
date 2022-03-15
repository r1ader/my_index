<script>
import { r_register } from '../utils'

export default {
  data() {
    return {
      message: 'Hello'
    }
  },
  methods: {
    trans(element, start_style, end_style) {
      Object.keys(start_style).forEach(key => {
        element.style[key] = start_style[key]
      })
      setTimeout(() => {
        Object.keys(end_style).forEach(key => {
          element.style[key] = end_style[key]
        })
      }, 0)
    },
    cyliner_enter_animation(element, delay = 0) {
      // this.trans(element,
      //     {
      //       opacity: 0,
      //       transform: 'translate(0, -74px) rotateX(90deg)',
      //       transition: '1s',
      //       transitionDelay: `${ delay }ms`
      //     },
      //     {
      //       opacity: 1,
      //       transform: 'translate(0, -0) rotateX(0)',
      //     })
      // return {
      //   then: function (func) {
      //     setTimeout(() => {
      //       func()
      //     }, delay)
      //
      //   }
      // }
    }
  },
  mounted() {
    console.clear()
    const {
      hello,
      introduce,
      name_part1,
      name_part2,
      name_part3,
      dot
    } = this.$refs
    console.log(r_register)
    r_register(hello)
    hello.r_animate(
        {
          opacity: 0,
          transform: 'translate(0, -74px) rotateX(90deg)',
          transition: '1s',
          transitionDelay: `0ms`
        },
        {
          opacity: 1,
          transform: 'translate(0, -0) rotateX(0)',
        })
    // this.cyliner_enter_animation(hello)
    // this.cyliner_enter_animation(dot, 250)
    // this.cyliner_enter_animation(introduce, 500)
    // this.cyliner_enter_animation(name_part1, 1500)
    // this.cyliner_enter_animation(name_part2, 1500).then(() => {
    //       console.log(this.trans, name_part2)
    //       this.trans(name_part2,
    //           {marginLeft: 0, marginRight: 0, transition: '0.5s', transitionDelay: '1.3s'},
    //           {marginLeft: '20px', marginRight: '20px'})
    //     }
    // )
    // this.cyliner_enter_animation(name_part3, 1500)
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
        <div>
          <div style="margin-right: 0" ref="name_part1">
            r
          </div>
          <div style="margin-right: 0;margin-left: 0" ref="name_part2">
            e
          </div>
          <div style="margin-left: 0" ref="name_part3">
            ader
          </div>
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

.main_container div {

}

.main_container {
  background: #202020;
}

.hello_block div {
  /*font-family: Constantia;*/
  font-family: fantasy;
  color: white;
  font-size: 60px;
  margin: 20px;
  letter-spacing: 5px;
  /*transform: scale(1.2,1);*/
}

</style>
