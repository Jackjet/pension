<template>
  <el-main>
    <el-col :span="24">
      <el-form  class='el-InputForm' >
         <el-form-item style="width:300px">
          <span class="demonstration" style="margin-right:20px">年份</span>
          <el-date-picker
            v-model="value"
            type="year"
            value-format="yyyy"
            placeholder="选择年份">
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
              label: '1月',
              field: 'januaryNum'
            },
            {
              label: '2月',
              field: 'februaryNum'
            },
            {
              label: '3月',
              field: 'marchNum'
            },
            {
              label: '4月',
              field: 'aprilNum'
            },
            {
              label: '5月',
              field: 'mayNum'
            },
            {
              label: '6月',
              field: 'juneNum'
            },
            {
              label: '7月',
              field: 'julyNum'
            },
            {
              label: '8月',
              field: 'augustNum'
            },
            {
              label: '9月',
              field: 'septemberNum'
            },
            {
              label: '10月',
              field: 'octoberNum'
            },
            {
              label: '11月',
              field: 'novemberNum'
            },
            {
              label: '12月',
              field: 'decemberNum'
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
      value:''
    }
  },

  mounted () {
    this.getList()
  },

  methods: {
    SearchNoteList () {
      let that = this
      this.table.paging.currentPage = 1
      this.getList()
    },
    async exportExcel(){
      let that = this
      this.table.paging.currentPage = 1
      try {
        let findUrl = this.api.reports.countByOrderToExcel
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        let obj = {
          'year':this.value
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
          link.setAttribute('download', '工单统计.xls')
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
        let findUrl = this.api.reports.countByOrder
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        let year = new Date().getFullYear()
        console.log(year)
        let obj = {
          'year':this.value ? this.value : year
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
      console.log(value)
      // value.data.content[0].approvalRoleName2 = 2
      // value.data.content[1].approvalRoleName2 = 3
      value.data.forEach((v,i)=>{
        // v.approvalRoleName1 = 1
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
