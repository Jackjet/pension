<template>
  <div class="business-nav">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item,index) in dataList" :key="index">
        <div class="business-item" @click="routerClick(item)">
          <h2><i class="el-icon-edit-outline"></i> {{item.name}}</h2>
          <span>点击进入>></span>
        </div>
      </el-col>
    </el-row>
    <!-- 享受补贴 -->
    <el-dialog :title="titleName" :visible.sync="dialogVisible1" width="30%">
      <div class="choice-style">
        <span>是否已享受残疾人生活补贴</span>
        <el-radio-group v-model="choice1" style="margin-left:20px">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </div>
      <div class="choice-style">
        <span>是否已享受残疾人护理补贴</span>
        <el-radio-group v-model="choice2" style="margin-left:20px">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </div>
      <div class="choice-style">
        <span>是否已享受特困供养补贴&emsp;</span>
        <el-radio-group v-model="choice3" style="margin-left:20px">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="nextStepClick">下一步</el-button>
      </span>
    </el-dialog>
    <!--  选择申请类别 -->
    <el-dialog :title="titleName" :visible.sync="dialogVisible2" width="30%">
      <div class="choice-style">
        <span>申请类别</span>
        <el-radio-group v-model="choice4" style="margin-left:20px">
          <el-radio label="1">（60周岁以上）低保、低收入、优抚对象困难老人</el-radio>
          <el-radio label="2" style="margin-top:10px">（80周岁以上）低于最低工资标准困难老人</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </span>
    </el-dialog>
    <!-- 选择路由 -->
    <el-dialog :title="titleName" :visible.sync="dialogVisible3" width="30%">
      <div class="choice-style">
        <el-radio-group v-model="choice5" style="margin-left:20px">
          <el-radio style="display: block;line-height: 40px;" v-for="(item,index) in routeArr" :key="index" :label="item.path">{{item.title}}</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="nextStepRouter">下一步</el-button>
      </span>
    </el-dialog>
    <!-- 百岁 -->
    <el-dialog :title="titleName" :visible.sync="dialogVisible4" width="30%">
      <div class="choice-style">
        <span>申请人年龄是否在100周岁以上</span>
        <el-radio-group v-model="choice6" style="margin-left:20px">
          <el-radio label="1">是</el-radio>
          <el-radio label="2">否</el-radio>
        </el-radio-group>
      </div>
      <p style="color:#409EFF">温馨提示：建议提前一个月申请补贴</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="nutritionNextStep">下一步</el-button>
      </span>
    </el-dialog>
    <!-- 90岁 -->
    <el-dialog :title="titleName" :visible.sync="dialogVisible5" width="30%">
      <div class="choice-style">
        <span>申请人年龄是否在90周岁以上</span>
        <el-radio-group v-model="choice7" style="margin-left:20px">
          <el-radio label="1">是</el-radio>
          <el-radio label="2">否</el-radio>
        </el-radio-group>
      </div>
      <p style="color:#409EFF">温馨提示：建议提前一个月申请补贴</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="nutritionNextStep1">下一步</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      dialogVisible5: false,
      choice1: 0,
      choice2: 0,
      choice3: 0,
      choice4: "",
      choice5: "",
      choice6: "",
      choice7: "",
      routerUrl: [],
      titleName: "",
      routeArr: [],
      nutritioRouter: "",
    }
  },
  mounted() {
  },
  methods: {
    nutritionNextStep() {
      if (this.choice6 === '1') {
        this.$router.push(this.nutritioRouter)
      } else {
        this.$alert('温馨提示：由于申请人年龄未达到100周岁以上，暂时无法享受百岁营养补贴服务。', this.titleName, {
          confirmButtonText: '关闭',
          callback: () => {
            this.dialogVisible4 = false;
            return false
          }
        });
      }
    },
    nutritionNextStep1() {
      if (this.choice7 === '1') {
        this.$router.push(this.nutritioRouter)
      } else {
        this.$alert('温馨提示：由于申请人年龄未达到90周岁以上，暂时无法享受90岁生日补贴服务。', this.titleName, {
          confirmButtonText: '关闭',
          callback: () => {
            this.dialogVisible5 = false;
            return false
          }
        });
      }
    },

    nextStepRouter() {
      if (this.choice5) {
        this.$router.push(this.choice5)
      } else {
        this.$message('请选择选项后才可进行下一步操作！');
      }
    },
    nextStepClick() {
      if (this.choice1 === "" && this.choice2 === "" && this.choice3 === "") {
        this.$message('请选择选项后才可进行下一步操作！');
      } else if (this.choice1 === 1 && this.choice2 === 1 || this.choice1 === 1 && this.choice3 === 1 || this.choice3 === 1 && this.choice2 === 1) {
        this.$alert('温馨提示：由于您已享受残疾人两项补贴，无法同时享受居家养老补贴服务。请根据个人实际情况，选择其中一项。', this.titleName, {
          confirmButtonText: '关闭',
          callback: () => {
            return false
          }
        });
      } else if (this.choice3 === 1) {
        this.$alert('温馨提示：由于您已享受特困供养补贴，无法同时享受居家养老补贴服务。请根据个人实际情况，选择其中一项。', this.titleName, {
          confirmButtonText: '关闭',
          callback: () => {
            return false
          }
        });
      } else {
        this.dialogVisible2 = true;
      }
    },
    nextStep() {
      let queryPath = {
        liveSubsidy: this.choice1,
        nursingSubsidy: this.choice2,
        poorSubsidy: this.choice3
      }
      if (this.choice4 === '1') {
        this.$router.push({
          path: this.routerUrl[0],
          query: queryPath
        });
      } else if (this.choice4 === '2') {
        this.$router.push({
          path: this.routerUrl[1],
          query: queryPath
        });
      } else {
        this.$alert('温馨提示：由于您已享受特困供养补贴，无法同时享受居家养老补贴服务。请根据个人实际情况，选择其中一项。', this.titleName, {
          confirmButtonText: '关闭',
          callback: () => {
            return false
          }
        });
      }
    },
    routerClick(path) {
      if (typeof path.router === "object") {
        this.titleName = path.name;
        if (path.type === 1) {
          this.routerUrl = path.router;
          this.dialogVisible1 = true;
        } else if (path.type === 3) {
          this.routeArr = path.router;
          this.dialogVisible3 = true;
        } else {
          this.routerUrl = path.router;
          this.dialogVisible2 = true;
        }
      } else {
        if (path.type === 5) {
          this.titleName = path.name;
          this.nutritioRouter = path.router;
          this.dialogVisible4 = true;
        } else if (path.type === 6) {
          this.titleName = path.name;
          this.nutritioRouter = path.router;
          this.dialogVisible5 = true;
        } else {
          this.$router.push(path.router);
        }
      }
    }
  }
}
</script>
<style lang="scss" scope>
.business-nav {
  .business-item {
    border-radius: 4px;
    min-height: 36px;
    box-shadow: $back-shadow;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    box-sizing: border-box;
    color: $font-color2;
    cursor: pointer;
    h2 {
      display: flex;
      align-items: center;
      font-size: $font-size16;
      i {
        font-size: $font-size20;
      }
    }
    span {
      font-size: $font-size12;
    }
  }
  .business-item:hover {
    color: $color1;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  .choice-style {
    line-height: 40px;
  }
}
</style>