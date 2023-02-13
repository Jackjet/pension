<template>
  <el-main>
    <el-col :span="24">
      <el-form :inline="true" class='el-InputForm'>

        <el-form-item>
          <el-input clearable size="medium" placeholder="请输入订单号" prefix-icon="el-icon-search" v-model="search.id">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="search.abnormal1" placeholder="上门异常" size="medium" clearable>
            <el-option v-for="item in yesOrNoList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="search.abnormal2" placeholder="服务时间异常" size="medium" clearable>
            <el-option v-for="item in yesOrNoList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
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
          <el-input clearable size="medium" placeholder="请输入服务人员名称" prefix-icon="el-icon-search" v-model="search.employName">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input clearable size="medium" placeholder="请输入服务人员联系电话" prefix-icon="el-icon-search" v-model="search.employPhone">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input clearable size="medium" placeholder="请输入商家名称" prefix-icon="el-icon-search" v-model="search.providerName">
          </el-input>
        </el-form-item>
        <el-form-item style="width: 400px;">
          <el-date-picker v-model="search.time" size="medium" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="请选择下单开始时间" end-placeholder="请选择下单结束时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size='medium' icon="el-icon-search" @click="searchList">搜索
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span='24'>
      <tableForm ref="trigger" :table-form='table' @initial='initial' @phoneClick='phoneClick' @pageChange='pageChange'>
      </tableForm>
    </el-col>
    <dialog-form :isShow="isShow" :isBtn="true" :width="'40%'" title="立即评价" @closeDialog="closeDialog" @saveDialog="saveDialog">
      <el-form slot="form" ref="infoForm" :model="infoForm" :rules="rules" label-width="78px">
        <el-col :span="24">
          <el-form-item label="评价" prop="appraiseCode" style="text-align: left;">
            <el-radio-group v-model="infoForm.appraiseCode">
              <el-radio label="0">满意</el-radio>
              <el-radio label="1">一般</el-radio>
              <el-radio label="2">不满意</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="评价内容" prop="appraiseMessage">
            <el-input type="textarea" v-model="infoForm.appraiseMessage" placeholder="请输入评价内容"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </dialog-form>
  </el-main>
</template>

<script>
import tableForm from '../../../component/plugin/tableNew'
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
    },
    isAppraiseList() {
      return options.isAppraise
    }
  },

  data() {
    return {
      isShow: false,
      search: {
        id: '',
        abnormal1: '',
        abnormal2: '',
        manName: '',
        manPhone: '',
        employName: '',
        employPhone: '',
        providerName: '',
        time: ''
      },
      searchReal: {
      },
      infoForm: {
        appraiseCode: '',
        appManId: '',
        appraiseMessage: '',
        id: ''
      },
      rules: {
        appraiseCode: [
          { required: true, message: '请选择评价等级', trigger: 'change' }
        ],
        appraiseMessage: [
          { required: true, message: '请输入评价内容', trigger: 'blur' }
        ]
      },
      table: {
        item: [],
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
            field: 'manPhone'
          }, {
            label: '商家名称',
            field: 'providerName'
          }, {
            label: '服务人员名称',
            field: 'employName'
          }, {
            label: '服务人员联系电话',
            field: 'employPhone',
            type: 'isClick'
          }, {
            label: '上门异常',
            field: 'abnormal1_show'
          }, {
            label: '服务时间异常',
            field: 'abnormal2_show'
          }, {
            label: '是否已评价',
            field: 'isAppraise_show'
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
                label: '评价',
                method: (row) => {
                  this.evaluate(row)
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
      pathType: '0'
    }
  },

  mounted() {
    if (this.$route.path === '/orderEvaluationalView') {
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
          // console.log(err)
        })
      }).catch((response) => {
        that.$message.error(response.msg)
      })
    },
    async initial(target = {}) {
      this.getList(target)
    },
    searchList() {
      const that = this
      Object.entries(that.search).map((item, index) => {
        that.searchReal[item[0]] = that.search[item[0]]
      })
      this.table.paging.currentPage = 1
      that.getList()
    },
    async getList(target) {
      const that = this
      try {
        let url = this.api.order.findAll
        let obj = {
          'id': that.searchReal.id,
          'manName': that.searchReal.manName,
          'manPhone': that.searchReal.manPhone,
          'isAppraise': '0',
          'state': '3',
          'abnormal1': that.searchReal.abnormal1,
          'abnormal2': that.searchReal.abnormal2,
          'employName': that.searchReal.employName,
          'employPhone': that.searchReal.employPhone,
          'startTime': that.searchReal.startTime,
          'endTime': that.searchReal.endTime,
          'providerName': that.searchReal.providerName,
          'page': that.table.paging.currentPage,
          'size': that.table.paging.limit
        }
        that.$refs.trigger.loading = true
        const response = await this.request.dataGet(that, url, obj)
        that.table.list.data = response.data.content
        that.table.list.data.forEach(function (data) {
          data.manName = decodeURI(data.manName)
          data.abnormal1_show = that.getLabelByValue(data.abnormal1, options.yesOrNo)
          data.abnormal2_show = that.getLabelByValue(data.abnormal2, options.yesOrNo)
          data.isAppraise_show = that.getLabelByValue(data.isAppraise, options.isAppraise)
        })
        that.table.paging.total = response.data.totalElements
        that.$refs.trigger.loading = false
      } catch (even) {
        // console.log(even)
        that.$message.error('数据获取失败')
      }
    },

    pageChange(val) {
      this.table.paging.limit = val.limit
      this.table.paging.currentPage = val.page
    },

    goDetail(row) {
      const that = this
      that.$router.push({
        name: this.pathType === '1' ? '/orderManagerDetail' : 'orderManagerDetail',
        params: {
          id: row.id,
          type: '23'
        },
        query: {
          workOrderId: row.workOrderNo
        }
      })
    },
    getLabelByValue(value, array) {
      var result = ''
      array.forEach(function (data) {
        if (data.value === value) {
          result = data.label
        }
      })
      return result
    },
    evaluate(row) {
      this.isShow = true
      this.infoForm.appManId = row.appManId
      this.infoForm.id = row.id
    },
    saveDialog() {
      const that = this
      that.$refs['infoForm'].validate(async (valid) => {
        if (valid) {
          try {
            let url = that.api.order.evaluate
            let obj = that.infoForm
            let response = null
            response = await this.request.dataPost(that, url, obj)
            if (response.code === 1) {
              that.isShow = false
              that.$refs['infoForm'].resetFields()
              that.infoForm.appraiseMessage = ''
              that.$message.success(response.msg)
              that.getList({})
            } else {
              that.$message.error(response.msg)
            }
          } catch (even) {
            // console.log(even)
            that.$message.error('数据获取失败')
          }
        }
      })
    },
    closeDialog() {
      this.isShow = false
      this.$refs['infoForm'].resetFields()
      this.infoForm.appraiseMessage = ''
    }
  }
}
</script>

<style scoped>
</style>
