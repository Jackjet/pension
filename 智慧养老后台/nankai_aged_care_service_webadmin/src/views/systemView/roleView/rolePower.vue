<template>
  <el-main>
    <template>
      <el-col :span="24" class="warp-main" v-loading="isSubmitLoading">
        <el-form label-width="120px">
          <el-row class='el-row-el ele-tree ml' v-if="data2.length">
            <div style="text-align: center;margin: 30px 0;">管理系统菜单权限</div>
            <!-- <div style="text-align: left;">
              <el-checkbox :indeterminate="isTreeAll" v-model="checkAllTree" @change="TreeAllChange">全选</el-checkbox>
            </div> -->
            <el-tree
            :data="data2"
            show-checkbox
            @check-change="TreeChange"
            :default-checked-keys="choose"
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps"></el-tree>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item class="el-button-el">
                <el-button type="primary" @click="onPageReturn">返回</el-button>
                <el-button :disabled="isAdmin" type="primary" v-if="id != 'admin'" @click="onSubmit">确定</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </template>
  </el-main>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      choose: [],
      chooseArr: [],
      checkAllTree: false,
      isTreeAll: true,
      isAdmin: false,
      isSubmitLoading: false,
      TreeLength: 0,
      createTimes: ''
    }
  },

  mounted () {
    let that = this
    that.isSubmitLoading = true
    that.id = that.$route.query.id
    that.isAdmin = that.$route.query.name === 'admin'
    that.getList()
  },

  methods: {
    TreeAllChange (val) {
      let that = this
      if (that.checkAllTree) {
        // 全选
        that.$refs.tree.setCheckedNodes(that.data2)
      } else {
        // 取消选中
        that.$refs.tree.setCheckedKeys([])
      }
    },
    TreeChange (data, checked, indeterminate) {
      let that = this
      let nowLength = that.$refs.tree.getCheckedKeys().concat(that.$refs.tree.getHalfCheckedKeys()).length
      if (nowLength === 0) {
        that.checkAllTree = false
        that.isTreeAll = false
      } else if (nowLength === that.TreeLength) {
        that.checkAllTree = true
        that.isTreeAll = false
      } else {
        that.checkAllTree = false
        that.isTreeAll = true
      }
    },
    // 列表
    async getList () {
      const that = this
      try {
        let url = this.api.rolePermission.findAll
        let obj = {
          roleId: this.id
        }
        const response = await this.request.dataGet(that, url, obj)
        if (response.code === 1) {
          that.isSubmitLoading = false
          that.chooseArr = response.data.choose
          if (that.id === 'admin') {
            that.chooseArr = []
            this.getMenu(response.data.menuTree)
          }
          that.data2 = response.data.menuTree
          that.choose = that.chooseArr
          return false
        }
        that.$message.error(response.msg)
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    getMenu (menus) {
      menus.forEach(element => {
        if (element.children) {
          this.getMenu(element.children)
        }
        element.disabled = true
        this.chooseArr.push(element.id)
      })
    },
    async onSubmit () {
      let that = this
      try {
        let url = this.api.rolePermission.insert
        let menuTreeIds = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
        let obj = {
          roleId: that.id,
          menuTreeIds: menuTreeIds
        }
        const response = await this.request.dataPost(that, url, obj)
        if (response.code === 1) {
          that.isSubmitLoading = false
          that.$message.success('分配权限成功')
          that.$router.push({ path: 'roleView' })
          return false
        }
        that.$message.error(response.msg)
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },

    onPageReturn () {
      this.$router.push({ path: 'roleView' })
    }
  }
}
</script>
