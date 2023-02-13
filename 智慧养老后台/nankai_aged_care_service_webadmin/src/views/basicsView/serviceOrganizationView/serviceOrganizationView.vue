<template>
  <el-main>
    <el-row :span="24">
      <el-form :inline="true" class="el-InputForm">
        <el-form-item>
          <el-input
            clearable
            size="medium"
            placeholder="请输入机构名称"
            prefix-icon="el-icon-search"
            v-model="SearchItem.name"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="SearchItem.streetId"
            clearable
            placeholder="请选择所属街道"
            @change="street"
          >
            <el-option
              v-for="item in streetList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="SearchItem.communityId"
            placeholder="请选择所属社区"
            clearable
          >
            <el-option
              v-for="item in communityList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              clearable
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="SearchItem.type"
            placeholder="请选择机构性质"
            clearable
          >
            <el-option label="日照中心" value="0"> </el-option>
            <el-option label="养老机构" value="1"> </el-option>
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
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-plus"
            @click="add"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </el-row>

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
      id: "",
      title: "",
      isShow: false,
      SearchItem: {
        name: "",
        streetId: "",
        communityId: "",
        type: "",
      },
      lastItem: {
        name: "",
        streetId: "",
        communityId: "",
        type: "",
      },
      form: {
        name: "",
      },
      streetList: [],
      communityList: [],
      rules: {
        name: [{ required: true, message: "请输入服务栏目", trigger: "blur" }],
      },
      table: {
        list: {
          header: [
            {
              label: "机构名称",
              field: "name",
            },
            {
              label: "所属街道",
              field: "streetName",
            },
            {
              label: "所属社区",
              field: "communityName",
            },
            {
              label: "详细地址",
              field: "address",
            },
            {
              label: "机构性质",
              field: "type",
            },
            {
              label: "老人数量",
              field: "userNum",
            },
            {
              label: "服务人员数量",
              field: "num",
            },
            {
              label: "机构电话",
              field: "phone",
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
                  document.name = "服务机构编辑";
                  this.$router.push({
                    path: "/index/serviceOrganizationAdd",
                    query: {
                      id: row.id,
                      type: "1",
                    },
                  });
                },
              },
              {
                label: "删除",
                icon: "el-icon-delete",
                method: (row) => {
                  this.delete(row);
                },
              },
              {
                label: "查看",
                icon: "el-icon-document",
                method: (row) => {
                  document.name = "服务机构详情";
                  this.$router.push({
                    path: "/index/serviceOrganizationAdd",
                    query: {
                      id: row.id,
                      type: "2",
                    },
                  });
                },
              },
              {
                label: "服务项目",
                icon: "el-icon-setting",
                method: (row) => {
                  this.$router.push({
                    path: "/index/organizationProject",
                    query: {
                      organizationId: row.id,
                    },
                  });
                },
              },
              {
                label: "摄像头管理",
                icon: "el-icon-video-camera",
                method: (row) => {
                  this.$router.push({
                    path: "/index/cameraAdministration",
                    query: {
                      cameraId: row.id,
                    },
                  });
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
    this.getList();
    this.getGriddingList();
    this.getCommunityList();
  },

  methods: {
    SearchNoteList() {
      let that = this;
      this.SearchItem.name = this.SearchItem.name.trim();
      Object.entries(that.SearchItem).map((item, index) => {
        that.lastItem[item[0]] = that.SearchItem[item[0]];
      });
      this.table.paging.currentPage = 1;
      this.getList();
    },
    async getCommunityList(val) {
      const that = this;
      try {
        let url = this.api.community.findAll + "?page=1&size=1000000";
        let obj = {
          streetId: val,
        };
        const response = await this.request.dataGet(that, url, obj);
        that.communityList = response.data.content;
      } catch (even) {
        that.$message.error("数据获取失败");
      }
    },
    async getGriddingList() {
      const that = this;
      try {
        let url = this.api.street.findAll + "?page=1&size=1000000";
        let obj = {};
        const response = await this.request.dataGet(that, url, obj);
        that.streetList = response.data.content;
      } catch (even) {
        that.$message.error("数据获取失败");
      }
    },
    street(val) {
      this.getCommunityList(val);
      this.SearchItem.communityId = "";
    },
    add() {
      document.name = "服务机构添加";
      this.$router.push({
        path: "serviceOrganizationAdd",
      });
    },
    // 列表
    async getList() {
      const that = this;
      try {
        let findUrl = this.api.organization.findAll;
        let url =
          findUrl +
          "?page=" +
          this.table.paging.currentPage +
          "&size=" +
          this.table.paging.limit;
        let obj = that.SearchItem;
        const response = await this.request.dataGet(that, url, obj);
        response.data.content.forEach((item) => {
          if (item.type === "0") {
            item.type = "日照中心";
          }
          if (item.type === "1") {
            item.type = "养老机构";
          }
        });
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
          let url = this.api.organization.delete + "?id=" + row.id;
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
  },
};
</script>
