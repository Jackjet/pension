<template>
  <el-main class="providerAdd">
    <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="140px">
      <div class="hander">商家信息</div>
      <el-row class="el-row-el">
        <el-col :span="12">
          <el-form-item label="服务商名称" prop="name">
            <el-input v-model="infoForm.name" :disabled="type == 2"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务商电话" prop="phone">
            <el-input v-model="infoForm.phone" :disabled="type == 2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="el-row-el">
        <el-col :span="12">
          <el-form-item label="法人姓名" prop="legalPerson">
            <el-input v-model="infoForm.legalPerson" :disabled="type == 2"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="营业时间" prop="openTime">
            <el-input v-model="infoForm.openTime" :disabled="type == 2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="el-row-el" style="text-align: left">
        <el-col :span="12">
          <el-form-item label="服务商LOGO">
            <el-image v-if="infoForm.logo || isShow" style="width: 200px; height: 100px" :src="logoImg" :preview-src-list="[logoImg]">
            </el-image>
            <div style="position: relative" v-if="type != 2">
              <el-upload class="upload-demo" accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP" :action="fileUrl" :headers="header" :show-file-list="false" :before-upload="handleContentChange" :on-success="handleAvatarSuccess">
                <el-button size="small" type="primary" @click="getUploudIdx(0)">上传<i class="el-icon-upload el-icon--right"></i></el-button>
              </el-upload>
              <el-button type="primary" size="small" style="margin-left: 10px" v-if="infoForm.logo" @click="deleteImg(0)">删除</el-button>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="营业执照" prop="businessLicense">
            <el-input style="display: none" v-model="infoForm.businessLicense"></el-input>
            <el-image v-if="infoForm.businessLicense" style="width: 200px; height: 100px" :src="businessLicenseImg" :preview-src-list="[businessLicenseImg]">
            </el-image>
            <div style="position: relative" v-if="type != 2">
              <el-upload class="upload-demo" accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP" :action="fileUrl" :headers="header" :show-file-list="false" :before-upload="handleContentChange" :on-success="handleAvatarSuccess">
                <el-button size="small" type="primary" @click="getUploudIdx(1)">上传<i class="el-icon-upload el-icon--right"></i></el-button>
              </el-upload>
              <el-button type="primary" size="small" style="margin-left: 10px" v-if="infoForm.businessLicense" @click="deleteImg(1)">删除</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="el-row-el" style="text-align: left">
        <el-col :span="12">
          <el-form-item label="法人身份证正面照" prop="idCard1">
            <el-input style="display: none" v-model="infoForm.idCard1"></el-input>
            <el-image v-if="infoForm.idCard1" style="width: 200px; height: 100px" :src="idCard1Img1" :preview-src-list="[idCard1Img1]">
            </el-image>
            <div style="position: relative" v-if="type != 2">
              <el-upload class="upload-demo" accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP" :action="fileUrl" :headers="header" :show-file-list="false" :before-upload="handleContentChange" :on-success="handleAvatarSuccess">
                <el-button size="small" type="primary" @click="getUploudIdx(2)">上传<i class="el-icon-upload el-icon--right"></i></el-button>
              </el-upload>
              <el-button type="primary" size="small" style="margin-left: 10px" v-if="infoForm.idCard1" @click="deleteImg(2)">删除</el-button>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="法人身份证背面照" prop="idCard2">
            <el-input style="display: none" v-model="infoForm.idCard2"></el-input>
            <el-image v-if="infoForm.idCard2" style="width: 200px; height: 100px" :src="idCard2Img2" :preview-src-list="[idCard2Img2]">
            </el-image>
            <div style="position: relative" v-if="type != 2">
              <el-upload class="upload-demo" accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP" :action="fileUrl" :headers="header" :show-file-list="false" :before-upload="handleContentChange" :on-success="handleAvatarSuccess">
                <el-button size="small" type="primary" @click="getUploudIdx(3)">上传<i class="el-icon-upload el-icon--right"></i></el-button>
              </el-upload>
              <el-button type="primary" size="small" style="margin-left: 10px" v-if="infoForm.idCard2" @click="deleteImg(3)">删除</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="el-row-el">
        <el-col :span="24">
          <el-form-item label="服务商地址" prop="address">
            <el-input type="textarea" v-model="infoForm.address" :disabled="type == 2" @change="addressChange"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="el-row-el">
        <el-col :span="24">
          <el-form-item label="服务商简介">
            <el-input type="textarea" v-model="infoForm.remark" :disabled="type == 2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="hander titleRequire">服务项信息</div>
      <el-row class="el-row-el" style="margin-bottom: 10px">
        <el-col :span="14" v-if="type != 2">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane style="text-align: left" v-for="(item, index) in serviceTypeList" :key="index" :label="item.serviceType1Name" :name="item.serviceType1Name">
              <div v-for="(items, index) in item.serviceType2VmList" :key="index">
                <template v-if="items.serviceProjectVmList.length > 0">
                  <div style="
                      border-bottom: 1px solid #000;
                      padding: 5px 0;
                      margin-bottom: 5px;
                    ">
                    {{ items.serviceType2Name }}
                  </div>
                  <div v-for="(itemVm, index) in items.serviceProjectVmList" :key="index" style="
                      margin-bottom: 10px;
                      display: flex;
                      justify-content: space-between;
                      font-size: 14px;
                      line-height: 25px;
                    ">
                    <el-checkbox style="width: 30%" v-model="itemVm.checked" :disabled="type == 2">
                      {{ itemVm.serviceProjectName }}
                    </el-checkbox>
                    <div style="margin-left: 10px; text-align: left; flex: 1">
                      <template v-if="itemVm.type === '0'">
                        计时服务
                        <span v-if="itemVm.time" style="margin-left: 10px">
                          服务时长：{{ itemVm.time }}小时
                        </span>
                      </template>
                      <template v-else-if="itemVm.type === '1'">
                        计次服务
                        <span v-if="itemVm.time" style="margin-left: 10px">
                          服务次数：{{ itemVm.time }}
                        </span>
                      </template>
                      <template v-else>
                        单价服务
                        <span v-if="itemVm.unit" style="margin-left: 10px">
                          计价单位：{{ itemVm.unit }}
                        </span>
                      </template>
                    </div>
                    <div style="width: 30%">
                      <!-- 市场金额：{{ itemVm.money / 100 }}元 -->
                    </div>
                  </div>
                </template>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="24" v-else>
          <el-table :data="table.list.data" class="el_tab_alage" style="width: 100%">
            <el-table-column prop="serviceType1Name" label="服务栏目" width="">
            </el-table-column>
            <el-table-column prop="serviceType2Name" label="服务类别" width="">
            </el-table-column>
            <el-table-column prop="name" label="服务项">
            </el-table-column>
            <!-- <el-table-column prop="money" label="市场金额（元）">
            </el-table-column> -->
            <el-table-column prop="createTime" label="创建时间">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row class="el-row-el">
        <el-col :span="24">
          <el-form-item class="open_btn">
            <el-button type="primary" v-if="type != 2" @click="submitForm('infoForm')">保存</el-button>
            <el-button @click="close">返回</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-main>
