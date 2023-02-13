<template>
  <!-- 居家养老补贴发放 居家养老档案馆 -->
  <div class="page-box">
    <div class="query-search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="120px">
        <el-form-item label="身份证号" v-if='type != 2'>
          <el-input size="medium" placeholder="身份证号" v-model="formInline.idCard" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="老人姓名" v-if='type != 2'>
          <el-input size="medium" placeholder="老人姓名" v-model="formInline.name" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="联系电话" v-if='type != 2'>
          <el-input size="medium" placeholder="联系电话" v-model="formInline.phone" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="所属街道" v-if='!streetHide'>
          <el-select size="medium" v-model="formInline.homeStreetId" value-key="id" placeholder="所属街道" @change="streetNameHandle" clearable>
            <el-option v-for="item in streetData" :label="item.name" :value="item.id+'-'+item.name" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属社区" v-if='!communitHide'>
          <el-select size="medium" v-model="formInline.homeCommunityId" placeholder="所属社区" clearable>
            <el-option v-for="item in communityData" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发放月份" v-if='type == 2'>
          <el-date-picker size="medium" v-model="formInline.createTime" value-format="yyyy-MM" type="month" placeholder="选择发放时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="申请日期" v-if='type != 2'>
          <el-date-picker size="medium" v-model="timeDate" type="daterange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" style="width:15rem" @change="timeChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="margin-left:10px">
          <el-button size="medium" @click="queryClick">查询</el-button>
          <el-button v-if="type==='2' || type == 3 || type==='4'" size="medium" type="primary" @click="outExcel()">导出</el-button>
          <el-button v-if="type==='2'" size="medium" type="primary" @click="upLoad1">上传街道签字确认表（当前月）</el-button>
          <!-- <el-button v-if="type==='3'" size="medium" type="primary" @click="batch">查看百岁老人营养补贴通知单</el-button> -->
          <el-button v-if="type==='3'" size="medium" type="primary" @click="batch">发放生日补贴</el-button>
          <!-- <el-button v-if="type==='4'" size="medium" type="primary" @click="batch">90岁生日补贴业务申请</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="query-list">
      <TableList @onHandleSelectionChange='expandSelect' :table-data="tableData" :expands='expands' v-loading="isSubmitLoading" :table-selection="tableSelection" :table-label="tableHeader" :table-option="tableOpction">
      </TableList>
      <Pagination :total="total" @pageChange="pageChange"></Pagination>
    </div>
    <suspend ref="suspend"></suspend>
    <el-dialog title="上传健在证明" :visible.sync="dialogVisible" :before-close='close' width="30%">
      <el-upload ref='upload' :action="actionUrl" :headers="headers" list-type="picture-card" :file-list='fileList' :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess">
        <i class="el-icon-plus"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="livingUpload">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="上传街道签字确认表" :visible.sync="dialogVisible1" width="30%">
      <el-upload ref='upload' :action="actionUrl" :headers="headers" :on-change="handleChange" :file-list="fileList1">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="livingUpload1">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TableList from "@/components/table";
import Pagination from "@/components/table/pagination";
import { subsidyFindAllByUser, batchInsert, livingProof, birthdayCancel, streetConfirm } from "@/api/theElderly/list.js";
import { userIfo, streetList, communityList, dicManageList, tokenStr, fileUrl, fileListData, ages } from "@/api/file.js";

import { outExcel } from "@/assets/js/export.js"

import suspend from "./suspend.vue";

