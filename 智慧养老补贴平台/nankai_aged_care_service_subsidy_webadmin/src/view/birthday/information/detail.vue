<template>
  <!-- 老人信息详情 -->
  <div class="information-details">
    <div class="basics-detail" v-if="detailData">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="head-portrait">
            <img class="portrait-img" :src="imgListUrl+detailData.icon" alt="">
            <p class="style-color"> <span>90岁生日补贴</span></p>
            <p v-if="detailData.processNum==='3'||detailData.processNum==='4'||detailData.processNum==='5'||detailData.processNum==='99'" class="style-color">金额：{{detailData.subsidyAmount}}</p>
          </div>
        </el-col>
        <el-col :span="8">
          <p>姓名： {{detailData.name}}</p>
          <p>身份证号：{{detailData.idCard}}</p>
          <p>联系电话：{{detailData.phone}}</p>
        </el-col>
        <el-col :span="8">
          <p>老人年龄：{{age}}</p>
          <p>所属街道：{{detailData.homeStreetName+detailData.homeCommunityName}}</p>
          <p>户籍地址：{{detailData.homeAddress}}</p>
        </el-col>
      </el-row>
    </div>
    <div class="tabs-nav-content">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">基础信息</el-menu-item>
        <!-- <el-menu-item index="2">等级变动（{{num3}}）</el-menu-item> -->
        <el-menu-item index="3">发放记录（{{num2}}）</el-menu-item>
        <el-menu-item index="4">办理单（{{num1}}）</el-menu-item>
      </el-menu>
      <div v-show="activeIndex==='1'">
        <basic-information v-if="detailData" :details="detailData" :olderType='1' style="margin-top:20px;box-shadow:none">
          <el-col :span="24">
            <el-row>
              <el-col :span="8">
                <el-form-item label="户籍地、区">
                  <el-input value="南开区" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属街道" label-width="100px">
                  <el-input v-model="form.homeStreetName" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属社区" label-width="100px">
                  <el-input v-model="form.homeCommunityName" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24">
            <el-form-item label="户籍地详细地址">
              <el-input v-model="form.homeAddress" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-row>
              <el-col :span="8">
                <el-form-item label="现居住、区">
                  <el-input value="南开区" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属街道" label-width="100px">
                  <el-input v-model="form.streetName" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属社区" label-width="100px">
                  <el-input v-model="form.communityName" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24">
            <el-form-item label="现住址">
              <el-input v-model="form.address" disabled></el-input>
            </el-form-item>
          </el-col>
        </basic-information>
        <div class="enclosure-file">
          <h2 class="enclosure-components-title">申请单相关附件</h2>
          <el-row :gutter="20">
            <el-col :span="4" v-for="item in imgList" :key="item.field">
              <div v-if="item.img">
                <div class="data-enclosure" v-for="(url,index) in item.img" :key="index">
                  <p @click="clcikImgUrl(url.fileDownloadUri)">
                    <img :src="httpUrl+url.fileDownloadUri" alt="">
                  </p>
                  <h2>{{item.name}}</h2>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-show="activeIndex==='3'">
        <el-form :inline="true" :model="queryForm" style="margin-top:20px">
          <el-form-item label="发放日期">
            <el-date-picker size="medium" v-model="queryForm.grantDate" value-format='yyyy' type="year" placeholder="请选择发放日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button size="medium" @click="searchGrant">查询</el-button>
          </el-form-item>
        </el-form>
        <TableList :table-data="ecordList" v-loading="isSubmitLoading" :table-selection="tableSelection" :table-label="ecordListHeader" :table-option="tableOpction1">
        </TableList>
      </div>
      <div v-show="activeIndex==='4'">
        <el-form :inline="true" :model="queryForm" style="margin-top:20px">
          <el-form-item label="业务类型">
            <el-select size="medium" v-model="queryForm.businessType" placeholder="业务类型" clearable>
              <el-option label="养老补贴申请" value="1"></el-option>
              <el-option label="养老补贴评估等级更新" value="11"></el-option>
              <el-option label="养老补贴注销申请" value="12"></el-option>
              <el-option label="养老补贴区内迁转" value="13"></el-option>
              <el-option label="养老补贴复核变更" value="14"></el-option>
              <el-option label="百岁营养补贴申请" value="2"></el-option>
              <el-option label="百岁营养补贴注销" value="21"></el-option>
              <el-option label="90岁生日补贴" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="办理进度">
            <el-select size="medium" v-model="queryForm.status" placeholder="办理进度" clearable>
              <el-option label="办理中" :value="0"></el-option>
              <el-option label="完成" :value="1"></el-option>
              <el-option label="驳回" :value="2"></el-option>
              <el-option label="无需照料" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="medium" @click="searchApi">查询</el-button>
          </el-form-item>
        </el-form>
        <TableList :table-data="handleList" v-loading="isSubmitLoading" :table-selection="tableSelection" :table-label="handleListHeader" :table-option="tableOpction">
        </TableList>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import BasicInformation from "@/components/businessProcess/basicInformation";
