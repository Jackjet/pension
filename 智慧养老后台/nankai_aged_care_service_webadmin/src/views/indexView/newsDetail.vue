<template>
  <el-main>
    <div class="main_title">{{content.title}}</div>
    <div class="main_time">发布时间：{{content.createTime}} <span style='display: inline-block; margin-left: 10px'>来源：{{content.srcName}}</span> </div>
    <div id='webHtml'></div>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      content: {}
    }
  },

  mounted() {
    this.getDetail(this.$route.query.id)
  },

  methods: {
    async getDetail(id) {
      const that = this
      try {
        let findUrl = this.api.Baseart.findById
        let obj = {
          id: id
        }
        const response = await that.request.dataGet(that, findUrl, obj)
        that.content = response.data
        document.getElementById('webHtml').innerHTML = that.content.messageWeb
      } catch (even) {
        // console.log(even)
      }
    }
  }
}
</script>

<style scoped>
.main_title {
  width: 95%;
  text-align: center;
  font-size: 18px;
  padding: 10px 0px;
  margin: 0px 20px;
}
.main_time {
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #999;
  padding-bottom: 40px;
}
#webHtml {
  text-align: left;
  padding: 0 40px;
}
</style>
