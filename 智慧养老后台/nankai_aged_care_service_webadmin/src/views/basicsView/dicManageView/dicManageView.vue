<template>
  <el-main>
    <el-col :span="24">
      <el-form :inline="true" class='el-InputForm'>
        <el-form-item>
          <el-input clearable
            size="medium"
            placeholder="请输入编码"
            prefix-icon="el-icon-search"
            v-model="SearchItem.code">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input clearable
            size="medium"
            placeholder="请输入名称"
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
    <!-- 添加/编辑 -->
    <dialog-form :isShow="isShow" :isBtn="true" :title="title" @closeDialog="closeDialog" @saveDialog="saveDialog">
      <el-form slot="form" ref="form" :model="form" :rules="rules">
        <el-form-item label="编码" prop="code" label-width="60px">
          <el-input
            size="medium"
            autocomplete="off"
            v-model="form.code"
            placeholder="请输入编码">
          </el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name" label-width="60px">
          <el-input
            size="medium"
            autocomplete="off"
            v-model="form.name"
            placeholder="请输入名称">
          </el-input>
        </el-form-item>
      </el-form>
    </dialog-form>
  </el-main>
</template>

<script>
import tableForm from 'plugin/table'
import dialogForm from 'plugin/dialogForm'
import vmson from 'js/emptyVue'

export default {
  components: {
    tableForm,
    dialogForm
  },

  data () {
    return {
      name: '',
      id: '',
      title: '',
      isShow: false,
      form: {
        code: '',
        name: ''
      },
      rules: {
        code: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      },
      table: {
        list: {
          header: [
            {
              label: '字典定义',
              field: 'dicName'
            },
            {
              label: '编码',
              field: 'code'
            },
            {
              label: '名称',
              field: 'name'
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
        dicId: '',
        code: '',
        name: ''
      },
      lastItem: {
        dicId: '',
        code: '',
        name: ''
      }
    }
  },
  watch: {
    $route (to, from) {
      to.meta.title = this.$route.query.name
      to.meta.name = this.$route.query.name
      this.SearchItem.code = ''
      this.SearchItem.name = ''
      this.urlJson()
      this.getList()
    }
  },
  mounted () {
    let meta = {
      title: this.$route.query.name,
      name: this.$route.query.name
    }
    this.urlJson()
    vmson.$emit('blur', meta, true)
    this.getList()
  },
  methods: {
    urlJson () {
      this.SearchItem.dicId = this.$route.query.id
      this.name = this.$route.query.name
    },
    add () {
      this.title = '添加' + this.name
      this.isShow = true
    },
    closeDialog () {
      this.isShow = false
      this.$refs['form'].resetFields()
      this.form = {
        code: '',
        name: ''
      }
      this.id = ''
    },
    // 保存
    saveDialog () {
      const that = this
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          try {
            let url = that.api.dicManage.insert
            let obj = {
              dicId: this.SearchItem.dicId,
              code: that.form.code,
              name: that.form.name
            }
            let response = null
            if (that.id) {
              url = that.api.dicManage.update
              obj.id = that.id
              response = await this.request.dataPut(that, url, obj)
            } else {
              response = await this.request.dataPost(that, url, obj)
            }
            if (response.code === 1) {
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
        let findUrl = that.api.dicManage.findById
        let parameter = { id: row.id }
        const response = await that.request.dataGet(that, findUrl, parameter)
        if (response.code === 1) {
          that.title = '编辑' + this.name
          that.id = row.id
          that.isShow = true
          that.form = response.data
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
        let findUrl = this.api.dicManage.findAll
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        let obj = {
          dicId: this.SearchItem.dicId,
          code: this.SearchItem.code,
          name: this.SearchItem.name
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
        let url = this.api.dicManage.delete + '?id=' + row.id
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
