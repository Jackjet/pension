<template>
  <el-main>
    <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="120px">
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="infoForm.name"  placeholder="请输入菜单名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="父级菜单" prop="parentName">
            <el-input v-model="infoForm.parentName" disabled ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="7">
          <el-form-item label="是否有子级菜单" prop="haveChild">
            <el-select v-model="infoForm.haveChild" placeholder="请选择是否有子集菜单" >
              <el-option label="否" value="0"> </el-option>
              <el-option label="是" value="1"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="7">
          <el-form-item label="菜单所属平台" prop="platform">
            <el-select v-model="infoForm.platform" placeholder="请选择菜单所属平台" >
              <el-option
                v-for="item in platform"
                :key="item.id"
                :label="item.name"
                :value="item.platform">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el' style="text-align: left;">
        <el-col :span="14">
          <el-form-item label="菜单未选中图标" prop="icon">
            <el-input style="display:none;" v-model="infoForm.icon"></el-input>
            <img class="img" v-if="infoForm.icon" :src="ImgUrl" style='width: 64px; height: 64px;'/>
            <div v-if="isShowIcon">
              <el-button type="danger" size="mini" round @click="delImg(1)">删除</el-button>
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
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el' style="text-align: left;">
        <el-col :span="14">
          <el-form-item label="菜单选中图标" prop="icon">
            <el-input style="display:none;" v-model="infoForm.icon"></el-input>
            <img class="img" v-if="infoForm.icon2" :src="ImgUrl2" style='width: 64px; height: 64px;' />
            <div v-if="isShowIcon2">
              <el-button type="danger" size="mini" round @click="delImg(2)">删除</el-button>
            </div>
            <div style="position: relative;" v-if="!disabled">
              <el-upload
                class="upload-demo"
                accept='.jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP'
                :action='fileUrl'
                :headers='header'
                :show-file-list='false'
                :before-upload='handleContentChange'
                :on-success='handleAvatarSuccess2'>
                <el-button size="small" type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
              </el-upload>
            </div>
          </el-form-item>
          <span style='display: block; margin: 0 0 15px 120px; color: red; font-size: 12px;'>注：上传的菜单图标建议大小为60px*60px，不传使用默认图标</span>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="菜单序号" prop="orderNum">
            <el-input v-model.number="infoForm.orderNum"  placeholder="请输入菜单序号"></el-input>
          </el-form-item>
          <span style='display: block; margin: 0 0 15px -146px; color: red; font-size: 12px;'>注：菜单序号是用来对菜单显示顺序进行排序的</span>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="7">
          <el-form-item label="是否外部打开" prop="outOpen">
            <el-select v-model="infoForm.outOpen" placeholder="请选择是否外部打开" @change='open'>
              <el-option label="否" value="0"> </el-option>
              <el-option label="是" value="1"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="页面路径" prop="route">
            <el-input v-model="infoForm.route" :disabled="disabled" placeholder="请输入页面路径"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="24">
          <el-form-item label="描述" prop="remark">
            <el-input type="textarea"  v-model="infoForm.remark" placeholder="请输入描述内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
          <el-col :span="24">
            <el-form-item class="open_btn">
              <el-button type="primary" @click="submitForm('infoForm')">保存</el-button>
              <el-button @click="close">返回</el-button>
            </el-form-item>
          </el-col>
      </el-row>
    </el-form>
    <!-- <el-dialog title="资源库" :visible.sync="dialogIcon" class='el_Dialog open'>
      <UpLoadFile ref="UpLoadFile" :typeAccess='"1"' @formChild='formChild'></UpLoadFile>
    </el-dialog> -->
  </el-main>
</template>

<script>

// import UpLoadFile from 'plugin/UpLoadFile'

