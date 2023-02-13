import Vue from 'vue'
import VueRouter from 'vue-router'
import * as util from '@/assets/js/common'
import Index from '@/component/index/index'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [{
  path: '/',
  redirect: '/index'
},
// 首页
{
  path: '/selectNav',
  component: () => import('@/component/selectNav/selectNav')
},
/**
 * 呼叫中心进入的页面单独配置路由
 * */
// 订单创建
{
  path: '/orderAdd',
  component: () => import('@/views/orderView/orderAdd/orderAdd')
},
{
  path: '/providerLook',
  component: () => import('@/views/orderView/orderAdd/providerLook')
},
// 订单管理
{
  path: '/orderView',
  component: () => import('@/views/orderView/orderManagerView/orderManagerView')
},
{
  path: '/orderManagerDetail',
  name: '/orderManagerDetail',
  component: () => import('@/views/orderView/orderManagerView/orderManagerDetail')
},
// 新增档案
{
  path: '/callCenterView',
  component: () => import('@/views/archivesView/callCenterView/callCenterView')
},
{
  path: '/callCenterAdd',
  component: () => import('@/views/archivesView/callCenterView/callCenterAdd')
},
// 待接订单管理
{
  path: '/orderWatinglView',
  name: '/orderWatinglView',
  component: () => import('@/views/orderView/orderManagerView/orderWatinglView')
},
{
  path: '/orderManagerDetail5',
  name: '/orderManagerDetail5',
  component: () => import('@/views/orderView/orderManagerView/orderManagerDetail5')
},
// 待评价订单
{
  path: '/orderEvaluationalView',
  name: '/orderEvaluationalView',
  component: () => import('@/views/orderView/orderManagerView/orderEvaluationalView')
},
{
  path: '/orderManagerDetail',
  name: '/orderManagerDetail',
  component: () => import('@/views/orderView/orderManagerView/orderManagerDetail')
},
{
  path: '/login',
  name: 'login',
  meta: {
    title: '登录'
  },
  component: () => import('@/component/login/login')
},
{
  path: '/model',
  name: 'model',
  meta: {
    title: '模块'
  },
  component: () => import('@/component/model/model')
},
{
  path: '/404',
  name: 'notFound',
  component: () => import('@/component/error/404')
},
{
  path: '*',
  redirect: '/404'
},
{
  path: '/index',
  name: 'Home',
  meta: {
    title: '首页',
    requireAuth: true
  },
  component: Index,
  redirect: to => {
    let returnType = '/index/newsView'
    if (util.default.session('menuMessage')) {
      returnType = '/index/' + util.default.session('menuMessage').route
    }
    return returnType
  },
  children: [
    // 网站后台管理
    {
      path: 'fileView',
      meta: {
        title: '资源库管理',
        name: '文件夹管理'
      },
      component: () => import('@/views/websiteView/repositoryView/fileView')
    },
    {
      path: 'repositoryView',
      meta: {
        title: '资源库管理',
        name: '文件夹管理'
      },
      component: () => import('@/views/websiteView/repositoryView/repositoryView')
    },
    {
      path: 'columnView',
      meta: {
        title: '栏目管理',
        name: '栏目管理'
      },
      component: () => import('@/views/websiteView/columnView/columnView')
    },
    {
      path: 'articleView',
      meta: {
        title: '文章管理',
        name: ''
      },
      component: () => import('@/views/websiteView/articleView/articleView')
    },
    {
      path: 'articleAdd',
      meta: {
        title: '文章管理',
        name: ''
      },
      component: () => import('@/views/websiteView/articleView/articleAdd')
    },
    {
      path: 'activityView',
      meta: {
        title: '活动管理',
        name: '活动管理'
      },
      component: () => import('@/views/websiteView/activityView/activityView')
    },
    {
      path: 'activityAdd',
      meta: {
        title: '活动管理',
        name: ''
      },
      component: () => import('@/views/websiteView/activityView/activityAdd')
    },
    // 基础信息管理
    {
      path: 'serviceOrganizationView',
      meta: {
        title: '服务机构管理',
        name: '服务机构管理'
      },
      component: () => import('@/views/basicsView/serviceOrganizationView/serviceOrganizationView')
    },
    {
      path: 'providerView',
      meta: {
        title: '服务商管理',
        name: '服务商管理'
      },
      component: () => import('@/views/basicsView/providerView/providerView')
    },
    {
      path: 'providerAdd',
      meta: {
        title: '服务商管理',
        name: ''
      },
      component: () => import('@/views/basicsView/providerView/providerAdd')
    },
    {
      path: 'serviceColumn',
      meta: {
        title: '服务类别',
        name: '服务栏目管理'
      },
      component: () => import('@/views/basicsView/classServiceView/serviceColumn/serviceColumn')
    },
    {
      path: 'serviceClass',
      meta: {
        title: '服务栏目管理',
        name: '服务类别管理'
      },
      component: () => import('@/views/basicsView/classServiceView/serviceColumn/serviceClass')
    },
    {
      path: 'serviceItems',
      meta: {
        title: '服务类别',
        name: '服务项目管理'
      },
      component: () => import('@/views/basicsView/classServiceView/serviceItems/serviceItems')
    },
    {
      path: 'serviceItemsAdd',
      meta: {
        title: '服务项目管理',
        name: ''
      },
      component: () => import('@/views/basicsView/classServiceView/serviceItems/serviceItemsAdd')
    },
    {
      path: 'streetView',
      meta: {
        title: '街道管理',
        name: '街道管理'
      },
      component: () => import('@/views/basicsView/streetView/streetView')
    },
    {
      path: 'communityView',
      meta: {
        title: '社区管理',
        name: '社区管理'
      },
      component: () => import('@/views/basicsView/communityView/communityView')
    },
    {
      path: 'dicManageView',
      meta: {
        title: '',
        name: ''
      },
      component: () => import('@/views/basicsView/dicManageView/dicManageView')
    },
    {
      path: 'griddingView',
      meta: {
        title: '网格管理',
        name: '网格管理'
      },
      component: () => import('@/views/basicsView/griddingView/griddingView')
    },
    // 老人档案管理
    {
      path: 'agedMsgView',
      meta: {
        title: '老人档案管理',
        name: '老人信息管理'
      },
      component: () => import('@/views/archivesView/agedMsgView/agedMsgView')
    },
    {
      path: 'agedMsgAdd',
      meta: {
        title: '老人信息管理',
        name: ''
      },
      component: () => import('@/views/archivesView/agedMsgView/agedMsgAdd')
    },
    {
      path: 'operationLogView',
      meta: {
        title: '老人信息管理',
        name: '操作日志'
      },
      component: () => import('@/views/archivesView/agedMsgView/operationLogView')
    },
    {
      path: 'registrationDataView',
      meta: {
        title: '老人档案管理',
        name: '注册数据管理'
      },
      component: () => import('@/views/archivesView/registrationDataView/registrationDataView')
    },
    {
      path: 'registrationDataDetail',
      meta: {
        title: '注册数据管理',
        name: '注册数据详情'
      },
      component: () => import('@/views/archivesView/registrationDataView/registrationDataDetail')
    },
    {
      path: 'agedDataView',
      meta: {
        title: '老人档案管理',
        name: '老人数据采集'
      },
      component: () => import('@/views/archivesView/agedDataView/agedDataView')
    },
    {
      path: 'agedDataAdd',
      meta: {
        title: '老人数据采集',
        name: ''
      },
      component: () => import('@/views/archivesView/agedDataView/agedDataAdd')
    },
    {
      path: 'agedDataView',
      meta: {
        title: '补贴资金发放',
        name: '发放养老补贴'
      },
      component: () => import('@/views/archivesView/agedDataView/agedDataView')
    },
    {
      path: 'subsidyDeliverView',
      meta: {
        title: '补贴资金发放',
        name: '发放养老补贴'
      },
      component: () => import('@/views/archivesView/subsidyDeliverView/subsidyDeliver')
    },
    {
      path: 'subsidyDeliverDetail',
      name: 'subsidyDeliverDetail',
      meta: {
        title: '发放养老补贴',
        name: '发放养老补贴详情'
      },
      component: () => import('@/views/archivesView/subsidyDeliverView/subsidyDeliverDetail')
    },
    {
      path: 'subsidyRecordDetail',
      name: 'subsidyRecordDetail',
      meta: {
        title: '补贴发放记录',
        name: '补贴发放记录详情'
      },
      component: () => import('@/views/archivesView/subsidyRecordView/subsidyRecordDetail')
    },
    {
      path: 'subsidyRecordView',
      meta: {
        title: '补贴资金发放',
        name: '补贴发放记录'
      },
      component: () => import('@/views/archivesView/subsidyRecordView/subsidyRecord')
    },
    {
      path: 'callCenterView',
      meta: {
        title: '老人档案管理',
        name: '呼叫中心老人信息'
      },
      component: () => import('@/views/archivesView/callCenterView/callCenterView')
    },
    {
      path: 'callCenterAdd',
      meta: {
        title: '呼叫中心老人信息',
        name: '呼叫中心老人信息详情'
      },
      component: () => import('@/views/archivesView/callCenterView/callCenterAdd')
    },
    // 审批管理
    {
      path: 'forMyApprovalView',
      meta: {
        title: '审批管理',
        name: '待我审批'
      },
      component: () => import('@/views/approveView/forMyApprovalView/forMyApprovalView')
    },
    {
      path: 'forMyApprovalDetails',
      meta: {
        title: '待我审批',
        name: ''
      },
      component: () => import('@/views/archivesView/agedMsgView/agedMsgAdd')
    },
    {
      path: 'myHaveApprovalView',
      meta: {
        title: '审批管理',
        name: '我已审批'
      },
      component: () => import('@/views/approveView/myHaveApprovalView/myHaveApprovalView')
    },
    {
      path: 'myHaveApprovalDetails',
      meta: {
        title: '我已审批',
        name: '老人详情'
      },
      component: () => import('@/views/archivesView/agedMsgView/agedMsgAdd')
    },
    {
      path: 'myApplication',
      meta: {
        title: '审批管理',
        name: '我的申请'
      },
      component: () => import('@/views/approveView/myApplication/myApplication')
    },
    {
      path: 'myApplicationDetails',
      meta: {
        title: '我的申请',
        name: ''
      },
      component: () => import('@/views/archivesView/agedMsgView/agedMsgAdd')
    },
    {
      path: 'recordApplication',
      meta: {
        title: '审批管理',
        name: '审批记录'
      },
      component: () => import('@/views/approveView/recordApplication/recordApplication')
    },
    {
      path: 'recordApplicationDetails',
      meta: {
        title: '审批记录',
        name: '老人详情'
      },
      component: () => import('@/views/archivesView/agedMsgView/agedMsgAdd')
    },
    // 系统管理
    {
      path: 'dicView',
      meta: {
        title: '字典定义',
        name: '字典定义'
      },
      component: () => import('@/views/systemView/dicView/dicView')
    },
    {
      path: 'userView',
      meta: {
        title: '系统管理',
        name: '用户管理'
      },
      component: () => import('@/views/systemView/userView/userView')
    },
    {
      path: 'userAdd',
      meta: {
        title: '系统管理',
        name: '用户维护'
      },
      component: () => import('@/views/systemView/userView/userAdd')
    },
    {
      path: 'roleView',
      meta: {
        title: '系统管理',
        name: '角色管理'
      },
      component: () => import('@/views/systemView/roleView/roleView')
    },
    {
      path: 'rolePower',
      meta: {
        title: '系统管理',
        name: '分配权限'
      },
      component: () => import('@/views/systemView/roleView/rolePower')
    },
    {
      path: 'deptView',
      meta: {
        title: '系统用户管理',
        name: '部门管理'
      },
      component: () => import('@/views/systemView/deptView/deptView')
    },
    {
      path: 'userView',
      meta: {
        title: '系统用户管理',
        name: '用户管理'
      },
      component: () => import('@/views/systemView/userView/userView')
    },
    {
      path: 'userAdd',
      meta: {
        title: '系统管理',
        name: '用户维护'
      },
      component: () => import('@/views/systemView/userView/userAdd')
    },
    {
      path: 'servantColumn',
      meta: {
        title: '服务人员管理',
        name: '服务人员管理'
      },
      component: () => import('@/views/basicsView/servantView/servantColumn/servantColumn')
    },
    {
      path: 'servantDetail',
      name: 'servantDetail',
      meta: {
        title: '服务人员管理',
        name: '服务人员详情'
      },
      component: () => import('@/views/basicsView/servantView/servantDetail/servantDetail')
    },
    {
      path: 'newServicePersonnel',
      name: 'newServicePersonnel',
      meta: {
        title: '服务人员管理',
        name: '服务人员维护'
      },
      component: () => import('@/views/basicsView/servantView/servantNew/servantNew')
    },
    {
      path: 'approvalView',
      name: 'approvalView',
      meta: {
        title: '系统设置',
        name: '审批配置'
      },
      component: () => import('@/views/systemView/approvalView/approvalView')
    },
    {
      path: 'approvalAdd',
      name: 'approvalAdd',
      meta: {
        title: '系统设置',
        name: '审批配置维护'
      },
      component: () => import('@/views/systemView/approvalView/approvalAdd')
    },
    // 统计报表
    {
      path: 'reportWorkOrder',
      name: 'reportWorkOrder',
      meta: {
        title: '统计报表',
        name: '工单统计'
      },
      component: () => import('@/views/statisticalReports/reportWorkOrder/reportWorkOrder')
    },
    {
      path: 'orderStatus',
      name: 'orderStatus',
      meta: {
        title: '统计报表',
        name: '工单状态统计'
      },
      component: () => import('@/views/statisticalReports/orderStatus/orderStatus')
    },
    {
      path: 'serviceStation',
      name: 'serviceStation',
      meta: {
        title: '统计报表',
        name: '服务站订单统计'
      },
      component: () => import('@/views/statisticalReports/serviceStation/serviceStation')
    },
    {
      path: 'serviceProvider',
      name: 'serviceProvider',
      meta: {
        title: '统计报表',
        name: '服务商订单统计'
      },
      component: () => import('@/views/statisticalReports/serviceProvider/serviceProvider')
    },
    {
      path: 'employeesOrders',
      name: 'employeesOrders',
      meta: {
        title: '统计报表',
        name: '员工订单统计'
      },
      component: () => import('@/views/statisticalReports/employeesOrders/employeesOrders')
    },
    {
      path: 'oldManStatistics',
      name: 'oldManStatistics',
      meta: {
        title: '统计报表',
        name: '老人统计'
      },
      component: () => import('@/views/statisticalReports/oldManStatistics/oldManStatistics')
    },
    {
      path: 'orderView',
      name: 'orderView',
      meta: {
        title: '订单管理',
        name: '所有订单'
      },
      component: () => import('@/views/orderView/orderManagerView/orderManagerView')
    },
    {
      path: 'orderManagerDetail',
      name: 'orderManagerDetail',
      meta: {
        title: '订单管理',
        name: '订单详情'
      },
      component: () => import('@/views/orderView/orderManagerView/orderManagerDetail')
    },
    {
      path: 'orderTimeError',
      name: 'orderTimeError',
      meta: {
        title: '订单管理',
        name: '服务时间异常订单'
      },
      component: () => import('@/views/orderView/orderManagerView/orderManagerTime')
    },
    {
      path: 'orderVisitError',
      name: 'orderVisitError',
      meta: {
        title: '订单管理',
        name: '上门异常订单'
      },
      component: () => import('@/views/orderView/orderManagerView/orderManagerVisit')
    },
    {
      path: 'orderAdd',
      name: 'orderAdd',
      meta: {
        title: '订单管理',
        name: '添加订单'
      },
      component: () => import('@/views/orderView/orderAdd/orderAdd')
    },
    {
      path: 'providerLook',
      name: 'providerLook',
      meta: {
        title: '订单管理',
        name: '查看服务商'
      },
      component: () => import('@/views/orderView/orderAdd/providerLook')
    },
    {
      path: 'serviceOrganizationAdd',
      name: 'serviceOrganizationAdd',
      meta: {
        title: '服务机构管理',
        name: '服务机构维护'
      },
      component: () => import('@/views/basicsView/serviceOrganizationView/serviceOrganizationAdd')
    },
    {
      path: 'organizationProject',
      name: 'organizationProject',
      meta: {
        title: '服务机构管理',
        name: '机构服务项目'
      },
      component: () => import('@/views/basicsView/serviceOrganizationView/organizationProject/organizationProject')
    },
    {
      path: 'cameraAdministration',
      name: 'cameraAdministration',
      meta: {
        title: '服务机构管理',
        name: '摄像头管理'
      },
      component: () => import('@/views/basicsView/serviceOrganizationView/cameraAdministration')
    },
    {
      path: 'population',
      name: 'population',
      meta: {
        title: '接口数据',
        name: '公安人口基础数据'
      },
      component: () => import('@/views/archivesView/populationView/populationView')
    },
    {
      path: 'movePopulation',
      name: 'movePopulation',
      meta: {
        title: '接口数据',
        name: '公安人口流动数据'
      },
      component: () => import('@/views/archivesView/movePopulationView/movePopulationView')
    },
    {
      path: 'deathPopulation',
      name: 'deathPopulation',
      meta: {
        title: '接口数据',
        name: '公安人口去世数据'
      },
      component: () => import('@/views/archivesView/deathPopulationView/deathPopulationView')
    },
    {
      path: 'hujilaoren',
      name: 'hujilaoren',
      meta: {
        title: '接口数据',
        name: '户籍老人列表'
      },
      component: () => import('@/views/archivesView/elderlyMeals/hujilaoren')
    },
    {
      path: 'juzhulaoren',
      name: 'juzhulaoren',
      meta: {
        title: '接口数据',
        name: '居住老人列表'
      },
      component: () => import('@/views/archivesView/elderlyMeals/juzhulaoren')
    },
    {
      path: 'shitang',
      name: 'shitang',
      meta: {
        title: '接口数据',
        name: '食堂列表'
      },
      component: () => import('@/views/archivesView/elderlyMeals/shitang')
    },
    {
      path: 'shequguanjia',
      name: 'shequguanjia',
      meta: {
        title: '接口数据',
        name: '社区管家统计'
      },
      component: () => import('@/views/archivesView/elderlyMeals/shequguanjia')
    },
    {
      path: 'shangjiacanbu',
      name: 'shangjiacanbu',
      meta: {
        title: '接口数据',
        name: '商家餐补报表'
      },
      component: () => import('@/views/archivesView/elderlyMeals/shangjiacanbu')
    },
    {
      path: 'zhucandingdan',
      name: 'zhucandingdan',
      meta: {
        title: '接口数据',
        name: '助餐订单明细表'
      },
      component: () => import('@/views/archivesView/elderlyMeals/zhucandingdan')
    },
    {
      path: 'account',
      name: 'account',
      meta: {
        title: '老人档案管理',
        name: '老人账户管理'
      },
      component: () => import('@/views/archivesView/accountView/accountView')
    },
    {
      path: 'accountDetail',
      name: 'accountDetail',
      meta: {
        title: '老人档案管理',
        name: '账户明细'
      },
      component: () => import('@/views/archivesView/accountView/accountDetail')
    },
    {
      path: 'credentials',
      name: 'credentials',
      meta: {
        title: '老人档案管理',
        name: '老年证管理'
      },
      component: () => import('@/views/archivesView/credentialsView/credentialsView')
    },
    {
      path: 'credentialsAdd',
      name: 'credentialsAdd',
      meta: {
        title: '老年证管理',
        name: '老年证编辑'
      },
      component: () => import('@/views/archivesView/credentialsView/credentialsAdd')
    },
    {
      path: 'assess',
      name: 'assess',
      meta: {
        title: '老人档案管理',
        name: '老人评估信息'
      },
      component: () => import('@/views/archivesView/assessView/assessView')
    },
    {
      path: 'assessAdd',
      name: 'assessAdd',
      meta: {
        title: '老人评估信息',
        name: '老人评估信息详情'
      },
      component: () => import('@/views/archivesView/assessView/assessAdd')
    },
    {
      path: 'orderEvaluationalView',
      name: 'orderEvaluationalView',
      meta: {
        title: '订单管理',
        name: '待评价订单'
      },
      component: () => import('@/views/orderView/orderManagerView/orderEvaluationalView')
    },
    {
      path: 'orderWatinglView',
      name: 'orderWatinglView',
      meta: {
        title: '订单管理',
        name: '待接订单'
      },
      component: () => import('@/views/orderView/orderManagerView/orderWatinglView')
    },
    {
      path: 'newsView',
      name: 'newsView',
      meta: {
        title: '首页',
        name: '新闻资讯'
      },
      component: () => import('@/views/indexView/newsView')
    },
    {
      path: 'personView',
      name: 'personView',
      meta: {
        title: '首页',
        name: '个人中心'
      },
      component: () => import('@/views/indexView/personView')
    },
    {
      path: 'passwordView',
      name: 'passwordView',
      meta: {
        title: '首页',
        name: '修改密码'
      },
      component: () => import('@/views/indexView/passwordView')
    },
    {
      path: 'systemManager',
      name: 'systemManager',
      meta: {
        title: '系统管理',
        name: '菜单管理'
      },
      component: () => import('@/views/systemManager/systemManager')
    },
    {
      path: 'systemAdd',
      name: 'systemAdd',
      meta: {
        title: '系统管理',
        name: '菜单维护'
      },
      component: () => import('@/views/systemManager/systemAdd')
    },
    {
      path: 'accountAdd',
      name: 'accountAdd',
      meta: {
        title: '老人账户管理',
        name: '老人账户详情'
      },
      component: () => import('@/views/archivesView/accountView/accountAdd')
    },
    {
      path: 'orderManagerDetail5',
      name: 'orderManagerDetail5',
      meta: {
        title: '订单管理',
        name: '待接订单详情'
      },
      component: () => import('@/views/orderView/orderManagerView/orderManagerDetail5')
    },
    {
      path: 'newsDetail',
      name: 'newsDetail',
      meta: {
        title: '首页',
        name: '新闻资讯'
      },
      component: () => import('@/views/indexView/newsDetail')
    },
    {
      path: 'evaluationRecordView',
      name: 'evaluationRecordView',
      meta: {
        title: '老人档案管理',
        name: '老人评估记录'
      },
      component: () => import('@/views/archivesView/evaluationRecordView/evaluationRecordView')
    },
    {
      path: 'evaluationRecordAdd',
      name: 'evaluationRecordAdd',
      meta: {
        title: '老人档案管理',
        name: '老人评估记录详情'
      },
      component: () => import('@/views/archivesView/evaluationRecordView/evaluationRecordAdd')
    }
  ]
}]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
