<template>
    <div>
        <el-main
            v-loading="loading">
            <el-row :gutter="20">
                <el-col :span="3" :offset="5" :class="['content-right']">
                    <span>服务商名称：</span>
                </el-col>
                <el-col :span="8" :class="['content-left']">
                    <span>{{info.name}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3" :offset="5" :class="['content-right']">
                    <span>服务商地址：</span>
                </el-col>
                <el-col :span="8" :class="['content-left']">
                    <span>{{info.address}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3" :offset="5" :class="['content-right']">
                    <span>法人姓名：</span>
                </el-col>
                <el-col :span="8" :class="['content-left']">
                    <span>{{info.legalPerson}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4" :offset="4" :class="['content-right']">
                    <span>服务商联系电话：</span>
                </el-col>
                <el-col :span="8" :class="['content-left']">
                    <span>{{info.phone}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3" :offset="5" :class="['content-right']">
                    <span>营业时间：</span>
                </el-col>
                <el-col :span="8" :class="['content-left']" style="align-content: center">
                    <span>{{info.openTime}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3" :offset="5" :class="['content-right']">
                    <span>服务商简介：</span>
                </el-col>
                <el-col :span="8" :class="['content-left']">
                    <span>{{info.remark}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4" :offset="2" v-bind:class="['content-right']">
                    <span>服务商LOGO：</span>
                </el-col>
                <el-col :span="3" v-bind:class="['content-left']">
                    <el-image
                            :preview-src-list="[info.logo_show]"
                            :src="info.logo_show">
                        <div slot="error" class="image-slot">
                            <el-image  :lazy="true"  fit="fill"  :src="require('../../../assets/image/error.png')">
                            </el-image>
                        </div>
                    </el-image>
                </el-col>

                <el-col :span="4" v-bind:class="['content-right']">
                    <span>营业执照：</span>
                </el-col>
                <el-col :span="3" v-bind:class="['content-left']">
                    <el-image
                            :preview-src-list="[info.businessLicense_show]"
                            :src="info.businessLicense_show">
                        <div slot="error" class="image-slot">
                            <el-image  :lazy="true"  fit="cover"  :src="require('../../../assets/image/error.png')">
                            </el-image>
                        </div>
                    </el-image>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4" :offset="2" v-bind:class="['content-right']">
                    <span>法人身份证正面照：</span>
                </el-col>
                <el-col :span="3" v-bind:class="['content-left']">
                    <el-image
                            :preview-src-list="[info.idCard1_show]"
                            :src="info.idCard1_show">
                        <div slot="error" class="image-slot">
                            <el-image  :lazy="true"  fit="cover"  :src="require('../../../assets/image/error.png')">
                            </el-image>
                        </div>
                    </el-image>
                </el-col>
                <el-col :span="4" v-bind:class="['content-right']">
                    <span>法人身份证背面照：</span>
                </el-col>
                <el-col :span="3" v-bind:class="['content-left']">
                    <el-image
                            :preview-src-list="[info.idCard2_show]"
                            :src="info.idCard2_show">
                        <div slot="error" class="image-slot">
                            <el-image  :lazy="true"  fit="cover"  :src="require('../../../assets/image/error.png')">
                            </el-image>
                        </div>
                    </el-image>
                </el-col>
            </el-row>
        </el-main>
    </div>
</template>

<script>

export default {
  name: 'index',
  mounted () {
    this.initial()
  },
  data: function () {
    return {
      loading: false,
      info: {
        logo_show: '',
        businessLicense_show: '',
        idCard1_show: '',
        idCard2_show: ''
      },
      dialog: {
        dialogVisible: false,
        dialogPicSrc: ''
      }
    }
  },
  methods: {
    initial () {
      this.getInfo()
    },
    async getInfo () {
      const that = this
      try {
        that.loading = true
        let url = that.api.provider.basicInformation
        let obj = {
        }
        const response = await that.request.dataGet(that, url, obj)
        that.info = response.data
        that.info.logo_show = that.api.resource.lib + response.data.logo
        that.info.businessLicense_show = that.api.resource.lib + response.data.businessLicense
        that.info.idCard1_show = that.api.resource.lib + response.data.idCard1
        that.info.idCard2_show = that.api.resource.lib + response.data.idCard2
        that.loading = false
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    back () {
      history.go(-1)
    }
  }
}
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
    }
    .content-left {
        text-align: left;
    }

    .content-right {
        text-align: right;
    }

    .el-image {
        width: 158px;
        height: 100px;
    }

    span{
        line-height: 38px;
    }
</style>
