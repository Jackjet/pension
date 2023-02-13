<template>
  <el-main class="orderAdd">
    <!-- 主模块 -->
    <el-col :span="24" class="ta-l">
      <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="120px">
        <!-- 模块一15642037867 -->
        <div class="hander">老人信息</div>
        <el-row class='el-row-el'>
          <el-col :span="12">
            <el-form-item label="老人电话">
              <el-input :disabled="isPhone" v-model="infoForm.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工单号" prop="workOrderNo">
              <el-input disabled v-model="infoForm.workOrderNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="12">
            <el-form-item label="身份证号" prop="manIdCard">
              <el-input :disabled="isManIdCard" v-model="infoForm.manIdCard" @change="idCardChange"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="manName">
              <el-input :disabled="isManName" v-model="infoForm.manName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="12">
            <el-form-item label="出生日期" prop="birthday">
              <el-input :disabled="isBirthday" v-model="infoForm.birthday"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-input :disabled="isAge" v-model="infoForm.age"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el' style="text-align: left;">
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-radio :disabled="isSex" v-model="infoForm.sex" label="1">男</el-radio>
              <el-radio :disabled="isSex" v-model="infoForm.sex" label="0">女</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-show="isAgeShow">
          <el-row class='el-row-el'>
            <el-col :span="8">
              <el-form-item label="户籍地、区" :required="true">
                <el-input value="天津市市辖区南开区" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属街道" style="text-align:left" prop="homeStreetId" :required="isHaveTo">
                <el-select style="width: 100%;" v-model="infoForm.homeStreetId" placeholder="请选择所属街道" @change='street'>
                  <el-option v-for="item in streetList" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属社区" style="text-align:left" prop="homeCommunityId" :required="isHaveTo">
                <el-select style="width: 100%;" v-model="infoForm.homeCommunityId" placeholder="请选择所属社区">
                  <el-option v-for="item in communityList" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class='el-row-el'>
            <el-col :span="24">
              <el-form-item label="户籍地详细地址" prop="registerAddress" :required="isHaveTo">
                <el-input type="textarea" v-model="infoForm.registerAddress"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-row class='el-row-el' style="text-align: left;">
          <el-col :span="12">
            <el-form-item label="服务电话" prop="manPhone">
              <el-input v-model="infoForm.manPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="8">
            <el-form-item label="服务地址" :required="true">
              <el-input value="天津市市辖区南开区" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务街道" style="text-align:left" prop="streetId">
              <el-select clearable style="width: 100%;" v-model="infoForm.streetId" placeholder="请选择服务街道" @change='street'>
                <el-option v-for="item in streetList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务社区" style="text-align:left" prop="communityId">
              <el-select clearable style="width: 100%;" v-model="infoForm.communityId" placeholder="请选择服务社区">
                <el-option v-for="item in communityList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="24">
            <el-form-item label="服务详情地址" prop="address">
              <el-input type="textarea" v-model="infoForm.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 模块二 -->
        <div class="hander">服务项信息</div>
        <el-row class='el-row-el' style="margin-bottom:10px;">
          <el-col :span="24">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane style="text-align: left;" v-for="(item, index) in serviceTypeList" :key="index" :label="item.serviceType1Name" :name="item.serviceType1Name">
                <div v-for="(items, index) in item.serviceType2VmList" :key="index">
                  <template v-if="items.serviceProjectVmList.length>0">
                    <div style="border-bottom: 1px solid #000;padding:5px 0;margin-bottom:5px;">
                      {{ items.serviceType2Name }}
                    </div>
                    <div v-for="(itemVm, index) in items.serviceProjectVmList" :key="index" style="margin-bottom:10px">
                      <el-radio v-model="infoForm.serviceProId" @change="radioChange" :label="itemVm">
                        {{ itemVm.serviceProjectName }}&nbsp;&nbsp;&nbsp;&nbsp;
                        <span v-if="itemVm.type == '0'">服务时长{{ itemVm.time }}小时&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        服务金额￥{{ (itemVm.minMoney / 100).toFixed(2) }} 至 {{ (itemVm.maxMoney / 100).toFixed(2) }}
                      </el-radio>
                    </div>
                    <!-- <el-checkbox
                      v-for="(itemVm, index) in items.serviceProjectVmList"
                      :key="index"
                      v-model="itemVm.checked"
                    >
                      {{itemVm.serviceProjectName}}
                    </el-checkbox> -->
                  </template>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
        <div class="hander">服务商信息</div>
        <el-row class='el-row-el'>
          <el-col :span="8">
            <el-form-item label="服务商名称" prop="providerName">
              <el-input :readonly="true" v-model="infoForm.providerName" @change="changeProvider"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务金额" prop="price">
              <el-input :readonly="true" v-model="infoForm.serviceProId.money" @change="changeProvider"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="text-align: right">
            <el-button type="primary" @click="openTabel">选择</el-button>
            <el-button type="primary" @click="emptyTabel">清空</el-button>
          </el-col>
        </el-row>
        <div class="hander">预约服务时间（可选择）</div>
        <el-row class='el-row-el'>
          <el-col :span="20">
            <el-form-item label="期望到达时间" prop="expect">
              <el-input disabled v-model="infoForm.expect"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="10">
            <el-form-item label="服务天数" prop="days">
              <el-input disabled v-model="infoForm.days"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="14" style="text-align: right">
            <el-button type="primary" @click="isTimeShow = true">选择</el-button>
            <el-button type="primary" @click="emptyTime">清空</el-button>
          </el-col>
        </el-row>
        <div style="font-size:20px;color:red;text-align: left;">
          合计金额：
          <span v-if="infoForm.days && infoForm.serviceProId.money">
            ￥{{ infoForm.serviceProId.money }} X {{ infoForm.days }} = ￥{{  infoForm.serviceProId.money * infoForm.days}}
          </span>
          <!--          <span v-else-if="infoForm.serviceProId.money">-->
          <!--                  ￥{{ infoForm.serviceProId.money / 100 }} X 1 = ￥{{ totalAmount }}-->
          <!--                </span>-->
          <span v-else>
            0元
          </span>
        </div>
        <el-row class='el-row-el ta-c'>
          <el-col :span="24">
            <el-button type="primary" @click="onSubmit">确认下单</el-button>
            <el-button type="primary" @click="onPageReturn">返回</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-col>
    <!-- 表格 -->
    <dialog-form :isShow="isShow" :isBtn="true" :width="'60%'" title="选择服务商" @closeDialog="closeDialog" @saveDialog="saveDialog">
      <el-form slot="form" label-width="90px">
        <el-col :span="24">
          <el-form :inline="true" class='el-InputForm'>
            <el-form-item>
              <el-input clearable size="medium" placeholder="请输入服务商名称" prefix-icon="el-icon-search" v-model="SearchItem.name">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input clearable size="medium" placeholder="请输入服务商电话" prefix-icon="el-icon-search" v-model="SearchItem.phone">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size='medium' icon="el-icon-search" @click="SearchNoteList">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <tableForm ref="trigger" :table-form='table' @getList='getList' @lookClick='lookClick' @selectClick='selectClick' @pageChange='pageChange'>
        </tableForm>
      </el-form>
    </dialog-form>
    <!-- 预约服务时间 -->
    <dialog-form :isShow="isTimeShow" :isBtn="true" :width="'38%'" title="请选择预约服务时间" @closeDialog="closeTimeDialog" @saveDialog="saveTimeDialog">
      <el-form slot="form" ref="timeForm" :model="timeForm" :rules="timeRules" label-width="90px">
        <el-col :span="24">
          <el-form-item label="预约范围" prop="valueTime">
            <el-date-picker v-model="timeForm.valueTime" size="medium" :picker-options='pickerOptions' @change="timeChange" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="预约开始时间" end-placeholder="预约结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <div class="flex" style="width: 300px;">
              <div class="btn" v-for="(item, index) in timeArr" :key="index" :class="[activeTime == index ? 'active' : '', !item.flag ? 'disabled' : '']" @click="timeClick(index, item.flag)">
                {{ item.time }}
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-form>
    </dialog-form>
  </el-main>
