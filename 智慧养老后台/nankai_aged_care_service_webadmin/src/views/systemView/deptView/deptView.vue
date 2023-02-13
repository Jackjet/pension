<template>
  <el-main>
    <template>
      <el-col :span="24" class="warp-main" v-loading="isSubmitLoading">
        <el-form ref="infoForm" :model="infoForm" label-width="120px">
          <el-row class='el-row-el ele-tree ml'>
            <el-tree :data="data2" node-key="id" default-expand-all :expand-on-click-node="false">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button type="text" size="mini" @click="() => add(data)">添加</el-button>
                  <el-button type="text" size="mini" @click="() => edit(data)">修改</el-button>
                  <el-button v-show="data.path!=='0000'" type="text" size="mini" @click="() => remove(data)">删除</el-button>
                </span>
              </span>
            </el-tree>
          </el-row>
        </el-form>
      </el-col>
    </template>
    <!-- 添加/编辑 -->
    <dialog-form :isShow="isShow" :isBtn="true" :title="title" @closeDialog="closeDialog" @saveDialog="saveDialog">
      <el-form slot="form" ref="form" :model="form" :rules="rules">
        <el-form-item label="部门名称" prop="name" label-width="108px">
          <el-input
            size="medium"
            autocomplete="off"
            v-model="form.name"
            placeholder="请输入部门名称">
          </el-input>
        </el-form-item>
      </el-form>
    </dialog-form>
  </el-main>
</template>

<script>
import dialogForm from 'plugin/dialogForm'
export default {
  components: {
    dialogForm
  },
  data () {
    return {
      parentId: '',
      id: '',
      title: '',
      isShow: false,
      form: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ]
      },
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      submitText: '组织结构管理',
      isSubmitLoading: false,
      infoForm: {
        title: '',
        content: ''
      },
      flge: false,
      createTimes: ''
    }
  },

  mounted () {
    let that = this
    that.isSubmitLoading = false
    that.getList()
  },

  methods: {
    add (row) {
      this.parentId = row.id
      this.title = '添加部门'
      this.isShow = true
    },
    closeDialog () {
      this.isShow = false
      this.form.name = ''
    },
    // 保存
    async saveDialog () {
      const that = this
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          try {
            let url = that.api.userDepartment.insert
            let obj = {
              name: that.form.name,
              parentId: that.parentId
            }
            let response = null
            if (that.id) {
              url = that.api.userDepartment.update
              obj.id = that.id
              response = await this.request.dataPut(that, url, obj)
            } else {
              response = await this.request.dataPost(that, url, obj)
            }
            if (response.code === 1) {
              that.isShow = false
              that.$message.success(response.msg)
              this.form.name = ''
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
      this.parentId = row.parentId
      try {
        let findUrl = that.api.userDepartment.findById
        let parameter = { id: row.id }
        const response = await that.request.dataGet(that, findUrl, parameter)
        if (response.code === 1) {
          that.title = '编辑部门'
          that.id = row.id
          that.isShow = true
          that.form.name = response.data.name
          return false
        }
        that.$message.error(response.msg)
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    // 列表
    async getList () {
      const that = this
      try {
        let url = this.api.userDepartment.find
        const response = await this.request.dataGet(that, url, {})
        that.isSubmitLoading = false
        that.data2 = response.data
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },

    // 删除
    remove (row) {
      const that = this
      that.$confirm('是否删除?', '提示', {
        type: 'warning'
      }).then(async () => {
        let url = this.api.userDepartment.delete + '?id=' + row.id
        // let parameter = {
        //   id: row.id
        // }
        const response = await this.request.dataDelete(that, url, {})
        if (response.code === 1) {
          that.$message.success(response.msg)
          that.getList()
        } else {
          that.$message.error(response.msg)
        }
      }).catch(() => {
        return false
      })
    }
  }
}
</script>

<style>
  .el-pagination {
    margin: 0px;
    padding: 0px
  }

  .custom-tree-node{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
