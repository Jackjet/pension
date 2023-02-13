<template>
    <el-main>
        <el-col :span="24">
            <el-form :inline="true" class='el-InputForm'>

                <el-form-item>
                    <el-input clearable
                              size="medium"
                              placeholder="请输入订单号"
                              prefix-icon="el-icon-search"
                              v-model="search.id">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="search.state" placeholder="请选择订单状态"
                               size="medium" clearable>
                        <el-option
                                v-for="item in orderStatusList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="search.abnormal1" placeholder="上门异常"
                               size="medium" clearable>
                        <el-option
                                v-for="item in yesOrNoList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="search.abnormal2" placeholder="服务时间异常"
                               size="medium" clearable>
                        <el-option
                                v-for="item in yesOrNoList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input clearable
                              size="medium"
                              placeholder="请输入老人名称"
                              prefix-icon="el-icon-search"
                              v-model="search.manName">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input clearable
                              size="medium"
                              placeholder="请输入联系电话"
                              prefix-icon="el-icon-search"
                              v-model="search.manPhone">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input clearable
                              size="medium"
                              placeholder="请输入服务人员名称"
                              prefix-icon="el-icon-search"
                              v-model="search.employName">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input clearable
                              size="medium"
                              placeholder="请输入服务人员联系电话"
                              prefix-icon="el-icon-search"
                              v-model="search.employPhone">
                    </el-input>
                </el-form-item>
              <el-form-item>
                <el-select v-model="search.isAppraise" placeholder="是否评价"
                           size="medium" clearable>
                  <el-option
                    v-for="item in isAppraiseList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="items">
                <el-select
                  clearable
                  size="medium"
                  v-model="search.appraiseCode"
                  placeholder="请选择评价结果"
                >
                  <el-option label="满意" value="0"></el-option>
                  <el-option label="一般" value="1"></el-option>
                  <el-option label="不满意" value="2"></el-option>
                </el-select>
              </el-form-item>
                <el-form-item style="width: 400px;">
                    <el-date-picker
                            v-model="search.time"
                            size="medium"
                            type="datetimerange"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            range-separator="至"
                            start-placeholder="请选择下单开始时间"
                            end-placeholder="请选择下单结束时间">
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size='medium' icon="el-icon-search" @click="searchList">搜索
                    </el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span='24'>
            <tableForm
                    ref="trigger"
                    :table-form='table'
                    @initial='initial'
                    @pageChange='pageChange'>
            </tableForm>
        </el-col>
    </el-main>
</template>

<script>
import tableForm from '../../../component/plugin/table'
import options from '../../../assets/js/options'

export default {
  components: {
    tableForm
  },
  computed: {
    orderStatusList () {
      return options.orderStatus4
    },
    yesOrNoList () {
      return options.yesOrNo
    },
    isAppraiseList () {
      return options.isAppraise
    }
  },
  data () {
    return {
      search: {
        id: '',
        state: '',
        abnormal1: '',
        abnormal2: '',
        isAppraise: '',
        manName: '',
        manPhone: '',
        employName: '',
        employPhone: '',
        appraiseCode: '',
        time: ''
      },
      searchReal: {
      },
      table: {
        list: {
          styleMethod: {
            method: (row, column, rowIndex, columnIndex) => {
              if (row.column.label === '订单状态') {
                if (row.row.state_show === '待接单') {
                  return 'color:red'
                } else if (row.row.state_show === '已接单') {
                  return 'color:green'
                } else if (row.row.state_show === '服务中') {
                  return 'color:blue'
                } else if (row.row.state_show === '服务结束') {
                  return 'color:blue'
                } else if (row.row.state_show === '已取消') {
                  return 'color:blue'
                } else {
                  return ''
                }
              }
              return ''
            }
          },
          detail: false,
          header: [{
            label: '订单号',
            field: 'id'
          }, {
            label: '订单状态',
            field: 'state_show'
          }, {
            label: '服务项',
            field: 'serviceProName'
          }, {
            label: '服务金额（元）',
            field: 'serviceProMoney'
          }, {
            label: '老人名称',
            field: 'manName'
          }, {
            label: '联系电话',
            field: 'manPhone'
          }, {
            label: '服务人员名称',
            field: 'employName'
          }, {
            label: '服务人员联系电话',
            field: 'employPhone'
          }, {
            label: '上门异常',
            field: 'abnormal1_show'
          }, {
            label: '服务时间异常',
            field: 'abnormal2_show'
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
              }
            ]
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

  mounted () {
    this.initial()
  },

  methods: {
    async initial (target = {}) {
      this.getList()
    },
    searchList(){
      const that = this
      Object.entries(that.search).map((item, index) => {
        that.searchReal[item[0]] = that.search[item[0]]
      })
      this.table.paging.currentPage = 1
      that.getList()
    },
    async getList () {
      const that = this
      try {
        let url = this.api.order.findAll
        if (that.searchReal.time) {
          that.searchReal.startTime = that.searchReal.time[0]
          that.searchReal.endTime = that.searchReal.time[1]
        } else {
          that.searchReal.startTime = ''
          that.searchReal.endTime = ''
        }

        let obj = {
          'id': that.searchReal.id,
          'manName': that.searchReal.manName,
          'manPhone': that.searchReal.manPhone,
          'isAppraise': that.searchReal.isAppraise,
          'appraiseCode': that.searchReal.appraiseCode,
          'state': that.searchReal.state,
          'abnormal1': that.searchReal.abnormal1,
          'abnormal2': that.searchReal.abnormal2,
          'employName': that.searchReal.employName,
          'employPhone': that.searchReal.employPhone,
          'startTime': that.searchReal.startTime,
          'endTime': that.searchReal.endTime,
          'page': that.table.paging.currentPage,
          'size': that.table.paging.limit
        }
        that.$refs.trigger.loading = true
        const response = await this.request.dataGet(that, url, obj)
        that.table.list.data = response.data.content
        that.table.list.data.forEach(function (data) {
          data.state_show = that.getLabelByValue(data.state, options.orderStatus)
          data.abnormal1_show = that.getLabelByValue(data.abnormal1, options.yesOrNo)
          data.abnormal2_show = that.getLabelByValue(data.abnormal2, options.yesOrNo)
          if(data.serviceProMoney){
            data.serviceProMoney = (data.serviceProMoney/100).toFixed(2)
          }
        })
        that.table.paging.total = response.data.totalElements
        that.$refs.trigger.loading = false
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },

    pageChange (val) {
      this.table.paging.limit = val.limit
      this.table.paging.currentPage = val.page
    },

    goDetail (row) {
      const that = this
      if (row.state === '0') {
        that.$router.push({
          name: 'detailOrderManagement',
          params: {
            id: row.id,
            type: '0'
          }
        })
      } else if (row.state === '1') {
        that.$router.push({
          name: 'detailOrderManagement',
          params: {
            id: row.id,
            type: '1'
          }
        })
      } else if (row.state === '2') {
        that.$router.push({
          name: 'detailOrderManagement',
          params: {
            id: row.id,
            type: '2'
          }
        })
      } else if (row.state === '3') {
        that.$router.push({
          name: 'detailOrderManagement',
          params: {
            id: row.id,
            type: '3'
          }
        })
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
