<template>
  <el-main v-loading="loading">
    <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="190px">
      <el-row class='el-row-el'>
        <el-col :span="20">
          <el-form-item label="身份证号" prop="idCard">
            <el-input v-model="infoForm.idCard" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="20">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="infoForm.name" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="20">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="infoForm.phone" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="20">
          <el-form-item label="退款月份" prop="month">
            <el-date-picker style="width: 100%" v-model="infoForm.month" :picker-options='pickerOptions' type="month" :editable='false' :clearable="false" value-format="yyyy-MM" placeholder="选择月份">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="20">
          <el-form-item label="退款金额" prop="money">
            <el-input v-model="infoForm.money">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="20">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" style="width: 100%" resize="none" :autosize="{ minRows: 3, maxRows: 3}" placeholder="请输入内容" v-model="infoForm.remark">
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
  data() {
    var checkMoney = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('退款金额不可为空'))
      } else {
        if (!(/^\+?\d+$/.test(this.infoForm.money))) {
          callback(new Error('退款金额只能为正整数'))
        } else {
          callback()
        }
      }
    }
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      rules: {
        idCard: [{ required: true, message: '身份证号不可为空', trigger: 'blur' }],
        name: [{ required: true, message: '姓名不可为空', trigger: 'blur' }],
        phone: [{ required: true, message: '联系电话不可为空', trigger: 'blur' }],
        month: [{ required: true, message: '退款月份不可为空', trigger: 'blur' }],
        money: [{ required: true, validator: checkMoney, trigger: 'blur' }]
      },
      loading: false
    }
  },
  methods: {
    cancel() {
      this.$emit('dialogCancel')
    },
    async deliver() {
      const that = this
      that.$refs['infoForm'].validate(async (valid) => {
        if (valid) {
          try {
            that.loading = true
            let url = that.api.userSubsidy.insert
            let obj = {
              "assessMoney": that.infoForm.money * 100,
              "month": that.infoForm.month,
              "optType": "2",
              "remark": that.infoForm.remark,
              "userId": that.infoForm.id
            }
            if (obj.month) {
              obj.month = obj.month + "-01 00:00:00"
            }
            let response = await this.request.dataPost(that, url, obj)
            if (response.code === 1) {
              that.$message.success("养老补贴退款成功")
              this.$emit('success')
              that.cancel()
            } else {
              that.$message.error(response.msg)
            }
            that.loading = false
          } catch (even) {
            // console.log(even)
            that.$message.error('数据获取失败')
            that.loading = false
          }
        }
      })
    }
  }
}
</script>
