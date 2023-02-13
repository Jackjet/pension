import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/component/index/index'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [{
  path: '/',
  redirect: '/index'
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
  path: '/forgetPsd',
  name: 'forgetPsd',
  meta: {
    title: '忘记密码'
  },
  component: () => import('@/component/forget/forget')
},
{
  path: '/404',
  name: 'notFound',
  component: () => import('@/component/error/404')
},
{
  path: '/index',
  name: 'Home',
  meta: {
    title: '首页',
    requireAuth: true
  },
  component: Index,
  redirect: '/index/mainPendingOrders',
  children: [
    {
      path: 'merchantService',
      meta: {
        title: '商家服务项目'
      },
      component: () => import('../views/merchantService/main')
    }, {
      path: 'servicePersonnel',
      meta: {
        title: '服务人员管理'
      },
      component: () => import('../views/servicePersonnel/main')
    }, {
      path: 'newServicePersonnel',
      name: 'newServicePersonnel',
      meta: {
        title: '服务人员管理',
        name: '添加'
      },
      component: () => import('../views/servicePersonnel/newandmodify')
    }, {
      path: 'modifyServicePersonnel',
      name: 'modifyServicePersonnel',
      meta: {
        title: '服务人员管理',
        name: '修改'
      },
      component: () => import('../views/servicePersonnel/newandmodify')
    }, {
      path: 'detailServicePersonnel',
      name: 'detailServicePersonnel',
      meta: {
        title: '服务人员管理',
        name: '详情'
      },
      component: () => import('../views/servicePersonnel/detail')
    }, {
      path: 'allOrderManagement',
      name: 'allOrderManagement',
      meta: {
        title: '订单管理',
        name: '所有订单'
      },
      component: () => import('../views/orderManagement/all')
    }, {
      path: 'visitError',
      name: 'visitError',
      meta: {
        title: '订单管理',
        name: '上门异常订单'
      },
      component: () => import('../views/orderManagement/visit')
    }, {
      path: 'serviceError',
      name: 'serviceError',
      meta: {
        title: '订单管理',
        name: '服务时间异常订单'
      },
      component: () => import('../views/orderManagement/time')
    }, {
      path: 'detailOrderManagement',
      name: 'detailOrderManagement',
      meta: {
        title: '订单管理',
        name: '详情'
      },
      component: () => import('../views/orderManagement/detail')
    },{
      path: 'detailPendingOrders',
      name: 'detailPendingOrders',
      meta: {
        title: '快速抢单',
        name: '详情'
      },
      component: () => import('../views/pendingOrders/detail')
    }, {
      path: 'mainPendingOrders',
      name: 'mainPendingOrders',
      meta: {
        title: '快速抢单'
      },
      component: () => import('../views/pendingOrders/main')
    }, {
      path: 'detailDistributingOrders',
      name: 'detailDistributingOrders',
      meta: {
        title: '快速配单',
        name: '详情'
      },
      component: () => import('../views/distributingOrders/detail')
    }, {
      path: 'mainDistributingOrders',
      name: 'mainDistributingOrders',
      meta: {
        title: '快速配单'
      },
      component: () => import('../views/distributingOrders/main')
    }, {
      path: 'staffDistributingOrders',
      name: 'staffDistributingOrders',
      meta: {
        title: '快速配单',
        name: '分配人员'
      },
      component: () => import('../views/distributingOrders/staffs')
    }, {
      path: 'mainSystemSettings',
      name: 'mainSystemSettings',
      meta: {
        title: '商户设置',
        name: '商户设置'
      },
      component: () => import('../views/systemSettings/main')
    }, {
      path: 'infoSystemSettings',
      name: 'infoSystemSettings',
      meta: {
        title: '商户设置',
        name: '商户信息'
      },
      component: () => import('../views/systemSettings/info')
    }]
},
{
  path: '*',
  redirect: '/404'
}
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
