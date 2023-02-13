<template>
    <div>
        <el-main>
            <el-row>
                <label style="font-size: 19px">分配人员</label>
            </el-row>
            <el-col :span="24" style="margin-top: 10px;padding-left: 10px;padding-right: 10px">
                <el-form :inline="true" class='el-InputForm' style="margin-bottom: 0">
                    <el-form-item>
                        <el-input clearable
                                  size="medium"
                                  placeholder="请输入姓名"
                                  prefix-icon="el-icon-search"
                                  v-model="search.name">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="search.sex" placeholder="请选择性别"
                                   size="medium" clearable>
                            <el-option
                                    v-for="item in genderList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input clearable
                                  size="medium"
                                  placeholder="请输入年龄"
                                  prefix-icon="el-icon-search"
                                  v-model="search.age">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input clearable
                                  size="medium"
                                  placeholder="请输入联系电话"
                                  prefix-icon="el-icon-search"
                                  v-model="search.phone">
                        </el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" size='medium' icon="el-icon-search" @click="searchList">搜索
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <tableForm
                    ref="trigger"
                    :table-form='table'
                    @initial='initial'
                    @pageChange='pageChange'>
            </tableForm>
        </el-main>
    </div>
</template>

<script>
import tableForm from '../../../component/plugin/table'
import options from '../../../assets/js/options'

export default {
  components: {
    tableForm
  },
  props: ['orderId'],
  data () {
    return {
      search: {
        name: '',
        age: '',
        phone: '',
        sex: ''
      },
      searchReal: {
      },
      table: {
        list: {
          maxHeight: 650,
          detail: false,
          header: [{
            label: '姓名',
            field: 'name'
          }, {
            label: '性别',
            field: 'sex_show'
          }, {
            label: '年龄',
            field: 'age'
          }, {
            label: '联系电话',
            field: 'phone'
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
                label: '分配',
                method: (row) => {
                  this.showGiveAlert(row)
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
  computed: {
    genderList () {
      return options.gender
    }
  },
  mounted () {
    this.initial()
  },

  methods: {
    async initial (target = {}) {
      this.getList(target)
    },
    searchList () {
      const that = this
      Object.entries(that.search).map((item, index) => {
        that.searchReal[item[0]] = that.search[item[0]]
      })
      this.table.paging.currentPage = 1
      that.getList()
    },
    async getList (target) {
      const that = this
      try {
        let url = this.api.servant.findAll
        let obj = {
          'name': that.searchReal.name,
          'sex': that.searchReal.sex,
          'age': that.searchReal.age,
          'phone': that.searchReal.phone,
          'page': that.table.paging.currentPage,
          'size': that.table.paging.limit
        }
        that.$refs.trigger.loading = true
        const response = await this.request.dataGet(that, url, obj)
        that.table.list.data = response.data.content
        that.table.list.data.forEach(function (data) {
          data.sex_show = that.getLabelByValue(data.sex, options.gender)
          data.icon_show = that.api.resource.lib + data.icon
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
    getLabelByValue: function (value, array) {
      var result = ''
      array.forEach(function (data) {
        if (data.value === value) {
          result = data.label
        }
      })
      return result
    },
    goDetail (row) {
      this.$emit('staffDetail', row.id)
    },
    showGiveAlert (row) {
      let that = this
      that.$confirm('是否确定该人员进行服务', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.giveOrder(row)
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消分配'
        // })
      })
    },
    async giveOrder (row) {
      const that = this
      try {
        let url = that.api.order.updateEmploy
        let obj = {
          id: that.orderId,
          employName: row.name,
          employPhone: row.phone,
          employId: row.id
        }
        that.$refs.trigger.loading = true
        const response = await that.request.dataPost(that, url, obj)
        if (response.code === 0) {
          that.$message.error(response.msg)
        } else {
          that.$message.success('分配成功')
          this.$emit('success')
        }
        that.$refs.trigger.loading = false
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    }
  }
}
</script>
<style>
    .el-dialog__headerbtn .el-dialog__close {
        margin-right: 10px;
    }
</style>
