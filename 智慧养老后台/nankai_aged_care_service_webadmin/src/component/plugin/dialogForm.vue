<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="title" :width="width || '30%'" :visible.sync="isShow" :before-close='closeDialog' style="height:100vh;overflow: auto;">
      <slot name="form"></slot>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" v-if="isBtn" @click="save()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    // 模态框头
    title: {
      type: String,
      default: (e) => {
      }
    },
    // 显示模态框
    isShow: {
      type: Boolean,
      default: (e) => {
      }
    },
    // 显示按钮
    isBtn: {
      type: Boolean,
      default: (e) => {
      }
    },
    // 宽度
    width: {
      type: String,
      default: (e) => {
      }
    }
  },
  methods: {
    // 关闭模态框
    closeDialog () {
      this.$emit('closeDialog', '')
    },
    save () {
      this.$emit('saveDialog', '')
    }
  }
}
</script>

<style scoped lang="scss">
</style>
