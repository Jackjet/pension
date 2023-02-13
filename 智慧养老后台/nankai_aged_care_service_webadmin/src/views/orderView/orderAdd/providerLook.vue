<template>
  <el-main class="providerLook">
    <el-form ref="infoForm" :model="infoForm" label-width="140px">
      <div class="hander">商家信息</div>
      <el-row class='el-row-el'>
        <el-col :span="12">
          <el-form-item label="服务商名称" prop="name">
            <el-input v-model="infoForm.name" :disabled="type==2"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务商电话" prop="phone">
            <el-input v-model="infoForm.phone" :disabled="type==2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="12">
          <el-form-item label="法人姓名" prop="legalPerson">
            <el-input v-model="infoForm.legalPerson" :disabled="type==2"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="营业时间" prop="openTime">
            <el-input v-model="infoForm.openTime" :disabled="type==2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el' style="text-align: left;">
        <el-col :span="12">
          <el-form-item label="服务商LOGO">
            <img class="img" v-if="infoForm.logo" :src="logoImg" @click="imgClick(logoImg)" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="营业执照" prop="businessLicense">
            <img class="img" v-if="infoForm.businessLicense" :src="businessLicenseImg" @click="imgClick(businessLicenseImg)" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el' style="text-align: left;">
        <el-col :span="12">
          <el-form-item label="法人身份证正面照" prop="idCard1">
            <img class="img" v-if="infoForm.idCard1" :src="idCard1Img1" @click="imgClick(idCard1Img1)" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="法人身份证背面照" prop="idCard2">
            <img class="img" v-if="infoForm.idCard2" :src="idCard2Img2" @click="imgClick(idCard2Img2)" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="24">
          <el-form-item label="服务商地址" prop="address">
            <el-input type="textarea" v-model="infoForm.address" :disabled="type==2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="24">
          <el-form-item label="服务商简介">
            <el-input type="textarea" v-model="infoForm.remark" :disabled="type==2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="hander">服务项信息</div>
      <el-row class='el-row-el' style="margin-bottom:10px;">
        <el-table :data="table.list.data" class='el_tab_alage' style="width: 100%">
          <el-table-column prop="serviceType1Name" label="服务栏目" width="">
          </el-table-column>
          <el-table-column prop="serviceType2Name" label="服务类别" width="">
          </el-table-column>
          <el-table-column prop="serviceProjectName" label="服务项">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间">
          </el-table-column>
        </el-table>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="24">
          <el-button @click="close">返回</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog :visible.sync="dialog.dialogVisible" width="650px" height="600px" title="详细图片" :before-close="handleClose">
      <img :style="{width:'600px',height:'450px'}" :src="dialog.dialogPicSrc" class="avatar" alt="详细图片" />
    </el-dialog>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      type: '',
      activeName: '',
      serviceTypeList: [],
      disabled: '',
      dialog: {
        dialogVisible: false,
        dialogPicSrc: ''
      },
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
              field: 'serviceProjectName'
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
      logoImg: '',
      businessLicenseImg: '',
      idCard1Img1: '',
      idCard2Img2: '',
      infoForm: {
        name: '',
        phone: '',
        legalPerson: '',
        openTime: '',
        logo: '',
        businessLicense: '',
        idCard1: '',
        idCard2: '',
        address: '',
        time: ''
      },
      pathType: '0'
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.type = this.$route.query.type
    this.getServiceProjectList()
  },

  methods: {
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    // 服务项信息
    async getServiceProjectList() {
      const that = this
      try {
        let url = this.api.serviceProject.getByProviderId
        let obj = {
          providerId: this.id
        }
        const response = await this.request.dataGet(that, url, obj)
        that.table.list.data = response.data
        if (that.id) {
          that.getList()
        }
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    async getList() {
      let that = this
      try {
        let findUrl = that.api.provider.findById
        let parameter = { id: this.id }
        const response = await that.request.dataGet(that, findUrl, parameter)
        if (response.code === 1) {
          that.logoImg = process.env.VUE_APP_FILE + response.data.logo
          that.businessLicenseImg = process.env.VUE_APP_FILE + response.data.businessLicense
          that.idCard1Img1 = process.env.VUE_APP_FILE + response.data.idCard1
          that.idCard2Img2 = process.env.VUE_APP_FILE + response.data.idCard2
          that.serviceTypeList.forEach(item => {
            item.serviceType2VmList.forEach(items => {
              items.serviceProjectVmList.forEach(itemVm => {
                response.data.providerProjects.forEach(itemData => {
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
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    imgClick(val) {
      this.dialog.dialogVisible = true
      this.dialog.dialogPicSrc = val
    },
    handleClose(val) {
      this.dialog.dialogVisible = false
      this.dialog.dialogPicSrc = ''
    },
    close(val) {
      history.go(-1)
    }
  }
}
</script>

<style scoped>
.providerLook .hander {
  padding: 5px 0;
  margin-bottom: 10px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px dashed #999;
  color: #009966;
}
.providerLook .img {
  width: 200px;
  height: 100px;
  cursor: pointer;
}
</style>
