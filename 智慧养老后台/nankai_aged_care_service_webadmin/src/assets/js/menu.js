export default {
  // 网站后台管理
  menuTree: [
    {
      id: '1',
      icon: 'Admin Admin-ziliaoku',
      title: '资源库管理',
      index: '1',
      subs: [{
        id: '1-1',
        index: '/index/fileView',
        title: '文件夹管理'
      }]
    },
    {
      id: '2',
      icon: 'Admin Admin-ziliaoku',
      title: '栏目管理',
      index: '2',
      subs: [{
        id: '2-1',
        index: '/index/columnView',
        title: '栏目管理'
      }]
    },
    {
      id: '3',
      icon: 'Admin Admin-ziliaoku',
      title: '文章管理',
      index: '3',
      subs: [{
        id: '3-1',
        index: '/index/articleView',
        title: '中心简介'
      }]
    },
    {
      id: '4',
      icon: 'Admin Admin-ziliaoku',
      title: '活动管理',
      index: '4',
      subs: [{
        id: '4-1',
        index: '/index/activityView',
        title: '活动管理'
      }]
    }
  ],
  // 基础信息管理
  menuTree0: [
    {
      id: '1',
      icon: 'Admin Admin-ziliaoku',
      title: '服务机构管理',
      index: '1',
      subs: [{
        id: '1-1',
        index: '/index/serviceOrganizationView',
        title: '服务机构管理'
      }]
    },
    {
      id: '2',
      icon: 'Admin Admin-ziliaoku',
      title: '服务商管理',
      index: '2',
      subs: [{
        id: '2-1',
        index: '/index/providerView',
        title: '服务商管理'
      }]
    },
    {
      id: '3',
      icon: 'Admin Admin-ziliaoku',
      title: '服务类别',
      index: '3',
      subs: [{
        id: '3-1',
        index: '/index/serviceColumn',
        title: '服务栏目管理'
      }, {
        id: '3-2',
        index: '/index/serviceItems',
        title: '服务项目管理'
      }]
    },
    {
      id: '4',
      icon: 'Admin Admin-ziliaoku',
      title: '街道管理',
      index: '4',
      subs: [{
        id: '4-1',
        index: '/index/streetView',
        title: '街道管理'
      }]
    },
    {
      id: '5',
      icon: 'Admin Admin-ziliaoku',
      title: '社区管理',
      index: '5',
      subs: [{
        id: '5-1',
        index: '/index/communityView',
        title: '社区管理'
      }]
    },
    {
      id: '6',
      icon: 'Admin Admin-ziliaoku',
      title: '网格管理',
      index: '6',
      subs: [{
        id: '6-1',
        index: '/index/griddingView',
        title: '网格管理'
      }]
    },
    {
      id: '7',
      icon: 'Admin Admin-ziliaoku',
      title: '动态字典先写死',
      index: '7',
      subs: [{
        id: '7-1',
        index: '/index/dicManageView',
        title: '动态字典先写死'
      }]
    },
    {
      id: '8',
      icon: 'Admin Admin-ziliaoku',
      title: '服务人员管理',
      index: '/index/servantColumn'
    }
  ],
  // 老人档案管理
  menuTree1: [
    {
      id: '1',
      icon: 'Admin Admin-ziliaoku',
      title: '老人档案管理',
      index: '1',
      subs: [{
        id: '1-1',
        index: '/index/population',
        title: '公安人口基础数据'
      },
      {
        id: '1-2',
        index: '/index/movePopulation',
        title: '公安人口流动数据'
      },
      {
        id: '1-3',
        index: '/index/deathPopulation',
        title: '公安人口去世数据'
      },
      {
        id: '1-4',
        index: '/index/account',
        title: '老人账户管理'
      },
      {
        id: '1-5',
        index: '/index/credentials',
        title: '老年证管理'
      },
      {
        id: '1-6',
        index: '/index/assess',
        title: '老人评估信息'
      },
      {
        id: '1-7',
        index: '/index/agedMsgView',
        title: '老人信息管理'
      },
      {
        id: '1-8',
        index: '/index/registrationDataView',
        title: '注册数据管理'
      },
      {
        id: '1-9',
        index: '/index/agedDataView',
        title: '老人数据采集'
      },
      {
        id: '1-10',
        index: '/index/subsidyView',
        title: '补贴资金发放',
        subs: [{
          id: '1-10-1',
          index: '/index/subsidyDeliverView',
          title: '发放养老补贴'
        }, {
          id: '1-10-2',
          index: '/index/subsidyRecordView',
          title: '补贴发放记录'
        }]
      }]
    }
  ],
  // 审批管理
  menuTree2: [
    {
      id: '1',
      icon: 'Admin Admin-ziliaoku',
      title: '审批管理',
      index: '1',
      subs: [{
        id: '1-1',
        index: '/index/forMyApprovalView',
        title: '待我审批'
      },
      {
        id: '1-2',
        index: '/index/myHaveApprovalView',
        title: '我已审批'
      },
      {
        id: '1-3',
        index: '/index/myApplication',
        title: '我的申请'
      },
      {
        id: '1-4',
        index: '/index/recordApplication',
        title: '审批记录'
      }]
    }
  ],
  // 订单管理
  menuTree3: [
    {
      id: '1',
      icon: 'Admin Admin-ziliaoku',
      title: '订单管理',
      index: '1',
      subs: [{
        id: '3-1',
        index: '/index/orderView',
        title: '所有订单'
      }, {
        id: '3-2',
        index: '/index/orderVisitError',
        title: '上门异常订单'
      }, {
        id: '3-3',
        index: '/index/orderTimeError',
        title: '服务时间异常订单'
      }, {
        id: '3-4',
        index: '/index/orderAdd',
        title: '添加订单'
      }, {
        id: '3-5',
        index: '/index/orderEvaluationalView',
        title: '待评价订单'
      }, {
        id: '3-6',
        index: '/index/orderWatinglView',
        title: '待接订单'
      }]
    }
  ],
  // 系统设置
  menuTree5: [
    {
      id: '1',
      icon: 'Admin Admin-ziliaoku',
      title: '审批配置',
      index: '1',
      subs: [{
        id: '1-1',
        index: '/index/approvalView',
        title: '审批配置'
      }]
    },
    {
      id: '2',
      icon: 'Admin Admin-ziliaoku',
      title: '字典定义',
      index: '2',
      subs: [{
        id: '2-1',
        index: '/index/dicView',
        title: '字典定义'
      }]
    },
    {
      id: '3',
      icon: 'Admin Admin-ziliaoku',
      title: '系统用户管理',
      index: '3',
      subs: [{
        id: '3-2',
        index: '/index/roleView',
        title: '角色管理'
      }, {
        id: '3-1',
        index: '/index/userView',
        title: '用户管理'
      }]
    }
  ],
  // 首页
  menuTree6: [
    {
      id: '1',
      icon: 'Admin Admin-ziliaoku',
      title: '新闻资讯',
      index: '/index/newsView'
    },
    {
      id: '2',
      icon: 'Admin Admin-ziliaoku',
      title: '个人中心',
      index: '/index/personView'
    },
    {
      id: '3',
      icon: 'Admin Admin-ziliaoku',
      title: '修改密码',
      index: '/index/passwordView'
    }
  ],
  // 系统管理
  menuTree7: [
    {
      id: '1',
      icon: 'Admin Admin-ziliaoku',
      title: '菜单管理',
      index: '/index/systemManager'
    }
  ]
}
