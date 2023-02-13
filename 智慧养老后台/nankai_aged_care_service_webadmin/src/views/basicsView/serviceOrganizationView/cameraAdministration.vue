<template>
  <el-main>
    <el-col :span="24">
      <el-form :inline="true" class="el-InputForm">
        <el-form-item>
          <el-input
            clearable
            size="medium"
            placeholder="请输入摄像头名称"
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
        <el-form-item label="设备类型" prop="type" label-width="108px">
          <el-select
            size="medium"
            v-model="form.type"
            placeholder="请选择设备类型"
          >
            <el-option label="海康" value="0"></el-option>
            <el-option label="大华" value="1"></el-option>
            <el-option label="其他" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="摄像头名称" prop="name" label-width="108px">
          <el-input
            size="medium"
            v-model="form.name"
            placeholder="请输入摄像头名称"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="摄像头通道"
          prop="channelNumber"
          label-width="108px"
        >
          <el-input
            size="medium"
            v-model="form.channelNumber"
            placeholder="请输入摄像头通道"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="account" label-width="108px">
          <el-input
            size="medium"
            v-model="form.account"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="108px">
          <el-input
            size="medium"
            v-model="form.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备ip" prop="ip" label-width="108px">
          <el-input
            size="medium"
            v-model="form.ip"
            placeholder="请输入设备ip"
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
      SearchItem: {
        name: "",
      },
      isShow: false,
      title: "",
      form: {
        name: "",
        type: "",
        channelNumber: "",
        account: "",
        password: "",
        ip: "",
      },
      flag: "",
      rules: {
        type: [{ required: true, message: "请选择设备类型", trigger: "blur" }],
        name: [
          { required: true, message: "请输入服务项目名称", trigger: "blur" },
        ],
        channelNumber: [
          { required: true, message: "请输入摄像头通道", trigger: "blur" },
        ],
        account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        ip: [{ required: true, message: "请输入设备ip", trigger: "blur" }],
      },
      table: {
        list: {
          header: [
            {
              label: "摄像头名称",
              field: "name",
            },
            {
              label: "通道号",
              field: "channelNumber",
            },
            {
              label: "用户名",
              field: "account",
            },
            {
              label: "密码",
              field: "password",
            },
            {
              label: "设备ip",
              field: "ip",
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
    this.id = this.$route.query.cameraId;
    this.getList();
  },
  methods: {
    //查询
    SearchNoteList() {
      // let that = this;
      // Object.entries(that.SearchItem).map((item, index) => {
      //   that.lastItem[item[0]] = that.SearchItem[item[0]];
      // });
      this.lastItem = this.SearchItem;
      this.table.paging.currentPage = 1;
      this.getList();
    },
    // 添加
    add() {
      this.title = "添加摄像头";
      this.isShow = true;
      this.flag = "";
    },
    // 编辑
    async edit(row) {
      const that = this;
      that.flag = "1";
      try {
        let findUrl = that.api.cameraAdministration.findById;
        let parameter = { id: row.id };
        const response = await that.request.dataGet(that, findUrl, parameter);
        if (response.code === 1) {
          that.title = "编辑摄像头";
          that.isShow = true;
          that.editId = row.id;
          that.form.type = response.data.type;
          that.form.name = response.data.name;
          that.form.channelNumber = response.data.channelNumber;
          that.form.account = response.data.account;
          that.form.password = response.data.password;
          that.form.ip = response.data.ip;
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
        let findUrl = this.api.cameraAdministration.findAll;
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
    // 分页
    pageChange(val) {
      this.table.paging.limit = val.limit;
      this.table.paging.currentPage = val.page;
      this.getList();
    },
    // 返回
    onPageReturn() {
      this.$router.push({ path: "serviceOrganizationView" });
    },
    // 关闭弹框
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
            let url = that.api.cameraAdministration.insert;
            let obj = {
              organizationId: that.id,
              name: that.form.name,
              type: that.form.type,
              channelNumber: that.form.channelNumber,
              account: that.form.account,
              password: that.form.password,
              ip: that.form.ip,
            };
            let response = null;
            if (that.flag) {
              url = that.api.cameraAdministration.update;
              obj.organizationId = that.id;
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
    // 删除
    delete(row) {
      const that = this;
      that
        .$confirm("您确定要删除么?", "提示", {
          type: "warning",
        })
        .then(async () => {
          let url = this.api.cameraAdministration.delete + "?id=" + row.id;
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
  },
};
</script>
