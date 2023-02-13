/**
 * author: 关宁
 * date: 2019.05.06
 */

// 实例化创建请求方式
var request = new Call_Request();
var URL = window.atob(GetQueryString('type'));

var array = ['最新公告', '新闻资讯', '行业动态']

var species = null;
var totalElements = null;

$(function () {
    var VueCompile = document.getElementById('species');

    // 根据URL参数 获取当前栏目内容
    if (URL === 'zxgg') {
        VueCompile.innerHTML = array[0]
    }

    if (URL === 'xwzx') {
        VueCompile.innerHTML = array[1]
    }

    if (URL === 'hydt') {
        VueCompile.innerHTML = array[2]
    }

    GetMaiaContent(1, 10);
    GeneralPart(2);
})

// 获取主列表模块数据
var GetMaiaContent = function (page, size) {
    request.url = request.Url + request.art
    request.method = "GET"

    request.data = {
        size: size,
        page: page,
        categoryId: window.atob(GetQueryString('id'))
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            $('.list-loading').css('display', 'none');

            // 实例化分页模块
            layui.use('laypage', function(){
                var laypage = layui.laypage;
                /**
                 * @param elem 元素节点
                 * @param count 分页总页数
                 * @param theme 按钮颜色
                 * @param layout 分页组件
                 */
                laypage.render({
                    elem: 'laypage',
                    count: data.data.totalElements,
                    theme: '#c10000',
                    curr: page,
                    layout: ['count', 'prev', 'page', 'next','skip'],
                    jump: function(obj, first) {
                        // 避免首次执行 死循环
                        if(!first) {
                            // 创建loading 加载元素
                            $('.main_list_left').html('<div data-loader="circle" class="loading list-loading"></div>');

                            GetMaiaContent(obj.curr, obj.limit);
                        }
                    }
                })
            })

            // 为Url添加自定义链接跳转字段
            data.data.content.forEach(element => {
                element.City = window.atob(GetQueryString('city'));
                element.httpUrl = '../article/article.html?move=' + window.btoa(URL) + '&id=' + window.btoa(element.id) + '&type=' + window.btoa(URL) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree') 
            })

            // 为页面模板赋值主列表模块数据
            var list = template('list-cell', data.data);
            $('.main_list_left').html(list);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

// 获取热门政策模块数据
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
            $('.hot-loading').css('display', 'none');

            // 为Url添加自定义链接跳转字段
            data.data.content.forEach(element => {
                element.City = window.atob(GetQueryString('city'));
                element.httpUrl = '../article/article.html?move=' +  window.btoa(URL) + '&id=' + window.btoa(element.url) + '&type=' + window.btoa(URL) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
            })

            // 为页面模板赋值热门政策模块数据
            var HotCell = template('hot-cell', data.data);
            $('.hot').html(HotCell);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

addLoadEvent(GetHotPolicy);