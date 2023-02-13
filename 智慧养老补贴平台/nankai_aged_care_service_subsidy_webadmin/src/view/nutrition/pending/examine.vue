<!-- 联审结果 -->
<template>
  <div>
    <el-dialog title="上传联审结果" :visible.sync="dialogVisible" @close="resetForm('resultForm')" width="40%">
      <el-form :model="resultForm" ref="resultForm" :rules="rules" label-width="170px" class="demo-ruleForm">
        <el-form-item label="联审结果" prop="jointAudit">
          <el-radio-group v-model="resultForm.jointAudit">
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="2">驳回</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="resultForm.jointAudit===1" label="联审文件" prop="jointAuditFile">
          <el-upload :action="actionUrl" :headers="headers" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="resultForm.jointAudit===1" label="评估机构" prop="assessOrg">
          <el-select v-model="resultForm.assessOrg" clearable>
            <el-option value="第三方"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="resultForm.jointAudit===2" label="驳回原因" prop="remark">
          <el-input style="width:80%" rows="5" type="textarea" v-model="resultForm.remark" placeholder="请输入驳回原因"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('resultForm')">确定</el-button>
          <el-button @click="resetForm('resultForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleImg">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { unionCheck } from '@/api/theElderly/list.js';
import { tokenStr, fileUrl, fileListData, streetList, communityList, userIfo } from "@/api/file.js"
export default {
  components: {},
  data() {
    return {
      headers: {
        Authorization: tokenStr()
      },
      actionUrl: process.env.VUE_APP_URL + fileUrl(),
      imageUrl: "",
      dialogVisible: false,
      dialogVisibleImg: false,
      dialogImageUrl: "",
      resultForm: {
        orderNum: "",//单号
        jointAudit: 1,//联审结果:1通过,2驳回
        jointAuditFile: [],//联审文件:JSON多文件
        assessOrg: "",//第三方机构
        remark: "",//驳回意见
      },
      rules: {
        jointAudit: [{ required: true, message: '请选择联审结果' },],
        // jointAuditFile: [{ required: true, message: '请上传联审文件' },],
        assessOrg: [{ required: true, message: '请选择评估机构' },],
        remark: [{ required: true, message: '请输入驳回原因' },],
      }
    }
  },
  created() { },
  mounted() { },
  methods: {// row.orderNum
    open(data) {
      this.resultForm.orderNum = data;
      this.dialogVisible = true;
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      this.resultForm.jointAuditFile = fileListData(fileList);
      this.$nextTick(() => {
        this.$refs.resultForm.clearValidate('jointAuditFile');
      })
    },
    // 图片删除
    handleRemove(file, fileList) {
      this.resultForm.jointAuditFile = fileListData(fileList);
    },
    // 图片放大效果
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisibleImg = true;
    },
    // 上传联审结果
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.resultForm.jointAuditFile = JSON.stringify(this.resultForm.jointAuditFile);
          this.$confirm('温馨提示：请您仔细核实录入数据，申请过程中将无法修正！', '上传联审', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            unionCheck(this.resultForm).then(res => {
              if (res.data.code === 1) {
                this.$message.success('操作成功！');
                this.dialogVisible = false;
                this.$emit('initData')
              } else {
                this.$message.error(res.data.msg);
              }
            })
          }).catch(() => { });
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