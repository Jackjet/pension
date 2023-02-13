import request from '@/assets/js/request.js';
// token
export function tokenStr() {
    return 'token ' + JSON.parse(localStorage.getItem('currentUser').replace('autostringify-', '')).token
}
// 用户信息
export function userIfo() {
    return JSON.parse(localStorage.getItem('currentUser').replace('autostringify-', ''))
}
// 修改密码
export function editPasswordApi(data) {
    return request({
        url: '/service/webadmin/webadmin/updatePassword',
        method: 'put',
        data
    })
}

// 上传文件列表数据处理
export function fileListData(fileList) {
    let arrList = [];
    fileList.forEach(item => {
        arrList.push({ fileDownloadUri: item.response.fileDownloadUri });
    })
    return arrList;
}
// 上传头像
export function uploadFile() {
    return "/service/base/file/uploadFile"
}

// 文件上传
export function fileUrl() {
    return "/subsidy/webadmin/file/upload"
}
// 下载文件
export function downloadFile() {
    return "/subsidy/webadmin/file/download/{day}/{fileName:./}"
}

// 所属街道
export function streetList(params) {
    return request({
        url: '/service/webadmin/basicinfo/street/findAll?page=1&size=1000000',
        method: 'get',
        params
    })
}
// 所属社区
export function communityList(params) {
    return request({
        url: '/service/webadmin/basicinfo/community/findAll?page=1&size=1000000',
        method: 'get',
        params
    })
}
// 老人类型
export function dicManageList(params) {
    return request({
        url: '/service/webadmin/basicinfo/dicManage/findAll?page=1&size=1000000&dicId=lrlx',
        method: 'get',
        params
    })
}
// 民族
export function mzList(params) {
    return request({
        url: '/service/webadmin/basicinfo/dicManage/findAll?page=1&size=1000000&dicId=mz',
        method: 'get',
        params
    })
}

// 姓名验证
export function nameVerification(value) {
    let reg = /^[a-zA-Z\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
    if (reg.test(value)) {
        return true;
    }
    return false;
}

// 手机号验证
export function mobilePhone(value) {
    let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if (reg.test(value)) {
        return true;
    }
    return false;
}

//身份证号验证
export function idNoFormatCheck(value) {
    var num = value.toUpperCase();
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    var reg = /^(\d{18,18}|\d{15,15}|\d{17,17}X)$/;
    if (!reg.test(num)) {
        return false;
    }
    // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    // 下面分别分析出生日期和校验位
    var len, re;
    len = num.length;
    if (len == 15) {
        re = new RegExp(
            /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var arrSplit = num.match(re);
        // 检查生日日期是否正确
        var dtmBirth = new Date('19' + arrSplit[2] +
            '/' + arrSplit[3] + '/' + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) &&
            ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) &&
            (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            return false;
        }
    }
    if (len == 18) {
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
        var arrSplit = num.match(re);
        // 检查生日日期是否正确
        var dtmBirth = new Date(arrSplit[2] + "/" +
            arrSplit[3] + "/" + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) &&
            ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) &&
            (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            return false;
        } else {
            // 检验18位身份证的校验码是否正确。
            // 校验位按照ISO 7064:1983.MOD
            // 11-2的规定生成，X可以认为是数字10。
            var valnum;
            var arrInt = new Array(7, 9, 10, 5, 8, 4,
                2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9',
                '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0,
                i;
            for (var i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[nTemp % 11];
            if (valnum != num.substr(17, 1)) {
                return false;
            }
        }
    }
    return true;
}

// 根据老人生日计算年龄
// export function ages(str) {
//     var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
//     if (r == null) return false;
//     var d = new Date(r[1], r[3] - 1, r[4]);
//     if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
//         var Y = new Date().getFullYear();
//         return (Y - r[1]);
//     }
//     return ("输入的日期格式错误！");
// }

// 没过生日前的年龄
export function ages(strBirthday) {
    var returnAge;
    var strBirthdayArr = strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1] - 1;
    var birthDay = strBirthdayArr[2];
    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if (nowYear == birthYear) {
        returnAge = 0;//同年 则为0岁
    } else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay;//日之差
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            } else {
                var monthDiff = nowMonth - birthMonth;//月之差
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            }
        } else {
            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
        }
    }
    return returnAge;//返回周岁年龄
}

// 文件展示数据处理
export function fileExhibition(detail) {
    let imgList = [
        {
            name: "申请书",
            field: "applicationFile",
            img: []
        },
        {
            name: "承诺书",
            field: "promiseFile",
            img: []
        },
        {
            name: "户口本",
            field: "householdRegisterFile",
            img: []
        },
        {
            name: "身份证",
            field: "idCardFile",
            img: []
        },
        {
            name: "城乡居民低收入救助证",
            field: "lowIncomeFile",
            img: []
        },
        {
            name: "近三个月银行流水",
            field: "familiesBankFlowFile",
            img: []
        },
        {
            name: "银行卡信息",
            field: "cardFile",
            img: []
        },
        {
            name: "代办人身份证",
            field: "consignerIdCardFile",
            img: []
        },
        {
            name: "公示文件",
            field: "publicityFile",
            img: []
        },
        {
            name: "评估报告书",
            field: "assessFile",
            img: []
        },
        {
            name: "联审文件",
            field: "jointAuditFile",
            img: []
        },
        {
            name: "辅助证件",
            field: "assistFile",
            img: []
        },
        {
            name: "委托书",
            field: "consignerFile",
            img: []
        },
        {
            name: "变更登记申请书",
            field: "changeRegistrFile",
            img: []
        },
        {
            name: "退役军人事务局认定凭证",
            field: "veteransFile",
            img: []
        },
        {
            name: "定期抚恤领取证",
            field: "pensionFile",
            img: []
        },
        {
            name: "残疾军人证",
            field: "disabledSoldiersFile",
            img: []
        },
        {
            name: "最低生活保证金领取证",
            field: "lowLiveFile",
            img: []
        },
        {
            name: "注销凭证",
            field: "cancelFile",
            img: []
        },
        {
            name: "健在证明",
            field: "aliveFile",
            img: []
        },
        {
            name: "佐证材料",
            field: "evidenceFile",
            img: []
        }
    ];
    imgList.forEach(item => {
        item.img = JSON.parse(detail[item.field]);
    });
    // console.log(detail)
    return imgList;
}