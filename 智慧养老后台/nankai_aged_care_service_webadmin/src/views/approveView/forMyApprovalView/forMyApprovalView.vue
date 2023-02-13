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
            start-placeholder="申请日期"
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
        @pageChange='pageChange'>
      </tableForm>
    </el-col>
    <!-- 驳回原因 -->
    <dialog-form :isShow="isShow" :isBtn="true" :width="'30%'" :title="title" @closeDialog="closeDialog" @saveDialog="saveDialog">
      <el-form slot="form" ref="form" :model="form" :rules="remarkRules" label-width="90px">
        <el-col :span="24">
          <el-form-item label="驳回原因" prop="approvalRemark">
            <el-input type="textarea" size="medium" autocomplete="off" v-model="form.approvalRemark">
            </el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </dialog-form>
  </el-main>
</template>

<script>
import tableForm from 'plugin/table'
import dialogForm from 'plugin/dialogForm'

export default {
  components: {
    tableForm,
    dialogForm
  },

  data () {
    return {
      streetIdSeen: false,
      communityIdSeen: false,
      streetList: [],
      communityList: [],
      id: '',
      isShow: false,
      title: '',
      valueTime: '',
      // 驳回原因
      form: {
        approvalRemark: ''
      },
      remarkRules: {
        approvalRemark: [
          { required: true, message: '请输入驳回原因', trigger: ['blur'] }
        ]
      },
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
              label: '申请时间',
              field: 'createTime'
            }
          ],

          data: [],

          operation: {
            label: '操作',
            event: [
              {
                label: '审核',
                icon: 'el-icon-view',
                method: (row) => {
                  document.name = '老人审核'
                  this.$router.push({
                    path: 'forMyApprovalDetails',
                    query: {
                      id: row.id,
                      type: '4'
                    }
                  })
                }
              },
              {
                label: '通过',
                icon: 'el-icon-finished',
                method: (row) => {
                  this.pass(row)
                }
              },
              {
                label: '驳回',
                icon: 'el-icon-refresh',
                method: (row) => {
                  this.reject(row, 0)
                }
              },
              {
                label: '详情',
                icon: 'el-icon-document',
                method: (row) => {
                  document.name = '老人详情'
                  this.$router.push({
                    path: 'forMyApprovalDetails',
                    query: {
                      id: row.id,
                      type: '5'
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
    // 通过
    pass (row) {
      const that = this
      that.$confirm('您确定要通过么？', '提示', {
        type: 'warning'
      }).then(async () => {
        let url = this.api.approvalUser.approved + '?id=' + row.id
        let obj = {
          // id: row.id
        }
        const response = await this.request.dataPut(that, url, obj)
        if (response.code === 1) {
          that.$message.success('已完成审批')
          that.getList()
          return false
        }
        that.$message.error(response.msg)
      }).catch((response) => {
        that.$message.error(response.msg)
      })
    },
    // 驳回
    reject (row) {
      this.id = row.id
      this.title = '驳回原因'
      this.isShow = true
    },
    closeDialog () {
      this.isShow = false
      this.$refs['form'].resetFields()
      this.form.approvalRemark = ''
    },
    saveDialog () {
      const that = this
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          try {
            let url = that.api.approvalUser.rejected
            let obj = {
              id: that.id,
              approvalRemark: that.form.approvalRemark
            }
            let response = await this.request.dataPut(that, url, obj)
            if (response.code === 1) {
              that.$message.success('已完成审批')
              that.closeDialog()
              that.getList()
              return false
            }
            that.$message.error(response.msg)
          } catch (even) {
            that.$message.error('数据获取失败')
          }
        }
      })
    },
    // 列表
    async getList () {
      const that = this
      try {
        let findUrl = this.api.approvalUser.findAllPendingMeApproval
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        if (this.SearchItem.startTime) {
          that.valueTime = [this.SearchItem.startTime, this.SearchItem.endTime]
        } else {
          that.valueTime = []
        }
        const response = await this.request.dataGet(that, url, this.SearchItem)
        this.$refs.trigger.loading = false
        response.data.content.forEach(item => {
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
            item.type = '已驳回'
          }
          if (item.state === '3') {
            item.type = '已通过'
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
