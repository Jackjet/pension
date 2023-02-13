<template>
    <div>
        <el-main>

            <el-row :gutter="20">
                <el-col :span="4" :offset="8">
                    <el-image
                            :preview-src-list="[icon_show]"
                            :src="icon_show"
                            style="height: 100px;width: 100px">
                        <!--<div slot="error" class="image-slot">-->
                            <!--<el-image  :lazy="true"  fit="fill"  :src="require('../../../assets/image/error.png')"-->
                                       <!--style="height: 100px;width: 100px"-->
                                       <!--:preview-src-list="[require('../../../assets/image/error.png')]">-->
                            <!--</el-image>-->
                        <!--</div>-->
                    </el-image>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3" :offset="7" :class="['content-right']">
                    <span>姓名：</span>
                </el-col>
                <el-col :span="3" :class="['content-left']">
                    <div>{{info.name}}</div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3" :offset="7" :class="['content-right']">
                    <span>性别：</span>
                </el-col>
                <el-col :span="3" :class="['content-left']">
                    <div>{{info.sex_show}}</div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3" :offset="7" :class="['content-right']">
                    <span>年龄：</span>
                </el-col>
                <el-col :span="3" :class="['content-left']">
                    <div>{{info.age}}</div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3" :offset="7" :class="['content-right']">
                    <span>联系电话：</span>
                </el-col>
                <el-col :span="3" :class="['content-left']">
                    <div>{{info.phone}}</div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3" :offset="7" v-bind:class="['content-right']">
                    <span>身份证正面照：</span>
                </el-col>
                <el-col :span="6" v-bind:class="['content-left']">
                    <el-image
                            :preview-src-list="[info.idCard1]"
                            :src="info.idCard1">
                        <div slot="error" class="image-slot">
                            <el-image :lazy="true" fit="fill" :src="require('../../../assets/image/error.png')"
                                      :preview-src-list="[require('../../../assets/image/error.png')]">
                            </el-image>
                        </div>
                    </el-image>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3" :offset="7" v-bind:class="['content-right']">
                    <span>身份证背面照：</span>
                </el-col>
                <el-col :span="6" v-bind:class="['content-left']">
                    <el-image
                            :preview-src-list="[info.idCard2]"
                            :src="info.idCard2">
                        <div slot="error" class="image-slot">
                            <el-image :lazy="true" fit="fill" :src="require('../../../assets/image/error.png')"
                                      :preview-src-list="[require('../../../assets/image/error.png')]">
                            </el-image>
                        </div>
                    </el-image>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3" :offset="7" v-bind:class="['content-right']">
                    <span>现居住地址：</span>
                </el-col>
                <el-col :span="5" v-bind:class="['content-left']">
                    <span>{{info.address}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4" :offset="8">
                    <el-button type="primary" size='medium' @click="back">返回</el-button>
                </el-col>
            </el-row>
        </el-main>
    </div>
</template>

<script>
import options from '../../../assets/js/options'

export default {
  name: 'index',
  mounted () {
    this.initial()
  },
  data: function () {
    return {
      info: {
        idCard1: '',
        idCard2: ''
      },
      icon_show: ''
    }
  },
  methods: {
    async initial () {
      const that = this
      try {
        let url = this.api.servant.findById
        let obj = {
          'id': that.$route.params.id
        }
        const response = await this.request.dataGet(that, url, obj)
        that.info = response.data
        that.info.sex_show = that.getLabelByValue(response.data.sex, options.gender)
        // that.info.icon_show = that.api.resource.lib + response.data.icon
        that.icon_show = response.data.icon ? that.api.resource.lib + response.data.icon : that.errorImg

        if (response.code === 1) {
          // that.$message.success(response.msg)
        } else {
          that.$message.error(response.msg)
        }
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    back () {
      history.go(-1)
    },
    getLabelByValue: function (value, array) {
      var result = ''
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
    .el-row {
        margin-bottom: 20px;
    }

    .content-left {
        text-align: left;
    }

    .el-col {
        line-height: 38px;
    }
    .content-right {
        text-align: right;
    }

    .el-image {
        width: 158px;
        height: 100px;
    }

    span {
        white-space: normal;
        word-break: break-all;
    }
</style>
