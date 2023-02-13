// 居家养老 
import request from '@/assets/js/request.js';

// 手动发放补贴
export function subsidyGrantBatchInsert(params) {
    return request({
        url: '/subsidy/webadmin/subsidyGrant/batchInsert',
        method: 'get',
        params
    })
}

// 待处理   补贴列表查询，街道和社区只能查当前社区和街道的信息
export function subsidyFindAll(params) {
    return request({
        url: '/subsidy/webadmin/subsidy/findAll',
        method: 'get',
        params
    })
}

// 待处理   补贴列表查询，街道和社区只能查当前社区和街道的信息
export function subsidyFindAllByUser(params) {
    return request({
        url: '/subsidy/webadmin/subsidy/findAllByUser',
        method: 'get',
        params
    })
}
// 待处理   补贴列表查询，街道和社区只能查当前社区和街道的信息（默认返回当前月份上传了健在证明的人）
export function findAllByUserAndAlive(params) {
    return request({
        url: '/subsidy/webadmin/subsidy/findAllByUserAndAlive',
        method: 'get',
        params
    })
}

// 待处理   补贴详情
export function subsidyFind(params) {
    return request({
        url: '/subsidy/webadmin/subsidy/find',
        method: 'get',
        params
    })
}

export function updateFind(params) {
    return request({
        url: '/subsidy/webadmin/user/findSubsidyUpdateById',
        method: 'get',
        params
    })
}

// 待处理   社区上传公示结果
export function publicityCheck(data) {
    return request({
        url: '/subsidy/webadmin/homeAged/publicityCheck',
        method: 'put',
        data
    })
}

// 待处理   审核
export function processCheck(data) {
    return request({
        url: '/subsidy/webadmin/homeAged/processCheck',
        method: 'put',
        data
    })
}

// 待处理   联审
export function unionCheck(data) {
    return request({
        url: '/subsidy/webadmin/homeAged/unionCheck',
        method: 'put',
        data
    })
}

// 待处理   上传评估报告
export function assessCheck(data) {
    return request({
        url: '/subsidy/webadmin/homeAged/assessCheck',
        method: 'put',
        data
    })
}

// 待处理   根据单号查询流程审批过程
export function subsidyProcessFindAll(params) {
    return request({
        url: '/subsidy/webadmin/subsidyProcess/findAll',
        method: 'get',
        params
    })
}

/**
 * 根据业务类型查询流程列表
 * businessType
 * 1养老补贴申请、
 * 11养老补贴评估等级更新、
 * 12养老补贴注销申请、
 * 13养老补贴区内迁转、
 * 14养老补贴复核变更、
 * 2百岁营养补贴申请、
 * 21百岁营养补贴注销、
 * 3 90岁生日补贴
 * 
 */
export function processInfoFindAll(params) {
    return request({
        url: '/subsidy/webadmin/processInfo/findAll',
        method: 'get',
        params
    })
}

// 等级变动
export function findAllSubsidyUpdate(params) {
    return request({
        url: '/subsidy/webadmin/user/findAllSubsidyUpdate',
        method: 'get',
        params
    })
}
// 发放记录
export function findAllSubsidyGrant(params) {
    return request({
        url: '/subsidy/webadmin/user/findAllSubsidyGrant',
        method: 'get',
        params
    })
}
// 办理单
export function userFindAllSubsidy(params) {
    return request({
        url: '/subsidy/webadmin/user/findAllSubsidy',
        method: 'get',
        params
    })
}

// 补贴发放
export function subsidyGrantFindAll(params) {
    return request({
        url: '/subsidy/webadmin/subsidyGrant/findAll',
        method: 'get',
        params
    })
}
// 补贴变更
export function subsidyUpdateFindAll(params) {
    return request({
        url: '/subsidy/webadmin/subsidyUpdate/findAll',
        method: 'get',
        params
    })
}
// 导出补贴列表
export function subsidyGrantExport(params) {
    return request({
        url: '/subsidy/webadmin/subsidyGrant/export',
        method: 'get',
        params
    })
}

// 导出补贴列表
export function subsidyUpdateExport(params) {
    return request({
        url: '/subsidy/webadmin/subsidyUpdate/export',
        method: 'get',
        params
    })
}

// 暂停发放
export function suspendOrStop(data) {
    return request({
        url: '/subsidy/webadmin/subsidyGrant/suspendOrStop',
        method: 'post',
        data
    })
}

// 暂停发放
export function batchInsert(data) {
    return request({
        url: '/subsidy/webadmin/subsidyGrant/batchInsert',
        method: 'post',
        data
    })
}

export function livingProof(data) {
    return request({
        url: '/subsidy/webadmin/subsidy/livingProof',
        method: 'put',
        data
    })
}

export function subsidyGrant(params) {
    return request({
        url: '/subsidy/webadmin/subsidy/subsidyGrant',
        method: 'get',
        params
    })
}

export function subsidyGrantFunds(params) {
    return request({
        url: '/subsidy/webadmin/subsidy/subsidyGrantFunds',
        method: 'get',
        params
    })
}

export function streetConfirm(data) {
    return request({
        url: '/subsidy/webadmin/streetConfirm/streetConfirm',
        method: 'post',
        data
    })
}

export function queryStreetConfirmFile(params) {
    return request({
        url: '/subsidy/webadmin/streetConfirm/queryStreetConfirmFile',
        method: 'get',
        params
    })
}

export function birthdayCancel(data) {
    return request({
        url: 'subsidy/webadmin/birthday/cancel',
        method: 'put',
        data
    })
}