<template>
    <div>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="4" :offset="10">
                    <!--<img :src="info.icon_show" v-if="info.icon!==null && info.icon!==''"-->
                    <!--style="height: 150px;width: 150px"-->
                    <!--:preview-src-list="info.icon_show">-->
                    <!--<img v-if="info.icon===null || info.icon===''"-->
                    <!--style="height: 150px;width: 150px" :src="require('../../../../assets/image/error.png')"-->
                    <!--:preview-src-list="[require('../../../../assets/image/error.png')]">-->
                    <el-image
                            v-if="info.icon_show"
                            style="width: 150px; height: 150px"
                            :src="info.icon_show"
                            fit="fill"
                            :preview-src-list="[info.icon_show]">
                        <div slot="error" class="image-slot">
                            <el-image style="width: 150px; height: 150px"
                                      :lazy="true" fit="cover" :src="require('../../../../assets/image/error.png')"
                                      :preview-src-list="[require('../../../../assets/image/error.png')]">
                            </el-image>
                        </div>
                    </el-image>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3" :offset="9" :class="['content-right']">
                    <span>姓名：</span>
                </el-col>
                <el-col :span="3" :class="['content-left']">
                    <div>{{info.name}}</div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3" :offset="9" :class="['content-right']">
                    <span>性别：</span>
                </el-col>
                <el-col :span="3" :class="['content-left']">
                    <div>{{info.sex_show}}</div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3" :offset="9" :class="['content-right']">
                    <span>年龄：</span>
                </el-col>
                <el-col :span="3" :class="['content-left']">
                    <div>{{info.age}}</div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3" :offset="9" :class="['content-right']">
                    <span>联系电话：</span>
                </el-col>
                <el-col :span="3" :class="['content-left']">
                    <div>{{info.phone}}</div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3" :offset="3" v-bind:class="['content-right']">
                    <span>身份证正面照：</span>
                </el-col>
                <el-col :span="6" v-bind:class="['content-left']">
                    <el-image
                            :preview-src-list="[info.idCard1]"
                            :src="info.idCard1">
                    </el-image>
                </el-col>
                <el-col :span="3" v-bind:class="['content-right']">
                    <span>身份证背面照：</span>
                </el-col>
                <el-col :span="6" v-bind:class="['content-left']">
                    <el-image
                            :preview-src-list="[info.idCard2]"
                            :src="info.idCard2">
                    </el-image>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3" :offset="9" v-bind:class="['content-right']">
                    <span>现居住地址：</span>
                </el-col>
                <el-col :span="5" v-bind:class="['content-left']">
                    <div>{{info.address}}</div>
                </el-col>
            </el-row>
        </el-main>
    </div>
</template>

<script>
import options from '../../../../assets/js/options'

export default {
  name: 'index',
  props: ['id'],
  mounted () {
    this.initial()
  },
  data: function () {
    return {
      info: {
        idCard1: '',
        idCard2: ''
      }
    }
  },
  methods: {
    async initial () {
      const that = this
      try {
        let url = this.api.servant.findById
        let obj = {
          'id': that.id
        }
        const response = await this.request.dataGet(that, url, obj)
        that.info = response.data
        that.info.sex_show = that.getLabelByValue(response.data.sex, options.gender)
        that.info.icon_show = that.api.resource.lib + response.data.icon
        if (response.code === 1) {
        } else {
          that.$message.error(response.msg)
        }
      } catch (even) {
        that.$message.error('数据获取失败')
      }
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

    .content-right {
        text-align: right;
    }

    .el-col {
        line-height: 38px;
    }

    .el-image {
        width: 158px;
        height: 180px;
    }
</style>
