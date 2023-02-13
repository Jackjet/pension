<template>
  <!-- 区内迁转 低于最低工资标准困难老人-->
  <div class="business-apply-page">
    <business-process :dataList="applyList"></business-process>
    <basic-information ref="obtainSonData" :applyType="2" :type="1" @formValue="formValue" @registerAddress="registerAddress" :bType="bType">
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
            <el-input disabled oninput="value=value.replace(/[^0-9.]/g,'')" v-model="formSlot.monthlyIncome" placeholder="本人月收入" @input="numberChange1"></el-input>
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
              <el-form-item label="原户籍地、区">
                <el-input value="南开区" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属街道" prop="homeStreetId" label-width="100px">
                <el-select size="medium" v-model="sqjd1" value-key="id" placeholder="所属街道" @change="oldHomeStreetIdHandle">
                  <el-option v-for="item in streetData" :label="item.name" :value="item" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属社区" prop="homeCommunityId" label-width="100px">
                <el-select size="medium" v-model="sqjd2" value-key="id" placeholder="所属社区" @change="oldHomeCommunityIdHandle">
                  <el-option v-for="item in communityData2" :label="item.name" :value="item" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-form-item label="原户籍地详细地址" prop="homeAddress">
            <el-input v-model="formSlot.homeAddress" placeholder="请输入户籍地详细地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="8">
              <el-form-item label="现户籍地、区">
                <el-input value="南开区" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属街道" prop="newHomeStreetId" label-width="100px">
                <el-select size="medium" v-model="sqjd3" value-key="id" placeholder="所属街道" @change="homeStreetIdHandle">
                  <el-option v-for="item in streetData" :label="item.name" :value="item" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属社区" prop="newHomeCommunityId" label-width="100px">
                <el-select size="medium" v-model="sqjd4" value-key="id" placeholder="所属社区" @change="homeCommunityIdHandle">
                  <el-option v-for="item in communityData" :label="item.name" :value="item" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-form-item label="现户籍地详细地址" prop="homeAddress">
            <el-input v-model="formSlot.newHomeAddress" placeholder="请输入户籍地详细地址"></el-input>
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
                <el-select size="medium" v-model="sqjd5" value-key="id" placeholder="所属街道" @change="streetNameHandle">
                  <el-option v-for="item in streetData" :label="item.name" :value="item" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属社区" prop="communityId" label-width="100px">
                <el-select size="medium" v-model="sqjd6" value-key="id" placeholder="所属社区" @change="communityIdHandle">
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
        <el-button type="primary" @click="onSubmit">申请迁转</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import BusinessProcess from "@/components/businessProcess";
