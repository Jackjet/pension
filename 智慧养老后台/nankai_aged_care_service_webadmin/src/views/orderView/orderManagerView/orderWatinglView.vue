<template>
  <el-main>
    <el-col :span="24">
      <el-form :inline="true" class='el-InputForm'>
        <el-form-item>
          <el-input clearable size="medium" placeholder="请输入订单号" prefix-icon="el-icon-search" v-model="search.id">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input clearable size="medium" placeholder="请输入老人名称" prefix-icon="el-icon-search" v-model="search.manName">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input clearable size="medium" placeholder="请输入联系电话" prefix-icon="el-icon-search" v-model="search.manPhone">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input clearable size="medium" placeholder="请输入服务项" prefix-icon="el-icon-search" v-model="search.serviceProName">
          </el-input>
        </el-form-item>
        <el-form-item style="width: 400px;">
          <el-date-picker v-model="search.time" size="medium" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="请选择下单开始时间" end-placeholder="请选择下单结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="width: 400px;">
          <el-date-picker v-model="search.etime" size="medium" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="请选择期望到达时间" end-placeholder="请选择期望到达时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size='medium' icon="el-icon-search" @click="getList">搜索
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span='24'>
      <tableForm ref="trigger" :table-form='table' @phoneClick='phoneClick' @initial='initial' @pageChange='pageChange'>
      </tableForm>
    </el-col>

    <dialog-form :isShow="isShow" :width="'70%'" title="服务商列表" @closeDialog="closeDialog" @saveDialog="saveDialog">
      <div slot="form" style="text-align: left;">
        <el-col :span="24" style="padding-left: 10px">
          <el-input clearable size="medium" placeholder="请输入服务商名称" prefix-icon="el-icon-search" v-model="SearchItem.name" class='search'>
          </el-input>
          <el-input clearable size="medium" placeholder="请输入服务商联系电话" prefix-icon="el-icon-search" v-model="SearchItem.phone" class='search'>
          </el-input>
          <el-button type="primary" size='medium' icon="el-icon-search" @click="getProvider">搜索</el-button>
        </el-col>
        <tableForm ref="trigger1" :table-form='table1' @pageChange='pageChange1'>
        </tableForm>
      </div>
    </dialog-form>

    <dialog-form :isShow="isLook" :width="'70%'" title="服务商详情" @closeDialog="closeDialog1" @saveDialog="saveDialog">
      <div :class="['main-section']" slot="form">
        <el-row :gutter="20">
          <el-col :span="3" :offset="2" style='text-align: left;'>
            <span style='color: #17d926; font-size: 17px;'>订单信息</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20" :offset="2">
            <hr style="height:2px;border:none;border-top:2px dotted #17d926;" />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col style='text-align: left' :offset="3" :span="9">
            <span>服务商名称: </span>
            <span>{{info.name}}</span>
          </el-col>
          <el-col style='text-align: left' :span="9">
            <span>服务商联系电话：</span>
            <span>{{info.phone}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col style='text-align: left' :offset="3" :span="9">
            <span>法人姓名: </span>
            <span>{{info.legalPerson}}</span>
          </el-col>
          <el-col style='text-align: left' :span="9">
            <span>营业时间：</span>
            <span>{{info.openTime}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col style='text-align: left; vertical-align: top' :offset="3" :span="9">
            <div style='float: left'>服务商Logo: </div>
            <el-image style="width: 100px; height: 100px; margin-left: 10px" :src="info.logo" :preview-src-list="srcList">
              <div slot="error" class="image-slot">
                <img :src="info.logo" alt="">
              </div>
            </el-image>

          </el-col>
          <el-col style='text-align: left' :span="9">
            <div style='float: left'>营业执照：</div>
            <el-image style="width: 100px; height: 100px; margin-left: 10px" :src="imgUrl+info.businessLicense" :preview-src-list="srcList">
            </el-image>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col style='text-align: left' :offset="3" :span="9">
            <div style='float: left'>法人身份证正面照: </div>
            <el-image style="width: 100px; height: 100px; margin-left: 10px" :src="imgUrl+info.idCard1" :preview-src-list="srcList">
            </el-image>
          </el-col>
          <el-col style='text-align: left' :span="9">
            <div style='float: left'>法人身份证反面照：</div>
            <el-image style="width: 100px; height: 100px; margin-left: 10px" :src="imgUrl+info.idCard2" :preview-src-list="srcList">
            </el-image>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col style='text-align: left' :offset="3" :span="18">
            <span>服务商地址: </span>
            <span>{{info.address}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col style='text-align: left' :offset="3" :span="18">
            <span>服务商简介: </span>
            <span>{{info.remark}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3" :offset="2" style='text-align: left;'>
            <span style='color: #17d926; font-size: 17px;'>服务项信息</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20" :offset="2">
            <hr style="height:2px;border:none;border-top:2px dotted #17d926;" />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="18" :offset="3">
            <tableForm ref="trigger2" :table-form='table2'>
            </tableForm>
          </el-col>
        </el-row>
      </div>
    </dialog-form>

    <dialog-form :isShow="isWatch" :isBtn="true" :width="'50%'" title="您确定取消该条订单吗？" @closeDialog="closeDialog2" @saveDialog="saveDialog2('infoForm')">
      <el-form ref="infoForm" :model="infoForm" slot="form" :rules="rules" label-width="170px">
        <el-row class='el-row-el'>
          <el-col :span="20">
            <div v-if="isWatch">
              <el-form-item label="取消原因" prop="cancelReason" class="label_input">
                <el-input v-model="infoForm.cancelReason" type="textarea" size="medium" autocomplete="off" placeholder="请输入取消原因（最多100字）" maxlength="100"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </dialog-form>

  </el-main>
</template>

<script>
import tableForm from '../../../component/plugin/table'
import options from '../../../assets/js/options'
import dialogForm from 'plugin/dialogForm'

export default {
  components: {
    tableForm,
    dialogForm
  },
  computed: {
    orderStatusList() {
      return options.orderStatus
    },
    yesOrNoList() {
      return options.yesOrNo
    }
  },
  data() {
    return {
      imgUrl: process.env.VUE_APP_FILE,
      isShow: false,
      isLook: false,
      isWatch: false,
      id: '',
      serviceProId: '',
      info: {

      },
      infoForm: {
        cancelReason: ''
      },
      rules: {
        cancelReason: [
          { required: true, message: '请输入取消原因', trigger: 'blur' }
        ]
      },
      srcList: [],
      SearchItem: {
        name: '',
        phone: ''
      },
      search: {
        id: '',
        manName: '',
        serviceProName: '',
        manPhone: '',
        time: '',
        etime: ''
      },
      table: {
        list: {
          detail: false,
          header: [{
            label: '订单号',
            field: 'id'
          }, {
            label: '服务项',
            field: 'serviceProName'
          }, {
            label: '老人名称',
            field: 'manName'
          }, {
            label: '联系电话',
            field: 'manPhone',
            type: 'isClick'
          }, {
            label: '期望到达时间',
            field: 'expectTime'
          }, {
            label: '下单时间',
            field: 'createTime'
          }],
          data: [],
          operation: {
            label: '操作',
            event: [
              {
                label: '查看',
                method: (row) => {
                  this.goDetail(row)
                }
              },
              {
                label: '指派服务',
                method: (row) => {
                  this.goService(row)
                }
              },
              {
                label: '取消订单',
                method: (row) => {
                  this.goCancel(row)
                }
              }
            ]
          }
        },

        paging: {
          total: 0,
          currentPage: 1,
          limit: 20
        }
      },
      table1: {
        list: {
          detail: false,
          header: [{
            label: '服务商名称',
            field: 'name'
          }, {
            label: '服务商地址',
            field: 'address'
          }, {
            label: '服务商联系电话',
            field: 'phone'
          }, {
            label: '营业时间',
            field: 'openTime'
          }],
          data: [],
          operation: {
            label: '操作',
            event: [
              {
                label: '查看',
                method: (row) => {
                  this.goProDetail(row)
                }
              },
              {
                label: '指派',
                method: (row) => {
                  this.goProvider(row)
                }
              }
            ]
          }
        },
        paging: {
          total: 0,
          currentPage: 1,
          limit: 20
        }
      },
      table2: {
        list: {
          detail: false,
          header: [{
            label: '服务栏目',
            field: 'serviceType1Name'
          }, {
            label: '服务类别',
            field: 'serviceType2Name'
          }, {
            label: '服务项目',
            field: 'serviceProjectName'
          }, {
            label: '创建时间',
            field: 'createTime'
          }],
          data: []
        }
      },
      pathType: '0'
    }
  },

  mounted() {
    if (this.$route.path === '/orderWatinglView') {
      this.pathType = '1'
    }
    this.initial()
  },

  methods: {
    async phoneClick(row) {
      const that = this
      that.$confirm('是否外呼【' + row + ' 】?', '提示', {
        type: 'warning'
      }).then(async () => {
        const currentUser = this.common.session('currentUser')

        this.$jsonp('http://114.242.25.60:8088/hjy/callcenter/callout', {
          userAccount: currentUser.id,
          telNum: row
        }).then(row => {
          if (row.code === '200') {
            that.$message.success(row.msg)
            return false
          }
          that.$message.error(row.msg)
        }).catch(err => {
          console.log(err)
        })
      }).catch((response) => {
        that.$message.error(response.msg)
      })
    },
    async initial(target = {}) {
      this.getList()
    },
    async getProvider() {
      const that = this
      try {
        let url = this.api.provider.assignProvider
        let obj = {
          'providerName': that.SearchItem.name,
          'providerPhone': that.SearchItem.phone,
          'serviceProjectId': that.serviceProId,
          'page': that.table1.paging.currentPage,
          'size': that.table1.paging.limit
        }
        const response = await this.request.dataGet(that, url, obj)
        that.table1.list.data = response.data.content
        that.table1.paging.total = response.data.totalElements
        that.$refs.trigger1.loading = false
      } catch (even) {
        console.log(even)
        that.$message.error('数据获取失败')
      }
    },
    async getList() {
      const that = this
      try {
        let url = this.api.order.findAll
        if (that.search.time) {
          that.search.startTime = that.search.time[0]
          that.search.endTime = that.search.time[1]
        } else {
          that.search.startTime = ''
          that.search.endTime = ''
        }
        if (that.search.etime) {
          that.search.expectStartTime = that.search.etime[0]
          that.search.expectEndTime = that.search.etime[1]
        } else {
          that.search.expectStartTime = ''
          that.search.expectEndTime = ''
        }
        let obj = {
          'id': that.search.id,
          'manName': that.search.manName,
          'manPhone': that.search.manPhone,
          'serviceProName': that.search.serviceProName,
          'startTime': that.search.startTime,
          'endTime': that.search.endTime,
          'expectStartTime': that.search.expectStartTime,
          'expectEndTime': that.search.expectEndTime,
          'state': '0',
          'page': that.table.paging.currentPage,
          'size': that.table.paging.limit
        }
        that.$refs.trigger.loading = true
        const response = await this.request.dataGet(that, url, obj)
        response.data.content.forEach((item, index) => {
          if (item.expectStartTime && item.expectEndTime) {
            item.expectTime = item.expectStartTime + '-' + item.expectEndTime.split(' ')[1]
          }
          item.manName = decodeURI(item.manName)
        })

        that.table.list.data = response.data.content
        that.table.paging.total = response.data.totalElements
        that.$refs.trigger.loading = false
      } catch (even) {
        console.log(even)
        that.$message.error('数据获取失败')
      }
    },

    pageChange(val) {
      this.table.paging.limit = val.limit
      this.table.paging.currentPage = val.page
      this.getList()
    },
    pageChange1(val) {
      this.table1.paging.limit = val.limit
      this.table1.paging.currentPage = val.page
      this.getProvider()
    },
    goCancel(row) {
      this.infoForm.cancelReason = ''
      this.isWatch = true
      this.id = row.id
    },

    goDetail(row) {
      const that = this
      that.$router.push({
        name: this.pathType === '1' ? '/orderManagerDetail5' : 'orderManagerDetail5',
        params: {
          id: row.id
        }
      })
    },
    goService(row) {
      this.isShow = true
      this.SearchItem.name = ''
      this.SearchItem.phone = ''
      this.id = row.id
      this.serviceProId = row.serviceProId
      this.getProvider()
    },
    saveDialog() {

    },
    closeDialog() {
      this.isShow = false
    },
    async goProDetail(row) {
      const that = this
      that.isLook = true
      try {
        let url = this.api.provider.findById
        let obj = {
          id: row.id
        }
        const response = await that.request.dataGet(that, url, obj)
        that.srcList = []
        console.log(response.data.logo)
        if (response.data.logo) {
          response.data.logo = process.env.VUE_APP_FILE + response.data.logo
          that.srcList.push(response.data.logo)
        } else {
          response.data.logo = that.errorImg
          that.srcList.push(that.errorImg)
        }
        that.info = response.data
        that.srcList.push(process.env.VUE_APP_FILE + response.data.businessLicense)
        that.srcList.push(process.env.VUE_APP_FILE + response.data.idCard1)
        that.srcList.push(process.env.VUE_APP_FILE + response.data.idCard2)
        console.log(that.info.logo)
        that.table2.list.data = response.data.providerProjects
        that.$refs.trigger2.loading = false
      } catch (even) {
        console.log(even)
      }
    },
    closeDialog1() {
      this.isLook = false
    },
    goProvider(row) {
      const that = this
      that.$confirm('是否指派?', '提示', {
        type: 'warning'
      }).then(async () => {
        let url = this.api.order.updateProvider
        let obj = {
          id: that.id,
          providerAddress: row.address,
          providerId: row.id,
          providerName: row.name,
          providerPhone: row.phone
        }
        const response = await this.request.dataPost(that, url, obj)
        if (response.code === 1) {
          that.$message.success(response.msg)
          that.isShow = false
          that.getList()
          return false
        }
        that.$message.error(response.msg)
      }).catch(() => {
        return false
      })
    },
    closeDialog2() {
      this.isWatch = false
    },
    saveDialog2(form) {
      let that = this
      that.$refs[form].validate(async (valid) => {
        if (valid) {
          try {
            let url = this.api.order.cancel
            let obj = {
              'id': that.id,
              'cancelReason': that.infoForm.cancelReason
            }
            const response = await this.request.dataPost(that, url, obj)
            if (response.code !== 0) {
              that.$message.success(response.msg)
              that.getList()
              that.isWatch = false
            } else {
              that.$message.error(response.msg)
            }
          } catch (even) {
            console.log(even)
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.search {
  width: 202px;
  margin-bottom: 15px;
  margin-right: 10px;
}
.column-name {
  color: #17d926;
}

.main-section {
  margin-top: 20px;
  text-align: left;
}

hr {
  margin-top: 5px;
  margin-bottom: 20px;
}

.el-row {
  margin-top: 10px;
}
</style>
