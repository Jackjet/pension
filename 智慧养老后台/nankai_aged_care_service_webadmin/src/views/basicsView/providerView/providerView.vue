<template>
  <el-main>
    <el-col :span="24">
      <el-form :inline="true" class="el-InputForm">
        <el-form-item>
          <el-input
            clearable
            size="medium"
            placeholder="请输入服务商名称"
            prefix-icon="el-icon-search"
            v-model="SearchItem.name"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            clearable
            size="medium"
            placeholder="请输入服务商电话"
            prefix-icon="el-icon-search"
            v-model="SearchItem.phone"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            clearable
            size="medium"
            v-model="SearchItem.sysState"
            placeholder="请选择状态"
          >
            <el-option label="已禁用" value="0"></el-option>
            <el-option label="已启用" value="1"></el-option>
          </el-select>
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
        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-plus"
            @click="add"
            >添加</el-button
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
        @edit="edit"
        @look="look"
        @start="start"
        @pageChange="pageChange"
      >
      </tableForm>
    </el-col>
    <!-- 启用 -->
    <dialog-form
      :isShow="isShowStart"
      :isBtn="true"
      :width="'30%'"
      title=""
      @closeDialog="closeStartDialog"
      @saveDialog="saveStartDialog"
    >
      <div slot="form" style="text-align: left">
        由于<span style="color: red">{{ note }}</span
        >，该服务商被禁用，您确定要启用该服务商的服务功能吗？
      </div>
    </dialog-form>
    <!-- 禁用原因 -->
    <dialog-form
      :isShow="isShowRemark"
      :isBtn="true"
      :width="'30%'"
      title="您确定要停止该商家的服务功能？"
      @closeDialog="closeRemarkDialog"
      @saveDialog="saveRemarkDialog"
    >
      <el-form
        slot="form"
        ref="remarkForm"
        :model="remarkForm"
        :rules="remarkRules"
        label-width="90px"
      >
        <el-col :span="24">
          <el-form-item label="禁用原因" prop="note">
            <el-input
              type="textarea"
              size="medium"
              autocomplete="off"
              v-model="remarkForm.note"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </dialog-form>
  </el-main>
</template>

<script>
import tableForm from "plugin/table";
import dialogForm from "plugin/dialogForm";
export default {
  components: {
    tableForm,
    dialogForm,
  },

  data() {
    return {
      id: "",
      note: "",
      isShowStart: false,
      isShowRemark: false,
      remarkForm: {
        note: "",
      },
      remarkRules: {
        note: [
          { required: true, message: "请输入禁用原因", trigger: ["blur"] },
        ],
      },
      table: {
        list: {
          header: [
            {
              label: "服务商名称",
              field: "name",
            },
            {
              label: "服务商地址",
              field: "address",
            },
            {
              label: "状态",
              field: "sysState",
            },
            {
              label: "服务商电话",
              field: "phone",
            },
            {
              label: "营业时间",
              field: "openTime",
            },
            {
              type: "operation",
              label: "操作",
              field: "operation",
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
      columnList: [],
      classList: [],
      SearchItem: {
        phone: "",
        sysState: "",
        name: "",
      },
      lastItem: {
        phone: "",
        sysState: "",
        name: "",
      },
    };
  },

  mounted() {
    this.getList();
  },

  methods: {
    edit(row) {
      document.name = "服务商编辑";
      this.$router.push({
        path: "/index/providerAdd",
        query: {
          id: row.id,
          type: "1",
        },
      });
    },
    look(row) {
      document.name = "服务商详情";
      this.$router.push({
        path: "/index/providerAdd",
        query: {
          id: row.id,
          type: "2",
        },
      });
    },
    // 列表
    async getList() {
      const that = this;
      try {
        let findUrl = this.api.provider.findAll;
        let url =
          findUrl +
          "?page=" +
          this.table.paging.currentPage +
          "&size=" +
          this.table.paging.limit;
        let obj = {
          sysState: this.SearchItem.sysState,
          phone: this.SearchItem.phone,
          name: this.SearchItem.name,
        };
        const response = await this.request.dataGet(that, url, obj);
        this.$refs.trigger.loading = false;
        response.data.content.forEach((item) => {
          item.operation = [
            {
              label: "编辑",
              icon: "el-icon-edit",
              click: "edit",
            },
            {
              label: "查看",
              icon: "el-icon-document",
              click: "look",
            },
            {
              label: item.sysState === "1" ? "禁用" : "启用",
              icon:
                item.sysState === "1"
                  ? "el-icon-video-pause"
                  : "el-icon-video-play",
              click: "start",
            },
          ];
          if (item.sysState === "1") {
            item.sysState = "已启用";
          } else {
            item.sysState = "已禁用";
          }
        });
        that.table.list.data = response.data.content;
        that.table.paging.total = response.data.totalElements;
      } catch (even) {
        that.$message.error("数据获取失败");
      }
    },
    add() {
      document.name = "服务商添加";
      this.$router.push({
        path: "providerAdd",
        query: {
          type: "0",
        },
      });
    },
    start(row) {
      this.id = row.id;
      this.note = row.note;
      if (row.sysState === "已启用") {
        this.isShowRemark = true;
        return false;
      }
      this.isShowStart = true;
    },
    // 通过
    closeStartDialog() {
      this.isShowStart = false;
      this.note = "";
    },
    async saveStartDialog() {
      const that = this;
      try {
        let url = that.api.provider.updateStatus;
        let obj = {
          id: this.id,
          sysState: "1",
        };
        const response = await this.request.dataDelete(that, url, obj);
        that.$message.success(response.msg);
        that.getList();
        that.closeStartDialog();
      } catch (even) {
        that.$message.error("数据获取失败");
      }
    },
    // 驳回
    closeRemarkDialog() {
      this.isShowRemark = false;
      this.$refs["remarkForm"].resetFields();
      this.remarkForm.note = "";
    },
    saveRemarkDialog() {
      const that = this;
      this.$refs["remarkForm"].validate(async (valid) => {
        if (valid) {
          try {
            let url = that.api.provider.updateStatus;
            let obj = {
              id: this.id,
              note: this.remarkForm.note,
              sysState: "0",
            };
            const response = await this.request.dataDelete(that, url, obj);
            that.$message.success(response.msg);
            that.getList();
            that.closeRemarkDialog();
          } catch (even) {
            that.$message.error("数据获取失败");
          }
        }
      });
    },
    SearchNoteList() {
      let that = this;
      this.SearchItem.name = this.SearchItem.name.trim();
      Object.entries(that.SearchItem).map((item, index) => {
        that.lastItem[item[0]] = that.SearchItem[item[0]];
      });
      this.table.paging.currentPage = 1;
      this.getList();
    },
    pageChange(val) {
      this.table.paging.limit = val.limit;
      this.table.paging.currentPage = val.page;
      this.getList();
    },
  },
};
</script>
