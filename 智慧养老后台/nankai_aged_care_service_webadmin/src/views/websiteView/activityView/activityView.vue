<template>
  <el-main>
    <el-col :span="24">
      <el-form :inline="true" class='el-InputForm'>
        <el-form-item>
          <el-input clearable
            size="medium"
            placeholder="请输入标题"
            prefix-icon="el-icon-search"
            v-model="SearchItem.name">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-select clearable size="medium" v-model="SearchItem.typeId" placeholder="请选择活动分类">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              </el-option>
          </el-select>
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
      typeList: [],
      table: {
        list: {
          header: [
            {
              label: '标题',
              field: 'name',
              width: '200'
            },
            {
              label: '活动分类',
              field: 'typeName',
              width: '100'
            },
            {
              label: '活动日期',
              field: 'startTime'
            },
            {
              label: '创建时间',
              field: 'createTime',
              width: '150'
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
                  document.name = '活动编辑'
                  this.$router.push({
                    path: 'activityAdd',
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
                  document.name = '活动详情'
                  this.$router.push({
                    path: 'activityAdd',
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
        name: '',
        typeId: ''
      },
      lastItem: {
        name: '',
        typeId: ''
      }
    }
  },

  mounted () {
    this.getGenreList()
    this.getList()
  },

  methods: {
    add () {
      document.name = '活动添加'
      this.$router.push({
        path: 'activityAdd',
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
    async getGenreList () {
      const that = this
      try {
        let url = this.api.dicManage.findAll + '?page=1&size=1000000'
        let obj = {
          dicId: 'hdfl'
        }
        const response = await this.request.dataGet(that, url, obj)
        that.typeList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    // 列表
    async getList () {
      const that = this
      try {
        let findUrl = this.api.activity.findAll
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        let obj = {
          name: this.SearchItem.name,
          typeId: this.SearchItem.typeId
        }
        const response = await this.request.dataGet(that, url, obj)
        this.$refs.trigger.loading = false
        response.data.content.forEach(item => {
          item.startTime = item.startTime + '-' + item.endTime
        })
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
        let url = this.api.activity.deleteById + '?id=' + row.id
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
