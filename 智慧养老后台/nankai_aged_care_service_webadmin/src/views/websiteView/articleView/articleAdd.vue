<template>
  <el-main class="articleAdd">
    <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="120px">
      <el-row class='el-row-el' v-if="isId == '1'">
        <el-col :span="14">
          <el-form-item label="文章id" prop="id">
            <el-input v-model="infoForm.id" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="标题" prop="title">
            <el-input v-model="infoForm.title" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="作者">
            <el-input v-model="infoForm.author" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="来源名称">
            <el-input v-model="infoForm.srcName" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="来源路径">
            <el-input v-model="infoForm.srcUrl" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el' style="text-align: left;">
        <el-col :span="14">
          <el-form-item label="缩略图">
            <div v-if="infoForm.icon">
              <el-image
                style="width: 220px; height: 220px"
                :src="ImgUrl"
                :preview-src-list="[ImgUrl]">
              </el-image>
              <el-row style="text-align: center;z-index: 1; width:220px;" v-if="!disabled">
                <el-button type="danger" size="mini" round @click="deleteImg">删除</el-button>
              </el-row>
            </div>
            <div style="position: relative;" v-if="!disabled">
              <el-upload
                class="upload-demo"
                accept='.jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP'
                :action='fileUrl'
                :headers='header'
                :show-file-list='false'
                :before-upload='handleContentChange'
                :on-success='handleAvatarSuccess'>
                <el-button size="small" type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
              </el-upload>
              <el-button
                type="primary"
                size="small"
                style="margin-left: 30px;float: left;margin-top: 5px;"
                @click="uploadEd">
                从资源库上传<i class="el-icon-upload el-icon--right"></i>
              </el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="文章摘要">
            <el-input type="textarea" v-model="infoForm.digest" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="24">
          <el-form-item label="网页内容">
            <div class="edit_container">
              <div class='wangEditor' v-html='infoForm.messageWeb' v-if="disabled" style="text-align:left;"></div>
              <wangEditor :isClear='isClear' ref="ChildData" v-if="!disabled"></wangEditor>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
          <el-col :span="24">
            <el-form-item class="open_btn">
              <el-button type="primary" @click="submitForm('infoForm')" v-if="!disabled">保存</el-button>
              <el-button @click="close">返回</el-button>
            </el-form-item>
          </el-col>
      </el-row>
    </el-form>
    <el-dialog title="资源库" :visible.sync="dialogIcon" class='el_Dialog open' style="height:100vh;overflow: auto;">
      <UpLoadFile ref="UpLoadFile" :typeAccess='"1"' @formChild='formChild'></UpLoadFile>
    </el-dialog>
  </el-main>
</template>

<script>
import wangEditor from 'plugin/wangEditor'
import UpLoadFile from 'plugin/UpLoadFile'

