<template>
    <div class='loginBack'>
        <div>
            <ul class="circles">
                <li v-for="index in 10" :key="index"></li>
            </ul>
        </div>
        <el-container>
            <el-main v-loading="loading">
                <div class="title" style="margin-top: 100px">
                    <span>忘记密码</span>
                </div>
                <el-form class='login-container' :rules="changePsdR" ref="form"
                         :model="forgetInfo"
                         label-position='left'
                         label-width='0px'>
                    <div class='containers'>
                        <el-form-item prop='phone'>
                            <el-input type='text'
                                      clearable
                                      v-model="forgetInfo.phone"
                                      auto-complete='off' placeholder="账号">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop='code'>
                            <el-input
                                    clearable
                                    style="width: 50%;float: left"
                                    v-model="forgetInfo.code"
                                    auto-complete='off' placeholder="验证码">
                            </el-input>
                            <el-button type="button"
                                       style="float: right"
                                       @click="sendcode"
                                       :disabled="disabled"
                                       v-if="disabled===false">发送验证码
                            </el-button>
                            <el-button type="button"
                                       style="float: right"
                                       @click="sendcode"
                                       :disabled="disabled"
                                       v-if="disabled===true">
                                {{btntxt}}
                            </el-button>
                        </el-form-item>
                        <el-form-item prop='password'>
                            <el-input type='password'
                                      clearable
                                      v-model="forgetInfo.password"
                                      auto-complete='off' placeholder="新密码">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop='passwordAgain'>
                            <el-input type='password'
                                      clearable
                                      v-model="forgetInfo.passwordAgain"
                                      auto-complete='off' placeholder="确认新密码">
                            </el-input>
                        </el-form-item>
                        <el-form-item class='Percentage'>
                            <el-button type="primary" @click="submitForm('form')">提交</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </el-main>
        </el-container>
    </div>

</template>

<script>
import md5 from 'js-md5'
export default {
  name: 'forget',
  data () {
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('账号不可为空'))
      } else {
        if (!(/^1[3456789]\d{9}$/.test(this.forgetInfo.phone))) {
          callback(new Error('账号有误'))
        } else {
          callback()
        }
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认新密码不可为空'))
      } else if (value !== this.forgetInfo.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      /**
       * 表单验证规则
       */
      changePsdR: {
        code: [{ required: true, message: '验证码不可为空', trigger: 'blur' }],
        password: [{ required: true, message: '新密码不可为空', trigger: 'blur' }],
        passwordAgain: [{ validator: validatePass, trigger: 'blur' }],
        phone: [{ validator: validatePhone, trigger: 'blur' }]
      },
      forgetInfo: {
        phone: '',
        code: '',
        password: '',
        passwordAgain: ''
      },
      disabled: false,
      time: 0,
      btntxt: '重新发送',
    }
  },
  methods: {
    //手机验证发送验证码
    async sendcode () {

      const that = this
      const reg = /^1[3456789]\d{9}$/
      if (that.forgetInfo.phone === '') {
        this.$message({
          message: '账号不能为空',
          center: true
        })
        return
      }
      if(!reg.test(that.forgetInfo.phone)){
        this.$message({
          message: '账号格式错误',
          center: true
        })
        return
      }
      try {
        let obj = {
          "operation": "forgetPwd",
          'phone': that.forgetInfo.phone,
          'source': 'web',
        }
        let url = this.api.userlogin.sendSMS
        const response = await this.request.dataPost(that, url, obj)
        if (response.code === 1) {
          that.$message.success(response.msg)
          that.time = 60
          that.disabled = true
          that.timer()
        } else {
          that.$message.error(response.msg)
        }
      } catch (even) {
        that.$message.error('发送失败')
      }
    },
    //60S倒计时
    timer () {
      if (this.time > 0) {
        this.time--
        this.btntxt = this.time + 's后重新获取'
        setTimeout(this.timer, 1000)
      } else {
        this.time = 0
        this.btntxt = '获取验证码'
        this.disabled = false
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit()
        } else {
          return false
        }
      })
    },
    async submit () {
      const that = this
      try {
        let obj = {
          'code': that.forgetInfo.code,
          'password': md5(that.forgetInfo.password),
          'phone': that.forgetInfo.phone,
          'source': 'web',
        }
        let url = this.api.userlogin.forgetPwd
        that.loading = true
        const response = await this.request.dataPut(that, url, obj)
        if (response.code === 1) {
          that.$message.success(response.msg)
          history.go(-1)
        } else {
          that.$message.error(response.msg)
          that.loading = false
        }
      } catch (even) {
        that.$message.error('数据上传失败')
        that.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
    @import '../../assets/base/login.scss';
</style>

