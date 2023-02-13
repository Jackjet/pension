<!-- 公示结果 -->
<template>
  <div>
    <el-dialog title="上传公示结果" :visible.sync="dialogVisible" @close="resetForm('resultForm')" width="40%">
      <el-form :model="resultForm" ref="resultForm" label-width="170px" :rules="rules" class="demo-ruleForm">
        <el-form-item label="是否有异议" prop="dissent">
          <el-radio-group v-model="resultForm.dissent">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="resultForm.dissent" label="异议类型" prop="dissentType">
          <el-radio-group v-model="resultForm.dissentType">
            <el-radio :label="1">评估等级</el-radio>
            <el-radio :label="2">补贴材料</el-radio>
            <el-radio :label="3">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="resultForm.dissent" label="解决方式" prop="dissentRemark">
          <el-input type="textarea" placeholder="请填写解决方式" v-model="resultForm.dissentRemark"></el-input>
        </el-form-item>
        <el-form-item v-if="resultForm.dissent===0" label="公示文件" prop="publicityFile">
          <el-upload :action="actionUrl" :headers="headers" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
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
import { tokenStr, fileUrl, fileListData, streetList, communityList, userIfo } from "@/api/file.js"
import { publicityCheck } from '@/api/theElderly/list.js';
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
        dissent: 0,//是否有异议:0否，1是
        dissentType: null,//异议类型:1评估等级、2补贴材料、3其他
        dissentRemark: "",//解决方式
        publicityFile: [],//公示文件:JSON多文件
      },
      rules: {
        dissent: [{ required: true, message: '请选择是否有异议' },],
        dissentType: [{ required: true, message: '请选择异议类型' }],
        dissentRemark: [{ required: true, message: '请输入解决方式' }],
        publicityFile: [{ required: true, message: '请上传公示文件' }]
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {// row.orderNum
    open(data) {
      this.resultForm.orderNum = data;
      this.dialogVisible = true;
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      this.resultForm.publicityFile = fileListData(fileList);
      this.$nextTick(() => {
        this.$refs.resultForm.clearValidate('publicityFile');
      })
    },
    // 图片删除
    handleRemove(file, fileList) {
      this.resultForm.publicityFile = fileListData(fileList);
    },
    // 图片放大效果
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisibleImg = true;
    },
    // 上传公示结果
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.resultForm.publicityFile = JSON.stringify(this.resultForm.publicityFile);
          this.$confirm('温馨提示：请您仔细核实录入数据，申请过程中将无法修正！', '上传公示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            publicityCheck(this.resultForm).then(res => {
              if (res.data.code === 1) {
                this.$message.success('操作成功！');
                this.dialogVisible = false;
                this.$emit('initData');
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