export default {
  components: {
    wangEditor,
    UpLoadFile
  },

  data () {
    return {
      id: '',
      isId: '',
      disabled: false,
      type: '',
      dialogIcon: false,
      isClear: false,
      ImgUrl: '',
      infoForm: {
        id: '',
        title: '',
        author: '',
        srcName: '',
        srcUrl: '',
        icon: '',
        digest: '',
        messageWeb: ''
      },
      rules: {
        id: [
          { required: true, message: '请输入文章id', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入作者', trigger: 'blur' }
        ],
        srcName: [
          { required: true, message: '请输入来源名称', trigger: 'blur' }
        ],
        srcUrl: [
          { required: true, message: '请输入来源路径', trigger: 'blur' }
        ]
      },
      fileUrl: process.env.VUE_APP_URL + this.api.resourceLib.upload,
      header: {
        'Authorization': 'token ' + this.common.session('currentUser').token
      }
    }
  },

  mounted () {
    this.type = this.$route.query.type
    this.id = this.$route.query.id
    this.infoForm.id = this.common.session('categoryId')
    this.getCategory()
    if (this.id) {
      this.getList()
    }
    if (this.type === '2') {
      this.disabled = true
    }
  },

  methods: {
    async getCategory () {
      let that = this
      let findUrl = that.api.category.findById
      let parameter = { id: this.infoForm.id }
      const response = await that.request.dataGet(that, findUrl, parameter)
      this.isId = response.data.isId
    },
    async getList () {
      let that = this
      let findUrl = that.api.art.findById
      let parameter = { id: this.id }
      const response = await that.request.dataGet(that, findUrl, parameter)
      if (response.code === 1) {
        that.infoForm = response.data
        that.ImgUrl = response.data.iconAbsolutePath
        if (this.type === '1') {
          that.$refs.ChildData.setContent(response.data.messageWeb)
        }
        return false
      }
      that.$message.error(response.msg)
    },
    handleContentChange (file) {
      let that = this
      let FileSize = file.size / 1024 / 1024 < 500
      if (!FileSize) {
        that.$message.error('上传超出文件限制大小')
        return false
      }
      this.isSubmitLoading = true
    },
    handleAvatarSuccess (response, file, fileList) {
      let that = this
      if (response.code === 1) {
        that.ImgUrl = response.data.fileLongPath
        that.infoForm.icon = response.data.filePath
        that.$message.success(response.msg)
        return false
      }
    },
    // 删除照片
    deleteImg () {
      this.infoForm.icon = ''
      this.ImgUrl = ''
    },
    // 缩略图
    uploadEd () {
      this.dialogIcon = true
    },
    formChild (data) {
      this.ImgUrl = process.env.VUE_APP_FILE + data
      this.infoForm.icon = data
      this.$message.success('上传成功')
      this.dialogIcon = false
    },
    submitForm (form) {
      let that = this
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          try {
            let url = that.api.art.insert
            let Conetne = that.$refs.ChildData.htmlContent()
            let obj = {
              categoryId: this.common.session('categoryId'),
              title: that.infoForm.title,
              author: that.infoForm.author,
              digest: that.infoForm.digest,
              icon: that.infoForm.icon,
              messageWeb: Conetne.html,
              srcName: that.infoForm.srcName,
              srcUrl: that.infoForm.srcUrl
            }
            let response = null
            if (that.id) {
              url = that.api.art.update
              obj.id = that.id
              obj.newId = that.infoForm.id
              response = await this.request.dataPut(that, url, obj)
            } else {
              if (this.isId === '1') {
                obj.id = that.infoForm.id
              }
              response = await this.request.dataPost(that, url, obj)
            }
            if (response.code === 1) {
              that.$message.success(response.msg)
              that.$router.push({
                path: 'articleView',
                query: {
                  id: this.common.session('categoryId'),
                  name: this.common.session('categoryName')
                }
              })
              return false
            }
            that.$message.error(response.msg)
          } catch (even) {
            that.$message.error('数据获取失败')
          }
        }
      })
    },
    close (val) {
      this.$router.push({
        path: 'articleView',
        query: {
          id: this.common.session('categoryId'),
          name: this.common.session('categoryName')
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .articleAdd .upload-demo {
    float: left;
  }
  .wangEditor{
    /* table 样式 */
    table {
      border-top: 1px solid #ccc;
      border-left: 1px solid #ccc;
    }
    table td,
    table th {
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      padding: 3px 5px;
    }
    table th {
      border-bottom: 2px solid #ccc;
      text-align: center;
    }

    /* blockquote 样式 */
    blockquote {
      display: block;
      border-left: 8px solid #d0e5f2;
      padding: 5px 10px;
      margin: 10px 0;
      line-height: 1.4;
      font-size: 100%;
      background-color: #f1f1f1;
    }

    /* code 样式 */
    code {
      display: inline-block;
      *display: inline;
      *zoom: 1;
      background-color: #f1f1f1;
      border-radius: 3px;
      padding: 3px 5px;
      margin: 0 3px;
    }
    pre code {
      display: block;
    }

    /* ul ol 样式 */
    ul, ol {
      margin: 10px 0 10px 20px;
    }
  }
</style>
