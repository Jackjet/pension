<template>
  <el-main>
    <div class="hander">2.老人扩展信息</div>
    <el-col :span="24" class="ta-l">
      <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="130px">
        <el-row class='el-row-el'>
          <el-col :span="12">
            <el-form-item label="婚姻状况" style="text-align:left">
              <el-select style="width: 100%;" v-model="infoForm.marryId" :disabled="id ? true : false" placeholder="请选择婚姻状况">
                <el-option v-for="item in marryList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文化程度" style="text-align:left">
              <el-select style="width: 100%;" v-model="infoForm.educationId" :disabled="id ? true : false" placeholder="请选择文化程度">
                <el-option v-for="item in educationList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="12">
            <el-form-item label="政治面貌" prop="political">
              <el-input v-model="infoForm.political"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="居住情况" style="text-align:left">
              <el-select style="width: 100%;" v-model="infoForm.liveId" :disabled="id ? true : false" placeholder="请选择居住情况">
                <el-option v-for="item in liveList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="12">
            <el-form-item label="经济来源" style="text-align:left">
              <el-select style="width: 100%;" v-model="infoForm.economicId" :disabled="id ? true : false" placeholder="请选择经济来源">
                <el-option v-for="item in economicList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="血型" style="text-align:left">
              <el-select style="width: 100%;" v-model="infoForm.bloodId" :disabled="id ? true : false" placeholder="请选择血型">
                <el-option v-for="item in bloodList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="12">
            <el-form-item label="身高" prop="height">
              <el-input v-model="infoForm.height">
                <template slot="append">cm</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="体重" prop="weight">
              <el-input v-model="infoForm.weight">
                <template slot="append">kg</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="12">
            <el-form-item label="听力情况" style="text-align:left">
              <el-select style="width: 100%;" v-model="infoForm.hearId" :disabled="id ? true : false" placeholder="请选择听力情况">
                <el-option v-for="item in hearList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="视力情况" style="text-align:left">
              <el-select style="width: 100%;" v-model="infoForm.visionId" :disabled="id ? true : false" placeholder="请选择视力情况">
                <el-option v-for="item in visionList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="12">
            <el-form-item label="病史" style="text-align:left">
              <el-select style="width: 100%;" v-model="infoForm.illId" :disabled="id ? true : false" placeholder="请选择病史">
                <el-option v-for="item in illList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="传染病" style="text-align:left">
              <el-select style="width: 100%;" v-model="infoForm.infectiousId" :disabled="id ? true : false" placeholder="请选择传染病">
                <el-option v-for="item in infectiousList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="12">
            <el-form-item label="智障程度" style="text-align:left">
              <el-select style="width: 100%;" v-model="infoForm.mentallyId" :disabled="id ? true : false" placeholder="请选择智障程度">
                <el-option v-for="item in mentallyList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="过敏史" style="text-align:left">
              <el-select style="width: 100%;" v-model="infoForm.allergyId" :disabled="id ? true : false" placeholder="请选择过敏史">
                <el-option v-for="item in allergyList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="12">
            <el-form-item label="过敏源（药物）">
              <el-input v-model="infoForm.allergySource"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="常服药物">
              <el-input v-model="infoForm.drug"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="12">
            <el-form-item label="身体状况" style="text-align:left">
              <el-select style="width: 100%;" v-model="infoForm.bodyId" :disabled="id ? true : false" placeholder="请选择身体状况">
                <el-option v-for="item in bodyList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="精神状况" style="text-align:left">
              <el-select style="width: 100%;" v-model="infoForm.mentalId" :disabled="id ? true : false" placeholder="请选择过精神状况">
                <el-option v-for="item in mentalList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="12">
            <el-form-item label="个人特长" style="text-align:left">
              <el-select style="width: 100%;" v-model="infoForm.specialtyId" :disabled="id ? true : false" placeholder="请选择个人特长">
                <el-option v-for="item in specialtyList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务需求" style="text-align:left">
              <el-select style="width: 100%;" v-model="infoForm.demand" :disabled="id ? true : false" placeholder="请选择服务需求">
                <el-option v-for="item in demandList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="12">
            <el-form-item label="老年优待证号">
              <el-input v-model="infoForm.cardCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否领取" style="text-align:left">
              <el-select style="width: 100%;" v-model="infoForm.receiveId" :disabled="id ? true : false" placeholder="请选择是否领取">
                <el-option label="否" value="0"></el-option>
                <el-option label="是" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class='el-row-el'>
          <el-col :span="24">
            <el-form-item label="亲属信息" style="text-align:left">
              <el-button type="primary" size='medium' icon="el-icon-plus" @click="add">添加</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <tableForm ref="trigger" :table-form='table' @getList='getList'>
            </tableForm>
          </el-col>
        </el-row>
      </el-form>
    </el-col>
    <!-- 亲属信息 -->
    <dialog-form :isShow="isShow" :width="'50%'" :title="title" @closeDialog="closeDialog" @saveDialog="saveDialog">
      <el-form slot="form" ref="form" :model="form" :rules="openRules" label-width="130px">
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input size="medium" autocomplete="off" :disabled="openType == '1'" v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" style="text-align: left;">
            <el-radio :disabled="openType == '1'" v-model="form.sex" label="1">男</el-radio>
            <el-radio :disabled="openType == '1'" v-model="form.sex" label="0">女</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="与老人关系" prop="relationship">
            <el-input size="medium" autocomplete="off" :disabled="openType == '1'" v-model="form.relationship">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="phone">
            <el-input size="medium" autocomplete="off" :disabled="openType == '1'" v-model="form.phone">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号" prop="idCard">
            <el-input size="medium" autocomplete="off" :disabled="openType == '1'" v-model="form.idCard">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工作单位">
            <el-input size="medium" autocomplete="off" :disabled="openType == '1'" v-model="form.job">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收入情况（元）" prop="income">
            <el-input size="medium" autocomplete="off" :disabled="openType == '1'" v-model="form.income">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否是监护人" prop="isGuardian">
            <el-select style="width: 100%;" :disabled="openType == '1'" v-model="form.isGuardian" placeholder="请选择是否是监护人">
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="家庭住址">
            <el-input type="textarea" size="medium" autocomplete="off" :disabled="openType == '1'" v-model="form.address">
            </el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </dialog-form>
  </el-main>
