<template>
  <el-main>
    <el-col :span="24" class="warp-main ta-l">
      <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="170px">
        <el-row class='el-row-el'>
          <el-col :span="14">
            <el-form-item label="老年证编号" prop="cardCode" class="label_input" placeholder="请输入老年证编号">
              <el-input v-model="infoForm.cardCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="14">
            <el-form-item label="是否领取" prop="receiveId" style="text-align: left;">
              <el-select clearable size="medium" v-model="infoForm.receiveId" placeholder="请选择是否领取">
                <el-option label="否" value="0"></el-option>
                <el-option label="是" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="14">
            <el-form-item label="身份证号" prop="idCard"  class="label_input" placeholder="请输入身份证号">
              <el-input v-model="infoForm.idCard" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el ta-c'>
          <el-col :span="14">
            <el-form-item class="el-button-el">
              <el-button type="primary" @click="onPageReturn">返回</el-button>
              <el-button type="primary"  @click="onSubmit('infoForm')">保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-col>
  </el-main>
</template>

<script>

export default {
  data () {
    return {
      id: '',
      isShow: false,
      streetList: [],
      communityList: [],
      griddingList: [],
      role: {},
      SearchItem: {
        name: ''
      },
      lastItem: {
        name: ''
      },
      infoForm: {
        cardCode: '',
        receiveId: '',
        IdCard: ''
      },
      rules: {
        cardCode: [
          { required: true, message: '请输入老年证编号', trigger: 'blur' }
        ],
        receiveId: [
          { required: true, message: '请选择是否领取', trigger: 'change' }
        ],
        idCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' }
        ]
      }
    }
  },

  mounted () {
    let that = this
    that.id = that.$route.query.id
    that.getDetail()
  },

  methods: {
    async getDetail () {
      const that = this
      try {
        let findUrl = that.api.user.findAllCardCodeById
        let parameter = { id: that.id }
        const response = await that.request.dataGet(that, findUrl, parameter)
        if (response.code === 1) {
          that.infoForm = response.data
          return false
        }
        that.$message.error(response.msg)
      } catch (e) {
        that.$message.error('数据获取失败')
      }
    },
    // 添加数据
    onSubmit (formValue) {
      let that = this

      that.$refs[formValue].validate(async (index) => {
        if (index === false) {
          return false
        }
        try {
          let url = that.api.user.CardCodeUpdate
          if (that.infoForm.receiveId === '0') {
            that.infoForm.receive = '否'
          } else if (that.infoForm.receiveId === '1') {
            that.infoForm.receive = '是'
          }
          let obj = that.infoForm

          let response = null
          obj.id = that.id
          response = await this.request.dataPut(that, url, obj)

          if (response.code === 1) {
            that.$message.success(response.msg)
            that.$router.push({ path: 'credentials' })
            return false
          }
          that.$message.error(response.msg)
        } catch (even) {
          that.$message.error('数据获取失败')
        }
      })
    },
    onPageReturn () {
      this.$router.push({ path: 'credentials' })
    }
  }
}
</script>

<style scoped>
  .el-main{
    padding-top:0!important;
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
  .el-radio__label {
    display: inline-block;
  }
  .search {
    width: 180px;
    margin-bottom: 15px;
    margin-right: 10px;
  }
  .el-dialog {
    margin-top: 7vh;
  }
</style>
