<template>
  <div id="app">
    <transition name="el-fade-in-linear">
      <router-view />
    </transition>
  </div>
</template>

<script>
import '&/green/index.css'
import '&/purple/index.css'
import '&/yellow/index.css'
import '&/default/index.css'
import '&/red/index.css'
import '&/black/index.css'

export default {
  data() {
    return {}
  },

  mounted() {
    /**
     * 为满足不同项目需求，解决移动端PC端需要同时兼容过于反锁问题
     * 可按照相关需求开发两套兼容页面
     * 通过正则判断设备类型 分别指向移动端 PC端路由首页 进行浏览
     * 若无此需求 可删除或注释此代码块
     */
    // if (this.isMobile()) {
    //   this.$router.push('')
    // } else {
    //   this.$router.push('/')
    // }
  },

  methods: {
    isMobile() {
      return navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-icon-circle-close {
  color: #fff;
}
</style>
