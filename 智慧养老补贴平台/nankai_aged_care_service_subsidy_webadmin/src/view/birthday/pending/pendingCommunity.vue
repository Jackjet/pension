<template>
  <!-- 待处理  -->
  <div class="page-box">
    <!-- <el-menu :default-active="activeIndex" @select="tabNavActive" class="el-menu-demo" mode="horizontal" v-if='type == 1'>
      <el-menu-item index="1">补贴业务申请</el-menu-item>
      <el-menu-item index="12">注销</el-menu-item>
    </el-menu> -->
    <div class="query-search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="办理单号">
          <el-input size="medium" placeholder="办理单号" v-model="formInline.orderNum" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="老人姓名">
          <el-input size="medium" placeholder="老人姓名" v-model="formInline.name" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input size="medium" placeholder="联系电话" v-model="formInline.phone" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input size="medium" placeholder="身份证号" v-model="formInline.idCard" clearable>
          </el-input>
        </el-form-item>
        <el-form-item v-if="!streetHide" label="所属街道">
          <el-select size="medium" v-model="sqjd1" value-key="id" placeholder="所属街道" @change="streetNameHandle" clearable>
            <el-option v-for="item in streetData" :label="item.name" :value="item" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="!communitHide" label="所属社区">
          <el-select size="medium" v-model="sqjd2" value-key="id" placeholder="所属社区" @change="communityIdHandle" clearable>
            <el-option v-for="item in communityData" :label="item.name" :value="item" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" @click="queryClick">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="query-list">
      <TableList :table-data="tableData" v-loading="isSubmitLoading" :table-selection="tableSelection" :table-label="tableHeader" :table-option="tableOpction">
      </TableList>
      <Pagination :total="total" @pageChange="pageChange"></Pagination>
    </div>
    <assessment ref="assessment" @initData="initData"></assessment>
    <examine ref="examine" @initData="initData"></examine>
    <publicity ref="publicity" @initData="initData"></publicity>
  </div>
</template>

