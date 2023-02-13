export default {
  /**
   * @login 用户登录
   * @PutPassWord  修改用户密码
   */
  userlogin: {
    login: '/service/webadmin/webadmin/signIn',
    PutPassWord: '/service/webadmin/webadmin/updatePwd'
  },
  /**
   * 呼叫中心
   */
  ivr: {
    loginCallback: '/service/webadmin/ivr/baseService/loginCallback',
    findAll: '/service/webadmin/ivr/archivesUser/findAll',
    insert: '/service/webadmin/ivr/archivesUser/insert',
    findById: '/service/webadmin/ivr/archivesUser/findById',
    update: '/service/webadmin/ivr/archivesUser/update'
  },
  /*
   * 统计报表
   */
  reports: {
    countByCommunity: '/service/webadmin/report/countByCommunity',
    countByCommunityToExcel: '/service/webadmin/report/countByCommunityToExcel',
    countByProvider: '/service/webadmin/report/countByProvider',
    countByProviderToExcel: '/service/webadmin/report/countByProviderToExcel',
    providerList: '/service/webadmin/provider/provider/findAll',
    communityList: '/service/webadmin/basicinfo/community/findAll',
    streetList: '/service/webadmin/basicinfo/street/findAll',
    countByEmploy: '/service/webadmin/report/countByEmploy',
    countByEmployToExcel: '/service/webadmin/report/countByEmployToExcel',
    countByUser: '/service/webadmin/report/countByUser',
    countByUserToExcel: '/service/webadmin/report/countByUserToExcel',
    countByOrder: '/service/webadmin/report/countByOrder',
    countByOrderToExcel: '/service/webadmin/report/countByOrderToExcel',
    countByOrderState: '/service/webadmin/report/countByOrderState',
    countByOrderStateToExcel: '/service/webadmin/report/countByOrderStateToExcel',
  },
  /**
   * 网站后台管理
   */
  // 文件夹管理
  resourceFolder: {
    findAll: '/service/webadmin/cms/resourceFolder/findAll',
    insert: '/service/webadmin/cms/resourceFolder/insert',
    findById: '/service/webadmin/cms/resourceFolder/findById',
    deleteById: '/service/webadmin/cms/resourceFolder/delete',
    update: '/service/webadmin/cms/resourceFolder/update'
  },
  // 资源库管理
  resourceLib: {
    findAll: '/service/webadmin/cms/resourceLib/findAll',
    insert: '/service/webadmin/cms/resourceLib/insert',
    deleteById: '/service/webadmin/cms/resourceLib/delete',
    upload: '/service/base/file/uploadFile'
  },
  // 栏目管理
  category: {
    findAll: '/service/webadmin/cms/category/findAll',
    insert: '/service/webadmin/cms/category/insert',
    findById: '/service/webadmin/cms/category/findById',
    deleteById: '/service/webadmin/cms/category/delete',
    update: '/service/webadmin/cms/category/update'
  },
  // 文章管理
  art: {
    findAll: '/service/webadmin/cms/art/findAll',
    insert: '/service/webadmin/cms/art/insert',
    findById: '/service/webadmin/cms/art/findById',
    deleteById: '/service/webadmin/cms/art/delete',
    update: '/service/webadmin/cms/art/update'
  },
  // 活动管理
  activity: {
    findAll: '/service/webadmin/activity/findAll',
    insert: '/service/webadmin/activity/insert',
    findById: '/service/webadmin/activity/findById',
    deleteById: '/service/webadmin/activity/delete',
    update: '/service/webadmin/activity/update'
  },
  /**
   * 基础信息管理
   */
  // 服务商管理
  provider: {
    findAll: '/service/webadmin/provider/provider/findAll',
    insert: '/service/webadmin/provider/provider/insert',
    findById: '/service/webadmin/provider/provider/findById',
    update: '/service/webadmin/provider/provider/update',
    updateStatus: '/service/webadmin/provider/provider/updateStatus',
    assignProvider: '/service/webadmin/provider/provider/assignProvider'
  },
  // 服务栏目
  serviceType1: {
    findAll: '/service/webadmin/service/serviceType1/findAll',
    insert: '/service/webadmin/service/serviceType1/insert',
    findById: '/service/webadmin/service/serviceType1/findById',
    deleteById: '/service/webadmin/service/serviceType1/delete',
    update: '/service/webadmin/service/serviceType1/update'
  },
  // 服务类别
  serviceType2: {
    findAll: '/service/webadmin/service/serviceType2/findAll',
    insert: '/service/webadmin/service/serviceType2/insert',
    findById: '/service/webadmin/service/serviceType2/findById',
    deleteById: '/service/webadmin/service/serviceType2/delete',
    update: '/service/webadmin/service/serviceType2/update'
  },
  // 服务项目
  serviceProject: {
    findAll: '/service/webadmin/service/serviceProject/findAll',
    insert: '/service/webadmin/service/serviceProject/insert',
    findById: '/service/webadmin/service/serviceProject/findById',
    deleteById: '/service/webadmin/service/serviceProject/delete',
    update: '/service/webadmin/service/serviceProject/update',
    exportFindData: '/service/webadmin/service/serviceProject/exportFindData',
    getServiceProjectVm: '/service/webadmin/service/serviceProject/getServiceProjectVm',
    getByProviderId: '/service/webadmin/provider/providerProject/getByProviderId'
  },
  // 街道管理
  street: {
    findAll: '/service/webadmin/basicinfo/street/findAll',
    insert: '/service/webadmin/basicinfo/street/insert',
    findById: '/service/webadmin/basicinfo/street/findById',
    deleteById: '/service/webadmin/basicinfo/street/delete',
    update: '/service/webadmin/basicinfo/street/update'
  },
  // 社区管理
  community: {
    findAll: '/service/webadmin/basicinfo/community/findAll',
    insert: '/service/webadmin/basicinfo/community/insert',
    findById: '/service/webadmin/basicinfo/community/findById',
    update: '/service/webadmin/basicinfo/community/update'
  },
  // 网格管理
  grid: {
    findAll: '/service/webadmin/basicinfo/grid/findAll',
    insert: '/service/webadmin/basicinfo/grid/insert',
    findById: '/service/webadmin/basicinfo/grid/findById',
    update: '/service/webadmin/basicinfo/grid/update'
  },
  // 动态字典
  dicManage: {
    findAll: '/service/webadmin/basicinfo/dicManage/findAll',
    insert: '/service/webadmin/basicinfo/dicManage/insert',
    findById: '/service/webadmin/basicinfo/dicManage/findById',
    update: '/service/webadmin/basicinfo/dicManage/update',
    delete: '/service/webadmin/basicinfo/dicManage/delete'
  },
  // 服务人员管理
  servant: {
    delete: '/service/webadmin/provider/employ/delete',
    findAll: '/service/webadmin/provider/employ/findAll',
    insert: '/service/webadmin/provider/employ/insert',
    findById: '/service/webadmin/provider/employ/findById',
    update: '/service/webadmin/provider/employ/update'
  },
  /**
   * 老人档案管理
   */
  // 老人信息管理
  user: {
    findAll: '/service/webadmin/user/user/findAll',
    insert: '/service/webadmin/user/user/insert',
    findById: '/service/webadmin/user/user/findById',
    userUpdate: '/service/webadmin/user/user/userUpdate', // 老人数据更新
    deathUserUpdate: '/service/webadmin/user/user/deathUserUpdate', // 去世老人数据更新
    removeAddressUserUpdate: '/service/webadmin/user/user/removeAddressUserUpdate', // 流动人口数据更新
    applyForUserHomeUpdate: '/service/webadmin/user/user/applyForUserHomeUpdate', // 普通申请居家养老
    userHomeUpdate: '/service/webadmin/user/user/userHomeUpdate', // 居家养老材料数据更新
    assessRecordUpdate: '/service/webadmin/user/user/assessRecordUpdate', // 更新老人评估等级
    verify: '/service/webadmin/user/user/verify',
    retemplateCardCodeExportApply: '/service/webadmin/user/user/templateCardCodeExport', // 模板导出
    importCardCodeData: '/service/webadmin/user/user/importCardCodeData', // 模入数据
    userExport: '/service/webadmin/user/user/userExport', // 导出老人数据
    findAllAccount: '/service/webadmin/user/user/findAllAccount',
    findAllAccountByUserId: '/service/webadmin/user/user/findAllAccountByUserId',
    findByUserAccountId: '/service/webadmin/user/userAccountList/findByUserId',
    findAllCardCode: '/service/webadmin/user/user/findAllCardCode',
    findAllCardCodeById: '/service/webadmin/user/user/findCardCodeById',
    receiveCardCode: '/service/webadmin/user/user/receiveCardCode',
    CardCodeUpdate: '/service/webadmin/user/user/cardCodeUpdate',
    isValid: '/service/webadmin/user/user/isValid',
    findUserSubsidy: '/service/webadmin/user/user/findUserSubsidy'
  },
  // 操作日志
  userLog: {
    findAll: '/service/webadmin/user/userLog/findAll',
    findById: '/service/webadmin/user/userLog/findById'
  },
  // 亲属信息管理
  userRelative: {
    findAll: '/service/webadmin/user/userRelative/findAll',
    insert: '/service/webadmin/user/userRelative/insert',
    findById: '/service/webadmin/user/userRelative/findById',
    update: '/service/webadmin/user/userRelative/update',
    delete: '/service/webadmin/user/userRelative/delete'
  },
  // 注册数据管理
  appUser: {
    findAll: '/service/webadmin/user/appUser/findAll',
    findByPhoneOrIdCardIvrOrder: '/service/webadmin/user/appUser/findByPhoneOrIdCardIvrOrder', // 呼叫中心进入
    findById: '/service/webadmin/user/appUser/findById',
    resetPassword: '/service/webadmin/user/appUser/resetPassword'
  },
  // 老人数据采集
  collectUser: {
    findAll: '/service/webadmin/collect/collectUser/findAll',
    findById: '/service/webadmin/collect/collectUser/findById',
    update: '/service/webadmin/collect/collectUser/update',
    importData: '/service/webadmin/collect/collectUser/importData', // 导入数据
    synchronizationInsert: '/service/webadmin/collect/collectUser/synchronizationInsert', // 同步更新
    templateExport: '/service/webadmin/collect/collectUser/templateExport', // 导出
    importData1: '/service/webadmin/user/user/userImport' // 导入数据
  },
  // 老人数据采集
  collectRelative: {
    findAll: '/service/webadmin/collect/collectRelative/findAll',
    findById: '/service/webadmin/collect/collectRelative/findById',
    update: '/service/webadmin/collect/collectRelative/update',
    delete: '/service/webadmin/collect/collectRelative/delete',
    insert: '/service/webadmin/collect/collectRelative/insert'
  },
  /**
   * 审批管理
   */
  approvalUser: {
    findAllPendingMeApproval: '/service/webadmin/approval/approvalUser/findAllPendingMeApproval', // 待我审批
    findAllMeApproved: '/service/webadmin/approval/approvalUser/findAllMeApproved', // 我已审批
    findAllMyApplication: '/service/webadmin/approval/approvalUser/findAllMyApplication', // 我的申请
    findAllMeApprovalRecord: '/service/webadmin/approval/approvalUser/findAllMeApprovalRecord', // 审批记录
    approved: '/service/webadmin/approval/approvalUser/approved', // 通过审批
    rejected: '/service/webadmin/approval/approvalUser/rejected', // 驳回审批
    findById: '/service/webadmin/approval/approvalUser/findById', // 详情
    reApply: '/service/webadmin/approval/approvalUser/reApply' // 重新申请
  },
  /**
   * 系统管理
   */
  // 字典定义
  dic: {
    findAll: '/service/webadmin/basicinfo/dic/findAll',
    insert: '/service/webadmin/basicinfo/dic/insert',
    findById: '/service/webadmin/basicinfo/dic/findById',
    delete: '/service/webadmin/basicinfo/dic/delete',
    update: '/service/webadmin/basicinfo/dic/update'
  },
  role: {
    findAll: '/webadmin/permission/role/findAll',
    insert: '/webadmin/permission/role/insert',
    findById: '/webadmin/permission/role/findById',
    update: '/webadmin/permission/role/update',
    delete: '/webadmin/permission/role/delete',
    deleteById: '/webadmin/permission/role/deleteById',
    deleteRole: '/webadmin/permission/role/deleteRole'
  },
  /**
   * @findAll 人员管理-获取分页数据
   * @insert 人员管理-创建数据
   * @initPersonnelManagement 获取下拉列表
   * @deleteById 角色管理-删除单条
   * @update 角色管理-更新单条
   */
  renyuanapi: {
    findAll: 'webadmin/system/personnelManagement/findAll',
    insert: 'webadmin/system/personnelManagement/insert',
    initPersonnelManagement: 'webadmin/system/personnelManagement/initPersonnelManagement',
    deleteById: 'webadmin/system/personnelManagement/delete',
    update: 'webadmin/system/personnelManagement/update'
  },
  approval: {
    findAll: '/service/webadmin/approval/approvalConfig/findAll',
    insert: '/service/webadmin/approval/approvalConfig/insert',
    findById: '/service/webadmin/approval/approvalConfig/findById',
    delete: '/service/webadmin/approval/approvalConfig/delete',
    update: '/service/webadmin/approval/approvalConfig/update'
  },
  webadmin: {
    findAll: '/service/webadmin/webadmin/findAll',
    insert: '/service/webadmin/webadmin/insert',
    findById: '/service/webadmin/webadmin/findById',
    delete: '/service/webadmin/webadmin/delete',
    update: '/service/webadmin/webadmin/update',
    updatePassword: '/service/webadmin/webadmin/updatePassword'
  },
  // 分配权限
  rolePermission: {
    findAll: '/webadmin/permission/rolePermission/findAll',
    insert: '/webadmin/permission/rolePermission/insert'
  },
  /**
   * 订单管理
   */
  order: {
    findAll: '/service/webadmin/order/findAll',
    findById: '/service/webadmin/order/findById',
    findByWorkOrderNo: '/service/webadmin/order/findByWorkOrderNo',
    evaluate: '/service/webadmin/order/evaluate',
    insert: '/service/webadmin/order/insert',
    updateProvider: '/service/webadmin/order/updateProvider',
    cancel: '/service/webadmin/order/cancel'
  },
  organization: {
    findAll: '/service/webadmin/organization/organization/findAll',
    insert: '/service/webadmin/organization/organization/insert',
    findById: '/service/webadmin/organization/organization/findById',
    delete: '/service/webadmin/organization/organization/delete',
    update: '/service/webadmin/organization/organization/update'
  },
  organizationProject: {
    findAll: '/service/webadmin/organization/organizationProject/findAll',
    insert: '/service/webadmin/organization/organizationProject/insert',
    findById: '/service/webadmin/organization/organizationProject/findById',
    delete: '/service/webadmin/organization/organizationProject/delete',
    update: '/service/webadmin/organization/organizationProject/update'
  },
  cameraAdministration: {
    findAll: '/service/webadmin/device/monitor/findAll',
    insert: '/service/webadmin/device/monitor/insert',
    findById: '/service/webadmin/device/monitor/findById',
    delete: '/service/webadmin/device/monitor/delete',
    update: '/service/webadmin/device/monitor/update'
  },
  population: {
    findAll: '/service/webadmin/policemen/population/findAll'
  },
  deathPopulation: {
    findAll: '/service/webadmin/policemen/deathPopulation/findAll',
    Update: '/service/webadmin/policemen/deathPopulation/synchronizationUpdate'
  },
  hujilaoren: {
    findAll: '/service/webadmin/laorenzhucan/hujilaoren/findAll'
  },
  juzhulaoren: {
    findAll: '/service/webadmin/laorenzhucan/juzhulaoren/findAll'
  },
  shangjiacanbu: {
    findAll: '/service/webadmin/laorenzhucan/shangjiacanbu/findAll'
  },
  shequguanjia: {
    findAll: '/service/webadmin/laorenzhucan/shequguanjia/findAll'
  },
  shitang: {
    findAll: '/service/webadmin/laorenzhucan/shitang/findAll'
  },
  zhucan: {
    findAll: '/service/webadmin/laorenzhucan/zhucan/findAll'
  },
  movePopulation: {
    findAll: '/service/webadmin/policemen/movePopulation/findAll',
    Update: '/service/webadmin/policemen/movePopulation/synchronizationUpdate'
  },
  Baseart: {
    findAll: '/service/base/cms/art/findAll',
    findById: '/service/base/cms/art/findById'
  },
  MenuTree: {
    findAll: '/webadmin/permission/MenuTree/findAll',
    insert: '/webadmin/permission/MenuTree/insert',
    update: '/webadmin/permission/MenuTree/update',
    findById: '/webadmin/permission/MenuTree/findById',
    deleteById: '/webadmin/permission/MenuTree/deleteById',
    findByMenuId: '/webadmin/permission/MenuTree/findByMenuId'
  },
  userSubsidy: {
    isSubsidy: '/service/webadmin/other/userSubsidy/isSubsidy',
    userSubsidy: '/service/webadmin/other/userSubsidy/userSubsidy',
    insert: '/service/webadmin/other/userSubsidy/insert',
    findAll: '/service/webadmin/other/userSubsidy/findAll',
    findById: '/service/webadmin/other/userSubsidy/findById',
  },
  my: {
    MenuTree: '/webadmin/permission/my/menuTree'
  },
  assessRecord: {
    findAll: '/service/webadmin/organization/assessRecord/findAll',
    findById: '/service/webadmin/organization/assessRecord/findById'
  }
}
