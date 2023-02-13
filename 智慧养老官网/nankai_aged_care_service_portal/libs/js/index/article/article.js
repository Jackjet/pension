/**
 * author: 关宁
 * date: 2019.05.07
 */

// 实例化创建请求方式
var request = new Call_Request();

var title = null;
var parame = null;
var URL = window.atob(GetQueryString('move'))

$(function () {
    $('.Cityhome').click(function () {
       window.location.href = '../../../index.html'
    })

    // 根据URL参数 获取当前栏目内容
    if (URL === 'zxgg') {
        title = '最新公告'
        parame = iD.index().column.xwzx
    }

    if (URL === 'xwzx') {
        title = '新闻资讯'
        parame = iD.index().column.xwzx
    }

    if (URL === 'hydt') {
        title = '行业动态'
        parame = iD.index().column.hydt
    }

    $('#title').html(title).click(function () {
        window.location.href = '../subColumn/subColumn.html?type=' + window.btoa(URL) + '&id=' + window.btoa(parame) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree');
    })

    $('body').on('click', '.Hot_list', function (even) {
        var id = even.currentTarget.dataset.id
        window.location.href = 'article.html?move=' + window.btoa(URL) + '&id=' + window.btoa(id) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree');
    })

    GeneralPart(2);
})

// 获取主模块详情数据
var Details = function () {
    request.url = request.Url + request.artfindById
    request.method = "GET"

    request.data = {
        id : window.atob(GetQueryString('id'))
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            $('.main_list_left .nodata').show();

            $('.list-loading').css('display', 'none');
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

// 获取热门政策列表数据
var GetHotPolicy = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        size: 10,
        page: 1,
        recommendId: window.atob(GetQueryString('hot'))
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {

            var HotCell = template('hot-cell', data.data);
            $('.hot').html(HotCell);

            // 隐藏loading效果
            $('.hot-loading').css('display', 'none');
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

addLoadEvent(GetHotPolicy);