<template>
  <el-main class="serviceColumn">
    <el-col :span="24">
      <el-form :inline="true" class='el-InputForm'>
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
      <el-form slot="form" ref="form" :model="form" :rules="rules" label-width="108px">
        <el-form-item label="服务栏目" prop="name">
          <el-input
            size="medium"
            autocomplete="off"
            v-model="form.name"
            placeholder="请输入服务栏目">
          </el-input>
        </el-form-item>
        <el-row class='el-row-el' style="text-align: left;">
          <el-col :span="14">
            <el-form-item label="图片" prop="icon">
              <el-input autocomplete="off" v-model="form.icon" style="display:none;"></el-input>
                <el-image
                  v-if="form.icon"
                  style="width: 100px; height: 100px"
                  :src="ImgUrl"
                  :preview-src-list="[ImgUrl]">
                </el-image>
                <div style="position: relative;">
                  <el-upload
                    class="upload-demo"
                    accept='.jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP'
                    :action='fileUrl'
                    :headers='header'
                    :show-file-list='false'
                    :before-upload='iconChange'
                    :on-success='iconSuccess'>
                    <el-button size="small" type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                  </el-upload>
                </div>
            </el-form-item>
          </el-col>
        </el-row>
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
      ImgUrl: '',
      form: {
        name: '',
        icon: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入服务栏目', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请上传图片', trigger: ['blur', 'change'] }
        ]
      },
      fileUrl: process.env.VUE_APP_URL + this.api.resourceLib.upload,
      header: {
        'Authorization': 'token ' + this.common.session('currentUser').token
      },
      table: {
        list: {
          header: [
            {
              label: '服务栏目',
              field: 'name'
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
                  this.edit(row)
                }
              },
              {
                label: '删除',
                icon: 'el-icon-delete',
                method: (row) => {
                  this.delete(row)
                }
              },
              {
                label: '管理类别',
                icon: 'el-icon-setting',
                method: (row) => {
                  this.$router.push({
                    path: '/index/serviceClass',
                    query: {
                      serviceType1Id: row.id
                    }
                  })
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
      }
    }
  },

  mounted () {
    this.getList()
  },

  methods: {
    add () {
      this.title = '添加服务栏目'
      this.isShow = true
    },
    closeDialog () {
      this.isShow = false
      this.id = ''
      this.ImgUrl = ''
      this.$refs['form'].resetFields()
      this.form.name = ''
      this.form.icon = ''
    },
    // 保存
    saveDialog () {
      const that = this
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          try {
            let url = that.api.serviceType1.insert
            let obj = {
              name: that.form.name,
              icon: that.form.icon
            }
            let response = null
            if (that.id) {
              url = that.api.serviceType1.update
              obj.id = that.id
              response = await this.request.dataPut(that, url, obj)
            } else {
              response = await this.request.dataPost(that, url, obj)
            }
            if (response.code === 1) {
              that.isShow = false
              that.$refs['form'].resetFields()
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
        let findUrl = that.api.serviceType1.findById
        let parameter = { id: row.id }
        const response = await that.request.dataGet(that, findUrl, parameter)
        if (response.code === 1) {
          that.title = '编辑服务栏目'
          that.id = row.id
          that.isShow = true
          that.ImgUrl = process.env.VUE_APP_FILE + response.data.icon
          that.form.icon = response.data.icon
          that.form.name = response.data.name
          return false
        }
        that.$message.error(response.msg)
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    iconChange (file) {
      let that = this
      let FileSize = file.size / 1024 / 1024 < 500
      if (!FileSize) {
        that.$message.error('上传超出文件限制大小')
        return false
      }
      this.isSubmitLoading = true
    },
    iconSuccess (response, file, fileList) {
      let that = this
      if (response.code === 1) {
        that.ImgUrl = response.data.fileLongPath
        that.form.icon = response.data.filePath
        that.$message.success(response.msg)
        return false
      }
    },
    // 列表
    async getList () {
      const that = this
      try {
        let findUrl = this.api.serviceType1.findAll
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        let obj = {}
        const response = await this.request.dataGet(that, url, obj)
        this.$refs.trigger.loading = false
        that.table.list.data = response.data.content
        that.table.paging.total = response.data.totalElements
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },

    // 删除
    delete (row) {
      const that = this
      that.$confirm('您确定要删除么?', '提示', {
        type: 'warning'
      }).then(async () => {
        let url = this.api.serviceType1.deleteById + '?id=' + row.id
        const response = await this.request.dataDelete(that, url, {})
        if (response.code === 1) {
          that.$message.success(response.msg)
          that.getList()
          return false
        }
        that.$message.error(response.msg)
      }).catch((response) => {
        that.$message.error(response.msg)
      })
    },

    pageChange (val) {
      this.table.paging.limit = val.limit
      this.table.paging.currentPage = val.page
      this.getList()
    }
  }
}
</script>

<style>
  .serviceColumn .upload-demo {
    float: left;
  }
</style>
