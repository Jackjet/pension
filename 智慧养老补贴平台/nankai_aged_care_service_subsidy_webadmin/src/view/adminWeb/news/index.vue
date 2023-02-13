<template>
  <!-- 我的消息 -->
  <div class="news-list-page">
    <div class="news-list">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="0">未读消息</el-menu-item>
        <el-menu-item index="1">已读消息</el-menu-item>
      </el-menu>
      <ul class="news-item-box">
        <li v-for="item in dataList" :key="item.id">
          <span>{{item.content}}</span>
          <span>{{item.createTime}}</span>
          <span v-if='activeIndex == 0' @click="signClick(item.id)">标记为已读</span>
        </li>
      </ul>
      <div style="height:50px">
        <Pagination :total="total" @pageChange="pageChange"></Pagination>
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/table/pagination";
import { userIfo} from "@/api/file.js";
import { subsidyMessageFindAll, subsidyMessageChangeStatus } from "@/api/theElderly/apply.js";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      activeIndex: '0',
      total: 0,
      dataList: [],
      page: 1,
      size: 10,
      receiver:userIfo().id
    }
  },
  mounted() {
    this.newsList(this.activeIndex, this.size, this.page);
    // this.receiver = userIfo().id
    console.log(this.receiver)
  },
  methods: {
    newsList(index, size, page) {
      subsidyMessageFindAll({ readStatus: index, size, page,receiver:this.receiver,businessType:1 }).then(res => {
        if (res.data.code === 1) {
          this.dataList = res.data.data.content;
          this.total = res.data.data.totalElements;
        }
      })
    },
    handleSelect(key, keyPath) {
      this.activeIndex = key;
      this.page = 1;
      this.siae = 10;
      this.newsList(this.activeIndex, this.size, this.page);
    },
    pageChange(val) {
      this.page = val.page;
      this.siae = val.limit;
      this.newsList(this.activeIndex, val.limit, val.page);
    },
    signClick(id) {
      subsidyMessageChangeStatus({ id }).then(res => {
        if (res.data.code === 1) {
          this.$message.success(res.data.msg);
          this.newsList(this.activeIndex, this.size, this.page);
        } else {
          this.$message.error(res.data.msg);
        }
      })
    }
  }
}
</script>
<style lang="scss" scope>
.news-list-page {
  padding: 0 50px;
  .news-list {
    margin-top: 20px;
    box-shadow: $back-shadow;
    border-radius: 5px;
    padding: 20px;
    .news-item-box {
      line-height: 40px;
      margin-top: 50px;
      border-top: 1px solid #ccc;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      li {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        padding: 0 20px;
      }
      li span:nth-child(1) {
        flex: 1;
      }
      li span:nth-child(2) {
        width: 200px;
      }
      li span:nth-child(3) {
        width: 100px;
        cursor: pointer;
        color: $color1;
      }
    }
  }
}
</style>