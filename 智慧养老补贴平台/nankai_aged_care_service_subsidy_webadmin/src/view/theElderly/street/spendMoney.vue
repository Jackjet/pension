<template>
  <!-- 居家养老服务补贴拨款表 -->
  <div class="page-box">
    <div class="query-search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="所属街道" v-if="!streetHide">
          <el-select clearable size="medium" v-model="formInline.homeStreetId" value-key="id" placeholder="所属街道" @change="streetNameHandle">
            <el-option v-for="item in streetData" :label="item.name" :value="item.id+'-'+item.name" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="所属社区" v-if="!communitHide" >
          <el-select size="medium" v-model="formInline.homeCommunityId" placeholder="所属社区">
            <el-option v-for="item in communityData" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="发放时间">
          <el-date-picker size="medium" :disabled='type == 1' v-model="formInline.grantDate" value-format="yyyy-MM" type="month" placeholder="选择发放时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" @click="queryClick" v-if='type == 2'>查询</el-button>
          <el-button size="medium" type="primary" @click="outExcel">导出</el-button>
          <el-button size="medium" type="primary" v-if='type == 1' @click='upLoad(3)'>上传街道签字确认表（当前月）</el-button>
          <el-button size="medium" type="primary" v-if='type == 2' @click="download(3,'街道签字确认表')">下载街道签字确认表（当前月）</el-button>
          <el-button size="medium" type="primary" v-if='type == 2' @click='upLoad(4)'>上传区级签字确认表（当前月）</el-button>
          <el-button size="medium" type="primary" v-if='type == 2' @click="download(4,'区级签字确认表')">下载区级签字确认表（当前月）</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="query-list" v-if='type == 2'>
      <TableList :table-data="tableData" v-loading="isSubmitLoading" :table-selection="tableSelection" :table-label="tableHeader" :table-option="tableOpction">
      </TableList>
      <!-- <Pagination :total="total" @pageChange="pageChange"></Pagination> -->
    </div>
    <div class="query-list" v-if='type == 1'>
      <el-table :data="tableData" style="width: 100%;">
        <el-table-column width='80' type="index" label="行次" align='center'>
        </el-table-column>
        <el-table-column prop="item" label="项目">
        </el-table-column>
        <!-- <el-table-column prop="standard" label="标准">
        </el-table-column> -->
        <el-table-column label="上期累计数" align="center">
          <el-table-column prop="lastNum" label="人数">
          </el-table-column>
          <el-table-column prop="lastAmount" label="金额">
          </el-table-column>
        </el-table-column>
        <el-table-column label="本期发放数" align="center">
          <el-table-column prop="currentNum" label="人数">
          </el-table-column>
          <el-table-column prop="currentAmount" label="金额">
          </el-table-column>
        </el-table-column>
        <el-table-column label="本期累计数" align="center">
          <el-table-column prop="currentTotalNum" label="人数">
          </el-table-column>
          <el-table-column prop="currentTotalAmount" label="金额">
          </el-table-column>
        </el-table-column>
      </el-table>
      <!-- <Pagination :total="total" @pageChange="pageChange"></Pagination> -->
    </div>
    <el-dialog title="上传签字确认表" :visible.sync="dialogVisible" :before-close='close' width="30%">
      <el-upload ref='upload' :action="actionUrl" :headers="headers" :on-change="handleChange" :on-remove="handleRemove" :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="livingUpload">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="'下载'+filesTitle" :visible.sync="dialogVisible1" width="60%">
      <div style='display:flex'>
        <div style='display:flex;flex-direction: column;'>
          <p style='margin-bottom:20px;' v-for="(v,i) in filesList" :key='i'>
            <span>{{v.street}}</span> <a style='margin-left:20px'>{{v.name}}</a>
            <el-button style='margin-left:20px' @click='down(v.url)'>下载</el-button>
          </p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TableList from "@/components/table";
import Pagination from "@/components/table/pagination";
import { streetList, communityList, userIfo, tokenStr, fileUrl } from "@/api/file.js";
import { outExcel } from "@/assets/js/export.js"

