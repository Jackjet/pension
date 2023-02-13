<template>
  <!-- 评估等级更新（低于最低工资标准困难老人） -->
  <div class="business-salary-page">
    <business-process :dataList="applyList"></business-process>
    <basic-information ref="obtainSonData" :applyType="2" :type="1" @formValue="formValue" @registerAddress="registerAddress" @cardTypeChange="cardTypeChange" :bType="bType">
      <el-form ref="formSlot" :model="formSlot" :rules="rulesSlot" label-width="140px">
        <el-col :span="12">
          <el-form-item label="本人工资性收入(元)" prop="wagesIncome" label-width="150px">
            <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="formSlot.wagesIncome" placeholder="本人工资性收入" @input="numberChange"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本人经营性收入(元)" prop="businessIncome" label-width="150px">
            <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="formSlot.businessIncome" placeholder="本人经营性收入" @input="numberChange"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本人财产性收入(元)" prop="propertyIncome" label-width="150px">
            <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="formSlot.propertyIncome" placeholder="本人财产性收入" @input="numberChange"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本人转移性收入(元)" prop="transIncome" label-width="150px">
            <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="formSlot.transIncome" placeholder="本人转移性收入" @input="numberChange"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="赡养费(元)" prop="alimony">
            <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="formSlot.alimony" placeholder="赡养费" @input="numberChange"></el-input>
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
            <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="formSlot.spouseIncome" placeholder="配偶月收入" @input="numberChange1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本人月收入(元)" prop="monthlyIncome">
            <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="formSlot.monthlyIncome" placeholder="本人月收入" @input="numberChange1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="同户籍其他家庭成员收入总和(元)" prop="familiesSum" label-width="230px">
            <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="formSlot.familiesSum" placeholder="同户籍其他家庭成员收入总和" @input="numberChange1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="同户籍其他家庭成员人数(人)" prop="familiesNum" label-width="200px">
            <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="formSlot.familiesNum" placeholder="同户籍其他家庭成员人数" @input="numberChange1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="家庭人均收入(元)" prop="familiesAverageIncome">
            <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="formSlot.familiesAverageIncome" placeholder="家庭人均收入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="不同户籍子女家庭人均收入" prop="unFamiliesAverageIncome" label-width="200px">
            <el-button type="primary" size="mini" @click="familyPersonnel">添加</el-button>
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
              <el-form-item label="所属街道" prop="homeStreetId" label-width="100px">
                <el-select size="medium" v-model="sqjd1" value-key="id" placeholder="所属街道" @change="homeStreetIdHandle">
                  <el-option v-for="item in streetData" :label="item.name" :value="item" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属社区" prop="homeCommunityId" label-width="100px">
                <el-select size="medium" v-model="sqjd2" value-key="id" placeholder="所属社区" @change="homeCommunityIdHandle">
                  <el-option v-for="item in communityData" :label="item.name" :value="item" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-form-item label="户籍地详细地址" prop="homeAddress">
            <el-input v-model="formSlot.homeAddress" placeholder="请输入户籍地详细地址"></el-input>
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
              <el-form-item label="所属街道" prop="streetId" label-width="100px">
                <el-select size="medium" v-model="sqjd3" value-key="id" placeholder="所属街道" @change="streetNameHandle">
                  <el-option v-for="item in streetData" :label="item.name" :value="item" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属社区" prop="communityId" label-width="100px">
                <el-select size="medium" v-model="sqjd4" value-key="id" placeholder="所属社区" @change="communityIdHandle">
                  <el-option v-for="item in communityData1" :label="item.name" :value="item" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-form-item label="现住址" prop="address">
            <el-input v-model="formSlot.address" placeholder="请输入现住址"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </basic-information>
    <div class="enclosure-file">
      <h2 class="enclosure-components-title">申请单相关附件</h2>
      <el-form ref="formFile" :model="fileJson" :rules="formFileRules" label-width="180px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="申请表" prop="applicationFile">
              <el-upload :file-list="imgListUrl.applicationFile" :action="actionUrl" :headers="headers" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="(file, fileList)=>handleRemove(file, fileList,'applicationFile')" :on-success="(response, file, fileList)=>handleSuccess(response, file, fileList,'applicationFile')">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="本人户口本资料" prop="householdRegisterFile">
              <el-upload :file-list="imgListUrl.householdRegisterFile" :action="actionUrl" :headers="headers" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="(file, fileList)=>handleRemove(file, fileList,'householdRegisterFile')" :on-success="(response, file, fileList)=>handleSuccess(response, file, fileList,'householdRegisterFile')">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="本人身份证" prop="idCardFile">
              <el-upload :file-list="imgListUrl.idCardFile" :action="actionUrl" :headers="headers" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="(file, fileList)=>handleRemove(file, fileList,'idCardFile')" :on-success="(response, file, fileList)=>handleSuccess(response, file, fileList,'idCardFile')">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="银行卡信息" :prop="cardType===2?'cardFile':''">
              <el-upload :file-list="imgListUrl.cardFile" :action="actionUrl" :headers="headers" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="(file, fileList)=>handleRemove(file, fileList,'cardFile')" :on-success="(response, file, fileList)=>handleSuccess(response, file, fileList,'cardFile')">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="承诺书" prop="promiseFile">
              <el-upload :file-list="imgListUrl.promiseFile" :action="actionUrl" :headers="headers" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="(file, fileList)=>handleRemove(file, fileList,'promiseFile')" :on-success="(response, file, fileList)=>handleSuccess(response, file, fileList,'promiseFile')">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="本人及家庭成员近三个月银行流水" prop="familiesBankFlowFile">
              <el-upload :file-list="imgListUrl.familiesBankFlowFile" :action="actionUrl" :headers="headers" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="(file, fileList)=>handleRemove(file, fileList,'familiesBankFlowFile')" :on-success="(response, file, fileList)=>handleSuccess(response, file, fileList,'familiesBankFlowFile')">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="辅助证件" prop="assistFile">
              <el-upload :file-list="imgListUrl.assistFile" :action="actionUrl" :headers="headers" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="(file, fileList)=>handleRemove(file, fileList,'assistFile')" :on-success="(response, file, fileList)=>handleSuccess(response, file, fileList,'assistFile')">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="委托书" prop="consignerFile">
              <el-upload :file-list="imgListUrl.consignerFile" :action="actionUrl" :headers="headers" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="(file, fileList)=>handleRemove(file, fileList,'consignerFile')" :on-success="(response, file, fileList)=>handleSuccess(response, file, fileList,'consignerFile')">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="委托人身份证" prop="consignerIdCardFile">
              <el-upload :file-list="imgListUrl.consignerIdCardFile" :action="actionUrl" :headers="headers" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="(file, fileList)=>handleRemove(file, fileList,'consignerIdCardFile')" :on-success="(response, file, fileList)=>handleSuccess(response, file, fileList,'consignerIdCardFile')">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="变更登记申请书" prop="changeRegistrFile">
              <el-upload :file-list="imgListUrl.changeRegistrFile" :action="actionUrl" :headers="headers" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="(file, fileList)=>handleRemove(file, fileList,'changeRegistrFile')" :on-success="(response, file, fileList)=>handleSuccess(response, file, fileList,'changeRegistrFile')">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="佐证材料" prop="evidenceFile">
              <span style="color:red">申请人健在照片</span>
              <el-upload :file-list="imgListUrl.evidenceFile" v-model="fileJson.evidenceFile" :action="actionUrl" :headers="headers" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="(file, fileList)=>handleRemove(file, fileList,'evidenceFile')" :on-success="(response, file, fileList)=>handleSuccess(response, file, fileList,'evidenceFile')">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="from-btn">
          <el-button type="primary" @click="onSubmit('formFile')">立即申请</el-button>
        </div>
      </el-form>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-dialog title="不同户籍子女家庭人均收入" :visible.sync="isFamilyDialog" width="30%" :before-close="handleClose">
      <el-form :model="family" :rules="familyRules" ref="family" label-width="100px" class="demo-ruleForm">
        <el-form-item label="与老人关系" prop="relationship">
          <el-input v-model="family.relationship" :disabled="isDisabled" placeholder="与老人关系"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="family.name" :disabled="isDisabled" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="收入(元)" prop="income">
          <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="family.income" :disabled="isDisabled" placeholder="收入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="isFamilyDialog = false">取 消</el-button>
          <el-button type="primary" @click="familyDialogSubmit('family')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import BusinessProcess from "@/components/businessProcess";
