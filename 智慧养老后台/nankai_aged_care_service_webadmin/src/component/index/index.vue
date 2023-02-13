<template>
  <el-row class='container'>
    <headers v-bind:index="showDown" v-on:navLabel="menuId"></headers>
    <sidebar :MenuId="MenuId"></sidebar>
    <el-scrollbar class='content-box' :class="{'content-collapse':collapse}">
        <div class="content">
          <div class='header_title'>
            <div class="collapse-btn" @click="collapseChage">
              <i v-if="!collapse" class="el-icon-s-fold"></i>
              <i v-else class="el-icon-s-unfold"></i>
            </div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>{{ title.title }}</el-breadcrumb-item>
              <el-breadcrumb-item
                v-if="this.title.name !== '' && this.title.name !== undefined">{{title.name}}
              </el-breadcrumb-item>
              <el-breadcrumb-item
                v-if="this.title.slots !== '' && this.title.name !== '' && this.title.slots !== undefined && this.title.name !== undefined">{{title.slots}}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <transition name="el-fade-in-linear">
            <div>
              <router-view></router-view>
            </div>
          </transition>
        </div>
    </el-scrollbar>
  </el-row>
</template>

<script>
import headers from 'template/header'
import sidebar from 'template/navMenu'
import transmit from 'directive/transmit'
import vmson from 'js/emptyVue'

export default {
  components: { sidebar, headers },

  data () {
    return {
      collapse: false,
      title: this.$route.meta,
      showDown: true,
      MenuId: []
    }
  },

  mounted () {
    this.onresizes()
    window.onresize = () => {
      return (() => {
        /**
         * 动态获取屏幕宽度 控制导航伸缩
         */
        this.onresizes()
      })()
    }
    vmson.$on('blur', (val, title) => {
      if (title) {
        this.title = val
      } else {
        this.title.name = val
      }
    })
  },

  methods: {
    /**
     * 控制柄触发导航伸缩 显示对应图标
     */
    collapseChage () {
      if (document.body.clientWidth <= 700) {
        return false
      }
      this.collapse = !this.collapse

      // 向父组件传递参数
      transmit.$emit('collapse', this.collapse)
    },

    onresizes () {
      if (document.body.clientWidth <= 700) {
        this.collapse = true
      }

      if (document.body.clientWidth <= 500) {
        this.showDown = false
      } else {
        this.showDown = true
      }

      transmit.$emit('collapse', this.collapse)
    },
    menuId (data, data2) {
      this.MenuId = data
    }
  },

  watch: {
    $route (route) {
      let meta = route.meta
      if (document.name) {
        meta.name = document.name
      }
      this.title = meta
      // 清空自定义路由
      document.name = undefined
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'base/index.scss';
</style>
