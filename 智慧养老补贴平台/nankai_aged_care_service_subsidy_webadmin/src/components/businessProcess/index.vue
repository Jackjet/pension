<template>
  <div class="business-process">
    <div class="tips-box"> <i class="el-icon-sunny"></i> 温馨提示：【{{tips}}】整体环节如下所示 <br /> 可通过 “首页-{{title}}” 查看办理进度</div>
    <div class="speed-of-progress">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step v-for="(item,index) in dataList" :key="index" :title="item.title" :description="item.time"></el-step>
      </el-steps>
    </div>
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
      active: 0,
      tips: this.$route.meta.label,
      title: "",
    }
  },
  mounted() {
    this.title = sessionStorage.getItem("headerTitle");
  },
  methods: {
    setActive(num) {
      this.active = num;
    }
  }
}
</script>

<style lang="scss" scoped>
.tips-box {
  padding: 15px 20px;
  border-radius: 5px;
  box-shadow: $back-shadow;
  margin: 20px 0;
  color: red;
}
.speed-of-progress {
  padding: 20px 0;
  border-radius: 5px;
  box-shadow: $back-shadow;
  margin: 20px 0;
}
</style>
