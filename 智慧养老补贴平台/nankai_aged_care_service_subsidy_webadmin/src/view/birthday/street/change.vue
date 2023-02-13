<template>
  <!-- 街道补贴上报 补贴“变更”表 -->
  <div class="page-box">
    <div class="query-search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="所属街道" v-if="!streetHide" >
          <el-select clearable size="medium" v-model="formInline.streetId" value-key="id" placeholder="所属街道" @change="streetNameHandle">
            <el-option v-for="item in streetData" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属社区" v-if="!communitHide" >
          <el-select clearable size="medium" v-model="formInline.communityId" placeholder="所属社区">
            <el-option v-for="item in communityData" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发放时间">
          <el-date-picker size="medium" v-model="formInline.grantDate" value-format="yyyy-MM" type="month" placeholder="选择发放时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" @click="queryClick">查询</el-button>
          <el-button size="medium" type="primary" @click="outExcel()">导出</el-button>
          <!-- <el-button size="medium" type="primary">上传街道盖章确认表</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="query-list">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="communityName" label="社区">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="sex" label="性别">
        </el-table-column>
        <el-table-column prop="genreName" label="类别">
        </el-table-column>
        <el-table-column label="变动内容">
          <el-table-column prop="subsidyAdd" label="新增">
          </el-table-column>
          <el-table-column prop="subsidyCancel" label="注销">
          </el-table-column>
          <el-table-column label="等级变动">
            <el-table-column prop="al" label="原等级">
            </el-table-column>
            <el-table-column prop="newAl" label="现等级">
            </el-table-column>
          </el-table-column>
          <el-table-column prop="others" label="其他">
          </el-table-column>
        </el-table-column>
        <el-table-column prop="updateMonth" label="变动月份">
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
import { subsidyUpdateFindAll ,subsidyUpdateExport} from "@/api/theElderly/list.js";
import {streetList,communityList,userIfo } from "@/api/file.js";
import {outExcel} from "@/assets/js/export.js"
export default {
  components: {
    Pagination
  },
  data() {
    return {
      userType: userIfo().userType,
      streetData: [],
      streetId:'',
      streetName:'',
      communityData: [],
      timeDate: null,
      formInline: {
        communityId: '',
        streetId:'',
        grantDate:'',
        page: 1,
        size: 10
      },
      tableData: [],
      total: 10,
      streetHide:'',
      communitHide:'',
    }
  },
  mounted() {
    this.formInline.grantDate = new Date().getFullYear()+'-'+(new Date().getMonth()+1)
    if(userIfo().streetId){
      this.formInline.streetId = userIfo().streetId
      this.streetHide = true
    }
    if(userIfo().communityId){
      this.formInline.communityId = userIfo().communityId
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
      subsidyUpdateFindAll(this.formInline).then(res => {
        console.log(res.data, "=========")
        if (res.data.code === 1) {
          console.log(res.data)
          this.tableData = res.data.data.content;
          this.tableData.forEach((v,i)=>{
            v.genreName = JSON.parse(v.genreName).join(',')
          })
          this.total = res.data.data.totalElements;
        }
      })
    },
    timeChange() {
      if (this.timeDate) {
        this.formInline.grantDate = this.timeDate
      } else {
        this.formInline.grantDate = ''
      }
    },
    queryClick() {
      this.queryList();
    },
    pageChange(val) {
      this.formInline.page = val.page;
      this.formInline.size = val.limit;
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
     outExcel(){
       let data = {
        exportType:'1-1',
        businessType:'1',
        grantDate:this.formInline.grantDate ? this.formInline.grantDate :new Date().getFullYear()+'-'+(new Date().getMonth()+1),
        streetId:this.streetId,
        streetName:this.streetName
      }
      outExcel('请确认是否导出补贴变更表?',  "/subsidy/webadmin/subsidyUpdate/export", data, '补贴变更表')
    
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
