<template>
  <el-main>
    <el-col :span="24">
      <el-form :inline="true" class='el-InputForm'>
        <el-form-item style="width: 160px;">
          <el-input clearable
                    size="medium"
                    placeholder="请输入老人姓名"
                    prefix-icon="el-icon-search"
                    v-model="SearchItem.name">
          </el-input>
        </el-form-item>
        <el-form-item style="width: 160px;">
          <el-input clearable
                    size="medium"
                    placeholder="请输入联系电话"
                    prefix-icon="el-icon-search"
                    v-model="SearchItem.phone">
          </el-input>
        </el-form-item>
        <!--<el-form-item style="width: 160px;">-->
          <!--<el-select clearable size="medium" v-model="SearchItem.type" placeholder="请选择老人分类">-->
            <!--<el-option label="普通老人" value="1"></el-option>-->
            <!--<el-option label="居家老人" value="2"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item style="width: 160px;">
          <el-select clearable size="medium" v-model="SearchItem.assessLevel" placeholder="请选择评估等级">
            <el-option
              v-for="item in assessLevel"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 160px;">
          <el-select clearable size="medium" v-model="SearchItem.assessInfo" placeholder="请选择评估信息">
            <el-option
              v-for="item in assessInfo"
              :key="item.id"
              :label="item.name"
              :value="item.name">
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
        <el-form-item style="width: 160px;">
          <el-input clearable
                    size="medium"
                    placeholder="请输入身份证号"
                    prefix-icon="el-icon-search"
                    v-model="SearchItem.idCard">
          </el-input>
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
</template>

<script>
import tableForm from 'plugin/table'

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
      synchronismArr: [],
      assessInfo: [],
      assessLevel: [],
      sex: ['女', '男'],
      table: {
        list: {
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
              label: '评估信息',
              field: 'assessInfo'
            },
            {
              label: '评估等级',
              field: 'assessLevel'
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

          data: [],
          operation: {
            label: '操作',
            event: [
              {
                label: '详情',
                icon: 'el-icon-document',
                method: (row) => {
                  this.$router.push({
                    path: 'assessAdd',
                    query: {
                      id: row.id,
                      type: '2'
                    }
                  })
                }
              }]
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
        type: '2',
        assessInfo: '',
        assessLevel: '',
        phone: '',
        idCard: '',
        homeStreetId: '',
        homeCommunityId: ''
      },
      lastItem: {
        name: '',
        type: '2',
        assessInfo: '',
        assessLevel: '',
        idCard: '',
        phone: '',
        homeStreetId: '',
        homeCommunityId: ''
      }
    }
  },

  created () {

  },

  mounted () {
    let that = this
    that.isSubmitLoading = true
    that.getList()
    that.getStreetList()
    if (that.homeStreetId) {
      that.getCommunityList(that.homeStreetId)
    } else {
      that.getCommunityList()
    }
    that.getAssessInfo()
    that.getAssessLevel()
  },

  methods: {
    async getAssessLevel () {
      const that = this
      try {
        let url = this.api.dicManage.findAll + '?page=1&size=1000000&dicId=pgdj'
        let obj = {}
        const response = await this.request.dataGet(that, url, obj)
        that.assessLevel = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    async getAssessInfo () {
      const that = this
      try {
        let url = this.api.dicManage.findAll + '?page=1&size=1000000&dicId=pgxx'
        let obj = {}
        const response = await this.request.dataGet(that, url, obj)
        that.assessInfo = response.data.content
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
    street (val) {
      this.getCommunityList(val)
      this.SearchItem.homeCommunityId = ''
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
    async getList () {
      const that = this
      try {
        let findUrl = this.api.user.findAll
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        let obj = that.SearchItem
        const response = await this.request.dataGet(that, url, obj)
        this.$refs.trigger.loading = false
        response.data.content.forEach(function (item, index) {
          if (item.sex) {
            item.sex = that.sex[item.sex]
          }
          if (item.type === '1') {
            item.type = '普通老人'
          } else if (item.type === '2') {
            item.type = '居家老人'
          }
          item.genreName = JSON.parse(item.genreName)
          if (item.genreName.length !== 0) {
            if (item.genreName.length === 1) {
              item.genreName = item.genreName[0]
            } else {
              item.genreName = item.genreName.join(',')
            }
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
    }
  }
}
</script>

<style lang="scss">
.flex{
  display: flex;
  padding-left: 4%;
  div{
    margin-right: 10%;
    font-size: 14px;
  }
  span{
    color: #85A7F0;
  }
}
</style>
