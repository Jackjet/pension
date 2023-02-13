<!-- 公示结果 -->
<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" @close="resetForm('resultForm')" width="40%">
      <el-form :model="resultForm" ref="resultForm" :rules="rules" label-width="170px" class="demo-ruleForm">
        <el-form-item label="身份证号">
          <el-input type="textarea" :disabled='true' v-model="idCard"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input type="textarea" :disabled='true' v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input type="textarea" :disabled='true' v-model="phone"></el-input>
        </el-form-item>
        <el-form-item :label="grantDate" prop="grantDate">
          <el-date-picker
            v-model="resultForm.grantDate"
            :disabled='true'
            value-format='yyyy-MM'
            type="month"
            :placeholder="monthPl">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="remark" prop="remark">
          <el-input type="textarea" :placeholder="reasonPl" v-model="resultForm.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('resultForm')">确定</el-button>
          <el-button @click="resetForm('resultForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {tokenStr, fileUrl, fileListData, streetList, communityList, userIfo} from "@/api/file.js"
import { suspendOrStop } from "@/api/theElderly/list.js";

export default {
  components: {},
  data() {
    return {
      dialogVisible: false,
      resultForm: {
      },
      rules: {
        grantDate: [{ required: true, message: '请选择月份', trigger: 'change' }],
        remark: [{ required: true, message: '请输入原因', trigger: 'change' }],
      },
      grantDate:'',
      monthPl:'',
      remark:'',
      reasonPl:'',
      title:'',
      idCard:'',
      name:'',
      phone:'',
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {// row.orderNum
    open(row,title) {
      this.title = title
      this.idCard = row.idCard;
      this.name = row.name;
      this.phone = row.phone;
      this.resultForm.subsidyId = row.id
      this.resultForm.grantDate = new Date().getFullYear()+'-'+(new Date().getMonth()+1)
      if(title == '暂停发放'){
        this.remark = '暂停原因'
        this.reasonPl = '请填写暂停原因'
        this.grantDate = '暂停月份'
        this.monthPl = '请选择暂停月份'
        this.resultForm.grantStatus = '2'
      }else{
        this.remark = '停发原因'
        this.reasonPl = '请填写停发原因'
        this.grantDate = '停发月份'
        this.monthPl = '请选择停发月份'
        this.resultForm.grantStatus = '3'
      }
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          suspendOrStop(this.resultForm).then(res => {
            if (res.data.code === 1) {
              this.$message.success(this.title+'成功！');
              this.dialogVisible = false;
            } else {
              this.$message.error(res.data.msg);
            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    }
  }
}
</script>
<style lang='scss' scoped>
</style>