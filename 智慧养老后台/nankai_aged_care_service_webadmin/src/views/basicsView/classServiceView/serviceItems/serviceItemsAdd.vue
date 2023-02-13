<template>
  <el-main class="serviceItemsAdd">
    <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="140px">
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="服务栏目" prop="serviceType1Id" style="text-align:left">
            <el-select clearable v-model="infoForm.serviceType1Id" @change="columnChange" placeholder="请选择服务栏目">
              <el-option
                v-for="item in columnList"
                :key="item.id"
                :label="item.name"
                :value="item.id + ',' + item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="服务类别" prop="serviceType2Id" style="text-align:left">
            <el-select clearable v-model="infoForm.serviceType2Id" placeholder="请选择服务类别">
              <el-option
                v-for="item in classList"
                :key="item.id"
                :label="item.name"
                :value="item.id + ',' + item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="服务项" prop="name">
            <el-input v-model="infoForm.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="服务金额（元）" prop="money">
            <el-input v-model="infoForm.money"></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="服务性质" prop="type" style="text-align:left">
            <el-select clearable v-model="infoForm.type" placeholder="请选择服务性质" @change="typeChange">
              <el-option label="计时服务" value="0"></el-option>
              <el-option label="计次服务" value="1"></el-option>
              <el-option label="单价服务" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="服务时长（小时）" prop="time" v-if="infoForm.type === '0'">
            <el-input v-model="infoForm.time"></el-input>
          </el-form-item>
          <el-form-item label="服务次数（次）" prop="time" v-if="infoForm.type === '1'">
            <el-input v-model="infoForm.time"></el-input>
          </el-form-item>
          <el-form-item label="计价单位" prop="unit" v-if="infoForm.type === '2'">
            <el-input v-model="infoForm.unit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="14">
          <el-form-item label="服务介绍">
            <el-input type="textarea" v-model="infoForm.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el' style="text-align: left;">
          <el-col :span="24">
            <el-form-item class="open_btn">
              <el-button type="primary" @click="submitForm('infoForm')">保存</el-button>
              <el-button @click="close">返回</el-button>
            </el-form-item>
          </el-col>
      </el-row>
    </el-form>
  </el-main>
</template>

<script>
export default {
  data () {
    let isvalidFloat = (rule, value, callback) => {
      const reg0 = /^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$/
      const reg1 = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1})$/
      const reg2 = /^\+?\d+$/
      if ((!reg0.test(value)) && (!reg1.test(value)) && (!reg2.test(value))) {
        callback(new Error('金额应为正整数或至多两位小数点正数'))
      } else {
        callback()
      }
    }
    return {
      id: '',
      columnList: [],
      classList: [],
      infoForm: {
        serviceType1Id: '',
        serviceType2Id: '',
        name: '',
        money: '',
        type: '',
        time: '',
        unit: '',
        remark: ''
      },
      rules: {
        serviceType1Id: [
          { required: true, message: '请选择服务栏目', trigger: ['blur', 'change'] }
        ],
        serviceType2Id: [
          { required: true, message: '请选择服务类别', trigger: ['blur', 'change'] }
        ],
        name: [
          { required: true, message: '请输入服务项', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '请输入服务金额（元）', trigger: 'blur' },
          { required: true, validator: isvalidFloat, trigger: ['blur', 'change'] }
        ],
        type: [
          { required: true, message: '请选择服务性质', trigger: ['blur', 'change'] }
        ],
        time: [
          { required: true, message: '请输入服务时长（小时）', trigger: 'blur' }
        ]
      }
    }
  },

  mounted () {
    this.id = this.$route.query.id
    if (this.id) {
      this.getList()
      this.getClassList()
    }
    this.getColumnList()
  },

  methods: {
    columnChange () {
      if (this.infoForm.serviceType1Id === '') {
        this.classList = []
        this.infoForm.serviceType2Id = ''
        return false
      }
      this.getClassList()
    },
    typeChange (val) {
      this.getTimeTitle(val, true)
    },
    getTimeTitle (val, flag) {
      switch (val) {
        case '0':
          if (flag) {
            this.infoForm.time = ''
          }
          break
        case '1':
          if (flag) {
            this.infoForm.time = '1'
          }
          break
        case '2':
          if (flag) {
            this.infoForm.unit = ''
          }
          break
      }
    },
    // 栏目列表
    async getColumnList () {
      const that = this
      try {
        let url = this.api.serviceType1.findAll + '?page=1&size=1000000'
        let obj = {}
        const response = await this.request.dataGet(that, url, obj)
        that.columnList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    // 类别列表
    async getClassList (serviceType1Id) {
      const that = this
      try {
        let url = this.api.serviceType2.findAll + '?page=1&size=1000000'
        let arr = this.infoForm.serviceType1Id.split(',')
        let obj = {
          serviceType1Id: arr[0]
        }
        const response = await this.request.dataGet(that, url, obj)
        that.classList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    async getList () {
      let that = this
      try {
        let findUrl = that.api.serviceProject.findById
        let parameter = { id: this.id }
        const response = await that.request.dataGet(that, findUrl, parameter)
        if (response.code === 1) {
          that.infoForm = response.data
          that.infoForm.money = response.data.money / 100
          that.infoForm.serviceType1Id = response.data.serviceType1Id + ',' + response.data.serviceType1Name
          that.infoForm.serviceType2Id = response.data.serviceType2Id + ',' + response.data.serviceType2Name
          this.getTimeTitle(response.data.type, false)
          return false
        }
        that.$message.error(response.msg)
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    submitForm (form) {
      let that = this
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          try {
            let url = that.api.serviceProject.insert
            let arr1 = this.infoForm.serviceType1Id.split(',')
            let arr2 = this.infoForm.serviceType2Id.split(',')
            let money = parseFloat(this.infoForm.money) * parseInt(100)
            let obj = {
              serviceType1Id: arr1[0],
              serviceType1Name: arr1[1],
              serviceType2Id: arr2[0],
              serviceType2Name: arr2[1],
              name: this.infoForm.name,
              money: parseInt(money),
              type: this.infoForm.type,
              time: this.infoForm.time,
              unit: this.infoForm.unit,
              remark: this.infoForm.remark
            }
            let response = null
            if (that.id) {
              url = that.api.serviceProject.update
              obj.id = that.id
              response = await this.request.dataPut(that, url, obj)
            } else {
              response = await this.request.dataPost(that, url, obj)
            }
            if (response.code === 1) {
              that.$message.success(response.msg)
              that.$router.push({
                path: 'serviceItems'
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
        path: 'serviceItems'
      })
    }
  }
}
</script>

<style>
  .serviceItemsAdd .upload-demo {
    float: left;
  }
  .serviceItemsAdd .img{
    width: 220px;
    height: 220px;
  }
</style>
