<template>
  <div class="basic-information-components">
    <h1 class="title-components">申请人基础信息</h1>
    <el-form ref="form" :model="form" :rules="rules" label-width="140px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="身份证号" prop="idCard">
            <span style="color:red;position: absolute;top:-40px">可根据老人身份证号读取老人相关信息</span>
            <el-input v-model="form.idCard" placeholder="请输入身份证号" :disabled="iSdetails" @input="idCardInput" @change="idCardChange"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名" :disabled="iSdetails"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="form.sex" :disabled="iSdetails">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄">
            <el-input v-model="age" placeholder="请输入年龄" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birthday">
            <el-input v-model="form.birthday" placeholder="请输入出生日期" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入联系电话" :disabled="iSdetails"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="type===1||bType==='1'">
          <el-form-item label="老人类型" prop="genreId">
            <el-select style="width:100%" value-key="id" v-model="lrlx" placeholder="请选择老人类型" multiple @change="dicManageHandle" :disabled="iSdetails">
              <el-option v-for="item in dicManage" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="民族" prop="national">
            <el-select style="width:100%" v-model="form.national" placeholder="请选择民族" :disabled="iSdetails">
              <el-option v-for="item in mzListData" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="补贴资金发放形式" prop="cardType">
            <el-radio-group v-model="form.cardType" :disabled="iSdetails" @change="typeChange">
              <el-radio :label="2">{{type===1||bType==='1'?'银行卡':'银行卡/存折'}}</el-radio>
              <el-radio :label="1">现金</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col v-if="form.cardType===2" :span="12">
          <el-form-item label="开户行" prop="bankName">
            <el-input v-model="form.bankName" placeholder="请输入开户行" :disabled="iSdetails"></el-input>
          </el-form-item>
        </el-col>
        <el-col v-if="form.cardType===2" :span="12">
          <el-form-item label="持卡人姓名" prop="cardOwner">
            <el-input v-model="form.cardOwner" placeholder="请输入持卡人姓名" :disabled="iSdetails"></el-input>
          </el-form-item>
        </el-col>
        <el-col v-if="form.cardType===2" :span="12">
          <el-form-item label="银行卡号" prop="cardNum">
            <el-input v-model="form.cardNum" placeholder="请输入银行卡号" :disabled="iSdetails"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="紧急联系人姓名" prop="emergencyContact">
            <el-input v-model="form.emergencyContact" placeholder="请输入紧急联系人姓名" :disabled="iSdetails"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="紧急联系人电话" prop="emergencyPhone">
            <el-input v-model="form.emergencyPhone" placeholder="请输入紧急联系人电话" :disabled="iSdetails"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="与老人关系" :prop="bsType?'relation':''">
            <el-input v-model="form.relation" placeholder="请输入与老人关系" :disabled="iSdetails"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="type===1||bType==='1'">
          <el-form-item label="申请居家补贴类型" prop="subsidyType">
            <el-radio-group v-model="form.subsidyType" :disabled="iSdetails">
              <el-radio v-if="typeQuery.liveSubsidy==='0'" :label="1">生活</el-radio>
              <el-radio v-if="typeQuery.nursingSubsidy==='0'" :label="2">护理</el-radio>
              <el-radio v-if="typeQuery.liveSubsidy==='0'&&typeQuery.nursingSubsidy==='0'" :label="3">生活护理</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col v-if="details&&type===1" :span="12">
          <el-form-item label="业务申请类别">
            <el-checkbox-group v-model="checkAllType" disabled>
              <el-checkbox label="残疾人生活补贴"></el-checkbox>
              <el-checkbox label="残疾人护理补贴"></el-checkbox>
              <el-checkbox label="特困供养补贴"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col v-if="details&&type===1" :span="12">
          <el-form-item label="等级">
            <el-radio-group v-model="details.al" disabled>
              <el-radio :label="1">轻度</el-radio>
              <el-radio :label="2">中度</el-radio>
              <el-radio :label="3">重度</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="头像" prop="icon">
            <el-upload class="avatar-uploader" :disabled="iSdetails" v-model="form.icon" :headers="headers" :action="actionUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <slot></slot>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { tokenStr, uploadFile, mzList, idNoFormatCheck, mobilePhone, dicManageList, ages } from "@/api/file.js";
