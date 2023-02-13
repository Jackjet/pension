<template>
  <el-main>
    <el-form ref="infoForm" :model="infoForm" label-width="140px">
      <el-row class='el-row-el'>
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input v-model="infoForm.name" :disabled="type==2"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话">
            <el-input v-model="infoForm.phone" :disabled="type==2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="12">
          <el-form-item label="身份证号">
            <el-input v-model="infoForm.idCard" :disabled="type==2"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="性别">
            <el-select v-model="infoForm.sex" :disabled="type==2">
              <el-option label="男" value="1"> </el-option>
              <el-option label="女" value="0"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="12">
          <el-form-item label="户籍地街道">
            <el-input v-model="infoForm.homeStreetName" :disabled="type==2"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="户籍地社区">
            <el-input v-model="infoForm.homeCommunityName" :disabled="type==2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="12">
          <el-form-item label="老人类型名称">
            <el-input v-model="infoForm.genreName" :disabled="type==2"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="补贴金额">
            <el-input v-model="infoForm.assessMoney" :disabled="type==2">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="12">
          <el-form-item label="评估信息">
            <el-input v-model="infoForm.assessInfo" :disabled="type==2"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评估等级">
            <el-input v-model="infoForm.assessLevel" :disabled="type==2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="12">
          <el-form-item label="操作人名称">
            <el-input v-model="infoForm.createByName" :disabled="type==2"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="操作类型">
            <el-select v-model="infoForm.optType" :disabled="type==2">
              <el-option label="新增" value="0"> </el-option>
              <el-option label="变更" value="1"> </el-option>
              <el-option label="注销" value="2"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="12">
          <el-form-item label="操作时间">
            <el-input v-model="infoForm.createTime" :disabled="type==2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input type="textarea" v-model="infoForm.remark" :disabled="type==2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class='el-row-el'>
        <el-col :span="24">
          <el-form-item class="open_btn">
            <el-button @click="close">返回</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      type: '',
      infoForm: {
        name: '',
        phone: '',
        idCard: '',
        sex: '',
        homeStreetName: '',
        homeCommunityName: '',
        genreName: '',
        assessMoney: '',
        createByName: '',
        createTime: '',
        optType: '',
        assessInfo: '',
        assessLevel: '',
        remark: ''
      },
    }
  },

  mounted() {
    this.id = this.$route.query.id
    this.type = this.$route.query.type
    if (this.type) {
      this.getDetail()
    }
  },

  methods: {
    async getDetail() {
      const that = this
      try {
        let findUrl = that.api.assessRecord.findById
        let parameter = { id: that.id }
        const response = await that.request.dataGet(that, findUrl, parameter)
        if (response.code === 1) {
          response.data.assessMoney = (Number(response.data.assessMoney) / 100).toFixed(2)
          if (response.data.genreName) {
            response.data.genreName = JSON.parse(response.data.genreName)
            if (response.data.genreName.length !== 0) {
              if (response.data.genreName.length === 1) {
                response.data.genreName = response.data.genreName[0]
              } else {
                response.data.genreName = response.data.genreName.join(',')
              }
            }
          }
          that.infoForm = response.data
          return false
        }
        that.$message.error(response.msg)
      } catch (e) {
        // console.log(e)
        that.$message.error('数据获取失败')
      }
    },
    close() {
      this.$router.push({
        path: 'evaluationRecordView'
      })
    }
  }
}
</script>

<style scoped>
.hander {
  padding: 5px 0;
  margin-bottom: 10px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px dashed #999;
  color: #009966;
}
.upload-demo {
  float: left;
}
.img {
  width: 200px;
  height: 100px;
}
</style>
