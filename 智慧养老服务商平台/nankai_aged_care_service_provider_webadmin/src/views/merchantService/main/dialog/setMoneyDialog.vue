<template>
  <el-main v-loading="loading">
    <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="190px">

      <el-row class='el-row-el'>
        <el-col :span="20">
          <el-form-item label="服务金额（元）" prop="money">
            <el-input v-model="infoForm.money">
              <!--<template slot="append">元</template>-->
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class='el-row-el'>
        <el-col :span="16">
          <el-form-item>
            <el-button type="primary" @click="deliver">确定</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-main>
</template>

<script>
export default {
  name: 'reissueDialog',
  props: [
    'infoForm'
  ],
  data () {
    var checkMoney = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('服务金额不可为空'))
      } else {
        const reg0 = /^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$/
        const reg1 = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1})$/
        const reg2 = /^\+?\d+$/
        if ((!reg0.test(value))&&(!reg1.test(value))&&(!reg2.test(value))) {
          callback(new Error('金额应为正整数或至多两位小数点正数'))
        } else {
          callback()
        }
      }
    }
    return {
      info: {

      },
      rules: {
        money: [ { required: true, validator: checkMoney, trigger: 'blur' } ]
      },
      loading: false
    }
  },
  methods: {
    cancel () {
      this.$emit('dialogCancel')
    },
    async deliver () {
      const that = this
      that.$refs['infoForm'].validate(async (valid) => {
        if (valid) {
          try {
            that.loading = true
            let url = that.api.merchantService.setMoney
            let obj = {
              'money': that.infoForm.money * 100,
              'id': that.infoForm.id
            }
            let response = await this.request.dataPut(that, url, obj)
            if (response.code === 1) {
              that.$message.success('设置服务金额成功')
              this.$emit('success')
              that.cancel()
            } else {
              that.$message.error(response.msg)
            }
            that.loading = false
          } catch (even) {
            console.log(even)
            that.$message.error('设置服务金额失败')
            that.loading = false
          }
        }
      })
    }
  }
}
</script>

