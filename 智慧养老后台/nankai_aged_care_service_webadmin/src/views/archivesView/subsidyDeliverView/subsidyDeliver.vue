<template>
  <div>
    <el-main>
      <el-col :span="24">
        <el-form :inline="true" class='el-InputForm'>
          <el-form-item class="items">
            <el-input clearable size="medium" placeholder="请输入老人姓名" prefix-icon="el-icon-search" v-model="SearchItem.name">
            </el-input>
          </el-form-item>
          <el-form-item class="items">
            <el-input clearable size="medium" placeholder="请输入身份证号" prefix-icon="el-icon-search" v-model="SearchItem.idCard">
            </el-input>
          </el-form-item>
          <el-form-item class="items">
            <el-input clearable size="medium" placeholder="请输入联系电话" prefix-icon="el-icon-search" v-model="SearchItem.phone">
            </el-input>
          </el-form-item>
          <el-form-item style="width: 160px;">
            <el-select clearable size="medium" v-model="SearchItem.assessLevelId" placeholder="请选择评估等级">
              <el-option v-for="item in assessLevelList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width: 160px;">
            <el-select clearable size="medium" v-model="SearchItem.assessInfoId" placeholder="请选择评估信息">
              <el-option v-for="item in assessInfoList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if='(homeStreetId || homeCommunityId) ? false : true'>
            <el-select clearable size="medium" v-model="SearchItem.homeStreetId" placeholder="请选择所属街道" @change='street'>
              <el-option v-for="item in streetList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if='homeCommunityId ? false : true'>
            <el-select clearable size="medium" v-model="SearchItem.homeCommunityId" placeholder="请选择所属社区">
              <el-option v-for="item in communityList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size='medium' icon="el-icon-search" @click="SearchNoteList">搜索</el-button>
            <el-button type="primary" size='medium' icon="el-icon-document" @click="goDeliver">发放养老补贴</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <!-- 表格 -->
        <!--<tableForm-->
        <!--ref="trigger"-->
        <!--:table-form='table'-->
        <!--@getList='getList'-->
        <!--@pageChange='pageChange'>-->
        <!--</tableForm>-->

        <tableForm ref="trigger" :table-form='table' @getList='getList' @pageChange='pageChange' @onHandleSelectionChange='onHandleSelectionChange'>
        </tableForm>

      </el-col>
    </el-main>
    <div v-if="dialog.reissue" class="dialog">
      <el-dialog :visible.sync="dialog.reissue" custom-class="customWidth">
        <reissue-dialog @dialogCancel="closeReissue" :infoForm="currentReissue" @success="getList(1)"></reissue-dialog>
      </el-dialog>
    </div>
    <div v-if="dialog.retrieve" class="dialog">
      <el-dialog :visible.sync="dialog.retrieve" custom-class="customWidth">
        <retrieve-dialog @dialogCancel="closeRetrieve" :infoForm="currentRetrieve" @success="getList(1)"></retrieve-dialog>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import tableForm from 'plugin/table'
import reissueDialog from './dialogViews/reissueDialog'
import retrieveDialog from './dialogViews/retrieveDialog'
import options from '../../../assets/js/options'

