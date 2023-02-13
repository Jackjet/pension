<template>
  <el-main>
    <el-col :span="24">
      <el-form :inline="true" class="el-InputForm">
        <el-form-item>
          <el-input
            clearable
            size="medium"
            placeholder="请输入服务项目名称"
            prefix-icon="el-icon-search"
            v-model="SearchItem.name"
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
        @pageChange="pageChange"
      >
      </tableForm>
    </el-col>
    <el-col :span="24">
      <el-button type="primary" @click="onPageReturn">返回</el-button>
    </el-col>
    <!-- 添加/编辑 -->
    <dialog-form
      :isShow="isShow"
      :isBtn="true"
      :title="title"
      @closeDialog="closeDialog"
      @saveDialog="saveDialog"
    >
      <el-form slot="form" ref="form" :model="form" :rules="rules">
        <el-form-item label="服务项目名称" prop="name" label-width="108px">
          <el-input
            size="medium"
            autocomplete="off"
            v-model="form.name"
            placeholder="请输入服务项目名称"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="服务介绍" prop="remark" label-width="108px">
          <el-input
            type="textarea"
            v-model="form.remark"
            placeholder="请输入服务介绍"
          ></el-input>
        </el-form-item>
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
      editId: "",
      title: "",
      flag: "",
      isShow: false,
      SearchItem: {
        name: "",
      },
      lastItem: {
        name: "",
      },
      form: {
        name: "",
        remark: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入服务项目名称", trigger: "blur" },
        ],
      },
      table: {
        list: {
          header: [
            {
              label: "服务项目名称",
              field: "name",
            },
            {
              label: "创建时间",
              field: "createTime",
            },
          ],

          data: [],

          operation: {
            label: "操作",
            event: [
              {
                label: "编辑",
                icon: "el-icon-edit",
                method: (row) => {
                  this.edit(row);
                },
              },
              {
                label: "删除",
                icon: "el-icon-delete",
                method: (row) => {
                  this.delete(row);
                },
              },
            ],
          },
        },

        paging: {
          total: 0,
          currentPage: 1,
          limit: 20,
        },
      },
    };
  },

  mounted() {
    const that = this;
    that.id = that.$route.query.organizationId;
    this.getList();
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
    add() {
      this.title = "添加服务项目";
      this.isShow = true;
      this.flag = "";
    },
    closeDialog() {
      this.isShow = false;
      this.$refs["form"].resetFields();
      this.form.name = "";
    },
    // 保存
    saveDialog() {
      const that = this;
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          try {
            let url = that.api.organizationProject.insert;
            let obj = {
              name: that.form.name,
              remark: that.form.remark,
              organizationId: that.id,
            };
            let response = null;
            if (that.flag) {
              url = that.api.organizationProject.update;
              obj.id = that.editId;
              response = await this.request.dataPut(that, url, obj);
            } else {
              response = await this.request.dataPost(that, url, obj);
            }
            if (response.code === 1) {
              that.isShow = false;
              that.$refs["form"].resetFields();
              that.$message.success(response.msg);
              that.closeDialog();
              that.getList();
              return false;
            }
            that.$message.error(response.msg);
          } catch (even) {
            that.$message.error("数据获取失败");
          }
        }
      });
    },
    // 编辑
    async edit(row) {
      const that = this;
      that.flag = "1";
      try {
        let findUrl = that.api.organizationProject.findById;
        let parameter = { id: row.id };
        const response = await that.request.dataGet(that, findUrl, parameter);
        if (response.code === 1) {
          that.title = "编辑服务项目";
          that.isShow = true;
          that.editId = row.id;
          that.form.name = response.data.name;
          that.form.remark = response.data.remark;
          return false;
        }
        that.$message.error(response.msg);
      } catch (even) {
        that.$message.error("数据获取失败");
      }
    },
    // 列表
    async getList() {
      const that = this;
      try {
        let findUrl = this.api.organizationProject.findAll;
        let url =
          findUrl +
          "?page=" +
          this.table.paging.currentPage +
          "&size=" +
          this.table.paging.limit;
        let obj = {
          organizationId: that.id,
          name: that.SearchItem.name,
        };
        const response = await this.request.dataGet(that, url, obj);
        this.$refs.trigger.loading = false;
        that.table.list.data = response.data.content;
        that.table.paging.total = response.data.totalElements;
      } catch (even) {
        that.$message.error("数据获取失败");
      }
    },

    // 删除
    delete(row) {
      const that = this;
      that
        .$confirm("您确定要删除么?", "提示", {
          type: "warning",
        })
        .then(async () => {
          let url = this.api.organizationProject.delete + "?id=" + row.id;
          const response = await this.request.dataDelete(that, url, {});
          if (response.code === 1) {
            that.$message.success(response.msg);
            that.getList();
            return false;
          }
          that.$message.error(response.msg);
        })
        .catch((response) => {
          that.$message.error(response.msg);
        });
    },

    pageChange(val) {
      this.table.paging.limit = val.limit;
      this.table.paging.currentPage = val.page;
      this.getList();
    },
    onPageReturn() {
      this.$router.push({ path: "serviceOrganizationView" });
    },
  },
};
</script>
