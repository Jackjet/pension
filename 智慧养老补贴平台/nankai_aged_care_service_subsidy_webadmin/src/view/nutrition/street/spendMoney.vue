<template>
  <!-- 居家养老服务补贴拨款表 -->
  <div class="page-box">
    <div class="query-search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="所属街道" v-if="!streetHide"  >
          <el-select size="medium" clearable v-model="formInline.homeStreetId" value-key="id" placeholder="所属街道" @change="streetNameHandle">
            <el-option v-for="item in streetData" :label="item.name" :value="item.id+'-'+item.name" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="所属社区" v-if="userType!=='1'" >
          <el-select size="medium" v-model="formInline.homeCommunityId" placeholder="所属社区">
            <el-option v-for="item in communityData" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="发放时间">
          <el-date-picker size="medium" v-model="formInline.grantDate" value-format="yyyy-MM" type="month" placeholder="选择发放时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" @click="queryClick">查询</el-button>
          <el-button size="medium" type="primary"  @click='outExcel(1)'>导出百岁老人营养补助拨款表（当前月）</el-button>
          <el-button size="medium" type="primary" @click='download'>下载街道签字确认表（当前月）</el-button>
          <el-button size="medium" type="primary" @click='outExcel(2)'>导出百岁老人营养补贴增补通知单（当前月）</el-button>
          
          <!-- <el-button size="medium" type="primary" >上传百岁老人营养补贴增补通知单</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="query-list">
      <TableList :table-data="tableData" v-loading="isSubmitLoading" :table-selection="tableSelection" :table-label="tableHeader" :table-option="tableOpction">
      </TableList>
      <!-- <Pagination :total="total" @pageChange="pageChange"></Pagination> -->
    </div>
    <el-dialog
      title="下载街道盖章确认表"
      :visible.sync="dialogVisible1"
       width="60%">
        <div style='display:flex'>
          <div style='display:flex;flex-direction: column;'>
            <p style='margin-bottom:20px;'  v-for="(v,i) in filesList" :key='i'>
              <span>{{v.street}}</span>  <a style='margin-left:20px'>{{v.name}}</a>  <el-button style='margin-left:20px' @click='down(v.url)'>下载</el-button>
            </p>
          </div>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import TableList from "@/components/table";
import Pagination from "@/components/table/pagination";
import {streetList,communityList,userIfo } from "@/api/file.js";
import {outExcel} from "@/assets/js/export.js"
import { 
  subsidyGrant,
  subsidyGrantFunds,
  queryStreetConfirmFile
 } from "@/api/theElderly/list.js";

