<template>
  <el-main>
    <el-col :span="24">
      <el-form :inline="true" class='el-InputForm'>
        <el-form-item>
          <el-select clearable size="medium" v-model="SearchItem.id" placeholder="请选择街道名称">
            <el-option
              v-for="item in streetList"
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
        <el-form-item label="街道名称" prop="name" label-width="108px">
          <el-input
            size="medium"
            autocomplete="off"
            v-model="form.name"
            placeholder="请输入街道名称">
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
      form: {
        name: '',
        linkName: '',
        linkPhone: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入街道名称', trigger: 'blur' }
        ],
        linkName: [
          { required: true, message: '请输入管理员', trigger: 'blur' }
        ],
        linkPhone: [
          { required: true, validator: this.common.isvalidPhone, trigger: ['blur'] }
        ]
      },
      table: {
        list: {
          header: [
            {
              label: '街道名称',
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
        id: ''
      },
      lastItem: {
        id: ''
      }
    }
  },

  mounted () {
    this.getList()
    this.getStreetList()
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
    add () {
      this.title = '添加街道'
      this.isShow = true
    },
    closeDialog () {
      this.isShow = false
      this.$refs['form'].resetFields()
      this.form = {
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
            let url = that.api.street.insert
            let obj = {
              name: that.form.name,
              linkName: that.form.linkName,
              linkPhone: that.form.linkPhone
            }
            let response = null
            if (that.id) {
              url = that.api.street.update
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
        let findUrl = that.api.street.findById
        let parameter = { id: row.id }
        const response = await that.request.dataGet(that, findUrl, parameter)
        if (response.code === 1) {
          that.title = '编辑街道'
          that.id = row.id
          that.isShow = true
          that.form = response.data
          // this.rules.linkName = { required: false }
          // this.rules.linkPhone = { required: false }
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
        let findUrl = this.api.street.findAll
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        let obj = {
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
