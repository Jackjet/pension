<template>
    <el-main>
        <el-form ref="form" :model="form" label-width="220px" :rules="rules">
            <el-form-item label="头像" prop="icon">
                <!--<el-input v-model="form.icon" v-if="false"></el-input>-->
                <!--<img v-if="form.icon" :src="form.icon_show" class="avatar">-->
                <el-image
                        :preview-src-list="[icon_show]"
                        :src="icon_show"
                        style="height: 100px;width: 100px">
                </el-image>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model.trim="form.name"
                          placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex" style="text-align: left">
                <el-radio v-model="form.sex" label="1">男</el-radio>
                <el-radio v-model="form.sex" label="0">女</el-radio>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input v-model.number="form.age"
                          placeholder="请输入年龄"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
                <el-input v-model.number="form.phone"
                          placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <!--<el-form-item label="身份证正面照" prop="idCard1">-->
                <!--<el-input v-model="form.idCard1" v-if="false"></el-input>-->
                <!--<el-upload-->
                        <!--class="avatar-uploader"-->
                        <!--accept='.jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP'-->
                        <!--:action='fileUrl'-->
                        <!--:headers='header'-->
                        <!--:show-file-list='false'-->
                        <!--:before-upload='beforeUpload'-->
                        <!--:on-success='handleChangeidCard1'>-->
                    <!--<img v-if="form.idCard1" :src="form.idCard1" class="avatar">-->
                    <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                <!--</el-upload>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="身份证背面照" prop="idCard2">-->
                <!--<el-input v-model="form.idCard2" v-if="false"></el-input>-->
                <!--<el-upload-->
                        <!--class="avatar-uploader"-->
                        <!--accept='.jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP'-->
                        <!--:action='fileUrl'-->
                        <!--:headers='header'-->
                        <!--:show-file-list='false'-->
                        <!--:before-upload='beforeUpload'-->
                        <!--:on-success='handleChangeidCard2'>-->
                    <!--<img v-if="form.idCard2" :src="form.idCard2" class="avatar">-->
                    <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                <!--</el-upload>-->
            <!--</el-form-item>-->
            <el-form-item label="身份证正面照" prop="idCard1">
                <el-image
                        v-if="form.idCard1"
                        style="width: 100px; height: 100px"
                        :src="form.idCard1"
                        :preview-src-list="[form.idCard1]">
                    <div slot="error" class="image-slot">
                        <el-image  :lazy="true"  fit="fill"  :src="require('../../../assets/image/error.png')"
                                   :preview-src-list="[require('../../../assets/image/error.png')]">
                        </el-image>
                    </div>
                </el-image>
                <div style="position: relative;">
                    <el-upload
                            class="upload-demo"
                            accept='.jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP'
                            :action='fileUrl'
                            :headers='header'
                            :show-file-list='false'
                            :before-upload='beforeUpload'
                            :on-success='handleChangeidCard1'>
                        <el-button size="small" type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                    </el-upload>
                </div>
            </el-form-item>
            <el-form-item label="身份证背面照" prop="idCard2">
                <el-image
                        v-if="form.idCard2"
                        style="width: 100px; height: 100px"
                        :src="form.idCard2"
                        :preview-src-list="[form.idCard2]">
                    <div slot="error" class="image-slot">
                        <el-image  :lazy="true"  fit="fill"  :src="require('../../../assets/image/error.png')"
                                   :preview-src-list="[require('../../../assets/image/error.png')]">
                        </el-image>
                    </div>
                </el-image>
                <div style="position: relative;">
                    <el-upload
                            class="upload-demo"
                            accept='.jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP'
                            :action='fileUrl'
                            :headers='header'
                            :show-file-list='false'
                            :before-upload='beforeUpload'
                            :on-success='handleChangeidCard2'>
                        <el-button size="small" type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                    </el-upload>
                </div>
            </el-form-item>
            <el-form-item label="现居住地址" prop="address">
                <el-input v-model="form.address" type="textarea"
                          :rows="3"
                          placeholder="请输入现居住地址"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">保存</el-button>
                <el-button @click="back()">返回</el-button>
            </el-form-item>
        </el-form>
    </el-main>
</template>

