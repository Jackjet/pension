<template>
  <el-main>
    <el-col :span="24">
      <el-form :inline="true" class='el-InputForm'>
         <el-form-item>
          <el-select clearable size="medium" v-model="SearchItem.serviceType1Id" @change="columnChange" placeholder="请选择服务栏目">
            <el-option
              v-for="item in columnList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select clearable size="medium" v-model="SearchItem.serviceType2Id" placeholder="请选择服务类别">
            <el-option
              v-for="item in classList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            clearable
            size="medium"
            placeholder="请输入服务项"
            prefix-icon="el-icon-search"
            v-model="SearchItem.name">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size='medium' icon="el-icon-search" @click="SearchNoteList">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size='medium' icon="el-icon-plus" @click="add">添加</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size='medium' icon="el-icon-download" @click="exportData">导出</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <!-- 表格 -->
      <tableForm
        ref="trigger"
        :table-form='table'
        @getList='getList'
        @pageChange='pageChange'>
      </tableForm>
    </el-col>
  </el-main>
</template>

<script>
import tableForm from 'plugin/table'

export default {
  components: {
    tableForm
  },

  data () {
    return {
      id: '',
      title: '',
      isShow: false,
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
              field: 'name'
            },
            {
              label: '服务性质',
              field: 'type'
            },
            // {
            //   label: '市场金额（元）',
            //   field: 'money'
            // },
            {
              label: '创建时间',
              field: 'createTime'
            }
          ],

          data: [],

          operation: {
            label: '操作',
            event: [
              {
                label: '编辑',
                icon: 'el-icon-edit',
                method: (row) => {
                  document.name = '服务项目编辑'
                  this.$router.push({
                    path: '/index/serviceItemsAdd',
                    query: {
                      id: row.id
                    }
                  })
                }
              },
              {
                label: '删除',
                icon: 'el-icon-delete',
                method: (row) => {
                  this.delete(row)
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
      columnList: [],
      classList: [],
      SearchItem: {
        serviceType1Id: '',
        serviceType2Id: '',
        name: ''
      },
      lastItem: {
        serviceType1Id: '',
        serviceType2Id: '',
        name: ''
      }
    }
  },

  mounted () {
    this.getList()
    this.getColumnList()
  },

  methods: {
    columnChange () {
      this.SearchItem.serviceType2Id = ''
      this.classList = []
      this.getClassList()
    },
    // 栏目列表
    async getColumnList () {
      const that = this
      try {
        let url = this.api.serviceType1.findAll + '?page=1&size=1000000'
        let obj = {}
        const response = await this.request.dataGet(that, url, obj)
        that.columnList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    // 类别列表
    async getClassList (serviceType1Id) {
      const that = this
      try {
        let url = this.api.serviceType2.findAll + '?page=1&size=1000000'
        let obj = {
          serviceType1Id: this.SearchItem.serviceType1Id
        }
        const response = await this.request.dataGet(that, url, obj)
        that.classList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    async exportData () {
      const that = this
      try {
        let url = this.api.serviceProject.exportFindData
        let obj = {
          page: 1,
          size: 10000000,
          serviceType1Id: this.SearchItem.serviceType1Id,
          serviceType2Id: this.SearchItem.serviceType2Id,
          name: this.SearchItem.name
        }
        const response = await this.request.downloadFile1('服务项目.xlsx', that, url, obj, function (response) {
          if (response.status === 200) {
            that.$message.success('导出成功')
          }
        })
        // that.$message.success(response.msg)
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    // 列表
    async getList () {
      const that = this
      try {
        let findUrl = this.api.serviceProject.findAll
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        let obj = {
          serviceType1Id: this.SearchItem.serviceType1Id,
          serviceType2Id: this.SearchItem.serviceType2Id,
          name: this.SearchItem.name
        }
        const response = await this.request.dataGet(that, url, obj)
        this.$refs.trigger.loading = false
        response.data.content.forEach(item => {
          switch (item.type) {
            case '0':
              item.type = '计时服务'
              break
            case '1':
              item.type = '计次服务'
              break
            case '2':
              item.type = '单价服务'
              break
          }
          item.money = (item.money / 100).toFixed(2)
        })
        that.table.list.data = response.data.content
        that.table.paging.total = response.data.totalElements
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    add () {
      document.name = '服务项目添加'
      this.$router.push({
        path: 'serviceItemsAdd'
      })
    },
    SearchNoteList () {
      let that = this
      Object.entries(that.SearchItem).map((item, index) => {
        that.lastItem[item[0]] = that.SearchItem[item[0]]
      })
      this.table.paging.currentPage = 1
      this.getList()
    },

    // 删除
    delete (row) {
      const that = this
      that.$confirm('您确定要删除么?', '提示', {
        type: 'warning'
      }).then(async () => {
        let url = this.api.serviceProject.deleteById + '?id=' + row.id
        const response = await this.request.dataDelete(that, url, {})
        if (response.code === 1) {
          that.$message.success(response.msg)
          that.getList()
          return false
        }
        that.$message.error(response.msg)
      }).catch((response) => {
        that.$message.error(response.msg)
      })
    },

    pageChange (val) {
      this.table.paging.limit = val.limit
      this.table.paging.currentPage = val.page
      this.getList()
    }
  }
}
</script>
