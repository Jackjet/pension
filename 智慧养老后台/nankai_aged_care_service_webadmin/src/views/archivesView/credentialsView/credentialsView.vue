<template>
  <el-main>
    <el-col :span="24">
      <el-form :inline="true" class='el-InputForm'>
        <el-form-item class="items" style='width: 175px;'>
          <el-input clearable size="medium" placeholder="请输入老年证编号" prefix-icon="el-icon-search" v-model="SearchItem.cardCode">
          </el-input>
        </el-form-item>
        <el-form-item class="items">
          <el-input clearable size="medium" placeholder="请输入姓名" prefix-icon="el-icon-search" v-model="SearchItem.name">
          </el-input>
        </el-form-item>
        <el-form-item class="items">
          <el-input clearable size="medium" placeholder="请输入身份证号码" prefix-icon="el-icon-search" v-model="SearchItem.idCard">
          </el-input>
        </el-form-item>
        <el-form-item class="items">
          <el-select clearable size="medium" v-model="SearchItem.receiveId" placeholder="请选择是否领取">
            <el-option label="否" value="0"></el-option>
            <el-option label="是" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size='medium' icon="el-icon-search" @click="SearchNoteList">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-upload class="upload-demo fl" :action='fileUrl' :headers='header' :show-file-list='false' v-show='true' :before-upload='handleContentChange' :on-success='handleAvatarSuccess'>
            <el-button type="primary" size='medium' icon="el-icon-upload2">导入数据</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size='medium' icon="el-icon-download" @click="exportData">导出模板</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <!-- 表格 -->
      <el-table ref="multipleTable" v-loading="loading" element-loading-text="拼命加载中" :data='tableForm.list.data' :border='tableForm.list.border' empty-text='暂无数据' class='el_tab_alage' :default-sort="{
          prop: 'createTime',
          order: 'descending'
        }">
        <template v-for="(index, item) in tableForm.list.header">
          <el-table-column fit align='center' :key='item' :sortable='index.sort' v-if="!index.expand" :label="index.label" :width="index.width" :prop="index.field">
          </el-table-column>
        </template>
        <el-table-column fit align='center' :label="tableForm.list.operation.label" v-if="tableForm.list.operation" :width="tableForm.list.operation.width">
          <template slot-scope="scope">
            <el-button v-for="(value, item) in tableForm.list.operation.event" type="text" :icon="value.icon" :key='item' v-show='!(scope.row.receiveId === "1" && item === 1)' @click.native.prevent="value.method !== undefined ? value.method(scope.row, scope) : ''">{{value.label}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span='24' v-if='tableForm.paging'>
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableForm.paging.currentPage" :page-sizes="pageSizes" :page-size="tableForm.paging.limit" layout="total, sizes, prev, pager, next, jumper" :total="tableForm.paging.total">
        </el-pagination>
      </div>
    </el-col>
    <el-dialog title="导入失败" width="35%" :visible.sync="isShow" :before-close='closeDialog'>
      <div v-html="msg" style="line-height: 30px;text-align:left;overflow: auto;max-height: 300px;"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeDialog">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      streetList: [],
      communityList: [],
      valueTime: '',
      msg: '',
      loading: true,
      isShow: false,
      pageSizes: [10, 20, 50, 100],
      tableForm: {
        list: {
          header: [
            {
              label: '老年证编号',
              field: 'cardCode'
            },
            {
              label: '姓名',
              field: 'name'
            },
            {
              label: '身份证号',
              field: 'idCard'
            },
            {
              label: '是否领取',
              field: 'receive'
            },
            {
              label: '领取时间',
              field: 'receiveTime'
            },
            {
              label: '创建时间',
              field: 'createTime'
            }
          ],

          data: [],

          operation: {
            label: '操作',
            event: [
              {
                label: '编辑',
                icon: 'el-icon-edit',
                method: (row) => {
                  this.$router.push({
                    path: 'credentialsAdd',
                    query: {
                      id: row.id
                    }
                  })
                }
              },
              {
                label: '领取',
                icon: 'el-icon-tickets',
                method: (row) => {
                  this.receive(row)
                }
              }
            ]
          }
        },

        paging: {
          total: 0,
          currentPage: 1,
          limit: 20
        }
      },
      SearchItem: {
        name: '',
        cardCode: '',
        receive: '',
        idCard: ''
      },
      lastItem: {
        name: '',
        cardCode: '',
        receive: ''
      },
      fileUrl: process.env.VUE_APP_URL + this.api.user.importCardCodeData,
      header: {
        'Authorization': 'token ' + this.common.session('currentUser').token
      }
    }
  },

  mounted() {
    this.getList()
  },

  methods: {
    receive(row) {
      const that = this
      if (row.receive === '1') {
        that.$message.warning('已领取老年证')
      }
      that.$confirm('是否领取?', '提示', {
        type: 'warning'
      }).then(async () => {
        let url = this.api.user.receiveCardCode + '?id=' + row.id
        let parameter = {}
        const response = await this.request.dataPut(that, url, parameter)
        if (response.code === 1) {
          that.$message.success(response.msg)
          that.getList()
          return false
        }
        that.$message.error(response.msg)
      }).catch(() => {
        return false
      })
    },
    closeDialog(response, file, fileList) {
      this.isShow = false
      this.msg = ''
    },
    async exportData() {
      const that = this
      let url = this.api.user.retemplateCardCodeExportApply
      that.$axios({
        method: 'get',
        url: process.env.VUE_APP_URL + url,
        responseType: 'blob',
        headers: {
          'Authorization': 'token ' + this.common.session('currentUser').token
        }
      }).then((data) => {
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
        link.setAttribute('download', '老年证模板.xlsx')
        document.body.appendChild(link)
        link.click()
      })
    },
    handleContentChange(file) {
      let that = this
      let FileSize = file.size / 1024 / 1024 < 500
      if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        that.$message.error('仅支持xlsx格式文件上传')
        return false
      }
      if (!FileSize) {
        that.$message.error('上传超出文件限制大小')
        return false
      }
    },
    handleAvatarSuccess(response, file, fileList) {
      let that = this
      if (response.code === 1) {
        that.$message.success(response.msg)
        that.getList()
        return false
      }
      that.isShow = true
      that.msg = response.msg
    },
    SearchNoteList() {
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
      this.tableForm.paging.currentPage = 1
      this.getList()
    },
    // 列表
    async getList() {
      const that = this
      try {
        let findUrl = this.api.user.findAllCardCode
        let url = findUrl + '?page=' + this.tableForm.paging.currentPage + '&size=' + this.tableForm.paging.limit
        if (this.SearchItem.startTime) {
          that.valueTime = [this.SearchItem.startTime, this.SearchItem.endTime]
        } else {
          that.valueTime = []
        }
        const response = await this.request.dataGet(that, url, this.SearchItem)
        this.$refs.multipleTable.loading = false
        this.loading = false
        response.data.content.forEach(item => {
          if (item.isValid === '1') {
            item.isValid = '有'
          } else {
            item.isValid = '无'
          }
          if (item.type === '1') {
            item.type = '普通老人'
          } else {
            item.type = '居家老人'
          }
          if (item.genreName) {
            let str = ''
            let arr = JSON.parse(item.genreName)
            arr.forEach(items => {
              str += items + ','
            })
            item.genreName = str
          }
        })
        that.tableForm.list.data = response.data.content
        that.tableForm.paging.total = response.data.totalElements
      } catch (even) {
        // console.log(even)
        that.$message.error('数据获取失败')
      }
    },

    pageChange(val) {
      this.tableForm.paging.limit = val.limit
      this.tableForm.paging.currentPage = val.page
      this.getList()
    },
    handleSizeChange(val) {
      this.tableForm.paging.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.tableForm.paging.currentPage = val
      this.getList()
    }
  }
}
</script>

<style lang="scss">
.items {
  width: 160px;
}
</style>