export default {
  components: {
    tableForm,
    reissueDialog,
    retrieveDialog
  },

  data() {
    return {
      homeStreetId: this.common.session('currentUser').streetId,
      homeCommunityId: this.common.session('currentUser').communityId,
      streetList: [],
      communityList: [],
      assessLevelList: [],
      assessInfoList: [],
      table: {
        list: {
          styleMethod: {
            method: (row, column, rowIndex, columnIndex) => {
              if (row.column.label === '残疾类别') {
                if (row.row.disabilityName) {
                  return 'color:red'
                }
              }
              return ''
            }
          },
          border: false,
          header: [
            {
              label: '老人姓名',
              field: 'name'
            },
            {
              label: '所属街道',
              field: 'homeStreetName'
            },
            {
              label: '所属社区',
              field: 'homeCommunityName'
            },
            {
              label: '性别',
              field: 'sex',
              width: '60px'
            },
            {
              label: '联系电话',
              field: 'phone'
            },
            {
              label: '老人类型',
              field: 'genreName'
            },
            {
              label: '残疾类别',
              field: 'disabilityName',
              width: '120px'
            },
            {
              label: '评估信息',
              field: 'assessInfo'
            },
            {
              label: '评估等级',
              field: 'assessLevel'
            },
            {
              label: '补贴金额（单位：元）',
              field: 'assessMoney'
            },
            {
              label: '身份证号',
              field: 'idCard'
            },
            {
              label: '创建时间',
              field: 'createTime'
            }
          ],

          type: 'checkbox',
          data: [],

          operation: {
            label: '操作',
            width: '150',
            event: [
              {
                label: '详情',
                icon: 'el-icon-document',
                method: (row) => {
                  this.goDetail(row)
                }
              },
              {
                label: '补发养老补贴',
                icon: 'el-icon-document',
                method: (row) => {
                  this.openWindow(row, '1')
                }
              },
              {
                label: '养老补贴退款',
                icon: 'el-icon-document',
                method: (row) => {
                  this.openWindow(row, '2')
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
        idCard: '',
        phone: '',
        assessLevelId: '',
        assessInfoId: '',
        homeStreetId: '',
        homeCommunityId: ''
      },
      lastItem: {
      },
      dialog: {
        reissue: false,
        retrieve: false
      },
      currentReissue: '',
      currentRetrieve: '',
      tableList: [],
      tableListDetail: []
    }
  },

  mounted() {
    this.getGenreList()
    this.getStreetList()
    if (this.homeStreetId) {
      this.getCommunityList(this.homeStreetId)
    } else {
      this.getCommunityList()
    }
    this.getList()
  },

  methods: {
    // 街道列表
    async getStreetList() {
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
    street(val) {
      this.getCommunityList(val)
      this.SearchItem.homeCommunityId = ''
    },
    // 社区列表
    async getCommunityList(val) {
      const that = this
      try {
        let url = this.api.community.findAll + '?page=1&size=1000000'
        let obj = {
          streetId: val
        }
        const response = await this.request.dataGet(that, url, obj)
        that.communityList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },

    getGenreList() {
      const that = this
      let arr = [
        {
          label: 'assessInfoList',
          code: 'pgxx'
        },
        {
          label: 'assessLevelList',
          code: 'pgdj'
        }
      ]
      try {
        let url = this.api.dicManage.findAll + '?page=1&size=1000000'
        arr.forEach(async (item) => {
          let obj = {
            dicId: item.code
          }
          const response = await this.request.dataGet(that, url, obj)
          that[item.label] = response.data.content
        })
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    SearchNoteList() {
      let that = this
      Object.entries(that.SearchItem).map((item, index) => {
        that.lastItem[item[0]] = that.SearchItem[item[0]]
      })
      this.table.paging.currentPage = 1
      this.getList(1)
    },
    // 列表
    async getList(type) {
      if (type) {
        this.$refs.trigger.clearSelections([])
      }
      const that = this
      try {
        let findUrl = this.api.user.findUserSubsidy
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        const response = await this.request.dataGet(that, url, this.lastItem)
        this.$refs.trigger.loading = false
        debugger;
        response.data.content.forEach(item => {
          item.sex = that.getLabelByValue(item.sex, options.gender)
          if (null !== item.assessMoney && item.assessMoney > 0) {
            item.assessMoney = (item.assessMoney / 100).toFixed(2)
          } else {
            item.assessMoney = 0;
          }
          if (item.genreName) {
            let str = ''
            if (-1 === item.genreName.indexOf('[') || -1 === item.genreName.indexOf(']')) {
              item.genreName = item.genreName
            } else {
              let arr = JSON.parse(item.genreName)
              arr.forEach(items => {
                str += items + ','
              })
              item.genreName = str.substr(0, str.length - 1)
            }
          }
          if (item.disabilityName) {
            let str2 = ''
            if (-1 === item.disabilityName.indexOf('[') || -1 === item.disabilityName.indexOf(']')) {
              item.disabilityName = item.disabilityName
            } else {
              let arr2 = JSON.parse(item.disabilityName)
              arr2.forEach(items => {
                str2 += items + ','
              })
              item.disabilityName = str2.substr(0, str2.length - 1)
            }
          }
        })
        that.table.list.data = response.data.content
        that.table.paging.total = response.data.totalElements
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },

    openWindow(row, operation) {
      if (operation === '1') {
        this.currentReissue = {
          'id': row.id,
          'idCard': row.idCard,
          'name': row.name,
          'phone': row.phone,
          'month': '',
          'money': '',
          'remark': '补发'
        }
        this.dialog.reissue = true
      } else {
        this.currentRetrieve = {
          'id': row.id,
          'idCard': row.idCard,
          'name': row.name,
          'phone': row.phone,
          'month': '',
          'money': '',
          'remark': '退款'
        }
        this.dialog.retrieve = true
      }
    },

    onHandleSelectionChange(e) {
      const that = this
      that.tableList = []
      that.tableListDetail = []
      e.forEach(function (data) {
        that.tableList.push(data.id)
        that.tableListDetail.push({
          'id': data.id,
          'disabilityName': data.disabilityName,
        })
      })
    },

    goDeliver() {
      const that = this
      let showAlert = false
      if (that.tableList.length < 1) {
        that.$message.error("至少要选择一个发放养老补贴的对象")
        return
      }
      try {
        that.tableListDetail.forEach(function (data) {
          if (data.disabilityName) {
            showAlert = true
            throw new Error("残疾人")
          }
        })
      } catch (e) {

      }
      if (showAlert) {
        that.$confirm('请确保所选中的残疾人已核对信息，残疾补贴和居家老人补贴不应同享！', '提示', {
          type: 'warning'
        }).then(async () => {
          let url = that.api.userSubsidy.userSubsidy
          let obj = {
            "ids": that.tableList
          }
          const response = await this.request.dataPost(that, url, obj)
          if (response.code === 1) {
            that.$message.success(response.msg)
            that.getList(1)
          } else {
            that.$message.error(response.msg)
          }
        }).catch(() => {
          return
        })
      } else {
        that.deliver()
      }
    },

    deliver() {
      const that = this
      that.$confirm('是否发放?', '提示', {
        type: 'warning'
      }).then(async () => {
        let url = that.api.userSubsidy.userSubsidy
        let obj = {
          "ids": that.tableList
        }
        const response = await this.request.dataPost(that, url, obj)
        if (response.code === 1) {
          that.$message.success(response.msg)
          that.getList(1)
        } else {
          that.$message.error(response.msg)
        }
      }).catch(() => {
        return false
      })
    },

    pageChange(val) {
      this.table.paging.limit = val.limit
      this.table.paging.currentPage = val.page
      this.getList()
    },

    goDetail(row) {
      this.$router.push({
        path: 'subsidyDeliverDetail',
        query: {
          id: row.id,
          type: '2'
        }
      })
    },

    getLabelByValue: function (value, array) {
      var result = value
      array.forEach(function (data) {
        if (data.value === value) {
          result = data.label
        }
      })
      return result
    },
    getNameById: function (value, array) {
      var result = value
      array.forEach(function (data) {
        if (data.id === value) {
          result = data.name
        }
      })
      return result
    },

    closeReissue() {
      this.dialog.reissue = false
    },
    closeRetrieve() {
      this.dialog.retrieve = false
    }
  }
}
</script>

<style lang="scss" scoped>
.items {
  width: 160px;
}
</style>

<style lang="less">
//你的覆盖样式
.dialog .el-dialog .customWidth {
  width: 40%;
  height: 600px;
}
.dialog .el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*height:600px;*/
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}
.dialog .el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
  padding: 0;
}
</style>
