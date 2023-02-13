<template>
  <el-main v-loading="loading" class="agedMsgAdd">
    <div v-show="isForm">
      <!-- 操作类型 -->
      <el-form v-if="type === '1'" ref="typeForm" :model="typeForm" :rules="typeRules" label-width="180px">
        <el-form-item label="操作类型" style="text-align:left" prop="operationType">
          <el-select v-model="typeForm.operationType" @change="operationTypeChange" placeholder="请选择操作类型">
            <el-option label="老人数据更新" value="老人数据更新"></el-option>
            <el-option label="去世老人数据更新" value="去世老人数据更新"></el-option>
            <el-option label="流动人口数据更新" value="流动人口数据更新"></el-option>
            <el-option label="普通申请居家养老" value="普通申请居家养老" v-if="infoForm.type == '1'"></el-option>
            <el-option label="居家养老材料数据更新" value="居家养老材料数据更新" v-if="infoForm.type == '2'"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 公安数据 -->
      <el-col :span="24" v-if="type === '4'">
        <div class="hander">公安数据</div>
        <tableForm ref="trigger0" :table-form='policeTable' @getList='getPoliceList'>
        </tableForm>
      </el-col>
      <!-- 主模块 -->
      <el-col :span="24" class="ta-l" v-loading="loading">
        <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="190px">
          <!-- 申请人信息 -->
          <div v-if="type === '5' || type === '7'">
            <el-row class='el-row-el' v-if="type !== '7'">
              <el-col :span="8">
                <el-form-item label="申请人姓名">
                  <el-input v-model="infoForm.name" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申请人联系电话">
                  <el-input v-model="infoForm.phone" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申请时间">
                  <el-input v-model="infoForm.createTime" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="一级审批角色">
                  <el-input v-model="infoForm.approvalRoleName1" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="一级审批人">
                  <el-input v-model="infoForm.approvalUserName1" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="二级审批角色">
                  <el-input v-model="infoForm.approvalRoleName2" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="二级审批人">
                  <el-input v-model="infoForm.approvalUserName2" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 模块一 -->
          <div v-if="isModel1">
            <div class="hander">1.老人基本信息</div>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="身份证号" prop="idCard">
                  <el-input v-model="infoForm.idCard" :disabled="id ? true : false" @change="idCardChange"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="infoForm.name" :disabled="id ? true : false"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="联系电话" prop="phone">
                  <el-input v-model="infoForm.phone" :disabled="disabled" @change="phoneChange"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="老人分类" style="text-align:left" prop="type">
                  <el-select style="width: 100%;" v-model="infoForm.type" :disabled="id ? true : false" @change="typeChange" placeholder="请选择老人分类">
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
                    <el-checkbox v-for="(item, i) in genreList" :key="i" :disabled="disabled" :label="item.id" name="type">{{item.name}}</el-checkbox>
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
                    <el-option v-for="item in nationalList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el' style="text-align: left;">
              <el-col :span="14">
                <el-form-item label="头像">
                  <img class="agedMsgImg" v-if="infoForm.icon" :src="ImgUrl" />
                  <div style="position: relative;" v-if="type === '0' || type === '1' || type === '6'">
                    <el-upload class="upload-demo" accept='.jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP' :action='fileUrl' :headers='header' :show-file-list='false' :before-upload='iconChange' :on-success='iconSuccess'>
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
                  <el-select style="width: 100%;" v-model="infoForm.homeStreetId" :disabled="streetIdDisabled" placeholder="请选择所属街道" @change='street'>
                    <el-option v-for="item in streetList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属社区" style="text-align:left" prop="homeCommunityId">
                  <el-select style="width: 100%;" v-model="infoForm.homeCommunityId" :disabled="communityIdDisabled" placeholder="请选择所属社区" @change='community'>
                    <el-option v-for="item in communityList" :key="item.id" :label="item.name" :value="item.id">
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
            <div v-if="type == '2' || type == '3'">
              <!-- 老人是否有效 -->
              <el-row class='el-row-el'>
                <el-col :span="8">
                  <el-form-item label="是否有效">
                    <el-input :disabled="disabled" :value="infoForm.isValid == '1' ? '是' : '否'"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="16" v-if="infoForm.isValid != '1'">
                  <el-form-item label="无效类型">
                    <el-input :disabled="disabled" :value="infoForm.unValidReason"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 去世老人 -->
              <el-row class='el-row-el' v-if="infoForm.unValidReason == '去世老人'">
                <el-col :span="8">
                  <el-form-item label="去世时间">
                    <el-input :disabled="disabled" :value="infoForm.deathTime"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="去世原因">
                    <el-input :disabled="disabled" :value="infoForm.registerReason"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 去世老人 -->
              <el-row class='el-row-el' v-if="infoForm.unValidReason == '流动人口'">
                <el-col :span="8">
                  <el-form-item label="搬迁时间">
                    <el-input :disabled="disabled" :value="infoForm.removeTime"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="搬迁地址">
                    <el-input :disabled="disabled" :value="infoForm.removeAddress"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 去世老人 -->
              <el-row class='el-row-el'>
                <el-col :span="8">
                  <el-form-item label="账户余额">
                    <el-input :disabled="disabled" :value="infoForm.money">
                      <template slot="append">元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <!-- 模块二 -->
          <div v-if="isModel2">
            <div class="hander">2.老人扩展信息</div>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="婚姻状况" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.marryId" :disabled="disabled" placeholder="请选择婚姻状况">
                    <el-option v-for="item in marryList" :key="item.id" :disabled="disabled" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="文化程度" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.educationId" :disabled="disabled" placeholder="请选择文化程度">
                    <el-option v-for="item in educationList" :key="item.id" :disabled="disabled" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="政治面貌" prop="political">
                  <el-select style="width: 100%;" v-model="infoForm.political" :disabled="disabled" placeholder="请选择政治面貌">
                    <el-option v-for="item in politicalList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="居住情况" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.liveId" :disabled="disabled" placeholder="请选择居住情况">
                    <el-option v-for="item in liveList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="经济来源" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.economicId" :disabled="disabled" placeholder="请选择经济来源">
                    <el-option v-for="item in economicList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="血型" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.bloodId" :disabled="disabled" placeholder="请选择血型">
                    <el-option v-for="item in bloodList" :key="item.id" :label="item.name" :value="item.id">
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
                    <el-option v-for="item in hearList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="视力情况" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.visionId" :disabled="disabled" placeholder="请选择视力情况">
                    <el-option v-for="item in visionList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="病史" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.illId" :disabled="disabled" placeholder="请选择病史">
                    <el-option v-for="item in illList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="传染病" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.infectiousId" :disabled="disabled" placeholder="请选择传染病">
                    <el-option v-for="item in infectiousList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="智障程度" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.mentallyId" :disabled="disabled" placeholder="请选择智障程度">
                    <el-option v-for="item in mentallyList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="过敏史" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.allergyId" :disabled="disabled" placeholder="请选择过敏史">
                    <el-option v-for="item in allergyList" :key="item.id" :label="item.name" :value="item.id">
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
                    <el-option v-for="item in bodyList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="精神状况" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.mentalId" :disabled="disabled" placeholder="请选择过精神状况">
                    <el-option v-for="item in mentalList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="12">
                <el-form-item label="个人特长" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.specialtyId" :disabled="disabled" placeholder="请选择个人特长">
                    <el-option v-for="item in specialtyList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="服务需求" style="text-align:left">
                  <el-select style="width: 100%;" v-model="infoForm.demand" :disabled="disabled" placeholder="请选择服务需求">
                    <el-option v-for="item in demandList" :key="item.id" :label="item.name" :value="item.id">
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
            <el-row class='el-row-el'>
              <el-col :span="24">
                <el-form-item label="亲属信息" style="text-align:left">
                  <el-button type="primary" size='medium' v-if="!disabled" icon="el-icon-plus" @click="add">添加</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-table :data="table.list.data.slice((table.paging.currentPage-1) * table.paging.limit, table.paging.currentPage * table.paging.limit)" empty-text='暂无数据' class='el_tab_alage' style="width: 100%">
                  <template v-for="(item, index) in table.list.header">
                    <el-table-column fit align='center' :key='index' :label="item.label" :width="item.width" :prop="item.field">
                      <template slot-scope="scope">
                        {{scope.row[item.field]}}
                      </template>
                    </el-table-column>
                  </template>
                  <el-table-column fit align='center' :label="table.list.operation.label" v-if="table.list.operation" :width="table.list.operation.width">
                    <template slot-scope="scope">
                      <el-button v-for="(value, item) in table.list.operation.event" type="text" :icon="value.icon" :key='item' @click.native.prevent="value.method !== undefined ? value.method(scope.row, scope) : ''">{{value.label}}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="pagination">
                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 50, 100]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="table.paging.total">
                  </el-pagination>
                </div>
              </el-col>
            </el-row>
          </div>
          <!-- 模块三 -->
          <div v-if="isModel3">
            <div class="hander">3.居家养老申请提交材料</div>
            <!-- 上传图片区 -->
            <el-row class='el-row-el' style="text-align: left;" v-for="(item, index) in uploudFormArr" :key="index">
              <el-col :span="24">
                <el-form-item :label="item.label" v-show="item.isOwnFlag" :required="true">
                  <!-- 6.本人银行流水凭证 -->
                  <el-form-item style="text-align:left;margin-bottom: 10px;" v-if="item.id == 5">
                    <el-select v-model="infoForm.userHome.bank" :disabled="disabled" placeholder="请选择救助类别">
                      <el-option v-for="item in bankList" :key="item.id" :label="item.label" :value="item.label">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <!-- 图片展示 @click="imgClick(items.iconAll)" -->
                  <div class="imgFlex">
                    <div v-for="(items, i) in item.iconArr" :key="i" style="float: left; margin-right:10px;">
                      <el-image class="agedMsgImg" v-if="items.icon" :src="items.iconAll" :preview-src-list="srcList" />
                      </el-image>
                      <el-row style="text-align: center;z-index: 1;" v-if="!disabled">
                        <el-button type="danger" size="mini" round @click="deleteImg(i, index)">删除</el-button>
                      </el-row>
                    </div>
                  </div>
                  <div style="position: relative;">
                    <!-- 7.是否本人办理 -->
                    <el-col :span="6.5" v-if="item.id == 6">
                      <el-form-item style="text-align:left;margin-right: 10px;">
                        <el-select style="width: 100%;" v-model="infoForm.userHome.isOwn" :disabled="disabled" @change="isOwnChange" placeholder="请选择">
                          <el-option label="否" value="0"></el-option>
                          <el-option label="是" value="1"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <!-- 上传图片按钮 -->
                    <el-upload v-if="!disabled && item.id != 6" class="upload-demo" :multiple="item.multiple" accept="'.jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP'" :action='fileUrl' :headers='header' :show-file-list='false' :before-upload='handleContentChange' :on-success='handleAvatarSuccess'>
                      <el-button size="small" type="primary" @click="getUploudIdx(index)">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                    </el-upload>
                    <!-- 备注 -->
                    <span class="ps" v-if="item.remark && !disabled">{{item.remark}}</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 老人收入情况 -->
            <div class="min-title">老人收入情况</div>
            <el-row class='el-row-el'>
              <el-col :span="10">
                <el-form-item label="赡养费（单位：元）" prop="alimony">
                  <el-input v-model="infoForm.alimony" :disabled="disabled">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="10">
                <el-form-item label="银行月流水（单位：元）" prop="bank1">
                  <el-input v-model="infoForm.bank1" :disabled="disabled">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 老人评估情况 -->
            <div class="min-title">老人评估情况</div>
            <el-row class='el-row-el'>
              <el-col :span="10">
                <el-form-item label="评估信息" prop="assessInfoId">
                  <el-select style="width: 100%;" v-model="infoForm.assessInfoId" :disabled="disabled" placeholder="请选择评估信息">
                    <el-option v-for="item in assessInfoList" :key="item.id" :disabled="disabled" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="10">
                <el-form-item label="评估等级" prop="assessLevelId">
                  <el-select style="width: 100%;" v-model="infoForm.assessLevelId" :disabled="disabled" placeholder="请选择评估等级">
                    <el-option v-for="item in assessLevelList" :key="item.id" :disabled="disabled" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="10">
                <el-form-item label="补贴金额（单位：元）" prop="assessMoney">
                  <el-input v-model="infoForm.assessMoney" :disabled="disabled">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 模块四 -->
          <div v-if="isModel4">
            <div class="hander">4.去世老人数据更新</div>
            <el-row class='el-row-el' style="text-align: left;">
              <el-col :span="10">
                <el-form-item label="去世时间">
                  <el-date-picker v-model="dieForm.deathTime" type="date" value-format="yyyy-MM-dd" placeholder="去世时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="24">
                <el-form-item label="去世原因">
                  <el-input type="textarea" v-model="dieForm.registerReason"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 模块五 -->
          <div v-if="isModel5">
            <div class="hander">5.人口流动数据更新</div>
            <el-row class='el-row-el' style="text-align: left;">
              <el-col :span="10">
                <el-form-item label="搬迁时间">
                  <el-date-picker v-model="removeForm.removeTime" type="date" value-format="yyyy-MM-dd" placeholder="搬迁时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class='el-row-el'>
              <el-col :span="24">
                <el-form-item label="搬迁地址">
                  <el-input type="textarea" v-model="removeForm.removeAddress"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-row class='el-row-el ta-c'>
            <el-col :span="24">
              <el-button type="primary" @click="onPageReturn">返回</el-button>
              <el-button type="primary" @click="onSubmit" v-if="!disabled">保存</el-button>
              <el-button type="primary" @click="pass" v-if="type == '4'">通过</el-button>
              <el-button type="primary" @click="reject" v-if="type == '4'">驳回</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </div>
    <el-dialog :visible.sync="imgDialog.dialogVisible" width="650px" height="600px" title="详细图片" :before-close="handleClose">
      <img :style="{width:'600px',height:'450px'}" :src="imgDialog.dialogPicSrc" alt="详细图片" />
    </el-dialog>
    <!-- 亲属信息 -->
    <dialog-form :isShow="isShow" :isBtn="isBtn" :width="'50%'" :title="title" @closeDialog="closeDialog" @saveDialog="saveDialog">
      <el-form slot="form" ref="form" :model="form" :rules="openRules" label-width="130px">
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input size="medium" autocomplete="off" :disabled="openType == '1'" v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" style="text-align: left;" prop="sex">
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
    <!-- 驳回原因 -->
    <dialog-form :isShow="isShowRemark" :isBtn="true" :width="'30%'" title="驳回原因" @closeDialog="closeRemarkDialog" @saveDialog="saveRemarkDialog">
      <el-form slot="form" ref="remarkForm" :model="remarkForm" :rules="remarkRules" label-width="90px">
        <el-col :span="24">
          <el-form-item label="驳回原因" prop="approvalRemark">
            <el-input type="textarea" size="medium" autocomplete="off" v-model="remarkForm.approvalRemark">
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
// 上传成功图片数量
let imgNum = 0
// 准备上传图片数量
let fileNum = 0
export default {
  components: {
    tableForm,
    dialogForm
  },
  data() {
    return {
      imgDialog: {
        dialogVisible: false,
        dialogPicSrc: ''
      },
      srcList: [],
      loading: true,
      isForm: false,
      id: '',
      type: '',
      disabled: false,
      streetIdDisabled: false,
      communityIdDisabled: false,
      isModel1: false,
      isModel2: false,
      isModel3: false,
      isModel4: false,
      isModel5: false,
      /**
       * 公安数据
       */
      policeTable: {
        list: {
          styleMethod: {
            method: (row, column, rowIndex, columnIndex) => {
              if (row.column.label === '老人姓名') {
                if (row.row.nameColor === 'red') {
                  return 'color: red;'
                } else {
                  return ''
                }
              }
              if (row.column.label === '联系电话') {
                if (row.row.phoneColor === 'red') {
                  return 'color: red;'
                } else {
                  return ''
                }
              }
              if (row.column.label === '年龄') {
                if (row.row.ageColor === 'red') {
                  return 'color: red;'
                } else {
                  return ''
                }
              }
            }
          },
          header: [
            {
              width: '100',
              label: '老人姓名',
              field: 'name'
            },
            {
              label: '联系电话',
              field: 'phone'
            },
            {
              label: '年龄',
              field: 'age'
            },
            {
              label: '身份证号',
              field: 'idCard'
            },
            {
              label: '创建时间',
              field: 'createTime'
            }
          ],

          data: []
        }
      },
      /**
       * 驳回原因
       */
      isShowRemark: false,
      remarkForm: {
        approvalRemark: ''
      },
      remarkRules: {
        approvalRemark: [
          { required: true, message: '请输入驳回原因', trigger: ['blur'] }
        ]
      },
      /**
       * 操作类型
       */
      typeForm: {
        operationType: ''
      },
      typeRules: {
        operationType: [
          { required: true, message: '请选择操作类型', trigger: ['blur'] }
        ]
      },
      /**
       * 数据视图
       */
      streetList: [],
      communityList: [],
      genreList: [],
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
      assessInfoList: [],
      assessLevelList: [],
      /**
       * 图片操作
       */
      ImgUrl: '',
      uploudIdx: '',
      bankList: [],
      /**
       * @id 标识
       * @label 名字
       * @type 文件字段
       * @iconArr 主要数据
       * @multiple 是否可以选择多张图片
       * @isOwnFlag 显示隐藏
       * @remark 备注
       */
      uploudFormArr: [
        {
          id: 0,
          label: '1.申请表',
          type: 'application',
          iconArr: [],
          multiple: false,
          isOwnFlag: true,
          remark: ''
        },
        {
          id: 1,
          label: '2.承诺书',
          type: 'promise',
          iconArr: [],
          multiple: false,
          isOwnFlag: true,
          remark: ''
        },
        {
          id: 2,
          label: '3.评估表',
          type: 'assess',
          iconArr: [],
          multiple: false,
          isOwnFlag: true,
          remark: ''
        },
        {
          id: 3,
          label: '4.本人身份证复印件',
          type: 'idCard',
          iconArr: [],
          multiple: false,
          isOwnFlag: true,
          remark: ''
        },
        {
          id: 4,
          label: '5.本人户口本资料',
          type: 'userHomeExtends0',
          iconArr: [],
          multiple: true,
          isOwnFlag: true,
          remark: '支持多张 （备注：包括 本人户口本首页、本人户口页、户口本其他人复印件）'
        },
        {
          id: 5,
          label: '6.本人银行流水凭证',
          type: 'bankImg',
          iconArr: [],
          multiple: false,
          isOwnFlag: true,
          remark: '请上传低收入救助证（备注：与“本人银行流水”选择项有关）'
        },
        {
          id: 6,
          label: '7.是否本人办理',
          type: 'isOwn',
          iconArr: [],
          multiple: false,
          isOwnFlag: true,
          remark: '选择否时，展示代办人身份证复印件及代办人分户口本复印件，选择是时，不展示。'
        },
        {
          id: 7,
          label: '代办人身份证复印件',
          type: 'otherCard',
          iconArr: [],
          multiple: false,
          isOwnFlag: true,
          remark: '要求：身份证复印件正反面一张照片'
        },
        {
          id: 8,
          label: '代办人户口本复印件',
          type: 'userHomeExtends1',
          iconArr: [],
          multiple: true,
          isOwnFlag: true,
          remark: '支持多张'
        },
        {
          id: 9,
          label: '8.赡养费材料',
          type: 'userHomeExtends2',
          iconArr: [],
          multiple: true,
          isOwnFlag: true,
          remark: '支持多张（备注：请上传 其他子女户口本复印件、其他子女银行流水、减免或免除赡养费）'
        }
      ],
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
        allergyId: '',
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
        userRelatives: [],
        // 模块三
        userHome: {
          application: '',
          promise: '',
          assess: '',
          idCard: '',
          bank: '',
          bankImg: '',
          isOwn: '0',
          otherCard: '',
          userHomeExtends0: [{
            extendInfo: '',
            extendType: 0
          }],
          userHomeExtends1: [{
            extendInfo: '',
            extendType: 1
          }],
          userHomeExtends2: [{
            extendInfo: '',
            extendType: 2
          }],
          alimony: '',
          bank1: ''
        },
        alimony: '',
        bank1: '',
        assessInfoId: '',
        assessLevelId: '',
        assessMoney: ''
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
          { required: true, message: '请输入年龄', trigger: ['blur', 'change'] }
        ],
        birthday: [
          { required: true, message: '请输入出生日期', trigger: ['blur', 'change'] }
        ],
        genreId: [
          { required: true, message: '请选择老人类型', trigger: ['blur', 'change'] }
        ],
        linkName: [
          { required: true, message: '请输入紧急联系人姓名', trigger: ['blur'] }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: ['blur'] }
        ],
        linkPhone: [
          { required: true, validator: this.common.isvalidlinkPhone, trigger: ['blur'] }
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
        ],
        // 模块三
        alimony: [
          { required: true, message: '请输入赡养费', trigger: 'blur' },
          { required: true, validator: this.common.isvalidFloat, trigger: 'blur' }
        ],
        bank1: [
          { required: true, message: '请输入银行月流水', trigger: 'blur' },
          { required: true, validator: this.common.isvalidFloat, trigger: 'blur' }
        ],
        assessInfoId: [
          { required: true, message: '请选择评估信息', trigger: ['blur', 'change'] }
        ],
        assessLevelId: [
          { required: true, message: '请选择评估等级', trigger: ['blur', 'change'] }
        ],
        assessMoney: [
          { required: true, message: '请输入补贴金额', trigger: 'blur' },
          { required: true, validator: this.common.isvalidFloat, trigger: 'blur' }
        ]
      },
      // 去世老人
      dieForm: {
        deathTime: '',
        registerReason: ''
      },
      // 人口流动
      removeForm: {
        removeTime: '',
        removeAddress: ''
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
          { required: true, message: '请输入收入情况（元）', trigger: 'blur' },
          { required: true, validator: this.common.isvalidFloat, trigger: ['blur', 'change'] }
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
      userId: '', // 操作数据页面列表查询的userId
      optType: '' // 审核管理 --> 我的申请 --> 重新申请的操作类型
    }
  },

  mounted() {
    const currentUser = this.common.session('currentUser')
    this.id = this.$route.query.id
    /**
     * @type
     * 0：新增
     * 1：编辑
     * 2：详情
     * 3：操作数据
     * 4：审批
     * 5：审批内全部详情
     * 6：重新申请
     * 7：我的申请详情
     */
    this.type = this.$route.query.type
    // 重新申请操作类型
    this.optType = this.$route.query.optType
    this.getStreetList()
    this.getGenreList()
    // 添加&重新申请
    if (this.type === '0' || this.type === '6') {
      this.isModel1 = true
      this.isModel2 = true
      this.isModel3 = true
      if (!currentUser.streetId && !currentUser.communityId) {
      }
      if (currentUser.streetId) {
        this.infoForm.homeStreetId = currentUser.streetId
        this.streetIdDisabled = true
        this.getCommunityList(currentUser.streetId)
      }
      if (currentUser.communityId) {
        this.infoForm.homeStreetId = currentUser.streetId
        this.infoForm.homeCommunityId = currentUser.communityId
        this.streetIdDisabled = true
        this.communityIdDisabled = true
        this.getCommunityList(currentUser.streetId)
      }
      setTimeout(() => {
        this.loading = false
        this.isForm = true
      }, 1000)
      // 获取老人亲属
      this.getList()
    }
    // 详情&操作日志进入&审核&审核详情
    if (this.type === '2' || this.type === '3' || this.type === '4' || this.type === '5' || this.type === '7') {
      this.disabled = true
      this.streetIdDisabled = true
      this.communityIdDisabled = true
      this.isModel1 = true
      this.isModel2 = true
      this.isModel3 = true
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
      // 获取老人亲属
      // this.getList()
    }
    if (this.type === '1') {
      this.typeForm.operationType = '老人数据更新'
      this.operationTypeChange()
    }
    // 编辑&详情
    if (this.id) {
      this.detail()
    }
  },

  methods: {
    // 详情
    async detail() {
      let that = this
      try {
        let findUrl = that.api.user.findById
        // 操作日志进入
        if (this.type === '3') {
          findUrl = that.api.userLog.findById
        }
        if (this.type === '4' || this.type === '5' || this.type === '6' || this.type === '7') {
          findUrl = that.api.approvalUser.findById
        }
        let parameter = { id: this.id }
        const response = await that.request.dataGet(that, findUrl, parameter)
        this.loading = false
        this.isForm = true
        if (response.code === 1) {
          let Data = response.data
          // 操作日志进入
          let userRelatives = Data.userRelatives
          if (this.type === '3') {
            this.userId = Data.userId
            Data = JSON.parse(Data.optDate)
            userRelatives = Data.userRelatives
            // 页面需要默认参数
            Data.userHome = {
              application: '',
              promise: '',
              assess: '',
              idCard: '',
              bank: '',
              bankImg: '',
              isOwn: '0',
              otherCard: '',
              userHomeExtends0: [{
                extendInfo: '',
                extendType: 0
              }],
              userHomeExtends1: [{
                extendInfo: '',
                extendType: 1
              }],
              userHomeExtends2: [{
                extendInfo: '',
                extendType: 2
              }],
              alimony: '',
              bank1: ''
            }
            // 隐藏模块三
            this.isModel3 = false
          }
          // 获取老人亲属信息
          if (this.type === '2' || this.type === '3' || this.type === '4' || this.type === '5' || this.type === '6' || this.type === '7') {
            userRelatives.forEach(item => {
              if (item.isGuardian === '1') {
                item.isGuardian = '是'
              } else {
                item.isGuardian = '否'
              }
              item.createTime = item.createTime.split(' ')[0]
            })
            this.table.list.data = userRelatives
            this.table.paging.total = userRelatives.length
          }
          /**
           * 模块一数据处理
           */
          if (Data.userHome.alimony) {
            Data.alimony = (Data.userHome.alimony / 100).toFixed(2)
          }
          if (Data.userHome.bank1) {
            Data.bank1 = (Data.userHome.bank1 / 100).toFixed(2)
          }
          if (Data.money) {
            Data.money = (Data.money / 100).toFixed(2)
          } else {
            Data.money = '0.00'
          }
          this.getCommunityList(Data.homeStreetId)
          that.infoForm = Data
          if (Data.userHome.isOwn) {
            this.infoForm.userHome.isOwn = Data.userHome.isOwn
          } else {
            this.infoForm.userHome.isOwn = '0'
          }
          // 判断是否本人办理
          // console.log(Data)
          this.isOwnChange()
          // 计算年龄和出生日期
          this.idCardChange()
          // 公安数据
          if (this.type === '4') {
            this.getPoliceList(Data.idCard)
          }
          /**
           * 如果是详情&&普通老人，“第三项居家养老申请材料”隐藏
           */
          if (this.type === '2' && Data.type === '1') {
            this.isModel3 = false
          }
          // 处理老人类型
          if (Data.genreId) {
            let genreArr = JSON.parse(Data.genreId)
            this.infoForm.genreId = genreArr
            // console.log(this.infoForm.genreId)
            that.genreList = this.genreList
          } else {
            this.infoForm.genreId = []
          }
          // 头像
          if (Data.icon) {
            that.ImgUrl = process.env.VUE_APP_FILE + Data.icon
          } else {
            that.ImgUrl = that.errorImg
          }

          that.infoForm.icon = Data.icon
          // 钱转换
          if (Data.assessMoney) {
            this.infoForm.assessMoney = (Data.assessMoney / 100).toFixed(2)
          } else {
            this.infoForm.assessMoney = ''
          }
          // 身高
          if (!Data.height) {
            this.infoForm.height = ''
          }
          // 体重
          if (!Data.weight) {
            this.infoForm.weight = ''
          }
          // 操作日志进入不对模块三进行处理
          if (this.type === '3') {
            return false
          }
          // 图片处理
          if (Data.userHome.id) {
            this.uploudFormArr.forEach((item, index) => {
              switch (item.type) {
                case 'userHomeExtends0':
                  let userHomeArr0 = JSON.parse(Data.userHome.userHomeExtends0[0].extendInfo)
                  userHomeArr0.forEach(item => {
                    this.srcList.push(process.env.VUE_APP_FILE + item)
                    this.uploudFormArr[index].iconArr.push({
                      icon: item,
                      iconAll: process.env.VUE_APP_FILE + item
                    })
                  })
                  break
                case 'userHomeExtends1':
                  let userHomeArr1 = JSON.parse(Data.userHome.userHomeExtends1[0].extendInfo)
                  userHomeArr1.forEach(item => {
                    this.srcList.push(process.env.VUE_APP_FILE + item)
                    this.uploudFormArr[index].iconArr.push({
                      icon: item,
                      iconAll: process.env.VUE_APP_FILE + item
                    })
                  })
                  break
                case 'userHomeExtends2':
                  let userHomeArr2 = JSON.parse(Data.userHome.userHomeExtends2[0].extendInfo)
                  userHomeArr2.forEach(item => {
                    this.srcList.push(process.env.VUE_APP_FILE + item)
                    this.uploudFormArr[index].iconArr.push({
                      icon: item,
                      iconAll: process.env.VUE_APP_FILE + item
                    })
                  })
                  break
                case 'isOwn':
                  this.uploudFormArr[index].iconArr = []
                  break
                default:
                  if (Data.userHome[item.type]) {
                    let userArr = JSON.parse(Data.userHome[item.type])
                    if (userArr[0]) {
                      this.srcList.push(process.env.VUE_APP_FILE + userArr[0])
                    }
                    if (userArr.length > 0) {
                      this.uploudFormArr[index].iconArr.push({
                        icon: userArr[0],
                        iconAll: process.env.VUE_APP_FILE + userArr[0]
                      })
                    }
                  }
                  break
              }
            })
            // console.log(this.srcList)
          }
          return false
        }
        that.$message.error(response.msg)
      } catch (even) {
        // console.log(even)
        this.$message.error(even)
      }
    },
    // 操作类型
    operationTypeChange() {
      switch (this.typeForm.operationType) {
        case '老人数据更新':
          this.isModel1 = true
          this.isModel2 = true
          this.isModel3 = false
          this.isModel4 = false
          this.isModel5 = false
          // 获取亲属信息
          this.getList()
          break
        case '去世老人数据更新':
          this.isModel1 = false
          this.isModel2 = false
          this.isModel3 = false
          this.isModel4 = true
          this.isModel5 = false
          break
        case '流动人口数据更新':
          this.isModel1 = false
          this.isModel2 = false
          this.isModel3 = false
          this.isModel4 = false
          this.isModel5 = true
          break
        case '普通申请居家养老':
          this.isModel1 = false
          this.isModel2 = false
          this.isModel3 = true
          this.isModel4 = false
          this.isModel5 = false
          // this.infoForm.userHome.isOwn = '0'
          break
        case '居家养老材料数据更新':
          this.isModel1 = false
          this.isModel2 = false
          this.isModel3 = true
          this.isModel4 = false
          this.isModel5 = false
          // this.infoForm.userHome.isOwn = '0'
          break
      }
    },
    /**
     * 审核管理 --- 审核操作
     */
    // 公安数据
    async getPoliceList(idCard) {
      const that = this
      try {
        let findUrl = this.api.population.findAll
        let url = findUrl + '?page=1&size=10'
        let obj = {
          idCard: idCard
        }
        const response = await this.request.dataGet(that, url, obj)
        this.$refs.trigger0.loading = false
        response.data.content.forEach(item => {
          let userCard = item.idCard
          if (userCard) {
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
            item.age = age
          }
          if (this.infoForm.name !== item.name) {
            item.nameColor = 'red'
          }
          if (this.infoForm.phone !== item.phone) {
            item.phoneColor = 'red'
          }
          if (parseInt(this.infoForm.age) !== parseInt(item.age)) {
            item.ageColor = 'red'
          }
        })
        that.policeTable.list.data = response.data.content
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    // 通过
    pass(row) {
      const that = this
      that.$confirm('您确定要通过么？', '提示', {
        type: 'warning'
      }).then(async () => {
        let url = this.api.approvalUser.approved + '?id=' + this.id
        let obj = {
          // id: this.id
        }
        const response = await this.request.dataPut(that, url, obj)
        if (response.code === 1) {
          that.$message.success(response.msg)
          that.$router.push({ path: 'forMyApprovalView' })
          return false
        }
        that.$message.error(response.msg)
      }).catch((response) => {
        that.$message.error(response.msg)
      })
    },
    // 驳回
    reject(row) {
      this.isShowRemark = true
    },
    closeRemarkDialog() {
      this.isShowRemark = false
      this.$refs['remarkForm'].resetFields()
      this.remarkForm.approvalRemark = ''
    },
    saveRemarkDialog() {
      const that = this
      this.$refs['remarkForm'].validate(async (valid) => {
        if (valid) {
          try {
            let url = that.api.approvalUser.rejected
            let obj = {
              id: that.id,
              approvalRemark: that.remarkForm.approvalRemark
            }
            let response = await this.request.dataPut(that, url, obj)
            if (response.code === 1) {
              that.$message.success(response.msg)
              that.$router.push({ path: 'forMyApprovalView' })
              return false
            }
            that.$message.error(response.msg)
          } catch (even) {
            that.$message.error('数据获取失败')
          }
        }
      })
    },
    /**
     * 整体获取视图数据
     */
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
      const currentUser = this.common.session('currentUser')
      // 添加不做校验
      if (this.type === '0' || this.type === '6') {
        this.infoForm.homeCommunityId = ''
        this.getCommunityList(val)
        return
      }
      // 非街道或社区管理员不校验
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
    community() {
      const currentUser = this.common.session('currentUser')
      // 添加不做校验
      if (this.type === '0' || this.type === '6') {
        return
      }
      // 非街道或社区管理员不校验
      if (!currentUser.streetId && !currentUser.communityId) {
        return
      }
      // 街道管理员不校验
      if (!currentUser.communityId) {
        return
      }
      // 判断街道是否修改  如修改不进行校验
      if (this.infoForm.homeStreetId !== currentUser.streetId) {
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
    getGenreList() {
      const that = this
      let arr = [
        {
          label: 'genreList',
          code: 'lrlx'
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
        },
        {
          label: 'assessInfoList',
          code: 'pgxx'
        },
        {
          label: 'assessLevelList',
          code: 'pgdj'
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
    iconChange(file) {
      let that = this
      let FileSize = file.size / 1024 / 1024 < 500
      if (!FileSize) {
        that.$message.error('上传超出文件限制大小')
        return false
      }
      this.isSubmitLoading = true
    },
    iconSuccess(response, file, fileList) {
      let that = this
      if (response.code === 1) {
        that.ImgUrl = response.data.fileLongPath
        that.infoForm.icon = response.data.filePath
        that.$message.success(response.msg)
        return false
      }
    },
    // 老人类别
    typeChange(type) {
      if (type === '1') {
        this.isModel3 = false
      } else {
        this.isModel3 = true
      }
    },
    // 计算年龄和出生日期
    idCardChange() {
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
      this.agedVerify()
      // 得到年龄
      this.infoForm.age = age
      // 得到出生日期
      this.infoForm.birthday = yearBirth + '-' + monthBirth + '-' + dayBirth
      // 设置本人银行流水凭证
      this.setBankList()
    },
    phoneChange() {
      this.agedVerify()
    },
    // 校验老人信息
    async agedVerify() {
      const that = this
      // 编辑不需要验证
      if (this.id) {
        return
      }
      try {
        let url = this.api.user.verify
        let obj = {
          idCard: this.infoForm.idCard,
          phone: this.infoForm.phone
        }
        const response = await this.request.dataGet(that, url, obj)
        if (response.code === 0) {
          that.$message.error(response.msg)
        }
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    // 设置本人银行流水凭证
    setBankList() {
      let arr = [
        {
          label: '低收入救助证',
          value: '低收入救助证'
        },
        {
          label: '特困证供养证',
          value: '特困证供养证'
        },
        {
          label: '退役军人优抚证',
          value: '退役军人优抚证'
        },
        {
          label: '工作证明',
          value: '工作证明'
        },
        {
          label: '无收入证明',
          value: '无收入证明'
        },
        {
          label: '失业证',
          value: '失业证'
        },
        {
          label: '街道存档证明',
          value: '街道存档证明'
        },
        {
          label: '副食补贴',
          value: '副食补贴'
        },
        {
          label: '独居证明证',
          value: '独居证明证'
        },
        {
          label: '独生子女证',
          value: '独生子女证'
        },
        {
          label: '总工会劳模证',
          value: '总工会劳模证'
        }
      ]
      if (parseInt(this.infoForm.age) > parseInt(80)) {
        arr = [
          {
            label: '近3月银行流水',
            value: '近3月银行流水'
          },
          {
            label: '工作证明',
            value: '工作证明'
          },
          {
            label: '无收入证明',
            value: '无收入证明'
          },
          {
            label: '失业证',
            value: '失业证'
          },
          {
            label: '街道存档证明',
            value: '街道存档证明'
          },
          {
            label: '副食补贴',
            value: '副食补贴'
          },
          {
            label: '独居证明证',
            value: '独居证明证'
          },
          {
            label: '独生子女证',
            value: '独生子女证'
          },
          {
            label: '总工会劳模证',
            value: '总工会劳模证'
          }
        ]
      }
      this.bankList = arr
      // 设置选中值
      if (this.infoForm.userHome.bank) {
        this.infoForm.userHome.bank = this.infoForm.userHome.bank
      }
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
          userId: this.id
        }
        const response = await this.request.dataGet(that, url, obj)
        // 拦截
        if (!this.id || this.type === '4' || this.type === '5' || this.type === '6' || this.type === '7') {
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
        that.infoForm.userRelatives = response.data.content
        that.table.list.data = response.data.content
        that.table.paging.total = response.data.totalElements
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    handleSizeChange(val) {
      this.table.paging.limit = val
    },
    handleCurrentChange(val) {
      this.table.paging.currentPage = val
    },
    add() {
      this.title = '添加亲属'
      this.isShow = true
      this.isBtn = true
    },
    closeDialog() {
      this.isShow = false
      this.openId = ''
      this.openType = ''
      this.$refs['form'].resetFields()
      setTimeout(() => {
        this.isBtn = true
      }, 500)
      this.form = {
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
      }
    },
    // 保存老人亲属
    saveDialog() {
      const that = this
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          try {
            let income = parseFloat(this.form.income) * parseInt(100)
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
            // 添加老人
            if (!this.id || this.type === '4' || this.type === '5' || this.type === '6' || this.type === '7') {
              // 判断是否存在
              try {
                that.table.list.data.forEach(item => {
                  // 判断是否修改的是当前数据
                  if (this.openId !== item.id) {
                    if (item.isGuardian === '是' && this.form.isGuardian === '1') {
                      throw new Error('该老人已设置监护人，请勿重复设置。')
                    }
                    if (item.idCard === this.form.idCard && this.openId !== item.id) {
                      throw new Error('该亲属信息已存在，请勿重复填写。')
                    }
                  }
                })
              } catch (e) {
                that.$message.error(e.message)
                return false
              }
              // 设置创建时间
              obj.createTime = this.common.getFormDate(0)
              // 修改
              if (that.openId) {
                let tableArr = []
                obj.isGuardian === '1' ? obj.isGuardian = '是' : obj.isGuardian = '否'
                that.table.list.data.forEach((item, index) => {
                  if (item.id === that.openId) {
                    obj.id = that.table.list.data[index].id
                    item[index] = obj
                    tableArr.push(obj)
                  } else {
                    tableArr.push(item)
                  }
                })
                that.table.list.data = tableArr
                that.$message.success('编辑成功')
                that.closeDialog()
                return false
              }
              this.dataIndex++
              obj.id = this.dataIndex
              obj.isGuardian === '1' ? obj.isGuardian = '是' : obj.isGuardian = '否'
              that.table.list.data.unshift(obj)
              that.$message.success('添加成功')
              that.table.paging.total = that.table.list.data.length
              that.closeDialog()
              return false
            }
            obj.userId = this.id
            // 编辑老人
            let url = that.api.userRelative.insert
            let response = null
            if (that.openId) {
              url = that.api.userRelative.update
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
    async edit(row, openType, i) {
      const that = this
      this.openType = openType
      try {
        // 添加老人
        if (!this.id || this.type === '4' || this.type === '5' || this.type === '6' || this.type === '7') {
          const rowData = row
          that.openId = rowData.id
          that.isShow = true
          if (openType === '1') {
            that.title = '亲属详情'
            that.isBtn = false
          } else {
            that.title = '编辑亲属'
            that.isBtn = true
          }
          that.form = {
            id: rowData.id,
            name: rowData.name,
            sex: rowData.sex,
            relationship: rowData.relationship,
            phone: rowData.phone,
            idCard: rowData.idCard,
            job: rowData.job,
            income: (rowData.income / 100).toFixed(2),
            isGuardian: rowData.isGuardian === '是' ? '1' : '0',
            address: rowData.address
          }
          return false
        }
        let findUrl = that.api.userRelative.findById
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
    delete(row, idx) {
      const that = this
      that.$confirm('您确定要删除么?', '提示', {
        type: 'warning'
      }).then(async () => {
        // 添加老人
        if (!this.id || this.type === '4' || this.type === '5' || this.type === '6' || this.type === '7') {
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
    /**
     * 模块三操作
     */
    // 查看缩略图
    imgClick(val) {
      this.imgDialog.dialogVisible = true
      this.imgDialog.dialogPicSrc = val
    },
    handleClose(val) {
      this.imgDialog.dialogVisible = false
      this.imgDialog.dialogPicSrc = ''
    },
    isOwnChange() {
      if (this.infoForm.userHome.isOwn === '0') {
        this.uploudFormArr[7].isOwnFlag = true
        this.uploudFormArr[8].isOwnFlag = true
      } else {
        this.uploudFormArr[7].isOwnFlag = false
        this.uploudFormArr[8].isOwnFlag = false
      }
    },
    getUploudIdx(idx) {
      imgNum = 0
      fileNum = 0
      this.uploudIdx = idx
    },
    handleContentChange(file, fileList) {
      let that = this
      fileNum++
      let FileSize = file.size / 1024 / 1024 < 500
      if (!FileSize) {
        that.$message.error('上传超出文件限制大小')
        return false
      }
      this.isSubmitLoading = true
    },
    handleAvatarSuccess(response, file, fileList) {
      let that = this
      let uploudIdx = this.uploudIdx
      if (response.code === 1) {
        // 只允许上传一张
        if (uploudIdx === 0 || uploudIdx === 1 || uploudIdx === 2 || uploudIdx === 3 || uploudIdx === 5 || uploudIdx === 7) {
          if (that.uploudFormArr[uploudIdx].iconArr.length === 1) {
            that.$message.error('您已上传，请先删除，再上传')
            return false
          }
        }
        // 只允许上传三张
        // if (uploudIdx === 4 || uploudIdx === 9) {
        //   if (that.uploudFormArr[uploudIdx].iconArr.length === 3) {
        //     that.$message.error('您已上传，请先删除，再上传')
        //     return false
        //   }
        // }
        that.uploudFormArr[uploudIdx].iconArr.push({
          iconAll: response.data.fileLongPath,
          icon: response.data.filePath
        })
        imgNum++
        if (fileNum === imgNum) {
          that.$message.success(response.msg)
        }
      }
    },
    // 删除照片
    deleteImg(idx, index) {
      let that = this
      let uploudFormArr = that.uploudFormArr
      uploudFormArr[index].iconArr.splice(idx, 1)
    },
    // 添加数据
    onSubmit() {
      let that = this
      that.$refs.infoForm.validate(async (index) => {
        if (index === false) {
          return false
        }
        this.loading = true
        try {
          let url = this.api.user.insert
          let response = null
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
          let assessInfo = ''
          this.assessInfoList.forEach(item => {
            if (this.infoForm.assessInfoId === item.id) {
              assessInfo = item.name
            }
          })
          let assessLevel = ''
          this.assessLevelList.forEach(item => {
            if (this.infoForm.assessLevelId === item.id) {
              assessLevel = item.name
            }
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
            allergyId: this.infoForm.allergyId,
            mentallyId: this.infoForm.mentallyId,
            allergySource: this.infoForm.allergySource,
            drug: this.infoForm.drug,
            bodyId: this.infoForm.bodyId,
            mentalId: this.infoForm.mentalId,
            specialtyId: this.infoForm.specialtyId,
            demand: this.infoForm.demand,
            cardCode: this.infoForm.cardCode,
            receiveId: this.infoForm.receiveId,
            receive: this.infoForm.receiveId === '1' ? '是' : '否',
            // 亲属信息
            userRelatives: userRelatives,
            // 模块三
            userHome: {
              bank: this.infoForm.userHome.bank,
              isOwn: this.infoForm.userHome.isOwn,
              idCard: this.uploudFormArr[7].iconArr.length > 0 ? this.uploudFormArr[7].iconArr[0].icon : '',
              alimony: parseFloat(this.infoForm.alimony) * parseFloat(100),
              bank1: parseFloat(this.infoForm.bank1) * parseFloat(100)
            },
            assessInfoId: this.infoForm.assessInfoId,
            assessInfo: assessInfo,
            assessLevelId: this.infoForm.assessLevelId,
            assessLevel: assessLevel,
            assessMoney: parseFloat(this.infoForm.assessMoney) * parseFloat(100)
          }
          /**
           * 模块三数据处理
           */
          if (this.isModel3) {
            try {
              this.uploudFormArr.forEach(item => {
                let arr = []
                if (item.iconArr.length === 0 && item.label !== '7.是否本人办理' && item.isOwnFlag) {
                  throw new Error(item.label)
                }
                item.iconArr.forEach(items => {
                  arr.push(items.icon)
                })
                switch (item.type) {
                  case 'userHomeExtends0':
                    obj.userHome[item.type] = [{
                      extendInfo: JSON.stringify(arr),
                      extendType: 0
                    }]
                    break
                  case 'userHomeExtends1':
                    obj.userHome[item.type] = [{
                      extendInfo: JSON.stringify(arr),
                      extendType: 1
                    }]
                    break
                  case 'userHomeExtends2':
                    obj.userHome[item.type] = [{
                      extendInfo: JSON.stringify(arr),
                      extendType: 2
                    }]
                    break
                  case 'isOwn':
                    arr = ''
                    break
                  default:
                    obj.userHome[item.type] = JSON.stringify(arr)
                    break
                }
              })
            } catch (e) {
              // console.log(e.message)
              that.loading = false
              that.$message.error('请上传' + e.message + '材料')
              return false
            }
          }
          // 编辑 && 我的申请中操作类型不是 --> “居家老人申请”
          if (that.id && this.optType !== '居家老人申请') {
            // 老人数据更新
            if (this.typeForm.operationType === '老人数据更新') {
              // 普通老人不传userHome
              if (this.infoForm.type === '1') {
                delete obj.userHome
              }
              url = that.api.user.userUpdate
            }
            // 去世老人数据更新
            if (this.typeForm.operationType === '去世老人数据更新') {
              let url = this.api.user.deathUserUpdate
              this.dieForm.id = this.id
              let response = await this.request.dataPut(that, url, this.dieForm)
              this.loading = false
              if (response.code === 1) {
                this.$message.success(response.msg)
                this.$router.push({ path: 'agedMsgView' })
                return false
              }
              this.$message.error(response.msg)
              return false
            }
            // 流动人口数据更新
            if (this.typeForm.operationType === '流动人口数据更新') {
              let url = this.api.user.removeAddressUserUpdate
              this.removeForm.id = this.id
              let response = await this.request.dataPut(that, url, this.removeForm)
              this.loading = false
              if (response.code === 1) {
                this.$message.success(response.msg)
                this.$router.push({ path: 'agedMsgView' })
                return false
              }
              this.$message.error(response.msg)
              return false
            }
            // 普通申请居家养老
            if (this.typeForm.operationType === '普通申请居家养老' || this.optType === '普通申请居家养老') {
              url = that.api.user.applyForUserHomeUpdate
            }
            // 居家养老材料数据更新
            if (this.typeForm.operationType === '居家养老材料数据更新' || this.optType === '居家养老材料数据更新') {
              url = that.api.user.userHomeUpdate
            }
            obj.id = that.id
            response = await this.request.dataPut(that, url, obj)
          } else {
            // 普通老人不传userHome
            if (this.infoForm.type === '1') {
              delete obj.userHome
            }
            response = await this.request.dataPost(that, url, obj)
          }
          this.loading = false
          if (response.code === 1) {
            // 我的申请提交
            if (this.type === '6') {
              this.$message.success('申请提交成功')
              this.$router.go(-1)
              return false
            }
            this.$message.success(response.msg)
            this.$router.push({ path: 'agedMsgView' })
            return false
          }
          this.$message.error(response.msg)
        } catch (even) {
          this.$message.error(even)
        }
      })
    },
    onPageReturn() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.agedMsgAdd .el-pagination {
  margin: 0px;
  padding: 0px;
}

.agedMsgAdd .warp-main {
  margin-top: 90px;
}

.agedMsgAdd .hander {
  padding: 5px 0;
  margin-bottom: 10px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px dashed #999;
  color: #009966;
}
.agedMsgAdd .min-title {
  padding: 5px 0;
  margin-bottom: 10px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px solid #999;
}
.agedMsgAdd .upload-demo {
  float: left;
}
.agedMsgAdd .imgFlex {
  display: flex;
  flex-flow: wrap;
}
.agedMsgAdd .agedMsgImg {
  /* cursor: pointer; */
  width: 100px;
  height: 100px;
}
.agedMsgAdd .ps {
  padding-left: 10px;
  color: #409eff;
}
</style>
