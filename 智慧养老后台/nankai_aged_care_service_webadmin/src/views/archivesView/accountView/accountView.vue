<template>
  <el-main>
    <el-col :span="24">
      <el-form :inline="true" class='el-InputForm'>
        <el-form-item class="items">
          <el-input clearable
            size="medium"
            placeholder="请输入老人姓名"
            prefix-icon="el-icon-search"
            v-model="SearchItem.name">
          </el-input>
        </el-form-item>
        <el-form-item class="items">
          <el-input clearable
                    size="medium"
                    placeholder="请输入联系电话"
                    prefix-icon="el-icon-search"
                    v-model="SearchItem.phone">
          </el-input>
        </el-form-item>
        <el-form-item class="items"  v-if='(homeStreetId || homeCommunityId) ? false : true'>
          <el-select clearable size="medium" v-model="SearchItem.homeStreetId" placeholder="请选择所属街道" @change='street'>
            <el-option
              v-for="item in streetList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="items" v-if='homeCommunityId ? false : true'>
          <el-select clearable size="medium" v-model="SearchItem.homeCommunityId" placeholder="请选择所属社区">
            <el-option
              v-for="item in communityList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size='medium' icon="el-icon-search" @click="SearchNoteList">搜索</el-button>
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
      streetList: [],
      communityList: [],
      valueTime: '',
      homeStreetId: this.common.session('currentUser').streetId,
      homeCommunityId: this.common.session('currentUser').communityId,
      table: {
        list: {
          border: false,
          header: [
            {
              label: '老人姓名',
              field: 'name'
            },
            {
              label: '所属街道',
              field: 'homeStreetName'
            },
            {
              label: '所属社区',
              field: 'homeCommunityName'
            },
            {
              label: '性别',
              field: 'sex'
            },
            {
              label: '联系电话',
              field: 'phone'
            },
            {
              label: '账户余额(单位:元)',
              field: 'money'
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
                label: '详情',
                icon: 'el-icon-document',
                method: (row) => {
                  this.$router.push({
                    path: 'accountAdd',
                    query: {
                      id: row.id,
                      type: '2'
                    }
                  })
                }
              },
              {
                label: '账户明细',
                icon: 'el-icon-tickets',
                method: (row) => {
                  this.$router.push({
                    path: 'accountDetail',
                    query: {
                      id: row.id
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
      SearchItem: {
        name: '',
        homeStreetId: '',
        homeCommunityId: '',
        phone: ''
      },
      lastItem: {
        name: '',
        homeStreetId: '',
        homeCommunityId: '',
        phone: ''
      }
    }
  },

  mounted () {
    this.getList()
    this.getStreetList()
    this.getCommunityList(this.homeStreetId)
    if (this.homeStreetId) {
      this.getCommunityList(this.homeStreetId)
    } else {
      this.getCommunityList()
    }
  },

  methods: {
    // 街道列表
    async getStreetList () {
      const that = this
      try {
        let url = this.api.street.findAll + '?page=1&size=1000000'
        let obj = {}
        const response = await this.request.dataGet(that, url, obj)
        that.streetList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    // 社区列表
    async getCommunityList (val) {
      const that = this
      try {
        let url = this.api.community.findAll + '?page=1&size=1000000'
        let obj = {
          streetId: val
        }
        const response = await this.request.dataGet(that, url, obj)
        that.communityList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    street (val) {
      this.getCommunityList(val)
      this.SearchItem.homeCommunityId = ''
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
        let findUrl = this.api.user.findAllAccount
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        const response = await this.request.dataGet(that, url, this.SearchItem)
        this.$refs.trigger.loading = false
        response.data.content.forEach(item => {
          item.money = (Number(item.money) / 100).toFixed(2)
          if (item.sex === '1') {
            item.sex = '男'
          } else {
            item.sex = '女'
          }
          if (item.isValid === '1') {
            item.isValid = '有'
          } else {
            item.isValid = '无'
          }
          if (item.type === '1') {
            item.type = '普通老人'
          } else {
            item.type = '居家老人'
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

<style lang="scss">
.items{
  width: 160px;
}
</style>
