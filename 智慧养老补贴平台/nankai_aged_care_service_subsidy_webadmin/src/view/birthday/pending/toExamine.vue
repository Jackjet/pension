<template>
  <!-- 补贴业务（新更改） 审核 -->
  <div class="toExamine-page">
    <business-process ref="process" :dataList="applyList"></business-process>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="step-details">
          <h2 class="title-style">申请环节</h2>
          <div class="step-item" v-for="(item,index) in stepItemList" :key="index">
            <h3>{{item.name}}</h3>
            <p>办理部门：{{item.dept}}</p>
            <p>派发时间：{{item.createTime}}</p>
            <p class="opinion-text" v-if="item.status!==2">办理意见：{{item.status===1?'通过':''}}</p>
            <p class="opinion-text" v-else style="cursor: pointer;" @click="clickQuery(item.remark)">办理意见：驳回 点击查看驳回原因</p>
            <p>办理人：{{item.handler}}</p>
            <p>办理时间：{{item.updateTime}}</p>
            <span class="status-tyle" v-if="item.status===0">办理中</span>
            <span class="status-tyle" v-else-if="item.status===1">完成</span>
            <span class="status-tyle" style="background:red;" v-else>驳回</span>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <h2 class="title-style">办理单信息</h2>
        <el-form class="form-back" :model="form" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="业务类型">
                <el-input v-model="form.businessType" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态">
                <el-input v-model="form.status" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="补贴金额(元)">
                <el-input v-model="form.subsidyAmount" disabled></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="发放方式">
                <el-input v-model="form.name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="银行卡号/存折">
                <el-input v-model="form.name" disabled></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="12">
              <el-form-item label="补贴申请单号">
                <el-input v-model="form.orderNum" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <basic-information v-if="detailData" :type="2" :details="detailData" style="margin-top:20px">
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
            <el-col :span="6" v-for="item in imgList" :key="item.field">
              <div v-if="item.img">
                <div class="data-enclosure" v-for="(url,index) in item.img" :key="index">
                  <p @click="clcikImgUrl(url.fileDownloadUri)">
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
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <div class="from-btn" v-if="this.$route.query.type!=='详情'">
      <el-button type="primary" @click="onSubmit">通过</el-button>
      <el-button type="primary" @click="onReject">驳回</el-button>
    </div>
  </div>