</template>

<script>
import tableForm from 'plugin/table'
import dialogForm from 'plugin/dialogForm'
export default {
  components: {
    tableForm,
    dialogForm
  },
  data() {
    return {
      optionType: '',
      id: '',
      marryList: [],
      educationList: [],
      liveList: [],
      economicList: [],
      bloodList: [],
      hearList: [],
      visionList: [],
      illList: [],
      infectiousList: [],
      mentallyList: [],
      allergyList: [],
      bodyList: [],
      mentalList: [],
      specialtyList: [],
      demandList: [],
      infoForm: {
        marryId: '',
        educationId: '',
        political: '',
        liveId: '',
        economicId: '',
        height: '10.00',
        weight: '20.000',
        hearId: '',
        visionId: '',
        illId: '',
        mentallyId: '',
        allergySource: '',
        drug: '',
        bodyId: '',
        mentalId: '',
        specialtyId: '',
        demand: '',
        cardCode: '',
        receiveId: '',
        // 亲属信息
        userRelatives: []
      },
      rules: {
        // height: [
        //   { validator: this.common.isvalidFloat, trigger: 'blur' }
        // ],
        // weight: [
        //   { validator: this.common.isvalidFloat, trigger: 'blur' }
        // ]
      },
      // 模态框
      openId: '',
      openType: '',
      title: '',
      isShow: false,
      dataIndex: 0,
      form: {
        // 老人id??
        userId: '1',
        name: '1',
        sex: '1',
        relationship: '1',
        phone: '14740550189',
        idCard: '235407195106112745',
        job: '1',
        income: '1.00',
        isGuardian: '1',
        address: '1'
      },
      openRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        relationship: [
          { required: true, message: '请输入与老人关系', trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: this.common.isvalidPhone, trigger: ['blur'] }
        ],
        idCard: [
          { required: true, validator: this.common.idcard, trigger: ['blur'] }
        ],
        income: [
          { required: true, validator: this.common.isvalidFloat, trigger: 'blur' }
        ],
        isGuardian: [
          { required: true, message: '请选择是否监护人', trigger: 'blur' }
        ]
      },
      table: {
        list: {
          header: [
            {
              width: '100',
              label: '姓名',
              field: 'name'
            },
            {
              label: '联系电话',
              field: 'phone',
              width: '110'
            },
            {
              label: '身份证号',
              field: 'idCard'
            },
            {
              label: '与老人关系',
              field: 'relationship',
              width: '110'
            },
            {
              label: '是否是监护人',
              field: 'isGuardian',
              width: '110'
            },
            {
              label: '创建时间',
              field: 'createTime'
            }
          ],

          data: [],

          operation: {
            label: '操作',
            event: [
              {
                label: '编辑',
                icon: 'el-icon-edit',
                method: (row) => {
                  this.edit(row, '')
                }
              },
              {
                label: '详情',
                icon: 'el-icon-document',
                method: (row) => {
                  this.edit(row, '1')
                }
              },
              {
                label: '删除',
                icon: 'el-icon-tickets',
                method: (row, i) => {
                  this.delete(row, i)
                }
              }
            ]
          }
        },

        paging: {
          total: 0,
          currentPage: 1,
          limit: 20
        }
      }
    }
  },
  mounted() {
    let that = this
    that.id = that.$route.query.id
    this.getGenreList()
  },

  methods: {
    // 老人类型
    getGenreList() {
      const that = this
      let arr = [
        {
          label: 'marryList',
          code: 'hyzk'
        },
        {
          label: 'educationList',
          code: 'whcd'
        },
        {
          label: 'liveList',
          code: 'jzqk'
        },
        {
          label: 'economicList',
          code: 'jjly'
        },
        {
          label: 'bloodList',
          code: 'xx'
        },
        {
          label: 'hearList',
          code: 'tlqk'
        },
        {
          label: 'visionList',
          code: 'slqk'
        },
        {
          label: 'illList',
          code: 'bs'
        },
        {
          label: 'infectiousList',
          code: 'crb'
        },
        {
          label: 'mentallyList',
          code: 'zzcd'
        },
        {
          label: 'allergyList',
          code: 'gms'
        },
        {
          label: 'bodyList',
          code: 'stzk'
        },
        {
          label: 'mentalList',
          code: 'jszk'
        },
        {
          label: 'specialtyList',
          code: 'grtc'
        },
        {
          label: 'demandList',
          code: 'xqfw'
        }
      ]
      try {
        let url = this.api.dicManage.findAll + '?page=1&size=1000000'
        arr.forEach(async (item) => {
          let obj = {
            dicId: item.code
          }
          const response = await this.request.dataGet(that, url, obj)
          that[item.label] = response.data.content
        })
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    // 操作状态
    getType(e) {
      this.optionType = e
      if (e === '0') {
        this.$refs.trigger.loading = false
        return false
      }
      this.getList()
    },
    /**
     * 亲属信息操作
     */
    // 亲属信息
    async getList() {
      const that = this
      try {
        let findUrl = this.api.userRelative.findAll
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        let obj = {
          userId: this.userId
        }
        const response = await this.request.dataGet(that, url, obj)
        this.$refs.trigger.loading = false
        response.data.content.forEach(item => {
          if (item.isGuardian === '1') {
            item.isGuardian = '是'
          } else {
            item.isGuardian = '否'
          }
        })
        that.table.list.data = response.data.content
        that.infoForm.userRelatives = response.data.content
        that.table.paging.total = response.data.totalElements
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    add() {
      this.title = '添加亲属'
      this.isShow = true
    },
    closeDialog() {
      this.isShow = false
      this.openId = ''
      this.$refs['form'].resetFields()
      this.form = {
        name: '',
        sex: '1',
        relationship: '',
        phone: '14740550189',
        idCard: '235407195106112745',
        job: '',
        income: '',
        isGuardian: '',
        address: ''
      }
    },
    // 保存
    saveDialog() {
      const that = this
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          try {
            let income = parseFloat(this.form.income) * parseFloat(100)
            let obj = {
              name: this.form.name,
              sex: this.form.sex,
              relationship: this.form.relationship,
              phone: this.form.phone,
              idCard: this.form.idCard,
              job: this.form.job,
              income: income,
              isGuardian: this.form.isGuardian,
              address: this.form.address
            }
            // 添加老人
            if (this.optionType === '0') {
              if (that.openId) {
                that.table.list.data.forEach((item, index) => {
                  if (item.id === that.openId) {
                    obj.id = that.table.list.data[index].id
                    that.table.list.data[index] = obj
                  }
                })
                // console.log(that.table.list.data)
                that.$message.success('添加成功')
                that.closeDialog()
                return false
              }
              this.dataIndex++
              obj.id = this.dataIndex
              that.table.list.data.push(obj)
              that.table.list.data.forEach(item => {
                if (item.isGuardian === '1') {
                  item.isGuardian = '是'
                } else {
                  item.isGuardian = '否'
                }
              })
              that.$message.success('添加成功')
              that.closeDialog()
              return false
            }
            // 编辑老人
            let url = that.api.userRelative.insert
            let response = null
            if (that.openId) {
              url = that.api.userRelative.update
              this.form.id = that.openId
              response = await this.request.dataPut(that, url, obj)
            } else {
              response = await this.request.dataPost(that, url, obj)
            }
            if (response.code === 1) {
              that.$message.success(response.msg)
              that.closeDialog()
              that.getList()
              return false
            }
            that.$message.error(response.msg)
          } catch (even) {
            that.$message.error('数据获取失败')
          }
        }
      })
    },
    // 编辑
    async edit(row, openType, i) {
      const that = this
      this.openType = openType
      try {
        // 添加老人
        if (this.optionType === '0') {
          const rowData = row
          that.title = '编辑亲属'
          that.openId = rowData.id
          that.isShow = true
          that.form = {
            name: rowData.name,
            sex: rowData.sex,
            relationship: rowData.relationship,
            phone: rowData.phone,
            idCard: rowData.idCard,
            job: rowData.job,
            income: (rowData.income / 100).toFixed(2),
            isGuardian: rowData.isGuardian,
            address: rowData.address
          }
          return false
        }
        let findUrl = that.api.userRelative.findById
        let parameter = { id: row.id }
        const response = await that.request.dataGet(that, findUrl, parameter)
        if (response.code === 1) {
          that.title = '编辑亲属'
          that.openId = row.id
          that.isShow = true
          that.form = response.data
          return false
        }
        that.$message.error(response.msg)
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    // 删除
    delete(row, idx) {
      const that = this
      that.$confirm('您确定要删除么?', '提示', {
        type: 'warning'
      }).then(async () => {
        // 添加老人
        if (this.optionType === '0') {
          that.$message.success('删除成功')
          that.table.list.data.splice(idx, 1)
          return false
        }
        let url = this.api.userRelative.delete + '?id=' + row.id
        const response = await this.request.dataDelete(that, url, {})
        if (response.code === 1) {
          that.$message.success(response.msg)
          that.getList()
          return false
        }
        that.$message.error(response.msg)
      }).catch((response) => {
        that.$message.error(response.msg)
      })
    },

    // 添加数据
    onSubmit() {
      let that = this
      that.$refs.infoForm.validate(async (index) => {
        if (index === false) {
          return false
        }
        that.infoForm.height = parseFloat(this.infoForm.height) * parseFloat(100)
        that.infoForm.weight = parseFloat(this.infoForm.weight) * parseFloat(100)
        setTimeout(item => {
          this.$emit('formMsgSave0', this.infoForm)
        }, 0)
      })
    },

    onPageReturn() {
      this.$router.push({ path: 'userView' })
    }
  }
}
</script>

<style scoped>
.el-main {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.hander {
  padding: 5px 0;
  margin-bottom: 10px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px dashed #999;
  color: #009966;
}
</style>
