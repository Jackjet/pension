<template>
  <el-main v-loading="loading" class="agedDataAdd">
    <div v-show="isForm">
      <!-- 主模块 -->
      <el-col :span="24" class="ta-l" v-loading="loading">
        <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="180px">
          <!-- 模块一 -->
          <div>
            <div class="hander">1.老人基本信息</div>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="身份证号" prop="idCard">
                  <el-input v-model="infoForm.idCard" :disabled="disabled" @change="idCardChange"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="infoForm.name" :disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="联系电话" prop="phone">
                  <el-input v-model="infoForm.phone" :disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="老人分类" style="text-align:left" prop="type">
                  <el-select style="width: 100%;" v-model="infoForm.type" disabled placeholder="请选择老人分类">
                    <el-option label="普通老人" value="1"></el-option>
                    <el-option label="居家老人" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="年龄" prop="age">
                  <el-input v-model="infoForm.age" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="出生日期" prop="birthday">
                  <el-input v-model="infoForm.birthday" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el' style="text-align: left;">
              <el-col :span="24">
                <el-form-item label="老人类型" prop="genreId">
                  <el-checkbox-group v-model="infoForm.genreId">
                    <el-checkbox
                      v-for="(item, i) in genreList"
                      :key="i"
                      :disabled="disabled"
                      :label="item.id"
                      name="type"
                    >{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="紧急联系人姓名" prop="linkName">
                  <el-input v-model="infoForm.linkName" :disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="紧急联系人电话" prop="linkPhone">
                  <el-input v-model="infoForm.linkPhone" :disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el' style="text-align: left;">
              <el-col :span="12">
                <el-form-item label="性别" prop="sex">
                  <el-radio v-model="infoForm.sex" label="1" :disabled="disabled">男</el-radio>
                  <el-radio v-model="infoForm.sex" label="0" :disabled="disabled">女</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="民族" style="text-align:left">
                  <el-select style="width: 100%;" :disabled="disabled" v-model="infoForm.national" placeholder="请选择民族">
                    <el-option
                      v-for="item in nationalList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el' style="text-align: left;">
              <el-col :span="14">
                <el-form-item label="头像">
                    <el-image
                      v-if="infoForm.icon || isShowIcon"
                      style="width: 100px; height: 100px"
                      :src="ImgUrl"
                      :preview-src-list="[ImgUrl]">
                    </el-image>
                    <div style="position: relative;" v-if="type !== '2'">
                      <el-upload
                        class="upload-demo"
                        accept='.jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP'
                        :action='fileUrl'
                        :headers='header'
                        :show-file-list='false'
                        :before-upload='iconChange'
                        :on-success='iconSuccess'>
                        <el-button size="small" type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                      </el-upload>
                    </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="8">
                <el-form-item label="户籍地、区" :required="true">
                  <el-input value="天津市市辖区南开区" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属街道" style="text-align:left" prop="homeStreetId">
                  <el-select style="width: 100%;" v-model="infoForm.homeStreetId" :disabled="disabled" placeholder="请选择所属街道" @change='street'>
                    <el-option
                      v-for="item in streetList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属社区" style="text-align:left" prop="homeCommunityId">
                  <el-select style="width: 100%;" v-model="infoForm.homeCommunityId" :disabled="disabled" placeholder="请选择所属社区" @change="community">
                    <el-option
                      v-for="item in communityList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="24">
                <el-form-item label="户籍地详细地址" prop="registerAddress">
                  <el-input type="textarea" :disabled="disabled" v-model="infoForm.registerAddress"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 模块二 -->
          <div>
            <div class="hander">2.老人扩展信息</div>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="婚姻状况" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.marryId" :disabled="disabled" placeholder="请选择婚姻状况">
                    <el-option
                      v-for="item in marryList"
                      :key="item.id"
                      :disabled="disabled"
                      :label="item.name"
                      :value="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="文化程度" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.educationId" :disabled="disabled" placeholder="请选择文化程度">
                    <el-option
                      v-for="item in educationList"
                      :key="item.id"
                      :disabled="disabled"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="政治面貌" prop="political">
                  <el-select style="width: 100%;" v-model="infoForm.political" :disabled="disabled" placeholder="请选择政治面貌">
                    <el-option
                      v-for="item in politicalList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="居住情况" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.liveId" :disabled="disabled" placeholder="请选择居住情况">
                    <el-option
                      v-for="item in liveList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="经济来源" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.economicId" :disabled="disabled" placeholder="请选择经济来源">
                    <el-option
                      v-for="item in economicList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="血型" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.bloodId" :disabled="disabled" placeholder="请选择血型">
                    <el-option
                      v-for="item in bloodList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="身高" prop="height">
                  <el-input v-model="infoForm.height" :disabled="disabled">
                    <template slot="append">cm</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="体重" prop="weight">
                  <el-input v-model="infoForm.weight" :disabled="disabled">
                    <template slot="append">kg</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="听力情况" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.hearId" :disabled="disabled" placeholder="请选择听力情况">
                    <el-option
                      v-for="item in hearList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="视力情况" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.visionId" :disabled="disabled" placeholder="请选择视力情况">
                    <el-option
                      v-for="item in visionList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="病史" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.illId" :disabled="disabled" placeholder="请选择病史">
                    <el-option
                      v-for="item in illList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="传染病" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.infectiousId" :disabled="disabled" placeholder="请选择传染病">
                    <el-option
                      v-for="item in infectiousList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="智障程度" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.mentallyId" :disabled="disabled" placeholder="请选择智障程度">
                    <el-option
                      v-for="item in mentallyList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="过敏史" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.allergyId" :disabled="disabled" placeholder="请选择过敏史">
                    <el-option
                      v-for="item in allergyList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="过敏源（药物）">
                  <el-input v-model="infoForm.allergySource" :disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="常服药物">
                  <el-input v-model="infoForm.drug" :disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="身体状况" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.bodyId" :disabled="disabled" placeholder="请选择身体状况">
                    <el-option
                      v-for="item in bodyList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="精神状况" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.mentalId" :disabled="disabled" placeholder="请选择过精神状况">
                    <el-option
                      v-for="item in mentalList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="个人特长" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.specialtyId" :disabled="disabled" placeholder="请选择个人特长">
                    <el-option
                      v-for="item in specialtyList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="服务需求" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.demand" :disabled="disabled" placeholder="请选择服务需求">
                    <el-option
                      v-for="item in demandList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="老年优待证号">
                  <el-input v-model="infoForm.cardCode" :disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否领取" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.receiveId" :disabled="disabled" placeholder="请选择是否领取">
                    <el-option label="否" value="0"></el-option>
                    <el-option label="是" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el' style="text-align: left;">
              <el-col :span="24">
                <el-form-item label="残疾类别">
                  <el-checkbox-group v-model="infoForm.disabilityId">
                    <el-checkbox
                      v-for="(item, i) in disabilityList"
                      :key="i"
                      :disabled="disabled"
                      :label="item.id"
                      name="type"
                    >{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="24">
                <el-form-item label="亲属信息" style="text-align:left">
                  <el-button type="primary" size='medium' v-if="!disabled" icon="el-icon-plus" @click="add">添加</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-table
                  :data="table.list.data.slice((table.paging.currentPage-1) * table.paging.limit, table.paging.currentPage * table.paging.limit)"
                  empty-text='暂无数据'
                  class='el_tab_alage'
                  style="width: 100%">
                  <template v-for="(item, index) in table.list.header">
                    <el-table-column fit
                      align='center'
                      :key='index'
                      :label="item.label"
                      :width="item.width"
                      :prop="item.field">
                      <template slot-scope="scope">
                        {{scope.row[item.field]}}
                      </template>
                    </el-table-column>
                  </template>
                  <el-table-column fit align='center'
                    :label="table.list.operation.label"
                    v-if="table.list.operation"
                    :width="table.list.operation.width">
                    <template slot-scope="scope">
                      <el-button
                        v-for="(value, item) in table.list.operation.event"
                        type="text"
                        :icon="value.icon"
                        :key='item'
                        @click.native.prevent="value.method !== undefined ? value.method(scope.row, scope) : ''">{{value.label}}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="pagination">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="1"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="20"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="table.paging.total">
                  </el-pagination>
                </div>
              </el-col>
            </el-row>
          </div>
          <el-row class='el-row-el ta-c'>
            <el-col :span="24">
              <el-button type="primary" @click="onPageReturn">返回</el-button>
              <el-button type="primary" @click="onSubmit" v-if="!disabled">保存</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </div>
    <!-- 亲属信息 -->
    <dialog-form :isShow="isShow" :isBtn="isBtn" :width="'50%'" :title="title" @closeDialog="closeDialog" @saveDialog="saveDialog">
      <el-form slot="form" ref="form" :model="form" :rules="openRules" label-width="130px">
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input
              size="medium"
              autocomplete="off"
              :disabled="openType == '1'"
              v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" style="text-align: left;color:#000;" prop="sex">
            <el-radio :disabled="openType == '1'" v-model="form.sex" label="1">男</el-radio>
            <el-radio :disabled="openType == '1'" v-model="form.sex" label="0">女</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="与老人关系" prop="relationship">
            <el-input
              size="medium"
              autocomplete="off"
              :disabled="openType == '1'"
              v-model="form.relationship">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="phone">
            <el-input
              size="medium"
              autocomplete="off"
              :disabled="openType == '1'"
              v-model="form.phone">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号" prop="idCard">
            <el-input
              size="medium"
              autocomplete="off"
              :disabled="openType == '1'"
              v-model="form.idCard">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工作单位">
            <el-input
              size="medium"
              autocomplete="off"
              :disabled="openType == '1'"
              v-model="form.job">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收入情况（元）" prop="income">
            <el-input
              size="medium"
              autocomplete="off"
              :disabled="openType == '1'"
              v-model="form.income">
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
            <el-input
              type="textarea"
              size="medium"
              autocomplete="off"
              :disabled="openType == '1'"
              v-model="form.address">
            </el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </dialog-form>
  </el-main>
</template>

<script>
import dialogForm from 'plugin/dialogForm'
export default {
  components: {
    dialogForm
  },
  data () {
    return {
      loading: true,
      isForm: false,
      id: '',
      type: '',
      disabled: false,
      /**
       * 数据视图
       */
      streetList: [],
      communityList: [],
      genreList: [],
      disabilityList: [],
      nationalList: [],
      marryList: [],
      educationList: [],
      liveList: [],
      politicalList: [],
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
      /**
       * 图片操作
       */
      isShowIcon: false,
      ImgUrl: '',
      infoForm: {
        // 模块一
        idCard: '',
        name: '',
        phone: '',
        type: '',
        age: '',
        birthday: '',
        genreId: [],
        linkName: '',
        linkPhone: '',
        sex: '1',
        icon: '',
        national: '',
        homeStreetId: '',
        homeCommunityId: '',
        registerAddress: '',
        // 模块二
        marryId: '',
        educationId: '',
        political: '',
        liveId: '',
        economicId: '',
        bloodId: '',
        height: '',
        weight: '',
        hearId: '',
        visionId: '',
        illId: '',
        infectiousId: '',
        mentallyId: '',
        allergyId: '',
        allergySource: '',
        drug: '',
        bodyId: '',
        mentalId: '',
        specialtyId: '',
        demand: '',
        cardCode: '',
        receiveId: '',
        disabilityId: [],
        // 亲属信息
        userRelatives: []
      },
      // 验证
      rules: {
        // 模块一
        idCard: [
          { required: true, validator: this.common.idcard, trigger: ['blur'] }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: ['blur'] }
        ],
        phone: [
          { required: true, validator: this.common.isvalidPhone, trigger: ['blur'] }
        ],
        type: [
          { required: true, message: '请选择老人分类', trigger: ['blur', 'change'] }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: ['blur'] }
        ],
        birthday: [
          { required: true, message: '请输入出生日期', trigger: ['blur'] }
        ],
        genreId: [
          { required: true, message: '请选择老人类型', trigger: ['blur', 'change'] }
        ],
        linkName: [
          { required: true, message: '请输入紧急联系人姓名', trigger: ['blur'] }
        ],
        linkPhone: [
          { required: true, validator: this.common.isvalidlinkPhone, trigger: ['blur'] }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: ['blur', 'change'] }
        ],
        homeStreetId: [
          { required: true, message: '请选择所属街道', trigger: ['blur', 'change'] }
        ],
        homeCommunityId: [
          { required: true, message: '请选择所属社区', trigger: ['blur', 'change'] }
        ],
        registerAddress: [
          { required: true, message: '请输入户籍地详细地址', trigger: ['blur'] }
        ],
        weight: [
          { required: false, pattern: /^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$/, message: '保留两位小数', trigger: ['blur'] }
        ]
      },
      /**
       * 亲属信息操作
       */
      // 模态框
      openId: '',
      openType: '',
      title: '',
      isShow: false,
      isBtn: true,
      dataIndex: 0,
      form: {
        userId: '',
        name: '',
        sex: '1',
        relationship: '',
        phone: '',
        idCard: '',
        job: '',
        income: '',
        isGuardian: '',
        address: ''
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
        sex: [
          { required: true, message: '请选择性别', trigger: ['blur', 'change'] }
        ],
        idCard: [
          { required: true, validator: this.common.idcard, trigger: ['blur'] }
        ],
        income: [
          { required: true, validator: this.common.isvalidFloat, trigger: 'blur' }
        ],
        isGuardian: [
          { required: true, message: '请选择是否监护人', trigger: ['blur', 'change'] }
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
      },
      fileUrl: process.env.VUE_APP_URL + this.api.resourceLib.upload,
      header: {
        'Authorization': 'token ' + this.common.session('currentUser').token
      },
      userId: '' // 操作数据页面列表查询的userId
    }
  },

  mounted () {
    this.id = this.$route.query.id
    this.type = this.$route.query.type
    this.getStreetList()
    this.getGenreList()
    // 详情&操作日志进入&审核&审核详情
    if (this.type === '2') {
      this.disabled = true
      // 详情老人亲属列表只展示详情按钮
      this.table.list.operation.event = [
        {
          label: '详情',
          icon: 'el-icon-document',
          method: (row) => {
            this.edit(row, '1')
          }
        }
      ]
    }
    // 编辑&详情
    if (this.id) {
      this.detail()
      // 获取老人亲属
      this.getList()
    }
  },

  methods: {
    // 详情
    async detail () {
      let that = this
      try {
        let findUrl = that.api.collectUser.findById
        let parameter = { id: this.id }
        const response = await that.request.dataGet(that, findUrl, parameter)
        this.loading = false
        this.isForm = true
        if (response.code === 1) {
          let Data = response.data
          this.getCommunityList(Data.homeStreetId)
          that.infoForm = Data
          // 处理老人类型
          if (Data.genreId) {
            let genreArr = JSON.parse(Data.genreId)
            this.infoForm.genreId = genreArr
          } else {
            this.infoForm.genreId = []
          }
          if (Data.disabilityId) {
            let disabilityArr = JSON.parse(Data.disabilityId)
            this.infoForm.disabilityId = disabilityArr
          } else {
            this.infoForm.disabilityId = []
          }
          // 身高
          if (!Data.height) {
            this.infoForm.height = ''
          }
          // 体重
          if (Data.weight === '0.0') {
            this.infoForm.weight = ''
          }
          // 头像
          let icon = Data.icon
          that.ImgUrl = icon ? process.env.VUE_APP_FILE + icon : this.errorImg
          if (!icon) {
            that.isShowIcon = true
          }
          this.idCardChange()
          return false
        }
        that.$message.error(response.msg)
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    /**
     * 整体获取视图数据
     */
    // 街道列表
    async getStreetList () {
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
    street (val) {
      const currentUser = this.common.session('currentUser')
      // 添加不做校验
      if (this.type === '0' || this.type === '6') {
        this.infoForm.homeCommunityId = ''
        this.getCommunityList(val)
        return
      }
      if (!currentUser.streetId && !currentUser.communityId) {
        this.infoForm.homeCommunityId = ''
        this.getCommunityList(val)
        return
      }
      if (this.infoForm.homeStreetId !== currentUser.streetId) {
        this.$confirm('当前老人所在地址已修改为非您所在辖区，请确认是否修改？', '提示', {
          type: 'warning'
        }).then(async () => {
          this.infoForm.homeCommunityId = ''
          this.getCommunityList(this.infoForm.homeStreetId)
        }).catch(() => {
          this.infoForm.homeStreetId = currentUser.streetId
        })
      } else {
        this.infoForm.homeCommunityId = ''
        this.getCommunityList(val)
      }
    },
    // 社区列表
    async getCommunityList (val) {
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
    community () {
      const currentUser = this.common.session('currentUser')
      // 添加不做校验
      if (this.type === '0' || this.type === '6') {
        return
      }
      if (!currentUser.streetId && !currentUser.communityId) {
        return
      }
      // 判断街道是否修改  如修改不进行校验
      if (this.infoForm.homeStreetId !== currentUser.streetId) {
        return
      }
      // 街道管理员不校验
      if (!currentUser.communityId) {
        return
      }
      if (this.infoForm.homeCommunityId !== currentUser.communityId) {
        this.$confirm('当前老人所在地址已修改为非您所在辖区，请确认是否修改？', '提示', {
          type: 'warning'
        }).then(async () => {
        }).catch(() => {
          this.infoForm.homeCommunityId = currentUser.communityId
        })
      }
    },
    // 老人类型
    getGenreList () {
      const that = this
      let arr = [
        {
          label: 'genreList',
          code: 'lrlx'
        },
        {
          label: 'disabilityList',
          code: 'cjlb'
        },
        {
          label: 'nationalList',
          code: 'mz'
        },
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
          label: 'politicalList',
          code: 'zzmm'
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
          code: 'fwxq'
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
    /**
     * 模块一操作
     */
    // 上传头像
    iconChange (file) {
      let that = this
      let FileSize = file.size / 1024 / 1024 < 500
      if (!FileSize) {
        that.$message.error('上传超出文件限制大小')
        return false
      }
      this.isSubmitLoading = true
    },
    iconSuccess (response, file, fileList) {
      let that = this
      if (response.code === 1) {
        that.ImgUrl = response.data.fileLongPath
        that.infoForm.icon = response.data.filePath
        that.$message.success(response.msg)
        return false
      }
    },
    // 计算年龄和出生日期
    idCardChange () {
      // 获取用户身份证号码
      var userCard = this.infoForm.idCard
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
    },
    /**
     * 亲属信息操作
     */
    // 亲属信息
    async getList () {
      const that = this
      try {
        let findUrl = this.api.collectRelative.findAll
        let url = findUrl + '?page=' + this.table.paging.currentPage + '&size=' + this.table.paging.limit
        let obj = {
          collectUserId: this.id
        }
        const response = await this.request.dataGet(that, url, obj)
        // 拦截
        if (!this.id) {
          return false
        }
        response.data.content.forEach(item => {
          if (item.isGuardian === '1') {
            item.isGuardian = '是'
          } else {
            item.isGuardian = '否'
          }
          item.createTime = item.createTime.split(' ')[0]
        })
        that.table.list.data = response.data.content
        that.infoForm.userRelatives = response.data.content
        that.table.paging.total = response.data.totalElements
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    handleSizeChange (val) {
      this.table.paging.limit = val
    },
    handleCurrentChange (val) {
      this.table.paging.currentPage = val
    },
    add () {
      this.title = '添加亲属'
      this.isShow = true
      this.isBtn = true
    },
    closeDialog () {
      this.isShow = false
      this.openId = ''
      this.openType = ''
      this.$refs['form'].resetFields()
      setTimeout(() => {
        this.isBtn = true
      }, 500)
      this.form = {
        name: '',
        sex: '1',
        relationship: '',
        phone: '',
        idCard: '',
        job: '',
        income: '',
        isGuardian: '',
        address: ''
      }
    },
    // 保存老人亲属
    saveDialog () {
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
              income: parseInt(income),
              isGuardian: this.form.isGuardian,
              address: this.form.address
            }
            obj.collectUserId = this.id
            // 编辑老人
            let url = that.api.collectRelative.insert
            let response = null
            if (that.openId) {
              url = that.api.collectRelative.update
              obj.id = that.openId
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
    // 编辑老人亲属
    async edit (row, openType, i) {
      const that = this
      this.openType = openType
      try {
        let findUrl = that.api.collectRelative.findById
        let parameter = { id: row.id }
        const response = await that.request.dataGet(that, findUrl, parameter)
        if (response.code === 1) {
          that.openId = row.id
          that.isShow = true
          if (openType === '1') {
            that.title = '亲属详情'
            that.isBtn = false
          } else {
            that.title = '编辑亲属'
            that.isBtn = true
          }
          that.form = response.data
          that.form.income = (response.data.income / 100).toFixed(2)
          return false
        }
        that.$message.error(response.msg)
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    // 删除老人亲属
    delete (row, idx) {
      const that = this
      that.$confirm('您确定要删除么?', '提示', {
        type: 'warning'
      }).then(async () => {
        let url = this.api.collectRelative.delete + '?id=' + row.id
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
    onSubmit () {
      let that = this
      that.$refs.infoForm.validate(async (index) => {
        if (index === false) {
          return false
        }
        this.loading = true
        try {
          let url = this.api.collectUser.update
          // 居住街道
          let homeStreetName = ''
          this.streetList.forEach(item => {
            if (this.infoForm.homeStreetId === item.id) {
              homeStreetName = item.name
            }
          })
          // 居住社区
          let homeCommunityName = ''
          this.communityList.forEach(item => {
            if (this.infoForm.homeCommunityId === item.id) {
              homeCommunityName = item.name
            }
          })
          // 老人类型
          let idArr = []
          let nameArr = []
          this.genreList.forEach(item => {
            this.infoForm.genreId.forEach(items => {
              if (items === item.id) {
                idArr.push(item.id)
                nameArr.push(item.name)
              }
            })
          })
          // 残疾类别
          let disabilityIdArr = []
          let disabilityNameArr = []
          this.disabilityList.forEach(item => {
            this.infoForm.disabilityId.forEach(items => {
              if (items === item.id) {
                disabilityIdArr.push(item.id)
                disabilityNameArr.push(item.name)
              }
            })
          })
          // 亲属信息处理
          let userRelatives = []
          this.table.list.data.forEach(item => {
            userRelatives.push({
              id: item.id,
              name: item.name,
              sex: item.sex,
              relationship: item.relationship,
              phone: item.phone,
              idCard: item.idCard,
              job: item.job,
              income: item.income,
              isGuardian: item.isGuardian === '是' ? '1' : '0',
              address: item.address
            })
          })
          let obj = {
            id: that.id,
            // 模块一
            idCard: this.infoForm.idCard,
            name: this.infoForm.name,
            phone: this.infoForm.phone,
            type: this.infoForm.type,
            age: this.infoForm.age,
            birthday: this.infoForm.birthday,
            genreId: JSON.stringify(idArr),
            genreName: JSON.stringify(nameArr),
            linkName: this.infoForm.linkName,
            linkPhone: this.infoForm.linkPhone,
            sex: this.infoForm.sex,
            icon: this.infoForm.icon,
            national: this.infoForm.national,
            homeAreaId: '这不是张喆吗？',
            homeStreetId: this.infoForm.homeStreetId,
            homeStreetName: homeStreetName,
            homeCommunityId: this.infoForm.homeCommunityId,
            homeCommunityName: homeCommunityName,
            registerProvince: '天津市',
            registerArea: '市辖区',
            registerCity: '南开区',
            registerAddress: this.infoForm.registerAddress,
            // 模块二
            marryId: this.infoForm.marryId,
            educationId: this.infoForm.educationId,
            political: this.infoForm.political,
            liveId: this.infoForm.liveId,
            economicId: this.infoForm.economicId,
            bloodId: this.infoForm.bloodId,
            height: this.infoForm.height,
            weight: this.infoForm.weight,
            hearId: this.infoForm.hearId,
            visionId: this.infoForm.visionId,
            illId: this.infoForm.illId,
            infectiousId: this.infoForm.infectiousId,
            mentallyId: this.infoForm.mentallyId,
            allergyId: this.infoForm.allergyId,
            allergySource: this.infoForm.allergySource,
            drug: this.infoForm.drug,
            bodyId: this.infoForm.bodyId,
            mentalId: this.infoForm.mentalId,
            specialtyId: this.infoForm.specialtyId,
            demand: this.infoForm.demand,
            cardCode: this.infoForm.cardCode,
            receiveId: this.infoForm.receiveId,
            receive: this.infoForm.receiveId === '1' ? '是' : '否',
            disabilityId: JSON.stringify(disabilityIdArr),
            disabilityName: JSON.stringify(disabilityNameArr),
            // 亲属信息
            userRelatives: userRelatives
          }
          let response = await this.request.dataPut(that, url, obj)
          this.loading = false
          if (response.code === 1) {
            this.$message.success(response.msg)
            this.$router.push({ path: 'agedDataView' })
            return false
          }
          this.$message.error(response.msg)
        } catch (even) {
          this.$message.error('数据获取失败')
        }
      })
    },
    onPageReturn () {
      this.$router.push({ path: 'agedDataView' })
    }
  }
}
</script>

<style>
  .agedDataAdd .el-pagination {
    margin: 0px;
    padding: 0px
  }

  .agedDataAdd .warp-main{
    margin-top: 90px;
  }

  .agedDataAdd .hander{
    padding: 5px 0;
    margin-bottom: 10px;
    text-align: left;
    font-size: 14px;
    border-bottom: 1px dashed #999;
    color:#009966;
  }
  .agedDataAdd .min-title{
    padding: 5px 0;
    margin-bottom: 10px;
    text-align: left;
    font-size: 14px;
    border-bottom: 1px solid #999;
  }
  .agedDataAdd .upload-demo {
    float: left;
  }
  .agedDataAdd .flex{
    display: flex;
  }
  .agedDataAdd .agedDataImg{
    width: 100px;
    height: 100px;
  }
  .agedDataAdd .ps{
    padding-left: 10px;
    color: #409EFF;
  }
</style>
