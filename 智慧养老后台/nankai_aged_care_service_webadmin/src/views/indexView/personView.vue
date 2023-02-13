<template>
  <el-main>
    <el-form ref="infoForm" :model="infoForm"  label-width="120px">
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="账号">
            <el-input v-model="infoForm.code" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="手机号">
            <el-input v-model="infoForm.phone" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="性别">
            <el-input v-model="infoForm.sex" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="用户名称">
            <el-input v-model="infoForm.name" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="所属街道">
            <el-input v-model="infoForm.streetName" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="所属社区">
            <el-input v-model="infoForm.communityName" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="所属网格">
            <el-input v-model="infoForm.gridName" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="所属角色">
            <el-input v-model="infoForm.roleName" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-main>
</template>

<script>


export default {
  data () {
    return {
      infoForm: {
        code: '',
        phone: '',
        sex: '',
        name: '',
        streetName: '',
        communityName: '',
        gridName: '',
        roleName: ''
      }
    }
  },

  mounted () {
    this.getList()
  },

  methods: {
    async getList () {
      let that = this
      try {
        let findUrl = that.api.webadmin.findById
        let parameter = {
          id: that.common.session('currentUser').id
        }
        let response = await that.request.dataGet(that, findUrl, parameter)
        if (response.code === 1) {
          if (response.data.sex === '0') {
            response.data.sex = '女'
          } else if (response.data.sex === '1') {
            response.data.sex = '男'
          } else {
            response.data.sex = ''
          }
          that.infoForm = response.data
        }
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    }
  }
}
</script>

<style>
  .upload-demo {
    float: left;
  }
  .img{
    width: 220px;
    height: 220px;
  }
</style>
