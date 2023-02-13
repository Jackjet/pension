<template>
  <el-main>
    <el-row>
      <el-col :span="11" style='margin: 0 30px 0 15px'>
        <el-row>
          <el-col class='title1' :span="24" style='border-bottom: 1px solid #CFCCCF' >
            <h3>新闻通知</h3>
            <!--<a href="">查看更多&nbsp;&nbsp;&gt;</a>-->
          </el-col>
        </el-row>
        <template v-for="(item, index) in content"   class='item'>
          <el-row class='item' v-if="item.icon">
            <el-col :span="10" style='margin-right: 15px;'>
              <img :src="item.icon" alt="" class='hand'  @click="navClick(item, index)">
            </el-col>
            <el-col :span="13" style="height: 111px;">
              <p class='info-elip hand' @click="navClick(item, index)">{{item.title}}</p>
              <p class='Time hand' @click="navClick(item, index)">{{item.createTime}}</p>
              <p class='digest hand' @click="navClick(item, index)">{{item.digest}}</p>
            </el-col>
          </el-row>
          <el-row v-else  class='item'>
            <el-col :span="24">
              <p class='info-elip hand' @click="navClick(item, index)">{{item.title}}</p>
              <p class='Time hand' @click="navClick(item, index)">{{item.createTime}}</p>
            </el-col>
          </el-row>
        </template>
      </el-col>
      <el-col :span="11">
        <el-row>
          <el-col class='title1' :span="24" style='border-bottom: 1px solid #CFCCCF'>
            <h3>政策法规</h3>
            <!--<a href="">查看更多&nbsp;&nbsp;&gt;</a>-->
          </el-col>
        </el-row>
        <template v-for="(item, index) in data"  class='item'>
          <el-row class='item' v-if="item.icon">
            <el-col :span="10" style='margin-right: 15px;'>
              <img :src="item.icon" class='hand' alt=""  @click="navClick(item, index)">
            </el-col>
            <el-col :span="13" style="height: 111px;">
              <p class='info-elip hand'  @click="navClick(item, index)">{{item.title}}</p>
              <p class='Time hand'  @click="navClick(item, index)">{{item.createTime}}</p>
              <p class='digest hand'  @click="navClick(item, index)">{{item.digest}}</p>
            </el-col>
          </el-row>
          <el-row v-else  class='item'>
            <el-col :span="24">
              <p class='info-elip hand'  @click="navClick(item, index)">{{item.title}}</p>
              <p class='Time hand'  @click="navClick(item, index)">{{item.createTime}}</p>
            </el-col>
          </el-row>
        </template>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>

export default {
  data () {
    return {
     info: {
       icon:'',
       title: '',
       createTime: '',
       digest: ''
     },
     content: [],
      data: []
    }
  },

  mounted () {
     this.getList('xwtz')
     this.getList('zcfg')
  },

  methods: {
    async getList (id) {
      const that = this
      try {
        let findUrl = this.api.Baseart.findAll
        let url = findUrl + '?page=1&size=4'
        let obj = {
          categoryId: id
        }
        const response = await this.request.dataGet(that, url, obj)
       if (id === 'xwtz') {
         response.data.content.forEach((item) => {
           if (item.icon) {
              item.icon = process.env.VUE_APP_FILE + item.icon
            }
         })
         that.content = response.data.content
       } else {
         response.data.content.forEach((item) => {
            if (item.icon) {
              item.icon = process.env.VUE_APP_FILE + item.icon
            }
          })
         that.data = response.data.content
       }
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    navClick (item, index) {
      document.name = item.categoryName
      this.$router.push({
        path: 'newsDetail',
        query: {
          id: item.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-main {
    background-color: #f7f7f7;
  }

  .el-col-11 {
    padding: 15px;
    background-color: #fff;
  }

  h3 {
    float: left;
    height: 96%;
    border-bottom: 3px solid #FF8016;
  }
  a {
    display: inline-block;
    float: right;
    text-decoration: none;
    color: #999;
    font-size: 14px;
  }
  .title1 {
    height: 40px;
  }
  img {
    width: 100%;
    height: 115px;
    float: left;
  }
  .item {
    margin-top: 15px;
    border-bottom: 1px dashed #E6E3E6;
    padding-bottom: 15px;
  }
  .info-elip {
    float: left;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    font-weight: 600;
  }
  p {
    text-align: left;
  }
  .Time {
    color: #999;
    margin-top: 30px;
    font-size: 14px;
  }
  .digest {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    margin-top: 5px;
    font-size: 15px;
    color: #656265;
  }
  .hand {
    cursor:pointer
  }
</style>
