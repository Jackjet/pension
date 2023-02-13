<template>
  <el-main>
    <div class="hander">1.老人基本信息</div>
    <el-col :span="24" class="ta-l">
      <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="130px">
        <el-row class='el-row-el'>
          <el-col :span="12">
            <el-form-item label="身份证号" prop="idCard">
              <el-input v-model="infoForm.idCard" @change="idCardChange"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="infoForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="infoForm.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="老人分类" style="text-align:left" prop="type">
              <el-select style="width: 100%;" v-model="infoForm.type" @change="typeChange" placeholder="请选择老人分类">
                <el-option label="普通老人" value="1"></el-option>
                <el-option label="居家老人" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="infoForm.age" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期" prop="birthday">
              <el-input v-model="infoForm.birthday" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el' style="text-align: left;">
          <el-col :span="24">
            <el-form-item label="老人类型" prop="genreId">
              <el-checkbox-group v-model="infoForm.genreId">
                <el-checkbox v-for="(item, i) in genreList" :key="i" :label="item.id + ',' + item.name" name="type">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="12">
            <el-form-item label="紧急联系人姓名" prop="linkName">
              <el-input v-model="infoForm.linkName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="紧急联系人电话" prop="linkPhone">
              <el-input v-model="infoForm.linkPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el' style="text-align: left;">
          <el-col :span="12">
            <el-form-item label="性别">
              <el-radio v-model="infoForm.sex" label="1">男</el-radio>
              <el-radio v-model="infoForm.sex" label="0">女</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="民族" style="text-align:left">
              <el-select style="width: 100%;" v-model="infoForm.national" placeholder="请选择民族">
                <el-option v-for="item in nationalList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el' style="text-align: left;">
          <el-col :span="14">
            <el-form-item label="头像">
              <img class="img" v-if="infoForm.icon" :src="ImgUrl" />
              <div style="position: relative;" v-if="!disabled">
                <el-upload class="upload-demo" accept='.jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP' :action='fileUrl' :headers='header' :show-file-list='false' :before-upload='handleContentChange' :on-success='handleAvatarSuccess'>
                  <el-button size="small" type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                </el-upload>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="8">
            <el-form-item label="居住地区" prop="homeAreaName">
              <el-input v-model="infoForm.homeAreaName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属街道" style="text-align:left" prop="homeStreetId">
              <el-select style="width: 100%;" v-model="infoForm.homeStreetId" :disabled="id ? true : false" placeholder="请选择所属街道">
                <el-option v-for="item in streetList" :key="item.id" :label="item.name" :value="item.id + ',' + item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属社区" style="text-align:left" prop="homeCommunityId">
              <el-select style="width: 100%;" v-model="infoForm.homeCommunityId" :disabled="id ? true : false" placeholder="请选择所属社区">
                <el-option v-for="item in communityList" :key="item.id" :label="item.name" :value="item.id + ',' + item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="24">
            <el-form-item label="居住地详细地址" prop="homeAddress">
              <el-input type="textarea" v-model="infoForm.homeAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="24">
            <el-form-item label="户籍地" style="text-align:left">
              <el-cascader style="width: 100%;" v-model="register" :options="options"></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="24">
            <el-form-item label="户籍地详细地址" prop="registerAddress">
              <el-input type="textarea" v-model="infoForm.registerAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-col>
  </el-main>
</template>