import BasicInformation from "@/components/businessProcess/basicInformation";
import { updateAddress, findProcess, updateAddressEdit } from "@/api/theElderly/apply.js";
import { fileExhibition, streetList, communityList } from "@/api/file.js";
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
      httpUrl: process.env.VUE_APP_URL + '/',
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

        newHomeStreetId: "",//现户籍地街道Id
        newHomeStreetName: "",//现户籍地街道
        newHomeCommunityId: "",//现户籍地社区Id
        newHomeCommunityName: "",//现户籍地社区
        newHomeAddress: "",//现户籍详细地址

        homeStreetId: "",//原户籍地街道Id	
        homeStreetName: "",//原户籍地街道	
        homeCommunityId: "",//原户籍地社区Id	
        homeCommunityName: "",//原户籍地社区	
        homeAddress: "",//原户籍详细地址	

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

        newHomeStreetId: [{ required: true, message: '请选择现户籍地街道', trigger: 'change' }],
        newHomeCommunityId: [{ required: true, message: '请选择现户籍地社区', trigger: 'change' }],
        newHomeAddress: [{ required: true, message: '请输入现户籍详细地址', trigger: 'change' }],
        homeStreetId: [{ required: true, message: '请选择原户籍地街道', trigger: 'change' }],
        homeCommunityId: [{ required: true, message: '请选择原户籍地社区', trigger: 'change' }],
        homeAddress: [{ required: true, message: '请输入原户籍详细地址', trigger: 'change' }],
        streetId: [{ required: true, message: '请选择现居地街道', trigger: 'change' }],
        communityId: [{ required: true, message: '请选择现居地社区', trigger: 'change' }],
        address: [{ required: true, message: '请输入现居地详细地址', trigger: 'change' }],
      },
      // 需要提交的整体表单
      submitObject: {},
      // 提交表单时判断 子组件 和 父组件的所有验证是否通过
      isSubmit: {
        childrenForm: false,
        formSlot: false,
        // formFile: false,
      },
      imgList: [],
      details: null,
      streetData: [],
      communityData: [],
      communityData1: [],
      communityData2: [],
      sqjd1: "",
      sqjd2: "",
      sqjd3: "",
      sqjd4: "",
      sqjd5: "",
      sqjd6: "",
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
      },
    }
  },
  created() {
    this.initStatus()
  },
  mounted() {
    if (this.$route.query.idCard) {
      this.bType = "13"
    }
    // 街道
    streetList().then(res => {
      if (res.data.code === 1) {
        this.streetData = res.data.data.content;
      }
    });
    this.communityFun(null);
    this.communityFun1(null);
    this.communityFun2(null);
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
      findProcess({ businessType: 13, startTime: data }).then(res => {
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
      //   this.formSlot.homeAddress = val;
      this.imgList = fileExhibition(val);
      for (let item in this.formSlot) {
        this.formSlot[item] = val[item]
      }
      this.tableData = this.formSlot.unFamiliesAverageIncome ? JSON.parse(this.formSlot.unFamiliesAverageIncome) : [];

      streetList().then(res => {
        if (res.data.code === 1) {
          res.data.data.content.forEach(item => {
            // 原户籍
            if (item.id === this.formSlot.homeStreetId) {
              this.sqjd1 = item.name;
            }
            // 现居住
            if (item.id === this.formSlot.streetId) {
              this.sqjd5 = item.name;
            }
          })
        }
      });
      communityList({ streetId: this.formSlot.homeStreetId }).then(res => {
        if (res.data.code === 1) {
          res.data.data.content.forEach(item => {
            if (item.id === this.formSlot.homeCommunityId) {
              this.sqjd2 = item.name;
            }
          })
        }
      })
      communityList({ streetId: this.formSlot.streetId }).then(res => {
        if (res.data.code === 1) {
          res.data.data.content.forEach(item => {
            if (item.id === this.formSlot.communityId) {
              this.sqjd6 = item.name;
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
    communityFun2(id) {
      communityList({ streetId: id }).then(res => {
        if (res.data.code === 1) {
          this.communityData2 = res.data.data.content;
        }
      })
    },
    oldHomeStreetIdHandle(value) {
      this.formSlot.homeStreetId = value.id;
      this.formSlot.homeStreetName = value.name;
      this.formSlot.homeCommunityId = "";
      this.formSlot.homeCommunityName = "";
      this.sqjd2 = "";
      this.communityFun2(value.id);
    },
    oldHomeCommunityIdHandle(value) {
      this.formSlot.homeCommunityId = value.id;
      this.formSlot.homeCommunityName = value.name;
    },
    homeStreetIdHandle(value) {
      this.formSlot.newHomeStreetId = value.id;
      this.formSlot.newHomeStreetName = value.name;
      this.formSlot.newHomeCommunityId = "";
      this.formSlot.newHomeCommunityName = "";
      this.sqjd4 = "";
      this.communityFun(value.id);
    },
    homeCommunityIdHandle(value) {
      this.formSlot.newHomeCommunityId = value.id;
      this.formSlot.newHomeCommunityName = value.name;
    },
    streetNameHandle(value) {
      this.formSlot.streetId = value.id;
      this.formSlot.streetName = value.name;
      this.formSlot.communityId = "";
      this.formSlot.communityName = "";
      this.sqjd6 = "";
      this.communityFun1(value.id);
    },
    communityIdHandle(value) {
      this.formSlot.communityId = value.id;
      this.formSlot.communityName = value.name;
    },
    // 子组件中form值
    formValue(val) {
      // 子组件表单验证通过
      this.isSubmit.childrenForm = true;
      for (let key in val) {
        this.submitObject[key] = val[key];
      }
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

      // 当所有数据都验证同过可提交
      if (this.isSubmit.childrenForm && this.isSubmit.formSlot) {
        let arrID = [], arrName = [];
        this.submitObject.genreId.forEach(item => {
          arrID.push(item.id);
          arrName.push(item.name);
        })
        this.submitObject.genreName = JSON.stringify(arrName);
        this.submitObject.genreId = JSON.stringify(arrID);
        if (this.formSlot.familiesAverageIncome > 2180) {
          this.$message('由于您家庭人均收入高于2180，暂不能进行相关操作!');
        } else {
          this.$confirm('温馨提示：请您仔细核实录入数据，申请过程中将无法修正！', '立即申请', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.$route.query.idCard) {
              this.submitObject.orderNum = this.$route.query.orderNum;
              updateAddressEdit(this.submitObject).then(res => {
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
              updateAddress(this.submitObject).then(res => {
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
        width: 260px;
        height: 220px;
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