<script>
import TableList from "@/components/table";
import assessment from "./assessment.vue";
import examine from "./examine.vue";
import publicity from "./publicity.vue";
import Pagination from "@/components/table/pagination";
import { tokenStr, fileUrl, fileListData, streetList, communityList, userIfo } from "@/api/file.js"
import { subsidyFindAll, publicityCheck } from '@/api/theElderly/list.js';
export default {
  components: {
    assessment,
    examine,
    publicity,
    TableList,
    Pagination
  },
  data() {
    return {
      userType: userIfo().userType,
      type: '',
      activeShow: true,
      activeIndex: '1',
      statusType: '',
      formInline: {
        businessType: '3',
        orderNum: '',//单号
        name: '',//姓名
        idCard: '',//身份证
        phone: '',//手机号
        // status: '',//状态
        homeStreetId: userIfo().streetId,//街道
        homeCommunityId: userIfo().communityId,//社区
        page: 1,
        size: 10,
      },
      tableSelection: {
        key: true,
        type: "",
        detaile: false,
      },
      isSubmitLoading: false,
      tableData: [],
      tableHeader: [
        { label: "老人姓名", list: "name" },
        { label: "所属街道", list: "homeStreetName" },
        { label: "所属社区", list: "homeCommunityName" },
        { label: "性别", list: "sex" },
        { label: "联系电话", list: "phone" },
        { label: "身份证号", list: "idCard" },
        { label: "办理单号", list: "orderNum" },
        {
          type: 'html',
          label: '状态',
          list: 'status',
          code: (row) => {
            if (row.status === 0) {
              return '<span>办理中</span>'
            } else if (row.status === 1) {
              return '<span>完成</span>'
            } else if (row.status === 2) {
              return '<span>已驳回</span>'
            } else if (row.status === 3) {
              return '<span>无须照料</span>'
            }
          }
        },
        { label: "申请时间", list: "createTime" },
        { label: "终审时间（建议）", list: "endTime" },
      ],
      tableOpction: {
        label: "操作",
        width: "220px",
        value: 0,
        options: [
          {
            label: "审核",
            key: 0,
            type: "text",
            show: (row) => {
              if (this.statusType == '0' && row.processNum != 0) {
                return true
              } else {
                return false
              }
            },
            method: (row) => {
              this.handleToExamine(row);
            },
          },
          {
            label: "详情",
            key: 0,
            type: "text",
            method: (row) => {
              this.handleDetails(row);
            },
          },
          {
            label: "重新编辑",
            key: 0,
            type: "text",
            show: (row) => {
              return row.processNum == -1 || row.processNum == 0;
            },
            method: (row) => {
              this.handleEdit(row);
            },
          },
        ],
      },
      total: 0,
      streetData: [],
      communityData: [],
      sqjd1: "",
      sqjd2: "",
      streetHide: false,
      communitHide: false,
    }
  },
  mounted() {
    let query = this.$route.query;
    if(query.index == 2){
      this.formInline.cancelRemark = 2
    }else if(query.index == 3){
      this.formInline.cancelRemark = 1
    }
    if (userIfo().streetId) {
      this.formInline.homeStreetId = userIfo().streetId
      this.streetHide = true
    }
    if (userIfo().communityId) {
      this.formInline.homeCommunityId = userIfo().communityId
      this.communitHide = true
    }
    if (query.type == 1) {
      this.statusType = query.processType
      this.formInline.processType = query.processType
    }
    this.type = query.type
    if (this.userType == 3) {
      this.tableHeader.forEach((v, i) => {
        if (v.label == '身份证号') {
          v.label = '户籍地址'
          v.list = 'homeAddress'
        }
      })
    }
    if (query.type == '2') {
      this.activeShow = false
      this.activeIndex = query.index
    }
    this.listData();
    // 街道
    streetList().then(res => {
      if (res.data.code === 1) {
        this.streetData = res.data.data.content;
      }
    });
    let id = this.formInline.homeStreetId
    this.communityFun(id);
  },
  methods: {
    initData() {
      this.listData();
    },
    handleEdit(row) {
      this.$router.push({
        path: '/birthday/business',
        query: {
          idCard: row.idCard,
          orderNum: row.orderNum
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
    streetNameHandle(value) {
      // this.formInline.streetId = value.id;
      // this.formInline.streetName = value.name;
      // this.formInline.communityId = "";
      // this.formInline.communityName = "";
      this.formInline.homeStreetId = value.id;
      this.formInline.homeCommunityId = "";
      this.communityFun(value.id);
    },
    communityIdHandle(value) {
      // this.formInline.communityId = value.id;
      // this.formInline.communityName = value.name;
      this.formInline.homeCommunityId = value.id;
    },
    queryClick() {
      this.formInline.page = 1;
      this.formInline.size = 10;
      this.listData();
    },
    tabNavActive(index) {
      this.activeIndex = index;
      this.sqjd1 = "";
      this.sqjd2 = "";
      this.formInline = {
        businessType: index,
        orderNum: '',//单号
        name: '',//姓名
        idCard: '',//身份证
        phone: '',//手机号
        // status: "",//状态
        homeStreetId: userIfo().streetId,//街道
        homeCommunityId: userIfo().communityId,//社区
        page: 1,
        size: 10,
      }
      let query = this.$route.query;
      if (query.type == 1) {
        this.formInline.processType = query.processType
      }
      this.listData();
    },
    listData() {
      let query = this.$route.query
      if (query.type == '2') {
        this.formInline.status = '1';
      }
      subsidyFindAll(this.formInline).then(res => {
        if (res.data.code === 1) {
          this.tableData = res.data.data.content;
          this.total = res.data.data.totalElements;
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    pageChange(val) {
      this.formInline.page = val.page;
      this.formInline.size = val.limit
      this.listData();
    },
    handleToExamine(row) {
      this.$router.push({
        path: '/birthday/toExamine',
        query: {
          id: row.id,
          liveSubsidy: 0,
          nursingSubsidy: 0,
          poorSubsidy: 0
        }
      })
    },
    handleDetails(row) {
      this.$router.push({
        path: '/birthday/toExamine',
        query: {
          id: row.id,
          liveSubsidy: 0,
          nursingSubsidy: 0,
          poorSubsidy: 0,
          type: "详情"
        }
      })
    },

  }
}
</script>

<style lang="scss" scoped>
.page-box {
  padding: 20px 50px;
  box-sizing: border-box;
  .query-search {
    margin-top: 20px;
    border-radius: 4px;
    box-shadow: $back-shadow;
    padding: 15px 10px;
  }
  .query-list {
    margin-top: 20px;
  }
}
.query-search .el-form-item {
  margin: 0;
}
</style>
