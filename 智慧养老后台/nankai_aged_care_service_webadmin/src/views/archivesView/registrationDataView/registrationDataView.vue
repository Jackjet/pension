<template>
  <el-main>
    <el-col :span="24">
      <el-form :inline="true" class='el-InputForm'>
        <el-form-item>
          <el-input clearable
            size="medium"
            placeholder="请输入身份证号"
            prefix-icon="el-icon-search"
            v-model="SearchItem.idCard">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input clearable
            size="medium"
            placeholder="请输入老人姓名"
            prefix-icon="el-icon-search"
            v-model="SearchItem.name">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input clearable
            size="medium"
            placeholder="请输入联系电话"
            prefix-icon="el-icon-search"
            v-model="SearchItem.phone">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-select clearable size="medium" v-model="SearchItem.streetId" placeholder="请选择服务街道" @change="street">
            <el-option
              v-for="item in streetList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select clearable size="medium" v-model="SearchItem.communityId" placeholder="请选择服务社区">
            <el-option
              v-for="item in communityList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input clearable
            size="medium"
            placeholder="请输入服务电话"
            prefix-icon="el-icon-search"
            v-model="SearchItem.servicePhone">
          </el-input>
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
      id: '',
      title: '',
      isShow: false,
      streetList: [],
      communityList: [],
      table: {
        list: {
          header: [
            {
              label: '老人姓名',
              field: 'name',
              width: '100'
            },
            {
              label: '服务街道',
              field: 'streetName'
            },
            {
              label: '服务社区',
              field: 'communityName'
            },
            {
              label: '服务电话',
              field: 'servicePhone'
            },
            {
              label: '联系电话',
              field: 'phone'
            },
            {
              label: '身份证号',
              field: 'idCard'
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
                    path: 'registrationDataDetail',
                    query: {
                      id: row.id
                    }
                  })
                }
              },
              {
                label: '重置密码',
                icon: 'el-icon-refresh',
                method: (row) => {
                  this.reset(row)
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
        idCard: '',
        name: '',
        phone: '',
        streetId: '',
        communityId: '',
        servicePhone: ''
      },
      lastItem: {
        idCard: '',
        name: '',
        phone: '',
        streetId: '',
        communityId: '',
        servicePhone: ''
      }
    }
  },

  mounted () {
    this.getList()
    this.getStreetList()
    this.getCommunityList()
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
    street (val) {
      this.communityList = []
      this.SearchItem.communityId = ''
      this.getCommunityList(val)
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
        let findUrl = this.api.appUser.findAll
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        let obj = {
          name: this.SearchItem.name,
          idCard: this.SearchItem.idCard,
          phone: this.SearchItem.phone,
          streetId: this.SearchItem.streetId,
          communityId: this.SearchItem.communityId,
          servicePhone: this.SearchItem.servicePhone
        }
        const response = await this.request.dataGet(that, url, obj)
        this.$refs.trigger.loading = false
        that.table.list.data = response.data.content
        that.table.paging.total = response.data.totalElements
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    reset (row) {
      const that = this
      that.$confirm('您确定重置么?', '提示', {
        type: 'warning'
      }).then(async () => {
        let url = that.api.appUser.resetPassword + '?id=' + row.id
        let obj = {
        }
        const response = await this.request.dataPut(that, url, obj)
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
