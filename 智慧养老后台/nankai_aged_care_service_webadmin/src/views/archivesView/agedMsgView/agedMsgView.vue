<template>
  <el-main class="agedMsgView">
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
        <el-form-item class="items">
          <el-select
            clearable
            size="medium"
            v-model="SearchItem.source"
            placeholder="请选择来源"
          >
            <el-option label="居家养老" value="0"></el-option>
            <el-option label="助餐" value="1"></el-option>
            <el-option label="市平台" value="2"></el-option>
            <el-option label="区共享交换" value="3"></el-option>
            <el-option label="公安" value="4"></el-option>
            <el-option label="残联" value="5"></el-option>
            <el-option label="社区采集" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="items">
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
        </el-form-item>
        <el-form-item class="items">
          <el-select
            clearable
            size="medium"
            v-model="SearchItem.bodyId"
            placeholder="请选择老人行为能力"
          >
            <el-option
              v-for="(item, i) in bodyIdList"
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
<!--        <el-form-item class="items">-->
<!--          <el-select-->
<!--            clearable-->
<!--            size="medium"-->
<!--            v-model="SearchItem.economicId"-->
<!--            placeholder="请选择老人经济来源"-->
<!--          >-->
<!--            <el-option-->
<!--              v-for="(item, i) in economicIdList"-->
<!--              :key="i"-->
<!--              :label="item.name"-->
<!--              :value="item.id"-->
<!--            ></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item class="items">-->
<!--          <el-select-->
<!--            clearable-->
<!--            size="medium"-->
<!--            v-model="SearchItem.type"-->
<!--            placeholder="请选择老人分类"-->
<!--          >-->
<!--            <el-option label="普通老人" value="1"></el-option>-->
<!--            <el-option label="居家老人" value="2"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item class="items">
          <el-select
            clearable
            size="medium"
            v-model="SearchItem.isValid"
            placeholder="请选择是否有效"
          >
            <el-option label="否" value="0"></el-option>
            <el-option label="是" value="1"></el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item class="items">-->
<!--          <el-select-->
<!--            clearable-->
<!--            size="medium"-->
<!--            v-model="SearchItem.assessLevelId"-->
<!--            placeholder="请选择评估等级"-->
<!--          >-->
<!--            <el-option-->
<!--              v-for="item in assessLevelList"-->
<!--              :key="item.id"-->
<!--              :label="item.name"-->
<!--              :value="item.id"-->
<!--            >-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item class="items">-->
<!--          <el-select-->
<!--            clearable-->
<!--            size="medium"-->
<!--            v-model="SearchItem.assessInfoId"-->
<!--            placeholder="请选择评估信息"-->
<!--          >-->
<!--            <el-option-->
<!--              v-for="item in assessInfoList"-->
<!--              :key="item.id"-->
<!--              :label="item.name"-->
<!--              :value="item.id"-->
<!--            >-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item class="items">
          <el-select
            clearable
            size="medium"
            v-model="SearchItem.ageArea"
            placeholder="请选择老人年龄段"
          >
            <el-option label="60-79" value="1"></el-option>
            <el-option label="80-89" value="2"></el-option>
            <el-option label="90-99" value="3"></el-option>
            <el-option label="100岁以上" value="4"></el-option>
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
          >搜索
          </el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-plus"
            @click="add"
          >添加
          </el-button
          >
        </el-form-item>
        <el-form-item>
          <el-upload
            class="upload-demo fl"
            :action="fileUrl"
            :headers="header"
            :show-file-list="false"
            v-show="true"
            :before-upload="handleContentChange"
            :on-success="handleAvatarSuccess"
          >
            <el-button type="primary" size="medium" icon="el-icon-upload2"
            >导入数据
            </el-button
            >
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-download"
            @click="exportData"
          >导出模板
          </el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-download"
            @click="exportAgedData"
          >导出老人数据
          </el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <!-- 表格 -->
      <div class="statistics">
        共计<span>{{ table.paging.total }}</span
      >位老人
      </div>
      <tableForm
        ref="trigger"
        :table-form="table"
        @getList="getList"
        @logClick="logClick"
        @setting="setting"
        @edit="edit"
        @details="details"
        @pageChange="pageChange"
      >
      </tableForm>
    </el-col>
    <el-dialog
      title="导入失败"
      width="35%"
      :visible.sync="isShow"
      :before-close="closeDialog"
    >
      <div
        v-html="msg"
        style="
          line-height: 30px;
          text-align: left;
          overflow: auto;
          max-height: 300px;
        "
      ></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeDialog">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
