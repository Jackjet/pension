<template>
  <div>
    <el-main>
      <el-col :span="24">
        <el-form :inline="true" class='el-InputForm'>
          <el-form-item class="items">
            <el-input clearable
                      size="medium"
                      placeholder="请输入老人姓名"
                      prefix-icon="el-icon-search"
                      v-model="SearchItem.name">
            </el-input>
          </el-form-item>
          <el-form-item class="items">
            <el-input clearable
                      size="medium"
                      placeholder="请输入身份证号"
                      prefix-icon="el-icon-search"
                      v-model="SearchItem.idCard">
            </el-input>
          </el-form-item>
          <el-form-item class="items">
            <el-input clearable
                      size="medium"
                      placeholder="请输入联系电话"
                      prefix-icon="el-icon-search"
                      v-model="SearchItem.phone">
            </el-input>
          </el-form-item>
          <el-form-item style="width: 160px;">
            <el-select clearable size="medium" v-model="SearchItem.assessLevelId" placeholder="请选择评估等级">
              <el-option
                v-for="item in assessLevelList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width: 160px;">
            <el-select clearable size="medium" v-model="SearchItem.assessInfoId" placeholder="请选择评估信息">
              <el-option
                v-for="item in assessInfoList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width: 160px;">
            <el-select clearable size="medium" v-model="SearchItem.optType" placeholder="操作方式">
              <el-option
                v-for="item in optTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if='(homeStreetId || homeCommunityId) ? false : true'>
            <el-select clearable size="medium" v-model="SearchItem.homeStreetId" placeholder="请选择所属街道" @change='street'>
              <el-option
                v-for="item in streetList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if='homeCommunityId ? false : true'>
            <el-select clearable size="medium" v-model="SearchItem.homeCommunityId" placeholder="请选择所属社区">
              <el-option
                v-for="item in communityList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="items">
            <el-date-picker
              style="width: 160px;"
              size="medium"
              v-model="SearchItem.month"
              type="month"
              :clearable="true"
              value-format="yyyy-MM"
              placeholder="选择月份">
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size='medium' icon="el-icon-search" @click="SearchNoteList">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <!-- 表格 -->
        <tableForm
          ref="trigger"
          :table-form='table'
          @getList='getList'
          @pageChange='pageChange'>
        </tableForm>
      </el-col>
    </el-main>
  </div>
</template>

<script>
import tableForm from 'plugin/table'
import options from '../../../assets/js/options'

export default {
  components: {
    tableForm
  },

  data () {
    return {
      homeStreetId: this.common.session('currentUser').streetId,
      homeCommunityId: this.common.session('currentUser').communityId,
      streetList: [],
      communityList: [],
      assessLevelList: [],
      genreList: [],
      assessInfoList: [],
      optTypeList: [{
        label: '发放',
        value: '0'
      }, {
        label: '补发',
        value: '1'
      }, {
        label: '退款',
        value: '2'
      }],
      table: {
        list: {
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
              field: 'sex'
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
              label: '评估等级',
              field: 'assessLevel'
            },
            {
              label: '评估信息',
              field: 'assessInfo'
            },
            {
              label: '身份证号',
              field: 'idCard'
            },
            {
              label: '操作方式',
              field: 'optType'
            },
            {
              label: '操作月份',
              field: 'month'
            },
            {
              label: '操作金额（单位：元）',
              field: 'assessMoney'
            },
            {
              label: '发放时间',
              field: 'createTime'
            },
            {
              label: '操作人',
              field: 'createByName'
            },
            {
              label: '备注',
              field: 'remark'
            }
          ],

          data: [],

          operation: {
            label: '操作',
            event: [
              {
                label: '详情',
                icon: 'el-icon-document',
                method: (row) => {
                  this.goDetail(row)
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
        homeCommunityId: '',
        month: '',
        optType: ''
      },
      lastItem: {
      }
    }
  },

  mounted () {
    let now = new Date()
    let yearNow = now.getFullYear()
    let monthNow = now.getMonth() + 1
    if (monthNow < 10) {
      monthNow = '0' + monthNow
    }
    this.lastItem.month = yearNow + '-' + monthNow
    this.SearchItem.month = yearNow + '-' + monthNow
    this.getGenreList()
    this.getList()
    this.getStreetList()
    if (this.homeStreetId) {
      this.getCommunityList(this.homeStreetId)
    } else {
      this.getCommunityList()
    }
  },

  methods: {
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
    street (val) {
      this.getCommunityList(val)
      this.SearchItem.homeCommunityId = ''
    },
    // 社区列表
    async getCommunityList (val) {
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

    getGenreList () {
      const that = this
      let arr = [
        {
          label: 'genreList',
          code: 'lrlx'
        },
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
    SearchNoteList () {
      let that = this
      Object.entries(that.SearchItem).map((item, index) => {
        that.lastItem[item[0]] = that.SearchItem[item[0]]
      })
      this.table.paging.currentPage = 1
      this.getList()
    },
    // 列表
    async   getList () {
      const that = this
      try {
        let findUrl = this.api.userSubsidy.findAll
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        let obj = {
          'name': this.lastItem.name,
          'idCard': this.lastItem.idCard,
          'phone': this.lastItem.phone,
          'assessLevelId': this.lastItem.assessLevelId,
          'assessInfoId': this.lastItem.assessInfoId,
          'homeStreetId': this.lastItem.homeStreetId,
          'homeCommunityId': this.lastItem.homeCommunityId,
          'month': this.lastItem.month,
          'optType': this.lastItem.optType
        }
        if (obj.month) {
          obj.month = obj.month + '-01 00:00:00'
        }
        const response = await this.request.dataGet(that, url, obj)
        this.$refs.trigger.loading = false
        response.data.content.forEach(item => {
          item.sex = that.getLabelByValue(item.sex, options.gender)
          item.optType = that.getLabelByValue(item.optType, that.optTypeList)
          item.assessMoney = (item.assessMoney / 100).toFixed(2)
          item.month = item.month.substring(0, 7)
          if (item.genreName) {
            let str = ''
            let arr = JSON.parse(item.genreName)
            arr.forEach(items => {
              str += items + ','
            })
            item.genreName = str.substr(0, str.length - 1)
          }
        })
        that.table.list.data = response.data.content
        that.table.paging.total = response.data.totalElements
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },

    pageChange (val) {
      this.table.paging.limit = val.limit
      this.table.paging.currentPage = val.page
      this.getList()
    },

    goDetail (row) {
      this.$router.push({
        path: 'subsidyRecordDetail',
        query: {
          id: row.id,
          type: '2'
        }
      })
    },

    getLabelByValue: function (value, array) {
      var result = ''
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
    }

  }
}
</script>

<style lang="scss" scoped>
.items{
  width: 160px;
}
</style>
