<template>
  <!-- 注销申请 低于最低工资标准困难老人 -->
  <div class="business-apply-page">
    <business-process :dataList="applyList"></business-process>
    <basic-information ref="obtainSonData" :applyType="2" :type="1" :details="details" @formValue="formValue" @registerAddress="registerAddress" :bType="bType">
      <el-form ref="formSlot" :model="formSlot" :rules="rulesSlot" label-width="140px">
        <el-col :span="12">
          <el-form-item label="本人工资性收入(元)" prop="wagesIncome">
            <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="formSlot.wagesIncome" placeholder="本人工资性收入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本人经营性收入(元)" prop="businessIncome">
            <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="formSlot.businessIncome" placeholder="本人经营性收入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本人财产性收入(元)" prop="propertyIncome">
            <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="formSlot.propertyIncome" placeholder="本人财产性收入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本人转移性收入(元)" prop="transIncome">
            <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="formSlot.transIncome" placeholder="本人转移性收入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="赡养费(元)" prop="alimony">
            <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="formSlot.alimony" placeholder="赡养费"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="配偶是否健在" prop="spouseLie">
            <el-radio-group v-model="formSlot.spouseLie">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="formSlot.spouseLie">
          <el-form-item label="配偶月收入(元)" prop="spouseIncome">
            <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="formSlot.spouseIncome" placeholder="配偶月收入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本人月收入(元)" prop="monthlyIncome">
            <el-input disabled oninput="value=value.replace(/[^0-9.]/g,'')" v-model="formSlot.monthlyIncome" placeholder="本人月收入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="同户籍其他家庭成员收入总和(元)" prop="familiesSum" label-width="220px">
            <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="formSlot.familiesSum" placeholder="同户籍其他家庭成员收入总和"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="同户籍其他家庭成员人数(人)" prop="familiesNum" label-width="200px">
            <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="formSlot.familiesNum" placeholder="同户籍其他家庭成员人数"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="家庭人均收入(元)" prop="familiesAverageIncome">
            <el-input disabled oninput="value=value.replace(/[^0-9.]/g,'')" v-model="formSlot.familiesAverageIncome" placeholder="家庭人均收入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="不同户籍子女家庭人均收入" prop="unFamiliesAverageIncome" label-width="200px">
            <el-button type="primary" size="mini">添加</el-button>
            <TableList :table-data="tableData" v-loading="isSubmitLoading" :table-selection="tableSelection" :table-label="tableHeader" :table-option="tableOpction">
            </TableList>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="8">
              <el-form-item label="户籍地、区">
                <el-input value="南开区" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属街道" prop="homeStreetName" label-width="100px">
                <el-input v-model="formSlot.homeStreetName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属社区" prop="homeCommunityName" label-width="100px">
                <el-input v-model="formSlot.homeCommunityName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-form-item label="户籍地详细地址" prop="homeAddress">
            <el-input v-model="formSlot.homeAddress" :disabled="true" placeholder="请输入户籍地详细地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="8">
              <el-form-item label="现居住、区">
                <el-input value="南开区" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属街道" prop="streetName" label-width="100px">
                <el-input v-model="formSlot.streetName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属社区" prop="communityName" label-width="100px">
                <el-input v-model="formSlot.communityName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-form-item label="现住址" prop="address">
            <el-input v-model="formSlot.address" :disabled="true" placeholder="请输入现住址"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </basic-information>
    <div class="enclosure-file">
      <h2 class="enclosure-components-title">注销</h2>
      <el-form ref="cancellation" :model="cancellation" :rules="rulesCancellation" label-width="180px">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="注销类型" prop="cancelType">
              <el-radio-group v-model="cancellation.cancelType">
                <el-radio label="1">人口流动</el-radio>
                <el-radio label="2">去世</el-radio>
                <el-radio label="3">脱贫</el-radio>
                <el-radio label="4">其它</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="时间" prop="cancelDate">
              <el-date-picker v-model="cancellation.cancelDate" type="date" value-format="yyyy-MM-dd 00:00:00" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="凭证" prop="cancelFile">
              <el-upload v-model="cancellation.cancelFile" :action="actionUrl" :headers="headers" list-type="picture-card" :on-success="handleSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="注销原因" prop="cancelRemark">
              <el-input type="textarea" :rows="2" style="width:30%" placeholder="请输入内容" v-model="cancellation.cancelRemark">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        </el-row>
      </el-form>
    </div>
    <div class="enclosure-file">
      <h2 class="enclosure-components-title">申请单相关附件</h2>
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in imgList" :key="item.field">
          <div v-if="item.img">
            <div class="data-enclosure" v-for="(url,index) in item.img" :key="index">
              <p>
                <img :src="httpUrl+url.fileDownloadUri" alt="">
              </p>
              <h2>{{item.name}}</h2>
            </div>
          </div>
        </el-col>
        <!-- <el-col :span="6">
          <div class="data-enclosure">
            <p></p>
            <h2>申请书</h2>
          </div>
        </el-col> -->
      </el-row>
      <div class="from-btn">
        <el-button type="primary" @click="onSubmit">申请注销</el-button>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import BusinessProcess from "@/components/businessProcess";
