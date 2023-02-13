<template>
  <div class='loginBack'>
    <div>
      <ul class="circles">
        <li v-for="index in 10" :key="index"></li>
      </ul>
    </div>
    <el-container>
      <el-main>
        <div class="title" style="margin-top: 100px">
          <span>您好，欢迎来到天津市南开区智慧养老服务商管理端</span>
        </div>
        <el-form class='login-container' :rules="loginRules" ref="loginForm" :model="loginForm" label-position='left' label-width='0px'>
          <div class='containers'>
            <el-form-item prop='phone'>
              <el-input type='text' clearable v-model.number="loginForm.phone" maxlength='11' auto-complete='off' placeholder="账 号">
              </el-input>
            </el-form-item>
            <el-form-item prop='passWord'>
              <el-input type='passWord' clearable v-model="loginForm.passWord" auto-complete='off' placeholder="密 码">
              </el-input>
            </el-form-item>
            <div>
              <el-checkbox class="remember" v-model="checked">记住密码</el-checkbox>
              <label style="float: right;color: mediumblue;font-size: 14px;text-decoration: underline;cursor:pointer" @click="forget">忘记密码？</label>
            </div>
            <el-form-item class='Percentage'>
              <el-button type="primary" id='isloginBut' :loading="isBtnLoading" @keyup.enter.native="inloginSign('loginForm')" @click="inloginSign('loginForm')">
                {{loginBtnClick}}
              </el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-main>
    </el-container>
    <!--<div class='copyright'>-->
    <!--Copyright <i class='Admin Admin-banquan'></i> 2019 辽宁云领计算机科技有限公司-->
    <!--</div>-->
  </div>
</template>

<script>
import md5 from 'js-md5'

export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
        // if (!(/^1[3456789]\d{9}$/.test(this.loginForm.phone))) {
        //   callback(new Error('账号有误'))
        // } else {
        //   callback()
        // }
      }
    }
    return {
      /**
       *  @param phone 定义登录账号
       *  @param passWord 定义登陆密码
       */
      loginForm: {
        phone: '',
        passWord: ''
      },

      /**
       * 表单验证规则
       */
      loginRules: {
        phone: [{ required: true, validator: checkPhone, trigger: 'blur' }],
        passWord: [{
          required: true,
          message: '请输入密码',
          trigger: 'change'
        }]
      },

      // 记录是否记录密码状态
      checked: '',
      isBtnLoading: false // 登陆状态
    }
  },

  computed: {
    loginBtnClick() {
      if (this.isBtnLoading) return '登录中...'
      return '登 录'
    }
  },

  mounted() {
    const cookie = this.cookies.get('phone')
    /**
     * 如果存在 cookie 默认为表单赋值
     */
    if (cookie) {
      this.loginForm = {
        phone: cookie.phone,
        passWord: cookie.passWord
      }

      // 开启记住密码 默认勾选状态
      this.checked = true
      return false
    }

    this.checked = false
  },

  created() {
    document.onkeydown = even => {
      const keyCode = even.keyCode
      const KeyUrl = this.$route.path
      /**
       * 回车事件触发登陆按钮 请求登陆
       */
      if (keyCode === 13 && this.loginForm.phone !== '' && this.loginForm.passWord !== '' && KeyUrl === '/login') {
        document.getElementById('isloginBut').click()
      }
    }
  },

  methods: {
    async login(SignUrl, SignData) {
      this.cookies.set('theme', 'blackGreen')
      try {
        const result = await this.request.signGET(this, SignUrl, SignData)

        // 登陆成功 用户信息存储
        this.common.session('currentUser', result.data)
        this.$router.push('/index')
      } catch (err) {
        this.isBtnLoading = false
        // 登陆失败 信息回掉
        this.$message.error(err.msg)
      }
    },

    inloginSign(ValParam) {
      if (this.checked) {
        /**
         * 初始化当前Cookie 是否存在
         * @param CookieName 账号字段
         * @param CookiePwd  密码字段
         * @param exdays  保存时间
         * 设置Cookie有效期 以字符串拼接形式
         */
        this.cookies.set('phone', this.loginForm, -1)
      } else {
        // 清除后添加Cookie 设置Cookie参数
        this.clearCookie()
      }

      this.$refs[ValParam].validate((index) => {
        /**
         * @param ValParam
         * 验证表单信息是否符合规则
         */
        if (index === false && typeof (index) === 'boolean') {
          return false
        }

        this.isBtnLoading = true
        const parameter = {
          phone: this.loginForm.phone,
          password: md5(this.loginForm.passWord)
        }

        const url = this.api.userlogin.login
        /**
         * @param parameter Data参数
         * @param url 请求接口路径
         * Form表单请求登陆 POST 不携带token
         */

        this.login(url, parameter)
      })
    },

    clearCookie: function () {
      this.cookies.remove('phone')
    },

    forget: function () {
      const that = this
      that.$router.push({
        name: 'forgetPsd'
      })
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/base/login.scss";
</style>