</template>

<script>
import tableForm from 'plugin/table'
import dialogForm from 'plugin/dialogForm'

let isvalidPhone = (rule, value, callback) => {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  if (!value) {
    callback(new Error('请输入服务电话'))
  } else if (!reg.test(value)) {
    callback(new Error('服务电话格式不正确'))
  } else {
    callback()
  }
}

export default {
  components: {
    tableForm,
    dialogForm
  },
  data() {
    let validateName = (rule, value, callback) => {
      if (!value && this.isHaveTo) {
        callback(new Error(rule.message))
      } else {
        callback()
      }
    }
    return {
      isPhone: false,
      isManIdCard: false,
      isManName: false,
      isBirthday: false,
      isAge: false,
      isSex: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      isAgeShow: false,
      activeName: '',
      serviceTypeList: [],
      totalAmount: '',
      streetList: [],
      communityList: [],
      infoForm: {
        // 老人
        workOrderNo: '',
        phone: '', // 老人电话
        manIdCard: '',
        manName: '',
        birthday: '',
        age: '',
        sex: '1',
        homeStreetId: '',
        homeCommunityId: '',
        registerAddress: '',
        manPhone: '', // 服务电话
        streetId: '',
        communityId: '',
        address: '',
        longitude: '',
        latitude: '',
        // 服务项
        serviceProId: '',
        // 服务商
        providerId: '',
        providerName: '',
        providerPhone: '',
        providerAddress: '',
        // 时段
        expect: '确认接单一小时内',
        days: '',
        expectTime: '',
        expectTimeEnd: '',
        expectTimeStart: ''
      },
      rules: {
        manIdCard: [
          { required: true, validator: this.common.idcard, trigger: ['blur'] }
        ],
        manName: [
          { required: true, message: '请输入姓名', trigger: ['blur'] }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: ['blur'] }
        ],
        birthday: [
          { required: true, message: '请输入出生日期', trigger: ['blur'] }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: ['blur'] }
        ],
        homeStreetId: [{ validator: validateName, message: '请选择所属街道' }],
        homeCommunityId: [{ validator: validateName, message: '请选择所属社区' }],
        registerAddress: [{ validator: validateName, message: '请输入户籍地详细地址' }],
        manPhone: [
          { required: true, validator: isvalidPhone, trigger: ['blur'] }
        ],
        streetId: [
          { required: true, message: '请选择服务街道', trigger: ['blur', 'change'] }
        ],
        communityId: [
          { required: true, message: '请选择服务社区', trigger: ['blur', 'change'] }
        ],
        address: [
          { required: true, message: '请输入服务详情地址', trigger: ['blur'] }
        ],
        providerName: [
          { required: true, message: '请选择服务商', trigger: ['blur', 'change'] }
        ]
      },
      /**
       * 亲属信息操作
       * 此处列表展示价格用note代替
       */
      // 模态框
      openId: '',
      openType: '',
      isShow: false,
      table: {
        list: {
          header: [
            {
              label: '服务商名称',
              field: 'name'
            },
            {
              label: '服务商地址',
              field: 'address',
              width: '110'
            },
            {
              label: '服务商电话',
              field: 'phone'
            },
            {
              label: '价格',
              field: 'note'
            },
            {
              label: '营业时间',
              field: 'openTime',
              width: '110'
            },
            {
              type: 'operation',
              label: '操作',
              field: 'operation',
              width: '160'
            }
          ],

          data: []
        },

        paging: {
          total: 0,
          currentPage: 1,
          limit: 20
        }
      },
      SearchItem: {
        sysState: '1',
        phone: '',
        name: '',
        beginMoney: '',
        endMoney: ''
      },
      lastItem: {
        sysState: '1',
        phone: '',
        name: ''
      },
      /**
       * 选择预约服务时间
       */
      activeTime: null,
      timeArr: [
        { id: 1, time: '6:00-8:00', star: '6', end: '8', flag: true },
        { id: 2, time: '8:00-10:00', star: '8', end: '10', flag: true },
        { id: 3, time: '10:00-12:00', star: '10', end: '12', flag: true },
        { id: 4, time: '12:00-14:00', star: '12', end: '14', flag: true },
        { id: 5, time: '14:00-16:00', star: '14', end: '16', flag: true },
        { id: 6, time: '16:00-18:00', star: '16', end: '18', flag: true }
      ],
      isTimeShow: false,
      timeForm: {
        valueTime: ''
      },
      timeRules: {
        valueTime: [
          { required: true, message: '请选择预约范围时间', trigger: 'blur' }
        ]
      },
      pathType: '0'
    }
  },
  computed: {
    isHaveTo() {
      return this.isAgeShow
    }
  },

  mounted() {
    if (this.$route.path === '/orderAdd') {
      this.pathType = '1'
    }
    this.infoForm.manPhone = this.$route.query.phone
    this.infoForm.workOrderNo = this.$route.query.workOrderId
    if (this.$route.query.phone) {
      this.isPhone = true
      this.infoForm.phone = this.$route.query.phone
    }
    if (this.$route.query.idCard) {
      this.isManIdCard = true
      this.isBirthday = true
      this.isAge = true
      this.infoForm.manIdCard = this.$route.query.idCard
      this.idCardChange()
    } else {
      this.isAgeShow = true
    }
    if (this.$route.query.userName) {
      this.isManName = true
      this.infoForm.manName = decodeURI(this.$route.query.userName)
    }
    if (this.$route.query.sex) {
      this.isSex = true
      this.infoForm.sex = this.$route.query.sex
    }
    this.getStreetList()
    this.getCommunityList()
    this.getServiceProjectList()
  },

  methods: {
    async addressChange() {
      let streetName = ''
      this.streetList.forEach(item => {
        if (item.id === this.infoForm.streetId) {
          streetName = item.name
        }
      })
      let communityName = ''
      this.communityList.forEach(item => {
        if (item.id === this.infoForm.communityId) {
          communityName = item.name
        }
      })
      let str = '天津省天津市南开区' + streetName + communityName + this.infoForm.address
      this.$jsonp('http://api.map.baidu.com/geocoding/v3/', {
        address: str,
        output: 'json',
        ak: 'aa5LzHD00MUmGqMAs1CeeKlRvRW78m7h'
      }).then(row => {
        if (row.status === 0) {
          let location = row.result.location
          this.infoForm.longitude = location.lng
          this.infoForm.latitude = location.lat
        } else {
          this.infoForm.longitude = ''
          this.infoForm.latitude = ''
        }
      }).catch(err => {
        //console.log(err)
      })
    },
    // 计算年龄和出生日期
    idCardChange() {
      // 获取用户身份证号码
      var userCard = this.infoForm.manIdCard
      // 如果身份证号码为undefind则返回空
      if (!userCard) {
        return false
      }
      // 获取出生年月日
      var yearBirth = userCard.substring(6, 10)
      var monthBirth = userCard.substring(10, 12)
      var dayBirth = userCard.substring(12, 14)
      // 获取当前年月日并计算年龄
      var myDate = new Date()
      var monthNow = myDate.getMonth() + 1
      var dayNow = myDate.getDay()
      var age = myDate.getFullYear() - yearBirth
      if (monthNow < monthBirth || (monthNow === monthBirth && dayNow < dayBirth)) {
        age--
      }
      // 得到年龄
      this.infoForm.age = age
      // 得到出生日期
      this.infoForm.birthday = yearBirth + '-' + monthBirth + '-' + dayBirth
      // this.phoneChange()
    },
    // 老人信息
    async phoneChange() {
      const that = this
      try {
        let findUrl = this.api.appUser.findAll + '?page=1&size=20'
        if (this.pathType === '1') {
          findUrl = this.api.appUser.findByPhoneOrIdCardIvrOrder + '?page=1&size=20'
        }
        let json = {
          idCard: this.infoForm.manIdCard
        }
        const response = await this.request.dataGet(that, findUrl, json)
        if (response.code === 1) {
          // 呼叫中心
          if (this.pathType === '1') {
            this.isAgeShow = false
            this.infoForm.manIdCard = response.data.idCard
            this.infoForm.manName = response.data.name
            this.infoForm.address = response.data.address
            return false
          }
          if (response.data.content.length === 1) {
            this.infoForm.manIdCard = response.data.content[0].idCard
            this.infoForm.manName = response.data.content[0].name
            this.infoForm.address = response.data.content[0].address
          }
          return false
        }
        // if (this.pathType === '1') {
        this.isAgeShow = true
        // }
        // this.isPhone = false
        // this.isManIdCard = false
        // this.isManName = false
        // this.isBirthday = false
        // this.isAge = false
        // this.isSex = false
        // this.infoForm.phone = ''
        // this.infoForm.manIdCard = ''
        // this.infoForm.manName = ''
        // this.infoForm.birthday = ''
        // this.infoForm.age = ''
        // this.infoForm.address = ''
        // this.$message.error(response.msg)
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    // 街道列表
    async getStreetList() {
      const that = this
      try {
        let url = this.api.street.findAll + '?page=1&size=1000000'
        let obj = {}
        const response = await this.request.dataGet(that, url, obj)
        that.streetList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    street(val) {
      this.communityList = []
      this.infoForm.communityId = ''
      this.getCommunityList(val)
    },
    // 社区列表
    async getCommunityList(val) {
      const that = this
      try {
        let url = this.api.community.findAll + '?page=1&size=1000000'
        let obj = {
          streetId: val
        }
        const response = await this.request.dataGet(that, url, obj)
        that.communityList = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    // 服务项信息
    async getServiceProjectList() {
      const that = this
      try {
        let url = this.api.serviceProject.getServiceProjectVm
        let obj = {}
        const response = await this.request.dataGet(that, url, obj)
        response.data.serviceType1List.forEach(item => {
          item.serviceType2VmList.forEach(items => {
            items.serviceProjectVmList.forEach(itemVm => {
              itemVm.checked = false
              itemVm.money = itemVm.money / 100
            })
          })
        })
        that.activeName = response.data.serviceType1List[0].serviceType1Name
        that.serviceTypeList = response.data.serviceType1List
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    radioChange() {
      this.infoForm.days = ''
      this.infoForm.providerName = ''
      this.infoForm.expect = ''
      this.infoForm.serviceProId.money = ''
    },
    handleClick(tab, event) {
      //console.log(tab, event)
    },
    /**
     * 服务商
     */
    openTabel() {
      let serviceProjectId = this.infoForm.serviceProId.serviceProjectId
      if (!serviceProjectId) {
        this.$message.error('请先选择一项服务')
        return false
      }
      this.isShow = true
      this.getList()
    },
    async getList() {
      const that = this
      try {
        let serviceProjectId = this.infoForm.serviceProId.serviceProjectId
        let findUrl = this.api.provider.assignProvider
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit + '&serviceProjectId=' + serviceProjectId + '&providerName=' + this.SearchItem.name + '&providerPhone=' + this.SearchItem.phone + '&beginMoney=' + this.infoForm.serviceProId.minMoney + '&endMoney=' + this.infoForm.serviceProId.maxMoney
        const response = await this.request.dataGet(that, url, this.SearchItem)
        this.$refs.trigger.loading = false
        response.data.content.forEach(item => {
          item.operation = [
            {
              label: '查看',
              icon: 'el-icon-view',
              click: 'lookClick'
            },
            {
              label: '选择',
              icon: 'el-icon-circle-check',
              click: 'selectClick'
            }
          ]
        })
        that.table.list.data = response.data.content
        if (this.openId) {
          this.table.list.data.forEach(item => {
            item.operation.forEach(items => {
              if (items.click === 'selectClick') {
                if (item.id === this.openId) {
                  items.label = '已选择'
                } else {
                  items.label = '选择'
                }
              }
            })
          })
        }
        that.table.paging.total = response.data.totalElements
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    SearchNoteList() {
      let that = this
      Object.entries(that.SearchItem).map((item, index) => {
        that.lastItem[item[0]] = that.SearchItem[item[0]]
      })
      this.table.paging.currentPage = 1
      this.getList()
    },
    lookClick(val) {
      this.$router.push({
        path: this.pathType === '1' ? '/providerLook' : '/index/providerLook',
        query: {
          id: val.id,
          type: '2'
        }
      })
    },
    selectClick(val) {
      let id = val.id
      this.openId = val.id
      this.infoForm.providerId = val.id
      this.infoForm.providerName = val.name
      this.infoForm.providerPhone = val.phone
      this.infoForm.providerAddress = val.address
      this.infoForm.serviceProId.money = val.note
      this.table.list.data.forEach(item => {
        item.operation.forEach(items => {
          if (items.click === 'selectClick') {
            if (item.id === id) {
              items.label = '已选择'
            } else {
              items.label = '选择'
            }
          }
        })
      })
    },
    pageChange(val) {
      this.table.paging.limit = val.limit
      this.table.paging.currentPage = val.page
      this.getList()
    },
    closeDialog() {
      this.emptyTabel()
      this.isShow = false
    },
    saveDialog() {
      this.isShow = false
      this.count()
    },
    emptyTabel() {
      this.openId = ''
      this.infoForm.providerId = ''
      this.infoForm.providerName = ''
      this.infoForm.providerPhone = ''
      this.infoForm.providerAddress = ''
    },
    /**
     * 服务时间
     */
    timeClick(i, flag) {
      if (flag) {
        this.activeTime = i
      }
    },
    timeChange() {
      if (this.timeForm.valueTime) {
        let now = new Date()
        // 当前日期
        let y = now.getFullYear()
        let m = now.getMonth() + 1
        let d = now.getDate()
        m = m < 10 ? '0' + m : m
        d = d < 10 ? '0' + d : d
        let currentDate = y + '-' + m + '-' + d
        // 当前小时
        let h = now.getHours() + 1
        // 选择日期
        let days = this.timeForm.valueTime[0]
        if (days === currentDate) {
          this.timeArr.forEach(item => {
            if (parseInt(item.star) < h || parseInt(item.end) < h) {
              this.activeTime = null
              item.flag = false
            } else {
              item.flag = true
            }
          })
        } else {
          this.initTime()
        }
      } else {
        this.initTime()
      }
    },
    // 初始化时段
    initTime() {
      this.activeTime = null
      this.timeArr.forEach(item => {
        item.flag = true
      })
    },
    closeTimeDialog() {
      this.isTimeShow = false
      this.activeTime = null
      this.$refs['timeForm'].resetFields()
      this.timeForm = {
        valueTime: ''
      }
      this.initTime()
    },
    saveTimeDialog() {
      if (this.activeTime == null) {
        this.$message.error('请选择时间范围')
        return false
      }
      this.$refs['timeForm'].validate(async (valid) => {
        if (valid) {
          let sDate1 = ''
          let sDate2 = ''
          // 时段
          this.infoForm.expectTime = this.timeArr[this.activeTime].time
          if (this.timeForm.valueTime) {
            sDate1 = Date.parse(this.timeForm.valueTime[0])
            sDate2 = Date.parse(this.timeForm.valueTime[1])
            // 日期
            this.infoForm.expectTimeStart = this.timeForm.valueTime[0]
            this.infoForm.expectTimeEnd = this.timeForm.valueTime[1]
          } else {
            this.infoForm.expectTimeStart = ''
            this.infoForm.expectTimeEnd = ''
          }
          // 天数
          let dateSpan = Math.abs(sDate2 - sDate1)
          let iDays = Math.floor(dateSpan / (24 * 3600 * 1000))
          this.infoForm.days = iDays + 1
          let startArr = this.infoForm.expectTimeStart.split('-')
          let startStr = startArr[0] + '年' + startArr[1] + '月' + startArr[2] + '日'
          let endArr = this.infoForm.expectTimeEnd.split('-')
          let endStr = endArr[0] + '年' + endArr[1] + '月' + endArr[2] + '日'
          this.infoForm.expect = startStr + '-' + endStr + '  ' + this.infoForm.expectTime + '到达'
          this.closeTimeDialog()
          this.count()
        }
      })
    },
    emptyTime() {
      this.infoForm.expectTimeStart = ''
      this.infoForm.expectTimeEnd = ''
      this.infoForm.expectTime = ''
      this.infoForm.expect = '确认接单一小时内'
      this.infoForm.days = ''
      this.count()
    },
    // 合计金额
    count() {
      let days = this.infoForm.days
      let money = this.infoForm.serviceProId.money
      if (days && money) {
        let total = parseInt(days) * parseFloat(money)
        this.totalAmount = parseFloat(total).toFixed(2)
      } else {
        this.totalAmount = ''
      }
      if (money && !days) {
        let total = parseInt(1) * parseFloat(money)
        this.totalAmount = parseFloat(total).toFixed(2)
      }
    },
    // 添加数据
    onSubmit() {
      let that = this
      that.$refs.infoForm.validate(async (index) => {
        if (index === false) {
          return false
        }
        this.loading = true
        if (this.infoForm.serviceProId.serviceProjectId === '') {
          this.loading = false
          this.$message.error('请选择服务项')
          return false
        }
        try {
          // 拼接服务详细地址
          let streetName = ''
          this.streetList.forEach(item => {
            if (item.id === this.infoForm.streetId) {
              streetName = item.name
            }
          })
          let communityName = ''
          this.communityList.forEach(item => {
            if (item.id === this.infoForm.communityId) {
              communityName = item.name
            }
          })
          let str = '天津省天津市南开区' + streetName + communityName + this.infoForm.address
          // 下单
          let url = this.api.order.insert
          let obj = {
            areaName: '南开区',
            // 老人
            workOrderNo: this.infoForm.workOrderNo,
            phone: this.infoForm.phone,
            manIdCard: this.infoForm.manIdCard,
            manName: this.infoForm.manName,
            birthday: this.infoForm.birthday,
            sex: this.infoForm.sex,
            registerArea: '天津市市辖区南开区',
            homeCommunityId: this.infoForm.homeCommunityId,
            registerAddress: this.infoForm.registerAddress,
            manPhone: this.infoForm.manPhone,
            communityId: this.infoForm.communityId,
            address: this.infoForm.address,
            // 服务项
            serviceProId: this.infoForm.serviceProId.serviceProjectId,
            serviceProName: this.infoForm.serviceProId.serviceProjectName,
            serviceProTime: this.infoForm.serviceProId.time,
            serviceProType: this.infoForm.serviceProId.type,
            serviceProMoney: this.infoForm.serviceProId.money,
            serviceType1Id: this.infoForm.serviceProId.serviceType1Id,
            serviceType1Name: this.infoForm.serviceProId.serviceType1Name,
            serviceType2Id: this.infoForm.serviceProId.serviceType2Id,
            serviceType2Name: this.infoForm.serviceProId.serviceType2Name,
            // 服务商
            providerId: this.infoForm.providerId,
            providerName: this.infoForm.providerName,
            providerPhone: this.infoForm.providerPhone,
            providerAddress: this.infoForm.providerAddress,
            // 时段
            expectTime: this.infoForm.expectTime,
            expectTimeEnd: this.infoForm.expectTimeEnd,
            expectTimeStart: this.infoForm.expectTimeStart
          }
          obj.orderWay = '3'
          let response = await this.request.dataPost(that, url, obj)
          this.loading = false
          if (response.code === 1) {
            this.$message.success(response.msg)
            window.parent.postMessage('close', '*')
            this.init()
            return false
          }
          this.$message.error(response.msg)
        } catch (even) {
          this.$message.error('数据获取失败')
        }
      })
    },
    onPageReturn() {
      this.init()
    },
    init() {
      this.isPhone = false
      this.isManIdCard = false
      this.isManName = false
      this.isBirthday = false
      this.isAge = false
      this.isSex = false
      this.infoForm = {
        // 老人
        workOrderNo: '',
        phone: '', // 老人电话
        manIdCard: '',
        manName: '',
        birthday: '',
        age: '',
        sex: '1',
        homeStreetId: '',
        homeCommunityId: '',
        registerAddress: '',
        manPhone: '', // 服务电话
        streetId: '',
        communityId: '',
        address: '',
        // 服务项
        serviceProId: '',
        // 服务商
        providerId: '',
        providerName: '',
        providerPhone: '',
        providerAddress: '',
        // 时段
        expect: '确认接单一小时内',
        days: '',
        expectTime: '',
        expectTimeEnd: '',
        expectTimeStart: ''
      }
    },
    changeProvider() {

    }
  }
}
</script>

<style>
.orderAdd .disabled {
  background: #f1f1f1;
  cursor: not-allowed !important;
}

.orderAdd .hander {
  padding: 5px 0;
  margin-bottom: 10px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px dashed #999;
  color: #009966;
}

.orderAdd .min-title {
  padding: 5px 0;
  margin-bottom: 10px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px solid #999;
}

.orderAdd .flex {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.orderAdd .btn {
  width: 80px;
  margin-bottom: 10px;
  border: 1px solid #999;
  cursor: pointer;
}

.orderAdd .active {
  background-color: #ffd161;
  border: 1px solid #f48719;
}
</style>
