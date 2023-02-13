<template>
  <el-col :span="24" class="header">
    <div class="logo">
      <img src="../../assets/image/logo1.png" />
    </div>
    <div class="keep_right">
      <img class="t-icon" src="../../assets/image/time.png" />
      <span class="date" style="margin-right: 25px">{{ year }}年{{ month }}月{{ day }}日</span>
      <div class="el-dropdown" trigger="click" v-if="index">
        <span class="userinfo-inner"> 您好，{{ UserName }} </span>
      </div>
      <span class="header-title" style="margin-right: 25px" @click="UserOption(1)">注销</span>
      <span class="header-title" @click="UserOption(2)">返回首页</span>
    </div>
    <div class="menu">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="(item, index) in data" :key="index" :style="'width:' + item.childs.length * 111 + 'px'">
          <ul class="data" :class="parentIndex === index ? 'active' : ''">
            <p>{{ item.entity.name }}</p>
            <div class="menu-item">
              <li class="hand" v-for="(val, num) in item.childs" :key="num" @click="navClick(val, num, index)">
                <img :src="val.entity.icon1" alt="" />
                <p>{{ val.entity.name }}</p>
              </li>
            </div>
            <!-- <li
              class="hand"
              v-for="(val, num) in item.childs"
              :key="num"
              @click="navClick(val, num, index)"
            >
              <img :src="val.entity.icon1" alt="" />
              <p>{{ val.entity.name }}</p>
            </li> -->
          </ul>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-next" slot="pagination"></div>
      <div class="swiper-button-prev" slot="pagination"></div>
    </div>
    <el-dialog :visible.sync="dialogTableVisible" top="20vh">
      <div>
        <template v-for="(item, index) in this.color">
          <el-radio v-model="radio" @change="openColor" :label="item.label" :key="index" v-if="index < 3">
            {{ item.name }}
            <div class="color" :style="'background:' + item.bgColor"></div>
          </el-radio>
        </template>
      </div>
      <div>
        <template v-for="(item, index) in this.color">
          <el-radio v-model="radio" @change="openColor" :label="item.label" :key="index" v-if="index > 2">
            {{ item.name }}
            <div class="color" :style="'background:' + item.bgColor"></div>
          </el-radio>
        </template>
      </div>
    </el-dialog>
  </el-col>
</template>

<script>
// import md5 from 'js-md5'
import { toggleClass } from 'store/module/class'
import menu from 'js/menu'

