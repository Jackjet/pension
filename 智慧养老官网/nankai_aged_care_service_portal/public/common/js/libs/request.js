/*
 * @Author: your name
 * @Date: 2020-05-11 16:46:40
 * @LastEditTime: 2020-05-13 17:55:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nankai_aged_care_service_portal\public\common\js\libs\request.js
 */
/**
 * Created by 关宁 on 2019.5.5
 * @callback url 服务器接口
 */

function Call_Request() {
    // 测试服务器
    // this.Url = "http://10.111.254.117/nankai_test/service/";
    // this.Url = "http://39.102.73.127/nankai/service/";//测试
    this.Url = "http://106.3.96.60/nankai/service/";//生产
    // 七牛云图片路径
    // this.imagesUrl = 'http://10.111.254.117/resourceLib';
    this.imagesUrl = 'http://106.3.96.60/resourceLib';
    // this.imagesUrl = 'http://39.102.73.127/resourceLib';
    this.forgetPwd = "base/user/appUser/forgetPwd"; //忘记密码
    // 服务器接口
    this.SignIn = "base/user/appUser/signIn";
    this.art = "base/cms/art/findAll";
    this.artfindById = "base/cms/art/findById";
    this.register = 'base/user/appUser/insert';
    this.activity = 'base/activity/findAll';
    this.activityfindById = 'base/activity/findById';
    this.SmsSend = 'base/sms/sendSMS/smsSend';
    this.cancelByIdAndAppManId = 'web/order/cancelByIdAndAppManId'
    this.orderFindall = 'web/order/findAll'
    this.orderFindById = 'web/order/findById'
    this.serviceProject = 'app/service/serviceProject/findAll' // 服务项目管理
    this.serviceType1 = 'app/service/serviceType1/findAll'   // 服务栏目管理
    this.provider = 'app/provider/provider/findByServiceProjectId' //获取服务商
    this.street = 'base/basicinfo/street/findAll'
    this.community = 'base/basicinfo/community/findAll'
    this.dicManage = 'base/basicinfo/dicManage/findAll'
    this.getCurrentAppUser = 'base/user/appUser/getCurrentAppUser'
    this.update = 'base/user/appUser/update'
    this.upload = 'base/file/uploadFile'
    this.providerDetail = 'app/provider/provider/findById'
    this.findAllEvaluateByProviderId = 'app/order/findAllEvaluateByProviderId'
    this.updatePassword = 'base/user/appUser/updatePassword'
    this.shopCartInsert = 'app/order/shopcart/insert'
    this.shopCart = 'app/order/shopcart/findAll'
    this.shopCartDelete = 'app/order/shopcart/delete'
    this.shopCartiInsertOrder = 'app/order/shopCartiInsertOrder'
    this.shopCartFindById = 'app/order/shopcart/findById'


    this.orderInsert = 'web/order/insert'
    this.orderCancel = 'web/order/cancel'
    this.evaluate = 'web/order/evaluate'
    this.findOrderNumByMan = 'web/order/findOrderNumByMan'





    // ajax请求配置参数
    this.url = "";
    this.method = "";
    this.data;
    this.token = "";
    this.dataType = "json";

    this.reinfo = function () { };
    this.status = 0;
    this.redata = function () { };

    this.run = function () {
        if (this.url == "") {
            console.log("url未配置");
            return -1;
        }

        var redata = this.redata;
        var reinfo = this.reinfo;

        $.ajax({
            type: this.method,
            url: this.url,
            headers: this.token,
            data: this.data,
            dataType: this.dataType,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data.status == 0) {
                    reinfo(data);
                    this.status = -1
                } else {
                    redata(data);
                    this.status = 0;
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                this.status = -1;
            }
        })
    }
}
