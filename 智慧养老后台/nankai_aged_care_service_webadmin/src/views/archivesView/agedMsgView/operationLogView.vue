<template>
  <el-main>
    <el-col :span="24">
      <el-form :inline="true" class='el-InputForm'>
        <el-form-item>
          <el-select clearable size="medium" v-model="SearchItem.optType" placeholder="操作类型">
            <el-option label="去世老人数据更新" value="去世老人数据更新"></el-option>
            <el-option label="流动人口数据更新" value="流动人口数据更新"></el-option>
            <el-option label="老人数据更新" value="老人数据更新"></el-option>
            <el-option label="设置有效数据更新" value="设置有效数据更新"></el-option>
            <el-option label="更新老人评估等级" value="更新老人评估等级"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="valueTime"
            size="medium"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size='medium' icon="el-icon-search" @click="SearchNoteList">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size='medium' icon="el-icon-arrow-left" @click="colse">返回</el-button>
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
      valueTime: '',
      table: {
        list: {
          header: [
            {
              label: '操作类型',
              field: 'optType'
            },
            {
              label: '当前操作时间',
              field: 'createTime'
            },
            {
              label: '操作人',
              field: 'createByName'
            }
          ],

          data: [],

          operation: {
            label: '操作',
            event: [
              {
                label: '操作数据',
                icon: 'el-icon-tickets',
                method: (row) => {
                  document.name = '操作数据'
                  this.$router.push({
                    path: 'agedMsgAdd',
                    query: {
                      id: row.id,
                      type: '3'
                    }
                  })
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
      userId: '',
      SearchItem: {
        userId: '',
        optType: '',
        startTime: '',
        endTime: ''
      },
      lastItem: {
        userId: '',
        optType: '',
        startTime: '',
        endTime: ''
      }
    }
  },

  mounted () {
    this.SearchItem.userId = this.$route.query.id
    this.getList()
  },

  methods: {
    colse () {
      this.$router.push({ path: 'agedMsgView' })
    },
    SearchNoteList () {
      let that = this
      if (that.valueTime) {
        that.SearchItem.startTime = that.valueTime[0]
        that.SearchItem.endTime = that.valueTime[1]
      } else {
        that.SearchItem.startTime = ''
        that.SearchItem.endTime = ''
      }
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
        let findUrl = this.api.userLog.findAll
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        if (this.SearchItem.startTime) {
          that.valueTime = [this.SearchItem.startTime, this.SearchItem.endTime]
        } else {
          that.valueTime = []
        }
        const response = await this.request.dataGet(that, url, this.SearchItem)
        this.$refs.trigger.loading = false
        that.table.list.data = response.data.content
        that.table.paging.total = response.data.totalElements
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },

    pageChange (val) {
      this.table.paging.limit = val.limit
      this.table.paging.currentPage = val.page
      this.getList()
    }
  }
}
</script>