export default {
  props: {
    index: Boolean,
  },

  data() {
    return {
      year: '',
      month: '',
      day: '',
      swiperOptions: {
        slidesPerView: 'auto',
        spaceBetween: 15,
        observer: true,
        observerParents: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      data: [],
      arr: [],
      arr1: [],
      arr2: [],
      arr3: [],
      arr4: [],
      icon: require('../../assets/image/8.png'),
      icon2: require('../../assets/image/8-8.png'),
      oldRow: '',
      /**
       * 下拉用户管理
       */
      downUp: [],

      dialogTableVisible: false,
      // 填充主题颜色
      radio: this.$store.state.theme.themeColor,
      // 获取登陆用户名称
      UserName: this.common.session('currentUser').name,

      /**
       * 背景主题
       */
      color: [
        {
          name: '典雅绿',
          label: 'green',
          bgColor: '#41986a',
        },
        {
          name: '深空蓝',
          label: 'default',
          bgColor: '#20a0ff',
        },
        {
          name: '贵族紫',
          label: 'purple',
          bgColor: '#b539ab',
        },
        {
          name: '魅力橙',
          label: 'yellow',
          bgColor: '#e6a23c',
        },
        {
          name: '铁锈红',
          label: 'red',
          bgColor: '#dd5c5c',
        },
        {
          name: '深度灰',
          label: 'blackGreen',
          bgColor: '#526379',
        },
      ],
      parentIndex: null,
    }
  },

  /**
   * 初始化定义获取主题类
   */
  mounted() {
    this.year = new Date().getFullYear()
    this.month = new Date().getMonth() + 1
    this.day = new Date().getDate()
    const cookie = this.cookies.get('theme')
    this.cookies.set('theme', 'blackGreen')
    toggleClass(document.body, 'custom-' + cookie)
    this.getMenuTree()
  },

  methods: {
    async getMenuTree() {
      const that = this
      try {
        let url = this.api.my.MenuTree
        let obj = {}
        let num = that.common.session('menuMessage').index
        const response = await that.request.dataGet(that, url, obj)
        if (response.code === 0 || response.data.length === 0) {
          return
        }
        response.data[0].childs.forEach((item, index) => {
          item.childs.forEach((data, i) => {
            if (!data.entity.icon) {
              data.entity.icon = that.icon
            } else {
              data.entity.icon = process.env.VUE_APP_FILE + data.entity.icon
            }
            if (!data.entity.icon2) {
              data.entity.icon2 = that.icon2
            } else {
              data.entity.icon2 = process.env.VUE_APP_FILE + data.entity.icon2
            }
            data.entity.icon1 = data.entity.icon
            // console.log(item.entity.platform + '   ' + that.common.session('menuMessage').platform)
            // if (
            //   item.entity.platform ===
            //   that.common.session('menuMessage').platform &&
            //   i === num
            // ) {
            //   item.childs[num].entity.icon = item.childs[num].entity.icon1
            //   item.childs[num].entity.icon1 = item.childs[num].entity.icon2
            //   that.oldRow = item.childs[num]
            //   that.navClick(item.childs[num], num, index)
            // }

          })
        })
        let arr = response.data[0].childs.filter(item => {
          return item.entity.name !== '大数据分析平台' && item.entity.name !== '监管平台'
        })
        that.data = arr
        this.sessionIcon()
      } catch (even) {
        // console.log(even)
        that.$message.error('数据获取失败')
      }
    },
    sessionIcon() {
      const sessionIcon = this.common.session('icon')
      if (sessionIcon) {
        this.data.forEach((item, index) => {
          if (
            item.entity.name === '监管平台' &&
            item.childs &&
            item.childs.length > 0
          ) {
            this.parentIndex = index
            item.childs.forEach((val, index) => {
              if (index === 0) {
                val.entity.icon1 = val.entity.icon2
              }
            })
          }
        })
      } else {
        this.data.forEach((item, index) => {
          if (
            item.entity.name === '监管平台' &&
            item.childs &&
            item.childs.length > 0
          ) {
            item.childs.forEach((val, index) => {
              val.entity.icon1 = val.entity.icon
            })
          }
        })
      }
    },
    /**
     * 设置主题颜色 动态存储记录
     */
    openColor(command) {
      this.cookies.set('theme', command)
      toggleClass(document.body, 'custom-' + command)
    },

    /**
     * PUT 请求修改密码
     * @param url 请求地址
     * @param parameter 请求参数
     */
    async modifyPassWord(url, parameter) {
      try {
        await this.request.dataPut(this, url, parameter)
        // 修改成功 自定义提示语
        this.$message.success('密码修改成功')

        // 清除用户信息重新登录
        this.common.session('navLabel', null)
        this.common.session('currentUser', null)

        // 返回登陆 重新登陆账户
        this.$router.push('/login')
      } catch (err) {
        this.$message.error(err.msg)
      }
    },

    UserOption(index) {
      if (index === 0) {
        this.dialogTableVisible = true
      }

      if (index === 1) {
        // 退出当前用户登录 调用模态框
        this.$confirm('是否退出登录?', '提示', { type: 'warning' })
          .then(() => {
            this.$router.push('/login')

            // 清除用户信息
            this.common.session('icon', null)
            this.common.session('currentUser', null)
            this.common.session('navLabel', '111')
            this.$emit('navLabel', menu.menuTree6, true)
          })
          .catch(() => {
            return false
          })
      }

      if (index === 2) {
        this.$router.push({
          path: '/selectNav',
        })
        this.common.session('icon', null)
        this.common.session('menuMessage', '')
        if (this.oldRow) {
          this.oldRow.entity.icon1 = this.oldRow.entity.icon
          this.common.session('navLabel', '111')
          this.$emit('navLabel', menu.menuTree6, true)
        }
      }
    },
    async navClick(row, index, parentIndex) {
      this.parentIndex = parentIndex
      const sessionIcon = this.common.session('icon')
      if (sessionIcon) {
        this.common.session('icon', null)
        this.sessionIcon()
      }
      let menu = []
      if (this.oldRow) {
        this.oldRow.entity.icon1 = this.oldRow.entity.icon
      }
      row.entity.icon1 = row.entity.icon2
      this.oldRow = row
      this.common.session('navLabel', row.entity.id)
      if (row.entity.outOpen === '1') {
        // console.log(row.entity.route, "==========");
        window.localStorage.setItem(
          'currentDataUser',
          JSON.stringify(this.common.session('currentUser'))
        )
        window.open(row.entity.route)
        return
      }
      // 呼叫中心
      if (row.entity.route === 'hjzx') {
        try {
          let url = this.api.ivr.loginCallback
          let response = await this.request.dataGet(this, url, {})
          window.open(response.data)
        } catch (err) {
          this.$message.error(err.msg)
        }
        return
      }
      if (row.childs[0].entity.haveChild === '1') {
        if (row.childs[0].childs[0].entity.haveChild === '1') {
          this.$router.push({
            path: row.childs[0].childs[0].childs[0].entity.route,
          })
          this.common.session('menuMessage', {
            platform: row.entity.platform,
            index: index,
            route: row.childs[0].childs[0].childs[0].entity.route,
          })
        } else {
          this.$router.push({
            path: row.childs[0].childs[0].entity.route,
          })
          this.common.session('menuMessage', {
            platform: row.entity.platform,
            index: index,
            route: row.childs[0].childs[0].entity.route,
          })
        }
      } else {
        this.$router.push({
          path: row.childs[0].entity.route,
        })
        this.common.session('menuMessage', {
          platform: row.entity.platform,
          index: index,
          route: row.childs[0].entity.route,
        })
      }
      if (row.entity.haveChild === '1') {
        row.childs.forEach((item, index) => {
          let subs = []
          if (item.entity.haveChild === '0') {
            menu.push({
              id: item.entity.orderNum,
              icon: 'Admin Admin-ziliaoku',
              title: item.entity.name,
              index: '/index/' + item.entity.route,
            })
          } else {
            item.childs.forEach((data) => {
              if (data.entity.haveChild === '0') {
                subs.push({
                  id: data.entity.orderNum,
                  title: data.entity.name,
                  index: '/index/' + data.entity.route,
                })
              } else {
                let arr = []
                data.childs.forEach((val) => {
                  arr.push({
                    id: val.entity.orderNum,
                    title: val.entity.name,
                    index: '/index/' + val.entity.route,
                  })
                })
                subs.push({
                  id: data.entity.orderNum,
                  title: data.entity.name,
                  index: data.entity.orderNum + '',
                  subs: arr,
                })
              }
            })
            menu.push({
              id: item.entity.orderNum,
              icon: 'Admin Admin-ziliaoku',
              title: item.entity.name,
              index: item.entity.orderNum + '',
              subs: subs,
            })
          }
        })
      }
      this.$emit('navLabel', menu, true)
    },
  },
}
</script>

<style scoped>
.swiper-button-next {
  top: 155px;
  right: 1px;
}

.swiper-button-prev {
  top: 155px;
  left: 3px;
}

.swiper-button-next:after,
.swiper-button-prev:after {
  font-size: 39px;
}

.hand {
  cursor: pointer;
}

.active {
  box-shadow: rgb(11, 234, 235) 0px 0px 18px inset;
}
</style>
