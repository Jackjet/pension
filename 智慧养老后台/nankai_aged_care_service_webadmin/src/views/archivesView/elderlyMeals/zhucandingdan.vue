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
            v-model="SearchItem.ordername"
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
      oldsex: ["女", "男"],
      table: {
        list: {
          // type: 'checkbox',
          header: [
            {
              label: "老人姓名",
              field: "ordername",
            },
            {
              label: "身份证号",
              field: "cardid",
            },
            {
              label: "性别",
              field: "oldsex",
            },
            {
              label: "年龄",
              field: "oldage",
            },
            {
              label: "联系电话",
              field: "orderphone",
            },
            {
              label: "户籍地址",
              field: "hjvillagename",
            },
            {
              label: "户籍详细地址",
              field: "hujiaddress",
            },
            {
              label: "家庭地址",
              field: "villagename",
            },
            {
              label: "家庭详细地址",
              field: "address",
            },
            {
              label: "消费食堂",
              field: "merchantname",
            },
            {
              label: "食堂所属区域",
              field: "ctcountyname",
            },
            {
              label: "食堂所属街道",
              field: "cttownsname",
            },
            {
              label: "食堂所属社区",
              field: "ctvillagename",
            },
            {
              label: "订单来源",
              field: "",
            },
            {
              label: "消费金额(元)",
              field: "",
            },
            {
              label: "实收金额(元)",
              field: "",
            },
            {
              label: "补贴金额(元)",
              field: "subsidymoney",
            },
            {
              label: "补企金额(元)",
              field: "",
            },
            {
              label: "服务商(运营公司)",
              field: "companyname",
            },
            {
              label: "供应商企业",
              field: "enterprisename",
            },
            {
              label: "订单号",
              field: "ordernum",
            },
            {
              label: "订购日期",
              field: "receipttime",
            },
            {
              label: "服务类别",
              field: "servicename1wa",
            },
            {
              label: "就餐日期",
              field: "mealtime2",
            },
            {
              label: "菜品",
              field: "foodnameNum",
            },
            {
              label: "就餐方式",
              field: "eatway",
            },
            {
              label: "餐别",
              field: "mealtype",
            },
            {
              label: "数量",
              field: "foodnum",
            },
            {
              label: "订单状态",
              field: "orderstatus2s",
            },
            {
              label: "支付方式",
              field: "payment2s",
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
        ordername: "",
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
        let findUrl = this.api.zhucan.findAll;
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
          if (item.oldsex) {
            item.oldsex = that.oldsex[item.oldsex];
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
