<template>
  <div class="list">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: from }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if='to.name!= "首页"'><a>{{to}}</a></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      to: [],
      from: []
    }
  },
  watch: {
    $route(to, from) {
      if (from.path == '/theElderly' || from.path == '/birthday' || from.path == '/nutrition') {
        localStorage.setItem('nav', from.path)
      }
      this.to = to.name
      this.from = localStorage.getItem('nav')
      // console.log(to)
      // 百岁
      if (to.path == '/nutrition/information/list') {
        if (to.query.type == 2) {
          this.to = '街道补贴上报'
        } else if (to.query.type == 3) {
          this.to = '街道补贴发放'
        } else if (to.query.type == 4) {
          this.to = '享受百岁营养补贴老人档案'
        }
      } else if (to.path == '/birthday/information/list') {
        if (to.query.type == 2) {
          this.to = '街道补贴上报'
        } else if (to.query.type == 3) {
          this.to = '街道补贴发放'
        } else if (to.query.type == 4) {
          this.to = '享受生日补贴老人档案'
        }
      } else if (to.path == '/information/list') {
        if (to.query.type == 2) {
          this.to = '享受居家养老档案'
        } else if (to.query.type == 3) {
          this.to = '社区居住证明上报'
        } else if (to.query.type == 4) {
          this.to = '享受生日补贴老人档案'
        } else if (to.query.type == 1) {
          this.to = '居家养老补贴发放'
        }
      } else if (to.path == '/street/grant') {
        if (to.query.type == 2) {
          this.to = '民政补贴汇总-补贴“发放”表'
        } else {
          this.to = '街道补贴上报-补贴“发放”表'
        }
      } else if (to.path == '/street/change') {
        if (to.query.type == 2) {
          this.to = '民政补贴汇总-补贴“变更”表'
        } else {
          this.to = '街道补贴上报-补贴“变更”表'
        }
      } else if (to.path == '/street/spendMoney') {
        if (to.query.type == 2) {
          this.to = '民政补贴汇总-居家养老服务补贴拨款表'
        } else {
          this.to = '街道补贴上报-南开区民政专项经费（居家养老政府补贴）支出情况表'
        }
      } else if (to.path == '/nutrition/pending/list') {
        if (to.query.type == 2) {
          this.to = '当月申报情况'
        }
      } else if (to.path == '/pending/list') {
        if (to.query.type == 1) {
          this.to = '居家养老补贴业务'
        } else if (to.query.type == 2) {
          this.to = '当月申报情况'
        }
      }
    }
  },
  mounted() {
  },
  methods: {

  }
}
</script>
<style lang="scss" scope>
.list {
  width: 90%;
  padding: 20px 50px 0 50px;
  box-sizing: border-box;
}
</style>