// 90岁补贴
import request from '@/assets/js/request.js';

// 补贴申请
export function birthdayApply(data) {
    return request({
        url: '/subsidy/webadmin/birthday/apply',
        method: 'post',
        data
    })
}

// 从新申请
export function birthdayReapply(data) {
    return request({
        url: '/subsidy/webadmin/birthday/reapply',
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

// 补贴业务
export function findProcessByUser(params) {
    return request({
        url: '/subsidy/webadmin/subsidyAnalysis/findBirthdayProcessAnalysis',
        method: 'get',
        params
    })
}

// 当月申报情况
export function findProcessByUserAndMonth(params) {
    return request({
        url: '/subsidy/webadmin/subsidyAnalysis/findBirthdayProcessAnalysisByMonth',
        method: 'get',
        params
    })
}

// 审核
export function birthdayAudit(data) {
    return request({
        url: '/subsidy/webadmin/birthday/audit',
        method: 'put',
        data
    })
}