export default {
  components: {
    // UpLoadFile
  },

  data () {
    return {
      id: '',
      disabled: false,
      isShowIcon: false,
      isShowIcon2: false,
      platform: [],
      // dialogIcon: false,
      isClear: false,
      ImgUrl: '',
      ImgUrl2: '',
      infoForm: {
        name: '',
        parentName: '',
        parentId: '',
        haveChild: '0',
        platform: '',
        icon: '',
        icon2: '',
        route: '',
        orderNum: '',
        remark: '',
        outOpen: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        parentName: [
          { required: true, message: '', trigger: 'blur' }
        ],
        haveChild: [
          { required: true, message: '请选择是否有子集菜单', trigger: 'change' }
        ],
        platform: [
          { required: true, message: '请选择菜单所属平台', trigger: 'change' }
        ],
        orderNum: [
          { required: true, validator: this.common.isPositiveInteger, trigger: 'blur' }
        ],
        outOpen: [
          { required: true, message: '请选择页面是否外部打开', trigger: 'change' }
        ],
        route: [
          { required: true, validator: this.common.isUrl, trigger: 'blur' }
        ]
      },
      fileUrl: process.env.VUE_APP_URL + this.api.resourceLib.upload,
      header: {
        'Authorization': 'token ' + this.common.session('currentUser').token
      }
    }
  },

  mounted () {
    this.id = this.$route.query.id
    this.infoForm.parentId = this.$route.query.parentId
    if (this.id) {
      this.getData()
    }
    this.getPlatform()
    this.infoForm.parentName = this.$route.query.parentName
  },

  methods: {
    async getData () {
      let that = this
      try {
        let findUrl = that.api.MenuTree.findById
        let parameter = { id: this.id }
        const response = await that.request.dataGet(that, findUrl, parameter)
        if (response.code === 1) {
          that.infoForm = response.data
          if (response.data.icon) {
            that.ImgUrl = process.env.VUE_APP_FILE + response.data.icon
            that.isShowIcon = true
          }
          if (response.data.icon2) {
            that.ImgUrl2 = process.env.VUE_APP_FILE + response.data.icon2
            that.isShowIcon2 = true
          }
          if (response.data.outOpen === '0') {
            that.rules.route = [{ required: true, message: '请输入页面路径', trigger: 'blur' }]
          } else if (response.data.outOpen === '1') {
            that.rules.route = [{ required: true, validator: this.common.isUrl, trigger: 'blur' }]
          }
          return false
        }
        that.$message.error(response.msg)
      } catch (even) {
        console.log(even)
      }
    },
    async getPlatform () {
      let that = this
      try {
        let loginParams = {}
        let url = that.api.MenuTree.findAll
        let response = await that.request.dataGet(that, url, loginParams)
        if (response.code === 1) {
          response.data[0].children.forEach((item) => {
            that.platform.push({
              name: item.name,
              platform: item.platform
            })
          })
        }
      } catch (even) {
        console.log(even)
      }
    },
    handleContentChange (file) {
      let that = this
      let FileSize = file.size / 1024 / 1024 < 500
      let width = 60
      let height = 60
      if (!FileSize) {
        that.$message.error('上传超出文件限制大小')
        return false
      }
      const isSize = new Promise(function (resolve, reject) {
        let img = new Image()
        let _URL = window.URL || window.webkitURL
        img.onload = function () {
          let valid = img.width === width && img.height === height
          valid ? resolve() : reject(new Error('wrong height'))
        }
        img.src = _URL.createObjectURL(file)
      }).then(() => {
        return file
      }, () => {
        that.$message.warning('上传的图标尺寸必须是' + width + '*' + height + '!')
        return Promise.reject(new Error('wrong height'))
      })
      return isSize
      that.isSubmitLoading = true
    },
    handleAvatarSuccess (response, file, fileList) {
      let that = this
      if (response.code === 1) {
        that.ImgUrl = process.env.VUE_APP_FILE + response.data.filePath
        that.infoForm.icon = response.data.filePath
        that.$message.success(response.msg)
        that.isShowIcon = true
        return false
      }
    },
    handleAvatarSuccess2 (response, file, fileList) {
      let that = this
      if (response.code === 1) {
        that.ImgUrl2 = process.env.VUE_APP_FILE + response.data.filePath
        that.infoForm.icon2 = response.data.filePath
        that.$message.success(response.msg)
        that.isShowIcon2 = true
        return false
      }
    },
    delImg (num) {
      if (num === 1) {
        this.ImgUrl = ''
        this.infoForm.icon = ''
        this.isShowIcon = false
      } else {
        this.ImgUrl2 = ''
        this.infoForm.icon2 = ''
        this.isShowIcon2 = false
      }
    },
    open (val) {
      if (val === '0') {
        this.rules.route = [{ required: true, message: '请输入页面路径', trigger: 'blur' }]
        this.$refs['infoForm'].validate()
      } else if (val === '1') {
        this.rules.route = [{ required: true, validator: this.common.isUrl, trigger: 'blur' }]
        this.$refs['infoForm'].validate()
      }
    },
    // 缩略图
    // uploadEd () {
    //   this.dialogIcon = true
    // },
    // formChild (data) {
    //   this.ImgUrl = this.api.rootUrlImg + data
    //   this.infoForm.icon = data
    //   this.$message.success('上传成功')
    //   this.dialogIcon = false
    // },
    submitForm (form) {
      let that = this
      that.$refs[form].validate(async (valid) => {
        if (valid) {
          try {
            let url = that.api.MenuTree.insert
            let obj = {
              name: that.infoForm.name,
              parentId: that.infoForm.parentId,
              haveChild: that.infoForm.haveChild,
              platform: that.infoForm.platform,
              icon: that.infoForm.icon,
              icon2: that.infoForm.icon2,
              route: that.infoForm.route,
              orderNum: that.infoForm.orderNum,
              outOpen: that.infoForm.outOpen,
              remark: that.infoForm.remark,
              type: 'menu'
            }
            let response = null
            if (that.id) {
              url = that.api.MenuTree.update
              obj.id = that.id
              response = await this.request.dataPut(that, url, obj)
            } else {
              response = await this.request.dataPost(that, url, obj)
            }
            if (response.code === 1) {
              that.$message.success(response.msg)
              that.$router.push({
                path: 'systemManager'
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
        path: 'systemManager'
      })
    }
  }
}
</script>

<style>
  .edit_main{
    text-align: left;
  }
  .upload-demo {
    float: left;
  }
  .img{
    width: 220px;
    height: 220px;
  }
</style>
