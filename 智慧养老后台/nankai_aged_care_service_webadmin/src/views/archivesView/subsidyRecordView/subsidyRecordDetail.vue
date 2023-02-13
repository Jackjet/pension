<template>
  <el-main v-loading="loading">
    <div>
      <!-- 主模块 -->
      <el-col :span="24" class="ta-l" v-loading="loading">
        <el-form ref="infoForm" :model="infoForm" label-width="190px">
          <el-row class='el-row-el'>
            <el-col :span="12">
              <el-form-item label="身份证号" prop="idCard">
                <el-input v-model="infoForm.idCard" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="老人姓名" prop="name">
                <el-input v-model="infoForm.name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='el-row-el'>

            <el-col :span="12">
              <el-form-item label="性别" prop="sex" style="text-align: left">
                <el-radio v-model="infoForm.sex" label="1" :disabled="true">男</el-radio>
                <el-radio v-model="infoForm.sex" label="0" :disabled="true">女</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="phone">
                <el-input v-model="infoForm.phone" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class='el-row-el'>
            <el-col :span="24">
              <el-form-item label="老人类型" prop="genreName">
                <el-input v-model="infoForm.genreName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class='el-row-el'>
            <el-col :span="12">
              <el-form-item label="所属街道" prop="homeStreetName">
                <el-input v-model="infoForm.homeStreetName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属社区" prop="homeCommunityName">
                <el-input v-model="infoForm.homeCommunityName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='el-row-el'>
            <el-col :span="12">
              <el-form-item label="操作方式" prop="optType">
                <el-input v-model="infoForm.optType" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="操作月份" prop="month">
                <el-input v-model="infoForm.month" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='el-row-el'>
            <el-col :span="12">
              <el-form-item label="评估信息" prop="assessInfo">
                <el-input v-model="infoForm.assessInfo" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="评估等级" prop="assessLevel">
                <el-input v-model="infoForm.assessLevel" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='el-row-el'>
            <el-col :span="12">
              <el-form-item label="操作金额" prop="assessMoney">
                <el-input v-model="infoForm.assessMoney" :disabled="true">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='el-row-el'>
            <el-col :span="24">
              <el-form-item label="备注" prop="remark">
                <el-input type="textarea" :disabled="true" v-model="infoForm.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class='el-row-el'>
            <el-col :span="12">
              <el-form-item label="操作人" prop="createByName">
                <el-input v-model="infoForm.createByName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发放时间" prop="createTime">
                <el-input v-model="infoForm.createTime" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
        <el-row class='el-row-el ta-c'>
          <el-col :span="24">
            <el-button type="primary" @click="onPageReturn">返回</el-button>
          </el-col>
        </el-row>
      </el-col>
    </div>
  </el-main>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      loading: true,
      id: '',
      infoForm: {},
      optTypeList: [{
        label: '发放',
        value: '0'
      }, {
        label: '补发',
        value: '1'
      }, {
        label: '退款',
        value: '2'
      }],
      assessInfoList: [],
      assessLevelList: []
    }
  },

  mounted () {
    this.id = this.$route.query.id
    this.getGenreList()
    this.detail()
  },

  methods: {
    // 详情
    async detail () {
      let that = this
      try {
        let findUrl = that.api.userSubsidy.findById
        let parameter = { id: this.id }
        const response = await that.request.dataGet(that, findUrl, parameter)
        if (response.code === 1) {
          that.infoForm = response.data
          if (that.infoForm.genreName) {
            let str = ''
            let arr = JSON.parse(that.infoForm.genreName)
            arr.forEach(items => {
              str += items + ','
            })
            that.infoForm.genreName = str.substr(0, str.length - 1)
          }
          if (that.infoForm.optType) {
            that.infoForm.optType = that.getLabelByValue(that.infoForm.optType, that.optTypeList)
          }
          if (that.infoForm.assessInfo) {
            that.infoForm.assessInfo = that.getLabelByValue(that.infoForm.assessInfo, that.assessInfoList)
          }
          if (that.infoForm.assessLevel) {
            that.infoForm.assessLevel = that.getLabelByValue(that.infoForm.assessLevel, that.assessLevelList)
          }
          if (that.infoForm.assessMoney) {
            that.infoForm.assessMoney = (that.infoForm.assessMoney / 100).toFixed(2)
          }
          if (that.infoForm.month) {
            that.infoForm.month = that.infoForm.month.substring(0, 7)
          }
        } else {
          this.$message.error(response.msg)
        }
        this.loading = false
      } catch (even) {
        this.$message.error(even)
      }
    },
    onPageReturn () {
      history.go(-1)
    },

    getGenreList () {
      const that = this
      let arr = [
        {
          label: 'assessInfoList',
          code: 'pgxx'
        },
        {
          label: 'assessLevelList',
          code: 'pgdj'
        }
      ]
      try {
        let url = this.api.dicManage.findAll + '?page=1&size=1000000'
        arr.forEach(async (item) => {
          let obj = {
            dicId: item.code
          }
          const response = await this.request.dataGet(that, url, obj)
          that[item.label] = response.data.content
        })
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },

    getLabelByValue: function (value, array) {
      var result = value
      array.forEach(function (data) {
        if (data.value === value) {
          result = data.label
        }
      })
      return result
    }
  }
}
</script>

<style scoped>
  .dept .el-input__inner{
    cursor: pointer !important;
  }
  .el-pagination {
    margin: 0px;
    padding: 0px
  }

  .warp-main{
    margin-top: 90px;
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
  .imgFlex{
    display: flex;
  }
  .img{
    width: 100px;
    height: 100px;
  }
  .ps{
    padding-left: 10px;
    color: #409EFF;
  }
</style>