export default {
  components: {
    TableList,
    Pagination
  },
  data() {
    return {
      dialogVisible1:false,
      filesList:[],
      userType: userIfo().userType,
      streetHide:'',
      type:'',
      sqjd: '',
      streetData: [],
      communityData: [],
      formInline: {
        homeStreetId: '',
        homeCommunityId: '',
        grantDate: '',
        businessType:2
      },
      tableSelection: {
        key: true,
        type: "",
        detaile: false,
      },
      isSubmitLoading: false,
      tableData: [],
      tableHeader: [
        { label: "序号", list: "index" },
        { label: "所属街道", list: "homeStreetName" },
        { label: "本月应发人数", list: "grantNum" },
        { label: "本月应发金额（元）", list: "grantAmount" },
        { label: "总计拨款（元）", list: "total" },
        { label: "备注", list: "name7" },
      ],
      tableOpction: {
        label: "操作",
        width: "220px",
        value: 1,
        options: [],
      },
      total: 10,
    }
  },
  mounted() {
    if(userIfo().streetId){
      this.formInline.homeStreetId = userIfo().streetId
      this.streetHide = true
    }
    this.formInline.grantDate = new Date().getFullYear()+'-'+(new Date().getMonth()+1)
    // 街道
    streetList().then(res => {
      if (res.data.code === 1) {
        this.streetData = res.data.data.content;
        this.streetData.forEach((v,i)=>{
          if(v.id == id){
            this.formInline.homeStreetId = v.id + '-' + v.name
            this.formInline.homeStreetName = v.name
          }
        })
      }
    });
    let id = userIfo().streetId
    this.communityFun(id);
    setTimeout(() => {
      // if(this.formInline.homeStreetId == ''){
      //   this.formInline.homeStreetId = this.streetData[0].id + '-' + this.streetData[0].name
      //   this.formInline.homeStreetName = this.streetData[0].name
      // }
      this.queryList();      
    }, 500);
  },
  methods: {
    down(url){
      location.href = url
    },
    download(){
      let data1  = JSON.parse(JSON.stringify(this.formInline))
      if(data1.homeStreetId){
        data1.homeStreetId = data1.homeStreetId.split('-')[0]
      }
      let data  = {
        uploadType:'1',
        businessType:'2',
        homeStreetId:data1.homeStreetId,
        homeStreetName:data1.homeStreetName,
        homeCommunityId:data1.homeCommunityId,
        type:1,
        updateMonth:new Date().getFullYear()+'-'+(new Date().getMonth()+1)
      }
      queryStreetConfirmFile(data).then((res)=>{
          if (res.data.code === 1) {
            if(res.data.data.length > 0){
              this.dialogVisible1 =true
              this.filesList = []
              res.data.data.forEach((val,inx)=>{
                val.files.split(',').forEach((v,i)=>{
                  if(v != ''){
                    let obj = {}
                    obj.url = process.env.VUE_APP_URL + '/' + v;
                    obj.name = v.split('/')[v.split('/').length-1]
                    obj.street = val.homeStreetName
                    this.filesList.push(obj)
                  }
                })
              })
              console.log(this.filesList)
            }else{
               this.$message({
                  message: '暂无数据，当前街道未上传盖章确认表',
                  type: 'warning'
                });
            }
          } else {
            this.$message.error(res.data.msg);
          }
      })
    },
    streetNameHandle(val) {
      let id = val
      this.formInline.homeStreetId = val;
      this.formInline.homeStreetName = val.split('-')[1];
      this.formInline.homeCommunityId = "";
      this.communityFun(val.split('-')[0]);
    },
    // 社区
    communityFun(id) {
      communityList({ streetId: id }).then(res => {
        if (res.data.code === 1) {
          this.communityData = res.data.data.content;
        }
      })
    },
    queryClick() {
      this.queryList();
    },
    // 列表查询
    queryList() {
      if(this.type == 1){
        let data  = JSON.parse(JSON.stringify(this.formInline))
        if(data.homeStreetId){
          data.homeStreetId = data.homeStreetId.split('-')[0]
        }
        console.log(data)
        subsidyGrantFunds(data).then(res => {
          if (res.data.code === 1) {
            this.tableData = []
            for(let key in res.data.data){
              let obj = {}
              if(key == 'homeAged'){
                obj = Object.assign({item:'一、居家养老服务补贴'},res.data.data[key])
              }else if(key == 'appropriation'){
                obj = Object.assign({item:'（一）拨款'},res.data.data[key])
              }else if(key == 'expenditure'){
                obj = Object.assign({item:'（二）支出'},res.data.data[key])
              }else if(key == 'low'){
                obj = Object.assign({item:'1.轻度'},res.data.data[key])
              }else if(key == 'medium'){
                obj = Object.assign({item:'2.中度'},res.data.data[key])
              }else if(key == 'high'){
                obj = Object.assign({item:'3.重度'},res.data.data[key])
              }else if(key == 'refund'){
                obj = Object.assign({item:'（三）退款'},{})
              }else if(key == 'balance'){
                obj = Object.assign({item:'（四）结余'},{})
              }
              this.tableData.push(obj)
            }
            this.tableData.forEach((v,i)=>{
              v.standard = ''
            })
            console.log(res.data.content)
            this.total = res.data.data.totalElements;
          }
        })
      }else{
        this.formInline.size = 20
        let data  = JSON.parse(JSON.stringify(this.formInline))
        if(data.homeStreetId){
          data.homeStreetId = data.homeStreetId.split('-')[0]
        }
        subsidyGrant(data).then(res => {
          console.log(res.data, "=========")
          if (res.data.code === 1) {
            console.log(res)
            this.tableData = res.data.data.content;
            this.tableData.forEach((v,i)=>{
              v.index = i+1
            })
            this.total = res.data.data.totalElements;
          }
        })
      }
      // 
    },
    pageChange(val) {
      this.formInline.page = val.page;
      this.formInline.size = val.limit;
      this.queryList();
    },
    outExcel(type){
      let data  = JSON.parse(JSON.stringify(this.formInline))
      if(data.homeStreetId){
        data.homeStreetId = data.homeStreetId.split('-')[0]
      }
      if(type == 1){
        outExcel('请确认是否导出百岁老人营养补助拨款表?',  "/subsidy/webadmin/subsidy/exportSubsidyGrant", data, '百岁老人营养补助拨款表')
      }else{
        outExcel('请确认是否导出百岁老人营养补贴增补通知单?',  "/subsidy/webadmin/subsidy/exportSubsidyNotice", data, '百岁老人营养补贴增补通知单')
      }
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