import tableForm from 'plugin/table'

export default {
  components: {
    tableForm,
  },

  data () {
    return {
      isShow: false,
      msg: '',
      streetIdSeen: false,
      communityIdSeen: false,
      genreList: [],
      streetList: [],
      bodyIdList: [],
      liveIdList: [],
      economicIdList: [],
      communityList: [],
      genreNameArr: [],
      assessLevelList: [],
      assessInfoList: [],
      valueTime: '',
      table: {
        list: {
          header: [
            {
              label: '老人姓名',
              field: 'name',
            },
            {
              label: '所属街道',
              field: 'homeStreetName',
            },
            {
              label: '所属社区',
              field: 'homeCommunityName',
            },
            {
              label: '来源',
              field: 'source',
            },
            {
              label: '性别',
              field: 'sex',
            },
            {
              label: '联系电话',
              field: 'phone',
            },
            {
              label: '老人类型',
              field: 'genreName',
            },
            {
              label: '老人分类',
              field: 'type',
            },
            {
              label: '是否有效',
              field: 'isValid',
            },
            {
              label: '身份证号',
              field: 'idCard',
            },
            {
              label: '创建时间',
              field: 'createTime',
            },
            {
              type: 'operation',
              label: '操作',
              field: 'operation',
              width: '100',
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
        name: '',
        homeStreetId: '',
        homeCommunityId: '',
        phone: '',
        genreName: [],
        genreId: '',
        isValid: '',
        idCard: '',
        startTime: '',
        endTime: '',
        bodyId: '',
        liveId: '',
        assessLevelId: '',
        assessInfoId: '',
        economicId: '',
        source: '',
        ageArea: '',
      },
      lastItem: {
        name: '',
        homeStreetId: '',
        homeCommunityId: '',
        phone: '',
        genreId: '',
        isValid: '',
        idCard: '',
        startTime: '',
        endTime: '',
      },
      fileUrl: process.env.VUE_APP_URL + this.api.collectUser.importData1,
      header: {
        Authorization: 'token ' + this.common.session('currentUser').token,
      },
    }
  },

  mounted () {
    const currentUser = this.common.session('currentUser')
    if (!currentUser.streetId && !currentUser.communityId) {
      this.streetIdSeen = true
      this.communityIdSeen = true
      this.getCommunityList()
    }
    if (currentUser.streetId && !currentUser.communityId) {
      this.communityIdSeen = true
      this.getCommunityList(currentUser.streetId)
    }
    this.getList()
    this.getStreetList()
    this.getGenreList()
    this.bodyIdListFun()
    this.liveIdListFun()
    this.economicIdListFun()
    this.assessLevelListFun()
    this.assessInfoListFun()
  },

  methods: {
    // 老人类型
    async getGenreList () {
      const that = this
      try {
        let url = this.api.dicManage.findAll + '?page=1&size=1000000'
        const response = await this.request.dataGet(that, url, {
          dicId: 'lrlx',
        })
        that.genreList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    // 老人身体状况
    async bodyIdListFun () {
      const that = this
      try {
        let url = this.api.dicManage.findAll + '?page=1&size=1000000'
        const response = await this.request.dataGet(that, url, {
          dicId: 'stzk',
        })
        that.bodyIdList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    // 老人居住情况
    async liveIdListFun () {
      const that = this
      try {
        let url = this.api.dicManage.findAll + '?page=1&size=1000000'
        const response = await this.request.dataGet(that, url, {
          dicId: 'jzqk',
        })
        that.liveIdList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    // 经济来源
    async economicIdListFun () {
      const that = this
      try {
        let url = this.api.dicManage.findAll + '?page=1&size=1000000'
        const response = await this.request.dataGet(that, url, {
          dicId: 'jjly',
        })
        that.economicIdList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    // 街道列表
    async getStreetList () {
      const that = this
      try {
        let url = this.api.street.findAll + '?page=1&size=1000000'
        let obj = {}
        const response = await this.request.dataGet(that, url, obj)
        that.streetList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    // 评估等级
    async assessLevelListFun () {
      const that = this
      try {
        let url = this.api.dicManage.findAll + '?page=1&size=1000000'
        const response = await this.request.dataGet(that, url, {
          dicId: 'pgdj',
        })
        that.assessLevelList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    // 评估信息
    async assessInfoListFun () {
      const that = this
      try {
        let url = this.api.dicManage.findAll + '?page=1&size=1000000'
        const response = await this.request.dataGet(that, url, {
          dicId: 'pgxx',
        })
        that.assessInfoList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    street (val) {
      this.communityList = []
      this.SearchItem.homeCommunityId = ''
      this.getCommunityList(val)
    },
    // 社区列表
    async getCommunityList (val) {
      const that = this
      try {
        let url = this.api.community.findAll + '?page=1&size=1000000'
        let obj = {
          streetId: val,
        }
        const response = await this.request.dataGet(that, url, obj)
        that.communityList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    async exportData () {
      const that = this
      let url = this.api.collectUser.templateExport
      that
        .$axios({
          method: 'get',
          url: process.env.VUE_APP_URL + url,
          responseType: 'blob',
          headers: {
            Authorization: 'token ' + this.common.session('currentUser').token,
          },
        })
        .then((data) => {
          if (data.status === 200) {
            that.$message.success('导出成功')
          }
          if (!data) {
            return
          }
          let url = window.URL.createObjectURL(data.data)
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', '老人信息模板.xlsx')
          document.body.appendChild(link)
          link.click()
        })
    },
    async exportAgedData () {
      const that = this
      let url = this.api.user.userExport
      that
        .$axios({
          method: 'get',
          url: process.env.VUE_APP_URL + url,
          responseType: 'blob',
          params: this.SearchItem,
          headers: {
            Authorization: 'token ' + this.common.session('currentUser').token,
          },
        })
        .then((data) => {
          if (data.status === 200) {
            that.$message.success('导出成功')
          }
          if (!data) {
            return
          }
          let url = window.URL.createObjectURL(data.data)
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', '老人信息数据.zip')
          document.body.appendChild(link)
          link.click()
        })
    },
    handleContentChange (file) {
      let that = this
      let FileSize = file.size / 1024 / 1024 < 500
      if (file.name.indexOf('.xlsx') === -1) {
        that.$message.error('仅支持xlsx格式文件上传')
        return false
      }
      if (!FileSize) {
        that.$message.error('上传超出文件限制大小')
        return false
      }
    },
    handleAvatarSuccess (response, file, fileList) {
      let that = this
      if (response.code === 1) {
        that.$message.success(response.msg)
        that.getList()
        return false
      }
      this.isShow = true
      this.msg = response.msg
    },
    closeDialog (response, file, fileList) {
      this.isShow = false
      this.msg = ''
    },
    add () {
      document.name = '老人信息添加'
      this.$router.push({
        path: 'agedMsgAdd',
        query: {
          type: '0',
        },
      })
    },
    logClick (row) {
      this.$router.push({
        path: 'operationLogView',
        query: {
          id: row.id,
        },
      })
    },
    setting (row) {
      const that = this
      that
        .$confirm('您确定设置为有效老人么? ', '提示', {
          type: 'warning',
        })
        .then(async () => {
          let url = that.api.user.isValid + '?id=' + row.id
          const response = await this.request.dataPut(that, url, {})
          that.$message.success(response.msg)
          that.getList()
        })
        .catch((response) => {
          that.$message.error(response.msg)
        })
    },
    edit (row) {
      document.name = '老人信息编辑'
      this.$router.push({
        path: 'agedMsgAdd',
        query: {
          id: row.id,
          type: '1',
        },
      })
    },
    details (row) {
      document.name = '老人信息详情'
      this.$router.push({
        path: 'agedMsgAdd',
        query: {
          id: row.id,
          type: '2',
        },
      })
    },
    SearchNoteList () {
      let that = this
      if (that.valueTime) {
        that.SearchItem.startTime = that.valueTime[0]
        that.SearchItem.endTime = that.valueTime[1]
      } else {
        that.SearchItem.startTime = ''
        that.SearchItem.endTime = ''
      }
      Object.entries(that.SearchItem).map((item, index) => {
        that.lastItem[item[0]] = that.SearchItem[item[0]]
      })
      this.table.paging.currentPage = 1
      this.getList()
    },
    // 列表
    async getList () {
      const that = this
      try {
        let findUrl = this.api.user.findAll
        let url =
          findUrl +
          '?page=' +
          this.table.paging.currentPage +
          '&size=' +
          this.table.paging.limit
        if (this.SearchItem.startTime) {
          that.valueTime = [this.SearchItem.startTime, this.SearchItem.endTime]
        } else {
          that.valueTime = []
        }
        if (this.genreNameArr.length > 0) {
          this.SearchItem.genreName = this.genreNameArr
            .toString()
            .replace(/,/g, '_')
        } else {
          this.SearchItem.genreName = ''
        }
        const response = await this.request.dataGet(that, url, this.SearchItem)
        this.$refs.trigger.loading = false
        response.data.content.forEach((item) => {
          item.operation = [
            {
              label: '操作日志',
              icon: 'el-icon-tickets',
              click: 'logClick',
            },
            {
              label: '详情',
              icon: 'el-icon-document',
              click: 'details',
            },
          ]
          if (item.sex === '1') {
            item.sex = '男'
          } else {
            item.sex = '女'
          }
          // 来源
          if (item.source === '0') {
            item.source = '居家养老'
          }
          if (item.source === '1') {
            item.source = '助餐'
          }
          if (item.source === '2') {
            item.source = '市平台'
          }
          if (item.source === '3') {
            item.source = '区共享交换'
          }
          if (item.source === '4') {
            item.source = '公安'
          }
          if (item.source === '5') {
            item.source = '残联'
          }
          if (item.source === '6') {
            item.source = '社区采集'
          }
          if (item.isValid === '1') {
            item.isValid = '是'
            item.operation.push({
              label: '编辑',
              icon: 'el-icon-edit',
              click: 'edit',
            })
          } else {
            item.isValid = '否'
            item.operation.push({
              label: '设置有效',
              icon: 'el-icon-setting',
              click: 'setting',
            })
          }
          if (item.type === '1') {
            item.type = '普通老人'
          } else {
            item.type = '居家老人-' + item.assessInfo + '-' + item.assessLevel
          }
          if (item.genreName) {
            let str = ''
            let arr = JSON.parse(item.genreName)
            arr.forEach((items) => {
              str += items + ','
            })
            item.genreName = str.substr(0, str.length - 1)
          }
        })
        that.table.list.data = response.data.content
        that.table.paging.total = response.data.totalElements
      } catch (even) {
        this.$message.error(even)
      }
    },

    pageChange (val) {
      this.table.paging.limit = val.limit
      this.table.paging.currentPage = val.page
      this.getList()
    },
  },
}
</script>

<style lang="scss">
.agedMsgView {
  ::-webkit-scrollbar {
    display: none;
  }

  .items {
    width: 160px;
  }

  .statistics {
    padding-left: 10px;
    text-align: left;

    span {
      font-size: 20px;
      color: blue;
    }
  }
}
</style>
