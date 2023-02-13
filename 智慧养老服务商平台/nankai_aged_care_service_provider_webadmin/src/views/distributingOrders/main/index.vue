<template>
    <div>
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
                                  placeholder="请输入服务项"
                                  prefix-icon="el-icon-search"
                                  v-model="search.serviceProName">
                        </el-input>
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
                    <el-form-item style="width: 400px;">
                        <el-date-picker
                                v-model="search.time2"
                                size="medium"
                                type="datetimerange"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                range-separator="至"
                                start-placeholder="请选择期望到达时间"
                                end-placeholder="请选择期望到达时间">
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
        <div v-if="staff.showStaffList">
            <el-dialog class="mydialog"
                    :visible.sync="staff.showStaffList" custom-class="customWidth">
                <staff-content
                        :orderId="currentSelect.id" @staffDetail="staffDetail" @success="success"></staff-content>
            </el-dialog>
        </div>
        <div v-if="staff.showStaffDetail">
            <el-dialog class="mydialog"
                    :visible.sync="staff.showStaffDetail" custom-class="customWidth2">
                <staff-detail
                        :id="currentSelect.pId"></staff-detail>
            </el-dialog>
        </div>
        <div v-if="staff.showStaffPic">
            <el-dialog class="mydialog"
                    :visible.sync="staff.showStaffPic"
                    width="650px"
                    height="600px">
                <img :style="{width:'600px',height:'450px'}" :src="currentSelect.pic" class="avatar" alt="详情"/>
            </el-dialog>
        </div>
        <orderRemind :type="'1'" @getList="getList"></orderRemind>
    </div>
</template>

<script>
import tableForm from '../../../component/plugin/table'
import staffContent from '../staffs'
import staffDetail from '../staffs/detail'
import orderRemind from '../../../component/plugin/orderRemind'
export default {
  components: {
    tableForm,
    orderRemind,
    staffContent,
    staffDetail
  },

  data () {
    return {
      staff: {
        showStaffList: false,
        showStaffDetail: false,
        showStaffPic: false
      },
      currentSelect: {
        id: '',
        pId: '',
        pic: ''
      },
      search: {
        id: '',
        manName: '',
        manPhone: '',
        serviceProName: '',
        time: '',
        time2: ''
      },
      searchReal: {

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
            label: '服务金额（元）',
            field: 'serviceProMoney'
          }, {
            label: '老人名称',
            field: 'manName'
          }, {
            label: '联系电话',
            field: 'manPhone'
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
              }, {
                label: '分配',
                method: (row) => {
                  this.deliverOrder(row)
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
    initial (target = {}) {
      this.getList()
    },

    searchList () {
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
        let url = this.api.order.findAllUnallocated
        if (that.searchReal.time) {
          that.searchReal.startTime = that.searchReal.time[0]
          that.searchReal.endTime = that.searchReal.time[1]
        } else {
          that.searchReal.startTime = ''
          that.searchReal.endTime = ''
        }
        if (that.searchReal.time2) {
          that.searchReal.expectStartTime = that.searchReal.time2[0]
          that.searchReal.expectEndTime = that.searchReal.time2[1]
        } else {
          that.searchReal.expectStartTime = ''
          that.searchReal.expectEndTime = ''
        }

        let obj = {
          'id': that.searchReal.id,
          'manName': that.searchReal.manName,
          'manPhone': that.searchReal.manPhone,
          'serviceProName': that.searchReal.serviceProName,
          'startTime': that.searchReal.startTime,
          'endTime': that.searchReal.endTime,
          'expectStartTime': that.searchReal.expectStartTime,
          'expectEndTime': that.searchReal.expectEndTime,
          'page': that.table.paging.currentPage,
          'size': that.table.paging.limit
        }
        that.$refs.trigger.loading = true
        const response = await this.request.dataGet(that, url, obj)
        if (response.code === 1) {
          response.data.content.forEach(function (data) {
            if (data.expectStartTime && data.expectEndTime) {
              if (data.expectStartTime === data.expectEndTime) {
                data.expectTime = data.expectStartTime
              } else {
                data.expectTime = data.expectStartTime + '-' + data.expectEndTime.substring(11)
              }
            } else {
              data.expectTime = ''
            }
            if (data.serviceProMoney) {
              data.serviceProMoney = (data.serviceProMoney / 100).toFixed(2)
            }
          })
          that.table.list.data = response.data.content
          that.table.paging.total = response.data.totalElements
        } else {
          that.$message.error(response.msg)
          that.table.list.data = []
          that.table.paging.total = 0
        }
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
      that.$router.push({
        name: 'detailOrderManagement',
        params: {
          id: row.id,
          type: '22'
        }
      })
    },
    staffDetail (id) {
      this.currentSelect.pId = id
      this.staff.showStaffDetail = true
    },
    success (id) {
      this.currentSelect.pId = ''
      this.staff.showStaffDetail = false
      this.currentSelect.id = ''
      this.staff.showStaffList = false
      this.initial()
    },
    deliverOrder (row) {
      this.currentSelect.id = row.id
      this.staff.showStaffList = true
    }
  }
}
</script>
<style>
    .mydialog .el-dialog.customWidth{
        width:80%;
        height: 800px
    }
    .mydialog .el-dialog.customWidth2{
        width:80%;
    }

    .mydialog .el-dialog{
        display: flex;
        flex-direction: column;
        margin:0 !important;
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        /*height:600px;*/
        max-height:calc(100% - 30px);
        max-width:calc(100% - 30px);
    }
    .mydialog .el-dialog .el-dialog__body{
        flex:1;
        overflow: auto;
        padding: 0;
    }
</style>
