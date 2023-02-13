/**
 * author: 关宁
 * date: 2019.05.07
 */

// 实例化创建请求方式
var request = new Call_Request();

var modules = {
    Move: window.atob(GetQueryString('id')),
    type: GetQueryString('type'),
    Title: ['新闻通知', '政策法规', '养生常识', '优秀案例'],
    parame: null
}

$(function () {
    // 实例化
    layui.use('element', function () {
        var element = layui.element;
    });

    // // 创建导航栏模块
    // var dataStream = {
    //     array: [{
    //         city: '',
    //         this: '',
    //         title: '首页',
    //         url: '../policy.html?level=' + window.btoa('Secondlevel')
    //     },
    //     {
    //         city: 'zxzc',
    //         this: '',
    //         title: '最新政策',
    //         url: '../subColumn/subColumn.html?move=' + window.btoa('zxzc')  + '&id=' + window.btoa(iD.policy().column.new) + '&level=' + window.btoa('Levelthree')
    //     },
    //     {
    //         city: 'gjzc',
    //         this: '',
    //         title: '国家政策',
    //         url: '../subColumn/subColumn.html?move=' + window.btoa('gjzc') + '&id=' + window.btoa(iD.policy().column.guojia) + '&level=' + window.btoa('Levelthree')
    //     },
    //     {
    //         city: 'sszc',
    //         this: '',
    //         title: '省市政策',
    //         url: '../subColumn/subColumn.html?move=' + window.btoa('sszc') + '&id=' + window.btoa(iD.policy().column.shengshi) + '&level=' + window.btoa('Levelthree')
    //     },
    //     {
    //         city: 'zcjd',
    //         this: '',
    //         title: '政策解读',
    //         url: '../subColumn/subColumn.html?move=' + window.btoa('zcjd') + '&id=' + window.btoa(iD.policy().column.jiedu) + '&level=' + window.btoa('Levelthree')
    //     }]
    // }
    //
    // // 遍历当前导航数据 输出当前样式
    // dataStream.array.forEach(element => {
    //     if (modules.Move === element.city) {
    //         element.url = 'javascript:;';
    //         element.this = 'layui-this';
    //     }
    // })
    //
    // // 为页面模板赋值导航数据
    // var Navigation = template('nav-cell', dataStream);
    // $('.layui-nav').html(Navigation);

    var title = document.getElementById('title');
    switch (modules.type) {
        case 'xwtz':
            // title.innerHTML = modules.Title[0]
            $('.layui-nav li').eq(4).addClass('layui-selete')
            break;
        case 'zcfg':
            // title.innerHTML = modules.Title[1]
            $('.layui-nav li').eq(5).addClass('layui-selete')
            break;
        case 'yscs':
            // title.innerHTML = modules.Title[2]
            $('.layui-nav li').eq(6).addClass('layui-selete')
            break;
        case 'yxal':
            // title.innerHTML = modules.Title[3]
            $('.layui-nav li').eq(7).addClass('layui-selete')
            break;
        default:
            $('.layui-nav li').eq(3).addClass('layui-selete')
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
    request.url = request.Url + request.artfindById
    request.method = "GET"

    request.data = {
        id: GetQueryString('move')
    }

    request.redata = function (data) {
        console.log(data)
        if (data.code === 0) {
            layer.msg(data.msg);
        } else {
            var Html = template('main-cell', data.data)
            $('.main_list_left').html(Html);

            $('#webHtml').append(data.data.messageWeb);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
};

addLoadEvent(Details);
// console.log(window.atob(GetQueryString('move')))
// 获取热门政策列表数据
var GetHotPolicy = function () {
    request.url = request.Url + request.art
    request.method = "GET"

    request.data = {
        size: 10,
        page: 1,
        recommendId: GetQueryString('move')
    }

    request.redata = function (data) {
        if (data.code === 0) {
            layer.msg(data.msg);
        } else {
            // var HotCell = template('hot-cell', data.data);
            // $('.hot').html(HotCell);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

// addLoadEvent(GetHotPolicy);