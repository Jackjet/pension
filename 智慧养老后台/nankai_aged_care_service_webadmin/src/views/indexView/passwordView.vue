<template>
  <el-main>
    <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="120px">
      <el-row class='el-row-el'>
        <el-col :offset="4" :span="14">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input v-model="infoForm.oldPassword" type='password' placeholder="请输入旧密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :offset="4" :span="14">
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="infoForm.newPassword" type='password' placeholder="请输入新密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :offset="4" :span="14">
          <el-form-item label="确认密码" prop="again">
            <el-input v-model="infoForm.again" type='password' placeholder="请输入确认密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="24">
          <el-form-item class="open_btn">
            <el-button @click="resetFields()">清空</el-button>
            <el-button type="primary" @click="submitForm('infoForm')">保存</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-main>
</template>

<script>
import md5 from 'js-md5'

export default {
  data() {
    return {
      infoForm: {
        oldPassword: '',
        newPassword: '',
        again: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        again: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(form) {
      let that = this
      that.$refs[form].validate(async (valid) => {
        if (valid) {
          if (that.infoForm.newPassword !== that.infoForm.again) {
            that.$message.error('新密码与确认密码输入不一致')
            return
          }
          try {
            let url = that.api.webadmin.updatePassword
            let obj = {
              id: that.common.session('currentUser').id,
              oldPassword: md5(that.infoForm.oldPassword),
              newPassword: md5(that.infoForm.newPassword)
            }
            let response = null
            response = await that.request.dataPut(that, url, obj)
            if (response.code === 1) {
              that.$message.success(response.msg)
              this.$router.push('/login')
            } else {
              that.$message.error(response.msg)
            }
          } catch (even) {
            // console.log(even)
          }
        }
      })
    },
    resetFields() {
      this.$refs['infoForm'].resetFields()
    }
  }
}
</script>

<style>
</style>
