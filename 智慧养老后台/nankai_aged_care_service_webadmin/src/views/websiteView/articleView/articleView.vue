<template>
  <el-main>
    <el-col :span="24">
      <el-form :inline="true" class='el-InputForm'>
        <el-form-item>
          <el-input clearable
            size="medium"
            placeholder="请输入标题"
            prefix-icon="el-icon-search"
            v-model="SearchItem.title">
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
import vmson from 'js/emptyVue'

export default {
  components: {
    tableForm
  },

  data () {
    return {
      categoryId: '',
      name: '',
      table: {
        list: {
          header: [
            {
              label: '标题',
              field: 'title'
            },
            {
              label: '栏目名称',
              field: 'categoryName'
            },
            {
              label: '作者',
              field: 'author'
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
                  document.name = this.name + '编辑'
                  this.$router.push({
                    path: 'articleAdd',
                    query: {
                      id: row.id,
                      type: '1'
                    }
                  })
                }
              },
              {
                label: '详情',
                icon: 'el-icon-tickets',
                method: (row) => {
                  document.name = this.name + '详情'
                  this.$router.push({
                    path: 'articleAdd',
                    query: {
                      id: row.id,
                      type: '2'
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
      SearchItem: {
        title: ''
      },
      lastItem: {
        title: ''
      }
    }
  },
  watch: {
    $route (to, from) {
      to.meta.name = this.$route.query.name
      this.SearchItem.title = ''
      this.urlJson()
      this.getList()
    }
  },
  mounted () {
    vmson.$emit('blur', this.$route.query.name)
    this.urlJson()
    this.getList()
  },
  methods: {
    urlJson () {
      this.categoryId = this.$route.query.id
      this.name = this.$route.query.name
      this.common.session('categoryId', this.categoryId)
      this.common.session('categoryName', this.name)
    },
    add () {
      document.name = this.name + '添加'
      this.$router.push({
        path: 'articleAdd',
        query: {
          type: '0'
        }
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
      let findUrl = this.api.art.findAll
      let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
      let obj = {
        title: this.SearchItem.title,
        categoryId: this.categoryId
      }
      const response = await this.request.dataGet(that, url, obj)
      this.$refs.trigger.loading = false
      that.table.list.data = response.data.content
      that.table.paging.total = response.data.totalElements
    },

    // 删除
    delete (row) {
      const that = this
      that.$confirm('您确定要删除么?', '提示', {
        type: 'warning'
      }).then(async () => {
        let url = this.api.art.deleteById + '?id=' + row.id
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
