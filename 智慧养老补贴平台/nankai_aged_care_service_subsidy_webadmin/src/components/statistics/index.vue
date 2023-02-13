<template>
  <div class="statistics-box">
    <el-row :gutter="20">
      <el-col v-if="isType!=='3'" :span="6">
        <div class="left-subsidy">
          <div class="subsidy-information">
            <h2>当期发放信息</h2>
            <div class="subsidy-date-statistics">
              <div class="subsidy-date">
                <h3>补贴发放月份</h3>
                <div class="subsidy-month">{{currentPeriodData.month}}月</div>
                <div class="subsidy-year">{{currentPeriodData.year}}年</div>
              </div>
              <div class="subsidy-statistics">
                <h3><i class="el-icon-s-data"></i> 统计</h3>
                <p>{{currentPeriodData.nums}} 人</p>
                <p>{{currentPeriodData.subsidyAmount}} 元</p>
              </div>
            </div>
          </div>
          <div class="subsidy-num">
            <el-row>
              <el-col :span="24">
                <h2>发放信息</h2>
              </el-col>
              <el-col :span="12">
                <span>银行：{{currentPeriodData.bankNums}}人</span>
              </el-col>
              <el-col :span="12">
                <span>银行：{{currentPeriodData.bankSubsidyAmount}}元</span>
              </el-col>
              <el-col :span="12">
                <span>现金：{{currentPeriodData.cashNums}}人</span>
              </el-col>
              <el-col :span="12">
                <span>现金：{{currentPeriodData.cashSubsidyAmount}}元</span>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="business-statistics">
          <h2>{{title}}</h2>
          <ul class="statistics-num">
            <li v-for="(item,index) in handleList" :key="index" @click="routerListClick(item.routerPath,'1',item,)">
              <span>{{item.num}}</span>
              <p>{{item.title}}</p>
            </li>
            <!-- <li @click="routerListClick('/pending/list')">
              <span>9</span>
              <p>待处理</p>
            </li>
            <li @click="routerListClick('/pending/list')">
              <span>9</span>
              <p>待处理</p>
            </li>
            <li @click="routerListClick('/pending/list')">
              <span>9</span>
              <p>待处理</p>
            </li>
            <li @click="routerListClick('/pending/list')">
              <span>9</span>
              <p>待处理</p>
            </li> -->
          </ul>
        </div>
        <div v-if="isType!=='3'" class="business-statistics">
          <h2>当月申报情况</h2>
          <ul class="statistics-num">
            <li v-for="(item,index) in monthList" :key="index" @click="routerListClick(item.routerPath,'2',item)">
              <span>{{item.num}}</span>
              <p>{{item.title}}</p>
            </li>
          </ul>
        </div>
        <!-- <div class="statistics-list">
          <h2>当月申报情况</h2>
          <TableList :table-data="tableData" v-loading="isSubmitLoading" :table-selection="tableSelection" :table-label="tableHeader" :table-option="tableOpction">
          </TableList>
        </div> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TableList from "@/components/table";
import { userIfo } from '@/api/file.js';
export default {
  components: {
    TableList
  },
  props: {
    // 标题
    title: {
      type: String,
      default: () => {
        return ""
      }
    },
    //居家养老补贴业务
    handleList: {
      type: Array,
      default: () => {
        return []
      }
    },
    monthList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 当前发放信息
    currentPeriodData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      isType: userIfo().userType,
      tableSelection: {
        key: true,
        type: "",
        detaile: false,
      },
      isSubmitLoading: false,
      tableData: [],
      tableHeader: [
        {
          type: "html",
          label: "",
          list: "type",
          width: "180",
          textAlign: "left",
          code: (row) => {
            return (
              '<span style="color: #afb7c8!important; font-size: 12px;">' +
              row.type +
              "</span>"
            );
          },
        },
        { label: "新增", list: "name1" },
        { label: "等级跟新", list: "name2" },
        { label: "注销", list: "name3" },
        { label: "区内转移", list: "name4" },
        { label: "转社区", list: "name5" },
        { label: "转街道", list: "name6" },
        { label: "转第三方", list: "name7" },
        { label: "合计", list: "name7" },
      ],
      tableOpction: {
        label: "操作",
        width: "220px",
        value: 1,
        options: [
          {
            label: "详情",
            key: 0,
            type: "text",
            icon: "el-icon-tickets",
            State: true,
            method: (row) => {
              this.handleDetail(row);
            },
          },
        ],
      },
    }
  },
  created() {
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear()
  },
  methods: {
    routerListClick(path, type, item) {
      this.$router.push({
        path: path,
        query: {
          type,
          index: item.index,
          name: item.title,
          processType: item.processType
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.statistics-box {
  color: $font-color2;
  box-sizing: border-box;
  margin-bottom: 20px;
  .left-subsidy {
    padding: 0 10px;
    margin-top: 5px;
    border-radius: 5px;
    box-shadow: $back-shadow;
  }
  .subsidy-information {
    border-bottom: 1px dashed #ccc;
    h2 {
      line-height: 40px;
      border-bottom: 1px dashed #ccc;
    }
    .subsidy-date-statistics {
      display: flex;
      justify-content: space-around;
      .subsidy-date,
      .subsidy-statistics {
        text-align: center;
        line-height: 22px;
        padding: 20px 0;
      }
    }
  }
  .subsidy-num {
    line-height: 22px;
    padding: 25px 0;
  }
  .business-statistics {
    border-radius: 5px;
    box-shadow: $back-shadow;
    padding: 0 10px;
    margin: 5px 0;
    h2 {
      line-height: 40px;
      border-bottom: 1px dashed #ccc;
    }
    .statistics-num {
      display: flex;
      justify-content: space-around;
      padding: 11px 0;
      li {
        text-align: center;
        line-height: 34px;
        cursor: pointer;
      }
    }
  }
  .statistics-list {
    // flex: 1;
    border-radius: 5px;
    box-shadow: $back-shadow;
    padding: 0 10px;
    margin-top: 20px;
    box-sizing: border-box;
    h2 {
      line-height: 40px;
      border-bottom: 1px dashed #ccc;
    }
  }
}
</style>