import TableList from "@/components/table";
import Pagination from "@/components/table/pagination";
import { fileListData, tokenStr, fileUrl, fileExhibition, ages } from "@/api/file.js"
import { subsidyFind, findAllSubsidyUpdate, findAllSubsidyGrant, userFindAllSubsidy, livingProof } from '@/api/theElderly/list.js';
export default {
  components: {
    BasicInformation,
    TableList,
    Pagination
  },
  data() {
    return {
      headers: {
        Authorization: tokenStr()
      },
      actionUrl: process.env.VUE_APP_URL + fileUrl(),
      dialogVisible: false,
      dialogVisible1: false,
      fileList: [],
      dialogImageUrl: "",
      activeIndex: '1',
      genreName: "",
      age: null,
      livingRow: '',
      userXou: "",
      form: {
        applyType: null,//业务类型 1低保、低收入、优抚对象困难老人、2低于最低工资标准困难老人
        status: null,//状态:-1已驳回 ，0办理中，1完成
        subsidyAmount: "",//补贴金额
        orderNum: "",//补贴申请单号
        homeStreetName: "",//户籍地街道	
        homeCommunityName: "",//户籍地社区	
        homeAddress: "",//户籍详细地址	
        streetName: "",//现居地街道		
        communityName: "",//现居地社区	
        address: "",//现居地详细地址
      },
      queryForm: {
        grantDate: '',
        businessType: '',//业务类型
      },
      tableSelection: {
        key: true,
        type: "",
        detaile: false,
      },
      isSubmitLoading: false,
      gradeChangeList: [],
      gradeChangeListHeader: [
        { label: "老人姓名", list: "name" },
        { label: "评估等级（原）", list: "al" },
        { label: "补贴金额（原）", list: "subsidyAmount" },
        { label: "评估等级（现）", list: "newAl" },
        { label: "补贴金额（现）", list: "newSubsidyAmount" },
        { label: "操作类型", list: "businessType" },
        { label: "生效时间", list: "createTime" },
      ],
      ecordList: [],
      ecordListHeader: [
        { label: "老人姓名", list: "name" },
        { label: "发放金额（元）", list: "subsidyAmount" },
        { label: "发放日期", list: "grantDate" },
        { label: "银行卡号", list: "cardNum" },
        {
          label: "健在确认（当月）", code: (row) => {
            if (row.aliveFile) {
              return "<a href=" + row.aliveFile + " title='下载健在证明' download=''><i style='font-size:1.25rem' class='el-icon-download'></i></a>"
            } else {
              return "<a></a>"
            }
          }, type: 'html'
        },
      ],
      handleList: [],
      handleListHeader: [
        // { label: "序号", list: "name1" },
        {
          label: "业务类型",
          list: "businessType",
          type: 'html', code: (row) => {
            if (row.businessType === '1') {
              return '<span>养老补贴申请</span>'
            } else if (row.businessType === '11') {
              return '<span>养老补贴评估等级更新</span>'
            } else if (row.businessType === '12') {
              return '<span>养老补贴注销申请</span>'
            } else if (row.businessType === '13') {
              return '<span>养老补贴区内迁转</span>'
            } else if (row.businessType === '14') {
              return '<span>养老补贴复核变更</span>'
            } else if (row.businessType === '2') {
              return '<span>百岁营养补贴申请</span>'
            } else if (row.businessType === '21') {
              return '<span>百岁营养补贴注销</span>'
            } else if (row.businessType === '3') {
              return '<span>90岁生日补贴</span>'
            }
          }
        },
        { label: "办理单号", list: "orderNum" },
        {
          label: "办理进度",
          list: "status",
          type: 'html',
          code: (row) => {
            if (row.status === 0) {
              return '<span>办理中</span>'
            } else if (row.status === 1) {
              return '<span>完成</span>'
            } else if (row.status === 2) {
              return '<span>驳回</span>'
            } else {
              return '<span>无需照料</span>'
            }
          }
        },
        { label: "申报时间", list: "createTime" },
        { label: "终审时间（建议）", list: "endTime" },
      ],
      tableOpction: {
        label: "操作",
        width: "220px",
        value: 0,
        options: [
          {
            label: "详情",
            key: 0,
            type: "text",
            icon: "",
            State: true,
            method: (row) => {
              this.handleDetail(row);
            },
          },
        ],
      },
      tableOpction1: {
        label: "",
        width: "",
        value: 0,
        options: [

        ],
      },
      total: 10,
      httpUrl: process.env.VUE_APP_URL + '/',
      imgListUrl: process.env.VUE_APP_FILE,
      detailData: null,
      imgList: [],
      num1: null,
      num2: null,
      num3: null,
      idCard: '',
      businessType: '',
      resultForm: {},
    }
  },
  mounted() {
    // 详情
    subsidyFind({ id: this.$route.query.id }).then(res => {
      if (res.data.code === 1) {
        this.queryForm.grantDate = new Date().getFullYear()+''
        this.detailData = res.data.data;
        for (let item in this.form) {
          this.form[item] = res.data.data[item]
        }
        if (this.detailData.liveSubsidy) {
          this.userXou = "已享受残疾人生活补贴";
        }
        if (this.detailData.nursingSubsidy) {
          this.userXou = "已享受残疾人护理补贴";
        }
        this.age = ages(this.detailData.birthday);
        this.imgList = fileExhibition(res.data.data);
        this.idCard = res.data.data.idCard
        this.businessType = res.data.data.businessType
        this.grantEcord(this.idCard,  this.queryForm);
        this.handleApi(this.idCard, this.queryForm);
      } else {
        this.$message.error(res.data.msg);
      }
    })
  },
  methods: {

    searchGrant() {
      if (!this.queryForm.grantDate) {
        this.queryForm.grantDate = new Date().getFullYear() + ''
      }
      this.grantEcord(this.idCard, this.queryForm);
    },
    searchApi() {
      this.handleApi(this.idCard, this.queryForm);
    },
    clcikImgUrl(url) {
      this.dialogVisible = true;
      this.dialogImageUrl = this.httpUrl + url;
    },
    // 发放记录列表
    grantEcord(idCard, form) {
      let form1 = JSON.parse(JSON.stringify(form))
      form1.businessType = 3
      findAllSubsidyGrant(Object.assign({ idCard }, form1)).then(res => {
        if (res.data.code === 1) {
          this.ecordList = res.data.data;
          this.ecordList.forEach((v, i) => {
            if (v.aliveFile) {
              v.aliveFile = process.env.VUE_APP_URL + '/' + JSON.parse(v.aliveFile)[0].fileDownloadUri
            }
          })
          console.log(res.data.data)
          this.num2 = res.data.data.length;
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    // 办理单列表
    handleApi(idCard, form) {
      delete form['grantDate']
      userFindAllSubsidy(Object.assign({ idCard }, form)).then(res => {
        if (res.data.code === 1) {
          this.handleList = res.data.data;
          this.num1 = res.data.data.length;
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    handleSelect(key, keyPath) {
      this.activeIndex = key;
    },
    pageChange(val) {
    },
    handleDetail(row) {
      this.$router.push({
        path: '/birthday/toExamine',
        query: {
          id: row.id,
          type: "详情",
          liveSubsidy: 0,
          nursingSubsidy: 0,
          poorSubsidy: 0
        }
      })
    }
  }
}
</script>
<style lang="scss" scope>
.information-details {
  padding: 0 50px;
  .basics-detail {
    box-shadow: $back-shadow;
    border-radius: 5px;
    color: $font-color2;
    margin-top: 20px;
    line-height: 34px;
    padding: 20px 0;
    .head-portrait {
      text-align: center;
      .portrait-img {
        display: block;
        width: 120px;
        height: 120px;
        margin: auto;
      }
      .style-color {
        color: $color1;
      }
    }
  }
  .tabs-nav-content {
    margin-top: 20px;
    box-shadow: $back-shadow;
    border-radius: 5px;
    padding: 20px;
    .enclosure-file {
      margin-top: 20px;
      box-sizing: border-box;
      .enclosure-components-title {
        line-height: 50px;
        color: $color1;
      }
      .data-enclosure {
        p {
          //   width: 240px;
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
          color: $font-color2;
          line-height: 50px;
        }
      }
    }
  }
}
</style>