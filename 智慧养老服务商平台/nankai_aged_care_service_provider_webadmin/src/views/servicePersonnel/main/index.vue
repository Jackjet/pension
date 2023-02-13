<template>
    <el-main>
        <el-col :span="24">
            <el-form :inline="true" class='el-InputForm'>

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
                <el-form-item>
                    <el-button type="primary" size='medium' icon="el-icon-plus" @click="goAdd">添加
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
    genderList () {
      return options.gender
    },
    table () {
      return {
        list: {
          detail: false,
          header: [{
            label: '姓名',
            field: 'name'
          }, {
            label: '性别',
            field: 'sex_show'
          }, {
            label: '头像',
            field: 'icon_show',
            type: 'image',
            error: 'person'
          }, {
            label: '年龄',
            field: 'age'
          }, {
            label: '联系电话',
            field: 'phone'
          }, {
            label: '创建时间',
            field: 'createTime'
          }],
          data: [],
          operation: {
            label: '操作',
            event: [{
              label: '修改',
              method: (row) => {
                console.log(JSON.stringify(row))
                this.goModify(row)
              }
            },
              {
                label: '查看',
                method: (row) => {
                  this.goDetail(row)
                }
              },
              {
                label: '删除',
                method: (row) => {
                  this.remove(row)
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
  data () {
    return {
      search: {
        name: '',
        age: '',
        phone: '',
        sex: '',
      },
      searchReal: {
      },
      sections: {
        sex: [{
          'label': '男',
          'value': '1'
        }, {
          'label': '女',
          'value': '0'
        }]
      }

    }
  },
  mounted () {
    this.initial()
  },
  methods: {
    async getList (target) {
      const that = this
      try {
        let url = that.api.servant.findAll
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
        console.log(JSON.stringify(that.table.list.data))
        that.table.paging.total = response.data.totalElements
        that.$refs.trigger.loading = false
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    initial (target = {}) {
      this.getList(target)
    },
    searchList(){
      const that = this
      Object.entries(that.search).map((item, index) => {
        that.searchReal[item[0]] = that.search[item[0]]
      })
      this.table.paging.currentPage = 1
      that.getList()
    },
    pageChange (val) {
      this.table.paging.limit = val.limit
      this.table.paging.currentPage = val.page
    },
    goAdd () {
      const that = this
      that.$router.push({
        name: 'newServicePersonnel',
        params: {
          id: ''
        }
      })
    },

    goModify (row) {
      const that = this
      that.$router.push({
        name: 'modifyServicePersonnel',
        params: {
          id: row.id
        }
      })
    },
    goDetail (row) {
      const that = this
      that.$router.push({
        name: 'detailServicePersonnel',
        params: {
          id: row.id
        }
      })
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
    // 删除
    remove (row) {
      const that = this
      that.$confirm('您确定要删除么？', '提示', {
        type: 'warning'
      }).then(async () => {
        let url = this.api.servant.delete + '?id=' + row.id
        const response = await this.request.dataDelete(that, url, {})
        if (response.code === 1) {
          that.$message.success(response.msg)
          that.getList({})
        } else {
          that.$message.error(response.msg)
        }
      }).catch(() => {
        return false
      })
    }
  }
}
</script>
