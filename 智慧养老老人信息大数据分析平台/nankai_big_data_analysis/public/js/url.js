(function ($) {
    $.url = {
        // 登录
        userlogin: {
            login: webUrl + '/service/webadmin/webadmin/signIn'
        },
        // 区域构成分析
        regions: {
            findAll: webUrl + '/service/webadmin/basicinfo/dicManage/findAll',
            countByAgeRange: webUrl + '/big/web/user/user/countByAgeRange',
            countByBody: webUrl + '/big/web/user/user/countByBody',
            countByOrganizationType: webUrl + '/big/web/organization/organization/countByOrganizationType',
            getNameList: webUrl + '/big/web/organization/organizationProject/getNameList',
            countByOrganizationProject: webUrl + '/big/web/organization/organization/countByOrganizationProject'
        },
        // 同比环比分析
        compared: {
            countYearOnYearByManNumber: webUrl + '/big/web/user/user/countYearOnYearByManNumber', // 老人数量
            countYearOnYearByOrder: webUrl + '/big/web/order/countYearOnYearByOrder', // 服务需求数量
            countMonthOnMonthByAppraise: webUrl + '/big/web/order/countMonthOnMonthByAppraise', // 服务质量环比
            countYearOnYearByProviderNumber: webUrl + '/big/web/provider/provider/countYearOnYearByProviderNumber',// 服务商数量
            countYearOnYearByEmployNumber: webUrl + '/big/web/provider/employ/countYearOnYearByEmployNumber',// 服务商人员数量
            countMonthOnMonthByEmployNumber: webUrl + '/big/web/provider/employ/countMonthOnMonthByEmployNumber'// 服务人员数量环比
        },
        // 养老服务决策分析
        serviceDecision: {
            countSubsidyUserNumber: webUrl + '/big/web/user/user/countSubsidyUserNumber', // 老人数量
            countCurrentYearUserSubsidy: webUrl + '/big/web/user/userSubsidy/countCurrentYearUserSubsidy', // 本年度居家养老领取总金额
            countMonthOnMonthByOrderNumber: webUrl + '/big/web/order/countMonthOnMonthByOrderNumber', // 本年度老人服务订单数量
            countQuarterOnYearByOrderNumber: webUrl + '/big/web/order/countQuarterOnYearByOrderNumber', // 本年度老人服务订单数量
            countOrderNumberOnYearByStreet: webUrl + '/big/web/order/countOrderNumberOnYearByStreet' // 本年度老人服务订单数量
        },
        // 养老机构资源配置决策分析
        agedOrganization: {
            countUserNumber: webUrl + '/big/web/user/user/countUserNumber', // 各街道老人数量
            countNumber: webUrl + '/big/web/organization/organization/countNumber' // 养老机构服务人员数量
        },
        // 养老数据分析展示
        user: {
            countUserNum: webUrl + '/big/web/user/user/countUserNum', // 老人总数
            countAllByType: webUrl + '/big/web/user/user/countAllByType', // 老人分类数据占比,
            countUserNumber: webUrl + '/big/web/user/user/countUserNumber', // 各街道居家老人数量
            countUserNumberByType: webUrl + '/big/web/user/user/countUserNumberByType', // 各街道居家养老数量
            countUserNumberByOrganization: webUrl + '/big/web/user/user/countUserNumberByOrganization', // 服务机构老人数量
            countUserNumberByBody: webUrl + '/big/web/user/user/countUserNumberByBody', // 各街道老人自理能力数量
            countAllByOrganizationType: webUrl + '/big/web/user/user/countAllByOrganizationType' // 机构养老、社区养老、居家养老占比
        },
        // 养老业务数据展示
        serviceData: {
            theOldNum: webUrl + '/big/web/user/user/countCurrentYearUserNumber', // 老人总数
            countByType: webUrl + '/big/web/user/user/countByType', // 本年老人分类数据占比
            subsidy: webUrl + '/big/web/user/user/countNumberByAssessLevel', // 本年享受居家补贴
            subsidyMonth: webUrl + '/big/web/user/user/countCurrentMonthUserSubsidy', // 本年当前月各街道养老补贴发放情况
            fiveYear: webUrl + '/big/web/user/user/count5YearNumberByAssessLevel', // 近5年居家老人人口数据分析
            satisfied: webUrl + '/big/web/order/countOrderAppraiseNumberByYear', // 本年度服务满意率统计
            OrderNum: webUrl + '/big/web/order/countOrderNumberByYear', // 本年服务工单数据统计
            OrderErr: webUrl + '/big/web/order/countOrderServiceProjectNumberByAbnormal' // 本年当前月异常订单统计
        },
        // 养老统计数据展示
        censusData: {
            live: webUrl + '/big/web/user/user/countByLive', // 老人居住情况统计
            type: webUrl + '/big/web/user/user/countByGenreName', // 老人类型统计
            selfCare: webUrl + '/big/web/user/user/countTotalByBody', // 老人自理情况统计
            economy: webUrl + '/big/web/user/user/countByEconomic', // 老人经济来源统计
            theOld: webUrl + '/big/web/order/countOrderServiceProjectNumber', // 本年老人所需服务占比
            theOther: webUrl + '/big/web/order/countOrderNumberByAge' ,// 本年不同年龄段所需服务情况
			countByAgeRange:webUrl + '/big/web/user/user/countByAgeRange' ,// 老人年龄区域分布
        },
        // 养老服务资源展示
        aegdResourceIcon: {
            countProviderNumber: webUrl + '/big/web/provider/provider/countProviderNumber', // 服务商
            countHomeNumber: webUrl + '/big/web/organization/organization/countHomeNumber', // 养老机构
            countSunNumber: webUrl + '/big/web/organization/organization/countSunNumber' // 日照中心
        },
        // 养老补贴数据展示
        subsidyData: {
            num: webUrl + '/big/web/user/user/countCurrentMonthUserSubsidyNum', // 本年当月补贴发放人数
            sum: webUrl + '/big/web/user/userSubsidy/countCurrentYearUserSubsidyByQuarter', // 本年当前月各街道养老补贴发放情况
            all: webUrl + '/big/web/user/user/countCurrentMonthUserSubsidyDetail', // 本年当前月居家养老补贴发放明细
            live: webUrl + '/big/web/user/user/countByLive', // 老人居住情况统计
            type: webUrl + '/big/web/user/user/countByGenreName', // 老人类型统计
            selfCare: webUrl + '/big/web/user/user/countTotalByBody' // 老人自理情况统计
        },
        // 养老服务数据展示
        aegdData: {
            countOrderNumber: webUrl + '/big/web/order/countOrderNumber', // 累计服务订单数量
            countOrderServiceTime: webUrl + '/big/web/order/countOrderServiceTime', // 累计服务工时
            countRegisterUserNum: webUrl + '/big/web/user/user/countRegisterUserNum', // 注册用户数量
            countOrderNumberByCentre: webUrl + '/big/web/order/countOrderNumberByCentre', // 呼叫中心接收服务数量
            countOrderTopServiceProjectByOrderNumber: webUrl + '/big/web/order/countOrderTopServiceProjectByOrderNumber', // 年度TOP5服务项目
            countOrderAppraisePercentageByAppraise: webUrl + '/big/web/order/countOrderAppraisePercentageByAppraise', // 年度服务质量评价占比
            countOrderNumberByOrderDay: webUrl + '/big/web/order/countOrderNumberByOrderDay', // 近15天各类服务工单统计
            countOrderStatePercentageByState: webUrl + '/big/web/order/countOrderStatePercentageByState', // 近15天养老工单统计
        },
		basicinfo:{
			community:webUrl + '/service/webadmin/basicinfo/community/findAll',
			street:webUrl + '/service/webadmin/basicinfo/street/findAll',
			countAllByOrderTop10:webUrl + '/big/web/user/user/countAllByOrderTop10',
			
		}
    };
})(jQuery);