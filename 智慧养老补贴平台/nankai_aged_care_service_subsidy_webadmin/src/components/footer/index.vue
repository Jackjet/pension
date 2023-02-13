<template>
  <div class="footer-name">
    <div class="display-title">
      <div class="left">
        <p>
          建设单位：天津市南开区民政局
        </p>
        <p>
          备案号：津ICP备2021008383号-1
        </p>
      </div>
      <div class="right">
        <p>
          客服电话：（022)83558800
        </p>
        <span>
          电子邮箱：nkqmzj_sfkll@tj.gov.cn
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { userIfo } from '@/api/file.js';
export default {
  data() {
    return {
     
    }
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
.footer-name {
  width: 100%;
  height: 100px;
  min-height: 100px;
  background: $color1;
  color: $font-color1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  box-sizing: border-box;
  .display-title {
    width: 100%;
    font-size: $font-size12;
    display: flex;
    justify-content: space-between;
    .left{
      font-size: 14px;
      p{
        margin: 10px 0;
      }
    }
    .right{
      text-align: right;
      p{
        font-size: 20px;
        margin-bottom: 10px;
      }
      font-size: 14px;
    }
  }
}
</style>
