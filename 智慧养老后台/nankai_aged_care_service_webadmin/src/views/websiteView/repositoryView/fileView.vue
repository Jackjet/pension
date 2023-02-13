<template>
  <el-main>
    <el-col :span="24">
      <el-form :inline="true" class='el-InputForm'>
        <el-form-item>
          <el-input clearable
            size="medium"
            placeholder="请输入文件夹名称"
            prefix-icon="el-icon-search"
            v-model="SearchItem.folderName">
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
    <!-- 添加/编辑 -->
    <dialog-form :isShow="isShow" :isBtn="true" :title="title" @closeDialog="closeDialog" @saveDialog="saveDialog">
      <el-form slot="form" ref="form" :model="form" :rules="rules">
        <el-form-item label="文件夹名称" prop="folderName" label-width="108px">
          <el-input
            size="medium"
            autocomplete="off"
            v-model="form.folderName"
            placeholder="请输入文件夹名称">
          </el-input>
        </el-form-item>
      </el-form>
    </dialog-form>
  </el-main>
</template>

<script>
import tableForm from 'plugin/table'
import dialogForm from 'plugin/dialogForm'

export default {
  components: {
    tableForm,
    dialogForm
  },

  data () {
    return {
      id: '',
      title: '',
      isShow: false,
      form: {
        folderName: ''
      },
      rules: {
        folderName: [
          { required: true, message: '请输入文件夹名称', trigger: 'blur' }
        ]
      },
      table: {
        list: {
          header: [
            {
              label: '文件夹名称',
              field: 'folderName'
            },
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
                label: '资源库管理',
                icon: 'el-icon-document',
                method: (row) => {
                  this.common.session('folderId', row.id)
                  this.$router.push({
                    path: 'repositoryView'
                  })
                }
              },
              {
                label: '编辑',
                icon: 'el-icon-edit',
                method: (row) => {
                  this.edit(row)
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
      SearchItem: {
        folderName: ''
      },
      lastItem: {
        folderName: ''
      }
    }
  },

  mounted () {
    this.getList()
    document.title = '智慧养老云服务平台'
  },

  methods: {
    add () {
      this.title = '添加文件夹'
      this.isShow = true
    },
    closeDialog () {
      this.isShow = false
      this.id = ''
      this.$refs['form'].resetFields()
      this.form.folderName = ''
    },
    // 保存
    saveDialog () {
      const that = this
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          try {
            let url = that.api.resourceFolder.insert
            let obj = {
              folderName: that.form.folderName
            }
            let response = null
            if (that.id) {
              url = that.api.resourceFolder.update
              obj.id = that.id
              response = await this.request.dataPut(that, url, obj)
            } else {
              response = await this.request.dataPost(that, url, obj)
            }
            if (response.code === 1) {
              that.isShow = false
              that.$message.success(response.msg)
              that.closeDialog()
              that.getList()
              return false
            }
            that.$message.error(response.msg)
          } catch (even) {
            that.$message.error('数据获取失败')
          }
        }
      })
    },
    // 编辑
    async edit (row) {
      const that = this
      try {
        let findUrl = that.api.resourceFolder.findById
        let parameter = { id: row.id }
        const response = await that.request.dataGet(that, findUrl, parameter)
        if (response.code === 1) {
          that.title = '编辑文件夹'
          that.id = row.id
          that.isShow = true
          that.form.folderName = response.data.folderName
          return false
        }
        that.$message.error(response.msg)
      } catch (even) {
        that.$message.error('数据获取失败')
      }
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
        let findUrl = this.api.resourceFolder.findAll
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        let obj = {
          folderName: this.SearchItem.folderName
        }
        const response = await this.request.dataGet(that, url, obj)
        this.$refs.trigger.loading = false
        that.table.list.data = response.data.content
        that.table.paging.total = response.data.totalElements
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },

    // 删除
    delete (row) {
      const that = this
      that.$confirm('您确定要删除么?', '提示', {
        type: 'warning'
      }).then(async () => {
        let url = this.api.resourceFolder.deleteById + '?id=' + row.id
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
