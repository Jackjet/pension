function Call_Request() {
    // 测试服务器
    this.Url = "http://39.102.73.127/nankai/service/webadmin";
    // this.Url = "http://10.111.254.117/nankai_test/service/webadmin";

    // 服务器接口
    this.findAll = "/organization/organization/findAll";
    this.monitorFindAll = "/device/monitor/findAll";
    this.videoDetails = "/device/monitor/findById";
    this.playback = "/device/monitor/playback";

    this.loginCallBack = '/ivr/baseService/loginCallback'

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
