<template>
  <el-main>
    <el-col :span="24">
      <el-form :inline="true" class="el-InputForm">
        <el-form-item style="width: 160px">
          <el-input
            clearable
            size="medium"
            placeholder="请输入姓名"
            prefix-icon="el-icon-search"
            v-model="SearchItem.cname"
          >
          </el-input>
        </el-form-item>
        <el-form-item style="width: 160px">
          <el-input
            clearable
            size="medium"
            placeholder="请输入联系电话"
            prefix-icon="el-icon-search"
            v-model="SearchItem.cphone"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-search"
            @click="SearchNoteList"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <!-- 表格 -->
      <tableForm
        ref="trigger"
        :table-form="table"
        @getList="getList"
        @onHandleSelectionChange="handleSelectionChange"
        @pageChange="pageChange"
      >
      </tableForm>
    </el-col>
  </el-main>
</template>

<script>
import tableForm from "plugin/table";

export default {
  components: {
    tableForm,
  },

  data() {
    return {
      synchronismArr: [],
      csex: ["女", "男"],
      table: {
        list: {
          // type: 'checkbox',
          header: [
            {
              label: "所属服务驿站",
              field: "deptname",
            },
            {
              label: "姓名",
              field: "cname",
            },
            {
              label: "性别",
              field: "csex",
            },
            {
              label: "联系电话",
              field: "cphone",
            },
            {
              label: "身份证号",
              field: "ccard",
            },
            {
              label: "关联老人数量",
              field: "num",
            },
            {
              label: "年龄",
              field: "cage",
            },
            {
              label: "认证状态",
              field: "state",
            },
          ],
          data: [],
        },

        paging: {
          total: 0,
          currentPage: 1,
          limit: 20,
        },
      },
      SearchItem: {
        cname: "",
        cphone: "",
      },
      lastItem: {
        name: "",
        isUpdate: "",
        idCard: "",
        phone: "",
      },
    };
  },

  mounted() {
    let that = this;
    that.isSubmitLoading = true;
    that.getList();
  },

  methods: {
    SearchNoteList() {
      let that = this;
      Object.entries(that.SearchItem).map((item, index) => {
        that.lastItem[item[0]] = that.SearchItem[item[0]];
      });
      this.table.paging.currentPage = 1;
      this.getList();
    },
    // 列表
    async getList() {
      const that = this;
      try {
        let findUrl = this.api.shequguanjia.findAll;
        let url =
          findUrl +
          "?page=" +
          this.table.paging.currentPage +
          "&size=" +
          this.table.paging.limit;
        let obj = that.SearchItem;
        const response = await this.request.dataGet(that, url, obj);
        this.$refs.trigger.loading = false;
        response.data.content.forEach(function (item, index) {
          if (item.csex) {
            item.csex = that.csex[item.csex];
          }
          if (item.type === "0") {
            item.type = "流入";
          } else if (item.type === "1") {
            item.type = "流出";
          }
          if (item.state === "0") {
            item.state = "未认证";
          } else if (item.state === "1") {
            item.state = "已认证";
          }
          if (item.isUpdate === "0") {
            item.isUpdate = "否";
          } else if (item.isUpdate === "1") {
            item.isUpdate = "是";
          }
        });
        that.table.list.data = response.data.content;
        that.table.paging.total = response.data.totalElements;
      } catch (even) {
        that.$message.error("数据获取失败");
      }
    },
    handleSelectionChange(item) {
      if (item.length !== 0) {
        item.forEach((item) => {
          this.synchronismArr.push(item.id);
        });
      }
    },
    // 删除
    synchronism() {
      if (this.synchronismArr.length === 0) {
        this.$message.warning("请先选择老人");
        return;
      }
      const that = this;
      that
        .$confirm("是否同步?", "提示", {
          type: "warning",
        })
        .then(async () => {
          let url = this.api.deathPopulation.Update;
          let parameter = that.synchronismArr;
          const response = await this.request.dataPut(that, url, parameter);
          if (response.code === 1) {
            that.$message.success(response.msg);
            that.getList();
            return false;
          }
          that.$message.error(response.msg);
        })
        .catch(() => {
          return false;
        });
    },

    pageChange(val) {
      this.table.paging.limit = val.limit;
      this.table.paging.currentPage = val.page;
      this.getList();
    },
  },
};
</script>

<style lang="scss">
.flex {
  display: flex;
  padding-left: 4%;
  div {
    margin-right: 10%;
    font-size: 14px;
  }
  span {
    color: #85a7f0;
  }
}
</style>