import { userFindById, homeAgedFindByIdCard } from '@/api/theElderly/apply.js';
export default {
  props: {
    applyType: {
      type: Number,
      default: () => {
        return null
      }
    },
    details: {
      type: Object,
      default: () => {
        return null
      }
    },
    type: {
      type: Number,
      default: () => {
        return null
      }
    },
    bType: {
      type: String,
      default: () => {
        return null
      }
    },
    bsType: {
      type: String,
      default: () => {
        return null
      }
    }
  },
  data() {
    var validateIdCard = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入身份证号'));
      }
      // else if (!idNoFormatCheck(value)) {
      //   callback(new Error('请输入合法身份证号'));
      // }
      else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else if (!mobilePhone(value)) {
        callback(new Error('请输入正确的手机号码'));
      } else {
        callback();
      }
    };
    return {
      typeQuery: this.$route.query,
      headers: {
        Authorization: tokenStr()
      },
      actionUrl: process.env.VUE_APP_URL + uploadFile(),
      iSdetails: false,
      lrlx: [],
      age: null,
      checkAllType: [],
      form: {
        idCard: "",//身份证号
        sex: "",//性别
        name: "",//姓名
        birthday: "",//出生日期
        phone: "",//电话
        genreName: "",//老人类型名称
        genreId: "",//老人类型Id
        national: "",//民族
        cardType: 2,//补贴资金发放形式:1现金、2银行卡/存折（养老补贴为1和2，百岁营养补贴申请为1和2，90岁生日补贴为2）
        cardOwner: "",//持卡人姓名
        bankName: "",//开户行
        cardNum: "",//银行卡号
        emergencyContact: "",//紧急联系人姓名
        emergencyPhone: "",//紧急联系人电话
        relation: "",//与老人关系
        subsidyType: null,//申请居家补贴类型:1生活、2护理、3生活护理
        icon: "",//头像
        iconTime: "",//头像更新日期	
        subsidyAmount: "",//补贴金额
      },
      imageUrl: "",
      rules: {
        idCard: [{ required: true, validator: validateIdCard, trigger: 'change' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'change' }],
        birthday: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
        // phone: [{ required: true, validator: validatePhone, trigger: 'change' }],
        phone: [{ required: true, message: '请输入联系人电话', trigger: 'change' }],
        genreName: [{ required: true, message: '请选择老人类型', trigger: 'change' }],
        national: [{ required: true, message: '请选择民族', trigger: 'change' }],
        cardType: [{ required: true, message: '请选择补贴资金发放形式', trigger: 'change' }],
        cardOwner: [{ required: true, message: '请输入持卡人姓名', trigger: 'change' }],
        // bankName: [{ required: true, message: '请输入开户行', trigger: 'change' }],
        cardNum: [{ required: true, message: '请输入银行卡号', trigger: 'change' }],
        // emergencyContact: [{ required: true, message: '请输入紧急联系人姓名', trigger: 'change' }],
        // emergencyPhone: [{ required: true, validator: validatePhone, trigger: 'change' }],
        // emergencyPhone: [{ required: true, message: '请输入紧急联系人电话', trigger: 'change' }],
        relation: [{ required: true, message: '请输入与老人关系', trigger: 'change' }],
        subsidyType: [{ required: true, message: '请选择申请居家补贴类型', trigger: 'change' }],
        icon: [{ required: true, message: '请上传头像', trigger: 'change' }],
        lrlx: [{ required: true, message: '请选择老人类型', trigger: 'change' }],
      },
      streetData: [],
      dicManage: [],
      mzListData: [],
    }
  },
  mounted() {
    if (this.$route.query.idCard) {
      this.form.idCard = this.$route.query.idCard
      this.idCardChange(this.form.idCard)
    }
    dicManageList().then(res => {
      if (res.data.code === 1) {
        this.dicManage = res.data.data.content;
      }
    })
    mzList().then(res => {
      if (res.data.code === 1) {
        this.mzListData = res.data.data.content;
      }
    })
    // 详情赋值
    if (this.details) {
      this.iSdetails = true;
      if (this.details.liveSubsidy) {
        this.checkAllType.push('残疾人生活补贴');
      } else if (this.details.nursingSubsidy) {
        this.checkAllType.push('残疾人护理补贴');
      } else if (this.details.poorSubsidy) {
        this.checkAllType.push('特困供养补贴');
      }
      for (let item in this.form) {
        this.form[item] = this.details[item]
      }
      this.age = ages(this.details.birthday);
      if (this.details.genreId) {
        this.dicManageFun(this.details.genreId);
      }

      this.imageUrl = process.env.VUE_APP_FILE + this.form.icon;
    }
  },
  methods: {
    typeChange(val) {
      this.$emit('cardTypeChange', val);
    },
    idCardInput(val) {
      if (val === '') {
        this.$router.go(0);
      }
    },
    idCardChange(val) {
      // 调前台详情接口
      if (this.type === 1 || this.type === 2) {
        homeAgedFindByIdCard({ businessType: this.bType, idCard: val }).then(res => {
          if (res.data.code === 1) {
            let data = res.data.data;
            if (this.applyType && this.applyType !== data.applyType) {
              let str = this.applyType === 1 ? '“低保、低收入、优抚对象困难老人”' : '“低于最低工资标准困难老人”';
              let str1 = data.applyType === 1 ? '“低保、低收入、优抚对象困难老人”' : '“低于最低工资标准困难老人”';
              this.$message(`您好，您属于${str}，请选择${str1}操作`);
              return false;
            }
            this.form.sex = data.sex;;
            this.form.name = data.name;
            this.form.birthday = data.birthday;
            this.form.phone = data.phone;
            this.form.cardType = data.cardType;
            this.form.cardOwner = data.cardOwner;
            this.form.bankName = data.bankName;
            this.form.cardNum = data.cardNum;
            this.form.subsidyType = data.subsidyType;
            this.lrlx = [];
            this.form.genreName = '';
            this.form.genreId = '';
            if (data.genreId) {
              this.dicManageFun(data.genreId);
            }
            this.form.genreName = this.lrlx;
            this.form.genreId = this.lrlx;
            if (data.subsidyAmount) {
              this.form.subsidyAmount = data.subsidyAmount;
            } else {
              delete this.form.subsidyAmount;
            }
            this.form.relation = data.relation;
            this.form.emergencyContact = data.emergencyContact;
            this.form.emergencyPhone = data.emergencyPhone;
            this.form.national = data.national;
            this.form.icon = data.icon;
            this.form.iconTime = data.iconTime;
            this.imageUrl = data.icon ? process.env.VUE_APP_FILE + this.form.icon : "";
            this.$emit('cardTypeChange', data.cardType);
            this.$emit('registerAddress', data);
            this.age = ages(this.form.birthday);
          } else {
            this.$message.error(res.data.msg);
          }
        })
      } else {//调后台详情接口
        userFindById({ idCard: val }).then(res => {
          if (res.data.code === 1) {
            // 提取出生日期
            let birthday = "";
            if (val.length == 15) {
              birthday = "19" + val.substr(6, 6);
            } else if (val.length == 18) {
              birthday = val.substr(6, 8);
            }
            this.form.birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");

            if (res.data.data.content.length) {
              let data = res.data.data.content[0];
              this.form.sex = data.sex === '0' ? '女' : '男';
              this.form.name = data.name;
              // this.form.birthday = data.birthday.split(' ')[0];

              this.form.phone = data.phone;

              this.lrlx = [];
              this.form.genreName = '';
              this.form.genreId = '';
              if (data.genreId) {
                this.dicManageFun(data.genreId);
              }
              this.form.genreName = this.lrlx;
              this.form.genreId = this.lrlx;

              this.form.emergencyContact = data.linkName;
              this.form.emergencyPhone = data.linkPhone;
              this.form.national = data.national;
              this.form.icon = data.icon;
              this.form.iconTime = data.iconTime ? data.iconTime : new Date().toLocaleString('chinese', { hour12: false }).replace(/\//g, '-');;
              this.imageUrl = data.icon ? process.env.VUE_APP_FILE + this.form.icon : "";
              this.$emit('cardTypeChange', data.cardType);
              this.$emit('registerAddress', data.registerAddress);
            } else {
              this.lrlx = [];
              // let birthday = "";
              // if (val.length == 15) {
              //   birthday = "19" + val.substr(6, 6);
              // } else if (val.length == 18) {
              //   birthday = val.substr(6, 8);
              // }
              // this.form.birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
              this.form.sex = '';
              this.form.name = '';
              this.form.phone = '';
              this.form.cardType = '';
              this.form.cardOwner = '';
              this.form.bankName = '';
              this.form.cardNum = '';
              this.form.subsidyType = '';
              this.form.subsidyAmount = '';
              this.lrlx = [];
              this.form.genreName = '';
              this.form.genreId = '';
              this.form.relation = '';
              this.form.emergencyContact = '';
              this.form.emergencyPhone = '';
              this.form.national = '';
              this.form.icon = '';
              this.form.iconTime = '';
              this.imageUrl = '';
            }
            this.age = ages(this.form.birthday);
          }
        })
      }
    },
    async dicManageFun(genreId) {
      let res = await dicManageList();
      if (res.data.code === 1) {
        res.data.data.content.forEach(item => {
          JSON.parse(genreId).forEach(key => {
            if (item.id === key) {
              this.lrlx.push(item);
            }
          })
        })
      }
      return this.lrlx;
    },
    dicManageHandle(value) {
      this.form.genreName = value;
      this.form.genreId = value;
    },
    handleAvatarSuccess(res, file) {
      this.form.icon = res.data.filePath;
      this.form.iconTime = new Date().toLocaleString('chinese', { hour12: false }).replace(/\//g, '-');
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$refs.form.clearValidate('icon');
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    fromDataFun(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.form.emergencyContact || this.form.emergencyPhone) {
            this.$emit('formValue', this.form);
          } else {
            this.$message('请输入紧急联系人姓名或紧急联系人电话');
          }
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-information-components {
  box-shadow: $back-shadow;
  border-radius: 5px;
  padding: 0 10px;
  box-sizing: border-box;
  .title-components {
    line-height: 50px;
    color: $color1;
  }
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px solid #eee;
  border-radius: 5px;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
