<template>
    <el-main>
      <el-col :span='24'>
          <tableForm
                  ref="trigger"
                  :table-form='table'
                  @initial='initial'
                  @pageChange='pageChange'>
          </tableForm>
      </el-col>
      <orderRemind :type="'0'" @getList="getList"></orderRemind>
    </el-main>
</template>

<script>
import tableForm from '../../../component/plugin/table'
import orderRemind from '../../../component/plugin/orderRemind'
export default {
  components: {
    tableForm,
    orderRemind
  },

  data () {
    return {
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
                label: '抢单',
                method: (row) => {
                  this.showGrabAlert(row)
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
      this.getList(target)
    },
    async getList (target) {
      const that = this
      try {
        let url = this.api.order.findAllRob
        let obj = {
          'page': that.table.paging.currentPage,
          'size': that.table.paging.limit
        }
        that.$refs.trigger.loading = true
        const response = await this.request.dataGet(that, url, obj)
        if (response.code === 1) {
          that.table.list.data = response.data.content
          that.table.list.data.forEach(function (data) {
            if (data.expectStartTime && data.expectEndTime) {
              data.expectTime = data.expectStartTime + '-' + data.expectEndTime.substring(11)
            } else {
              data.expectTime = ''
            }
            if (data.serviceProMoney) {
              data.serviceProMoney = (data.serviceProMoney / 100).toFixed(2)
            }
          })
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
          type: '21'
        }
      })
    },
    showGrabAlert (row) {
      let that = this
      that.$confirm('是否抢单', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.grabOrder(row)
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消抢单'
        // })
      })
    },
    async grabOrder (row) {
      const that = this
      try {
        let url = this.api.order.robOrder
        let obj = {
          id: row.id
        }
        that.$refs.trigger.loading = true
        const response = await this.request.dataPost(that, url, obj)
        if (response.code === 0) {
          that.$message.error(response.error)
        } else {
          that.$message.success('抢单成功')
          this.$nextTick(() => {
            that.initial()
          })
        }
        that.$refs.trigger.loading = false
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    }
  }
}
</script>
