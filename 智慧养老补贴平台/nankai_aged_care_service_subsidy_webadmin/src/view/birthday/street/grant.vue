<template>
  <!-- 街道补贴上报 补贴“发放”表 -->
  <div class="page-box">
    <div class="query-search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="所属街道" v-if="!streetHide" >
          <el-select size="medium" v-model="formInline.homeStreetId" value-key="id" placeholder="所属街道" @change="streetNameHandle" clearable>
            <el-option v-for="item in streetData" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属社区" v-if="!communitHide" >
          <el-select size="medium" v-model="formInline.homeCommunityId" placeholder="所属社区" clearable>
            <el-option v-for="item in communityData" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="补贴类别">
          <el-select size="medium" v-model="formInline.subsidyType" placeholder="补贴类别" clearable>
            <el-option label="生活" :value="1"></el-option>
            <el-option label="护理" :value="2"></el-option>
            <el-option label="生活+护理" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="等级">
          <el-select size="medium" v-model="formInline.al" placeholder="等级" clearable>
            <el-option label="轻度" :value="1"></el-option>
            <el-option label="中度" :value="2"></el-option>
            <el-option label="重度" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请时间">
          <el-date-picker size="medium" v-model="formInline.createTime" value-format="yyyy-MM" type="month" placeholder="选择发放时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" @click="queryClick">查询</el-button>
          <el-button size="medium" type="primary" @click="outExcel()">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="query-list">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="streetName" label="街道名称">
        </el-table-column>
        <el-table-column prop="communityName" label="社区">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="sex" label="性别">
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号">
        </el-table-column>
        <el-table-column prop="address" label="家庭住址">
        </el-table-column>
        <el-table-column prop="phone" label="本人联系电话">
        </el-table-column>
        <el-table-column label="（收款人应与持卡号一致）">
          <el-table-column prop="emergencyContact" label="监护人姓名">
          </el-table-column>
          <el-table-column prop="emergencyPhone" label="联系电话">
          </el-table-column>
          <el-table-column prop="cardOwner" label="收款人姓名">
          </el-table-column>
          <el-table-column prop="relation" label="与申请人关系">
          </el-table-column>
        </el-table-column>
        <el-table-column prop="genreName" label="老人类别">
        </el-table-column>
        <el-table-column prop="subsidyType" label="补贴类别">
        </el-table-column>
        <el-table-column prop="al" label="等级">
        </el-table-column>
        <el-table-column prop="subsidyAmount" label="发放金额">
        </el-table-column>
        <el-table-column prop="cardNum" label="工行账号">
        </el-table-column>
        <el-table-column prop="createTime" label="起始年月">
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
      </el-table>
      <Pagination :total="total" @pageChange="pageChange"></Pagination>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/table/pagination";
import { subsidyGrantFindAll,subsidyGrantExport,subsidyFindAllByUser } from "@/api/theElderly/list.js";
import {streetList,communityList,userIfo } from "@/api/file.js";
import {outExcel} from "@/assets/js/export.js"
export default {
  components: {
    Pagination
  },
  data() {
    return {
      userType: userIfo().userType,
      streetId:'',
      streetName:'',
      streetData: [],
      communityData: [],
      timeDate: null,
      formInline: {
        // communityId: '',//服务地社区Id
        subsidyType: null,//补贴类别，1生活、2护理、3生活护理
        al: null,//评估等级:1轻、2中、3重
        createTime:'',
        page: 1,
        size: 10
      },
      tableData: [],
      total: 0,
      streetHide:'',
      communitHide:'',
    }
  },
  mounted() {
    if(userIfo().streetId){
      this.formInline.homeStreetId = userIfo().streetId
      this.streetHide = true
    }
    if(userIfo().communityId){
      this.formInline.homeCommunityId = userIfo().communityId
      this.communitHide = true
    }
    // 街道
    let id = userIfo().streetId
    streetList().then(res => {
      if (res.data.code === 1) {
        this.streetData = res.data.data.content;
        this.streetData.forEach((v,i)=>{
          if(v.id == id){
            this.streetId = v.id
            this.streetName = v.name
          }
        })
      }
    });
    this.communityFun(id);
    this.queryList();
  },
  methods: {
    // 列表查询
    queryList() {
      subsidyFindAllByUser(this.formInline).then(res => {
        console.log(res.data, "=========")
        if (res.data.code === 1) {
          this.tableData = res.data.data.content;
          this.tableData.forEach((v,i)=>{
            v.genreName = JSON.parse(v.genreName).join(',')
            if(v.al == 1){
              v.al = '轻度'
            }else if (v.al == 2){
              v.al = '中度'
            }else{
              v.al = '重度'
            }
            if(v.subsidyType == '1'){
              v.subsidyType = '生活'
            }else if (v.subsidyType == 2){
              v.subsidyType = '护理'
            }else{
              v.subsidyType = '生活+护理'
            }
            v.liveSubsidy = v.liveSubsidy == 0 ? '否':'是'
            v.nursingSubsidy = v.nursingSubsidy == 0 ? '否':'是'
            if(v.aliveFile){
              v.aliveFile = process.env.VUE_APP_URL +'/'+ JSON.parse(v.aliveFile)[0].fileDownloadUri
            }
            v.createTime = v.createTime.split(' ')[0]
          })
          this.total = res.data.totalElements;
        }
      })
    },
    timeChange() {
      if (this.timeDate) {
        this.formInline.createTime = this.timeDate
      } else {
        this.formInline.createTime = ''
      }
    },
    queryClick() {
      this.queryList();
    },
    streetNameHandle(val) {
      let id = val
      streetList().then(res => {
        if (res.data.code === 1) {
          this.streetData = res.data.data.content;
          this.streetData.forEach((v,i)=>{
            if(v.id == id){
              this.streetId = v.id
              this.streetName = v.name
            }
          })
        }
      });
      this.formInline.streetId = val;
      this.formInline.communityId = "";
      this.communityFun(val);
    },
    // 社区
    communityFun(id) {
      communityList({ streetId: id }).then(res => {
        if (res.data.code === 1) {
          this.communityData = res.data.data.content;
        }
      })
    },
    pageChange(val) {
      this.formInline.page = val.page;
      this.formInline.size = val.limit;
      this.queryList();
    },
    outExcel(){
      // let data = {
      //   exportType:'1-1',
      //   businessType:'1',
      //   createTime:this.formInline.createTime ? this.formInline.createTime :(new Date().getMonth()+1)+'-'+new Date().getDate(),
      //   streetId:this.streetId,
      //   streetName:this.streetName
      // }
      let data = this.formInline
      outExcel('请确认是否导出补贴发放表?',  "/subsidy/webadmin/subsidy/export", data, '补贴发放表')
    }
  }
}
</script>

<style lang="scss" scoped>
.page-box {
  padding: 20px 50px;
  box-sizing: border-box;
  .query-search {
    border-radius: 4px;
    box-shadow: $back-shadow;
    padding: 15px 10px;
  }
  .query-list {
    margin-top: 20px;
  }
}
.el-form-item {
  margin: 0;
}
</style>
