<template>
  <el-main>
    <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="140px">
      <el-row class="el-row-el">
        <el-col :span="12">
          <el-form-item label="机构名称" prop="name">
            <el-input v-model="infoForm.name" :disabled="type == 2" placeholder="请输入机构名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="机构电话" prop="phone">
            <el-input v-model="infoForm.phone" :disabled="type == 2" placeholder="请输入机构电话"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="el-row-el">
        <el-col :span="12">
          <el-form-item label="老人数量" prop="userNum">
            <el-input v-model.number="infoForm.userNum" :disabled="type == 2" placeholder="请输入老人数量"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务人员数量" prop="num">
            <el-input v-model.number="infoForm.num" :disabled="type == 2" placeholder="请输入服务人员数量"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="el-row-el">
        <el-col :span="12">
          <el-form-item label="经度" prop="longitude">
            <el-input v-model="infoForm.longitude" :disabled="type == 2" placeholder="请输入经度"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="纬度" prop="latitude">
            <el-input v-model="infoForm.latitude" :disabled="type == 2" placeholder="请输入纬度"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="el-row-el">
        <el-col :span="7">
          <el-form-item label="机构性质" prop="type">
            <el-select v-model="infoForm.type" placeholder="请选择机构性质" :disabled="type == 2" clearable>
              <el-option label="日照中心" value="0"> </el-option>
              <el-option label="养老机构" value="1"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="所属街道" prop="streetId" style="text-align: left">
            <el-select v-model="infoForm.streetId" placeholder="请选择所属街道" :disabled="type == 2" @change="street" clearable>
              <el-option v-for="item in streetList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="所属社区" prop="communityId">
            <el-select v-model="infoForm.communityId" placeholder="请选择所属社区" :disabled="type == 2" clearable>
              <el-option v-for="item in communityList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="el-row-el">
        <el-col :span="24">
          <el-form-item label="详细地址" prop="address">
            <el-input type="textarea" v-model="infoForm.address" :disabled="type == 2" placeholder="请输入详细地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="el-row-el">
        <el-col :span="24">
          <el-form-item class="open_btn">
            <el-button type="primary" v-if="type != 2" @click="submitForm('infoForm')">保存</el-button>
            <el-button @click="close">返回</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      type: "",
      activeName: "",
      serviceTypeList: [],
      streetList: [],
      communityList: [],
      disabled: "",
      uploudIdx: "",
      logoImg: "",
      businessLicenseImg: "",
      idCard1Img1: "",
      idCard2Img2: "",
      infoForm: {
        name: "",
        phone: "",
        userNum: "",
        num: "",
        type: "",
        longitude: "",
        latitude: "",
        streetId: "",
        communityId: "",
        address: "",
      },
      rules: {
        name: [{ required: true, message: "请输入机构名称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入机构电话", trigger: "blur" }],
        userNum: [
          { required: true, message: "请输入老人数量", trigger: "blur" },
        ],
        num: [
          { required: true, message: "请输入服务人员数量", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择机构性质", trigger: "change" },
        ],
        longitude: [{ required: true, message: "请输入经度", trigger: "blur" }],
        latitude: [{ required: true, message: "请输入纬度", trigger: "blur" }],
        streetId: [
          { required: true, message: "请选择所属街道", trigger: "change" },
        ],
        communityId: [
          { required: true, message: "请选择所属社区", trigger: "change" },
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
      },
      fileUrl: process.env.VUE_APP_URL + this.api.resourceLib.upload,
      header: {
        Authorization: "token " + this.common.session("currentUser").token,
      },
    };
  },

  mounted() {
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    this.getGriddingList();
    if (this.type) {
      this.getDetail();
    }
  },

  methods: {
    async getDetail() {
      const that = this;
      try {
        let findUrl = that.api.organization.findById;
        let parameter = { id: that.id };
        const response = await that.request.dataGet(that, findUrl, parameter);
        if (response.code === 1) {
          this.getCommunityList(response.data.streetId);
          that.infoForm = response.data;
          // console.log(that.infoForm);
          return false;
        }
        that.$message.error(response.msg);
      } catch (e) {
        that.$message.error("数据获取失败");
      }
    },
    street(val) {
      // console.log(this.infoForm.streetId);
      if (val === "") {
        this.communityList = [];
      } else {
        this.getCommunityList(val);
      }
      this.infoForm.communityId = "";
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
    submitForm(form) {
      let that = this;
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          try {
            let url = that.api.organization.insert;
            let response = null;
            if (that.id) {
              url = that.api.organization.update;
              that.infoForm.id = that.id;
              // console.log(that.infoForm);
              response = await this.request.dataPut(that, url, that.infoForm);
            } else {
              response = await this.request.dataPost(that, url, that.infoForm);
            }
            if (response.code === 1) {
              that.$message.success(response.msg);
              that.$router.push({
                path: "serviceOrganizationView",
              });
              return false;
            }
            that.$message.error(response.msg);
          } catch (even) {
            that.$message.error("数据获取失败");
          }
        }
      });
    },
    close(val) {
      this.$router.push({
        path: "serviceOrganizationView",
      });
    },
  },
};
</script>

<style scoped>
.hander {
  padding: 5px 0;
  margin-bottom: 10px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px dashed #999;
  color: #009966;
}
.upload-demo {
  float: left;
}
.img {
  width: 200px;
  height: 100px;
}
</style>
