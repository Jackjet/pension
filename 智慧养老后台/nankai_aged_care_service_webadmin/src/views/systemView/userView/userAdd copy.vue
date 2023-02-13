<template>
  <el-main>
    <template>
      <el-col :span="24" class="warp-main ta-l">
        <el-col :span="24">
          <tableForm
            ref="trigger"
            :table-form='table'
            @getList='getList'
            @pageChange='pageChange'>
          </tableForm>
        </el-col>
        <div @click="changeCheckbox">1231</div>
        <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="170px">
          <el-row class='el-row-el'>
            <el-col :span="14">
              <el-form-item label="用户名称" prop="nickName" class="label_input">
                <el-input v-model="infoForm.nickName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='el-row-el'>
            <el-col :span="14">
              <el-form-item label="性别" style="text-align: left;">
                <el-radio v-model="infoForm.sex" label="1">是</el-radio>
                <el-radio v-model="infoForm.sex" label="0">否</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='el-row-el'>
            <el-col :span="14">
              <el-form-item label="联系电话" prop="linkPhone" class="label_input">
                <el-input v-model="infoForm.linkPhone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='el-row-el'>
            <el-col :span="14">
              <el-form-item label="所属街道" style="text-align:left">
                <el-select v-model="infoForm.streetId" :disabled="id ? true : false" placeholder="请选择所属街道">
                  <el-option
                    v-for="item in streetList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='el-row-el'>
            <el-col :span="14">
              <el-form-item label="所属社区" style="text-align:left">
                <el-select v-model="infoForm.communityId" :disabled="id ? true : false" placeholder="请选择所属社区">
                  <el-option
                    v-for="item in communityList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='el-row-el'>
            <el-col :span="14">
              <el-form-item label="所属网格" style="text-align:left">
                <el-select v-model="infoForm.gridId" :disabled="id ? true : false" placeholder="请选择所属网格">
                  <el-option
                    v-for="item in griddingList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='el-row-el'>
            <el-col :span="14">
              <el-form-item label="所属角色" prop="nickName" class="label_input">
                <el-input v-model="infoForm.nickName" placeholder="请点击选择部门">
                  <el-button slot="append" @click="openDeptClick">选择角色</el-button>
                </el-input>
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
      <dialog-form :isShow="isShow" :isBtn="true" :width="'50%'" title="所属角色" @closeDialog="closeDialog" @saveDialog="saveDialog">
        <el-col :span="24" slot="form">
          <tableForm
            ref="trigger"
            :table-form='table'
            @getList='getList'
            @pageChange='pageChange'>
          </tableForm>
        </el-col>
      </dialog-form>
    </template>
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
      streetList: [],
      communityList: [],
      griddingList: [],
      infoForm: {
        name: '',
        password: '',
        nickName: '',
        role: []
      },
      rules: {
        name: [
          { required: true, message: '请输入用户账号', trigger: 'blur' }
        ],
        linkPhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ]
      },
      table: {
        list: {
          header: [
            {
              width: '50',
              type: 'checked',
              field: 'checked'
            },
            {
              label: '角色名称',
              field: 'id'
            },
            {
              label: '描述',
              field: 'name'
            },
            {
              label: '创建时间',
              field: 'createTime'
            }
          ],

          data: []
        },

        paging: {
          total: 0,
          currentPage: 1,
          limit: 20
        }
      }
    }
  },

  mounted () {
    let that = this
    that.id = that.$route.query.id
    this.getStreetList()
    this.getCommunityList()
    this.getGriddingList()
    this.getList()
  },

  methods: {
    changeCheckbox () {
      console.log(this.table.list.data)
    },
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
    async getCommunityList () {
      const that = this
      try {
        let url = this.api.community.findAll + '?page=1&size=1000000'
        let obj = {}
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
        let url = this.api.grid.findAll + '?page=1&size=1000000'
        let obj = {}
        const response = await this.request.dataGet(that, url, obj)
        that.griddingList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    // 所属角色
    async getList () {
      const that = this
      try {
        let findUrl = this.api.category.findAll
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        let obj = {}
        const response = await this.request.dataGet(that, url, obj)
        that.$refs.trigger.loading = false
        response.data.content.forEach(item => {
          // let checked0 = false
          // item.permission = [{
          //   label: '',
          //   value: 0,
          //   checked: checked0
          // }]
          item.checked = false
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
    },
    openDeptClick () {
      this.isShow = true
      this.getList()
    },
    closeDialog () {
      this.isShow = false
    },
    saveDialog () {
      console.log(this.table.list.data)
      // this.isShow = true
    },
    // 获取详细信息
    async dateil () {
      const that = this
      try {
        let url = this.api.userDepartment.findById + '?id=' + that.id
        const response = await this.request.dataGet(that, url, {})
        let Data = response.data.data
        let deptArr = Data.deptName.split('.')
        that.infoForm.name = Data.name
        that.infoForm.pwd = Data.password
        that.infoForm.nickName = Data.nickName
        that.openDeptId = Data.deptId
        that.openDeptName.push(deptArr[deptArr.length - 1])
        that.infoForm.duty = Data.duty
        if (Data.role !== '' && Data.role !== null) {
          that.infoForm.role = Data.role.split(',')
        }
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    // 添加数据
    onSubmit (formValue) {
      let that = this
      that.$refs[formValue].validate(async (index) => {
        if (index === false) {
          return false
        }
        try {
          let url = that.api.userlogin.insert
          let role = ''
          if (that.infoForm.role.length) {
            role = that.infoForm.role.join(',')
          } else {
            that.$message.warning('必须选择一项权限')
            return false
          }
          let obj = {
            name: that.infoForm.name,
            password: that.infoForm.password,
            nickName: that.infoForm.nickName,
            deptId: that.openDeptId,
            role: role
          }
          let response = null
          if (that.id) {
            url = that.api.userlogin.update
            obj.id = that.id
            response = await this.request.dataPut(that, url, obj)
          } else {
            response = await this.request.dataPost(that, url, obj)
          }
          if (response.code === 1) {
            that.$message.success(response.msg)
            that.$router.push({ path: 'userView' })
            return false
          }
          that.$message.error(response.msg)
        } catch (even) {
          that.$message.error('数据获取失败')
        }
      })
    },

    onPageReturn () {
      this.$router.push({ path: 'userView' })
    }
  }
}
</script>

<style>
  .dept .el-input__inner{
    cursor: pointer !important;
  }
  .el-pagination {
    margin: 0px;
    padding: 0px
  }

  .warp-main{
    margin-top: 90px;
  }

</style>
