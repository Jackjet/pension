<template>
  <el-main>
      <el-form :inline="true"  class='aa' label-width="80px" style='text-align: left; margin-left: 10px'>
        <el-row class='el-row-el'>
          <el-col :span="8">
            <el-form-item  label="老人姓名:">
              <el-input clearable
                size="medium"
                v-model="SearchItem.name" disabled>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话:">
              <el-input clearable
                        size="medium"
                        v-model="SearchItem.phone" disabled>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账户余额:">
              <el-input
                size="medium"
                v-model="SearchItem.money" disabled>
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
       </el-row>

       <el-row class='el-row-el'>
         <el-col :span="8">
            <el-form-item label="老人类型:">
              <el-input clearable
                        v-model="SearchItem.genreName" disabled>
              </el-input>
            </el-form-item>
         </el-col>
         <el-col :span="8">
          <el-form-item label="所属街道:">
            <el-input clearable
              size="medium"
              v-model="SearchItem.homeStreetName" disabled>
            </el-input>
          </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="所属社区:">
            <el-input clearable
              size="medium"
              v-model="SearchItem.homeCommunityName" disabled>
            </el-input>
          </el-form-item>
          </el-col>

       </el-row>
      </el-form>
    <el-col :span="24">
      <!-- 表格 -->
      <tableForm
        ref="trigger"
        :table-form='table'
        @getList='getList'
        @pageChange='pageChange'>
      </tableForm>
    </el-col>

    <el-form :inline="true"  class='aa' label-width="80px" style='text-align: center; margin-left: 10px'>
      <el-row class='el-row-el'>
        <el-col :span="24">
          <el-form-item class="open_btn">
            <el-button type="primary" size='medium' icon="el-icon-arrow-left" @click="colse">返回</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
      table: {
        list: {

          header: [
            {
              label: '操作类型',
              field: 'optType'
            },
            {
              label: '资金方向',
              field: 'direction'
            },
            {
              label: '操作前账户余额(单位:元)',
              field: 'beforeMoney'
            },
            {
              label: '账户余额(单位:元)',
              field: 'money'
            },
            {
              label: '操作金额(单位:元)',
              field: 'optMoney'
            },
            {
              label: '创建时间',
              field: 'createTime'
            },
            {
              label: '备注',
              field: 'remark'
            }
          ],

          data: []
        },

        paging: {
          total: 0,
          currentPage: 1,
          limit: 20
        }
      },
      SearchItem: {
        name: '',
        homeStreetId: '',
        homeCommunityId: '',
        money: '',
        genreId: ''
      }
    }
  },

  mounted () {
    this.SearchItem.userId = this.$route.query.id
    this.getList()
    this.getDetail()
  },

  methods: {
    colse () {
      this.$router.push({ path: 'account' })
    },
    // 街道列表
    async getDetail () {
      const that = this
      try {
        let url = this.api.user.findAllAccountByUserId
        let obj = {
          userId: that.$route.query.id
        }
        const response = await this.request.dataGet(that, url, obj)
        response.data.money = (Number(response.data.money) / 100).toFixed(2)
        response.data.genreName = JSON.parse(response.data.genreName)
        if (response.data.genreName.length !== 0) {
          if (response.data.genreName.length === 1) {
            response.data.genreName = response.data.genreName[0]
          } else {
            response.data.genreName = response.data.genreName.join(',')
          }
        }
        that.SearchItem = response.data
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    // 列表
    async getList () {
      const that = this
      try {
        let findUrl = this.api.user.findByUserAccountId
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        let obj = {
          userId: that.$route.query.id
        }
        const response = await this.request.dataGet(that, url, obj)
        this.$refs.trigger.loading = false
        response.data.content.forEach(item => {
          item.beforeMoney = (Number(item.beforeMoney) / 100).toFixed(2)
          item.money = (Number(item.money) / 100).toFixed(2)
          item.optMoney = (Number(item.optMoney) / 100).toFixed(2)
          if (item.optType === '1') {
            item.optType = '购买服务'
          } else {
            item.optType = '补贴发放'
          }
          if (item.direction === '1') {
            item.direction = '支出'
          } else {
            item.direction = '存入'
          }
        })
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

<style scoped>
  .aa >>> .el-form-item__content {
    width: 71% !important;
  }
  .aa >.type > .el-form-item__content{

  }
</style>
