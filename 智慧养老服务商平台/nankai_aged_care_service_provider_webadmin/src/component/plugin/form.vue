<template>
  <el-form style='flex: 1;' v-if="formMode && formMode.form" ref="form" :model="form" :rules="rules"
    :class='formMode.type === "form" ? "el-form-index" : ""'>
    <template v-for='(item, index) in formMode.form'>
      <el-form-item :prop="item.model"
        :label="item.label"
        :label-width="formLabelWidth"
        :key="index"
        v-if="item.type === 'input' && relevant === 'detail' && keys === 0 || item.type === 'input' && relevant === 'modify' && keys === 1 || item.type === 'input' && relevant === 'new' && keys === 2 || item.type === 'input' && relevant === ''">
        <el-input class='el-forms'
          :disabled='openForm'
          clearable
          v-model="form[item.model]"
          autocomplete="off"
          :placeholder='item.placeholder'>
        </el-input>
      </el-form-item>
      <el-form-item
        class='section'
        prop='section'
        :label="item.label"
        :label-width="formLabelWidth"
        :key="index"
        v-if="item.type === 'section' && relevant === 'detail' && keys === 0 || item.type === 'section' && relevant === 'modify' && keys === 1 || item.type === 'section' && relevant === 'new' && keys === 2 || item.type === 'section' && relevant === ''">
        <el-col :span="11" class='price'>
          <el-form-item :prop="item.model[0]">
            <el-input
              type='number'
              @keydown.native="channelInputLimit"
              :disabled='openForm'
              :min='0'
              @change="currentSel"
              autocomplete="off"
              :placeholder='item.placeholderStart'
              v-model.number="form[item.model[0]]">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11" class='price'>
          <el-form-item :prop="item.model[1]">
            <el-input
              type='number'
              :disabled='openForm'
              @keydown.native="channelInputLimit"
              :min='0'
              @change="currentSel"
              :placeholder='item.placeholderEnd'
              v-model.number="form[item.model[1]]">
            </el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item
        :prop="item.model"
        :label="item.label"
        :label-width="formLabelWidth"
        :key="index"
        v-if="item.type === 'number' && relevant === 'detail' && keys === 0 || item.type === 'number' && relevant === 'modify' && keys === 1 || item.type === 'number' && relevant === 'new' && keys === 2 || item.type === 'number' && relevant === ''">
        <el-input class='el-forms'
          :disabled='openForm'
          type='number'
          :min='0'
          clearable
          v-model.number="form[item.model]"
          autocomplete="off"
          :placeholder='item.placeholder'>
        </el-input>
      </el-form-item>
      <el-form-item
        :prop="item.model"
        :label="item.label"
        :label-width="formLabelWidth"
        :key="index"
        v-if="item.type === 'select' && relevant === 'detail' && keys === 0 || item.type === 'select' && relevant === 'modify' && keys === 1 || item.type === 'select' && relevant === 'new' && keys === 2 || item.type === 'select' && relevant === ''">
        <el-select
          class='el-forms'
          :disabled='openForm'
          clearable
          v-model="form[item.model]"
          :placeholder='item.placeholder'
          :popper-append-to-body='false'
          filterable
          :multiple='item.multiple'
          :allow-create='item.multiple'
          :default-first-option='item.multiple'>
          <el-option v-for='(dates, indexs) in item.option' :disabled="dates.disabled" :label='dates.label' :value="dates.value" :key="indexs"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        :prop="item.model"
        :key='index'
        v-if="item.type === 'time' && relevant === 'detail' && keys === 0 || item.type === 'time' && relevant === 'modify' && keys === 1 || item.type === 'time' && relevant === 'new' && keys === 2 || item.type === 'time' && relevant === ''"
        :label="item.label"
        :label-width="formLabelWidth">
        <el-time-select clearable
          unlink-panels
          class='el-forms'
          :disabled='openForm'
          v-model="form[item.model]"
          :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30'
          }"
          :placeholder='item.placeholder'>
        </el-time-select>
      </el-form-item>
      <el-form-item
        class='value'
        :prop='item.model[0]'
        :key='index'
        v-if="item.type === 'timerange' && relevant === 'detail' && keys === 0 || item.type === 'timerange' && relevant === 'modify' && keys === 1 || item.type === 'timerange' && relevant === 'new' && keys === 2 || item.type === 'timerange' && relevant === ''"
        :label="item.label"
        :label-width="formLabelWidth">
        <el-time-picker clearable
          is-range
          class='el-forms'
          :disabled='openForm'
          :popper-append-to-body='false'
          :default-value='timerange'
          v-model="timerange"
          range-separator="???"
          @change="currentSel"
          value-format='HH:mm:ss'
          :start-placeholder="item.placeholderStart"
          :end-placeholder="item.placeholderEnd">
        </el-time-picker>
      </el-form-item>
      <el-form-item
        :prop="item.model"
        :key='index'
        v-if="item.type === 'date' && relevant === 'detail' && keys === 0 || item.type === 'date' && relevant === 'modify' && keys === 1 || item.type === 'date' && relevant === 'new' && keys === 2 || item.type === 'date' && relevant === ''"
        :label="item.label"
        :label-width="formLabelWidth">
        <el-date-picker clearable
          unlink-panels
          class='el-forms'
          :disabled='openForm'
          type='date'
          value-format='yyyy-MM-dd'
          :placeholder='item.placeholder'
          v-model='form[item.model]'>
        </el-date-picker>
      </el-form-item>
      <el-form-item
        :prop="item.model[0]"
        :key='index'
        v-if="item.type === 'daterange' && relevant === 'detail' && keys === 0 || item.type === 'daterange' && relevant === 'modify' && keys === 1 || item.type === 'daterange' && relevant === 'new' && keys === 2 || item.type === 'daterange' && relevant === ''"
        :label="item.label"
        :label-width="formLabelWidth">
        <el-date-picker clearable
          unlink-panels
          class='el-forms'
          :disabled='openForm'
          type='daterange'
          value-format='yyyy-MM-dd'
          range-separator='???'
          @change="currentSel"
          :start-placeholder="item.placeholderStart"
          :end-placeholder="item.placeholderEnd"
          v-model='daterange'>
        </el-date-picker>
      </el-form-item>
      <el-form-item
        :prop="item.model"
        :key='index'
        v-if="item.type === 'datetime' && relevant === 'detail' && keys === 0 || item.type === 'datetime' && relevant === 'modify' && keys === 1 || item.type === 'datetime' && relevant === 'new' && keys === 2 || item.type === 'datetime' && relevant === ''"
        :label="item.label"
        :label-width="formLabelWidth">
        <el-date-picker clearable
          unlink-panels
          class='el-forms'
          :disabled='openForm'
          type='datetime'
          value-format='yyyy-MM-dd HH:mm:ss'
          :placeholder="item.placeholder"
          v-model='form[item.model]'>
        </el-date-picker>
      </el-form-item>
      <el-form-item
        :prop='item.model[0]'
        :key='index'
        v-if="item.type === 'datetimerange' && relevant === 'detail' && keys === 0 || item.type === 'datetimerange' && relevant === 'modify' && keys === 1 || item.type === 'datetimerange' && relevant === 'new' && keys === 2 || item.type === 'datetimerange' && relevant === ''"
        :label="item.label"
        :label-width="formLabelWidth">
        <el-date-picker clearable
          unlink-panels
          class='el-slider'
          :disabled='openForm'
          type='datetimerange'
          value-format='yyyy-MM-dd HH:mm:ss'
          @change="currentSel"
          range-separator='???'
          :start-placeholder="item.placeholderStart"
          :end-placeholder="item.placeholderEnd"
          v-model='datetimerange'>
        </el-date-picker>
      </el-form-item>
      <el-form-item
        :prop="item.model"
        :label="item.label"
        :label-width="formLabelWidth"
        :key='index'
        v-if="item.type === 'textarea' && relevant === 'detail' && keys === 0 || item.type === 'textarea' && relevant === 'modify' && keys === 1 || item.type === 'textarea' && relevant === 'new' && keys === 2 || item.type === 'textarea' && relevant === ''">
        <el-input
          type="textarea"
          :rows="7"
          class='el-slider'
          :disabled='openForm'
          v-model='form[item.model]'
          :placeholder="item.placeholder">
        </el-input>
      </el-form-item>
      <el-form-item
        :label="item.label"
        :label-width="formLabelWidth"
        :key='index'
        v-if="item.type === 'switch' && relevant === 'detail' && keys === 0 || item.type === 'switch' && relevant === 'modify' && keys === 1 || item.type === 'switch' && relevant === 'new' && keys === 2 || item.type === 'switch' && relevant === ''">
        <el-switch class='el-switch' v-model='form[item.model]'></el-switch>
      </el-form-item>
      <el-form-item
        :prop="item.model"
        :label="item.label"
        :label-width="formLabelWidth"
        :key='index'
        v-if="item.type === 'editor' && relevant === 'detail' && keys === 0 || item.type === 'editor' && relevant === 'modify' && keys === 1 || item.type === 'editor' && relevant === 'new' && keys === 2 || item.type === 'editor' && relevant === ''">
        <editor @monitor='monitor' ref="get" class='el-editor' v-if="!openForm"></editor>
        <div v-html="form[item.model]" class='el-htmls' v-else></div>
      </el-form-item>
      <el-form-item
        :prop="item.model"
        :label="item.label"
        :label-width="formLabelWidth"
        :key='index'
        v-if="item.type === 'cascader' && relevant === 'detail' && keys === 0 || item.type === 'cascader' && relevant === 'modify' && keys === 1 || item.type === 'cascader' && relevant === 'new' && keys === 2 || item.type === 'cascader' && relevant === ''">
        <el-cascader
          clearable
          :disabled='openForm'
          class='el-forms'
          :options="options"
          v-model="form[item.model]"
          :placeholder="item.placeholder">
        </el-cascader>
      </el-form-item>
      <el-form-item
        class='uploadi'
        :prop="item.model"
        :label="item.label"
        :label-width="formLabelWidth"
        :key='index'
         v-if="item.type === 'uploadImage' && relevant === 'detail' && keys === 0 || item.type === 'uploadImage' && relevant === 'modify' && keys === 1 || item.type === 'uploadImage' && relevant === 'new' && keys === 2 || item.type === 'uploadImage' && relevant === ''">
        <el-upload
          :disabled='upload_Disabled'
          :headers='item.headers'
          :action="item.action || ''"
          :data="qiniuData"
          :before-upload='beforeAvatarUpload'
          :on-progress='uploadComplete'
          :on-success='uploadSuccess'
          :on-remove='uploadRemove'
          :on-error='uploadError'
          :show-file-list="false"
          :class="imageClass">
          <div class='uploaddelete' @click.stop='uploadRemove' v-if="form[item.model] && form[item.model] !== undefined && form[item.model] !== '' && !openForm">
            <i class='el-icon-delete'></i>
          </div>
          <img v-if="form[item.model]" :src="form[item.model]" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div class='drak' v-if='openForm'></div>
          <el-progress type="circle" v-if='dialogVisible' :percentage="uploadPercent" style="margin-top:30px;"></el-progress>
        </el-upload>
      </el-form-item>
    </template>
    <el-form-item v-if='formMode.type === "form"'>
      <template v-for="(i, v) in formMode.event">
        <el-button :key='v' type="primary"  v-if='i.bind === "submit"' @click.native.prevent='i.method !== undefined ? i.method(submit("form", true)) : ""'>????????????</el-button>
      </template>
    </el-form-item>
  </el-form>
