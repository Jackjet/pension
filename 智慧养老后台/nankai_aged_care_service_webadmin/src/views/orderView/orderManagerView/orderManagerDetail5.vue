<template>
  <el-main>
    <div :class="['main-section']">
      <el-row :gutter="20">
        <el-col :span="20" :offset="2">
          <div class="hander">订单信息</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :offset="3" :span="10">
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
        <el-col :offset="3" :span="15">
          <span>服务地址：</span>
          <span>{{ info.serviceAddress }}</span>
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
      <el-row :gutter="20">
        <el-col :span="20" :offset="2">
          <div class="hander">取消原因</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :offset="3" :span="10">
          <el-input type="textarea" rows="5" v-model="info.cancelReason" placeholder="请输入取消原因（最多100字）" maxlength="100"></el-input>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="20">
      <el-col :span="3" :offset="3">
        <el-button type="primary" size="medium" @click="back">返回</el-button>
      </el-col>
      <el-col :span="3" :offset="3">
        <el-button type="primary" size="medium" @click="cancel">取消订单</el-button>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import options from "../../../assets/js/options";

export default {
  name: "index",
  mounted() {
    this.initial();
  },
  data: function () {
    return {
      info: {},
    };
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
    totalMoney() {
      if (this.info.totalMoney) {
        return (this.info.totalMoney / 100).toFixed(2) + "元";
      } else {
        return "";
      }
    },
    serviceProMoney() {
      if (this.info.serviceProMoney) {
        return (this.info.serviceProMoney / 100).toFixed(2) + "元";
      } else {
        return "";
      }
    },
  },
  methods: {
    async initial() {
      const that = this;
      try {
        let url = this.api.order.findById;
        let obj = {
          id: that.$route.params.id,
        };
        const response = await this.request.dataGet(that, url, obj);
        that.info = response.data;
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
        that.info.serviceAddress =
          that.info.areaName +
          that.info.streetName +
          that.info.communityName +
          that.info.address;

        that.info.manName = decodeURI(that.info.manName);
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
    async cancel() {
      const that = this;
      if (that.info.cancelReason === "") {
        that.$message.error("请输入取消原因");
        return;
      }
      try {
        let url = this.api.order.cancel;
        let obj = {
          id: that.$route.params.id,
          cancelReason: that.info.cancelReason,
        };
        const response = await this.request.dataPost(that, url, obj);
        if (response.code !== 0) {
          that.$message.success(response.msg);
          history.go(-1);
          // that.$router.push({
          //   name: "orderWatinglView",
          // });
        } else {
          that.$message.error(response.msg);
        }
      } catch (even) {
        // console.log(even);
      }
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

.el-row {
  margin-top: 10px;
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