</template>
<script>
import BusinessProcess from "@/components/businessProcess";
import BasicInformation from "@/components/businessProcess/basicInformation";
import { fileExhibition } from "@/api/file.js"
import { subsidyFind, subsidyProcessFindAll, processInfoFindAll } from '@/api/theElderly/list.js';
import { findProcess } from "@/api/theElderly/apply.js";
import { birthdayAudit } from "@/api/birthday/index.js";
export default {
  components: {
    BusinessProcess,
    BasicInformation,
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
      httpUrl: process.env.VUE_APP_URL + '/',
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
        address: "",//现居地详细地址,
        businessType: null,
      },
      imgList: [],
      applyList: [],
      stepItemList: [],
      detailData: null,
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
        let type = res.data.data.businessType;
        this.form.businessType = type === '1' ? '养老补贴申请' : type === '11' ? '养老补贴评估等级更新' : type === '12' ? '养老补贴注销申请' : type === '13' ? '养老补贴区内迁转' : type === '14' ? '养老补贴复核变更' : type === '2' ? '百岁营养补贴申请' : type === '21' ? '百岁营养补贴注销' : '90岁生日补贴';
        this.form.status = this.form.status === 0 ? '办理中' : this.form.status === 1 ? '完成' : '已驳回';
        this.imgList = fileExhibition(res.data.data);
        this.technologicalProcess(res.data.data.orderNum);
        this.initStatus(type, res.data.data.createTime.split(' ')[0], res.data.data.processNum);
      } else {
        this.$message.error(res.data.msg);
      }
    })
  },
  methods: {
    clcikImgUrl(url) {
      this.dialogVisible = true;
      this.dialogImageUrl = this.httpUrl + url;
    },
    initStatus(type, time, num) {
      const that = this
      findProcess({ businessType: type, startTime: time }).then(res => {
        if (res.data.code === 1) {
          that.applyList.splice(0)
          res.data.data.forEach((item, index) => {
            if (num + '' === item.processNum + '') {
              that.$refs.process.setActive(index)
            }
            that.applyList.push({
              title: item.name,
              time: item.time
            })
          })
        }
      });
    },
    // 查看申请环节
    technologicalProcess(orderNum) {
      subsidyProcessFindAll({ orderNum }).then(res => {
        if (res.data.code === 1) {
          this.stepItemList = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    clickQuery(text) {
      this.$alert(text, '驳回原因', {
        confirmButtonText: '关闭',
        callback: () => { }
      });
    },
    // // 查看流程
    // queryProcess(startTime, processNum) {
    //   processInfoFindAll({ businessType: 1, startTime }).then(res => {
    //     this.applyList = res.data.data;
    //     if (res.data.code === 1) {
    //       this.applyList.forEach(item => {
    //         item.title = item.name;
    //         item.status = 0;
    //         if (processNum === item.processNum) {
    //           item.status = 1;
    //         }
    //       })
    //     } else {
    //       this.$message.error(res.data.msg);
    //     }
    //   })
    // },
    onSubmit() {
      this.$confirm('温馨提示：请您仔细核实录入数据，申请过程中将无法修正！', '审核通过提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        birthdayAudit({
          orderNum: this.detailData.orderNum,
          status: 1,
        }).then(res => {
          if (res.data.code === 1) {
            this.$alert('温馨提示：您好，您提交的申请已转交至下一环节，请您耐心等候。', '审核通过提醒', {
              confirmButtonText: '确定',
              callback: () => {
                this.$message.success('提交成功！');
                this.$router.go(-1);
              }
            });
          } else {
            this.$message.error(res.data.msg);
          }
        })

      }).catch(() => { });
    },
    onReject() {
      this.$prompt('驳回原因', '驳回操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '输入驳回原因',
        inputType: 'textarea',
        inputPattern: /\S/,
        inputErrorMessage: '请输入驳回原因'
      }).then(({ value }) => {
        this.$confirm('温馨提示：请您仔细核实录入数据，操作过程中将无法修正！', '驳回', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          birthdayAudit({
            orderNum: this.detailData.orderNum,
            status: 2,
            remark: value
          }).then(res => {
            if (res.data.code === 1) {
              this.$message.success('您的操作已经提交至上一环节，请您耐心等候！');
              this.$router.go(-1);
            } else {
              this.$message.error(res.data.msg);
            }
          })
        }).catch(() => { });
      }).catch(() => { });
    }
  }
}
</script>
<style lang="scss" scope>
.toExamine-page {
  padding: 0 50px;
  .title-style {
    line-height: 50px;
    color: $color1;
  }
  .step-details {
    .step-item {
      box-shadow: $back-shadow;
      border-radius: 5px;
      line-height: 30px;
      padding: 20px;
      margin-bottom: 20px;
      position: relative;
      h3 {
        color: $color1;
      }
      p {
        margin-left: 20px;
        color: $font-color2;
      }
      .opinion-text {
        color: $color1;
      }
      .status-tyle {
        position: absolute;
        top: 0;
        right: 0;
        background: $color2;
        color: $font-color1;
        padding: 10px 5px;
        border-radius: 5px;
        width: 30px;
        text-align: center;
        line-height: normal;
      }
    }
  }
  .form-back {
    padding-top: 30px;
    padding-right: 20px;
    border-radius: 5px;
    box-shadow: $back-shadow !important;
  }
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
        color: $font-color2;
        line-height: 50px;
      }
    }
  }
  .from-btn {
    padding: 30px 0;
    text-align: center;
  }
}
</style>