<template>
  <el-main class="activityAdd">
    <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="120px">
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="infoForm.name" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="活动时间" prop="valueTime">
            <el-input v-model="infoForm.valueTime" style="display:none;"></el-input>
            <el-date-picker
              style="width:100%;"
              :disabled="disabled"
              v-model="value6"
              @change="dateChangebirthday1"
              type="datetimerange"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="联系人" prop="linkName">
            <el-input v-model="infoForm.linkName" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="联系电话" prop="linkPhone">
            <el-input v-model="infoForm.linkPhone" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="主办单位" prop="organizer">
            <el-input v-model="infoForm.organizer" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="承办单位" prop="undertake">
            <el-input v-model="infoForm.undertake" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el' style="text-align: left;">
        <el-col :span="14">
          <el-form-item label="活动主图" prop="icon">
            <el-input style="display:none;" v-model="infoForm.icon"></el-input>
            <el-image
              v-if="infoForm.icon"
              style="width: 220px; height: 220px"
              :src="ImgUrl"
              :preview-src-list="[ImgUrl]">
            </el-image>
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
          <el-form-item label="选择分类" prop="typeId">
            <el-select style="width: 100%;" v-model="infoForm.typeId" :disabled="disabled" placeholder="请选择分类">
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="24">
          <el-form-item label="活动具体地址" prop="address">
            <el-input type="textarea" :disabled="disabled" v-model="infoForm.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="24">
          <el-form-item label="活动内容">
            <div class="edit_container">
              <div class="edit_container">
                <div class='edit_main' v-html='infoForm.message' v-if="disabled"></div>
                <wangEditor :isClear='isClear' ref="ChildData" v-if="!disabled"></wangEditor>
              </div>
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
      value6: '',
      disabled: false,
      type: '',
      dialogIcon: false,
      isClear: false,
      typeList: [],
      ImgUrl: '',
      infoForm: {
        name: '',
        linkName: '',
        linkPhone: '',
        organizer: '',
        undertake: '',
        valueTime: '',
        icon: '',
        typeId: '',
        address: '',
        message: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        valueTime: [
          { required: true, message: '请选择活动时间', trigger: 'blur' }
        ],
        linkName: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        linkPhone: [
          { required: true, validator: this.common.isvalidPhone, trigger: ['blur'] }
        ],
        organizer: [
          { required: true, message: '请输入主办单位', trigger: 'blur' }
        ],
        undertake: [
          { required: true, message: '请输入承办单位', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请输上传活动主图', trigger: ['blur', 'change'] }
        ],
        typeId: [
          { required: true, message: '请选择活动分类', trigger: ['blur', 'change'] }
        ],
        address: [
          { required: true, message: '请输入活动具体地址', trigger: 'blur' }
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
    this.getGenreList()
    if (this.id) {
      this.getList()
    }
    if (this.type === '2') {
      this.disabled = true
    }
  },

  methods: {
    dateChangebirthday1 (val) {
      this.infoForm.valueTime = val
    },
    async getGenreList () {
      const that = this
      try {
        let url = this.api.dicManage.findAll + '?page=1&size=1000000'
        let obj = {
          dicId: 'hdfl'
        }
        const response = await this.request.dataGet(that, url, obj)
        that.typeList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    async getList () {
      let that = this
      try {
        let findUrl = that.api.activity.findById
        let parameter = { id: this.id }
        const response = await that.request.dataGet(that, findUrl, parameter)
        if (response.code === 1) {
          that.infoForm = response.data
          that.value6 = [response.data.startTime, response.data.endTime]
          this.infoForm.valueTime = [response.data.startTime, response.data.endTime]
          that.ImgUrl = process.env.VUE_APP_FILE + response.data.icon
          if (this.type === '1') {
            that.$refs.ChildData.setContent(response.data.message)
          }
          return false
        }
        that.$message.error(response.msg)
      } catch (even) {
        console.log(even)
        that.$message.error('数据获取失败')
      }
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
    // 缩略图
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
            let url = that.api.activity.insert
            let Conetne = that.$refs.ChildData.htmlContent()
            let typeName = ''
            that.typeList.forEach(item => {
              if (item.id === that.infoForm.typeId) {
                typeName = item.name
              }
            })
            let obj = {
              name: that.infoForm.name,
              linkName: that.infoForm.linkName,
              linkPhone: that.infoForm.linkPhone,
              organizer: that.infoForm.organizer,
              undertake: that.infoForm.undertake,
              startTime: that.infoForm.valueTime[0],
              endTime: that.infoForm.valueTime[1],
              icon: that.infoForm.icon,
              typeId: that.infoForm.typeId,
              typeName: typeName,
              address: that.infoForm.address,
              message: Conetne.html
            }
            let response = null
            if (that.id) {
              url = that.api.activity.update
              obj.id = that.id
              response = await this.request.dataPut(that, url, obj)
            } else {
              response = await this.request.dataPost(that, url, obj)
            }
            if (response.code === 1) {
              that.$message.success(response.msg)
              that.$router.push({
                path: 'activityView'
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
        path: 'activityView'
      })
    }
  }
}
</script>

<style>
  .activityAdd .edit_main{
    text-align: left;
  }
  .activityAdd .upload-demo {
    float: left;
  }
</style>
