(function ($) {
    $.url = {
        // 登录
        userlogin: {
            login: webUrl + '/service/webadmin/webadmin/signIn'
        },
        IntelligentMattress: {
            findAll: webUrl + '/iot/webadmin/device/mattress/bind/findAll',
            updateByOffBedKpi: webUrl + '/iot/webadmin/device/mattress/bind/updateByOffBedKpi',
            findById: webUrl + '/iot/webadmin/device/mattress/bind/findById',
            upload: webUrl + '/iot/webadmin/device/mattress/bind/upload',
            templateExport: webUrl + '/iot/webadmin/device/mattress/bind/templateExport',
            statistics: webUrl + '/iot/webadmin/device/mattress/bind/statistics',
            sleepReport: webUrl + '/iot/webadmin/device/mattress/sleepReport',
            txtToAudio: webUrl + '/iot/webadmin/device/mattress/bind/txtToAudio'
        },
        alert: {
            findAll: webUrl + '/iot/webadmin/device/mattress/remind/record/findAll',
            upload: webUrl + '/iot/webadmin/device/mattress/remind/record/update',
            findByState: webUrl + '/iot/webadmin/device/mattress/remind/record/findByState',
            findByStateByUntreated: webUrl + '/iot/webadmin/device/mattress/remind/record/findByStateByUntreated'
        },
        dictionaries: {
            // 街道
            street: webUrl + '/service/webadmin/basicinfo/street/findAll?page=1&size=1000000',
            // 社区
            community: webUrl + '/service/webadmin/basicinfo/community/findAll?page=1&size=1000000'
        },
        // infrared: {
        //     getDeviceList: webUrl + '/iot/webadmin/device/infraredInduction/getDeviceList',
        //     findById: webUrl + '/iot/webadmin/device/infraredInductionDevice/findById',
        //     upload: webUrl + '/iot/webadmin/device/infraredInductionDevice/upload',
        //     templateExport: webUrl + '/iot/webadmin/device/infraredInductionDevice/templateExport'
        // }, 
        // infraredRecord: {
        //     findAll: webUrl + '/iot/webadmin/device/infraredInduction/remind/record/findAll',
        //     update: webUrl + '/iot/webadmin/device/infraredInduction/remind/record/update',
        //     findFirstByState: webUrl + '/iot/webadmin/device/infraredInduction/remind/record/findFirstByState',
        //     findByStateByUntreated: webUrl + '/iot/webadmin/device/infraredInduction/remind/record/findByStateByUntreated'
        // },
        infrared: {  //红外感应
            findAll: webUrl + '/iot/webadmin/device/infraredInduction/findAll',
            getDeviceList: webUrl + '/iot/webadmin/device/infraredInduction/getDeviceList',
            findById: webUrl + '/iot/webadmin/device/infraredInduction/findById',
            upload: webUrl + '/iot/webadmin/device/infraredInduction/upload',
            templateExport: webUrl + '/iot/webadmin/device/infraredInduction/templateExport',
            analysis: webUrl + '/iot/webadmin/device/infraredInduction/analysis',
            findByStateByUntreated: webUrl + '/iot/webadmin/device/infraredInduction/remind/record/findByStateByUntreated',
        },
        infraredRecord: {
            findAll: webUrl + '/iot/webadmin/device/infraredInduction/remind/record/findAll',
            update: webUrl + '/iot/webadmin/device/infraredInduction/remind/record/update',
            findFirstByState: webUrl + '/iot/webadmin/device/infraredInduction/remind/record/findFirstByState',
            findByStateByUntreated: webUrl + '/iot/webadmin/device/infraredInduction/remind/record/findByStateByUntreated'
        },
        smokeSensation: {
            findAll: webUrl + '/iot/webadmin/device/smoke/device/findAll',
            update: webUrl + '/iot/webadmin/device/smoke/device/upload',
            analysis: webUrl + '/iot/webadmin/device/smoke/device/analysis',
            findByStateByUntreated: webUrl + '/iot/webadmin/device/smoke/device/findByStateByUntreated',
            findById: webUrl + '/iot/webadmin/device/smoke/device/findById',
            findByState: webUrl + '/iot/webadmin/device/smoke/device/findByState',
            templateExport: webUrl + '/iot/webadmin/device/smoke/device/templateExport',
            analysisState: webUrl + '/iot/webadmin/device/smoke/device/analysisState'
        },
        smokeSensationRecord: {
            findAllAlarm: webUrl + '/iot/webadmin/device/smoke/device/findAllAlarm',
            updateAlarm: webUrl + '/iot/webadmin/device/smoke/device/updateAlarm',
            findAlarmById: webUrl + '/iot/webadmin/device/smoke/device/findAlarmById'
        }
    };
})(jQuery);