import {
  subsidyGrant,
  subsidyGrantFunds,
  streetConfirm,
  queryStreetConfirmFile
} from "@/api/theElderly/list.js";

export default {
  components: {
    TableList,
    Pagination
  },
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      filesList: [],
      filesTitle: '',
      fileList: [],
      headers: {
        Authorization: tokenStr()
      },
      actionUrl: process.env.VUE_APP_URL + fileUrl(),
      userType: userIfo().userType,
      streetHide: '',
      communitHide: '',
      type: '',
      sqjd: '',
      streetData: [],
      communityData: [],
      formInline: {
        homeStreetId: '',
        homeCommunityId: '',
        homeStreetName: '',
        grantDate: '',
        businessType: 1
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
        // { label: "补发人次", list: "reissueNum" },
        { label: "实发人次", list: "realGrantNum" },
        { label: "总计拨款（元）", list: "total" },
        // { label: "补发", list: "name7" },
      ],
      tableOpction: {
        label: "操作",
        width: "220px",
        value: 1,
        options: [],
      },
      total: 10,
      uploadType: ''
    }
  },
  mounted() {
    if (userIfo().streetId) {
      this.formInline.homeStreetId = userIfo().streetId
      this.streetHide = true
    }
    if (userIfo().communityId) {
      this.formInline.homeCommunityId = userIfo().communityId
      this.communitHide = true
    }
    this.type = location.href.split('?')[1].split('=')[1]
    this.formInline.grantDate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1)
    let id = userIfo().streetId

    // 街道
    streetList().then(res => {
      if (res.data.code === 1) {
        this.streetData = res.data.data.content;
        this.streetData.forEach((v, i) => {
          if (v.id == id) {
            this.formInline.homeStreetId = v.id + '-' + v.name
            this.formInline.homeStreetName = v.name
          }
        })
      }
    });
    this.communityFun(id);
    setTimeout(() => {
      this.queryList();
    }, 500);
  },
  methods: {
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    close() {
      this.$refs['upload'].clearFiles()
      this.dialogVisible = false
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    down(url) {
      location.href = url
    },
    upLoad(type) {
      this.uploadType = type
      this.dialogVisible = true
    },
    livingUpload() {
      let data1 = JSON.parse(JSON.stringify(this.formInline))
      if (data1.homeStreetId) {
        data1.homeStreetId = data1.homeStreetId.split('-')[0]
      }
      let str = ''
      this.fileList.forEach((v, i) => {
        if (i == this.fileList.length - 1) {
          str += v.response.fileDownloadUri
        } else {
          str += v.response.fileDownloadUri + ','
        }
      })
      let data = {
        uploadType: this.uploadType,
        businessType: '1',
        homeStreetId: data1.homeStreetId,
        homeStreetName: data1.homeStreetName,
        files: str,
        type: 1,
        uploadMonth: new Date().getFullYear() + '-' + (new Date().getMonth() + 1)
      }
      if (this.uploadType == 3) {
        this.$confirm('温馨提示：请您仔细核实数据，确认无误后将转交区级查看！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          streetConfirm(data).then((res) => {
            if (res.data.code === 1) {
              this.$message.success('您好，您提交的文件已转交区级工作人员，请您耐心等候。');
              this.$refs['upload'].clearFiles()
              this.dialogVisible = false;
              this.queryList();
            } else {
              this.$message.error(res.data.msg);
            }
          })
        })
      } else {
        streetConfirm(data).then((res) => {
          if (res.data.code === 1) {
            this.$message.success('上传成功');
            this.$refs['upload'].clearFiles()
            this.dialogVisible = false;
            this.queryList();
          } else {
            this.$message.error(res.data.msg);
          }
        })
      }


    },
    streetNameHandle(val) {
      console.log(val)
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
      if (this.type == 1) {
        let data = JSON.parse(JSON.stringify(this.formInline))
        if (data.homeStreetId) {
          data.homeStreetId = data.homeStreetId.split('-')[0]
        }
        subsidyGrantFunds(data).then(res => {
          if (res.data.code === 1) {
            this.tableData = []
            this.tableData.push(Object.assign({ item: '一、居家养老服务补贴' }, {}))
            for (let key in res.data.data) {
              let obj = {}
              if (key == 'homeAged') {
                obj = Object.assign({ item: '一、居家养老服务补贴' }, res.data.data[key])
              } else if (key == 'appropriation') {
                obj = Object.assign({ item: '（一）拨款' }, res.data.data[key])
                obj.lastNum = '—'
                obj.currentNum = '—'
                obj.currentTotalNum = '—'
              } else if (key == 'expenditure') {
                obj = Object.assign({ item: '（二）支出' }, res.data.data[key])
              } else if (key == 'low') {
                obj = Object.assign({ item: '1.轻度' }, res.data.data[key])
              } else if (key == 'medium') {
                obj = Object.assign({ item: '2.中度' }, res.data.data[key])
              } else if (key == 'high') {
                obj = Object.assign({ item: '3.重度' }, res.data.data[key])
              }
              // else if(key == 'refund'){
              //   obj = Object.assign({item:'（三）退款'},{})
              // }else if(key == 'balance'){
              //   obj = Object.assign({item:'（四）结余'},{})
              // }
              if (key != 'grantDate' && key != 'homeStreetName') {
                this.tableData.push(obj)
              }
            }
            this.tableData.push(Object.assign({ item: '（三）退款' }, {}))
            this.tableData.push(Object.assign({ item: '（四）结余' }, {}))
            this.tableData.forEach((v, i) => {
              v.standard = ''
            })
            console.log(res.data.content)
            this.total = res.data.data.totalElements;
          }
        })
      } else {
        this.formInline.size = 20
        let data = JSON.parse(JSON.stringify(this.formInline))
        if (data.homeStreetId) {
          data.homeStreetId = data.homeStreetId.split('-')[0]
        }
        subsidyGrant(data).then(res => {
          console.log(res.data, "=========")
          if (res.data.code === 1) {
            console.log(res)
            this.tableData = res.data.data.content;
            this.tableData.forEach((v, i) => {
              v.index = i + 1
            })
            this.total = res.data.data.totalElements;
          }
        })
      }
      // 
    },
    download(uploadType, down) {
      let data1 = JSON.parse(JSON.stringify(this.formInline))
      if (data1.homeStreetId) {
        data1.homeStreetId = data1.homeStreetId.split('-')[0]
      }
      let data = {
        uploadType: uploadType,
        businessType: '1',
        homeStreetId: data1.homeStreetId,
        homeStreetName: data1.homeStreetName,
        type: 1,
        uploadMonth: new Date().getFullYear() + '-' + (new Date().getMonth() + 1)
      }
      queryStreetConfirmFile(data).then((res) => {
        if (res.data.code === 1) {
          if (res.data.data.length > 0) {
            this.dialogVisible1 = true
            this.filesList = []
            this.filesTitle = down
            res.data.data.forEach((val, inx) => {
              val.files.split(',').forEach((v, i) => {
                if (v != '') {
                  let obj = {}
                  obj.url = process.env.VUE_APP_URL + '/' + v;
                  obj.name = v.split('/')[v.split('/').length - 1]
                  obj.street = val.homeStreetName
                  this.filesList.push(obj)
                }
              })
            })
          } else {
            this.$message({
              message: '暂无数据，当前街道未上传' + down,
              type: 'warning'
            });
          }
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    pageChange(val) {
      this.formInline.page = val.page;
      this.formInline.size = val.limit;
      this.queryList();
    },
    outExcel() {
      let data = JSON.parse(JSON.stringify(this.formInline))
      if (data.homeStreetId) {
        data.homeStreetId = data.homeStreetId.split('-')[0]
      }
      if (this.type == 1) {
        outExcel('请确认是否导出南开区民政专项经费（居家养老政府补贴）支出情况表?', "/subsidy/webadmin/subsidy/exportSubsidyGrantFunds", data, '南开区民政专项经费（居家养老政府补贴）支出情况表')
      } else {
        outExcel('请确认是否导出居家养老服务补贴拨款表?', "/subsidy/webadmin/subsidy/exportSubsidyGrant", data, '居家养老服务补贴拨款表')
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
