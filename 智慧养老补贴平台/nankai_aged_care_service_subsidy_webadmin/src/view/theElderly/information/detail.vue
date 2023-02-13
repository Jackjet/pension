<template>
  <!-- 老人信息详情 -->
  <div class="information-details">
    <div class="basics-detail" v-if="detailData">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="head-portrait">
            <img class="portrait-img" :src="imgListUrl+detailData.icon" alt="">
            <p class="style-color"> <span v-if="detailData.processNum==='3'||detailData.processNum==='4'||detailData.processNum==='5'||detailData.processNum==='99'">{{detailData.al===1?'轻度':detailData.al===2?'中度':'重度'}}</span> （{{detailData.subsidyType===1?'生活':detailData.subsidyType===2?'护理':'生活+护理'}}）</p>
            <p v-if="detailData.processNum==='3'||detailData.processNum==='4'||detailData.processNum==='5'||detailData.processNum==='99'" class="style-color">金额：{{detailData.subsidyAmount}}</p>
          </div>
        </el-col>
        <el-col :span="8">
          <p>姓名： {{detailData.name}}</p>
          <p>身份证号：{{detailData.idCard}}</p>
          <p>联系电话：{{detailData.phone}}</p>
          <p>户籍地址：{{detailData.homeAddress}}</p>
        </el-col>
        <el-col :span="8">
          <p>老人类型： {{genreName}}</p>
          <p>老人年龄：{{age}}</p>
          <p>所属街道：{{detailData.homeStreetName+detailData.homeCommunityName}}</p>
          <p>备注：{{userXou?userXou:'无'}}</p>
        </el-col>
      </el-row>
    </div>
    <div class="tabs-nav-content">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">基础信息</el-menu-item>
        <el-menu-item index="2">等级变动（{{num3}}）</el-menu-item>
        <el-menu-item index="3">发放记录（{{num2}}）</el-menu-item>
        <el-menu-item index="4">办理单（{{num1}}）</el-menu-item>
      </el-menu>
      <div v-show="activeIndex==='1'">
        <basic-information v-if="detailData" :details="detailData" style="margin-top:20px;box-shadow:none">
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
            <!-- <el-col :span="4">
              <div class="data-enclosure">
                <p></p>
                <h2>申请书</h2>
              </div>
            </el-col> -->
          </el-row>
        </div>
      </div>
      <div v-show="activeIndex==='2'">
        <TableList :table-data="gradeChangeList" v-loading="isSubmitLoading" :table-selection="tableSelection" :table-label="gradeChangeListHeader" :table-option="tableOpction2">
        </TableList>
        <!-- <div style="height:50px">
          <Pagination :total="total" @pageChange="pageChange"></Pagination>
        </div> -->
      </div>
      <div v-show="activeIndex==='3'">
        <el-form :inline="true" :model="queryForm" style="margin-top:20px">
          <el-form-item label="发放日期">
            <el-date-picker size="medium" v-model="queryForm.grantDate" value-format='yyyy-MM' type="month" placeholder="请选择发放日期">
            </el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="补贴类型">
            <el-select size="medium" v-model="queryForm.businessType" placeholder="补贴类型">
              <el-option label="养老补贴申请" :value="1"></el-option>
              <el-option label="养老补贴评估等级更新" :value="11"></el-option>
              <el-option label="养老补贴注销申请" :value="12"></el-option>
              <el-option label="养老补贴区内迁转" :value="13"></el-option>
              <el-option label="养老补贴复核变更" :value="14"></el-option>
              <el-option label="百岁营养补贴申请" :value="2"></el-option>
              <el-option label="百岁营养补贴注销" :value="21"></el-option>
              <el-option label="90岁生日补贴" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作类型">
            <el-select size="medium" v-model="queryForm.grantStatus" placeholder="操作类型">
              <el-option label="未发放" value="0"></el-option>
              <el-option label="发放" value="1"></el-option>
              <el-option label="暂停" value="2"></el-option>
              <el-option label="停止发放" value="3"></el-option>
              <el-option label="注销" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发放方式">
            <el-select size="medium" v-model="queryForm.cardType" placeholder="发放方式">
              <el-option label="现金" :value="1"></el-option>
              <el-option label="银行卡" :value="2"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <el-button size="medium" @click="searchGrant">查询</el-button>
            <!-- <el-button size="medium" type="primary">导出</el-button> -->
          </el-form-item>
        </el-form>
        <TableList :table-data="ecordList" v-loading="isSubmitLoading" :table-selection="tableSelection" :table-label="ecordListHeader" :table-option="tableOpction1">
        </TableList>
        <!-- <div style="height:50px">
          <Pagination :total="total" @pageChange="pageChange"></Pagination>
        </div> -->
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
        grantDate: new Date().getFullYear() + '-' + this.getMonthFun(),
        // cardType: null,//发放方式
        businessType: '',//业务类型
        // status: null,//办理进度
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
        { label: "评估等级", list: "al" },
        { label: "评估信息", list: "subsidyType" },
        { label: "发放金额（元）", list: "subsidyAmount" },
        { label: "发放日期", list: "grantDate" },
        { label: "老人类型", list: "genreName" },
        { label: "补贴类型", list: "businessType" },
        { label: "操作类型", list: "grantStatus" },
        { label: "发放方式", list: "cardType" },
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
      tableOpction2: {
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
        JSON.parse(this.detailData.genreName).forEach(item => {
          this.genreName += item + '，';
        })
        this.genreName = this.genreName.slice(0, -1);
        this.age = ages(this.detailData.birthday);
        this.imgList = fileExhibition(res.data.data);
        this.idCard = res.data.data.idCard
        this.businessType = res.data.data.businessType
        console.log(res.data.data.businessType)
        this.gradeChange(this.idCard);
        this.grantEcord(this.idCard, this.queryForm);
        this.handleApi(this.idCard, this.queryForm);
      } else {
        this.$message.error(res.data.msg);
      }
    })
  },
  methods: {
    getMonthFun() {
      let month = new Date().getMonth() + 1;
      if (month >= 1 && month <= 9) {
        month = '0' + month;
      }
      return month;
    },
    searchGrant() {
      if (!this.queryForm.grantDate) {
        this.queryForm.grantDate = new Date().getFullYear() + '-' + this.getMonthFun();
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
    // 等级变动列表
    gradeChange(idCard) {
      findAllSubsidyUpdate({ idCard }).then(res => {
        if (res.data.code === 1) {
          this.gradeChangeList = res.data.data;
          this.gradeChangeList.forEach((v, i) => {
            if (v.businessType == 1) {
              v.businessType = '新增'
            } else if (v.businessType == 11) {
              v.businessType = '等级变更'
            } else {
              v.businessType = ''
            }
            // if (v.al == '1') {
            //   v.al = '轻度'
            // } else if (v.al == 2) {
            //   v.al = '中度'
            // } else if (v.al == 3) {
            //   v.al = '重度'
            // } else {
            //   v.al = ''
            // }
          })
          // console.log(res, "=============")
          if (res.data.code === 1) {
            this.gradeChangeList = res.data.data;
            console.log(res.data.data)
            this.num3 = res.data.data.length;
          } else {
            this.$message.error(res.data.msg);
          }
        }
      })
    },
    // 发放记录列表
    grantEcord(idCard, form) {
      let form1 = JSON.parse(JSON.stringify(form))
      form1.businessType = form1.businessType != '' ? form1.businessType : this.businessType
      findAllSubsidyGrant(Object.assign({ idCard }, form1)).then(res => {
        if (res.data.code === 1) {
          this.ecordList = res.data.data;
          this.ecordList.forEach((v, i) => {
            if (v.businessType == 1) {
              v.businessType = '新增'
            } else if (v.businessType == 11) {
              v.businessType = '等级变更'
            } else {
              v.businessType = ''
            }
            v.genreName = JSON.parse(v.genreName).join(',')
            if (v.subsidyType == '1') {
              v.subsidyType = '生活'
            } else if (v.subsidyType == 2) {
              v.subsidyType = '护理'
            } else {
              v.subsidyType = '生活+护理'
            }
            if (v.al == '1') {
              v.al = '轻度'
            } else if (v.al == 2) {
              v.al = '中度'
            } else if (v.al == 3) {
              v.al = '重度'
            } else {
              v.al = ''
            }
            if (v.grantStatus == '0') {
              v.grantStatus = '未发放'
            } else if (v.grantStatus == 1) {
              v.grantStatus = '发放'
            } else if (v.grantStatus == 2) {
              v.grantStatus = '暂停'
            } else if (v.grantStatus == 3) {
              v.grantStatus = '停止发放'
            } else if (v.grantStatus == 4) {
              v.grantStatus = '注销'
            } else {
              v.grantStatus = ''
            }
            v.cardType = v.cardType == 1 ? '现金' : '银行卡'
            if (v.aliveFile) {
              v.aliveFile = process.env.VUE_APP_URL + '/' + JSON.parse(v.aliveFile)[0].fileDownloadUri
            }
          })
          this.num2 = res.data.data.length;
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    // 办理单列表
    handleApi(idCard, form) {
      delete form['grantDate']
      // form.businessType = form.businessType ? form.businessType : '1'
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
      // console.log(val)
    },
    handleDetail(row) {
      console.log(row)
      this.$router.push({
        path: '/subsidy/toExamine',
        query: {
          id: row.id,
          type: "详情",
          liveSubsidy: 0,
          nursingSubsidy: 0,
          poorSubsidy: 0
        }
      })
    },
    handleDetail1(row) {
      console.log(row)
      this.$router.push({
        path: '/subsidy/toExamine',
        query: {
          id: row.id,
          type: "详情",
          liveSubsidy: 0,
          nursingSubsidy: 0,
          poorSubsidy: 0,
          updateType: 1
        }
      })
    },
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