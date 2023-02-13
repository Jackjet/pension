<template>
  <el-main>
      <div class="hander">3.居家养老申请提交材料</div>
      <el-col :span="24" class="ta-l">
        <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="180px">
          <!-- 上传图片区 -->
          <el-row class='el-row-el' style="text-align: left;" v-for="(item, index) in uploudFormArr" :key="index">
            <el-col :span="24">
              <el-form-item :label="item.label" v-show="item.isOwnFlag">
                <!-- 图片展示 -->
                <div class="flex">
                  <div v-for="(items, i) in item.iconArr" :key="i" style="float: left; margin-right:10px;">
                    <img class="img" v-if="items.icon" :src="items.iconAll" />
                    <el-row style="text-align: center;z-index: 1;">
                      <el-button type="danger" size="mini" round @click="deleteImg(i)">删除</el-button>
                    </el-row>
                  </div>
                </div>
                <div style="position: relative;">
                  <!-- 6.本人银行流水凭证 -->
                  <el-form-item style="text-align:left;float: left;margin-right: 10px;" v-if="item.id == 5">
                    <el-select style="width: 100%;" v-model="infoForm.userHome.bank" :disabled="id ? true : false" placeholder="请选择救助类别">
                      <el-option
                        v-for="item in bankList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.label">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <!-- 7.是否本人办理 -->
                  <el-col :span="6.5">
                    <el-form-item style="text-align:left;" v-if="item.id == 6">
                      <el-select style="width: 100%;" v-model="infoForm.userHome.isOwn" @change="isOwnChange" placeholder="请选择">
                        <el-option label="否" value="0"></el-option>
                        <el-option label="是" value="1"></el-option>
                      </el-select>
                    </el-form-item>
                   </el-col>
                  <!-- 上传图片按钮 -->
                  <el-upload
                    v-if="item.id != 6"
                    class="upload-demo"
                    :multiple="item.multiple"
                    accept="'.jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP'"
                    :action='fileUrl'
                    :headers='header'
                    :show-file-list='false'
                    :before-upload='handleContentChange'
                    :on-success='handleAvatarSuccess'>
                    <el-button size="small" type="primary" @click="getUploudIdx(index)">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                  </el-upload>
                  <!-- 备注 -->
                  <span class="ps" v-if="item.remark">{{item.remark}}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 老人收入情况 -->
          <div class="min-title">老人收入情况</div>
          <el-row class='el-row-el'>
            <el-col :span="10">
              <el-form-item label="赡养费（单位：元）" prop="alimony">
                <el-input v-model="infoForm.alimony">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='el-row-el'>
            <el-col :span="10">
              <el-form-item label="银行月流水（单位：元）" prop="bank1">
                <el-input v-model="infoForm.bank1">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 老人评估情况 -->
          <div class="min-title">老人评估情况</div>
          <el-row class='el-row-el'>
            <el-col :span="10">
              <el-form-item label="评估信息" prop="assessInfo">
                <el-input v-model="infoForm.assessInfo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='el-row-el'>
            <el-col :span="10">
              <el-form-item label="评估等级" prop="assessLevel">
                <el-input v-model="infoForm.assessLevel"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='el-row-el'>
            <el-col :span="10">
              <el-form-item label="补贴金额（单位：元）" prop="assessMoney">
                <el-input v-model="infoForm.assessMoney">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
  </el-main>
</template>

