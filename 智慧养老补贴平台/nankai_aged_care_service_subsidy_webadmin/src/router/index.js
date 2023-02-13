import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // 居家养老补贴
    {
      path: '/theElderly',
      name: '首页',
      component: () => import('@/view/theElderly/home'),
      meta: {
        label: '我的工作台',
      }
    },
    {
      path: '/business/subsidy',
      name: '补贴业务申请（低保、低收入、优抚对象困难老人）',
      component: () => import('@/view/theElderly/business/subsidy.vue'),
      meta: {
        label: '补贴业务申请',
      }
    },
    {
      path: '/business/salary',
      name: '补贴业务申请（低于最低工资标准困难老人）',
      component: () => import('@/view/theElderly/business/salary.vue'),
      meta: {
        label: '补贴业务申请',
      }
    },
    {
      path: '/assessment/subsidy',
      name: '评估等级更新（低保、低收入、优抚对象困难老人）',
      component: () => import('@/view/theElderly/assessment/subsidy.vue'),
      meta: {
        label: '评估等级更新',
      }
    },
    {
      path: '/assessment/salary',
      name: '评估等级更新（低于最低工资标准困难老人）',
      component: () => import('@/view/theElderly/assessment/salary.vue'),
      meta: {
        label: '评估等级更新',
      }
    },
    {
      path: '/cancellation/apply',
      name: '注销申请（低保、低收入、优抚对象困难老人）',
      component: () => import('@/view/theElderly/cancellation/index.vue'),
      meta: {
        label: '注销申请',
      }
    },
    {
      path: '/cancellation/home',
      name: '注销申请（低于最低工资标准困难老人）',
      component: () => import('@/view/theElderly/cancellation/home.vue'),
      meta: {
        label: '注销申请',
      }
    },
    {
      path: '/area/transfer',
      name: '区内迁转（低保、低收入、优抚对象困难老人）',
      component: () => import('@/view/theElderly/areaTransfer/index.vue'),
      meta: {
        label: '区内迁转',
      }
    },
    {
      path: '/area/home',
      name: '区内迁转（低于最低工资标准困难老人）',
      component: () => import('@/view/theElderly/areaTransfer/home.vue'),
      meta: {
        label: '区内迁转',
      }
    },
    {
      path: '/review/subsidy',
      name: '复核变更（低保、低收入、优抚对象困难老人）',
      component: () => import('@/view/theElderly/review/subsidy.vue'),
      meta: {
        label: '复核变更',
      }
    },
    {
      path: '/review/salary',
      name: '复核变更（低于最低工资标准困难老人）',
      component: () => import('@/view/theElderly/review/salary.vue'),
      meta: {
        label: '复核变更',
      }
    },
    {
      path: '/street/grant',
      name: '街道补贴上报',
      component: () => import('@/view/theElderly/street/grant.vue'),
      meta: {
        label: '街道补贴上报 补贴“发放”表',
      }
    },
    {
      path: '/street/change',
      name: '街道补贴上报',
      component: () => import('@/view/theElderly/street/change.vue'),
      meta: {
        label: '街道补贴上报 补贴“变更”表',
      }
    },
    {
      path: '/street/spendMoney',
      name: '街道补贴上报',
      component: () => import('@/view/theElderly/street/spendMoney.vue'),
      meta: {
        label: '南开区民政专项经费（居家养老政府补贴）支出情况表',
      }
    },
    {
      path: '/information/list',
      name: '居家养老档案馆',
      component: () => import('@/view/theElderly/information/list.vue'),
      meta: {
        label: '居家养老档案馆',
      }
    },
    // 后台管理
    {
      path: '/news/list',
      name: '我的消息',
      component: () => import('@/view/adminWeb/news'),
      meta: {
        label: '我的',
      }
    },
    {
      path: '/pending/list',
      name: '待处理',
      component: () => import('@/view/adminWeb/pending/pendingCommunity'),
      meta: {
        label: '社区、街道、第三方、民政',
      }
    },
    {
      path: '/subsidy/toExamine',
      name: '补贴业务',
      component: () => import('@/view/adminWeb/pending/toExamine.vue'),
      meta: {
        label: '审核',
      }
    },
    {
      path: '/information/detail',
      name: '老人信息',
      component: () => import('@/view/theElderly/information/detail.vue'),
      meta: {
        label: '详情',
      }
    },
    {
      path: '/subsidy/classification',
      name: '业务查询',
      component: () => import('@/view/adminWeb/subsidy/classification.vue'),
      meta: {
        label: '全部、办理中、已完成、已驳回',
      }
    },
    // 90岁生日补贴
    {
      path: '/birthday',
      name: '首页',
      component: () => import('@/view/birthday/home'),
      meta: {
        label: '我的工作台',
      }
    },
    {
      path: '/birthday/business',
      name: '补贴业务申请',
      component: () => import('@/view/birthday/business'),
      meta: {
        label: '90生日补贴业务申请',
      }
    },
    {
      path: '/birthday/street',
      name: '街道补贴上报',
      component: () => import('@/view/birthday/street/grant'),
      meta: {
        label: '90生日补贴街道补贴上报',
      }
    },
    {
      path: '/birthday/handle',
      name: '90岁生日补贴业务',
      component: () => import('@/view/birthday/handle'),
      meta: {
        label: '处理列表',
      }
    },
    {
      path: '/birthday/information/list',
      name: '健在证明上报',
      component: () => import('@/view/birthday/information/list.vue'),
      meta: {
        label: '健在证明上报',
      }
    },
    {
      path: '/birthday/information/detail',
      name: '健在证明上报',
      component: () => import('@/view/birthday/information/detail.vue'),
      meta: {
        label: '健在证明上报',
      }
    },
    {
      path: '/birthday/street/spendMoney',
      name: '民政补贴汇总',
      component: () => import('@/view/birthday/street/spendMoney.vue'),
      meta: {
        label: '民政补贴汇总',
      }
    },
    {
      path: '/birthday/pending/list',
      name: '90岁补贴业务',
      component: () => import('@/view/birthday/pending/pendingCommunity.vue'),
      meta: {
        label: '90岁补贴业务',
      }
    },
    {
      path: '/birthday/news/list',
      name: '我的消息',
      component: () => import('@/view/birthday/news'),
      meta: {
        label: '我的',
      }
    },
    {
      path: '/birthday/toExamine',
      name: '补贴业务',
      component: () => import('@/view/birthday/pending/toExamine.vue'),
      meta: {
        label: '审核',
      }
    },
    // 百岁营养补贴
    {
      path: '/nutrition',
      name: '首页',
      component: () => import('@/view/nutrition/home'),
      meta: {
        label: '百岁营养补贴',
      }
    },
    {
      path: '/nutrition/business/subsidy',
      name: '百岁营养补贴业务申请',
      component: () => import('@/view/nutrition/business/subsidy.vue'),
      meta: {
        label: '百岁营养补贴-补贴业务申请',
      }
    },
    {
      path: '/nutrition/news/list',
      name: '我的消息',
      component: () => import('@/view/nutrition/news'),
      meta: {
        label: '我的',
      }
    },
    {
      path: '/nutrition/cancellation',
      name: '注销',
      component: () => import('@/view/nutrition/cancellation'),
      meta: {
        label: '百岁营养补贴-注销',
      }
    },
    {
      path: '/nutrition/information/list',
      name: '社区健在证明上报',
      component: () => import('@/view/nutrition/information/list.vue'),
      meta: {
        label: '健在证明上报',
      }
    },
    {
      path: '/nutrition/information/detail',
      name: '健在证明上报',
      component: () => import('@/view/nutrition/information/detail.vue'),
      meta: {
        label: '健在证明上报',
      }
    },
    {
      path: '/nutrition/street/spendMoney',
      name: '民政补贴汇总',
      component: () => import('@/view/nutrition/street/spendMoney.vue'),
      meta: {
        label: '民政补贴汇总',
      }
    },
    {
      path: '/nutrition/pending/list',
      name: '百岁营养补贴业务',
      component: () => import('@/view/nutrition/pending/pendingCommunity.vue'),
      meta: {
        label: '百岁补贴业务',
      }
    },
    {
      path: '/nutrition/toExamine',
      name: '补贴业务',
      component: () => import('@/view/nutrition/pending/toExamine.vue'),
      meta: {
        label: '审核',
      }
    },

  ]
})