import BasicInformation from "@/components/businessProcess/basicInformation";
import TableList from "@/components/table";
import { tokenStr, fileUrl, fileListData, streetList, communityList, userIfo } from "@/api/file.js";
import { homeAgedUpdateAl, findProcess, homeAgedUpdateAlEdit } from "@/api/theElderly/apply.js";
import { getDate } from "@/assets/js/utils.js";
import { processCheck } from '@/api/theElderly/list.js';
export default {
  components: {
    BusinessProcess,
    BasicInformation,
    TableList
  },
  data() {
    return {
      bType: "1",
      dialogImageUrl: '',
      dialogVisible: false,
      headers: {
        Authorization: tokenStr()
      },
      actionUrl: process.env.VUE_APP_URL + fileUrl(),
      // status  1完成至那一步 0 未完成
      applyList: [],
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
        wagesIncome: [{ required: true, message: '请输入本人工资性收入', trigger: 'change' }],
        businessIncome: [{ required: true, message: '请输入本人经营性收入', trigger: 'change' }],
        propertyIncome: [{ required: true, message: '请输入本人财产性收入', trigger: 'change' }],
        transIncome: [{ required: true, message: '请输入本人转移性收入', trigger: 'change' }],
        alimony: [{ required: true, message: '请输入赡养费', trigger: 'change' }],
        spouseLie: [{ required: true, message: '请选中配偶是否健在', trigger: 'change' }],
        spouseIncome: [{ required: true, message: '请输入配偶月收入', trigger: 'change' }],
        familiesSum: [{ required: true, message: '请输入同一户籍其他家庭成员收入总和', trigger: 'change' }],
        familiesNum: [{ required: true, message: '请输入同一户籍其他家庭成员人数', trigger: 'change' }],
        monthlyIncome: [{ required: true, message: '请输入本人月收入', trigger: 'change' }],
        familiesAverageIncome: [{ required: true, message: '请输入家庭人均收入', trigger: 'change' }],

        homeStreetId: [{ required: true, message: '请选择户籍地街道', trigger: 'change' }],
        homeCommunityId: [{ required: true, message: '请选择户籍地社区', trigger: 'change' }],
        homeAddress: [{ required: true, message: '请输入户籍详细地址', trigger: 'change' }],
        streetId: [{ required: true, message: '请选择现居地街道', trigger: 'change' }],
        communityId: [{ required: true, message: '请选择现居地社区', trigger: 'change' }],
        address: [{ required: true, message: '请输入现居地详细地址', trigger: 'change' }],
      },
      formFileRules: {
        applicationFile: [{ required: true, message: '请上传申请表', trigger: 'change' }],
        householdRegisterFile: [{ required: true, message: '请上传本人户口本资料', trigger: 'change' }],
        idCardFile: [{ required: true, message: '请上传本人身份证', trigger: 'change' }],
        cardFile: [{ required: true, message: '请上传存折/银行卡信息', trigger: 'change' }],
        changeRegistrFile: [{ required: true, message: '请上传变更登记申请书', trigger: 'change' }],
        evidenceFile: [{ required: true, message: '请上传佐证材料', trigger: 'change' }],
        promiseFile: [{ required: true, message: '请上传承诺书', trigger: 'change' }],
        assistFile: [{ required: true, message: '请上传辅助证件', trigger: 'change' }],
        familiesBankFlowFile: [{ required: true, message: '请上传本人及家庭成员近三个月银行流水', trigger: 'change' }],
      },
      fileJson: {
        applicationFile: [],//申请表
        householdRegisterFile: [],//本人户口本资料
        idCardFile: [],//本人身份证
        cardFile: [],//存折/银行卡信息
        promiseFile: [],//承诺书
        familiesBankFlowFile: [],//本人及家庭成员近三个月银行流水
        assistFile: [],//辅助证件（场景2）
        consignerFile: [],//委托书
        consignerIdCardFile: [],//委托人身份证
        changeRegistrFile: [],//变更登记申请书
        evidenceFile: [],//佐证材料
      },
      // 图片回显数据
      imgListUrl: {},
      // 需要提交的整体表单
      submitObject: {},
      // 提交表单时判断 子组件 和 父组件的所有验证是否通过
      isSubmit: {
        childrenForm: false,
        formSlot: false,
        formFile: false,
      },
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
        value: 0,
        options: [
          {
            label: '详情',
            type: 'text',
            icon: '',
            State: false,
            method: (row) => {
              this.handleDetail(row, 1)
            }
          },
          {
            label: '编辑',
            type: 'text',
            icon: '',
            State: false,
            method: (row) => {
              this.handleDetail(row, 2)
            }
          },
          {
            label: '删除',
            type: 'text',
            icon: '',
            State: false,
            method: (row) => {
              this.handleDetail(row, 3)
            }
          }
        ]
      },
      // 不同户籍子女家庭人均收入列表数据操作
      isFamilyDialog: false,
      isDisabled: false,
      tipsIs: 1,// 添加 1 编辑 2 详情 3
      family: {
        relationship: "",
        name: "",
        income: "",
        time: ""
      },
      familyRules: {
        relationship: [{ required: true, message: '请填写与老人关系', trigger: 'change' }],
        name: [{ required: true, message: '请填写姓名', trigger: 'change' }],
        income: [{ required: true, message: '请填写收入', trigger: 'change' }],
      },
      streetData: [],
      communityData: [],
      communityData1: [],
      sqjd1: "",
      sqjd2: "",
      sqjd3: "",
      sqjd4: "",
      cardType: 2,
    }
  },
  created() {
    this.initStatus()
  },
  mounted() {
    if (this.$route.query.idCard) {
      this.bType = "11"
    }
    // 街道
    streetList().then(res => {
      if (res.data.code === 1) {
        this.streetData = res.data.data.content;
        // res.data.data.content.forEach(item => {
        //   if (item.id === userIfo().streetId) {
        //     this.sqjd1 = item.name;
        //     this.formSlot.homeStreetId = item.id;
        //     this.formSlot.homeStreetName = item.name;
        //   }
        // })
      }
    });
    // this.communityFun(userIfo().streetId);
    this.communityFun(this.formSlot.streetId);
    this.communityFun1(null);
  },
  methods: {
    // 本月收入
    numberChange() {
      let num1 = this.formSlot.wagesIncome ? parseInt(this.formSlot.wagesIncome) : 0;
      let num2 = this.formSlot.businessIncome ? parseInt(this.formSlot.businessIncome) : 0;
      let num3 = this.formSlot.propertyIncome ? parseInt(this.formSlot.propertyIncome) : 0;
      let num4 = this.formSlot.transIncome ? parseInt(this.formSlot.transIncome) : 0;
      let num5 = this.formSlot.alimony ? parseInt(this.formSlot.alimony) : 0;
      this.formSlot.monthlyIncome = num1 + num2 + num3 + num4 + num5;
    },
    // 家庭人均收入
    numberChange1() {
      let num1 = this.formSlot.monthlyIncome ? parseInt(this.formSlot.monthlyIncome) : 0;
      let num2 = this.formSlot.spouseIncome ? parseInt(this.formSlot.spouseIncome) : 0;
      let num3 = this.formSlot.familiesSum ? parseInt(this.formSlot.familiesSum) : 0;
      let num4 = this.formSlot.familiesNum ? parseInt(this.formSlot.familiesNum) : 0;
      this.formSlot.familiesAverageIncome = (num1 + num2 + num3) / (1 + this.formSlot.spouseLie + num4);
    },
    initStatus() {
      const that = this
      let data = getDate()
      findProcess({ businessType: 11, startTime: data }).then(res => {
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
    cardTypeChange(val) {
      this.cardType = val;
    },
    registerAddress(val) {
      for (let item in this.formSlot) {
        this.formSlot[item] = val[item]
      }
      for (let item in this.fileJson) {
        this.fileJson[item] = JSON.parse(val[item]) ? JSON.parse(val[item]) : [];
        this.imgListUrl[item] = JSON.parse(val[item])
      }
      for (let item in this.imgListUrl) {
        if (this.imgListUrl[item]) {
          this.imgListUrl[item].forEach(key => {
            key.url = process.env.VUE_APP_URL + '/' + key.fileDownloadUri;
          })
        } else {
          this.imgListUrl[item] = []
        }
      }
      this.tableData = this.formSlot.unFamiliesAverageIncome ? JSON.parse(this.formSlot.unFamiliesAverageIncome) : [];
      streetList().then(res => {
        if (res.data.code === 1) {
          res.data.data.content.forEach(item => {
            if (item.id === this.formSlot.homeStreetId) {
              this.sqjd1 = item.name;
            }
            if (item.id === this.formSlot.streetId) {
              this.sqjd3 = item.name;
            }
          })
        }
      });
      // console.log(this.formSlot)
      communityList({ streetId: this.formSlot.streetId }).then(res => {
        if (res.data.code === 1) {
          res.data.data.content.forEach(item => {
            if (item.id === this.formSlot.communityId) {
              this.sqjd4 = item.name;
            }
          })
        }
      })
      communityList({ streetId: this.formSlot.homeStreetId }).then(res => {
        if (res.data.code === 1) {
          res.data.data.content.forEach(item => {
            if (item.id === this.formSlot.homeCommunityId) {
              this.sqjd2 = item.name;
            }
          })
        }
      })
      // this.formSlot.homeAddress = val;
    },
    // 社区
    communityFun(id) {
      communityList({ streetId: id }).then(res => {
        if (res.data.code === 1) {
          this.communityData = res.data.data.content;
          // res.data.data.content.forEach(item => {
          //   if (item.id === userIfo().communityId) {
          //     this.sqjd2 = item.name;
          //     this.formSlot.homeCommunityId = item.id;
          //     this.formSlot.homeCommunityName = item.name;
          //   }
          // })
        }
      })
    },
    communityFun1(id) {
      communityList({ streetId: id }).then(res => {
        if (res.data.code === 1) {
          this.communityData1 = res.data.data.content;
        }
      })
    },
    homeStreetIdHandle(value) {
      this.formSlot.homeStreetId = value.id;
      this.formSlot.homeStreetName = value.name;
      this.formSlot.homeCommunityId = "";
      this.formSlot.homeCommunityName = "";
      this.communityFun(value.id);
    },
    homeCommunityIdHandle(value) {
      this.formSlot.homeCommunityId = value.id;
      this.formSlot.homeCommunityName = value.name;
    },
    streetNameHandle(value) {
      this.formSlot.streetId = value.id;
      this.formSlot.streetName = value.name;
      this.formSlot.communityId = "";
      this.formSlot.communityName = "";
      this.communityFun1(value.id);
    },
    communityIdHandle(value) {
      this.formSlot.communityId = value.id;
      this.formSlot.communityName = value.name;
    },
    // 添加家庭成员
    familyPersonnel() {
      this.tipsIs = 1;
      this.isFamilyDialog = true;
      this.isDisabled = false;
      this.family = {
        relationship: "",
        name: "",
        income: "",
        time: ""
      }
    },
    familyDialogSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.tipsIs === 1) {
            this.family.time = new Date().toLocaleDateString();
            this.family.serialNumber = this.tableData.length + 1;
            this.tableData.push(this.family);
            this.$message.success('添加成功');
          } else if (this.tipsIs === 2) {
            this.tableData.forEach((item, index) => {
              if (item.serialNumber === this.family.serialNumber) {
                this.tableData.splice(index, 1, this.family);
              }
            })
            this.$message.success('编辑成功');
          }
          this.isFamilyDialog = false;
        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.isFamilyDialog = false;
      this.isDisabled = false;
    },
    handleDetail(row, type) {
      if (type === 1) {
        this.tipsIs = 1;
        this.isFamilyDialog = true;
        this.isDisabled = true;
        this.family = row;
      } else if (type === 2) {
        this.tipsIs = 2;
        this.isFamilyDialog = true;
        this.family = row;
      } else if (type === 3) {
        this.tipsIs = 3;
        this.tableData.forEach((item, index) => {
          if (item.serialNumber === row.serialNumber) {
            this.tableData.splice(index, 1);
          }
        })
      }
    },
    // 上传成功
    handleSuccess(response, file, fileList, item) {
      // this.fileJson[item] = fileListData(fileList);
      this.fileJson[item].push({ fileDownloadUri: response.fileDownloadUri });
      this.$nextTick(() => {
        this.$refs.formFile.clearValidate(item);
      })
    },
    // 图片删除
    handleRemove(file, fileList, item) {
      // this.fileJson[item] = fileListData(fileList);
      this.fileJson[item].forEach((obj, index) => {
        if (obj.fileDownloadUri === file.fileDownloadUri) {
          this.fileJson[item].splice(index, 1);
        }
      })
    },
    // 图片放大效果
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 子组件中form值
    formValue(val) {
      // 子组件表单验证通过
      this.isSubmit.childrenForm = true;
      for (let key in val) {
        this.submitObject[key] = val[key];
      }
    },
    onSubmit(formFile) {
      // 调用子元素方法获取参数
      this.$refs.obtainSonData.fromDataFun('form');
      // // 获取传给子组件中form的值
      this.$refs["formSlot"].validate((valid) => {
        if (valid) {
          // 传给子组件的表单验证通过
          this.isSubmit.formSlot = true;
          this.formSlot.unFamiliesAverageIncome = JSON.stringify(this.tableData);
          for (let key in this.formSlot) {
            this.submitObject[key] = this.formSlot[key];
          }
        } else {
          return false;
        }
      });
      //文件上传验证
      this.$refs["formFile"].validate((valid) => {
        if (valid) {
          // 文件上传验证通过
          this.isSubmit.formFile = true;
          // 将要上传的文件列表变成字符串
          for (let key in this.fileJson) {
            // this.fileJson[key] = JSON.stringify(this.fileJson[key]);
            this.submitObject[key] = JSON.stringify(this.fileJson[key]);
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
        if (this.formSlot.familiesAverageIncome >= 2180) {
          this.$message('由于您家庭人均收入高于2180，暂不能进行相关操作!');
        } else {
          this.$confirm('温馨提示：请您仔细核实录入数据，申请过程中将无法修正！', '立即申请', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.$route.query.idCard) {
              this.submitObject.orderNum = this.$route.query.orderNum;
              homeAgedUpdateAlEdit(this.submitObject).then(res => {
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
              homeAgedUpdateAl(this.submitObject).then(res => {
                if (res.data.code === 1) {
                  this.$alert('温馨提示：您好，您提交的申请已转交至下一环节，请您耐心等候。', '立即申请', {
                    confirmButtonText: '确定',
                    callback: () => {
                      this.$message.success(res.data.msg);
                      processCheck({
                        orderNum: res.data.data,
                        status: 1,
                      }).then(response => { });
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
    },
  }
}
</script>
<style lang="scss" scope>
.business-salary-page {
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
  }
}
</style>