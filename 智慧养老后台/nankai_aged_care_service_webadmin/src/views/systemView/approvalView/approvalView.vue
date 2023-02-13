<template>
  <el-main>
    <el-col :span="24">
      <el-form :inline="true" class='el-InputForm'>
        <el-form-item>
          <el-input clearable
                    size="medium"
                    placeholder="请输入当前角色"
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
      form: {
        name: '',
        remark: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      table: {
        list: {
          header: [
            {
              label: '当前角色',
              field: 'roleName'
            },
            {
              label: '一级审批角色',
              field: 'approvalRoleName1'
            },
            {
              label: '一级审批人',
              field: 'approvalUserName1'
            },
            {
              label: '二级审批角色',
              field: 'approvalRoleName2'
            },
            {
              label: '二级审批人',
              field: 'approvalUserName2'
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
                  document.name = '审批配置编辑'
                  this.edit(row)
                }
              },
              {
                label: '删除',
                icon: 'el-icon-delete',
                method: (row) => {
                  this.delete(row)
                }
              }]
          }
        },

        paging: {
          total: 0,
          currentPage: 1,
          limit: 20
        }
      },
      SearchItem: {
        name: ''
      },
      lastItem: {
        name: ''
      }
    }
  },

  mounted () {
    this.getList()
  },

  methods: {
    add () {
      document.name = '审批配置添加'
      this.$router.push({
        path: 'approvalAdd'
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
    // 列表
    async getList () {
      const that = this
      try {
        let findUrl = this.api.approval.findAll
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        let obj = {
          roleName: this.SearchItem.name
        }
        const response = await this.request.dataGet(that, url, obj)
        this.$refs.trigger.loading = false
        that.table.list.data = response.data.content
        that.table.paging.total = response.data.totalElements
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    edit (e) {
      this.$router.push({
        path: 'approvalAdd',
        query: {
          id: e.id
        }
      })
    },
    // 删除
    delete (row) {
      const that = this
      that.$confirm('您确定要删除么?', '提示', {
        type: 'warning'
      }).then(async () => {
        let url = this.api.approval.delete + '?id=' + row.id
        const response = await this.request.dataDelete(that, url, {})
        if (response.code === 1) {
          that.$message.success(response.msg)
          that.getList()
          return false
        }
        that.$message.error(response.msg)
      }).catch(() => {
        return false
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
