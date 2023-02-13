<template>
    <el-main
            v-loading="loading">
        <el-row>
            <el-col :span="4" v-bind:class="['content-right']">
                <span>商家当前状态：</span>
            </el-col>
            <el-col :span="4">
                <span>{{info.businessCurrentStatus}}</span>
            </el-col>
            <el-col :span="4" v-bind:class="['content-left']">
                <el-button type="primary" @click="alertStatus" size="medium">{{info.businessCurrentStatusBtn}}
                </el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4" v-bind:class="['content-right']">
                <span>是否允许服务人员抢单：</span>
            </el-col>
            <el-col :span="4">
                <div>
                    <el-radio-group v-model="info.isAllowOrder" @change="allowOrder">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                    </el-radio-group>
                </div>
            </el-col>
        </el-row>
    </el-main>
</template>

<script>
export default {
  name: 'index',
  data: function () {
    return {
      info: {},
      loading: false
    }
  },
  mounted () {
    this.initial()
  },
  methods: {
    initial () {
      this.getInfo()
    },
    async getInfo () {
      const that = this
      try {
        that.loading = true
        let url = that.api.provider.basicInformation
        let obj = {}
        const response = await that.request.dataGet(that, url, obj)
        that.info.serviceState = response.data.serviceState
        that.info.isAllowOrder = response.data.isAllowOrder
        that.info.id = response.data.id
        that.loading = false
        console.log("sadfsdf"+that.serviceState)
        if (that.info.serviceState === '1') {
          that.info.businessCurrentStatus = '已上线'
          that.info.businessCurrentStatusBtn = '下线'
        } else {
          that.info.businessCurrentStatus = '已下线'
          that.info.businessCurrentStatusBtn = '上线'
        }
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    alertStatus () {
      var that = this
      that.$confirm('确定' + this.info.businessCurrentStatusBtn + '商家？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.changeServiceState()
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消'
        // })
      })
    },
    async allowOrder () {
      const that = this
      try {
        that.loading = true
        let url = that.api.provider.isAllowOrder
        let obj = {
          id: that.info.id,
          isAllowOrder: that.info.isAllowOrder
        }
        const response = await that.request.dataPut(that, url, obj)
        if (response.code === 0) {
          that.$message.error(response.error)
        } else {
          that.$message.success('修改成功')
          this.$nextTick(() => {
            that.initial()
          });
        }
        that.loading = false
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    async changeServiceState () {
      const that = this
      try {
        that.loading = true
        let url = that.api.provider.isServiceState
        let obj = {
          id: that.info.id,
          serviceState: that.info.serviceState === '0' ? '1' : '0'
        }
        const response = await that.request.dataPut(that, url, obj)
        if (response.code === 0) {
          that.$message.error(response.msg)
        } else {
          that.$message.success('修改成功')
          this.$nextTick(() => {
            that.initial()
          });
        }
        that.loading = false
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    }
  }
}
</script>

<style scoped>
    .el-row {
        height: 50px;
    }

    .el-col {
        line-height: 50px;
    }

    .content-right {
        text-align: right;
    }

    .content-left {
        text-align: left;
    }
</style>