import BasicInformation from "@/components/businessProcess/basicInformation";
import { tokenStr, fileUrl, fileListData, fileExhibition } from "@/api/file.js";
import { homeAgedCancel, findProcess, cancelEdit } from "@/api/theElderly/apply.js";
import TableList from "@/components/table";
import { getDate } from "@/assets/js/utils.js";
import { processCheck } from '@/api/theElderly/list.js';
export default {
  components: {
    TableList,
    BusinessProcess,
    BasicInformation
  },
  data() {
    return {
      bType: "1",
      dialogImageUrl: '',
      dialogVisible: false,
      headers: {
        Authorization: tokenStr()
      },
      httpUrl: process.env.VUE_APP_URL + '/',
      actionUrl: process.env.VUE_APP_URL + fileUrl(),
      applyList: [],
      // 传给子组件表单
      formSlot: {
        applyType: 2,//申请类别:1低保、低收入、优抚对象困难老人、2低于最低工资标准困难老人
        liveSubsidy: parseInt(this.$route.query.liveSubsidy),//是否已享受残疾人生活补贴:0否，1是	
        nursingSubsidy: parseInt(this.$route.query.nursingSubsidy),//是否已享受残疾人护理补贴:0否，1是	
        poorSubsidy: parseInt(this.$route.query.poorSubsidy),//是否已享受特困供养补贴:0否，1是

        wagesIncome: null,//本人工资性收入	
        businessIncome: null,//本人经营性收入	
        propertyIncome: null,//本人财产性收入	
        transIncome: null,//本人转移性收入	
        alimony: null,//赡养费	
        spouseLie: null,//配偶是否健在
        spouseIncome: null,//配偶月收入	
        familiesSum: null,//同一户籍其他家庭成员收入总和	
        familiesNum: null,//同一户籍其他家庭成员人数	
        monthlyIncome: null,//本人月收入	
        familiesAverageIncome: null,//家庭人均收入	
        unFamiliesAverageIncome: "", //不同户籍子女家庭人均收入

        homeStreetId: "",//户籍地街道Id	
        homeStreetName: "",//户籍地街道	
        homeCommunityId: "",//户籍地社区Id	
        homeCommunityName: "",//户籍地社区	
        homeAddress: "",//户籍详细地址	

        streetId: "",//现居地街道Id	
        streetName: "",//现居地街道	
        communityId: "",//现居地社区Id	
        communityName: "",//现居地社区	
        address: "",//现居地详细地址
      },
      rulesSlot: {
        homeStreetId: [{ required: true, message: '请选择户籍地街道', trigger: 'change' }],
        homeCommunityId: [{ required: true, message: '请选择户籍地社区', trigger: 'change' }],
        homeAddress: [{ required: true, message: '请输入户籍详细地址', trigger: 'change' }],
        streetId: [{ required: true, message: '请选择现居地街道', trigger: 'change' }],
        communityId: [{ required: true, message: '请选择现居地社区', trigger: 'change' }],
        address: [{ required: true, message: '请输入现居地详细地址', trigger: 'change' }],
      },
      // 注销数据
      cancellation: {
        cancelRemark: "",//注销原因
        cancelType: "",//注销类型
        cancelDate: "",//注销时间
        cancelFile: [],//注销凭证
      },
      rulesCancellation: {
        // cancelRemark: [{ required: true, message: '请填写注销原因', trigger: 'change' }],
        cancelType: [{ required: true, message: '请选择注销类型', trigger: 'change' }],
        cancelDate: [{ required: true, message: '请选择注销时间', trigger: 'change' }],
        // cancelFile: [{ required: true, message: '请上传注销凭证', trigger: 'change' }],
      },
      // 需要提交的整体表单
      submitObject: {},
      // 提交表单时判断 子组件 和 父组件的所有验证是否通过
      isSubmit: {
        childrenForm: false,
        formSlot: false,
        formFile: false,
      },
      // 需要展示申请单相关附件
      attachmentDisplay: [
        {
          name: "申请书",
          applicationFile: []
        },
        {
          name: "本人户口本资料",
          householdRegisterFile: []
        },
        {
          name: "本人身份证",
          idCardFile: []
        },
        {
          name: "本人户口本资料",
          cardFile: []
        },
        {
          name: "本人户口本资料",
          householdRegisterFile: []
        },
        {
          name: "本人户口本资料",
          householdRegisterFile: []
        },
        {
          name: "本人户口本资料",
          householdRegisterFile: []
        },
        {
          name: "本人户口本资料",
          householdRegisterFile: []
        },
      ],
      details: null,
      imgList: [],
      tableSelection: {
        key: true,
        type: "",
        detaile: false,
      },
      isSubmitLoading: false,
      tableData: [],
      tableHeader: [
        { label: "序号", list: "serialNumber" },
        { label: "与老人关系", list: "relationship" },
        { label: "姓名", list: "name" },
        { label: "不同户籍子女家庭人均收入（元）", list: "income", width: 200 },
        { label: "创建时间", list: "time" },
      ],
      tableOpction: {
        label: '操作',
        width: '220px',
        value: 1,
      }
    }
  },
  created() {
    this.initStatus();
  },
  mounted() {
    if (this.$route.query.idCard) {
      this.bType = "12"
    }
  },
  methods: {
    initStatus() {
      const that = this
      let data = getDate()
      findProcess({ businessType: 12, startTime: data }).then(res => {
        if (res.data.code === 1) {
          that.applyList.splice(0)
          res.data.data.forEach(item => {
            that.applyList.push({
              title: item.name,
              time: item.time,
              status: 0,
            })
          })
        }
      });
    },
    registerAddress(val) {
      this.imgList = fileExhibition(val);
      for (let item in this.formSlot) {
        this.formSlot[item] = val[item]
      }
      this.tableData = JSON.parse(this.formSlot.unFamiliesAverageIncome);
    },
    // 子组件中form值
    formValue(val) {
      // 子组件表单验证通过
      this.isSubmit.childrenForm = true;
      for (let key in val) {
        this.submitObject[key] = val[key];
      }
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      this.cancellation.cancelFile = fileListData(fileList);
      this.$refs.cancellation.clearValidate('cancelFile');
    },
    // 图片删除
    handleRemove(file, fileList, item) {
      this.cancellation.cancelFile = fileListData(fileList);
    },
    // 图片放大效果
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onSubmit() {
      // 调用子元素方法获取参数
      this.$refs.obtainSonData.fromDataFun('form');
      // 获取传给子组件中form的值
      this.$refs["formSlot"].validate((valid) => {
        if (valid) {
          // 传给子组件的表单验证通过
          this.isSubmit.formSlot = true;
          for (let key in this.formSlot) {
            this.submitObject[key] = this.formSlot[key];
          }
        } else {
          return false;
        }
      });
      this.$refs["cancellation"].validate((valid) => {
        if (valid) {
          // 注销数据的表单验证通过
          this.isSubmit.formFile = true;
          for (let key in this.cancellation) {
            this.submitObject[key] = this.cancellation[key];
          }
        } else {
          return false;
        }
      });
      // 当所有数据都验证同过可提交
      if (this.isSubmit.childrenForm && this.isSubmit.formSlot && this.isSubmit.formFile) {
        let arrID = [], arrName = [];
        this.submitObject.genreId.forEach(item => {
          arrID.push(item.id);
          arrName.push(item.name);
        })
        this.submitObject.genreName = JSON.stringify(arrName);
        this.submitObject.genreId = JSON.stringify(arrID);
        this.submitObject.cancelFile = JSON.stringify(this.cancellation.cancelFile);
        this.$confirm('温馨提示：请您仔细核实录入数据，申请过程中将无法修正！', '立即申请', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.$route.query.idCard) {
            this.submitObject.orderNum = this.$route.query.orderNum;
            cancelEdit(this.submitObject).then(res => {
              if (res.data.code === 1) {
                this.$alert('温馨提示：您好，您提交的申请已转交至下一环节，请您耐心等候。', '立即申请', {
                  confirmButtonText: '确定',
                  callback: () => {
                    this.$message.success(res.data.msg);
                    this.$router.push('/theElderly');
                  }
                });
              } else {
                this.$message.error(res.data.msg);
              }
            })
          } else {
            homeAgedCancel(this.submitObject).then(res => {
              if (res.data.code === 1) {
                this.$alert('温馨提示：您好，您提交的申请已转交至下一环节，请您耐心等候。', '立即申请', {
                  confirmButtonText: '确定',
                  callback: () => {
                    this.$message.success(res.data.msg);
                    processCheck({
                      orderNum: res.data.data,
                      status: 1,
                    }).then(response => { })
                    this.$router.push('/theElderly');
                  }
                });
              } else {
                this.$message.error(res.data.msg);
              }
            })
          }

        }).catch(() => { });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.business-apply-page {
  padding: 0 50px;
  .enclosure-file {
    margin-top: 20px;
    box-shadow: $back-shadow;
    border-radius: 5px;
    padding: 0 10px;
    box-sizing: border-box;
    .enclosure-components-title {
      line-height: 50px;
      color: $color1;
    }
    .from-btn {
      padding: 30px 0;
      text-align: center;
    }
    .data-enclosure {
      p {
        width: 200px;
        height: 200px;
        border: 1px solid #eee;
        border-radius: 5px;
        margin: auto;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      h2 {
        text-align: center;
        font-size: $font-size20;
        color: $font-color2;
        line-height: 50px;
      }
    }
  }
}
</style>
