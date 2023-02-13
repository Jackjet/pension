<template>
  <el-main class="approveView">
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
        <el-form-item class="items" v-if="streetIdSeen">
          <el-select clearable size="medium" v-model="SearchItem.homeStreetId" placeholder="请选择所属街道" @change="street">
            <el-option
              v-for="item in streetList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="items" v-if="communityIdSeen">
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
            placeholder="请输入老人类型"
            prefix-icon="el-icon-search"
            v-model="SearchItem.genreName">
          </el-input>
        </el-form-item>
        <el-form-item class="items">
          <el-select clearable size="medium" v-model="SearchItem.type" placeholder="请选择老人分类">
            <el-option label="普通老人" value="1"></el-option>
            <el-option label="居家老人" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="items">
          <el-select clearable size="medium" v-model="SearchItem.isValid" placeholder="请选择是否有效">
            <el-option label="否" value="0"></el-option>
            <el-option label="是" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="items">
          <el-input clearable
            size="medium"
            placeholder="请输入身份证号"
            prefix-icon="el-icon-search"
            v-model="SearchItem.idCard">
          </el-input>
        </el-form-item>
        <el-form-item class="items">
          <el-select clearable size="medium" v-model="SearchItem.optType" placeholder="请选择操作类型">
            <el-option label="居家老人申请" value="0"></el-option>
            <el-option label="普通申请居家养老" value="1"></el-option>
            <el-option label="居家养老材料数据更新" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="items">
          <el-select clearable size="medium" v-model="SearchItem.state" placeholder="请选择状态">
            <el-option label="待审核" value="0"></el-option>
            <el-option label="已驳回" value="1"></el-option>
            <el-option label="审核中" value="2"></el-option>
            <el-option label="已通过" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 330px;">
          <el-date-picker
            v-model="valueTime"
            size="medium"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="审批日期"
            end-placeholder="结束日期">
          </el-date-picker>
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
        @look="look"
        @details="details"
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
      streetIdSeen: false,
      communityIdSeen: false,
      streetList: [],
      communityList: [],
      valueTime: '',
      // 列表
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
              label: '老人类型',
              field: 'genreName'
            },
            {
              label: '老人分类',
              field: 'type'
            },
            {
              label: '是否有效',
              field: 'isValid'
            },
            {
              label: '身份证号',
              field: 'idCard'
            },
            {
              label: '操作类型',
              field: 'optType'
            },
            {
              label: '状态',
              field: 'state'
            },
            {
              label: '审批时间',
              field: 'approvalTime'
            },
            {
              type: 'operation',
              label: '操作',
              field: 'operation',
              width: '150'
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
        optType: '',
        state: '',
        name: '',
        homeStreetId: '',
        homeCommunityId: '',
        phone: '',
        genreId: '',
        isValid: '',
        idCard: '',
        startTime: '',
        endTime: ''
      },
      lastItem: {
        optType: '',
        state: '',
        name: '',
        homeStreetId: '',
        homeCommunityId: '',
        phone: '',
        genreId: '',
        isValid: '',
        idCard: '',
        startTime: '',
        endTime: ''
      }
    }
  },

  mounted () {
    const currentUser = this.common.session('currentUser')
    if (!currentUser.streetId && !currentUser.communityId) {
      this.streetIdSeen = true
      this.communityIdSeen = true
      this.getCommunityList()
    }
    if (currentUser.streetId && !currentUser.communityId) {
      this.communityIdSeen = true
      this.getCommunityList(currentUser.streetId)
    }
    this.getList()
    this.getStreetList()
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
      this.SearchItem.homeCommunityId = ''
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
    // 查看驳回原因
    look (row) {
      this.$alert(row.approvalRemark, '驳回原因', {
        confirmButtonText: '关闭',
        callback: action => {
        }
      })
    },
    // 详情
    details (row) {
      this.$router.push({
        path: 'myHaveApprovalDetails',
        query: {
          id: row.id,
          type: '5'
        }
      })
    },
    // 列表
    async getList () {
      const that = this
      try {
        let findUrl = this.api.approvalUser.findAllMeApproved
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        if (this.SearchItem.startTime) {
          that.valueTime = [this.SearchItem.startTime, this.SearchItem.endTime]
        } else {
          that.valueTime = []
        }
        const response = await this.request.dataGet(that, url, this.SearchItem)
        const userId = this.common.session('currentUser').id
        this.$refs.trigger.loading = false
        response.data.content.forEach(item => {
          item.operation = [
            {
              label: '详情',
              icon: 'el-icon-document',
              click: 'details'
            }
          ]
          if (item.sex === '1') {
            item.sex = '男'
          } else {
            item.sex = '女'
          }
          if (item.isValid === '1') {
            item.isValid = '是'
          } else {
            item.isValid = '否'
          }
          if (item.type === '1') {
            item.type = '普通老人'
          } else {
            item.type = '居家老人'
          }
          if (item.state === '0') {
            item.state = '待审核'
          }
          if (item.state === '2') {
            item.state = '审核中'
          }
          if (item.state === '1') {
            item.state = '已驳回'
            item.operation.push(
              {
                label: '查看驳回原因',
                icon: 'el-icon-view',
                click: 'look'
              }
            )
          }
          if (item.state === '3') {
            item.state = '已通过'
          }
          // 操作类型
          if (item.optType === '0') {
            item.optType = '居家老人申请'
          }
          if (item.optType === '1') {
            item.optType = '普通申请居家养老'
          }
          if (item.optType === '2') {
            item.optType = '居家养老材料数据更新'
          }
          const approvalUserId1 = item.approvalUserId1
          const approvalUserId2 = item.approvalUserId2
          if (item.approvalTime2) {
            if (userId === approvalUserId1) {
              item.approvalTime = item.approvalTime1
            }
            if (userId === approvalUserId2) {
              item.approvalTime = item.approvalTime2
            }
            if (userId === approvalUserId1 && userId === approvalUserId2) {
              item.approvalTime = item.approvalTime2
            }
            if (userId !== approvalUserId1 && userId !== approvalUserId2) {
              item.approvalTime = item.approvalTime2
            }
          } else {
            item.approvalTime = item.approvalTime1
          }
          if (item.genreName) {
            let str = ''
            let arr = JSON.parse(item.genreName)
            arr.forEach(items => {
              str += items + ','
            })
            item.genreName = str.substr(0, str.length - 1)
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
.approveView .items{
  width: 160px;
}
</style>
