<template>
  <el-main>
    <el-col :span="24">
      <el-form :inline="true" class='el-InputForm'>
        <el-form-item>
          <el-select clearable size="medium" v-model="SearchItem.streetId" placeholder="请选择所属街道" @change="street">
            <el-option
              v-for="item in streetList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select clearable size="medium" v-model="SearchItem.id" placeholder="请选择社区名称">
            <el-option
              v-for="item in communityList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size='medium' icon="el-icon-search" @click="SearchNoteList">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size='medium' icon="el-icon-plus" @click="add">添加</el-button>
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
    <!-- 添加/编辑 -->
    <dialog-form :isShow="isShow" :isBtn="true" :title="title" @closeDialog="closeDialog" @saveDialog="saveDialog">
      <el-form slot="form" ref="form" :model="form" :rules="rules">
        <el-form-item label="所属街道" prop="streetId" label-width="108px" style="text-align:left">
          <el-select v-model="form.streetId" :disabled="id ? true : false" placeholder="请选择所属街道">
            <el-option
              v-for="item in streetList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="社区名称" prop="name" label-width="108px">
          <el-input
            size="medium"
            autocomplete="off"
            v-model="form.name"
            placeholder="请输入社区名称">
          </el-input>
        </el-form-item>
<!--        <el-form-item label="管理员" prop="linkName" label-width="108px">-->
<!--          <el-input-->
<!--            size="medium"-->
<!--            autocomplete="off"-->
<!--            v-model="form.linkName"-->
<!--            placeholder="请输入管理员">-->
<!--          </el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="联系电话" prop="linkPhone" label-width="108px">-->
<!--          <el-input-->
<!--            size="medium"-->
<!--            autocomplete="off"-->
<!--            v-model="form.linkPhone"-->
<!--            placeholder="请输入联系电话">-->
<!--          </el-input>-->
<!--        </el-form-item>-->
      </el-form>
    </dialog-form>
  </el-main>
</template>

<script>
import tableForm from 'plugin/table'
import dialogForm from 'plugin/dialogForm'

export default {
  components: {
    tableForm,
    dialogForm
  },

  data () {
    return {
      id: '',
      title: '',
      isShow: false,
      streetList: [],
      communityList: [],
      form: {
        streetId: '',
        name: '',
        linkName: '',
        linkPhone: ''
      },
      rules: {
        streetId: [
          { required: true, message: '请选择所属街道', trigger: ['blur', 'change'] }
        ],
        name: [
          { required: true, message: '请输入社区名称', trigger: ['blur', 'change'] }
        ],
        linkName: [
          { required: true, message: '请输入管理员', trigger: ['blur', 'change'] }
        ],
        linkPhone: [
          { required: true, validator: this.common.isvalidPhone, trigger: ['blur', 'change'] }
        ]
      },
      table: {
        list: {
          header: [
            {
              label: '所属街道',
              field: 'streetName'
            },
            {
              label: '社区名称',
              field: 'name'
            },
            // {
            //   label: '管理员',
            //   field: 'linkName'
            // },
            // {
            //   label: '联系电话',
            //   field: 'linkPhone'
            // },
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
                  this.edit(row)
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
        streetId: '',
        id: ''
      },
      lastItem: {
        streetId: '',
        id: ''
      }
    }
  },

  mounted () {
    this.getList()
    this.getStreetList()
    this.getCommunityList()
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
      this.communityList = []
      this.SearchItem.id = ''
      this.getCommunityList(val)
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
    add () {
      this.title = '添加社区'
      this.isShow = true
    },
    closeDialog () {
      this.isShow = false
      this.$refs['form'].resetFields()
      this.form = {
        streetId: '',
        name: '',
        linkName: '',
        linkPhone: ''
      }
      this.id = ''
    },
    // 保存
    saveDialog () {
      const that = this
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          try {
            let url = that.api.community.insert
            let obj = {
              streetId: that.form.streetId,
              name: that.form.name,
              linkName: that.form.linkName,
              linkPhone: that.form.linkPhone
            }
            let response = null
            if (that.id) {
              url = that.api.community.update
              obj.id = that.id
              response = await this.request.dataPut(that, url, obj)
            } else {
              response = await this.request.dataPost(that, url, obj)
            }
            if (response.code === 1) {
              that.isShow = false
              that.$message.success(response.msg)
              that.closeDialog()
              that.getList()
              return false
            }
            that.$message.error(response.msg)
          } catch (even) {
            that.$message.error('数据获取失败')
          }
        }
      })
    },
    // 编辑
    async edit (row) {
      const that = this
      try {
        let findUrl = that.api.community.findById
        let parameter = { id: row.id }
        const response = await that.request.dataGet(that, findUrl, parameter)
        if (response.code === 1) {
          that.title = '编辑社区'
          that.id = row.id
          that.isShow = true
          that.form = response.data
          return false
        }
        that.$message.error(response.msg)
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
    async getList () {
      const that = this
      try {
        let findUrl = this.api.community.findAll
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        let obj = {
          streetId: this.SearchItem.streetId,
          id: this.SearchItem.id
        }
        const response = await this.request.dataGet(that, url, obj)
        this.$refs.trigger.loading = false
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
