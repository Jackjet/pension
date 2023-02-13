// 百岁补贴
import request from '@/assets/js/request.js';

// 补贴申请
export function nutritionApply(data) {
    return request({
        url: '/subsidy/webadmin/nutrition/apply',
        method: 'post',
        data
    })
}

// 从新申请
export function nutritionReapply(data) {
    return request({
        url: '/subsidy/webadmin/nutrition/reapply',
        method: 'post',
        data
    })
}

// 注销
export function nutritionCancel(data) {
    return request({
        url: '/subsidy/webadmin/nutrition/cancel',
        method: 'post',
        data
    })
}
// 重新 注销
export function nutritionRecancel(data) {
    return request({
        url: '/subsidy/webadmin/nutrition/recancel',
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

// 老补贴业务
export function findProcessByUser(params) {
    return request({
        url: '/subsidy/webadmin/subsidyAnalysis/findNutritionProcessAnalysis',
        method: 'get',
        params
    })
}

// 当月申报情况
export function findProcessByUserAndMonth(params) {
    return request({
        url: '/subsidy/webadmin/subsidyAnalysis/findNutritionProcessAnalysisByMonth',
        method: 'get',
        params
    })
}

// 审核
export function nutritionAudit(data) {
    return request({
        url: '/subsidy/webadmin/nutrition/audit',
        method: 'put',
        data
    })
}