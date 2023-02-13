<template>
  <!-- 街道补贴上报 补贴“发放”表 -->
  <div class="page-box">
    <div class="query-search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="所属街道" v-if="!streetHide">
          <el-select size="medium" v-model="formInline.homeStreetId" value-key="id" placeholder="所属街道" @change="streetNameHandle" clearable>
            <el-option v-for="item in streetData" :label="item.name" :value="item.id+'-'+item.name" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属社区" v-if="!communitHide">
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
          <el-date-picker size="medium" v-model="timeDate" type="daterange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" style="width:15rem" @change="timeChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" @click="queryClick">查询</el-button>
          <el-button size="medium" type="primary" @click="outExcel()">导出</el-button>
          <el-button size="medium" type="primary" v-if='type == 1' @click='upLoad'>上传街道盖章确认表（当前月）</el-button>
          <el-button size="medium" type="primary" v-if='type == 2' @click='download'>下载街道盖章确认表（当前月）</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="query-list">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="homeStreetName" label="街道名称">
        </el-table-column>
        <el-table-column prop="homeCommunityName" label="社区">
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
    <el-dialog title="上传街道盖章确认表" :visible.sync="dialogVisible" :before-close='close' width="30%">
      <el-upload ref='upload' :action="actionUrl" :headers="headers" :on-change="handleChange" :on-remove="handleRemove" :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="livingUpload">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="下载街道盖章确认表" :visible.sync="dialogVisible1" width="60%">
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
import Pagination from "@/components/table/pagination";
import {
  subsidyGrantFindAll,
  subsidyGrantExport,
  subsidyFindAllByUser,
  streetConfirm,
  queryStreetConfirmFile,
  findAllByUserAndAlive
} from "@/api/theElderly/list.js";
import { streetList, communityList, userIfo, tokenStr, fileUrl } from "@/api/file.js";
import { outExcel } from "@/assets/js/export.js"
export default {
  components: {
    Pagination
  },
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      fileList: [],
      headers: {
        Authorization: tokenStr()
      },
      actionUrl: process.env.VUE_APP_URL + fileUrl(),
      userType: userIfo().userType,
      streetId: '',
      streetData: [],
      communityData: [],
      timeDate: null,
      formInline: {
        // communityId: '',//服务地社区Id
        subsidyType: null,//补贴类别，1生活、2护理、3生活护理
        al: null,//评估等级:1轻、2中、3重
        startTime: '',
        endTime: '',
        homeStreetId: '',
        homeStreetName: '',
        page: 1,
        size: 10,
        businessType: 1
      },
      tableData: [],
      total: 0,
      streetHide: '',
      communitHide: '',
      type: '',
      filesList: ''
    }
  },
  mounted() {
    this.type = location.href.split('?')[1].split('=')[1]
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var d = new Date(year, month, 0);
    let timeEnd = d.getDate()
    // this.timeDate = [date.getFullYear()+'-'+month+'-01 00:00:00',date.getFullYear()+'-'+month+'-'+timeEnd+' 23:59:59']
    this.timeChange()
    if (userIfo().streetId) {
      this.formInline.homeStreetId = userIfo().streetId
      this.streetHide = true
    }
    if (userIfo().communityId) {
      this.formInline.homeCommunityId = userIfo().communityId
      this.communitHide = true
    }
    // 街道
    let id = userIfo().streetId
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
    close() {
      this.$refs['upload'].clearFiles()
      this.dialogVisible = false
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    handleChange(file, fileList) {
      console.log(this.fileList)
      this.fileList = fileList
    },
    upLoad() {
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
        uploadType: '1',
        businessType: '1',
        homeStreetId: data1.homeStreetId,
        homeStreetName: data1.homeStreetName,
        homeCommunityId: data1.homeCommunityId,
        files: str,
        type: 1,
        startTime: data1.startTime,
        endTime: data1.endTime,
        uploadMonth: new Date().getFullYear() + '-' + (new Date().getMonth() + 1)
      }
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
    },
    down(url) {
      location.href = url
    },
    download() {
      let data1 = JSON.parse(JSON.stringify(this.formInline))
      if (data1.homeStreetId) {
        data1.homeStreetId = data1.homeStreetId.split('-')[0]
      }
      let data = {
        uploadType: '1',
        businessType: '1',
        homeStreetId: data1.homeStreetId,
        homeStreetName: data1.homeStreetName,
        homeCommunityId: data1.homeCommunityId,
        type: 1,
        startTime: data1.startTime,
        endTime: data1.endTime,
        uploadMonth: new Date().getFullYear() + '-' + (new Date().getMonth() + 1)
      }
      queryStreetConfirmFile(data).then((res) => {
        if (res.data.code === 1) {
          if (res.data.data.length > 0) {
            this.dialogVisible1 = true
            this.filesList = []
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
              message: '暂无数据，当前街道未上传盖章确认表',
              type: 'warning'
            });
          }
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    // 列表查询
    queryList() {
      let data = JSON.parse(JSON.stringify(this.formInline))
      if (data.homeStreetId) {
        data.homeStreetId = data.homeStreetId.split('-')[0]
      }
      findAllByUserAndAlive(data).then(res => {
        if (res.data.code === 1) {
          this.tableData = res.data.data.content;
          this.tableData.forEach((v, i) => {
            v.genreName = JSON.parse(v.genreName).join(',')
            if (v.al == 1) {
              v.al = '轻度'
            } else if (v.al == 2) {
              v.al = '中度'
            } else {
              v.al = '重度'
            }
            if (v.subsidyType == '1') {
              v.subsidyType = '生活'
            } else if (v.subsidyType == 2) {
              v.subsidyType = '护理'
            } else {
              v.subsidyType = '生活+护理'
            }
            v.liveSubsidy = v.liveSubsidy == 0 ? '否' : '是'
            v.nursingSubsidy = v.nursingSubsidy == 0 ? '否' : '是'
            if (v.aliveFile) {
              v.aliveFile = process.env.VUE_APP_URL + '/' + JSON.parse(v.aliveFile)[0].fileDownloadUri
            }
            v.createTime = v.createTime.split(' ')[0]
          })
          this.total = res.data.data.totalElements;
        }
      })
    },
    timeChange() {
      console.log(this.timeDate)
      if (this.timeDate) {
        this.formInline.startTime = this.timeDate[0];
        this.formInline.endTime = this.timeDate[1].split(' ')[0] + ' 23:59:59';
      } else {
        this.formInline.startTime = '';
        this.formInline.endTime = '';
      }
    },
    queryClick() {
      this.queryList();
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
      outExcel('请确认是否导出补贴发放表?', "/subsidy/webadmin/subsidyGrant/export", data, '补贴发放表')
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
