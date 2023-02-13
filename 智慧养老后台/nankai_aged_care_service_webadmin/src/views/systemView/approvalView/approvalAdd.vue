<template>
  <el-main>
    <el-col :span="24" class="warp-main ta-l">
      <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="170px">
        <el-row class='el-row-el'>
          <el-col :span="15">
            <el-form-item label="当前角色" prop="roleName" class="label_input">
              <el-input v-model="infoForm.roleName" disabled></el-input>
              <el-button :disabled="id ? true : false" type="primary" @click="chooseuser(1)">选择角色</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="16">
            <el-form-item label="一级审批角色" prop="approvalRoleName1" class="label_input">
              <el-input v-model="infoForm.approvalRoleName1" disabled></el-input>
              <el-button type="primary" @click="chooseuser(2)">选择一级审批角色</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="18">
            <el-form-item label="一级审批人" prop="approvalUserName1" class="label_input">
              <el-input v-model="infoForm.approvalUserName1" disabled></el-input>
              <el-button type="primary" @click="chooseName(4)">选择一级审批人</el-button>
              <el-button type="primary" @click="clear(0)">清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="18">
            <el-form-item label="二级审批角色" prop="approvalRoleName2" class="label_input">
              <el-input v-model="infoForm.approvalRoleName2" disabled></el-input>
              <el-button type="primary" @click="chooseuser(3)">选择二级审批角色</el-button>
              <el-button type="primary" @click="clear(1)">清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="18">
            <el-form-item label="二级审批人" prop="approvalUserName2" class="label_input">
              <el-input v-model="infoForm.approvalUserName2" disabled></el-input>
              <el-button type="primary" @click="chooseName(5)">选择二级审批人</el-button>
              <el-button type="primary" @click="clear(2)">清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el ta-c'>
          <el-col :span="14">
            <el-form-item class="el-button-el">
              <el-button type="primary" @click="onPageReturn">返回</el-button>
              <el-button type="primary"  @click="onSubmit('infoForm')">保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-col>
    <!-- 角色 -->
    <dialog-form :isShow="isShow" :isBtn="false" :width="'50%'" title="选择角色" @closeDialog="closeDialog" @saveDialog="saveDialog">
      <el-col :span="11" slot="form">
        <el-input clearable
                  size="medium"
                  placeholder="请输入角色名称"
                  prefix-icon="el-icon-search"
                  v-model="SearchItem.name"
                  class='search'>
        </el-input>
        <el-button type="primary" size='medium' icon="el-icon-search" @click="SearchNoteList">搜索</el-button>
      </el-col>
      <el-col :span="24" slot="form">
        <tableForm
          ref="trigger"
          :table-form='table'
          @pageChange='pageChange'>
        </tableForm>
      </el-col>
    </dialog-form>
    <dialog-form :isShow="isLook" :isBtn="false" :width="'50%'" title="选择审批人" @closeDialog="closeDialog" @saveDialog="saveDialog1">
      <el-col class='left' :span="24" slot="form">
        <el-input clearable
                  size="medium"
                  placeholder="请输入用户名称"
                  prefix-icon="el-icon-search"
                  v-model="SearchItem1.name"
                  class='search'>
        </el-input>
        <el-input clearable
                  size="medium"
                  placeholder="请输入联系电话"
                  prefix-icon="el-icon-search"
                  v-model="SearchItem1.phone"
                  class='search'>
        </el-input>
        <el-select v-model="SearchItem1.streetId"  placeholder="请选择所属街道" clearable @change='street'>
          <el-option
            v-for="item in streetList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col class='left' :span="24" slot="form">
        <el-select v-model="SearchItem1.communityId" placeholder="请选择所属社区" clearable>
          <el-option
            v-for="item in communityList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button style=" margin-bottom: 15px;" type="primary" size='medium' icon="el-icon-search" @click="SearchNoteList1">搜索</el-button>
      </el-col>
      <el-col :span="24" slot="form">
        <tableForm
          ref="trigger1"
          :table-form='table1'
          @pageChange='pageChange1'>
        </tableForm>
      </el-col>
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
      id: '',
      isShow: false,
      isLook: false,
      num: '',
      infoForm: {
        approvalRoleId1: '',
        approvalRoleId2: '',
        approvalRoleName1: '',
        approvalRoleName2: '',
        approvalUserId1: '',
        approvalUserId2: '',
        approvalUserName1: '',
        approvalUserName2: '',
        roleId: '',
        roleName: ''
      },
      role: {},
      user: {},
      streetList: [],
      communityList: [],
      griddingList: [],
      rules: {
        roleName: [
          { required: true, message: '请选择当前角色', trigger: 'change' }
        ],
        approvalRoleName1: [
          { required: true, message: '请选择一级审批角色', trigger: 'change' }
        ]
      },
      table1: {
        list: {
          type: '',
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
              label: '确定',
              icon: 'el-icon-edit',
              method: (row) => {
                this.saveDialog1(row)
              }
            }]
          }
        },
        paging: {
          total: 0,
          currentPage: 1,
          limit: 10
        }
      },
      table: {
        list: {
          type: '',
          header: [
            {
              label: '角色名称',
              field: 'name'
            },
            {
              label: '描述',
              field: 'remark'
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
              label: '确定',
              icon: 'el-icon-edit',
              method: (row) => {
                this.saveDialog(row)
              }
            }]
          }
        },
        paging: {
          total: 0,
          currentPage: 1,
          limit: 10
        }
      },
      SearchItem: {
        name: ''
      },
      lastItem: {
        name: ''
      },
      SearchItem1: {
        name: '',
        phone: '',
        streetId: '',
        communityId: ''
      },
      lastItem1: {
        name: '',
        streetId: '',
        communityId: ''
      }
    }
  },

  mounted () {
    let that = this
    that.id = that.$route.query.id
    this.getGriddingList()
    this.getCommunityList()
    if (that.id) {
      this.getDetail()
    }
  },

  methods: {
    async getDetail () {
      const that = this
      try {
        let findUrl = this.api.approval.findById
        let obj = {
          id: that.id
        }
        const response = await this.request.dataGet(that, findUrl, obj)
        that.infoForm = response.data
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    chooseuser (num) {
      const that = this
      that.num = num
      that.isShow = true
      that.SearchItem.name = ''
      that.table.paging.currentPage = 1
      that.getWebadminList()
    },
    chooseName (num) {
      const that = this
      that.num = num
      if (that.num === 4 && that.infoForm.approvalRoleName1 === '') {
        that.$message.warning('请先选择一级审批角色')
        return
      }
      if (that.num === 5 && that.infoForm.approvalRoleName2 === '') {
        that.$message.warning('请先选择二级审批角色')
        return
      }
      that.isLook = true
      that.SearchItem1.name = ''
      that.SearchItem1.streetId = ''
      that.SearchItem1.communityId = ''
      that.SearchItem1.phone = ''
      that.table1.paging.currentPage = 1
      that.getroleList()
    },
    street (val) {
      this.getCommunityList(val)
      this.SearchItem1.communityId = ''
    },
    // 审批角色列表
    async getWebadminList () {
      const that = this
      try {
        let findUrl = this.api.role.findAll
        let url = findUrl + '?page=' + that.table.paging.currentPage + '&size=' + that.table.paging.limit
        let obj = {
          name: that.SearchItem.name
        }
        const response = await this.request.dataGet(that, url, obj)
        this.$refs.trigger.loading = false
        that.table.list.data = response.data.content
        that.table.paging.total = response.data.totalElements
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    async getroleList () {
      const that = this
      try {
        let findUrl = this.api.webadmin.findAll
        let url = findUrl + '?page=' + that.table1.paging.currentPage + '&size=' + that.table1.paging.limit
        let obj = {
          name: that.SearchItem1.name,
          phone: that.SearchItem1.phone,
          streetId: that.SearchItem1.streetId,
          communityId: that.SearchItem1.communityId,
        }
        if (that.num === 4) {
          obj.roleId = that.infoForm.approvalRoleId1
        } else if (that.num === 5) {
          obj.roleId = that.infoForm.approvalRoleId2
        }
        const response = await this.request.dataGet(that, url, obj)
        response.data.content.forEach((item) => {
          if (item.sex === '0') {
            item.sex = '女'
          } else if (item.sex === '1') {
            item.sex = '男'
          } else {
            item.sex = ''
          }
        })
        this.$refs.trigger1.loading = false
        that.table1.list.data = response.data.content
        that.table1.paging.total = response.data.totalElements
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
      this.getWebadminList()
    },
    SearchNoteList1 () {
      let that = this
      Object.entries(that.SearchItem1).map((item, index) => {
        that.lastItem1[item[0]] = that.SearchItem1[item[0]]
      })
      this.table.paging.currentPage = 1
      this.getroleList()
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
    // 社区列表
    async getGriddingList () {
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
    closeDialog () {
      this.isShow = false
      this.isLook = false
    },
    saveDialog (row) {
      if (this.num === 1) {
        this.infoForm.roleId = row.id
        this.infoForm.roleName = row.name
      } else if (this.num === 2) {
        this.infoForm.approvalRoleId1 = row.id
        this.infoForm.approvalRoleName1 = row.name
        this.infoForm.approvalUserId1 = ''
        this.infoForm.approvalUserName1 = ''
      } else if (this.num === 3) {
        this.infoForm.approvalRoleId2 = row.id
        this.infoForm.approvalRoleName2 = row.name
        this.infoForm.approvalUserId2 = ''
        this.infoForm.approvalUserName2 = ''
      }
      this.isShow = false
    },
    saveDialog1 (row) {
      if (this.num === 4) {
        this.infoForm.approvalUserId1 = row.id
        this.infoForm.approvalUserName1 = row.name
      } else if (this.num === 5) {
        this.infoForm.approvalUserId2 = row.id
        this.infoForm.approvalUserName2 = row.name
      }
      this.isLook = false
    },
    // 添加数据
    onSubmit (formValue) {
      let that = this
      that.$refs[formValue].validate(async (index) => {
        if (index === false) {
          return false
        }
        try {
          let url = that.api.approval.insert
          let obj = that.infoForm
          let response = null
          if (that.id) {
            url = that.api.approval.update
            obj.id = that.id
            response = await this.request.dataPut(that, url, obj)
          } else {
            response = await this.request.dataPost(that, url, obj)
          }
          if (response.code === 1) {
            that.$message.success(response.msg)
            that.$router.push({ path: 'approvalView' })
            return false
          }
          that.$message.error(response.msg)
        } catch (even) {
          that.$message.error('数据获取失败')
        }
      })
    },
    onPageReturn () {
      this.$router.push({ path: 'approvalView' })
    },
    pageChange (val) {
      this.table.paging.limit = val.limit
      this.table.paging.currentPage = val.page
      this.getWebadminList()
    },
    pageChange1 (val) {
      this.table1.paging.limit = val.limit
      this.table1.paging.currentPage = val.page
      this.getroleList()
    },
    clear (num) {
      if (num === 0) {
        this.infoForm.approvalUserId1 = ''
        this.infoForm.approvalUserName1 = ''
      } else if (num === 1) {
        this.infoForm.approvalRoleId2 = ''
        this.infoForm.approvalRoleName2 = ''
      } else if (num === 2) {
        this.infoForm.approvalUserId2 = ''
        this.infoForm.approvalUserName2 = ''
      }
    }
  }
}
</script>

<style scoped>
  .el-main{
    padding-top:0!important;
    padding-bottom:0!important;
  }
  .hander{
    padding: 5px 0;
    margin-bottom: 10px;
    text-align: left;
    font-size: 14px;
    border-bottom: 1px dashed #999;
    color:#009966;
  }
  .el-input {
    width: 370px;
  }
  .el-button {
    margin-left: 10px;
  }
  .el-form-item {
    text-align: left;
  }
  .search {
    width: 180px;
    margin-bottom: 15px;
    margin-right: 10px;
  }
  .el-dialog {
    margin-top: 7vh;
  }

  .left {
    text-align: left;
    margin-left: 10px;
  }
</style>
