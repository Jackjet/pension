<template>
  <el-main class="agedDataView">
    <el-col :span="24">
      <el-form :inline="true" class="el-InputForm">
        <el-form-item class="items">
          <el-input
            clearable
            size="medium"
            placeholder="请输入身份证号"
            prefix-icon="el-icon-search"
            v-model="SearchItem.idCard"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="items">
          <el-input
            clearable
            size="medium"
            placeholder="请输入老人姓名"
            prefix-icon="el-icon-search"
            v-model="SearchItem.name"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="items">
          <el-input
            clearable
            size="medium"
            placeholder="请输入联系电话"
            prefix-icon="el-icon-search"
            v-model="SearchItem.phone"
          >
          </el-input>
        </el-form-item>

        <el-form-item class="items" v-if="streetIdSeen">
          <el-select
            clearable
            size="medium"
            v-model="SearchItem.homeStreetId"
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
        <el-form-item class="items" v-if="communityIdSeen">
          <el-select
            clearable
            size="medium"
            v-model="SearchItem.homeCommunityId"
            placeholder="请选择所属社区"
          >
            <el-option
              v-for="item in communityList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item class="items">
          <el-select
            clearable
            size="medium"
            multiple
            collapse-tags
            v-model="genreNameArr"
            placeholder="请选择老人类型"
          >
            <el-option
              v-for="(item, i) in genreList"
              :key="i"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item class="items">
          <el-select
            clearable
            size="medium"
            v-model="SearchItem.bodyId"
            placeholder="请选择老人自理情况"
          >
            <el-option
              v-for="(item, i) in bodyIdList"
              :key="i"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item class="items">
          <el-select
            clearable
            size="medium"
            v-model="SearchItem.liveId"
            placeholder="请选择老人居住情况"
          >
            <el-option
              v-for="(item, i) in liveIdList"
              :key="i"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="items">
          <el-select
            clearable
            size="medium"
            v-model="SearchItem.economicId"
            placeholder="请选择老人经济来源"
          >
            <el-option
              v-for="(item, i) in economicIdList"
              :key="i"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item class="items">
          <el-select
            clearable
            size="medium"
            v-model="SearchItem.state"
            placeholder="请选择状态"
          >
            <el-option label="待同步" value="0"></el-option>
            <el-option label="成功" value="1"></el-option>
            <el-option label="失败" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 330px">
          <el-date-picker
            v-model="valueTime"
            size="medium"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="创建日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
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
            icon="el-icon-refresh"
            @click="insert"
            >同步老人信息</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-upload2"
            @click="errorMsg"
            >导入公安数据</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-upload2"
            @click="errorMsg"
            >导入机构数据</el-button
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
        @details="details"
        @pageChange="pageChange"
        @onHandleSelectionChange="onHandleSelectionChange"
      >
      </tableForm>
    </el-col>
  </el-main>
</template>

<script>
import tableForm from "plugin/table";
const phoneReg = /^1[3|4|5|7|8][0-9]\d{8}$/;
const idCardReg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
const dateReg = /^([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))$/;

