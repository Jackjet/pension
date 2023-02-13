<template>
  <el-scrollbar class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="$route.path" :collapse="collapse" unique-opened router>
      <template v-for="item in menuTree">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.id">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.id">{{
                subItem.title
              }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.id">
            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import transmit from "directive/transmit";
import menu from "js/menu";

export default {
  props: {
    message: Boolean,
    default: () => { },
    MenuId: {
      type: Array,
      default: [],
    },
  },

  data() {
    return {
      // 接收动态传输事件
      collapse: false,
      // 接收导航树
      menuTree: menu.menuTree6,
    };
  },
  watch: {
    MenuId(val) {
      //      this.getData(val)
      this.menuTree = val;
    },
  },
  created() {
    //    this.getData(this.common.session('navLabel'))
    transmit.$on("collapse", (msg) => {
      this.collapse = msg;
    });
  },
  methods: {
    async getData(val) {
      const that = this;
      if (that.common.session("navLabel") === "111") {
        that.menuTree = menu.menuTree6;
        return;
      }
      try {
        let url = this.api.MenuTree.findByMenuId;
        let obj = {
          menuId: val,
        };
        let menu = [];
        const response = await that.request.dataGet(that, url, obj);
        if (!response.data.children) {
          return;
        }
        response.data.children.forEach((item) => {
          let subs = [];
          if (item.haveChild === "0") {
            menu.push({
              id: item.orderNum,
              icon: "Admin Admin-ziliaoku",
              title: item.name,
              index: "/index/" + item.route,
            });
          } else {
            if (item.children) {
              item.children.forEach((data) => {
                if (data.haveChild === "0") {
                  subs.push({
                    id: data.orderNum,
                    title: data.name,
                    index: "/index/" + data.route,
                  });
                } else {
                  let arr = [];
                  data.children.forEach((val) => {
                    arr.push({
                      id: val.orderNum,
                      title: val.name,
                      index: "/index/" + val.route,
                    });
                  });
                  subs.push({
                    id: data.orderNum,
                    title: data.name,
                    index: data.orderNum + "",
                    subs: arr,
                  });
                }
              });
            }
            menu.push({
              id: item.orderNum,
              icon: "Admin Admin-ziliaoku",
              title: item.name,
              index: item.orderNum + "",
              subs: subs,
            });
          }
        });
        that.menuTree = menu;
      } catch (even) {
        // console.log(even);
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 270px;
  bottom: 0;
  overflow-y: hidden;
  z-index: 999;
  text-align: left;
  &::-webkit-scrollbar {
    width: 0;
  }
  ul {
    height: 100%;
  }
  .Admin {
    font-size: 22px;
    margin-right: 10px;
  }
}

.el-scrollbar {
  height: calc(100% - 43px);
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}

.sidebar-el-menu {
  &:not(.el-menu--collapse) {
    width: 230px;
  }
}
</style>
