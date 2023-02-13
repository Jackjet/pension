<template>
    <el-row class='container'>
        <headers v-bind:index="showDown" @changePsd="changePsdMethod"></headers>
        <sidebar></sidebar>
        <el-scrollbar class='content-box' :class="{'content-collapse':collapse}"  :key="path">
            <div class="content">
                <div class='header_title'>
                    <div class="collapse-btn" @click="collapseChage">
                        <i v-if="!collapse" class="el-icon-s-fold"></i>
                        <i v-else class="el-icon-s-unfold"></i>
                    </div>
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item>{{ title.title }}</el-breadcrumb-item>
                        <el-breadcrumb-item
                                v-if="this.title.name !== '' && this.title.name !== undefined">{{title.name}}
                        </el-breadcrumb-item>
                        <el-breadcrumb-item
                                v-if="this.title.slots !== '' && this.title.name !== '' && this.title.slots !== undefined && this.title.name !== undefined">
                            {{title.slots}}
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <transition name="el-fade-in-linear">
                    <div>
                        <router-view></router-view>
                    </div>
                </transition>
            </div>
        </el-scrollbar>

        <div v-if="dialog.changePsd" class="dialog">
            <el-dialog
                    :visible.sync="dialog.changePsd" custom-class="customWidth">
                <el-form ref="form" :model="changePsd" :rules="rules.changePsdR" label-width="190px">

                    <el-row class='el-row-el'>
                        <el-col :span="20">
                            <el-form-item label="旧密码" prop="oldPassword">
                                <el-input clearable
                                          size="medium"
                                          type='password'
                                          placeholder="请输入旧密码"
                                          v-model="changePsd.oldPassword">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row class='el-row-el'>
                        <el-col :span="20">
                            <el-form-item label="新密码" prop="newPassword">
                                <el-input clearable
                                          size="medium"
                                          type='password'
                                          placeholder="请输入新密码"
                                          v-model="changePsd.newPassword">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class='el-row-el'>
                        <el-col :span="20">
                            <el-form-item label="确认密码" prop="newPasswordAgain">
                                <el-input clearable
                                          size="medium"
                                          type='password'
                                          placeholder="请输入确认密码"
                                          v-model="changePsd.newPasswordAgain">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class='el-row-el'>
                        <el-col :span="16">
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('form')">提交</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>
        </div>
    </el-row>
</template>

<script>
import headers from 'template/header'
import sidebar from 'template/navMenu'
import transmit from 'directive/transmit'
import md5 from 'js-md5'

export default {
  components: { sidebar, headers },

  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.changePsd.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        changePsdR: {
          oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
          newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
          newPasswordAgain: [{ required: true,validator: validatePass, trigger: 'blur' }]
        }
      },
      changePsd: {
        oldPassword: '',
        newPassword: '',
        newPasswordAgain: ''
      },
      dialog: {
        changePsd: false
      },
      collapse: false,
      title: this.$route.meta,
      showDown: true,
      info: {},
      path: this.$route.path
    }
  },

  mounted () {
    this.onresizes()

    window.onresize = () => {
      return (() => {
        /**
         * 动态获取屏幕宽度 控制导航伸缩
         */
        this.onresizes()
      })()
    }
  },

  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getInfo()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    async getInfo () {
      const that = this
      try {
        let url = that.api.provider.basicInformation
        let obj = {}
        const response = await that.request.dataGet(that, url, obj)
        that.info.id = response.data.id
        that.modifyPassWord()
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },

    /**
     * PUT 请求修改密码
     * @param url 请求地址
     * @param parameter 请求参数
     */
    async modifyPassWord () {
      const that = this
      try {
        let url = that.api.provider.updatePassword
        let obj = {
          id: that.info.id,
          oldPassword: md5(that.changePsd.oldPassword),
          newPassword: md5(that.changePsd.newPassword)
        }
        const response = await this.request.dataPut(this, url, obj)
        if (response.code === 1) {
          // 修改成功 自定义提示语
          this.$message.success('密码修改成功')

          // 清除用户信息重新登录
          this.common.session('currentUser', null)

          // 返回登陆 重新登陆账户
          this.$router.push('/login')
        } else {
          that.$message.error(response.msg)
        }
      } catch (err) {
        this.$message.error(err.msg)
      }
    },
    changePsdMethod () {
      this.dialog.changePsd = true
      this.changePsd.oldPassword = ''
      this.changePsd.newPassword = ''
      this.changePsd.newPasswordAgain = ''
    },
    /**
     * 控制柄触发导航伸缩 显示对应图标
     */
    collapseChage () {
      if (document.body.clientWidth <= 700) {
        return false
      }
      this.collapse = !this.collapse

      // 向父组件传递参数
      transmit.$emit('collapse', this.collapse)
    },

    onresizes () {
      if (document.body.clientWidth <= 700) {
        this.collapse = true
      }

      if (document.body.clientWidth <= 500) {
        this.showDown = false
      } else {
        this.showDown = true
      }

      transmit.$emit('collapse', this.collapse)
    }
  },

  watch: {
    $route (route) {
      this.title = route.meta
      this.path = route.path
    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'base/index.scss';
</style>
<style lang="less">
    //你的覆盖样式
    .dialog .el-dialog .customWidth{
        width:40% ;
        height: 600px
    }
    .dialog .el-dialog{
        display: flex;
        flex-direction: column;
        margin:0 !important;
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        /*height:600px;*/
        max-height:calc(100% - 30px);
        max-width:calc(100% - 30px);
    }
    .dialog .el-dialog .el-dialog__body{
        flex:1;
        overflow: auto;
        padding: 0;
    }
</style>
