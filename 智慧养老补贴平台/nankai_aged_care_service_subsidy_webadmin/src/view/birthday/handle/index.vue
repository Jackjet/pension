<template>
  <!-- 待处理 -->
  <div class="page-box">
    <div class="query-search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="办理单号">
          <el-select size="medium" v-model="formInline.region" placeholder="所属街道">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="老人姓名">
          <el-select size="medium" v-model="formInline.region" placeholder="所属社区">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-date-picker size="medium" v-model="formInline.region" type="month" placeholder="选择月">
          </el-date-picker>
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
import Pagination from "@/components/table/pagination"
export default {
  components: {
    TableList,
    Pagination
  },
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableSelection: {
        key: true,
        type: "",
        detaile: false,
      },
      isSubmitLoading: false,
      tableData: [
        {
          type: "办理中",
          name1: "2",
          name2: "2",
          name3: "2",
          name4: "2",
          name5: "2",
          name6: "2",
          name7: "2",
          name8: "2",
        },
      ],
      tableHeader: [
        { label: "序号", list: "name1" },
        { label: "所属街道", list: "name2" },
        { label: "本月应发人数", list: "name3" },
        { label: "本月应发金额（元）", list: "name4" },
        { label: "补发人次", list: "name5" },
        { label: "实发人次", list: "name6" },
        { label: "总计拨款（元）", list: "name7" },
        { label: "补发", list: "name7" },
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
            icon: "",
            State: true,
            method: (row) => {
              this.handleToExamine(row);
            },
          },
        ],
      },
      total: 10,
    }
  },
  methods: {
    handleToExamine() {
      this.$router.push('/subsidy/toExamine')
    },
    pageChange(val) {
      console.log(val)
    }
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
.el-form-item {
  margin: 0;
}
</style>
