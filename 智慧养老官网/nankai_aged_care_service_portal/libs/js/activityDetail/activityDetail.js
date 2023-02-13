/**
 * author: 关宁
 * date: 2019.05.07
 */

// 实例化创建请求方式
var request = new Call_Request();

var modules = {
    Move: window.atob(GetQueryString('id')),
    Title: ['最新政策', '国家政策', '省市政策', '政策解读'],
    parame: null
}

$(function () {
    // 实例化
    layui.use('element', function () {
        var element = layui.element;
    });




    var title = document.getElementById('title');

    switch (modules.Move) {
        case 'zxzc':
            title.innerHTML = modules.Title[0]
            modules.parame = iD.policy().column.new;
            break;
        case 'gjzc':
            title.innerHTML = modules.Title[1]
            modules.parame = iD.policy().column.guojia;
            break;
        case 'sszc':
            title.innerHTML = modules.Title[2]
            modules.parame = iD.policy().column.shengshi
            break;
        case 'zcjd':
            title.innerHTML = modules.Title[3]
            modules.parame = iD.policy().column.jiedu
            break;
    }

    // title.onclick = function () {
    //     window.location.href = '../subColumn/subColumn.html?move=' + window.btoa(modules.Move) + '&id=' + window.btoa(modules.parame) + '&hot=' + window.btoa(iD.Module().HotID)  + '&level=' + window.btoa('Levelthree')
    // }


    $('.Cityhome').click(function () {
        window.location.href = '../policy.html?city=' + window.btoa(modules.Move) + '&level=' + window.btoa('Secondlevel')
    })

    $('body').on('click', '.Hot_list', function (even) {
        var id = even.currentTarget.dataset.id
        window.location.href = 'article.html?move=' + window.btoa(modules.Move) + '&id=' + window.btoa(id) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
    })

    GeneralPart(1);
})

// 获取主模块详情数据
var Details = function () {
    request.url = request.Url + request.activityfindById
    request.method = "GET"

    request.data = {
        id: GetQueryString('move')
    }

    request.redata = function (data) {
        if (data.code === 0) {
            layer.msg(data.msg);
        } else {
            var Html = template('main-cell', data.data)
            $('.main_list_left').html(Html);

            $('#webHtml').append(data.data.message);
            // GL版命名空间为BMapGL
            // 按住鼠标右键，修改倾斜角和角度
            var map = new BMap.Map("allmap");// 创建Map实例
            var myGeo = new BMap.Geocoder();
            myGeo.getPoint(data.data.address, function (point) {
                if (point) {
                    map.centerAndZoom(point, 16);
                    map.addOverlay(new BMap.Marker(point));
                } else {
                    alert("您选择地址没有解析到结果!");
                }
            }, "");

            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
};

addLoadEvent(Details);

// 获取热门政策列表数据
var GetHotPolicy = function (address) {
    request.url = 'https://api.map.baidu.com/geocoding/v3/?address=' + address + '&output=json&ak=VofoQFsCgcuztMGacj4QEraxM87Iufl5'
    request.method = "GET"
    request.data = {
    }
    request.redata = function (data) {
        if (data.code === 0) {
            layer.msg(data.msg);
        } else {
            console.log(data.geocodes[0].location)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
