<template>
    <el-col :span='24' class='header'>
        <h3 class='logo' :style="{width:'500px'}">您好，欢迎来到天津市南开区智慧养老服务商管理端</h3>
        <div class='keep_right'>
            <el-dropdown trigger="click" v-if="index">
        <span class="el-dropdown-link userinfo-inner">
          <img src="../../assets/image/admin1.png"/>{{UserName}}
          <i class='el-icon-caret-bottom'></i>
        </span>
                <el-dropdown-menu slot="dropdown">
                    <template v-for='(item, index) in downUp'>
                        <el-dropdown-item :key='index' :divided='item.divided' @click.native='UserOption(index)'>
                            <template v-if='item.type === "down"'>{{item.label}}</template>
                            <el-badge is-dot v-if="item.type === 'message'"
                                      :value="0" :max="99" class="item">{{item.label}}
                            </el-badge>
                        </el-dropdown-item>
                    </template>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-dialog :visible.sync="dialogTableVisible" top='20vh'>
            <div>
                <template v-for='(item, index) in this.color'>
                    <el-radio v-model="radio" @change='openColor' :label="item.label" :key='index' v-if="index < 3">
                        {{item.name}}
                        <div class='color' :style='"background:" + item.bgColor'></div>
                    </el-radio>
                </template>
            </div>
            <div>
                <template v-for='(item, index) in this.color'>
                    <el-radio v-model="radio" @change='openColor' :label="item.label" :key='index' v-if="index > 2">
                        {{item.name}}
                        <div class='color' :style='"background:" + item.bgColor'></div>
                    </el-radio>
                </template>
            </div>
        </el-dialog>
    </el-col>
</template>

<script>
// import md5 from 'js-md5'
import { toggleClass } from 'store/module/class'

export default {
  props: {
    index: Boolean
  },

  data () {
    return {
      /**
       * 下拉用户管理
       */
      downUp: [
          {
          label: '修改密码',
          divided: false,
          type: 'down'
        },
        // {
        //   label: '选择主题',
        //   divided: true,
        //   type: 'down'
        // },
        {
          label: '退出登录',
          divided: true,
          type: 'down'
        }],

      dialogTableVisible: false,
      // 填充主题颜色
      radio: this.$store.state.theme.themeColor,
      // 获取登陆用户名称
      UserName: this.common.session('currentUser').name,

      /**
       * 背景主题
       */
      color: [{
        name: '典雅绿',
        label: 'green',
        bgColor: '#41986a'
      },
      {
        name: '深空蓝',
        label: 'default',
        bgColor: '#20a0ff'
      },
      {
        name: '贵族紫',
        label: 'purple',
        bgColor: '#b539ab'
      },
      {
        name: '魅力橙',
        label: 'yellow',
        bgColor: '#e6a23c'
      },
      {
        name: '铁锈红',
        label: 'red',
        bgColor: '#dd5c5c'
      },
      {
        name: '深度灰',
        label: 'blackGreen',
        bgColor: '#526379'
      }]
    }
  },

  /**
   * 初始化定义获取主题类
   */
  mounted () {
    const cookie = this.cookies.get('theme')
    toggleClass(document.body, 'custom-' + cookie)
  },

  methods: {
    /**
     * 设置主题颜色 动态存储记录
     */
    openColor (command) {
      this.cookies.set('theme', command)
      toggleClass(document.body, 'custom-' + command)
    },

    UserOption (index) {
      /**
       * 根据下拉索引添加对应事件
       */
      if (index === 0) {
        this.$emit('changePsd')
      }

      // if (index === 1) {
      //   this.dialogTableVisible = true
      // }

      if (index === 1) {
        // 退出当前用户登录 调用模态框
        this.$confirm('是否退出登录?', '提示', { type: 'warning' }).then(() => {
          this.$router.push('/login')

          // 清除用户信息
          this.common.session('currentUser', null)
        }).catch(() => {
          return false
        })
      }
    }
  }
}
</script>
