<template>
  <div class="main">
    <div class="head">
      <span class="date">{{ year }}年{{ month }}月{{ day }}日</span>
      <span class="title">南开区智慧养老云平台</span>
    </div>
    <!-- @click.stop="nav('养老数据中心')" -->
    <div class="content">
      <div class="top" @mouseenter="showActive(1)" @mouseleave="showActive(0)">
        <div class="title">养老数据中心</div>
        <img :src="src1" />
      </div>
      <div class="middle">
        <div class="item" @mouseenter="showActive(2)" @mouseleave="showActive(0)" @click.stop="nav('智慧养老服务平台')">
          <div class="title">智慧养老云服务平台</div>
          <img :src="src2" />
        </div>
        <div class="item" @mouseenter="showActive(3)" @mouseleave="showActive(0)" @click.stop="nav('监管平台')">
          <div class="title">监督管理服务平台</div>
          <img :src="src3" />
        </div>
      </div>
      <div class="bottom" @mouseenter="showActive(4)" @mouseleave="showActive(0)" @click.stop="nav('大数据分析平台')">
        <div class="title">老人信息大数据分析平台</div>
        <img :src="src4" />
      </div>
    </div>
    <!-- <sidebar v-show="false" :MenuId="MenuId"></sidebar> -->
    <iframe id="audioId" style="display: none" allow="autoplay" :src="webUrl"></iframe>
  </div>
</template>

<script>
let off1 = require("../../assets/image/off-1.png");
let on1 = require("../../assets/image/on-1.png");
let off2 = require("../../assets/image/off-2.png");
let on2 = require("../../assets/image/on-2.png");
let off3 = require("../../assets/image/off-3.png");
let on3 = require("../../assets/image/on-3.png");
let off4 = require("../../assets/image/off-4.png");
let on4 = require("../../assets/image/on-4.png");
// import sidebar from 'template/navMenu'
export default {
  // components: { sidebar },
  data() {
    return {
      webUrl: process.env.VUE_APP_URL + '/audio/94830f5b052943f2b1fa63b84c20c151.mp3',
      year: "",
      month: "",
      day: "",
      src1: off1,
      src2: off2,
      src3: off3,
      src4: off4,
      active: 0,
    };
  },
  mounted() {
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth() + 1;
    this.day = new Date().getDate();
    document.title = "南开区智慧养老云平台";
  },
  methods: {
    showActive(index) {
      switch (index) {
        case 1:
          this.src1 = on1;
          break;
        case 2:
          this.src2 = on2;
          break;
        case 3:
          this.src3 = on3;
          break;
        case 4:
          this.src4 = on4;
          break;
        default:
          this.src1 = off1;
          this.src2 = off2;
          this.src3 = off3;
          this.src4 = off4;
      }
    },
    async nav(name) {
      let url = this.api.my.MenuTree;
      const response = await this.request.dataGet(this, url, {});
      if (response.code === 0 || response.data.length === 0) {
        return;
      }
      let Data = response.data[0].childs;
      Data.forEach((item) => {
        if (item.entity.name === name) {
          // console.log(item.childs[0], 0)
          // this.parseJson(item.childs)
          this.routeFn(item.childs[0], 0);
        }
      });
    },
    // parseJson(arr) {
    //   if (Array.isArray(arr[0].childs)) {
    //     this.parseJson(arr[0].childs);
    //   } else {
    //     // let path = arr[0].entity.route
    //     // let outOpen = arr[0].entity.outOpen
    //     this.routeFn(arr[0].entity.route)
    //     return
    //   }
    // },
    async routeFn(row, index) {
      if (row.entity.outOpen === "1") {
        // let icon = row.entity.icon2
        // this.common.session('icon', icon)
        window.localStorage.setItem(
          "currentDataUser",
          JSON.stringify(this.common.session("currentUser"))
        );
        // this.$router.push("/index/newsView");
        window.open(row.entity.route);
        return;
      }
      // 呼叫中心
      if (row.entity.route === "hjzx") {
        let icon = row.entity.icon2;
        // this.common.session("icon", icon);
        // this.$router.push("/index/newsView");
        // window.open(" http://39.102.73.127/nankai/iot/index.html#/login");
        try {
          let url = this.api.ivr.loginCallback;
          let response = await this.request.dataGet(this, url, {});
          this.$jsonp(response.data)
            .then((row) => {
              this.common.session("icon", icon);
              window.open(row.data.url);
              this.$router.push("/index/newsView");
            })
            .catch((err) => {
              // console.log(err);
            });
        } catch (err) {
          this.$message.error(err.msg);
        }
        return;
      }
      if (row.childs[0].entity.haveChild === "1") {
        if (row.childs[0].childs[0].entity.haveChild === "1") {
          this.$router.push({
            path: row.childs[0].childs[0].childs[0].entity.route,
          });
          this.common.session("menuMessage", {
            platform: row.entity.platform,
            index: index,
            route: row.childs[0].childs[0].childs[0].entity.route,
          });
        } else {
          this.$router.push({
            path: row.childs[0].childs[0].entity.route,
          });
          this.common.session("menuMessage", {
            platform: row.entity.platform,
            index: index,
            route: row.childs[0].childs[0].entity.route,
          });
        }
      } else {
        this.$router.push({
          path: row.childs[0].entity.route,
        });
        this.common.session("menuMessage", {
          platform: row.entity.platform,
          index: index,
          route: row.childs[0].entity.route,
        });
      }
      let menu = [];
      if (row.entity.haveChild === "1") {
        row.childs.forEach((item, index) => {
          let subs = [];
          if (item.entity.haveChild === "0") {
            menu.push({
              id: item.entity.orderNum,
              icon: "Admin Admin-ziliaoku",
              title: item.entity.name,
              index: "/index/" + item.entity.route,
            });
          } else {
            item.childs.forEach((data) => {
              if (data.entity.haveChild === "0") {
                subs.push({
                  id: data.entity.orderNum,
                  title: data.entity.name,
                  index: "/index/" + data.entity.route,
                });
              } else {
                let arr = [];
                data.childs.forEach((val) => {
                  arr.push({
                    id: val.entity.orderNum,
                    title: val.entity.name,
                    index: "/index/" + val.entity.route,
                  });
                });
                subs.push({
                  id: data.entity.orderNum,
                  title: data.entity.name,
                  index: data.entity.orderNum + "",
                  subs: arr,
                });
              }
            });
            menu.push({
              id: item.entity.orderNum,
              icon: "Admin Admin-ziliaoku",
              title: item.entity.name,
              index: item.entity.orderNum + "",
              subs: subs,
            });
          }
        });
      }
      this.$router.push("/index");
    },
  },
};
</script>

<style lang="scss">
@import "selectNav.scss";
</style>