<script>
import vmson from '../../../assets/js/emptyVue'
export default {
  data () {
    return {
      id: '',
      ImgUrl: '',
      uploudIdx: '',
      bankList: [],
      /**
       * @id 标识
       * @label 名字
       * @type 文件字段
       * @iconArr 主要数据
       * @multiple 是否可以选择多张图片
       * @isOwnFlag 显示隐藏
       * @remark 备注
       */
      uploudFormArr: [
        {
          id: 0,
          label: '1.申请表',
          type: 'application',
          iconArr: [
            {
              icon: '1585662540453.jpg',
              iconAll: 'http://47.105.140.86/nankai/storage/1585662540453.jpg'
            }
          ],
          multiple: false,
          isOwnFlag: true,
          remark: ''
        },
        {
          id: 1,
          label: '2.承诺书',
          type: 'promise',
          iconArr: [
            {
              icon: '1585662540453.jpg',
              iconAll: 'http://47.105.140.86/nankai/storage/1585662540453.jpg'
            }
          ],
          multiple: false,
          isOwnFlag: true,
          remark: ''
        },
        {
          id: 2,
          label: '3.评估表',
          type: 'assess',
          iconArr: [
            {
              icon: '1585662540453.jpg',
              iconAll: 'http://47.105.140.86/nankai/storage/1585662540453.jpg'
            }
          ],
          multiple: false,
          isOwnFlag: true,
          remark: ''
        },
        {
          id: 3,
          label: '4.本人身份证复印件',
          type: 'idCard',
          iconArr: [
            {
              icon: '1585662540453.jpg',
              iconAll: 'http://47.105.140.86/nankai/storage/1585662540453.jpg'
            }
          ],
          multiple: false,
          isOwnFlag: true,
          remark: ''
        },
        {
          id: 4,
          label: '5.本人户口本资料',
          type: 'userHomeExtends0',
          iconArr: [
            {
              icon: '1585662540453.jpg',
              iconAll: 'http://47.105.140.86/nankai/storage/1585662540453.jpg'
            },
            {
              icon: '1585662540453.jpg',
              iconAll: 'http://47.105.140.86/nankai/storage/1585662540453.jpg'
            }
          ],
          multiple: true,
          isOwnFlag: true,
          remark: '支持多张 （备注：包括 本人户口本首页、本人户口页、户口本其他人复印件）'
        },
        {
          id: 5,
          label: '6.本人银行流水凭证',
          type: 'bankImg',
          iconArr: [
            {
              icon: '1585662540453.jpg',
              iconAll: 'http://47.105.140.86/nankai/storage/1585662540453.jpg'
            }
          ],
          multiple: false,
          isOwnFlag: true,
          remark: '请上传低收入救助证（备注：与“本人银行流水”选择项有关）'
        },
        {
          id: 6,
          label: '7.是否本人办理',
          type: 'isOwn',
          iconArr: [],
          multiple: false,
          isOwnFlag: true,
          remark: '选择是时，展示代办人身份证复印件及代办人分户口本复印件，选择否时，不展示。'
        },
        {
          id: 7,
          label: '代办人身份证复印件',
          type: 'otherCard',
          iconArr: [
            {
              icon: '1585662540453.jpg',
              iconAll: 'http://47.105.140.86/nankai/storage/1585662540453.jpg'
            }
          ],
          multiple: false,
          isOwnFlag: false,
          remark: '要求：身份证复印件正反面一张照片'
        },
        {
          id: 8,
          label: '代办人户口本复印件',
          type: 'userHomeExtends1',
          iconArr: [
            {
              icon: '1585662540453.jpg',
              iconAll: 'http://47.105.140.86/nankai/storage/1585662540453.jpg'
            },
            {
              icon: '1585662540453.jpg',
              iconAll: 'http://47.105.140.86/nankai/storage/1585662540453.jpg'
            }
          ],
          multiple: true,
          isOwnFlag: false,
          remark: '支持多张'
        },
        {
          id: 9,
          label: '8.赡养费材料',
          type: 'userHomeExtends2',
          iconArr: [
            {
              icon: '1585662540453.jpg',
              iconAll: 'http://47.105.140.86/nankai/storage/1585662540453.jpg'
            },
            {
              icon: '1585662540453.jpg',
              iconAll: 'http://47.105.140.86/nankai/storage/1585662540453.jpg'
            }
          ],
          multiple: true,
          isOwnFlag: true,
          remark: '支持多张（备注：请上传 其他子女户口本复印件、其他子女银行流水、减免或免除赡养费）'
        }
      ],
      infoForm: {
        userHome: {
          application: '',
          promise: '',
          assess: '',
          idCard: '',
          bank: '',
          bankImg: '',
          isOwn: '',
          otherCard: '',
          userHomeExtends0: [{
            extendInfo: '',
            extendType: 0
          }],
          userHomeExtends1: [{
            extendInfo: '',
            extendType: 1
          }],
          userHomeExtends2: [{
            extendInfo: '',
            extendType: 2
          }],
          alimony: '2000',
          bank1: '3000'
        },
        alimony: '20.00',
        bank1: '30.00',
        assessInfo: '1',
        assessLevel: '2',
        assessMoney: '10.00'
      },
      rules: {
        alimony: [
          { required: true, message: '请输入赡养费', trigger: 'blur' },
          { required: true, validator: this.common.isvalidFloat, trigger: 'blur' }
        ],
        bank1: [
          { required: true, message: '请输入银行月流水', trigger: 'blur' },
          { required: true, validator: this.common.isvalidFloat, trigger: 'blur' }
        ],
        assessInfo: [
          { required: true, message: '请输入评估信息', trigger: 'blur' }
        ],
        assessLevel: [
          { required: true, message: '请输入评估等级', trigger: 'blur' }
        ],
        assessMoney: [
          { required: true, message: '请输入补贴金额', trigger: 'blur' },
          { required: true, validator: this.common.isvalidFloat, trigger: 'blur' }
        ]
      },
      fileUrl: process.env.VUE_APP_URL + this.api.resourceLib.upload,
      header: {
        'Authorization': 'token ' + this.common.session('currentUser').token
      }
    }
  },

  created () {
    vmson.$on('blur', (age) => {
      this.age = age
      let arr = [
        {
          label: '低收入救助证',
          value: '0'
        },
        {
          label: '特困证供养证',
          value: '1'
        },
        {
          label: '退役军人优抚证',
          value: '2'
        },
        {
          label: '其他证明',
          value: '3'
        }
      ]
      if (parseInt(age) > parseInt(80)) {
        arr = [
          {
            label: '近3月银行流水',
            value: '0'
          },
          {
            label: '特困证供养证',
            value: '1'
          }
        ]
      }
      this.bankList = arr
    })
  },
  mounted () {
  },

  methods: {
    isOwnChange () {
      if (this.infoForm.isOwn === '1') {
        this.uploudFormArr[7].isOwnFlag = true
        this.uploudFormArr[8].isOwnFlag = true
      } else {
        this.uploudFormArr[7].isOwnFlag = false
        this.uploudFormArr[8].isOwnFlag = false
      }
    },
    getUploudIdx (idx) {
      this.uploudIdx = idx
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
      let uploudIdx = this.uploudIdx
      if (response.code === 1) {
        // 只允许上传一张
        if (uploudIdx === 0 || uploudIdx === 1 || uploudIdx === 2 || uploudIdx === 3 || uploudIdx === 5) {
          if (that.uploudFormArr[uploudIdx].iconArr.length === 1) {
            that.$message.error('您已上传，请先删除，再上传')
            return false
          }
        }
        // 只允许上传二张
        if (uploudIdx === 7) {
          if (that.uploudFormArr[uploudIdx].iconArr.length === 3) {
            that.$message.error('您已上传，请先删除，再上传')
            return false
          }
        }
        // 只允许上传三张
        if (uploudIdx === 4 || uploudIdx === 9) {
          if (that.uploudFormArr[uploudIdx].iconArr.length === 3) {
            that.$message.error('您已上传，请先删除，再上传')
            return false
          }
        }
        that.uploudFormArr[uploudIdx].iconArr.push({
          iconAll: response.data.fileLongPath,
          icon: response.data.filePath
        })
        that.$message.success(response.msg)
      }
    },
    // 删除照片
    deleteImg (idx) {
      let that = this
      let uploudIdx = that.uploudIdx
      let uploudFormArr = that.uploudFormArr
      uploudFormArr[uploudIdx].iconArr.splice(idx, 1)
    },
    detail (e) {
      this.infoForm = e
    },
    // 添加数据
    onSubmit () {
      let that = this
      let obj = {
        userHome: {
          bank: this.infoForm.userHome.bank,
          alimony: parseFloat(this.infoForm.alimony) * parseFloat(100),
          bank1: parseFloat(this.infoForm.bank1) * parseFloat(100)
        },
        assessInfo: this.infoForm.assessInfo,
        assessLevel: this.infoForm.assessLevel,
        assessMoney: parseFloat(this.infoForm.assessMoney) * parseFloat(100)
      }
      let label = ''
      try {
        this.uploudFormArr.forEach(item => {
          let arr = []
          if (item.iconArr.length === 0 && item.label !== '7.是否本人办理') {
            label = item.label
            throw new Error('error')
          }
          item.iconArr.forEach(items => {
            arr.push(items.icon)
          })
          switch (item.type) {
            case 'userHomeExtends0':
              obj.userHome[item.type] = [{
                extendInfo: JSON.stringify(arr),
                extendType: 0
              }]
              break
            case 'userHomeExtends1':
              obj.userHome[item.type] = [{
                extendInfo: JSON.stringify(arr),
                extendType: 1
              }]
              break
            case 'userHomeExtends2':
              obj.userHome[item.type] = [{
                extendInfo: JSON.stringify(arr),
                extendType: 2
              }]
              break
            case 'isOwn':
              arr = ''
              break
            default:
              obj.userHome[item.type] = JSON.stringify(arr)
              break
          }
        })
      } catch (e) {
        if (e.message !== 'error') throw e
      }
      if (label) {
        that.$message.error('请上传' + label + '材料')
        return false
      }
      that.$refs.infoForm.validate(async (index) => {
        if (index === false) {
          return false
        }
        setTimeout(item => {
          this.$emit('formMsgSave1', obj, true)
        }, 900)
      })
    }
  }
}
</script>

<style scoped>
  .el-main{
    padding-bottom:0!important;
  }
  .hander{
    padding: 5px 0;
    margin-bottom: 10px;
    text-align: left;
    font-size: 14px;
    border-bottom: 1px dashed #999;
    color:#009966;
  }
  .min-title{
    padding: 5px 0;
    margin-bottom: 10px;
    text-align: left;
    font-size: 14px;
    border-bottom: 1px solid #999;
  }
  .upload-demo {
    float: left;
  }
  .flex{
    display: flex;
  }
  .img{
    width: 100px;
    height: 100px;
  }
  .ps{
    padding-left: 10px;
    color: red;
  }
</style>
