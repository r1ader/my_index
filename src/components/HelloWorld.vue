<script>
import {r_register, R_animate_config} from '../utils'

export default {
  data() {
    return {
      message: 'Hello'
    }
  },
  methods: {},
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
    r_register([hello,
      introduce,
      name_part1,
      name_part2,
      name_part3,
      dot])
    const cyliner_enter_config = {
      start: {
        transform: 'translate(0, -74px) rotateX(90deg)',
      },
      end: {
        transform: 'translate(0, -0) rotateX(0)',
      },
      duration: 1000,
      delay: 50
    }
    const spread_width_config = {
      start: {marginLeft: 0, marginRight: 0},
      end: {marginLeft: '20px', marginRight: '20px'},
      duration: 400
    }
    // hello.r_animate(cyliner_enter_config)
    // dot
    //     .r_animate({duration: 250}) // todo make this line enable a delay
    //     .r_animate(cyliner_enter_config)
    //     // .r_animate(cyliner_enter_config)
    // introduce.r_animate(cyliner_enter_config)
    // name_part1.r_animate(cyliner_enter_config)
    name_part2
        .r_animate(cyliner_enter_config)
        .r_animate(cyliner_enter_config)
    // .r_animate(spread_width_config)
    // name_part3
    //     .r_animate(cyliner_enter_config)
    // this.cyliner_enter_animation(name_part2, 1500).then(() => {
    //       console.log(this.trans, name_part2)
    //       this.trans(name_part2,
    //           {marginLeft: 0, marginRight: 0, transition: '0.5s', transitionDelay: '1.3s'},
    //           {marginLeft: '20px', marginRight: '20px'})
    //     }
    // )
    // setTimeout(()=>{
    //   location.reload()
    // },5000)
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
        <div style="margin-right: 0;margin-left: 0;
  transform: translate(0, -0) rotateX(0);" ref="name_part2">
          e
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

.main_container div {

}

.main_container {
  background: #202020;
}

.hello_block div {
  /*font-family: Constantia;*/
  /*font-family: fantasy;*/
  font-weight: bolder;
  color: white;
  font-size: 60px;
  margin: 20px;
  letter-spacing: 5px;
  /*transform: scale(1.2,1);*/
}


</style>
