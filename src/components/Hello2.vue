<script>
import R_director from '../utils/r_animate'

export default {
  name: 'Hello2',
  data() {
    return {
      r_director: null
    }
  },
  methods: {
    beginning_motion() {
      const {
        hello
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
  background: #505050;
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
  /*transform: scale(1.2,1);*/
}

.github_logo {
  width: 40px;
  padding: 20px;
  filter: invert(1);
  opacity: 0;
}
</style>