export default {
  components: {
    TableList,
    Pagination,
    suspend
  },
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      fileList1: [],
      resultForm: {},
      fileList: [],
      headers: {
        Authorization: tokenStr()
      },
      actionUrl: process.env.VUE_APP_URL + fileUrl(),
      type: this.$route.query.type,
      chooseId: [],
      chooseList: [],
      expands: '',
      streetData: [],
      communityData: [],
      dicManage: [],
      timeDate: null,
      formInline: {
        businessType: 3,
        notGrantStatus: 4,
        idCard: '',
        name: '',
        phone: '',
        homeStreetId: '',
        homeCommunityId: '',
        genreId: '',
        al: null,
        subsidyType: null,
        startTime: '',
        endTime: '',
        page: 1,
        size: 10
      },
      tableSelection: {
        key: true,
        type: "selection",
        detaile: false,
      },
      isSubmitLoading: false,
      tableData: [],
      tableHeader: [
        { label: "老人姓名", list: "name" },
        { label: "所属街道", list: "homeStreetName" },
        { label: "所属社区", list: "homeCommunityName" },
        { label: "性别", list: "sex" },
        { label: "联系电话", list: "phone" },
        { label: "身份证号", list: "idCard" },
        { label: "年龄", list: "age" },
        { label: "出生时间", list: "birthday" },
        { label: "发放金额", list: "subsidyAmount" },
        { label: "银行账户", list: "cardNum" },
        { label: "申请日期", list: "createTime" },
        { label: "生效时间", list: "processEndTime" },
        {
          label: "健在确认（当月）", code: (row) => {
            if (row.aliveFile) {
              return "<a href=" + row.aliveFile + " title='下载健在证明' download=''><i style='font-size:1.25rem' class='el-icon-download'></i></a>"
            } else {
              return "<a></a>"
            }
          }, type: 'html'
        },
      ],
      tableOpction: {
        label: "操作",
        width: "150px",
        value: 0,
        options: [
          {
            label: "上传健在证明",
            key: 0,
            type: "text",
            show: (row) => {
              return this.type == '1'
            },
            method: (row) => {
              this.upLoad(row)
            },
          },
          {
            label: "详情",
            key: 0,
            type: "text",
            method: (row) => {
              this.toDetaile(row)
            },
          },
          {
            label: "去世",
            key: 0,
            show: (row) => {
              return this.type == '4'
            },
            type: "text",
            method: (row) => {
              this.die(row, 0)
            },
          },
          {
            label: "人口流动",
            key: 0,
            show: (row) => {
              return this.type == '4'
            },
            type: "text",
            method: (row) => {
              this.die(row, 1)
            },
          },
          {
            label: "转百岁申请",
            key: 0,
            show: (row) => {
              return this.type == '4'
            },
            type: "text",
            method: (row) => {
              this.toHundred(row)
            },
          },
        ],
      },
      total: 10,
      livingRow: '',
      streetHide: false,
      communitHide: false,
    }
  },
  mounted() {
    if (this.type != 4) {
      this.formInline.birthday = 1
    }
    if (userIfo().streetId) {
      this.formInline.homeStreetId = userIfo().streetId
      this.streetHide = true
    }
    if (userIfo().communityId) {
      this.formInline.homeCommunityId = userIfo().communityId
      this.communitHide = true
    }
    // 街道
    streetList().then(res => {
      if (res.data.code === 1) {
        this.streetData = res.data.data.content;
        this.streetData.forEach((v, i) => {
          if (v.id == userIfo().streetId) {
            this.formInline.homeStreetId = v.id + '-' + v.name
            this.formInline.homeStreetName = v.name
          }
        })
      }
    });
    this.communityFun(userIfo().streetId);
    // 老人类型
    dicManageList().then(res => {
      if (res.data.code === 1) {
        this.dicManage = res.data.data.content;
      }
    })
    this.queryList();
  },
  methods: {
    handleRemove(file, fileList) {
      this.fileList1 = fileList
    },
    handleChange(file, fileList) {
      this.fileList1 = fileList
    },
    upLoad1() {
      this.dialogVisible1 = true
    },
    livingUpload1() {
      let data1 = JSON.parse(JSON.stringify(this.formInline))
      if (data1.homeStreetId) {
        data1.homeStreetId = data1.homeStreetId.split('-')[0]
      }
      let str = ''
      this.fileList1.forEach((v, i) => {
        if (i == this.fileList1.length - 1) {
          str += v.response.fileDownloadUri
        } else {
          str += v.response.fileDownloadUri + ','
        }
      })
      let data = {
        uploadType: '1',
        businessType: '3',
        homeStreetId: data1.homeStreetId,
        homeStreetName: data1.homeStreetName,
        homeCommunityId: data1.homeCommunityId,
        files: str,
        type: 1,
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
            this.dialogVisible1 = false;
            this.queryList();
          } else {
            this.$message.error(res.data.msg);
          }
        })
      })
    },
    toHundred(row) {
      this.$router.push({
        path: '/nutrition'
      })
    },
    die(row, type) {
      console.log()
      let option = type == 0 ? '去世注销' : '人口流动注销'
      this.$confirm('您正在进行' + row.name + '老人的' + option + '操作，请您仔细确认', '是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        birthdayCancel({ id: row.id, type }).then((res) => {
          if (res.data.code == 1) {
            this.$message('您好，您的注销操作已经完成，后续老人将无法享受生日补贴福利')
            this.queryList()
          } else {

          }
        })
      })
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      this.resultForm.jointAuditFile = fileListData(fileList);
    },
    // 图片删除
    handleRemove(file, fileList) {
      this.resultForm.jointAuditFile = fileListData(fileList);
    },
    // 图片放大效果
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisibleImg = true;
    },
    upLoad(row) {
      this.dialogVisible = true
      this.livingRow = row
    },
    close() {
      this.$refs['upload'].clearFiles()
      this.dialogVisible = false
    },
    livingUpload() {
      livingProof({ id: this.livingRow.id, businessType: 3, aliveFile: JSON.stringify(this.resultForm.jointAuditFile) }).then((res) => {
        if (res.data.code === 1) {
          this.$message.success('上传文件成功！');
          this.$refs['upload'].clearFiles()
          this.dialogVisible = false;
          this.queryList();
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    batch() {
      if (this.chooseId.length == 0) {
        this.$message({
          message: '请选择至少一条数据',
          type: 'warning'
        });
        return
      }
      batchInsert({ subsidyIds: this.chooseId }).then((res) => {
        if (res.data.code === 1) {
          this.$message.success('当前月生日补贴已成功发放！');
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    suspend(row, title) {
      this.$refs.suspend.open(row, title)
    },
    streetNameHandle(val) {
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
    timeChange() {
      if (this.timeDate) {
        this.formInline.startTime = this.timeDate[0];
        this.formInline.endTime = this.timeDate[1].split(' ')[0] + ' 23:59:59';
      } else {
        this.formInline.startTime = '';
        this.formInline.endTime = '';
      }
    },
    expandSelect(vals) {
      const that = this
      that.chooseId = []
      that.chooseList = []
      vals.map(function (v, k) {
        that.chooseId.push(v.id)
        that.chooseList.push(v)
      })
      console.log(this.chooseId)
    },
    // 列表查询
    queryList() {
      let data = JSON.parse(JSON.stringify(this.formInline))
      if (data.homeStreetId) {
        data.homeStreetId = data.homeStreetId.split('-')[0]
      }
      subsidyFindAllByUser(data).then(res => {
        if (res.data.code === 1) {
          this.tableData = res.data.data.content;
          this.tableData.forEach((v, i) => {
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
            v.createTime = v.createTime ? v.createTime.split(' ')[0] : "";
            v.processEndTime = v.processEndTime ? v.processEndTime.split(' ')[0] : "";
            v.age = ages(v.birthday)
          })
          this.total = res.data.data.totalElements;
        }
      })
    },
    queryClick() {
      this.queryList();
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
      outExcel('请确认是否导出列表信息吗?', "/subsidy/webadmin/subsidyGrant/export", data, '90岁老人生日补贴信息')
    },
    toDetaile(row) {
      this.$router.push({
        path: '/birthday/information/detail',
        query: {
          id: row.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-box {
  padding: 1.25rem 3.125rem;
  box-sizing: border-box;
  .query-search {
    border-radius: 0.25rem;
    box-shadow: $back-shadow;
    padding: 0.9375rem 0.625rem;
  }
  .query-list {
    margin-top: 1.25rem;
  }
}
.el-form-item {
  margin: 0;
}
</style>
