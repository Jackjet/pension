export default {
  menuTree: [ {
    id: '4',
    icon: 'Admin Admin-yewubaobiao',
    index: '/index/mainDistributingOrders',
    title: '快速配单'
  }, {
    id: '2',
    icon: 'Admin Admin-yewubaobiao',
    index: '/index/orderManagement',
    title: '订单管理',
    subs: [{
      id: '2-1',
      index: '/index/allOrderManagement',
      title: '所有订单'
    }, {
      id: '2-2',
      index: '/index/visitError',
      title: '上门异常订单'
    }, {
      id: '3-2',
      index: '/index/serviceError',
      title: '服务时间异常订单'
    }]
  }, {
    id: '1',
    icon: 'Admin Admin-biaoge',
    index: '/index/merchantService',
    title: '商家服务项目'
  }, {
    id: '5',
    icon: 'Admin Admin-yewubaobiao',
    index: '/index/servicePersonnel',
    title: '服务人员管理'
  }, {
    id: '6',
    icon: 'Admin Admin-shezhi',
    index: '/index/systemSettings',
    title: '商户设置',
    subs: [{
      id: '6-1',
      index: '/index/mainSystemSettings',
      title: '商户设置'
    }, {
      id: '6-2',
      index: '/index/infoSystemSettings',
      title: '商户信息'
    }]
  }]
}