<script>
import areajson from '../../../assets/js/area.js'
import vmson from '../../../assets/js/emptyVue'
export default {
  data() {
    return {
      options: areajson,
      id: '',
      streetList: [],
      communityList: [],
      genreList: [],
      nationalList: [],
      ImgUrl: '',
      register: '',
      disabled: false,
      infoForm: {
        idCard: '235407195106112745',
        name: 'c测试',
        phone: '14740550189',
        type: '1',
        age: '81',
        birthday: '1990-02-02',
        genreId: [],
        linkName: '侧手',
        linkPhone: '14740550189',
        sex: '1',
        icon: '',
        national: '',
        homeAreaName: '测试地区',
        homeStreetId: '',
        homeCommunityId: '',
        homeAddress: '沈阳市沈阳市沈阳市沈阳市',
        registerAddress: '沈阳市'
      },
      rules: {
        idCard: [
          { required: true, validator: this.common.idcard, trigger: ['blur'] }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: ['blur'] }
        ],
        phone: [
          { required: true, validator: this.common.isvalidPhone, trigger: ['blur'] }
        ],
        type: [
          { required: true, message: '请选择老人分类', trigger: ['blur'] }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: ['blur'] }
        ],
        birthday: [
          { required: true, message: '请输入出生日期', trigger: ['blur'] }
        ],
        genreId: [
          { required: true, message: '请选择老人类型', trigger: ['blur'] }
        ],
        linkName: [
          { required: true, message: '请输入紧急联系人姓名', trigger: ['blur'] }
        ],
        linkPhone: [
          { required: true, validator: this.common.isvalidlinkPhone, trigger: ['blur'] }
        ],
        homeAreaName: [
          { required: true, message: '请输入居住地区', trigger: ['blur'] }
        ],
        homeStreetId: [
          { required: true, message: '请选择所属街道', trigger: ['blur'] }
        ],
        homeCommunityId: [
          { required: true, message: '请选择所属社区', trigger: ['blur'] }
        ],
        homeAddress: [
          { required: true, message: '请输入居住地详细地址', trigger: ['blur'] }
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
    this.getCommunityList()
    this.getGenreList()
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
    // 社区列表
    async getCommunityList() {
      const that = this
      try {
        let url = this.api.community.findAll + '?page=1&size=1000000'
        let obj = {}
        const response = await this.request.dataGet(that, url, obj)
        that.communityList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    // 老人类型&民族
    async getGenreList() {
      const that = this
      try {
        let url = this.api.dicManage.findAll + '?page=1&size=1000000'
        let obj = {
          dicId: 'lrlx'
        }
        const response = await this.request.dataGet(that, url, obj)
        that.genreList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
      try {
        let url = this.api.dicManage.findAll + '?page=1&size=1000000'
        let obj = {
          dicId: 'mz'
        }
        const response = await this.request.dataGet(that, url, obj)
        that.nationalList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
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
    // 计算年龄和出生日期
    idCardChange() {
      // 获取用户身份证号码
      var userCard = this.infoForm.idCard
      // 如果身份证号码为undefind则返回空
      if (!userCard) {
        return false
      }
      // 获取出生年月日
      var yearBirth = userCard.substring(6, 10)
      var monthBirth = userCard.substring(10, 12)
      var dayBirth = userCard.substring(12, 14)
      // 获取当前年月日并计算年龄
      var myDate = new Date()
      var monthNow = myDate.getMonth() + 1
      var dayNow = myDate.getDay()
      var age = myDate.getFullYear() - yearBirth
      if (monthNow < monthBirth || (monthNow === monthBirth && dayNow < dayBirth)) {
        age--
      }
      // 得到年龄
      this.infoForm.age = age
      // 得到出生日期
      this.infoForm.birthday = yearBirth + '-' + monthBirth + '-' + dayBirth
      vmson.$emit('blur', age)
    },
    // 老人类别
    typeChange(e) {
      this.$emit('typeChange', this.infoForm.type)
    },
    // 添加数据
    onSubmit() {
      let that = this
      // console.log(this.infoForm.genreId)
      that.$refs.infoForm.validate(async (index) => {
        if (index === false) {
          return false
        }
        let obj = this.infoForm
        // 老人类型
        let idArr = []
        let nameArr = []
        this.infoForm.genreId.forEach(item => {
          let arr = item.split(',')
          idArr.push(arr[0])
          nameArr.push(arr[1])
        })
        obj.genreId = JSON.stringify(idArr)
        obj.genreName = JSON.stringify(nameArr)
        // 居住街道
        let homeStreetArr = this.infoForm.homeStreetId.split(',')
        obj.homeStreetId = homeStreetArr[0]
        obj.homeStreetName = homeStreetArr[1]
        // 居住社区
        let homeCommunityArr = this.infoForm.homeCommunityId.split(',')
        obj.homeCommunityId = homeCommunityArr[0]
        obj.homeCommunityName = homeCommunityArr[1]

        obj.registerArea = this.register[0]
        obj.registerCity = this.register[1]
        obj.registerProvince = this.register[2]
        // console.log(obj)
        this.$emit('formMsgSave', obj)
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
.upload-demo {
  float: left;
}
.img {
  width: 100px;
  height: 100px;
}
</style>
