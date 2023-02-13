<!-- 评估报告 -->
<template>
  <div>
    <el-dialog title="上传评估报告" :visible.sync="dialogVisible" @close="resetForm('resultForm')" width="40%">
      <el-form :model="resultForm" ref="resultForm" label-width="170px" :rules="rules" class="demo-ruleForm">
        <el-form-item label="是否需要生活照料" prop="lifeCare">
          <el-radio-group v-model="resultForm.lifeCare">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="resultForm.lifeCare" label="评估等级" prop="al">
          <el-select v-model="resultForm.al" clearable>
            <el-option label="轻度" value="1"></el-option>
            <el-option label="中度" value="2"></el-option>
            <el-option label="重度" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="resultForm.lifeCare" label="评估报告书" prop="assessFile">
          <el-upload :action="actionUrl" :headers="headers" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="resultForm.lifeCare===0" label="备注" prop="remark">
          <el-input style="width:80%" rows="5" type="textarea" v-model="resultForm.remark" placeholder="请输入备注"></el-input>
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
import { assessCheck } from '@/api/theElderly/list.js';
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
        lifeCare: 1,//是否需要生活照料:0否，1是
        al: null,//评估等级:1轻、2中、3重
        assessFile: [],//评估报告书:JSON多文件
        remark: "",//备注
      },
      rules: {
        lifeCare: [{ required: true, message: '请选择联审结果' }],
        al: [{ required: true, message: '请选择评估等级' }],
        assessFile: [{ required: true, message: '请上传评估报告书' }],
        remark: [{ required: true, message: '请输入备注' }],
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
      this.resultForm.assessFile = fileListData(fileList);
      this.$nextTick(() => {
        this.$refs.resultForm.clearValidate('assessFile');
      })
    },
    // 图片删除
    handleRemove(file, fileList) {
      this.resultForm.assessFile = fileListData(fileList);
    },
    // 图片放大效果
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisibleImg = true;
    },
    // 上传评估报告
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.resultForm.assessFile = JSON.stringify(this.resultForm.assessFile);
          this.$confirm('温馨提示：请您仔细核实录入数据，申请过程中将无法修正！', '上传评估报告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            assessCheck(this.resultForm).then(res => {
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