<script>
export default {
  data () {
    var checkPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('联系电话不可为空'))
      } else {
        if (!(/^1[3456789]\d{9}$/.test(this.form.phone))) {
          callback(new Error('联系电话有误'))
        } else {
          callback()
        }
      }
    }
    var checkAge= (rule, value, callback) => {
      if (value === '') {
        callback(new Error('年龄不可为空'))
      } else {
        if (!(/^\+?\d+$/.test(this.form.age))) {
          callback(new Error('年龄有误'))
        } else {
          callback()
        }
      }
    }
    var checkAddress = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('地址不可为空'))
      } else {
          callback()
      }
    }
    var checkSex = (rule, value, callback) => {
      if (this.form.sex === '') {
        callback(new Error('性别不可为空'))
      } else {
        callback()
      }
    }
    var checkId1 = (rule, value, callback) => {
      if (this.form.idCard1 === '') {
        callback(new Error('请上传身份证正面照'))
      } else {
        callback()
      }
    }
    var checkId2 = (rule, value, callback) => {
      if (this.form.idCard2 === '') {
        callback(new Error('请上传身份证背面照'))
      } else {
        callback()
      }
    }
    return {
      icon_show: this.errorImg,
      fileUrl: process.env.VUE_APP_URL + this.api.resourceLib.upload,
      header: {
        'Authorization': 'token ' + this.common.session('currentUser').token
      },
      form: {
        id: '',
        name: '',
        sex: '',
        age: '',
        phone: '',
        idCard1: '',
        idCard2: '',
        address: ''
      },
      rules: {
        name: [{ required: true, message: '姓名不可为空', trigger: 'blur' }],
        sex: [{ required: true, validator: checkSex, trigger: 'blur' }],
        age: [{ required: true, validator: checkAge, trigger: 'blur' }],
        phone: [{ required: true, validator: checkPhone, trigger: 'blur' }],
        idCard1: [{ required: true, validator: checkId1, trigger: 'blur' }],
        idCard2: [{ required: true, validator: checkId2, trigger: 'blur' }],
        address: [{ required: true, message: '现居住地址不可为空', trigger: 'blur' },
          { validator: checkAddress, trigger: 'blur' }]
      }
    }
  },
  computed: {
    formSex() {
      return this.form.sex;
    },
    formId1() {
      return this.form.idCard1;
    },
    formId2() {
      return this.form.idCard2;
    }
  },
  watch: {
    formSex (val, oldVal) {
      console.log("dfs"+this.form.sex)
      this.$refs.form.validateField("sex")
    },
    formId1 (val, oldVal) {
      this.$refs.form.validateField("idCard1")
    },
    formId2 (val, oldVal) {
      this.$refs.form.validateField("idCard2")
    }
  },
  mounted () {
    this.initial()
  },
  methods: {
    async initial () {
      const that = this
      try {
        that.getInfo()
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    async getInfo () {
      const that = this
      let url = this.api.servant.findById
      let obj = {
        'id': that.$route.params.id
      }
      if (obj.id.length > 0) {
        const response = await this.request.dataGet(that, url, obj)
        if (response.code === 1) {
          that.form = response.data
          that.icon_show = response.data.icon ? that.api.resource.lib + response.data.icon : that.errorImg
          if(!response.data.sex){
            that.form.sex = '1'
          }
        } else {
          that.$message.error(response.msg)
        }
      }else {
        that.form.sex = '1'
        that.icon_show = that.errorImg
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async submit () {
      const that = this
      try {
        let obj = {
          'id': that.$route.params.id
        }
        let url = ''
        if (obj.id.length > 0) {
          url = this.api.servant.update
          let obj = that.form
          obj.address = that.form.address.trim()
          const response = await this.request.dataPut(that, url, obj)
          if (response.code === 1) {
            that.$message.success(response.msg)
            history.go(-1)
          } else {
            that.$message.error(response.msg)
          }
        } else {
          url = this.api.servant.insert
          let obj = that.form
          const response = await this.request.dataPost(that, url, obj)
          if (response.code === 1) {
            that.$message.success(response.msg)
            history.go(-1)
          } else {
            that.$message.error(response.msg)
          }
        }
      } catch (even) {
        that.$message.error('数据上传失败')
      }
    },
    back () {
      history.go(-1)
    },
    beforeUpload (file) {
      let that = this
      let FileSize = file.size / 1024 / 1024 < 500
      if (!FileSize) {
        that.$message.error('上传超出文件限制大小')
        return false
      }
    },
    handleChangeidCard1 (response, file, fileList) {
      let that = this
      if (response.code === 1) {
        this.form.idCard1 = response.data.fileLongPath
        that.$message.success(response.msg)
        return false
      }
    },
    handleChangeidCard2 (response, file, fileList) {
      let that = this
      if (response.code === 1) {
        this.form.idCard2 = response.data.fileLongPath
        that.$message.success(response.msg)
        return false
      }
    },
    getLabelByValue: function (value, array) {
      var result = ''
      array.forEach(function (data) {
        if (data.value === value) {
          result = data.label
        }
      })
      return result
    }
  }
}
</script>

<style scoped>
    .el-form-item {
        width: 500px
    }
</style>