</template>

<script>
let isvalidPhone = (rule, value, callback) => {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  if (!value) {
    callback(new Error('请输入服务商电话'))
  } else if (!reg.test(value)) {
    callback(new Error('服务商电话格式不正确'))
  } else {
    callback()
  }
}
export default {
  data() {
    return {
      id: '',
      type: '',
      activeName: '',
      serviceTypeList: [],
      disabled: '',
      uploudIdx: '',
      logoImg: '',
      businessLicenseImg: '',
      idCard1Img1: '',
      idCard2Img2: '',
      isShow: false,
      infoForm: {
        name: '',
        phone: '',
        legalPerson: '',
        openTime: '',
        logo: '',
        longitude: '',
        latitude: '',
        businessLicense: '',
        idCard1: '',
        idCard2: '',
        address: '',
        time: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入服务商名称', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入服务商电话', trigger: 'blur' }
        ],
        legalPerson: [
          { required: true, message: '请输入法人姓名', trigger: 'blur' }
        ],
        openTime: [
          { required: true, message: '请输入营业时间', trigger: 'blur' }
        ],
        businessLicense: [
          {
            required: true,
            message: '请上传营业执照',
            trigger: ['blur', 'change']
          }
        ],
        idCard1: [
          {
            required: true,
            message: '请上传法人身份证正面照',
            trigger: ['blur', 'change']
          }
        ],
        idCard2: [
          {
            required: true,
            message: '请上传法人身份证背面照',
            trigger: ['blur', 'change']
          }
        ],
        address: [
          // { required: true, pattern: /^([^省]+省|.+自治区|[^市]+市)([^自治州]+自治州|[^市]+市|[^盟]+盟|[^地区]+地区|.+区划)([^市]+市|[^县]+县|[^旗]+旗|.+区)$/, message: '保留两位小数', trigger: 'blur' },
          { required: true, message: '请输入服务商地址', trigger: 'blur' }
        ]
      },
      // 查看获取服务项
      table: {
        list: {
          header: [
            {
              label: '服务栏目',
              field: 'serviceType1Name'
            },
            {
              label: '服务类别',
              field: 'serviceType2Name'
            },
            {
              label: '服务项',
              field: 'name'
            },
            {
              label: '市场金额（元）',
              field: 'money'
            },
            {
              label: '创建时间',
              field: 'createTime'
            }
          ],

          data: []
        },

        paging: {
          total: 0,
          currentPage: 1,
          limit: 20
        }
      },
      fileUrl: process.env.VUE_APP_URL + this.api.resourceLib.upload,
      header: {
        Authorization: 'token ' + this.common.session('currentUser').token
      }
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.type = this.$route.query.type
    if (this.type === '2') {
      this.getByProviderList()
    } else {
      this.getServiceProjectList()
    }
  },

  methods: {
    addressChange() {
      // this.$jsonp('http://api.map.baidu.com/geocoding/v3/', {
      //   address: this.infoForm.address,
      //   output: 'json',
      //   ak: 'aa5LzHD00MUmGqMAs1CeeKlRvRW78m7h'
      // })
      //   .then((row) => {
      //     if (row.status === 0) {
      //       let location = row.result.location
      //       this.infoForm.longitude = location.lng
      //       this.infoForm.latitude = location.lat
      //     } else {

      //     }
      //   })
      //   .catch((err) => {
      //     // console.log(err)
      //   })
      // this.infoForm.longitude = ''
      // this.infoForm.latitude = ''
    },
    handleClick(tab, event) { },
    getUploudIdx(idx) {
      this.uploudIdx = idx
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
        switch (this.uploudIdx) {
          case 0:
            that.logoImg = response.data.fileLongPath
            that.infoForm.logo = response.data.filePath
            break
          case 1:
            that.businessLicenseImg = response.data.fileLongPath
            that.infoForm.businessLicense = response.data.filePath
            break
          case 2:
            that.idCard1Img1 = response.data.fileLongPath
            that.infoForm.idCard1 = response.data.filePath
            break
          case 3:
            that.idCard2Img2 = response.data.fileLongPath
            that.infoForm.idCard2 = response.data.filePath
            break
        }
        that.$message.success(response.msg)
        return false
      }
    },
    deleteImg(idx) {
      let that = this
      switch (idx) {
        case 0:
          that.logoImg = this.errorImg
          that.infoForm.logo = ''
          break
        case 1:
          that.businessLicenseImg = ''
          that.infoForm.businessLicense = ''
          break
        case 2:
          that.idCard1Img1 = ''
          that.infoForm.idCard1 = ''
          break
        case 3:
          that.idCard2Img2 = ''
          that.infoForm.idCard2 = ''
          break
      }
    },
    // 服务项信息
    async getServiceProjectList() {
      const that = this
      try {
        let url = this.api.serviceProject.getServiceProjectVm
        let obj = {}
        const response = await this.request.dataGet(that, url, obj)
        response.data.serviceType1List.forEach((item) => {
          item.serviceType2VmList.forEach((items) => {
            items.serviceProjectVmList.forEach((itemVm) => {
              itemVm.checked = false
            })
          })
        })
        that.activeName = response.data.serviceType1List[0].serviceType1Name
        that.serviceTypeList = response.data.serviceType1List
        if (that.id) {
          that.getList()
        }
      } catch (even) {
        // console.log(even)
        that.$message.error('数据获取失败')
      }
    },
    // 查看获取服务项
    async getByProviderList() {
      const that = this
      try {
        let url = this.api.serviceProject.getByProviderId
        let obj = {
          providerId: this.id
        }
        const response = await this.request.dataGet(that, url, obj)
        response.data.forEach((item) => {
          item.money = item.money / 100
        })
        that.table.list.data = response.data
        if (that.id) {
          that.getList()
        }
      } catch (even) {
        // console.log(even)
        that.$message.error('数据获取失败')
      }
    },
    async getList() {
      let that = this
      // try {
      let findUrl = that.api.provider.findById
      let parameter = { id: this.id }
      const response = await that.request.dataGet(that, findUrl, parameter)
      if (response.code === 1) {
        let logo = response.data.logo
        that.logoImg = logo ? process.env.VUE_APP_FILE + logo : this.errorImg
        if (!logo) {
          that.isShow = true
        }
        that.businessLicenseImg =
          process.env.VUE_APP_FILE + response.data.businessLicense
        that.idCard1Img1 = process.env.VUE_APP_FILE + response.data.idCard1
        that.idCard2Img2 = process.env.VUE_APP_FILE + response.data.idCard2
        that.serviceTypeList.forEach((item) => {
          item.serviceType2VmList.forEach((items) => {
            items.serviceProjectVmList.forEach((itemVm) => {
              response.data.providerProjects.forEach((itemData) => {
                if (itemData.serviceProjectId === itemVm.serviceProjectId) {
                  itemVm.checked = true
                }
              })
            })
          })
        })
        that.infoForm = response.data
        return false
      }
      that.$message.error(response.msg)
      // } catch (even) {
      //   that.$message.error('数据获取失败')
      // }
    },
    submitForm(form) {
      let that = this
      // if (that.infoForm.longitude === '' || that.infoForm.latitude === '') {
      //   that.$message.error('服务地址填写有误，请重新核对！')
      //   return false
      // }
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          try {
            let url = that.api.provider.insert
            let response = null
            let arr = []
            that.serviceTypeList.forEach((item) => {
              item.serviceType2VmList.forEach((items) => {
                items.serviceProjectVmList.forEach((itemVm) => {
                  if (itemVm.checked) {
                    arr.push(itemVm.serviceProjectId)
                  }
                })
              })
            })
            if (arr.length === 0) {
              that.$message.error('服务项信息不可为空')
              return false
            }
            // this.infoForm.longitude = 116.31020252963602;
            // this.infoForm.latitude = 40.05744555478757;
            that.infoForm.serviceProjectList = arr
            if (that.id) {
              url = that.api.provider.update
              that.infoForm.id = that.id
              response = await this.request.dataPut(that, url, that.infoForm)
            } else {
              response = await this.request.dataPost(that, url, that.infoForm)
            }
            if (response.code === 1) {
              that.$message.success(response.msg)
              that.$router.push({
                path: 'providerView'
              })
              return false
            }
            that.$message.error(response.msg)
          } catch (even) {
            that.$message.error('数据获取失败')
          }
        }
      })
    },
    close(val) {
      this.$router.push({
        path: 'providerView'
      })
    }
  }
}
</script>

<style>
.titleRequire:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
.providerAdd .hander {
  padding: 5px 0;
  margin-bottom: 10px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px dashed #999;
  color: #009966;
}
.providerAdd .upload-demo {
  float: left;
}
.providerAdd .img {
  width: 200px;
  height: 100px;
}
</style>