export default {
  components: {
    tableForm,
  },

  data() {
    return {
      streetIdSeen: false,
      communityIdSeen: false,
      streetList: [],
      genreList: [],
      bodyIdList: [],
      liveIdList: [],
      economicIdList: [],
      communityList: [],
      genreNameArr: [],
      valueTime: "",
      table: {
        list: {
          styleMethod: {
            method: (row, column, rowIndex, columnIndex) => {
              if (row.column.label === "所属街道") {
                if (row.row.streetColor === "red") {
                  return "color: red;";
                } else {
                  return "";
                }
              }
              if (row.column.label === "所属社区") {
                if (row.row.communityColor === "red") {
                  return "color: red;";
                } else {
                  return "";
                }
              }
              if (row.column.label === "联系电话") {
                if (!phoneReg.test(row.row.phone)) {
                  return "color: red;";
                } else {
                  return "";
                }
              }
              if (row.column.label === "身份证号") {
                if (
                  !idCardReg.test(row.row.idCard) ||
                  row.row.importRemark.indexOf("idCard") !== -1
                ) {
                  return "color: red;";
                } else {
                  return "";
                }
              }
              if (row.column.label === "出生日期") {
                if (
                  !dateReg.test(row.row.birthday) ||
                  row.row.comparisonBirthday !== row.row.birthday
                ) {
                  return "color: red;";
                } else {
                  return "";
                }
              }
            },
          },
          type: "checkbox",
          header: [
            {
              label: "老人姓名",
              field: "name",
            },
            {
              label: "所属街道",
              field: "homeStreetName",
            },
            {
              label: "所属社区",
              field: "homeCommunityName",
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
              label: "老人类型",
              field: "genreName",
            },
            {
              label: "身份证号",
              field: "idCard",
            },
            {
              label: "出生日期",
              field: "birthday",
            },
            {
              label: "年龄",
              field: "age",
            },
            {
              label: "状态",
              field: "state",
            },
            {
              label: "创建时间",
              field: "createTime",
            },
            {
              label: "创建人",
              field: "createByName",
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
      SearchItem: {
        name: "",
        homeStreetId: "",
        homeCommunityId: "",
        phone: "",
        genreId: "",
        state: "",
        idCard: "",
        startTime: "",
        endTime: "",
        genreName: "",
        bodyId: "",
        liveId: "",
        economicId: "",
      },
      lastItem: {
        name: "",
        homeStreetId: "",
        homeCommunityId: "",
        phone: "",
        genreId: "",
        state: "",
        idCard: "",
        startTime: "",
        endTime: "",
      },
      tableList: [],
    };
  },

  mounted() {
    const currentUser = this.common.session("currentUser");
    if (!currentUser.streetId && !currentUser.communityId) {
      this.streetIdSeen = true;
      this.communityIdSeen = true;
      this.getCommunityList();
    }
    if (currentUser.streetId && !currentUser.communityId) {
      this.communityIdSeen = true;
      this.getCommunityList(currentUser.streetId);
    }
    this.getList();
    this.getStreetList();
    this.getGenreList();
    this.bodyIdListFun();
    this.liveIdListFun();
    this.economicIdListFun();
  },

  methods: {
    errorMsg(e) {
      this.$message.error("该功能待开发，敬请稍后！");
    },
    onHandleSelectionChange(e) {
      this.tableList = e;
    },
    // 老人类型
    async getGenreList() {
      const that = this;
      try {
        let url = this.api.dicManage.findAll + "?page=1&size=1000000";
        const response = await this.request.dataGet(that, url, {
          dicId: "lrlx",
        });
        that.genreList = response.data.content;
      } catch (even) {
        that.$message.error("数据获取失败");
      }
    },
    // 老人身体状况
    async bodyIdListFun() {
      const that = this;
      try {
        let url = this.api.dicManage.findAll + "?page=1&size=1000000";
        const response = await this.request.dataGet(that, url, {
          dicId: "stzk",
        });
        that.bodyIdList = response.data.content;
      } catch (even) {
        that.$message.error("数据获取失败");
      }
    },
    // 老人居住情况
    async liveIdListFun() {
      const that = this;
      try {
        let url = this.api.dicManage.findAll + "?page=1&size=1000000";
        const response = await this.request.dataGet(that, url, {
          dicId: "jzqk",
        });
        that.liveIdList = response.data.content;
      } catch (even) {
        that.$message.error("数据获取失败");
      }
    },
    // 经济来源
    async economicIdListFun() {
      const that = this;
      try {
        let url = this.api.dicManage.findAll + "?page=1&size=1000000";
        const response = await this.request.dataGet(that, url, {
          dicId: "jjly",
        });
        that.economicIdList = response.data.content;
      } catch (even) {
        that.$message.error("数据获取失败");
      }
    },
    // 街道列表
    async getStreetList() {
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
      this.communityList = [];
      this.SearchItem.homeCommunityId = "";
      this.getCommunityList(val);
    },
    // 社区列表
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
    insert() {
      const that = this;
      if (this.tableList.length === 0) {
        that.$message.error("请选择老人");
        return false;
      }
      that
        .$confirm("是否同步？", "提示", {
          type: "warning",
        })
        .then(async () => {
          let url = this.api.collectUser.synchronizationInsert;
          let arr = [];
          try {
            this.tableList.forEach((item) => {
              if (item.phone && !phoneReg.test(item.phone)) {
                throw new Error();
              }
              if (item.idCard && !idCardReg.test(item.idCard)) {
                throw new Error();
              }
              arr.push(item.id);
            });
          } catch (e) {
            that.$message.error("手机号或身份证号数据错误");
            return false;
          }
          const response = await this.request.dataPost(that, url, arr);
          that.getList();
          if (response.code === 1) {
            that.$message.success(response.msg);
            return false;
          }
          that.$message.error(response.msg);
        })
        .catch((response) => {
          that.$message.error(response.msg);
        });
    },
    SearchNoteList() {
      let that = this;
      if (that.valueTime) {
        that.SearchItem.startTime = that.valueTime[0];
        that.SearchItem.endTime = that.valueTime[1];
      } else {
        that.SearchItem.startTime = "";
        that.SearchItem.endTime = "";
      }
      Object.entries(that.SearchItem).map((item, index) => {
        that.lastItem[item[0]] = that.SearchItem[item[0]];
      });
      this.table.paging.currentPage = 1;
      this.getList();
    },
    edit(row) {
      document.name = "老人信息编辑";
      this.$router.push({
        path: "agedDataAdd",
        query: {
          id: row.id,
          type: "1",
        },
      });
    },
    details(row) {
      document.name = "老人信息详情";
      this.$router.push({
        path: "agedDataAdd",
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
        let findUrl = this.api.collectUser.findAll;
        let url =
          findUrl +
          "?page=" +
          this.table.paging.currentPage +
          "&size=" +
          this.table.paging.limit;
        if (this.SearchItem.startTime) {
          that.valueTime = [this.SearchItem.startTime, this.SearchItem.endTime];
        } else {
          that.valueTime = [];
        }
        if (this.genreNameArr.length > 0) {
          this.SearchItem.genreName = this.genreNameArr
            .toString()
            .replace(/,/g, "_");
        } else {
          this.SearchItem.genreName = "";
        }
        const response = await this.request.dataGet(that, url, this.SearchItem);
        const currentUser = this.common.session("currentUser");
        this.$refs.trigger.loading = false;
        response.data.content.forEach((item) => {
          item.operation = [
            {
              label: "编辑",
              icon: "el-icon-edit",
              click: "edit",
            },
            {
              label: "详情",
              icon: "el-icon-document",
              click: "details",
            },
          ];
          if (currentUser.streetId !== item.homeStreetId) {
            item.streetColor = "red";
          } else {
            item.streetColor = "";
          }
          if (currentUser.communityId !== item.homeCommunityId) {
            item.communityColor = "red";
          } else {
            item.communityColor = "";
          }
          if (item.sex === "1") {
            item.sex = "男";
          }
          if (item.sex === "0") {
            item.sex = "女";
          }
          if (item.state === "0") {
            item.state = "待同步";
          }
          if (item.state === "1") {
            item.isDisabled = true;
            item.state = "成功";
            item.operation = [
              {
                label: "详情",
                icon: "el-icon-document",
                click: "details",
              },
            ];
          }
          if (item.state === "2") {
            item.state = "失败";
          }
          var userCard = item.idCard;
          if (userCard) {
            // 获取出生年月日
            var yearBirth = userCard.substring(6, 10);
            var monthBirth = userCard.substring(10, 12);
            var dayBirth = userCard.substring(12, 14);
            // 获取当前年月日并计算年龄
            var myDate = new Date();
            var monthNow = myDate.getMonth() + 1;
            var dayNow = myDate.getDay();
            var age = myDate.getFullYear() - yearBirth;
            if (
              monthNow < monthBirth ||
              (monthNow === monthBirth && dayNow < dayBirth)
            ) {
              age--;
            }
            // 得到年龄
            item.age = age;
            item.comparisonBirthday =
              yearBirth + "-" + monthBirth + "-" + dayBirth;
          }
          if (item.genreName !== "") {
            let str = "";
            let arr = JSON.parse(item.genreName);
            arr.forEach((items) => {
              str += items + ",";
            });
            item.genreName = str.substr(0, str.length - 1);
          }
        });
        that.table.list.data = response.data.content;
        that.table.paging.total = response.data.totalElements;
      } catch (even) {
        that.$message.error("数据获取失败");
      }
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
.agedDataView .items {
  width: 160px;
}
</style>
