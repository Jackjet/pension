<template>
  <!-- 复核变更（低保、低收入、优抚对象困难老人） -->
  <div class="business-apply-page">
    <business-process :dataList="applyList"></business-process>
    <basic-information ref="obtainSonData" :applyType="1" :type="1" @formValue="formValue" @registerAddress="registerAddress" @cardTypeChange="cardTypeChange" :bType="bType">
      <el-form ref="formSlot" :model="formSlot" :rules="rulesSlot" label-width="140px">
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
            <el-form-item label="最低生活保证金领取证" prop="lowLiveFile">
              <el-upload :file-list="imgListUrl.lowLiveFile" :action="actionUrl" :headers="headers" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="(file, fileList)=>handleRemove(file, fileList,'lowLiveFile')" :on-success="(response, file, fileList)=>handleSuccess(response, file, fileList,'lowLiveFile')">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="城乡居民低收入救助证" prop="lowIncomeFile">
              <el-upload :file-list="imgListUrl.lowIncomeFile" :action="actionUrl" :headers="headers" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="(file, fileList)=>handleRemove(file, fileList,'lowIncomeFile')" :on-success="(response, file, fileList)=>handleSuccess(response, file, fileList,'lowIncomeFile')">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="残疾军人证" prop="disabledSoldiersFile">
              <el-upload :file-list="imgListUrl.disabledSoldiersFile" :action="actionUrl" :headers="headers" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="(file, fileList)=>handleRemove(file, fileList,'disabledSoldiersFile')" :on-success="(response, file, fileList)=>handleSuccess(response, file, fileList,'disabledSoldiersFile')">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="定期抚恤领取证" prop="pensionFile">
              <el-upload :file-list="imgListUrl.pensionFile" :action="actionUrl" :headers="headers" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="(file, fileList)=>handleRemove(file, fileList,'pensionFile')" :on-success="(response, file, fileList)=>handleSuccess(response, file, fileList,'pensionFile')">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="退役军人事务局认定凭证" prop="veteransFile">
              <el-upload :file-list="imgListUrl.veteransFile" :action="actionUrl" :headers="headers" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="(file, fileList)=>handleRemove(file, fileList,'veteransFile')" :on-success="(response, file, fileList)=>handleSuccess(response, file, fileList,'veteransFile')">
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
            <el-form-item label="佐证材料" prop="evidenceFile">
              <span style="color:red">申请人健在照片</span>
              <el-upload :file-list="imgListUrl.evidenceFile" v-model="fileJson.evidenceFile" :action="actionUrl" :headers="headers" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="(file, fileList)=>handleRemove(file, fileList,'evidenceFile')" :on-success="(response, file, fileList)=>handleSuccess(response, file, fileList,'evidenceFile')">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="复核情况" prop="changeRemark">
              <el-input type="textarea" :rows="5" v-model="fileJson.changeRemark" placeholder="请填写复核情况">
              </el-input>
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
  </div>
</template>

<script>
import BusinessProcess from "@/components/businessProcess";
import BasicInformation from "@/components/businessProcess/basicInformation";
import { tokenStr, fileUrl, fileListData, streetList, communityList } from "@/api/file.js";
import { homeAgedUpdateInfo, findProcess, homeAgedUpdateInfoEdit } from "@/api/theElderly/apply.js";
import { getDate } from "@/assets/js/utils.js";
import { processCheck } from '@/api/theElderly/list.js';
export default {
  components: {
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
      actionUrl: process.env.VUE_APP_URL + fileUrl(),
      applyList: [],
      // 传给子组件表单
      formSlot: {
        applyType: 1,//申请类别:1低保、低收入、优抚对象困难老人、2低于最低工资标准困难老人
        liveSubsidy: parseInt(this.$route.query.liveSubsidy),//是否已享受残疾人生活补贴:0否，1是	
        nursingSubsidy: parseInt(this.$route.query.nursingSubsidy),//是否已享受残疾人护理补贴:0否，1是	
        poorSubsidy: parseInt(this.$route.query.poorSubsidy),//是否已享受特困供养补贴:0否，1是

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
      formFileRules: {
        applicationFile: [{ required: true, message: '请上传申请表', trigger: 'change' }],
        householdRegisterFile: [{ required: true, message: '请上传本人户口本资料', trigger: 'change' }],
        idCardFile: [{ required: true, message: '请上传本人身份证', trigger: 'change' }],
        cardFile: [{ required: true, message: '请上传存折/银行卡信息', trigger: 'change' }],
        evidenceFile: [{ required: true, message: '请上传佐证材料', trigger: 'change' }],
        changeRemark: [{ required: true, message: '请填写复核情况', trigger: 'change' }],
      },
      fileJson: {
        applicationFile: [],//申请表
        householdRegisterFile: [],//本人户口本资料
        idCardFile: [],//本人身份证
        cardFile: [],//存折/银行卡信息
        lowLiveFile: [],//最低生活保证金领取证
        lowIncomeFile: [],//城乡居民低收入救助证
        disabledSoldiersFile: [],//残疾军人证
        pensionFile: [],//定期抚恤领取证
        veteransFile: [],//退役军人事务局认定凭证
        consignerFile: [],//委托书
        consignerIdCardFile: [],//委托人身份证
        evidenceFile: [],//佐证材料
        changeRemark: "",//复核变更复核情况汇总
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
      this.bType = "14"
    }
    // 街道
    streetList().then(res => {
      if (res.data.code === 1) {
        this.streetData = res.data.data.content;
      }
    });
    // this.communityFun(null);
    this.communityFun(this.formSlot.streetId);
    this.communityFun1(null);
  },
  methods: {
    initStatus() {
      const that = this
      let data = getDate()
      findProcess({ businessType: 14, startTime: data }).then(res => {
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
      // this.formSlot.homeAddress = val;
      for (let item in this.formSlot) {
        this.formSlot[item] = val[item]
      }
      for (let item in this.fileJson) {
        this.fileJson[item] = JSON.parse(val[item]) ? JSON.parse(val[item]) : [];
        this.imgListUrl[item] = JSON.parse(val[item])
      }
      this.fileJson.changeRemark = "";
      for (let item in this.imgListUrl) {
        if (this.imgListUrl[item]) {
          this.imgListUrl[item].forEach(key => {
            key.url = process.env.VUE_APP_URL + '/' + key.fileDownloadUri;
          })
        } else {
          this.imgListUrl[item] = []
        }
      }
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
    },
    // 社区
    communityFun(id) {
      communityList({ streetId: id }).then(res => {
        if (res.data.code === 1) {
          this.communityData = res.data.data.content;
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
        this.$confirm('温馨提示：请您仔细核实录入数据，申请过程中将无法修正！', '立即申请', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.$route.query.idCard) {
            this.submitObject.orderNum = this.$route.query.orderNum;
            homeAgedUpdateInfoEdit(this.submitObject).then(res => {
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
            homeAgedUpdateInfo(this.submitObject).then(res => {
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
  }
}
</style>
