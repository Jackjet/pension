<template>
  <div class="header-name">
    <h2 class="logo-title">您好，欢迎来到天津市南开区智慧养老服务平台（{{title}}）</h2>
    <div class="display-title">
      <span>{{time}}</span> |
      <span>您好，{{name}}</span> |
      <span class="header-btn" @click="clickHome"><i class="el-icon-house"></i>首页</span>
      <span class="header-btn" @click="layout()"><i class="el-icon-switch-button"></i>注销</span>
      <span class="header-btn" @click="editPassword"><i class="el-icon-edit"></i>修改密码</span>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input type="password" v-model="ruleForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="ruleForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="again">
          <el-input type="password" v-model="ruleForm.again"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { userIfo, editPasswordApi } from '@/api/file.js';
import md5 from 'js-md5';
export default {
  data() {
    return {
      title: "",
      time: "",
      name: "",
      dialogVisible: false,
      ruleForm: {
        oldPassword: "",
        newPassword: "",
        again: "",
      },
      rules: {
        oldPassword: [{ required: true, message: '请填写旧密码', trigger: 'blur' }],
        newPassword: [{ required: true, message: '请填写新密码', trigger: 'blur' }],
        again: [{ required: true, message: '请填确认密码', trigger: 'blur' }],
      }
    }
  },
  watch: {
    $route(to, from) {
      this.title = sessionStorage.getItem("headerTitle");
      if (to === "/theElderly") {
        this.title = "居家养老补贴"
      } else if (to === "/birthday") {
        this.title = "90岁生日补贴"
      } else if (to === "/nutrition") {
        this.title = "百岁营养补贴"
      }
      document.getElementsByTagName('title')[0].text = this.title;
    }
  },
  created() {
    this.time = new Date().toLocaleDateString();
    this.name = userIfo().name;
  },
  methods: {
    clickHome() {
      if (this.title === '居家养老补贴') {
        this.$router.push('/theElderly')
      } else if (this.title === '90岁生日补贴') {
        this.$router.push('/birthday')
      } else if (this.title === '百岁营养补贴') {
        this.$router.push('/nutrition')
      }
    },
    layout() {
      localStorage.setItem('currentUser', 'autostringify-null')
      location.href = process.env.VUE_APP_URL + '/service/index.html#/login';
    },
    editPassword() {
      this.dialogVisible = true;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = {
            id: userIfo().id,
            oldPassword: md5(this.ruleForm.oldPassword),
            newPassword: md5(this.ruleForm.newPassword)
          }
          editPasswordApi(obj).then(res => {
            if (res.data.code === 1) {
              this.$message.success(res.data.msg)
              location.href = process.env.VUE_APP_URL + '/service/index.html#/login';
            } else {
              this.$message.error(res.data.msg)
            }
          })
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.header-name {
  width: 100%;
  height: 50px;
  min-height: 50px;
  background: $color1;
  color: $font-color1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  box-sizing: border-box;
  .display-title {
    font-size: $font-size12;
    span {
      margin: 10px;
    }
    .header-btn {
      cursor: pointer;
    }
  }
}
</style>
