<template>
  <!-- 业务列表查询 全部、处理中、已完成、已驳回  -->
  <div class="page-box">
    <el-menu :default-active="activeIndex" @select="tabNavActive" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">补贴业务申请</el-menu-item>
      <el-menu-item index="2">评估等级更新</el-menu-item>
      <el-menu-item index="3">注销</el-menu-item>
      <el-menu-item index="4">区内迁转</el-menu-item>
      <el-menu-item index="5">复核变更</el-menu-item>
    </el-menu>
    <div class="query-search">
      <el-form :inline="true" :model="formInline">
        <el-form-item label="办理单号">
          <el-input v-model="formInline.orderNum" placeholder="办理单号"></el-input>
        </el-form-item>
        <el-form-item label="老人姓名">
          <el-input v-model="formInline.name" placeholder="老人姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="formInline.phone" placeholder="联系电话"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="formInline.idCard" placeholder="身份证号"></el-input>
        </el-form-item>
        <el-form-item label="所属街道">
          <el-select size="medium" v-model="formInline.homeStreetId" placeholder="所属街道">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属社区">
          <el-select size="medium" v-model="formInline.homeCommunityId" placeholder="所属社区">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务类型">
          <el-select size="medium" v-model="formInline.businessType" placeholder="业务类型">
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
        <el-form-item label="办理进度">
          <el-select size="medium" v-model="formInline.status" placeholder="办理进度">
            <el-option label="已驳回" :value="-1"></el-option>
            <el-option label="办理中" :value="0"></el-option>
            <el-option label="完成" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="medium">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="query-list">
      <TableList :table-data="tableData" v-loading="isSubmitLoading" :table-selection="tableSelection" :table-label="tableHeader" :table-option="tableOpction">
      </TableList>
      <Pagination :total="total" @pageChange="pageChange"></Pagination>
    </div>
  </div>
</template>

<script>
import TableList from "@/components/table";
import Pagination from "@/components/table/pagination";
import { subsidyFindAll, publicityCheck } from '@/api/theElderly/list.js';
import { streetList } from '@/api/file.js';
export default {
  components: {
    TableList,
    Pagination
  },
  data() {
    return {
      activeIndex: '1',
      formInline: {
        orderNum: "",//单号
        name: "",//姓名
        phone: "",//联系电话
        idCard: "",//身份证号
        homeStreetId: "",//户籍地街道Id	
        homeStreetName: "",//户籍地街道	
        homeCommunityId: "",//户籍地社区Id	
        homeCommunityName: "",//户籍地社区
        businessType: "",//业务类型
        status: "",//办理进度
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
        { label: "所属街道", list: "streetName" },
        { label: "所属社区", list: "communityName" },
        { label: "性别", list: "sex" },
        { label: "联系电话", list: "phone" },
        { label: "身份证号", list: "idCard" },
        { label: "办理单号", list: "orderNum" },
        // { label: "状态", list: "status" },//办理状态:-1已驳回 ，0办理中，1完成
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
            label: "详情",
            key: 0,
            type: "text",
            method: (row) => {
              this.handleDetails(row);
            },
          },
        ],
      },
      total: 10,
    }
  },
  mounted() {
    // 街道
    streetList().then(res => {
      if (res.data.code === 1) {
        // this.streetData = res.data.content;
      }
    })
    // this.listData();
  },
  methods: {
    tabNavActive(index) {
      console.log(index)
    },
    listData() {
      subsidyFindAll().then(res => {
        if (res.data.code === 1) {
          this.tableData = res.data.data.content;
          this.total = res.data.data.totalElements;
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    pageChange(val) {
      console.log(val)
    },
    handleDetails(row) {
      //   this.$router.push({
      //     path: '/information/detail',
      //     query: {
      //       id: row.id
      //     }
      //   })
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
// .query-search .el-form-item {
//   margin: 0;
// }
</style>
