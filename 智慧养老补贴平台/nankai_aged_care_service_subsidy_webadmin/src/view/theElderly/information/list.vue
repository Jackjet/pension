<template>
  <!-- 居家养老补贴发放 居家养老档案馆 -->
  <div class="page-box">
    <div class="query-search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="120px">
        <el-form-item label="老人身份证号">
          <el-input size="medium" placeholder="老人身份证号" v-model="formInline.idCard" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="老人姓名">
          <el-input size="medium" placeholder="老人姓名" v-model="formInline.name" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input size="medium" placeholder="联系电话" v-model="formInline.phone" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="所属街道" v-if='!streetHide'>
          <el-select size="medium" v-model="formInline.homeStreetId" value-key="id" placeholder="所属街道" @change="streetNameHandle" clearable>
            <el-option v-for="item in streetData" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属社区" v-if='!communitHide'>
          <el-select size="medium" v-model="formInline.homeCommunityId" placeholder="所属社区" clearable>
            <el-option v-for="item in communityData" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="老人类型">
          <el-select size="medium" style="width:100%" value-key="id" v-model="formInline.genreId" placeholder="老人类型" clearable @change="dicManageHandle">
            <el-option v-for="item in dicManage" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="年龄">
          <el-select size="medium" v-model="formInline.region" placeholder="年龄" clearable>
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="评估等级">
          <el-select size="medium" v-model="formInline.al" placeholder="评估等级" clearable>
            <el-option label="轻度" :value="1"></el-option>
            <el-option label="中度" :value="2"></el-option>
            <el-option label="重度" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="补贴类型">
          <el-select size="medium" v-model="formInline.subsidyType" placeholder="补贴类型" clearable>
            <el-option label="生活" :value="1"></el-option>
            <el-option label="护理" :value="2"></el-option>
            <el-option label="生活+护理" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请日期">
          <el-date-picker size="medium" width='' v-model="timeDate" type="daterange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" style="width:15rem" @change="timeChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="margin-left:10px">
          <el-button size="medium" @click="queryClick">查询</el-button>
          <el-button size="medium" type="primary" @click="outExcel()">导出</el-button>
          <el-button v-if="type==='1'" size="medium" type="primary" @click="batch">发放居家养老补贴</el-button>
          <!-- <el-button v-if="type==='2'" size="medium" type="primary">居家养老补贴申请</el-button> -->
          <!-- <el-button v-if="type==='1'" size="medium" type="primary" @click="suspend('暂停发放')">暂停发放</el-button>
          <el-button v-if="type==='1'" size="medium" type="primary" @click="suspend('停止发放')">停止发放</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="query-list">
      <TableList @onHandleSelectionChange='expandSelect' :table-data="tableData" :expands='expands' v-loading="isSubmitLoading" :table-selection="tableSelection" :table-label="tableHeader" :table-option="tableOpction">
      </TableList>
      <Pagination :total="total" @pageChange="pageChange"></Pagination>
    </div>
    <suspend ref="suspend"></suspend>
    <el-dialog title="文件上传" :visible.sync="dialogVisible" :before-close='close' width="30%">
      <el-upload ref='upload' :action="actionUrl" :headers="headers" list-type="picture-card" :file-list='fileList' :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess">
        <i class="el-icon-plus"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="livingUpload">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TableList from "@/components/table";
import Pagination from "@/components/table/pagination";
import { subsidyFindAllByUser, batchInsert, livingProof } from "@/api/theElderly/list.js";
import { userIfo, streetList, communityList, dicManageList, tokenStr, fileUrl, fileListData } from "@/api/file.js";
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
      genreIdArr: [],
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
        { label: "老人类型", list: "genreName" },
        {
          label: "是否享受残疾生活补贴",
          code: (row) => {
            if (row.liveSubsidy == '是') {
              return "<span style='color:red'>是</span>"
            } else {
              return "<span>否</span>"
            }
          }, type: 'html'
        },
        {
          label: "是否享受残疾护理补贴",
          code: (row) => {
            if (row.nursingSubsidy == '是') {
              return "<span style='color:red'>是</span>"
            } else {
              return "<span>否</span>"
            }
          }, type: 'html'
        },
        { label: "补贴类型", list: "subsidyType" },
        { label: "评估等级", list: "al" },
        { label: "补贴金额（元）", list: "subsidyAmount" },
        { label: "身份证号", list: "idCard" },
        { label: "申请日期", list: "createTime" },
        {
          label: "申请类别", list: "applyType", type: 'html',
          code: (row) => {
            if (row.applyType === 1) {
              return "<span>低保、低收入、优抚对象困难老人</span>"
            } else if (row.applyType === 2) {
              return "<span>低于最低工资标准困难老人</span>"
            }
          },
        },
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
            label: "暂停发放",
            key: 0,
            type: "text",
            show: (row) => {
              return this.type == '1'
            },
            method: (row) => {
              this.suspend(row, '暂停发放')
            },
          },
          {
            label: "停止发放",
            key: 0,
            type: "text",
            show: (row) => {
              return this.type == '1'
            },
            method: (row) => {
              this.suspend(row, '停止发放')
            },
          },
          {
            label: "上传健在证明",
            key: 0,
            type: "text",
            show: (row) => {
              return (this.type == '1' || this.type == '3') && (userIfo().userType != 6 && userIfo().userType != 2)
            },
            method: (row) => {
              this.upLoad(row)
            },
          },
          {
            label: "详情",
            key: 0,
            type: "text",
            show: (row) => {
              return this.type == '2'
            },
            method: (row) => {
              this.toDetaile(row)
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
    if (this.type == 2) {
      this.tableHeader.pop()
      this.tableSelection.type = ''
    }
    if (userIfo().streetId) {
      this.formInline.homeStreetId = userIfo().streetId
      this.streetHide = true
    }
    if (userIfo().communityId) {
      this.formInline.homeCommunityId = userIfo().communityId
      this.communitHide = true
    }
    // console.log(this.streetHide, this.communitHide)
    // 街道
    streetList().then(res => {
      if (res.data.code === 1) {
        this.streetData = res.data.data.content;
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
    // 上传成功
    handleSuccess(response, file, fileList) {
      this.resultForm.jointAuditFile = fileListData(fileList);
      // this.$nextTick(() => {
      //   this.$refs.resultForm.clearValidate('jointAuditFile');
      // })
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
      livingProof({ id: this.livingRow.id, aliveFile: JSON.stringify(this.resultForm.jointAuditFile), businessType: 1 }).then((res) => {
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
          this.$message.success('当前月居家养老补贴已成功发放！');
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
      this.formInline.homeCommunityId = "";
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
      this.formInline.businessType = 1;
      this.formInline.notGrantStatus = 4;

      console.log(this.genreIdArr)
      subsidyFindAllByUser(this.formInline).then(res => {
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
            v.createTime = v.createTime ? v.createTime.split(' ')[0] : ""
          })
          this.total = res.data.data.totalElements;
        }
      })
    },
    dicManageHandle(value) {
      this.genreIdArr = value;
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
      let data = Object.assign({ businessType: 1 }, this.formInline)
      outExcel('请确认是否导出列表信息吗?', "/subsidy/webadmin/subsidy/export", data, '居家养老补贴信息')
    },
    toDetaile(row) {
      this.$router.push({
        path: '/information/detail',
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
