<template>
  <el-main>
    <el-col :span="24">
      <el-form :inline="true" class="el-InputForm">
        <el-form-item style="width: 160px">
          <el-input
            clearable
            size="medium"
            placeholder="请输入老人姓名"
            prefix-icon="el-icon-search"
            v-model="SearchItem.name"
          >
          </el-input>
        </el-form-item>
        <el-form-item style="width: 160px">
          <el-input
            clearable
            size="medium"
            placeholder="请输入联系电话"
            prefix-icon="el-icon-search"
            v-model="SearchItem.phone2"
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
      sex: ["女", "男"],
      table: {
        list: {
          // type: 'checkbox',
          header: [
            {
              label: "姓名",
              field: "name",
            },
            {
              label: "性别",
              field: "sex",
            },
            {
              label: "年龄",
              field: "age",
            },
            {
              label: "手机号",
              field: "phone2",
            },
            {
              label: "审核状态",
              field: "auditstatus",
            },
            {
              label: "所属服务社区",
              field: "deptname",
            },
            {
              label: "家庭住址",
              field: "address",
            },
            {
              label: "户籍地址",
              field: "hujiaddress",
            },
            {
              label: "老人类别",
              field: "oldtypename",
            },
            {
              label: "部门",
              field: "operatordeptname",
            },
            {
              label: "服务类型",
              field: "",
            },
            {
              label: "服务状态",
              field: "",
            },
            {
              label: "失能情况",
              field: "anergy",
            },
            {
              label: "残疾情况",
              field: "dependency",
            },
            {
              label: "慢性病",
              field: "",
            },
            {
              label: "服务套餐",
              field: "servicecombos",
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
        name: "",
        phone2: "",
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
        let findUrl = this.api.hujilaoren.findAll;
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
          if (item.sex) {
            item.sex = that.sex[item.sex];
          }
          if (item.type === "0") {
            item.type = "流入";
          } else if (item.type === "1") {
            item.type = "流出";
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
