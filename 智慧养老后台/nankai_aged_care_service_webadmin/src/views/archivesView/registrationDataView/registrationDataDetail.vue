<template>
  <el-main>
    <el-form ref="infoForm" :model="infoForm" label-width="120px">
      <el-row class='el-row-el' style="text-align: left;">
        <el-col :span="14">
          <el-form-item label="头像">
            <el-image v-if="infoForm.icon" style="width: 100px; height: 100px" :src="infoForm.icon" :preview-src-list="[infoForm.icon]">
            </el-image>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="老人姓名" prop="name">
            <el-input v-model="infoForm.name" disabled=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="服务街道" prop="title">
            <el-input v-model="infoForm.streetName" disabled=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="服务社区">
            <el-input v-model="infoForm.communityName" disabled=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="服务电话">
            <el-input v-model="infoForm.servicePhone" disabled=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="身份证号">
            <el-input v-model="infoForm.idCard" disabled=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="联系电话">
            <el-input v-model="infoForm.phone" disabled=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="创建时间">
            <el-input v-model="infoForm.createTime" disabled=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="服务详细地址">
            <el-input type="textarea" v-model="infoForm.address" disabled=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="24">
          <el-form-item class="open_btn">
            <el-button @click="close">返回</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      infoForm: {
        id: '',
        title: '',
        author: '',
        srcName: '',
        srcUrl: '',
        phone: '',
        icon: '',
        digest: '',
        messageWeb: ''
      }
    }
  },

  mounted() {
    this.id = this.$route.query.id
    this.getList()
  },

  methods: {
    async getList() {
      let that = this
      try {
        let findUrl = that.api.appUser.findById + '?id=' + this.id
        let parameter = {}
        const response = await that.request.dataGet(that, findUrl, parameter)
        if (response.code === 1) {
          that.infoForm = response.data
          let icon = response.data.icon
          if (!icon) {
            that.infoForm.icon = this.errorImg
          } else {
            that.infoForm.icon = process.env.VUE_APP_FILE + icon
          }
          // console.log(that.infoForm.icon)
          return false
        }
        that.$message.error(response.msg)
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    close(val) {
      this.$router.push({
        path: 'registrationDataView'
      })
    }
  }
}
</script>
