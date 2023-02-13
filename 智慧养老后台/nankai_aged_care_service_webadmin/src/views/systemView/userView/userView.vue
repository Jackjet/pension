<template>
  <el-main>
    <el-col :span="24">
      <el-form :inline="true" class='el-InputForm'>
        <el-form-item style="width: 160px;">
          <el-input clearable
                    size="medium"
                    placeholder="请输入用户名称"
                    prefix-icon="el-icon-search"
                    v-model="SearchItem.name">
          </el-input>
        </el-form-item>
        <el-form-item v-if='!streetHide'>
          <el-select clearable size="medium" v-model="SearchItem.streetId" placeholder="请选择所属街道" @change='street'>
            <el-option
              v-for="item in streetList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if='!communitHide'>
          <el-select clearable size="medium" v-model="SearchItem.communityId" placeholder="请选择所属社区">
            <el-option
              v-for="item in communityList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 160px;">
          <el-input clearable
                    size="medium"
                    placeholder="请输入联系电话"
                    prefix-icon="el-icon-search"
                    v-model="SearchItem.phone">
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

export default {
  components: {
    tableForm
  },

  data() {
    return {
      streetList: [],
      communityList: [],
      sex: ['女', '男'],
      table: {
        list: {
          header: [
            {
              label: '用户名称',
              field: 'name'
            },
            {
              label: '所属街道',
              field: 'streetName'
            },
            {
              label: '所属社区',
              field: 'communityName'
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
              label: '创建时间',
              field: 'createTime'
            }
          ],

          data: [],

          operation: {
            label: '操作',
            event: [{
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
              }]
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
        streetId: '',
        phone: '',
        communityId: ''
      },
      lastItem: {
        name: '',
        streetId: '',
        phone: '',
        communityId: ''
      },
      streetHide: false,
      communitHide: false,
    }
  },

  mounted() {
    let that = this
    that.isSubmitLoading = true
    that.getList()
    that.getStreetList()
    that.showStreetAndCommunityButton()
  },

  methods: {
    // 街道列表
    async getStreetList() {
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
    async getCommunityList(val) {
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
    async showStreetAndCommunityButton() {
      const that = this
      try {
        const userIfo = this.common.session('currentUser')
        if (userIfo.id === 'admin') {
          this.streetHide = false
          this.communitHide = false
        }
        if (userIfo.streetId) {
          this.streetHide = true
          this.getCommunityList(userIfo.streetId)
        } else {
          this.getCommunityList()
        }
        if (userIfo.communityId) {
          this.communitHide = true
        }
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    street(val) {
      this.getCommunityList(val)
      this.SearchItem.communityId = ''
    },
    add() {
      document.name = '用户管理添加'
      this.$router.push({
        path: 'userAdd'
      })
    },
    edit(e) {
      document.name = '用户管理编辑'
      this.$router.push({
        path: 'userAdd',
        query: {
          id: e.id
        }
      })
    },
    SearchNoteList() {
      let that = this
      Object.entries(that.SearchItem).map((item, index) => {
        that.lastItem[item[0]] = that.SearchItem[item[0]]
      })
      this.table.paging.currentPage = 1
      this.getList()
    },
    // 列表
    async getList() {
      const that = this
      try {
        let findUrl = this.api.webadmin.findAll
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        let obj = {
          name: that.SearchItem.name,
          streetId: that.SearchItem.streetId,
          phone: that.SearchItem.phone,
          communityId: that.SearchItem.communityId
        }
        const response = await this.request.dataGet(that, url, obj)
        this.$refs.trigger.loading = false
        response.data.content.forEach(function (item, index) {
          if (item.sex) {
            item.sex = that.sex[item.sex]
          }
        })
        that.table.list.data = response.data.content
        that.table.paging.total = response.data.totalElements
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    // 删除
    delete(row) {
      const that = this
      that.$confirm('您确定要删除么?', '提示', {
        type: 'warning'
      }).then(async () => {
        let url = this.api.webadmin.delete + '?id=' + row.id
        let parameter = {}
        const response = await this.request.dataDelete(that, url, parameter)
        if (response.code === 1) {
          that.$message.success(response.msg)
          that.getList()
          return false
        }
        that.$message.error(response.msg)
      }).catch(() => {
        return false
      })
    },

    pageChange(val) {
      this.table.paging.limit = val.limit
      this.table.paging.currentPage = val.page
      this.getList()
    }
  }
}
</script>

<style lang="scss">
.flex {
  display: flex;
  padding-left: 4%;

  div {
    margin-right: 10%;
    font-size: 14px;
  }

  span {
    color: #85A7F0;
  }
}
</style>
