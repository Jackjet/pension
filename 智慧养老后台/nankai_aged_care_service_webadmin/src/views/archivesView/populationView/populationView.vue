<template>
  <el-main>
    <el-col :span="24">
      <el-form :inline="true" class="el-InputForm">
        <el-form-item style="width: 160px">
          <el-input
            clearable
            size="medium"
            placeholder="请输入身份证号"
            prefix-icon="el-icon-search"
            v-model="SearchItem.idCard"
          >
          </el-input>
        </el-form-item>
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
            v-model="SearchItem.phone"
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
        <!--<el-form-item>-->
        <!--<el-button type="primary" size='medium' @click="synchronism">同步</el-button>-->
        <!--</el-form-item>-->
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
      sex: ["女", "男"],
      synchronismArr: [],
      table: {
        list: {
          // type: '',
          header: [
            {
              label: "老人姓名",
              field: "name",
            },
            {
              label: "身份证号",
              field: "idCard",
            },
            {
              label: "性别",
              field: "sex",
            },
            {
              label: "联系电话",
              field: "phone",
            },
            {
              label: "创建时间",
              field: "createTime",
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
        idCard: "",
        phone: "",
      },
      lastItem: {
        name: "",
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
        let findUrl = this.api.population.findAll;
        let url =
          findUrl +
          "?page=" +
          this.table.paging.currentPage +
          "&size=" +
          this.table.paging.limit;
        let obj = {
          name: this.SearchItem.name,
          idCard: this.SearchItem.idCard,
          phone: this.SearchItem.phone,
        };
        const response = await this.request.dataGet(that, url, obj);
        this.$refs.trigger.loading = false;
        response.data.content.forEach(function (item, index) {
          if (item.sex) {
            item.sex = that.sex[item.sex];
          }
        });
        that.table.list.data = response.data.content;
        that.table.paging.total = response.data.totalElements;
      } catch (even) {
        that.$message.error("数据获取失败");
      }
    },
    handleSelectionChange(item) {
      this.synchronismArr = item;
    },
    synchronism() {
      const that = this;
      that
        .$confirm("是否删除?", "提示", {
          type: "warning",
        })
        .then(async () => {
          let url = this.api.webadmin.delete + "?id=" + row.id;
          let parameter = {};
          const response = await this.request.dataDelete(that, url, parameter);
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
