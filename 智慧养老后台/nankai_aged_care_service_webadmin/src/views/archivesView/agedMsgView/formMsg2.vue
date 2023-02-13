<template>
  <el-main>
    <div class="hander">4.去世老人数据更新</div>
    <el-col :span="24" class="ta-l">
      <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="180px">
        <el-row class='el-row-el' style="text-align: left;">
          <el-col :span="10">
            <el-form-item label="去世时间" prop="nickName">
              <el-date-picker v-model="infoForm.nickName" type="date" value-format="yyyy-MM-dd" placeholder="去世时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="24">
            <el-form-item label="去世原因" prop="nickName">
              <el-input type="textarea" v-model="infoForm.nickName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 人口流动数据更新 -->
        <div class="hander">5.人口流动数据更新</div>
        <el-row class='el-row-el' style="text-align: left;">
          <el-col :span="10">
            <el-form-item label="搬迁时间" prop="nickName">
              <el-date-picker v-model="infoForm.nickName" type="date" value-format="yyyy-MM-dd" placeholder="搬迁时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="24">
            <el-form-item label="搬迁地址" prop="nickName">
              <el-input type="textarea" v-model="infoForm.nickName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-col>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      ImgUrl: '',
      streetList: [],
      infoForm: {
        nickName: '',
        streetId: '',
        icon: ''
      },
      rules: {
        nickName: [
          { required: true, message: '请输入用户账号', trigger: 'blur' }
        ]
      },
      fileUrl: process.env.VUE_APP_URL + this.api.resourceLib.upload,
      header: {
        'Authorization': 'token ' + this.common.session('currentUser').token
      }
    }
  },

  mounted() {
    this.getStreetList()
  },

  methods: {
    // 街道列表
    async getStreetList() {
      const that = this
      try {
        let url = this.api.street.findAll + '?page=1&size=1000000'
        let obj = {}
        const response = await this.request.dataGet(that, url, obj)
        that.streetList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    getUploudIdx(idx) {
      // console.log(idx)
    },
    handleContentChange(file) {
      let that = this
      let FileSize = file.size / 1024 / 1024 < 500
      if (!FileSize) {
        that.$message.error('上传超出文件限制大小')
        return false
      }
      this.isSubmitLoading = true
    },
    handleAvatarSuccess(response, file, fileList) {
      let that = this
      if (response.code === 1) {
        that.ImgUrl = response.data.fileLongPath
        that.infoForm.icon = response.data.filePath
        that.$message.success(response.msg)
        return false
      }
    },
    // 删除照片
    deleteImg(idx) {
      // console.log(idx)
      this.ImageArr.splice(idx, 1)
      this.FormImageArr.splice(idx, 1)
    },
    detail(e) {
      this.infoForm = e
    },
    // 添加数据
    onSubmit() {
      let that = this
      that.$refs.infoForm.validate(async (index) => {
        if (index === false) {
          return false
        }
        this.$emit('formMsgSave', this.infoForm, true)
      })
    }
  }
}
</script>

<style scoped>
.el-main {
  padding-bottom: 0 !important;
}
.hander {
  padding: 5px 0;
  margin-bottom: 10px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px dashed #999;
  color: #009966;
}
.min-title {
  padding: 5px 0;
  margin-bottom: 10px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px solid #999;
}
.upload-demo {
  float: left;
}
.flex {
  display: flex;
}
.img {
  width: 100px;
  height: 100px;
}
.ps {
  padding-left: 10px;
  color: red;
}
</style>
