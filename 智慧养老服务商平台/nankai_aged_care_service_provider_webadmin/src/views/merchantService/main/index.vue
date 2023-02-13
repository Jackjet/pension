<template>
  <div>
    <el-main>
      <el-col :span="24">
        <el-form :inline="true" class='el-InputForm'>
          <el-form-item>
            <el-select v-model="serviceType1" placeholder="请选择服务栏目" size="medium" clearable>
              <el-option v-for="item in serviceType1Section" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="serviceType2" placeholder="请选择服务类别" size="medium" clearable>
              <el-option v-for="item in serviceType2Section" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-input clearable size="medium" placeholder="请输入服务项" prefix-icon="el-icon-search" v-model="serviceProjectName">
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size='medium' icon="el-icon-search" @click="searchList">搜索
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span='24'>
        <tableForm ref="trigger" :table-form='table' @initial='initial' @pageChange='pageChange'>
        </tableForm>
      </el-col>
    </el-main>
    <div v-if="dialog.setMoney" class="dialog">
      <el-dialog :visible.sync="dialog.setMoney" custom-class="customWidth">
        <set-money-dialog @dialogCancel="closeSetMoney" :infoForm="currentInfo" @success="getList"></set-money-dialog>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import tableForm from '../../../component/plugin/table'
import setMoneyDialog from './dialog/setMoneyDialog'
import options from '../../../assets/js/options'
export default {
  components: {
    tableForm,
    setMoneyDialog
  },
  computed: {
    table() {
      return {
        list: {
          detail: false,
          header: [{
            label: '服务栏目',
            field: 'serviceType1Name'
          }, {
            label: '服务类别',
            field: 'serviceType2Name'
          }, {
            label: '服务项',
            field: 'serviceProjectName'
          }, {
            label: '服务性质',
            field: 'type_show'
          }, {
            label: '服务金额（元）',
            field: 'money'
          }, {
            label: '创建时间',
            field: 'createTime'
          }],
          data: [],
          operation: {
            label: '操作',
            event: [{
              label: '设置服务金额',
              method: (row) => {
                this.openWindow(row)
              }
            }]
          }
        },
        paging: {
          total: 0,
          currentPage: 1,
          limit: 20
        }
      }
    }
  },
  data() {
    return {
      serviceType1Section: [],
      serviceType2Section: [],
      serviceProjectName: '',
      serviceType1: '',
      serviceType2: '',
      searchReal: {},
      dialog: {
        setMoney: false
      },
      currentInfo: {}
    }
  },
  mounted() {
    this.getServiceType1()
  },
  watch: {
    serviceType1(val, oldVal) {
      this.getServiceType2(val)
    }
  },
  methods: {
    initial() {
      this.getList()
    },
    async getServiceType1() {
      const that = this
      that.$refs.trigger.loading = true
      try {
        let url = this.api.merchantService.findServiceType1
        let obj = {
          size: 10000,
          page: 1
        }
        const response = await this.request.dataGet(that, url, obj)
        response.data.content.forEach(function (data) {
          let single = {
            label: data.name,
            value: data.id
          }
          that.serviceType1Section.push(single)
        })
        that.$refs.trigger.loading = false
        this.initial()
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    async getServiceType2(id) {
      const that = this
      that.serviceType2 = ''
      if (id.length > 0) {
        try {
          let url = this.api.merchantService.findServiceType2
          let obj = {
            size: 10000,
            page: 1,
            serviceType1Id: id
          }
          const response = await this.request.dataGet(that, url, obj)
          that.serviceType2Section = []
          response.data.content.forEach(function (data) {
            let single = {
              label: data.name,
              value: data.id
            }
            that.serviceType2Section.push(single)
          })
        } catch (even) {
          that.$message.error('数据获取失败')
        }
      } else {
        that.serviceType2Section = []
        that.serviceType2 = ''
      }
    },
    searchList() {
      const that = this
      that.searchReal.serviceType1 = that.serviceType1,
        that.searchReal.serviceType2 = that.serviceType2,
        that.searchReal.serviceProjectName = that.serviceProjectName
      this.table.paging.currentPage = 1
      that.getList()
    },
    async getList() {
      const that = this
      try {
        let url = this.api.merchantService.findAll
        let obj = {
          'serviceType1Id': that.searchReal.serviceType1,
          'serviceType2Id': that.searchReal.serviceType2,
          'serviceProjectName': that.searchReal.serviceProjectName,
          'page': that.table.paging.currentPage,
          'size': that.table.paging.limit
        }
        that.$refs.trigger.loading = true
        const response = await this.request.dataGet(that, url, obj)
        if (response.code === 0) {
          that.$message.error(response.error)
        } else {
          that.table.list.data = response.data.content
          that.table.list.data.forEach(function (data) {
            data.type_show = that.getLabelByValue(data.type, options.serviceProType)
            data.marketMoney = (data.marketMoney / 100).toFixed(2)
            if (!data.money) {
              data.money = data.marketMoney
            } else {
              data.money = (data.money / 100).toFixed(2)
            }
          })
          that.table.paging.total = response.data.totalElements
        }
        that.$refs.trigger.loading = false
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    pageChange(val) {
      this.table.paging.limit = val.limit
      this.table.paging.currentPage = val.page
    },
    closeSetMoney() {
      this.dialog.setMoney = false
    },
    openWindow(row) {
      this.currentInfo = {
        'id': row.id
      }
      this.dialog.setMoney = true
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
.el-row {
  text-align: left;
  padding: 10px 0 10px 0;
}

.el-button {
}
</style>
