<template>
  <el-main>
    <div :class="['main-section']">
      <el-row :gutter="20">
        <el-col :span="20" :offset="2">
          <div class="hander">订单信息</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :offset="3" :span="15">
          <span>订单号：</span>
          <span>{{ info.id }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :offset="3" :span="6">
          <span>订单状态：</span>
          <span>{{ info.state_show }}</span>
        </el-col>
        <el-col :span="6">
          <span>订单下单方式：</span>
          <span>{{ info.orderWay_show }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :offset="3" :span="6">
          <span>服务项：</span>
          <span>{{ info.serviceProName }}</span>
        </el-col>
        <el-col :span="6">
          <span>服务类型：</span>
          <span>{{ info.serviceProType_show }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :offset="3" :span="6">
          <span>服务金额：</span>
          <span>{{ serviceProMoney }}</span>
        </el-col>
        <el-col :span="6" v-if="info.serviceProType === '0'">
          <span>服务时长：</span>
          <span>{{ serviceProTime }}</span>
        </el-col>
        <el-col :span="6" v-if="info.serviceProType === '1'">
          <span>服务次数：</span>
          <span>{{ serviceProTime }}</span>
        </el-col>
        <el-col :span="6" v-if="info.serviceProType === '2'">
          <span>{{ info.unit }}：</span>
          <span>{{ info.num }}</span>
        </el-col>
        <el-col :span="6" v-if="info.serviceProType === '2'">
          <span>总额：</span>
          <span>{{ totalMoney }}</span>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :offset="3" :span="6">
          <span>下单日期：</span>
          <span>{{ info.createTime }}</span>
        </el-col>
        <el-col :span="8">
          <span>期望到达时间：</span>
          <span>{{ expectTime }}</span>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col
          :offset="3"
          :span="6"
          v-if="
            detailType === '1' ||
            detailType === '2' ||
            detailType === '3' ||
            detailType === '23'
          "
        >
          <span>接单日期：</span>
          <span>{{ info.acceptTime }}</span>
        </el-col>
        <el-col
          :span="8"
          v-if="
            detailType === '1' ||
            detailType === '2' ||
            detailType === '3' ||
            detailType === '23'
          "
        >
          <span>分配人员时间：</span>
          <span>{{ info.allotTime }}</span>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col
          :offset="3"
          :span="6"
          v-if="detailType === '2' || detailType === '3' || detailType === '23'"
        >
          <span>确认上门方式：</span>
          <span>{{ info.startWay_show }}</span>
        </el-col>

        <el-col
          :span="8"
          v-if="detailType === '2' || detailType === '3' || detailType === '23'"
        >
          <span>开始服务时间：</span>
          <span>{{ info.startTime }}</span>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col
          :offset="3"
          :span="6"
          v-if="detailType === '3' || detailType === '23'"
        >
          <span>实际服务时长：</span>
          <span>{{ actualTime }}</span>
        </el-col>
        <el-col :span="6" v-if="detailType === '3' || detailType === '23'">
          <span>是否已评价：</span>
          <span>{{ info.isAppraise_show }}</span>
        </el-col>
        <el-col :span="8" v-if="detailType === '3' || detailType === '23'">
          <span>结束服务时间：</span>
          <span>{{ info.endTime }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :offset="3" :span="15">
          <span>服务地址：</span>
          <span>{{ info.serviceAddress }}</span>
        </el-col>
      </el-row>
      <el-row
        :gutter="20"
        v-if="detailType === '2' || detailType === '3' || detailType === '23'"
      >
        <el-col :offset="3" :span="3">
          <span>服务照片：</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :offset="5"
          :span="16"
          v-if="detailType === '2' || detailType === '3' || detailType === '23'"
        >
          <div>
            <div>
              <el-image
                v-if="info.img1 !== null && info.img1 !== ''"
                :preview-src-list="[info.img1_show]"
                :src="info.img1_show"
              >
              </el-image>
              <el-image
                v-if="info.img2 !== null && info.img2 !== ''"
                :preview-src-list="[info.img2_show]"
                :src="info.img2_show"
              >
              </el-image>
              <el-image
                v-if="info.img3 !== null && info.img3 !== ''"
                :preview-src-list="[info.img3_show]"
                :src="info.img3_show"
              >
              </el-image>
            </div>
            <div>
              <el-image
                v-if="info.img4 !== null && info.img4 !== ''"
                :preview-src-list="[info.img4_show]"
                :src="info.img4_show"
              >
              </el-image>
              <el-image
                v-if="info.img5 !== null && info.img5 !== ''"
                :preview-src-list="[info.img5_show]"
                :src="info.img5_show"
              >
              </el-image>
              <el-image
                v-if="info.img6 !== null && info.img6 !== ''"
                :preview-src-list="[info.img6_show]"
                :src="info.img6_show"
              >
              </el-image>
            </div>
            <div>
              <el-image
                v-if="info.img7 !== null && info.img7 !== ''"
                :preview-src-list="[info.img7_show]"
                :src="info.img7_show"
              >
              </el-image>
              <el-image
                v-if="info.img8 !== null && info.img8 !== ''"
                :preview-src-list="[info.img8_show]"
                :src="info.img8_show"
              >
              </el-image>
              <el-image
                v-if="info.img9 !== null && info.img9 !== ''"
                :preview-src-list="[info.img9_show]"
                :src="info.img9_show"
              >
              </el-image>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row
        :gutter="20"
        v-if="detailType === '2' || detailType === '3' || detailType === '23'"
      >
        <el-col :offset="3" :span="17">
          <span>备注：</span>
          <span>{{ info.remark }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col
          :span="20"
          :offset="2"
          v-if="detailType === '2' || detailType === '3' || detailType === '23'"
        >
          <div class="hander">异常信息</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col
          :offset="3"
          :span="6"
          v-if="detailType === '2' || detailType === '3' || detailType === '23'"
        >
          <span>服务时间异常：</span>
          <span>{{ info.abnormal2_show }}</span>
        </el-col>
        <el-col
          :span="12"
          v-if="detailType === '2' || detailType === '3' || detailType === '23'"
        >
          <span>服务时间异常原因：</span>
          <span>{{ info.abnormalReason2 }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col
          :offset="3"
          :span="6"
          v-if="detailType === '2' || detailType === '3' || detailType === '23'"
        >
          <span>上门异常：</span>
          <span>{{ info.abnormal1_show }}</span>
        </el-col>
        <el-col
          :span="12"
          v-if="detailType === '2' || detailType === '3' || detailType === '23'"
        >
          <span>上门服务异常原因：</span>
          <span>{{ info.abnormalReason1 }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20" :offset="2">
          <div class="hander">老人信息</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :offset="3" :span="6">
          <span>老人姓名：</span>
          <span>{{ info.manName }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :offset="3" :span="6">
          <span>联系电话：</span>
          <span>{{ info.manPhone }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="detailType === '4' || detailType === '5'">
        <el-col :span="20" :offset="2">
          <div class="hander">取消原因</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="detailType === '4'">
        <el-col :offset="3" :span="9">
          <span>取消时间：</span>
          <span>{{ info.cancelTime }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="detailType === '4'">
        <el-col :offset="3" :span="15">
          <span style="float: left; margin-right: 0px">取消原因：</span>
          <el-input
            :style="{ width: '500px', position: 'relative', marginTop: '10px' }"
            type="textarea"
            disabled
            v-model="info.cancelReason"
          ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="detailType === '5'">
        <el-col :offset="3" :span="10">
          <el-input type="textarea" v-model="info.cancelReason"></el-input>
        </el-col>
      </el-row>

      <el-row
        :gutter="20"
        v-if="
          detailType === '1' ||
          detailType === '2' ||
          detailType === '3' ||
          detailType === '23'
        "
      >
        <el-col :span="20" :offset="2">
          <div class="hander">商家信息</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col
          :offset="3"
          :span="6"
          v-if="
            detailType === '1' ||
            detailType === '2' ||
            detailType === '3' ||
            detailType === '23'
          "
        >
          <span>商家名称：</span>
          <span>{{ info.providerName }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col
          :offset="3"
          :span="6"
          v-if="
            detailType === '1' ||
            detailType === '2' ||
            detailType === '3' ||
            detailType === '23'
          "
        >
          <span>商家电话：</span>
          <span>{{ info.providerPhone }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col
          :offset="3"
          :span="10"
          v-if="
            detailType === '1' ||
            detailType === '2' ||
            detailType === '3' ||
            detailType === '23'
          "
        >
          <span>商家地址：</span>
          <span>{{ info.providerAddress }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col
          :offset="3"
          :span="6"
          v-if="
            detailType === '1' ||
            detailType === '2' ||
            detailType === '3' ||
            detailType === '23'
          "
        >
          <span>服务人员名称：</span>
          <span>{{ info.employName }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col
          :offset="3"
          :span="6"
          v-if="
            detailType === '1' ||
            detailType === '2' ||
            detailType === '3' ||
            detailType === '23'
          "
        >
          <span>服务人员联系电话：</span>
          <span>{{ info.employPhone }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20" :offset="2" v-if="detailType === '3'">
          <div class="hander">评价信息</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :offset="3" :span="3" v-if="detailType === '3'">
          <span>满意度：</span>
          <span>{{ info.appraiseCode_show }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :offset="3" :span="10" v-if="detailType === '3'">
          <span>评价内容：</span>
          <span>{{ info.appraiseMessage }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :offset="3" :span="6" v-if="detailType === '3'">
          <span>评价日期：</span>
          <span>{{ info.appraiseTime }}</span>
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="20">
      <el-col :span="3" :offset="9">
        <el-button type="primary" size="medium" @click="back">返回</el-button>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import options from "../../../assets/js/options";

export default {
  name: "index",
  mounted() {
    if (this.$route.path === "/orderManagerDetail") {
      this.workOrderNo = this.$route.query.workOrderId;
      this.pathType = "1";
    }
    this.detailType = this.$route.params.type;
    this.initial();
  },
  computed: {
    expectTime() {
      if (this.info.expectStartTime && this.info.expectEndTime) {
        return (
          this.info.expectStartTime +
          "-" +
          this.info.expectEndTime.substring(11)
        );
      } else {
        return "";
      }
    },
    serviceProTime() {
      if (this.info.serviceProType === "1") {
        if (this.info.serviceProTime) {
          return this.info.serviceProTime + "次";
        } else {
          return "1次";
        }
      } else if (this.info.serviceProType === "0") {
        if (this.info.serviceProTime) {
          return this.info.serviceProTime + "小时";
        }
      }
    },
    serviceProMoney() {
      if (this.info.serviceProMoney) {
        return (this.info.serviceProMoney / 100).toFixed(2) + "元";
      } else {
        return "";
      }
    },
    totalMoney() {
      if (this.info.totalMoney) {
        return (this.info.totalMoney / 100).toFixed(2) + "元";
      } else {
        return "";
      }
    },
    actualTime() {
      if (this.info.actualTime) {
        return this.info.actualTime + "小时";
      } else {
        return "";
      }
    },
  },
  data: function () {
    return {
      detailType: "-1",
      info: {
        img1_show: "",
        img2_show: "",
        img3_show: "",
        img4_show: "",
        img5_show: "",
        img6_show: "",
        img7_show: "",
        img8_show: "",
        img9_show: "",
        img1: "",
        img2: "",
        img3: "",
        img4: "",
        img5: "",
        img6: "",
        img7: "",
        img8: "",
        img9: "",
      },
      workOrderNo: "",
      pathType: "0",
    };
  },
  methods: {
    async initial() {
      const that = this;
      try {
        let url = this.api.order.findById;
        // if (this.pathType === "1") {
        //   url =
        //     this.api.order.findByWorkOrderNo +
        //     "?workOrderNo=" +
        //     this.workOrderNo;
        // }
        let obj = {
          id: that.$route.params.id,
        };
        const response = await this.request.dataGet(that, url, obj);
        that.info = response.data;

        that.info.manName = decodeURI(that.info.manName);

        that.info.state_show = that.getLabelByValue(
          that.info.state,
          options.orderStatus
        );
        that.info.orderWay_show = that.getLabelByValue(
          that.info.orderWay,
          options.orderWay
        );
        that.info.serviceProType_show = that.getLabelByValue(
          that.info.serviceProType,
          options.serviceProType
        );
        that.info.startWay_show = that.getLabelByValue(
          that.info.startWay,
          options.startWay
        );
        that.info.isAppraise_show = that.getLabelByValue(
          that.info.isAppraise,
          options.yesOrNo
        );
        that.info.abnormal2_show = that.getLabelByValue(
          that.info.abnormal2,
          options.yesOrNo
        );
        that.info.abnormal1_show = that.getLabelByValue(
          that.info.abnormal1,
          options.yesOrNo
        );
        that.info.appraiseCode_show = that.getLabelByValue(
          that.info.appraiseCode,
          options.appraiseCode
        );
        that.info.serviceAddress =
          that.info.areaName +
          that.info.streetName +
          that.info.communityName +
          that.info.address;

        that.info.img1_show = process.env.VUE_APP_FILE + response.data.img1;
        that.info.img2_show = process.env.VUE_APP_FILE + response.data.img2;
        that.info.img3_show = process.env.VUE_APP_FILE + response.data.img3;
        that.info.img4_show = process.env.VUE_APP_FILE + response.data.img4;
        that.info.img5_show = process.env.VUE_APP_FILE + response.data.img5;
        that.info.img6_show = process.env.VUE_APP_FILE + response.data.img6;
        that.info.img7_show = process.env.VUE_APP_FILE + response.data.img7;
        that.info.img8_show = process.env.VUE_APP_FILE + response.data.img8;
        that.info.img9_show = process.env.VUE_APP_FILE + response.data.img9;
        if (response.code === 1) {
        } else {
          that.$message.error(response.msg);
        }
      } catch (even) {
        that.$message.error("数据获取失败");
      }
    },
    back() {
      history.go(-1);
    },
    handleClose(done) {
      done();
    },
    getLabelByValue: function (value, array) {
      var result = "";
      array.forEach(function (data) {
        if (data.value === value) {
          result = data.label;
        }
      });
      return result;
    },
  },
};
</script>

<style scoped>
.main-section {
  margin-top: 20px;
  text-align: left;
}

hr {
  margin-top: 5px;
  margin-bottom: 20px;
}

.el-col {
  margin-top: 10px;
}

.el-image {
  margin: 0 20px 0 20px;
  width: 200px;
  height: 200px;
}
.hander {
  padding: 5px 0;
  margin-bottom: 10px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px dashed #999;
  color: #009966;
}
</style>
