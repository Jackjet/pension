<template>
  <el-main>
    <el-col :span="24">
      <template>
        <UpLoadFile :folderId='folderId' :typeAccess='"0"'></UpLoadFile>
      </template>
      <el-row class='bottom'>
        <el-col :span="24">
          <el-button @click="close">返回</el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-main>
</template>

<script>
import UpLoadFile from 'plugin/UpLoadFile'
export default {
  components: {
    UpLoadFile
  },

  data () {
    return {
      folderId: this.common.session('folderId')
    }
  },

  mounted () {
  },

  methods: {
    close () {
      this.common.session('folderId', '')
      this.$router.push({
        path: '/index/fileView'
      })
    }
  }
}
</script>
