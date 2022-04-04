<template>
  <div class="main_container">
    <div style="position:absolute;flex-direction: column;z-index: 1">

      <div ref="me" class="welcome">
        <div style="position:absolute;">
          About Me
        </div>
        <div style="position:absolute;color: white;transform: rotateZ(-90deg)">
          <span style="font-size: 20px">
            I am studying a master's degree at HZNU
          </span>
          <span style="font-size: 20px">
            I love Coding, Painting  and  Designing
          </span>
          <span style="font-size: 20px;margin-right: 10px">
              My e-mail: r1ader.v1@gmail.com
            </span>
        </div>
      </div>
      <div ref="ract" class="welcome">
        About Animate
      </div>
      <div ref="cat" class="welcome">
        <div ref="cat_pic" class="blur_background"></div>
        <div class="shadow_background"></div>
        <divs style="position: absolute">My Cat !!! (=•ェ•=)</divs>
      </div>
    </div>
  </div>
</template>

<script>

import { r } from 'ractjs'
import { fromEvent } from 'rxjs'

export default {
  name: "index.vue",
  data: function () {
    return {
      me_act: {
        color: 'rgba(255, 255, 255, [1~0])',
        transform: 'scale([1~2]) translateY([0~11]vh) rotateZ([0~90]deg) rotateX([0~360]deg)',
        reverse: false
      },
      cat_act: {
        color: 'rgba(255, 255, 255, [1~0])',
        transform: 'scale([1~2]) translateY([0~-11]vh) rotateZ([0~90]deg) rotateX([0~360]deg)',
        reverse: false
      },
      cat_pic_act: {
        filter: 'blur([10~0]px)',
        backgroundSize: '[800~300]px [1000~360]px',
        backgroundPosition: 'calc(-10vw - [133~255]px) calc(-20vh - [115~300]px)',
        reverse: false
      }
    }
  },
  methods: {
    init_interact() {

      const { cat, cat_pic, me, ract } = this.$refs
      fromEvent(cat, 'touchstart').subscribe(() => {
        r(cat).act(this.cat_act)
        r(cat_pic).act(this.cat_pic_act)
        this.cat_act.reverse = !this.cat_act.reverse
        this.cat_pic_act.reverse = !this.cat_pic_act.reverse
      })
      fromEvent(me, 'touchstart').subscribe(() => {
        r(me).act(this.me_act)
        this.me_act.reverse = !this.me_act.reverse
      })
    }
  },
  mounted() {
    this.init_interact()
  }
}
</script>

<style scoped>

div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main_container {
  box-sizing: border-box;
  color: #434394;
  width: 100vw;
  height: 100vh;
  border: 1px solid #434394;
  flex-direction: column;
  background-color: #a2a2a2;
}

.main_container::before {
  content: '';
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: none;
  z-index: 0;
}

.welcome {
  width: 80vw;
  height: 20vh;
  margin: 10px;
  border-radius: 10px;
  font-size: 30px;
  font-weight: bolder;
  position: relative;
  overflow: hidden;
  box-shadow: 3px 1px 20px 0px #0000009c;
  color: white;
}

.blur_background {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("../../../assets/cat1.png");
  background-size: 800px 1000px;
  background-position: calc(-10vw - 133px) calc(-20vh - 115px);
  filter: blur(4px);
}

.shadow_background {
  box-shadow: inset 0 0 20px 20px #0000009c;
  /*background-color: rgba(32, 32, 32, 0.34);*/
  position: absolute;
  width: 100%;
  height: 100%;
  color: white;
}
</style>
