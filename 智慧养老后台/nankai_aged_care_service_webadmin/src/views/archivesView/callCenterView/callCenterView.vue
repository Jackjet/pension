<template>
  <el-main class="agedDataView">
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
          <el-select clearable size="medium" v-model="SearchItem.homeStreetId" placeholder="请选择所属街道" @change="street">
            <el-option
              v-for="item in streetList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="items">
          <el-select clearable size="medium" v-model="SearchItem.homeCommunityId" placeholder="请选择所属社区">
            <el-option
              v-for="item in communityList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="items">
          <el-input clearable
            size="medium"
            placeholder="请输入联系电话"
            prefix-icon="el-icon-search"
            v-model="SearchItem.phone">
          </el-input>
        </el-form-item>
        <el-form-item class="items">
          <el-input clearable
            size="medium"
            placeholder="请输入身份证号"
            prefix-icon="el-icon-search"
            v-model="SearchItem.idCard">
          </el-input>
        </el-form-item>
        <el-form-item style="width: 330px;">
          <el-date-picker
            v-model="valueTime"
            size="medium"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="创建日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size='medium' icon="el-icon-search" @click="SearchNoteList">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size='medium' icon="el-icon-plus" @click="add" v-if="pathType==='1'">添加</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <!-- 表格 -->
      <tableForm
        ref="trigger"
        :table-form='table'
        @edit='edit'
        @details='details'
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
      table: {
        list: {
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
              label: '身份证号',
              field: 'idCard'
            },
            {
              label: '创建时间',
              field: 'createTime'
            },
            {
              type: 'operation',
              label: '操作',
              field: 'operation',
              width: '180'
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
        phone: '',
        idCard: '',
        startTime: '',
        endTime: ''
      },
      lastItem: {
        name: '',
        homeStreetId: '',
        homeCommunityId: '',
        phone: '',
        idCard: '',
        startTime: '',
        endTime: ''
      },
      tableList: [],
      pathType: '0'
    }
  },

  mounted () {
    if (this.$route.path === '/callCenterView') {
      this.pathType = '1'
    }
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
    add () {
      document.name = '呼叫中心老人信息添加'
      this.$router.push({
        path: 'callCenterAdd',
        query: {
          type: '0'
        }
      })
    },
    edit (row) {
      document.name = '呼叫中心老人信息编辑'
      this.$router.push({
        path: 'callCenterAdd',
        query: {
          id: row.id,
          type: '1'
        }
      })
    },
    details (row) {
      document.name = '呼叫中心老人信息详情'
      this.$router.push({
        path: 'callCenterAdd',
        query: {
          id: row.id,
          type: '2'
        }
      })
    },
    // 列表
    async getList () {
      const that = this
      try {
        let findUrl = this.api.ivr.findAll
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        if (this.SearchItem.startTime) {
          that.valueTime = [this.SearchItem.startTime, this.SearchItem.endTime]
        } else {
          that.valueTime = []
        }
        const response = await this.request.dataGet(that, url, this.SearchItem)
        this.$refs.trigger.loading = false
        response.data.content.forEach(item => {
          item.operation = [
            {
              label: '编辑',
              icon: 'el-icon-edit',
              click: 'edit'
            },
            {
              label: '详情',
              icon: 'el-icon-document',
              click: 'details'
            }
          ]
          if (this.pathType !== '1') {
            item.operation.splice(0, 1)
          }
          if (item.sex === '1') {
            item.sex = '男'
          }
          if (item.sex === '0') {
            item.sex = '女'
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
.agedDataView .items{
  width: 160px;
}
</style>
