<template>
  <el-main>
    <el-col :span="24">
      <el-form  class='el-InputForm'  label-width="80px">
         <el-form-item style="width: 400px;" label="工单时间:">
          
            <el-date-picker
                    v-model="search.time"
                    size="medium"
                    type="datetimerange"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="至"
                    start-placeholder="请选择订单开始时间"
                    end-placeholder="请选择订单结束时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size='medium' icon="el-icon-search" @click="SearchNoteList">查询</el-button>
          <el-button type="primary" size='medium' icon="el-icon-folder-opened" @click="exportExcel">导出</el-button>
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
      table: {
        list: {
          header: [
            {
              label: '工单类型',
              field: 'type'
            },
            {
              label: '待处理',
              field: 'pendingNum'
            },
            {
              label: '待分配',
              field: 'unallocatedNum'
            },
            {
              label: '进行中',
              field: 'conductNum'
            },
            {
              label: '已完成',
              field: 'endNum'
            },
             {
              label: '合计',
              field: 'sumNum'
            }
          ],

          data: [],
        },

        paging: {
          total: 0,
          currentPage: 1,
          limit: 10
        }
      },
      search: {
        time: ''
      },
      searchReal: {
      },
    }
  },

  mounted () {
    this.getList()
  },

  methods: {
    SearchNoteList () {
      let that = this
      Object.entries(that.search).map((item, index) => {
        that.searchReal[item[0]] = that.search[item[0]]
      })
      this.table.paging.currentPage = 1
      this.getList()
    },
    async exportExcel(){
      let that = this
      Object.entries(that.search).map((item, index) => {
        that.searchReal[item[0]] = that.search[item[0]]
      })
      this.table.paging.currentPage = 1
      try {
        if (that.searchReal.time) {
          that.searchReal.startTime = that.searchReal.time[0]
          that.searchReal.endTime = that.searchReal.time[1]
        } else {
          that.searchReal.startTime = ''
          that.searchReal.endTime = ''
        }
        let findUrl = this.api.reports.countByOrderStateToExcel
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        let obj = {
          startTime:that.searchReal.startTime,
          endTime:that.searchReal.endTime,
        }
        that.$axios({
          method: 'get',
          url: process.env.VUE_APP_URL + url,
          responseType: 'blob',
          params: obj,
          headers: {
            'Authorization': 'token ' + this.common.session('currentUser').token
          }
        }).then((data) => {
          if (data.status === 200) {
            that.$message.success('导出成功')
          }
          if (!data) {
            return
          }
          let url = window.URL.createObjectURL(data.data)
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', '工单状态统计.xls')
          document.body.appendChild(link)
          link.click()
        })
      } catch (even) {
        that.$message.error('数据导出失败')
      }
    },
    // 列表
    async getList () {
      const that = this
      try {
        if (that.searchReal.time) {
          that.searchReal.startTime = that.searchReal.time[0]
          that.searchReal.endTime = that.searchReal.time[1]
        } else {
          that.searchReal.startTime = ''
          that.searchReal.endTime = ''
        }
        let findUrl = this.api.reports.countByOrderState
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        let obj = {
          startTime:that.searchReal.startTime,
          endTime:that.searchReal.endTime,
        }
        const response = await this.request.dataGet(that, url, obj)
        let sum = this.countSum(response)
        response.data.push(sum)
        this.$refs.trigger.loading = false
        that.table.list.data = response.data
        // that.table.paging.total = response.data.totalElements
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    countSum(value){
      let obj = {}
      let that = this
      value.data.forEach((v,i)=>{
        that.table.list.header.forEach((val,index)=>{
            if(index == 0){
              obj[val.field] = '合计'
            }else{
              if(isNaN(v[val.field])){
                if(val.field in obj){
                 
                }else{
                  obj[val.field] = ''
                }
              }else{
                if(val.field in obj){
                  obj[val.field] = obj[val.field] + v[val.field]
                }else{
                  obj[val.field] = v[val.field]
                }
              }
            }
        })
      })
      return obj
    },

    pageChange (val) {
      this.table.paging.limit = val.limit
      this.table.paging.currentPage = val.page
      this.getList()
    }
  }
}
</script>