</template>

<script>
import editor from './wangEditor'
import area from 'js/area'

export default {
  components: {
    editor
  },

  props: {
    formMode: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      form: {},
      // ???????????? ????????????????????????
      formLabelWidth: '120px',
      // ???????????????????????? ????????????
      openForm: false,
      // ??????????????????
      upload_Disabled: false,
      // ??????????????????
      rules: {},
      // ??????????????????????????? ????????????
      options: area,
      // ???????????? loading ????????????
      dialogVisible: false,
      // ????????????????????????
      fileList: [],
      // ?????????????????????????????? ?????? loading ??????
      uploadPercent: 0,
      // ???????????????????????? ???????????????????????? ?????? token
      qiniuData: {
        token: ''
      },
      // ??????????????????????????????
      hideUploadEdit: false,
      // ???????????????????????????????????????
      imageClass: 'avatar-uploader',
      Class: 'avatar-uploader',
      // ????????????????????????
      section: '',
      // ????????????????????????
      timerange: [],
      // ????????????????????????
      daterange: [],
      // ??????????????????????????????
      datetimerange: [],
      relevant: '',
      keys: ''
    }
  },

  created () {
    // ??????????????????
    let newJson = {}

    for (let key of this.formMode.form) {
      if (Array.isArray(key.model)) {
        for (let item of key.model) {
          newJson[item] = ''
        }
      } else {
        newJson[key.model] = ''
      }
    }
    newJson.section = ''

    this.form = newJson

    /**
     * ????????????????????? ??????????????????????????????
     */
    if (this.formMode && this.formMode.form) {
      this.formMode.form.forEach(element => {
        // ????????????????????????????????????
        if (element.rules) {
          for (let key of element.rules) {
            // ???????????????????????????????????????
            if (key.required && element.model) {
              switch (element.type) {
                case 'section':
                  /**
                   * ???????????????????????? ????????????????????????
                   * ????????????????????? ????????????????????????
                   */
                  this.rules[element.model[0]] = element.rules
                  this.rules[element.model[1]] = element.rules
                  this.rules.section = element.rules
                  break
                case 'timerange':
                  // ??????????????????
                  this.rules[element.model[0]] = element.rules
                  break
                case 'daterange':
                  // ??????????????????
                  this.rules[element.model[0]] = element.rules
                  break
                case 'datetimerange':
                  // ????????????????????????
                  this.rules[element.model[0]] = element.rules
                  break
                default:
                  this.rules[element.model] = element.rules
                  break
              }
            }
          }
        }
      })
    }
  },

  mounted () {
    /**
     * ?????????????????? ??????????????? ????????????????????????????????????
     */
    for (let first of area) {
      first.value = first.label
      // ??????????????????
      if (first.children && first.children !== []) {
        for (let level of first.children) {
          level.value = level.label
          // ??????????????????
          if (level.children && level.children !== []) {
            for (let last of level.children) {
              last.value = last.label
            }
          }
        }
      }
    }

    this.cancelRule()
  },

  methods: {
    /**
     * ??????????????????????????? ??????????????????????????? ??????????????????
     */
    initial (value, state) {
      let newJson = {}

      // ?????????????????? ??????????????????
      let form = this.formMode.form || []

      // ???????????? ?????? model ???????????? ???????????????
      let newArray = form.map((element) => {
        return element.model
      })

      let props = Object.getOwnPropertyNames(value)

      /**
       * ???????????? ???????????????????????????????????????
       */

      // ???????????????????????????
      let string = newArray.filter((val, index, arr) => {
        // ??????????????????????????? ???????????? ??????????????????
        if (Array.isArray(val)) return val
      })

      let surplus = ''

      // ??????????????? ??????????????? ?????????????????????
      for (let val of string) {
        surplus += `${val.toString()},`
      }

      let object = newArray.filter((val, index, arr) => {
        // ??????????????????????????? ????????????
        if (!Array.isArray(val)) return val
      })

      let allow = ''

      // ??????????????? ??????????????? ?????????????????????
      for (let val of object) {
        allow += `${val.toString()},`
      }

      let Strings = `${allow}${surplus}`

      // ???????????????????????????????????????
      let newObj = Strings.slice(0, Strings.length - 1).split(',')

      /**
       * ??????????????? ???????????????
       */
      for (let el of newObj) {
        for (let item of props) {
          // ?????????????????? ????????????
          if (el === item) {
            newJson[item] = value[item]
          }
        }
      }

      if (state === 'modify') {
        this.form = newJson
        for (let key of form) {
          if (key.state !== undefined && key.state !== '' && Array.isArray(key.state)) {
            for (let val of key.state) {
              if (val === 'modify') {
                this.keys = 1
                this.relevant = val
                return
              }
            }
            this.relevant = 'error'
          } else {
            this.relevant = ''
          }
        }
      }

      if (state === 'details') {
        this.form = newJson
      }

      if (state === 'increase') {
        for (let key of form) {
          if (key.state !== undefined && key.state !== '' && Array.isArray(key.state)) {
            for (let val of key.state) {
              if (val === 'new') {
                this.keys = 2
                this.relevant = val
                return
              }
            }
            this.relevant = 'error'
          } else {
            this.relevant = ''
          }
        }
      }

      /**
       * ??????????????? ??????????????? ?????????????????? ??????
       */
      this.cancelRule()

      // ????????????????????????????????? ???????????????????????????????????????
      if (state === 'details') {
        this.openForm = true
        this.upload_Disabled = true

        for (let key of form) {
          if (key.state) {
            for (let val of key.state) {
              if (val === 'detail') {
                this.keys = 0
                this.relevant = val
                return
              }
            }
            this.relevant = 'error'
          } else {
            this.relevant = ''
          }
        }
        return
      }

      this.upload_Disabled = false
      this.openForm = false
    },

    // ????????????????????? ??????????????????????????????
    channelInputLimit (el) {
      let key = el.key
      if (key === 'e' || key === '-' || key === '.') {
        el.returnValue = false
        return false
      }
      return true
    },

    cancelRule () {
      if (this.formMode && this.formMode.form) {
        for (let field of this.formMode.form) {
          // ???????????????????????? ????????????
          switch (field.type) {
            case 'timerange': // ??????????????????
              if (field.model) {
                this.timerange = Array.from([`${this.form[field.model[0]]}`, `${this.form[field.model[1]]}`])
              }
              break
            case 'daterange': // ??????????????????
              if (field.model) {
                this.daterange = Array.from([`${this.form[field.model[0]]}`, `${this.form[field.model[1]]}`])
              }
              break
            case 'datetimerange': // ????????????????????????
              if (field.model) {
                this.datetimerange = Array.from([`${this.form[field.model[0]]}`, `${this.form[field.model[1]]}`])
              }
              break
            case 'cascader': // ?????????????????????
              this.form[field.model] = this.form[field.model].split(',')
              break
            case 'editor': // ??????????????????
              this.$nextTick(() => {
                if (this.$refs.get[0]) {
                  this.$refs.get[0].setContent(this.form[field.model])
                }
              })
              break
            case 'uploadImage' || 'uploadImgList':
              if (field.token) {
                this.qiniuData.token = field.token
              }
              break
            default: break
          }
        }
      }
    },

    currentSel () {
      if (this.formMode.form) {
        for (let field of this.formMode.form) {
          // ???????????????????????? ????????????
          switch (field.type) {
            case 'section':
              this.form.section = 'undefined'
              break
            case 'timerange': // ???????????????
              if (this.timerange && this.timerange.length !== 0) {
                this.form[field.model[0]] = this.timerange[0]
                this.form[field.model[1]] = this.timerange[1]
              } else {
                this.form[field.model[0]] = ''
                this.form[field.model[1]] = ''
              }
              break
            case 'daterange': // ???????????????
              if (this.daterange && this.daterange.length !== 0) {
                this.form[field.model[0]] = this.daterange[0]
                this.form[field.model[1]] = this.daterange[1]
              } else {
                this.form[field.model[0]] = ''
                this.form[field.model[1]] = ''
              }
              break
            case 'datetimerange': // ?????????????????????
              if (this.datetimerange && this.datetimerange.length !== 0) {
                this.form[field.model[0]] = this.datetimerange[0]
                this.form[field.model[1]] = this.datetimerange[1]
              } else {
                this.form[field.model[0]] = ''
                this.form[field.model[1]] = ''
              }
              break
            case 'cascader': // ????????? ????????????
              if (this.form[field.model] !== undefined) {
                this.form[field.model] = this.form[field.model].toString()
              }
              break
            case 'editor': // ??????????????????
              let text = this.$refs.get[0].htmlContent()
              if (text.text === '' && this.rules[field.model]) {
                this.$refs.get[0].setStyle(this.rules[field.model][0].message)
                this.form[field.model] = text.text
              } else {
                this.form[field.model] = text.html
              }
              break
            default: break
          }
        }
      }
    },

    /**
     * ????????????
     * @param formName ????????????????????????
     */
    submit (formName, status) {
      // ???????????? ???????????????
      let reject = {}

      // ???????????? ???????????????????????? ????????????????????????
      this.currentSel()

      // ?????????????????? ???????????????????????????
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /**
           * ??????????????? ??????????????????
           * @param code ???????????????
           * @param data ??????????????????
           */

          for (let key in this.form) {
            if (this.form[key] === 'undefined' || this.form[key] === '') {
              delete this.form[key]
            }
          }

          reject = { code: 1, data: this.form }
        } else {
          /**
           * ???????????? ??????????????????
           */
          reject = { code: 0, data: null }
        }
      })

      return reject
    },

    monitor () {
      this.formMode.form.forEach(element => {
        if (element.type === 'editor') {
          this.$refs.form.clearValidate(element.model)
        }
      })
    },

    /**
     * ??????????????? ??????????????????
     */
    closeDialog (status, callBack) {
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }

      if (callBack) {
        // ?????????????????????
        this.timerange = []
        // ?????????????????????
        this.daterange = []
        // ???????????????????????????
        this.datetimerange = []
        // ??????????????????
        this.$refs.get[0].setContent('<p><br/></p>')

        for (let key in this.form) {
          if (this.form[key] === undefined) {
            this.form[key] = ''
          }
        }
      }
    },

    beforeAvatarUpload (file) {
      const regular = /(.*)\.(jpg|bmp|gif|ico|jpeg|tif|png)$/.test(file.name)
      const fileSize = file.size / 1024 / 1024 < 10

      if (!regular) {
        this.$message.error('????????????????????????')
      }

      if (!fileSize) {
        this.$message.error('?????????????????????????????? 10MB')
      }

      return regular && fileSize
    },

    uploadComplete (event, file) {
      this.dialogVisible = true
      this.$emit('triggerShield', true)
      this.upload_Disabled = true

      this.formMode.form.forEach(element => {
        if (element.type === 'uploadImage' && element.model) {
          this.form[element.model] = ''
        }
      })

      this.uploadPercent = Number.parseInt(event.percent)
    },

    uploadSuccess (response, file, fileList) {
      let upload = this.formMode.form
      this.dialogVisible = false
      this.upload_Disabled = false

      if (response) {
        upload.forEach(element => {
          if (element.type === 'uploadImage') {
            this.form[element.model] = `${element.domain}/${response.key}`
            this.$refs.form.clearValidate(element.model)
          }
        })

        this.$emit('triggerShield', false)

        this.imageClass = 'avatar-uploader'
        this.$message.success('????????????')
      }
    },

    uploadError (err, file, fileList) {
      if (err) {
        this.dialogVisible = false
        this.$emit('triggerShield', false)
        this.upload_Disabled = false

        if (err.status === 404) {
          this.$message.error('??????????????????????????????')
          return
        }

        if (err.status === 401) {
          this.$message.error('?????? token ??????')
          return
        }

        if (err.status === 400) {
          this.$message.error('??????????????? token')
          return
        }

        this.$message.error(JSON.parse(err.message).error)
      }
    },

    uploadRemove (file) {
      this.formMode.form.forEach(element => {
        if (element.type === 'uploadImage' && element.model !== undefined) {
          this.form[element.model] = ''
        }
      })
    }
  }
}
</script>

<style lang="scss">
  @import 'scss/form.scss';
</style>
