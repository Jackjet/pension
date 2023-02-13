<template>
  <el-main>
    <template>
      <el-col :span="24" class="warp-main">
        <el-form label-width="120px">
          <el-row class='el-row-el ele-tree ml' v-if="data2.length">
            <div style="text-align: center;margin: 30px 0;">管理系统菜单权限</div>
            <el-tree :data="data2" node-key="id" default-expand-all :expand-on-click-node="false">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.data.name }}</span>
                <span>
                  <el-button type="text" size="mini" @click="() => append(node)">添加</el-button>
                  <el-button v-show="data.id!=='system'" type="text" size="mini" @click="() => edit(node)">编辑</el-button>
                  <el-button v-show="!(data.id==='system' || data.id==='system_systemManagement' || data.id==='system_systemManagement_systemManagement' || data.id==='system_systemManagement_menuManagement' || data.id==='system_systemManagement_userManagement' || data.id==='system_systemManagement_roleManagement')" type="text" size="mini" @click="() => remove(data)">删除</el-button>
                </span>
              </span>
            </el-tree>
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
      data2: []
    }
  },

  mounted () {
    let that = this

    that.allSubmit()
  },

  methods: {
    append (val) {
      document.name = '菜单添加'
      this.$router.push({
        path: 'systemAdd',
        query: {
          parentName: val.data.name,
          parentId: val.data.id
        }
      })
    },
    edit (val) {
      document.name = '菜单编辑'
      this.$router.push({
        path: 'systemAdd',
        query: {
          parentName: val.data.name,
          parentId: val.data.id,
          id: val.data.id
        }
      })
    },
    remove (val) {
      const that = this
      that.$confirm('您确定要删除当前菜单及其下所有子菜单内容么?', '提示',{
        type: 'warning'
      }).then(async () => {
        let url = this.api.MenuTree.deleteById + '?id=' + val.id
        const response = await this.request.dataDelete(that, url, {})
        if (response.code === 1) {
          that.$message.success(response.msg)
          that.allSubmit()
          return false
        }
        that.$message.error(response.msg)
      }).catch(() => {
        return false
      })
    },

    // 获取详细数据
    async allSubmit () {
      let that = this
      try {
        let loginParams = {}
        let url = that.api.MenuTree.findAll
        let response = await that.request.dataGet(that, url, loginParams)
        if (response.code === 1) {
          that.data2 = response.data
        }
      } catch (even) {
        console.log(even)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
