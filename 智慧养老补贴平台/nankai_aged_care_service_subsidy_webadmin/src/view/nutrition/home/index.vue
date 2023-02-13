<template>
  <div class="home-page">
    <business-nav :dataList="businessList"></business-nav>
    <statistics-box v-if="update" title="百岁营养补贴业务" :currentPeriodData="currentPeriod" :handleList="handleList" :monthList='monthList'></statistics-box>
    <!-- <pie-chart v-if='len.length == 3' :echartsData="echartsData"></pie-chart> -->
  </div>
</template>

<script>
import { findGrantByMonth, findProcessByUser, findProcessByUserAndMonth } from "@/api/nutrition";
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
      update: true,
      // 首页导航数据 businessList
      // type 1  两个提示步骤针对业务申请类型
      // type 2  一个提示步骤提供选择类型
      // type 3  针对一个导航对应多个页面时提供选择跳转
      // 如果不传直接跳转对应页
      businessList: [
        {
          name: "百岁营养补贴业务申请",
          type: 5,
          router: "/nutrition/business/subsidy"
        },
        {
          name: "注销",
          router: "/nutrition/cancellation"
        },
        {
          name: "社区健在证明上报",
          router: "/nutrition/information/list?type=1&olderType=100"
        },
        {
          name: "街道补贴上报",
          router: "/nutrition/information/list?type=2&olderType=100"
        },
        {
          name: "民政补贴汇总",
          router: "/nutrition/street/spendMoney"
        },
        {
          name: "街道补贴发放",
          router: "/nutrition/information/list?type=3&olderType=100"
        },
        {
          name: "享受百岁营养补贴老人档案",
          router: "/nutrition/information/list?type=4&olderType=100"
        },
        {
          name: "我的消息",
          router: "/nutrition/news/list"
        }
      ],
      handleList: [
        {
          routerPath: "/nutrition/pending/list?olderType=100",
          num: 0,
          title: "待处理",
          processType: 0
        },
        {
          routerPath: "/nutrition/pending/list?olderType=100",
          num: 0,
          title: "办理中",
          processType: 1
        },
        {
          routerPath: "/nutrition/pending/list?olderType=100",
          num: 0,
          title: "已完成",
          processType: 2
        },
        {
          routerPath: "/nutrition/pending/list?olderType=100",
          num: 0,
          title: "已驳回",
          processType: 3
        },
        {
          routerPath: "/nutrition/pending/list?olderType=100",
          num: 0,
          title: "总数",
          processType: 4
        },
      ],
      monthList: [
        {
          routerPath: "/nutrition/pending/list?olderType=100",
          num: 0,
          title: "新增",
          index: '2'
        },

        {
          routerPath: "/nutrition/pending/list?olderType=100",
          num: 0,
          title: "注销",
          index: '21'
        },
        {
          routerPath: "/nutrition/pending/list?olderType=100",
          num: 0,
          title: "总数",
          index: '2'
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
    sessionStorage.setItem("headerTitle", "百岁营养补贴")
    if (userIfo().userType === '1' || userIfo().userType === '5') {//社区
      this.businessList = [
        {
          name: "百岁营养补贴业务申请",
          type: 5,
          router: "/nutrition/business/subsidy"
        },
        {
          name: "注销",
          router: "/nutrition/cancellation"
        },
        {
          name: "社区健在证明上报",
          router: "/nutrition/information/list?type=1&olderType=100"
        },
        {
          name: "享受百岁营养补贴老人档案",
          router: "/nutrition/information/list?type=4&olderType=100"
        },
        {
          name: "我的消息",
          router: "/nutrition/news/list"
        }
      ];
    } else if (userIfo().userType === '2' || userIfo().userType === '6') {//街道
      this.businessList = [
        {
          name: "街道补贴上报",
          router: "/nutrition/information/list?type=2&olderType=100"
        },
        {
          name: "街道补贴发放",
          router: "/nutrition/information/list?type=3&olderType=100"
        },
        {
          name: "享受百岁营养补贴老人档案",
          router: "/nutrition/information/list?type=4&olderType=100"
        },
        {
          name: "我的消息",
          router: "/nutrition/news/list"
        }
      ]
    } else if (userIfo().userType === '4' || userIfo().userType === '7') {//民政局
      this.businessList = [
        {
          name: "民政补贴汇总",
          router: "/nutrition/street/spendMoney"
        },
        {
          name: "享受百岁营养补贴老人档案",
          router: "/nutrition/information/list?type=4&olderType=100"
        },
        {
          name: "我的消息",
          router: "/nutrition/news/list"
        }
      ]
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
    findGrantByMonth({ businessType: 2 }).then(res => {
      if (res.data.code === 1) {
        this.currentPeriod = res.data.data;
      } else {
        this.$message.error(res.data.msg);
      }
    })
    findProcessByUser({ streetId: this.streetId, communityId: this.communityId }).then(res => {
      if (res.data.code === 1) {
        this.handleList[0].num = res.data.data.pending ? res.data.data.pending : 0
        this.handleList[1].num = res.data.data.processing ? res.data.data.processing : 0
        this.handleList[2].num = res.data.data.completed ? res.data.data.completed : 0
        this.handleList[3].num = res.data.data.rejected ? res.data.data.rejected : 0
        this.handleList[4].num = res.data.data.count ? res.data.data.count : 0
      } else {
        this.$message.error(res.data.msg);
      }
    })
    findProcessByUserAndMonth({ streetId: this.streetId, communityId: this.communityId }).then(res => {
      if (res.data.code === 1) {
        this.monthList[0].num = res.data.data.add ? res.data.data.add : 0
        this.monthList[1].num = res.data.data.die ? res.data.data.die : 0
        this.monthList[2].num = res.data.data.total ? res.data.data.total : 0
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
</style>
