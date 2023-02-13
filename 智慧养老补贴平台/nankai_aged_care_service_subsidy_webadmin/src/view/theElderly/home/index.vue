<template>
  <div class="home-page">
    <business-nav :dataList="businessList"></business-nav>
    <statistics-box v-if="update" title="居家养老补贴业务" :currentPeriodData="currentPeriod" :handleList="handleList" :monthList='monthList'></statistics-box>
    <div v-if="isType!=='3'" class="box">享受居家养老服务补贴-老人数据分析</div>
    <pie-chart v-if='len.length == 3&&isType!=="3"' :echartsData="echartsData"></pie-chart>
  </div>
</template>

<script>
import { findGrantByMonth, findUserGenre, subsidyAnalysisFindUserAl, subsidyAnalysisFindUserLive, findProcessByUser, findProcessByUserAndMonth } from "@/api/theElderly/apply.js";
import { userIfo } from '@/api/file.js';
import BusinessNav from "@/components/business";
import StatisticsBox from "@/components/statistics";
import PieChart from "@/components/statistics/pieChart";
export default {
  components: {
    BusinessNav,
    StatisticsBox,
    PieChart
  },
  data() {
    return {
      isType: userIfo().userType,
      update: true,
      // 首页导航数据 businessList
      // type 1  两个提示步骤针对业务申请类型
      // type 2  一个提示步骤提供选择类型
      // type 3  针对一个导航对应多个页面时提供选择跳转
      // 如果不传直接跳转对应页
      businessList: [
        {
          name: "补贴业务申请",
          type: 1,
          router: ["/business/subsidy", "/business/salary"]
        },
        {
          name: "评估等级更新",
          type: 2,
          router: ["/assessment/subsidy", "/assessment/salary"]
        },
        {
          name: "注销",
          type: 2,
          router: ["/cancellation/apply", "/cancellation/home"]
        },
        {
          name: "区内迁转",
          type: 2,
          router: ["/area/transfer", "/area/home"]
        },
        {
          name: "复核变更",
          type: 2,
          router: ["/review/subsidy", "/review/salary"]
        },
        {
          name: "社区居住证明上报",
          router: "/information/list?type=3"
        },
        {
          name: "街道补贴上报",
          type: 3,
          router: [{
            title: "补贴“发放”表",
            path: "/street/grant?type=1"
          },
          {
            title: "补贴“变更”表",
            path: "/street/change?type=1"
          }
            , {
            title: "南开区民政专项经费（居家养老政府补贴）支出情况表",
            path: "/street/spendMoney?type=1",
          }
          ]
        },
        {
          name: "民政补贴汇总",
          type: 3,
          router: [{
            title: "补贴“发放”表",
            path: "/street/grant?type=2"
          },
          {
            title: "补贴“变更”表",
            path: "/street/change?type=2"
          }, {
            title: "居家养老服务补贴拨款表",
            path: "/street/spendMoney?type=2",
          }]
        },
        {
          name: "居家养老补贴发放",
          router: "/information/list?type=1"
        },
        {
          name: "享受居家养老档案",
          router: "/information/list?type=2"
        },
        {
          name: "我的消息",
          router: "/news/list"
        }
      ],
      handleList: [
        {
          routerPath: "/pending/list",
          num: 9,
          title: "待处理",
          processType: 0
        },
        {
          routerPath: "/pending/list",
          num: 9,
          title: "办理中",
          processType: 1
        },
        {
          routerPath: "/pending/list",
          num: 9,
          title: "已完成",
          processType: 2
        },
        {
          routerPath: "/pending/list",
          num: 9,
          title: "已驳回",
          processType: 3
        },
        {
          routerPath: "/pending/list",
          num: 9,
          title: "总数",
          processType: 4
        },
      ],
      monthList: [
        {
          routerPath: "/pending/list",
          num: 9,
          title: "新增",
          index: '1'
        },
        {
          routerPath: "/pending/list",
          num: 9,
          title: "等级更新",
          index: '11'
        },
        {
          routerPath: "/pending/list",
          num: 9,
          title: "注销",
          index: '12'
        },
        {
          routerPath: "/pending/list",
          num: 9,
          title: "区内转移",
          index: '13'
        },
        {
          routerPath: "/pending/list",
          num: 9,
          title: "复核变更",
          index: '14'
        },
        {
          routerPath: "/pending/list",
          num: 9,
          title: "总数",
          index: '1'
        },
      ],
      // 当期发放信息
      currentPeriod: {},
      // 图表统计
      echartsData: {
        echarts1: {
          title: "老人类型统计",
          options: []
        },
        echarts2: {
          title: "照顾等级",
          options: []
        },
        echarts3: {
          title: "居住情况分析",
          options: []
        },
      },
      streetId: '',
      communityId: '',
      len: []
    }
  },
  created() {
    this.reload();
    sessionStorage.setItem("headerTitle", "居家养老补贴")
    if (userIfo().userType === '1' || userIfo().userType === '5') {//社区
      this.businessList = [
        {
          name: "补贴业务申请",
          type: 1,
          router: ["/business/subsidy", "/business/salary"]
        },
        {
          name: "评估等级更新",
          type: 2,
          router: ["/assessment/subsidy", "/assessment/salary"]
        },
        {
          name: "注销",
          type: 2,
          router: ["/cancellation/apply", "/cancellation/home"]
        },
        {
          name: "区内迁转",
          type: 2,
          router: ["/area/transfer", "/area/home"]
        },
        {
          name: "复核变更",
          type: 2,
          router: ["/review/subsidy", "/review/salary"]
        },
        {
          name: "社区居住证明上报",
          router: "/information/list?type=3"
        },
        {
          name: "享受居家养老档案",
          router: "/information/list?type=2"
        },
        {
          name: "我的消息",
          router: "/news/list"
        }
      ];
    } else if (userIfo().userType === '2' || userIfo().userType === '6') {//街道
      this.businessList = [
        {
          name: "街道补贴上报",
          type: 3,
          router: [{
            title: "补贴“发放”表",
            path: "/street/grant?type=1"
          },
          {
            title: "补贴“变更”表",
            path: "/street/change?type=1"
          },
          {
            title: "南开区民政专项经费（居家养老政府补贴）支出情况表",
            path: "/street/spendMoney?type=1",
          }
          ]
        },
        {
          name: "居家养老补贴发放",
          router: "/information/list?type=1"
        },
        {
          name: "享受居家养老档案",
          router: "/information/list?type=2"
        },
        {
          name: "我的消息",
          router: "/news/list"
        }
      ];
    } else if (userIfo().userType === '3') {//第三方
      this.businessList = [
        {
          name: "我的消息",
          router: "/news/list"
        }
      ];
    } else if (userIfo().userType === '4' || userIfo().userType === '7') {//民政局
      this.businessList = [
        {
          name: "民政补贴汇总",
          type: 3,
          router: [{
            title: "补贴“发放”表",
            path: "/street/grant?type=2"
          },
          {
            title: "补贴“变更”表",
            path: "/street/change?type=2"
          }, {
            title: "居家养老服务补贴拨款表",
            path: "/street/spendMoney?type=2",
          }]
        },
        {
          name: "享受居家养老档案",
          router: "/information/list?type=2"
        },
        {
          name: "我的消息",
          router: "/news/list"
        }
      ];
    }
  },
  mounted() {
    if (userIfo().streetId) {
      this.streetId = userIfo().streetId
    }
    if (userIfo().communityId) {
      this.communityId = userIfo().communityId
    }
    // 当期发放信息
    findGrantByMonth({ businessType: 1 }).then(res => {
      if (res.data.code === 1) {
        this.currentPeriod = res.data.data;
      } else {
        this.$message.error(res.data.msg);
      }
    })
    // 老人类型统计
    findUserGenre({ businessType: '1' }).then(res => {
      if (res.data.code === 1) {
        this.len.push(1)
        res.data.data.forEach(item => {
          this.echartsData.echarts1.options.push({ value: item.num, name: item.genreName });
        })
      } else {
        this.$message.error(res.data.msg);
      }
    })
    // 照顾等级
    subsidyAnalysisFindUserAl({ businessType: '1' }).then(res => {
      if (res.data.code === 1) {
        this.len.push(1)
        this.echartsData.echarts2.options.push({ value: res.data.data.low, name: "轻度" });
        this.echartsData.echarts2.options.push({ value: res.data.data.medium, name: "中度" });
        this.echartsData.echarts2.options.push({ value: res.data.data.high, name: "重度" });
      } else {
        this.$message.error(res.data.msg);
      }
    })
    // // 老人居住情况分析
    subsidyAnalysisFindUserLive({ businessType: '1' }).then(res => {
      if (res.data.code === 1) {
        this.len.push(1)
        res.data.data.forEach(item => {
          this.echartsData.echarts3.options.push({ value: item.num, name: item.live });
        })
      } else {
        this.$message.error(res.data.msg);
      }
    })
    findProcessByUser({ streetId: this.streetId, communityId: this.communityId }).then(res => {
      if (res.data.code === 1) {
        this.handleList[0].num = res.data.data.pending
        this.handleList[1].num = res.data.data.processing
        this.handleList[2].num = res.data.data.completed
        this.handleList[3].num = res.data.data.rejected
        this.handleList[4].num = res.data.data.count
      } else {
        this.$message.error(res.data.msg);
      }
    })
    findProcessByUserAndMonth({ streetId: this.streetId, communityId: this.communityId }).then(res => {
      if (res.data.code === 1) {
        this.monthList[0].num = res.data.data.add
        this.monthList[1].num = res.data.data.update
        this.monthList[2].num = res.data.data.cancel
        this.monthList[3].num = res.data.data.updateAddress
        this.monthList[4].num = res.data.data.updateInfo ? res.data.data.updateInfo : 0
        this.monthList[5].num = res.data.data.count
      } else {
        this.$message.error(res.data.msg);
      }
    })
  },
  methods: {
    reload() {
      // 移除组件
      this.update = false
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.update = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  padding: 20px 50px;
  box-sizing: border-box;
}
.box {
  // padding:10px;
  margin: 20px 0;
  color: #555;
  box-sizing: border-box;
  width: 100%;
  border-radius: 5px;
  // box-shadow: $back-shadow;
}
</style>
