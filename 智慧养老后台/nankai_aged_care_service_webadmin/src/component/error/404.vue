<template>
 <el-main class='noFind'>
  <el-row>
    <el-col :span='24'>
      <div class='error'>404</div>
    </el-col>
    <el-col :span='24'>
      <div class='prompt'>Sorry Page Not Found</div>
    </el-col>
    <el-col :span='24'>
      <div class='back'>
        <el-link type="info" href='/'>
          <i class="el-icon-back"></i> 返回首页
        </el-link>
      </div>
    </el-col>
  </el-row>
 </el-main>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped lang='scss'>
.noFind {
  background: rgb(42, 64, 84);
  position: fixed;
  width: 100%;
  height: 100%;
  color: white;
  font-weight: bold;

  .error {
    font-size: 200px;
    margin-top:10%;
    text-shadow:0 0 10px rgb(240, 210, 39);
  }

  .prompt {
    margin-bottom: 40px;
    font-family: Verdana, Geneva, sans-serif;
    font-size: 36px;
    text-shadow: 0 0 10px rgb(240, 210, 39);
  }

  .back {
    font-size: 20px;
  }
}
</style>
