// 居家养老 
import request from '@/assets/js/request.js';

// 根据老人身份证查询居家养老补贴详情
export function findProcess(params) {
    return request({
        url: '/subsidy/webadmin/processInfo/findAll',
        method: 'get',
        params
    })
}
// 居家养老补贴申请
export function homeAgedInsert(data) {
    return request({
        url: '/subsidy/webadmin/homeAged/insert',
        method: 'post',
        data
    })
}
// 编辑
export function homeAgedInsertEdit(data) {
    return request({
        url: '/subsidy/webadmin/homeAged/insertEdit',
        method: 'post',
        data
    })
}
// 评估等级更新申请
export function homeAgedUpdateAl(data) {
    return request({
        url: '/subsidy/webadmin/homeAged/updateAl',
        method: 'post',
        data
    })
}
// 编辑
export function homeAgedUpdateAlEdit(data) {
    return request({
        url: '/subsidy/webadmin/homeAged/updateAlEdit',
        method: 'post',
        data
    })
}
// 注销申请
export function homeAgedCancel(data) {
    return request({
        url: '/subsidy/webadmin/homeAged/cancel',
        method: 'post',
        data
    })
}
// 注销重新申请
export function cancelEdit(data) {
    return request({
        url: '/subsidy/webadmin/homeAged/cancelEdit',
        method: 'post',
        data
    })
}

// 根据老人身份证查询居家养老补贴详情
export function homeAgedFindByIdCard(params) {
    return request({
        // url: '/subsidy/webadmin/homeAged/findByIdCard',
        url: '/subsidy/webadmin/subsidy/findByIdCard',
        method: 'get',
        params
    })
}

// 内迁转申请
export function updateAddress(data) {
    return request({
        url: '/subsidy/webadmin/homeAged/updateAddress',
        method: 'post',
        data
    })
}
// 编辑
export function updateAddressEdit(data) {
    return request({
        url: '/subsidy/webadmin/homeAged/updateAddressEdit',
        method: 'post',
        data
    })
}
// 居家养老补贴复核变更申请
export function homeAgedUpdateInfo(data) {
    return request({
        url: '/subsidy/webadmin/homeAged/updateInfo',
        method: 'post',
        data
    })
}
// 编辑
export function homeAgedUpdateInfoEdit(data) {
    return request({
        url: '/subsidy/webadmin/homeAged/updateInfoEdit',
        method: 'post',
        data
    })
}

// 首页 当期发放信息
export function findGrantByMonth(params) {
    return request({
        url: '/subsidy/webadmin/subsidyAnalysis/findGrantByMonth',
        method: 'get',
        params
    })
}
// 首页 老人类型统计
export function findUserGenre(params) {
    return request({
        url: '/subsidy/webadmin/subsidyAnalysis/findUserGenre',
        method: 'get',
        params
    })
}
// 首页 照顾等级
export function subsidyAnalysisFindUserAl(params) {
    return request({
        url: '/subsidy/webadmin/subsidyAnalysis/findUserAl',
        method: 'get',
        params
    })
}
// 首页 老人居住情况分析
export function subsidyAnalysisFindUserLive(params) {
    return request({
        url: '/subsidy/webadmin/subsidyAnalysis/findUserLive',
        method: 'get',
        params
    })
}

// 消息列表
export function subsidyMessageFindAll(params) {
    return request({
        url: '/subsidy/webadmin/subsidyMessage/findAll',
        method: 'get',
        params
    })
}
// 消息列表
export function subsidyMessageChangeStatus(data) {
    return request({
        url: '/subsidy/webadmin/subsidyMessage/changeStatus',
        method: 'put',
        data
    })
}

// 根据身份证查询老人档案
export function userFindById(params) {
    return request({
        url: '/service/webadmin/user/user/findAll',
        method: 'get',
        params
    })
}

// 居家养老补贴业务
export function findProcessByUser(params) {
    return request({
        url: '/subsidy/webadmin/subsidyAnalysis/findProcessByUser',
        method: 'get',
        params
    })
}

// 当月申报情况
export function findProcessByUserAndMonth(params) {
    return request({
        url: '/subsidy/webadmin/subsidyAnalysis/findProcessByUserAndMonth',
        method: 'get',
        params
    })
}

