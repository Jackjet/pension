<template>
  <el-row class='container'>
    <div v-for="(item, index) in navData" :key="index" @click="navClick(item, index)">{{item.label}}</div>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      navData: [
        {
          label: '网站后台管理'
        },
        {
          label: '基础信息管理'
        },
        {
          label: '老人档案管理'
        },
        {
          label: '审批管理'
        },
        {
          label: '订单管理'
        },
        {
          label: '日间照料'
        },
        {
          label: '系统设置'
        },
        {
          label: '首页'
        },
        {
          label: '系统管理'
        }
      ]
    }
  },

  mounted () {
  },

  methods: {
    navClick (row, index) {
      this.common.session('navLabel', row.label)
      this.$router.push('/index')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
