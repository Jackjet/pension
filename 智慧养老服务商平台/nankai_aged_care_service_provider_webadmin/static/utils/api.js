export default {
  /**
   * @login 用户登录
   * @PutPassWord  修改用户密码
   */
  userlogin: {
    login: 'provider/webadmin/provider/provider/signIn',
    forgetPwd: 'provider/webadmin/provider/provider/forgetPwd',
    resetPwd: 'provider/webadmin/provider/provider/resetPwd',
    sendSMS: 'provider/base/sms/sendSMS/smsSend'
  },
  // 服务人员管理
  servant: {
    delete: 'provider/webadmin/provider/employ/delete',
    findAll: 'provider/webadmin/provider/employ/findAll',
    insert: 'provider/webadmin/provider/employ/insert',
    findById: 'provider/webadmin/provider/employ/findById',
    update: 'provider/webadmin/provider/employ/update'
  },
  // 资源库管理
  resourceLib: {
    findAll: 'service/webadmin/cms/resourceLib/findAll',
    insert: 'service/webadmin/cms/resourceLib/insert',
    deleteById: 'service/webadmin/cms/resourceLib/delete',
    upload: 'service/base/file/uploadFile'
  },
  // 服务商项目
  merchantService: {
    findAll: 'provider/webadmin/provider/providerProject/findAll',
    findServiceType1: 'provider/webadmin/service/serviceType1/findAll',
    findServiceType2: 'provider/webadmin/service/serviceType2/findAll',
    setMoney: 'provider/webadmin/provider/providerProject/setMoney'
  },
  // 服务商相关
  provider: {
    basicInformation: 'provider/webadmin/provider/provider/basicInformation',
    updatePassword: 'provider/webadmin/provider/provider/updatePassword',
    isAllowOrder: 'provider/webadmin/provider/provider/isAllowOrder',
    isServiceState: 'provider/webadmin/provider/provider/isServiceState'
  },
  // 订单管理
  order: {
    findAll: 'provider/webadmin/order/findAll',
    findById: 'provider/webadmin/order/findById',
    robOrder: 'provider/webadmin/order/robOrder',
    findAllRob: 'provider/webadmin/order/findAllRob',
    updateEmploy: 'provider/webadmin/order/updateEmploy',
    findAllUnallocated: 'provider/webadmin/order/findAllUnallocated'
  },
  // 资源
  resource: {
    // lib: 'http://106.3.96.60/resourceLib'
    lib: 'http://39.102.73.127/resourceLib'
    // lib: 'http://10.111.254.117/resourceLib'
  }
}
