<template>
  <el-main class="agedDataAdd">
    <el-col :span="24" class="ta-l">
      <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="180px">
        <div>
          <div class="hander">老人基本信息</div>
          <el-row class='el-row-el'>
            <el-col :span="12">
              <el-form-item label="身份证号" prop="idCard">
                <el-input v-model="infoForm.idCard" :disabled="id" @change="idCardChange"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="infoForm.name" :disabled="id"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='el-row-el'>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="phone">
                <el-input v-model="infoForm.phone" :disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="年龄" prop="age">
                <el-input v-model="infoForm.age" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='el-row-el' style="text-align: left;">
            <el-col :span="12">
              <el-form-item label="出生日期" prop="birthday">
                <el-input v-model="infoForm.birthday" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别" prop="sex">
                <el-radio v-model="infoForm.sex" label="1" :disabled="disabled">男</el-radio>
                <el-radio v-model="infoForm.sex" label="0" :disabled="disabled">女</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='el-row-el'>
            <el-col :span="8">
              <el-form-item label="户籍地、区" :required="true">
                <el-input value="天津市市辖区南开区" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属街道" style="text-align:left" prop="homeStreetId">
                <el-select style="width: 100%;" v-model="infoForm.homeStreetId" :disabled="disabled" placeholder="请选择所属街道" @change='street'>
                  <el-option v-for="item in streetList" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属社区" style="text-align:left" prop="homeCommunityId">
                <el-select style="width: 100%;" v-model="infoForm.homeCommunityId" :disabled="disabled" placeholder="请选择所属社区" @change="community">
                  <el-option v-for="item in communityList" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='el-row-el'>
            <el-col :span="24">
              <el-form-item label="户籍地详细地址" prop="registerAddress">
                <el-input type="textarea" :disabled="disabled" v-model="infoForm.registerAddress"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='el-row-el' v-if="disabled">
            <el-col :span="24">
              <el-form-item label="创建时间">
                <el-input type="textarea" disabled v-model="infoForm.createTime"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-row class='el-row-el ta-c'>
          <el-col :span="24">
            <el-button type="primary" @click="onPageReturn">返回</el-button>
            <el-button type="primary" @click="onSubmit" v-if="!disabled">保存</el-button>
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
      type: '',
      disabled: false,
      streetList: [],
      communityList: [],
      infoForm: {
        // 模块一
        idCard: '',
        name: '',
        phone: '',
        age: '',
        birthday: '',
        sex: '1',
        homeStreetId: '',
        homeCommunityId: '',
        registerAddress: ''
      },
      // 验证
      rules: {
        // 模块一
        idCard: [
          { required: true, validator: this.common.idcard, trigger: ['blur'] }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: ['blur'] }
        ],
        phone: [
          { required: true, validator: this.common.isvalidPhone, trigger: ['blur'] }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: ['blur'] }
        ],
        birthday: [
          { required: true, message: '请输入出生日期', trigger: ['blur'] }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: ['blur', 'change'] }
        ],
        homeStreetId: [
          { required: true, message: '请选择所属街道', trigger: ['blur', 'change'] }
        ],
        homeCommunityId: [
          { required: true, message: '请选择所属社区', trigger: ['blur', 'change'] }
        ],
        registerAddress: [
          { required: true, message: '请输入户籍地详细地址', trigger: ['blur'] }
        ]
      }
    }
  },

  mounted() {
    this.id = this.$route.query.id
    this.type = this.$route.query.type
    this.getStreetList()
    // console.log(this.$route.path)
    // 编辑&详情
    // 详情&操作日志进入&审核&审核详情
    if (this.type === '2') {
      this.disabled = true
    }
    if (this.id) {
      this.detail()
    }
  },

  methods: {
    // 详情
    async detail() {
      let that = this
      try {
        let findUrl = that.api.ivr.findById
        let parameter = { id: this.id }
        const response = await that.request.dataGet(that, findUrl, parameter)
        if (response.code === 1) {
          let Data = response.data
          this.getCommunityList(Data.homeStreetId)
          that.infoForm = Data
          this.idCardChange()
          return false
        }
        that.$message.error(response.msg)
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    /**
     * 整体获取视图数据
     */
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
    street(val) {
      const currentUser = this.common.session('currentUser')
      // 添加不做校验
      if (this.type === '0' || this.type === '6') {
        this.infoForm.homeCommunityId = ''
        this.getCommunityList(val)
        return
      }
      if (!currentUser.streetId && !currentUser.communityId) {
        this.infoForm.homeCommunityId = ''
        this.getCommunityList(val)
        return
      }
      if (this.infoForm.homeStreetId !== currentUser.streetId) {
        this.$confirm('当前老人所在地址已修改为非您所在辖区，请确认是否修改？', '提示', {
          type: 'warning'
        }).then(async () => {
          this.infoForm.homeCommunityId = ''
          this.getCommunityList(this.infoForm.homeStreetId)
        }).catch(() => {
          this.infoForm.homeStreetId = currentUser.streetId
        })
      } else {
        this.infoForm.homeCommunityId = ''
        this.getCommunityList(val)
      }
    },
    // 社区列表
    async getCommunityList(val) {
      const that = this
      try {
        let url = this.api.community.findAll + '?page=1&size=1000000'
        let obj = {
          streetId: val
        }
        const response = await this.request.dataGet(that, url, obj)
        that.communityList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    community() {
      const currentUser = this.common.session('currentUser')
      // 添加不做校验
      if (this.type === '0' || this.type === '6') {
        return
      }
      if (!currentUser.streetId && !currentUser.communityId) {
        return
      }
      // 判断街道是否修改  如修改不进行校验
      if (this.infoForm.homeStreetId !== currentUser.streetId) {
        return
      }
      // 街道管理员不校验
      if (!currentUser.communityId) {
        return
      }
      if (this.infoForm.homeCommunityId !== currentUser.communityId) {
        this.$confirm('当前老人所在地址已修改为非您所在辖区，请确认是否修改？', '提示', {
          type: 'warning'
        }).then(async () => {
        }).catch(() => {
          this.infoForm.homeCommunityId = currentUser.communityId
        })
      }
    },
    // 计算年龄和出生日期
    idCardChange() {
      // 获取用户身份证号码
      var userCard = this.infoForm.idCard
      // console.log(userCard)
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
      // console.log(age)
      this.infoForm.age = age
      // 得到出生日期
      this.infoForm.birthday = yearBirth + '-' + monthBirth + '-' + dayBirth
    },
    // 添加数据
    onSubmit() {
      let that = this
      that.$refs.infoForm.validate(async (index) => {
        if (index === false) {
          return false
        }
        try {
          let url = this.api.ivr.insert
          // 居住街道
          let homeStreetName = ''
          this.streetList.forEach(item => {
            if (this.infoForm.homeStreetId === item.id) {
              homeStreetName = item.name
            }
          })
          // 居住社区
          let homeCommunityName = ''
          this.communityList.forEach(item => {
            if (this.infoForm.homeCommunityId === item.id) {
              homeCommunityName = item.name
            }
          })
          let obj = {
            idCard: this.infoForm.idCard,
            name: this.infoForm.name,
            phone: this.infoForm.phone,
            age: this.infoForm.age,
            birthday: this.infoForm.birthday,
            sex: this.infoForm.sex,
            homeAreaId: '这不是张喆吗？',
            homeStreetId: this.infoForm.homeStreetId,
            homeStreetName: homeStreetName,
            homeCommunityId: this.infoForm.homeCommunityId,
            homeCommunityName: homeCommunityName,
            registerProvince: '天津市',
            registerArea: '市辖区',
            registerCity: '南开区',
            registerAddress: this.infoForm.registerAddress
          }
          let response = null
          if (that.id) {
            url = that.api.ivr.update
            obj.id = that.id
            response = await this.request.dataPut(that, url, obj)
          } else {
            response = await this.request.dataPost(that, url, obj)
          }
          if (response.code === 1) {
            this.$message.success(response.msg)
            window.parent.postMessage(this.infoForm.idCard, '*')
            history.go(-1)
            return false
          }
          this.$message.error(response.msg)
        } catch (even) {
          this.$message.error('数据获取失败')
        }
      })
    },
    onPageReturn() {
      history.go(-1)
    }
  }
}
</script>

<style>
.agedDataAdd .el-pagination {
  margin: 0px;
  padding: 0px;
}

.agedDataAdd .warp-main {
  margin-top: 90px;
}

.agedDataAdd .hander {
  padding: 5px 0;
  margin-bottom: 10px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px dashed #999;
  color: #009966;
}
.agedDataAdd .min-title {
  padding: 5px 0;
  margin-bottom: 10px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px solid #999;
}
.agedDataAdd .upload-demo {
  float: left;
}
.agedDataAdd .flex {
  display: flex;
}
.agedDataAdd .agedDataImg {
  width: 100px;
  height: 100px;
}
.agedDataAdd .ps {
  padding-left: 10px;
  color: #409eff;
}
</style>
