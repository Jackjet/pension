<template>
  <el-main>
    <el-col :span="24" class="warp-main ta-l">
      <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="170px">
        <el-row class='el-row-el'>
          <el-col :span="14">
            <el-form-item label="账号" prop="code" class="label_input">
              <el-input v-model="infoForm.code" :disabled='disabled'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="14">
            <el-form-item label="联系电话" prop="phone" class="label_input">
              <el-input v-model="infoForm.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="14">
            <el-form-item label="性别" style="text-align: left;">
              <el-radio-group v-model="infoForm.sex">
                <el-radio label="1">男</el-radio>
                <el-radio label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="14">
            <el-form-item label="用户名称" prop="name" class="label_input">
              <el-input v-model="infoForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="14">
            <el-form-item label="用户类型" style="text-align:left">
              <el-select v-model="infoForm.userType" placeholder="请选择用户类型" clearable>
                <el-option label="社区" value="1">
                </el-option>
                <el-option label="街道" value="2">
                </el-option>
                <el-option label="第三方" value="3">
                </el-option>
                <el-option label="民政局" value="4">
                </el-option>
                <el-option label="社区审核员" value="5">
                </el-option>
                <el-option label="街道审核员" value="6">
                </el-option>
                <el-option label="民政审核员" value="7">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="14">
            <el-form-item label="所属街道" style="text-align:left">
              <el-select v-model="infoForm.streetId" placeholder="请选择所属街道" clearable @change='street'
                         :disabled="streetDisabled">
                <el-option v-for="item in streetList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="14">
            <el-form-item label="所属社区" style="text-align:left">
              <el-select v-model="infoForm.communityId" placeholder="请选择所属社区" clearable @change='community'
                         :disabled="communityDisabled">
                <el-option v-for="item in communityList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="14">
            <el-form-item label="所属网格" style="text-align:left" v-show='false'>
              <el-select v-model="infoForm.gridId" clearable placeholder="请选择所属网格">
                <el-option v-for="item in griddingList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="14">
            <el-form-item label="所属角色" prop="roleName" class="label_input">
              <el-input disabled v-model="infoForm.roleName" placeholder="请点击选择所属角色">
                <el-button slot="append" @click="openDeptClick">选择角色</el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el ta-c'>
          <el-col :span="14">
            <el-form-item class="el-button-el">
              <el-button type="primary" @click="onPageReturn">返回</el-button>
              <el-button type="primary" @click="onSubmit('infoForm')">保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-col>
    <dialog-form :isShow="isShow" :isBtn="false" :width="'50%'" title="所属角色" @closeDialog="closeDialog"
                 @saveDialog="saveDialog">
      <el-col :span="13" slot="form">
        <el-input clearable size="medium" placeholder="请输入角色名称" prefix-icon="el-icon-search" v-model="SearchItem.name"
                  class='search'>
        </el-input>
        <el-button type="primary" size='medium' icon="el-icon-search" @click="SearchNoteList">搜索</el-button>
      </el-col>
      <el-col :span="24" slot="form">
        <tableForm ref="trigger" :table-form='table' @pageChange='pageChange'>
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
  data() {
    return {
      id: '',
      isShow: false,
      disabled: false,
      streetDisabled: false,
      communityDisabled: false,
      streetList: [],
      communityList: [],
      griddingList: [],
      role: {},
      SearchItem: {
        name: ''
      },
      lastItem: {
        name: ''
      },
      infoForm: {
        code: '',
        phone: '',
        name: '',
        sex: '1',
        roleId: '',
        streetId: '',
        streetName: '',
        communityId: '',
        communityName: '',
        gridId: '',
        gridName: '',
        roleName: '',
        userType: ''
      },
      rules: {
        code: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        phone: [
          // { required: true, validator: this.common.isvalidlinkPhone, trigger: 'blur' }
          {required: true, message: '请输入联系方式', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入用户名称', trigger: 'blur'}
        ],
        roleName: [
          {required: true, message: '请选择所属角色', trigger: 'change'}
        ]
      },
      table: {
        list: {
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
      }
    }
  },

  mounted() {
    let that = this
    that.id = that.$route.query.id
    that.getStreetList()
    if (that.id) {
      that.getDetail()
      that.disabled = true
    }
  },

  methods: {
    async getDetail() {
      const that = this
      try {
        let findUrl = that.api.webadmin.findById
        let parameter = {id: that.id}
        const response = await that.request.dataGet(that, findUrl, parameter)
        if (response.code === 1) {
          that.infoForm = response.data
          this.getCommunityList(response.data.streetId)
          this.getGriddingList(response.data.communityId)
          return false
        }
        that.$message.error(response.msg)
      } catch (e) {
        that.$message.error('数据获取失败')
      }
    },
    SearchNoteList() {
      let that = this
      Object.entries(that.SearchItem).map((item, index) => {
        that.lastItem[item[0]] = that.SearchItem[item[0]]
      })
      this.table.paging.currentPage = 1
      this.getWebadminList()
    },
    async getWebadminList() {
      const that = this
      try {
        let findUrl = this.api.role.findAll
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        let obj = {
          name: this.SearchItem.name
        }
        const response = await this.request.dataGet(that, url, obj)
        this.$refs.trigger.loading = false
        that.table.list.data = response.data.content
        that.table.paging.total = response.data.totalElements
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    async getStreetList() {
      const that = this
      try {
        let url = this.api.street.findAll + '?page=1&size=1000000'
        let obj = {}
        const response = await this.request.dataGet(that, url, obj)
        that.streetList = response.data.content
        // 非管理员选择当前用户街道
        const userIfo = this.common.session('currentUser')
        if (that.id) {
          if (userIfo.streetId) {
            that.streetDisabled = true
          }
          if (userIfo.communityId) {
            that.communityDisabled = true
          }
        } else {
          if (userIfo.streetId) {
            that.infoForm.streetId = userIfo.streetId
            that.streetDisabled = true
            that.street(userIfo.streetId)
          }
          if (userIfo.communityId) {
            that.infoForm.communityId = userIfo.communityId
            that.communityDisabled = true
            that.community(userIfo.communityId)
          }
        }
      } catch (e) {
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
    // 社区列表
    async getGriddingList(val) {
      const that = this
      try {
        let url = this.api.grid.findAll + '?page=1&size=1000000'
        let obj = {
          communityId: val
        }
        const response = await this.request.dataGet(that, url, obj)
        that.griddingList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    street(val) {
      this.getCommunityList(val)
      this.infoForm.communityId = ''
      this.infoForm.communityName = ''
      this.infoForm.gridId = ''
      this.infoForm.gridName = ''
    },
    community(val) {
      this.getGriddingList(val)
      this.infoForm.gridId = ''
      this.infoForm.gridName = ''
    },
    openDeptClick() {
      this.isShow = true
      this.getWebadminList()
    },
    closeDialog() {
      this.isShow = false
      this.table.paging.currentPage = 1
      this.SearchItem.name = ''
    },
    saveDialog(row) {
      this.infoForm.roleId = row.id
      this.infoForm.roleName = row.name
      this.isShow = false
    },
    // 添加数据
    onSubmit(formValue) {
      let that = this

      that.$refs[formValue].validate(async (index) => {
        if (index === false) {
          return false
        }
        try {
          let url = that.api.webadmin.insert
          let obj = that.infoForm
          that.streetList.forEach(value => {
            if (value.id === obj.streetId) {
              obj.streetName = value.name
            }
          })
          that.communityList.forEach(value => {
            if (value.id === obj.communityId) {
              obj.communityName = value.name
            }
          })
          that.griddingList.forEach(value => {
            if (value.id === obj.gridId) {
              obj.gridName = value.name
            }
          })
          let response = null
          if (that.id) {
            url = that.api.webadmin.update
            obj.id = that.id
            if (!obj.streetId) {
              obj.streetName = ''
            }
            if (!obj.communityId) {
              obj.communityName = ''
            }
            if (!obj.gridId) {
              obj.gridName = ''
            }
            response = await this.request.dataPut(that, url, obj)
          } else {
            response = await this.request.dataPost(that, url, obj)
          }
          if (response.code === 1) {
            that.$message.success(response.msg)
            that.$router.push({path: 'userView'})
            return false
          }
          that.$message.error(response.msg)
        } catch (even) {
          that.$message.error('数据获取失败')
        }
      })
    },
    onPageReturn() {
      this.$router.push({path: 'userView'})
    },
    pageChange(val) {
      this.table.paging.limit = val.limit
      this.table.paging.currentPage = val.page
      this.getWebadminList()
    }
  }
}
</script>

<style scoped>
.el-main {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.hander {
  padding: 5px 0;
  margin-bottom: 10px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px dashed #999;
  color: #009966;
}

.el-radio__label {
  display: inline-block;
}

.search {
  width: 180px;
  margin-bottom: 15px;
  margin-right: 10px;
}

.el-dialog {
  margin-top: 7vh;
}
</style>
