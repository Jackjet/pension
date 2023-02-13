/**
 * author: 关宁
 * date: 2019.05.05
 */

// 实例化创建请求方式

var request = new Call_Request();
var indexID = null;

$(function (){
    // 组件实例化
    layui.use('element', function(){
        var element = layui.element;
        element.render();
    });

    GeneralPart(0);
})

// 获取轮播图模块数据
var GetBanner = function () {
    request.url = request.Url + request.art
    request.method = "GET"

    request.data = {
        categoryId: 'lbtweb'
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {
            var Html = '';

            data.data.content.map(function (item, index) {
                item.url = ''
                // if (item.url.substr(0,5).toLowerCase() !== 'https' && item.url.substr(0,5).toLowerCase() !== 'http:') {
                //     // 自定义URL参数跳转
                //     item.url = ''
                // }

                // 创建轮播图元素节点
                Html += '<div>\
                    <a href="page/article/article.html?level=U2Vjb25kbGV2ZWw=&move='+ item.id +'"><img src="'+item.iconAbsolutePath +'"/></a>\
                </div>'
            })

            $('#banner div').append(Html);

            /**
             * 实例化轮播图
             * @param elem 元素节点
             * @param width 轮播图宽度
             * @param interval 延迟动画时间
             * @param anim 动画模式
             */

            layui.use('carousel', function(){
                var carousel = layui.carousel;
                carousel.render({
                    elem: '#banner',
                    width: '100%',
                    arrow: 'always',
                    anim: 'fade',
                    interval: '3000'
                });
            });
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(GetBanner);

// 获取最新公告数据
var CementFindAll = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        size: 4,
        page: 1,
        categoryId: iD.index().zxgg
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {

            data.data.content.map(function (item, index) {
                if (item.url.substr(0,5).toLowerCase() !== 'https' && item.url.substr(0,5).toLowerCase() !== 'http:') {
                    // 自定义URL参数跳转
                    item.url = 'page/index/article/article.html?move=' + window.btoa('zxgg') + '&id=' + window.btoa(item.url) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
                }
            })

            var Html = template("Li-cell", data.data);
            $('.recommend').html(Html)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(CementFindAll);

// 获取新闻资讯模块数据
var Gerinformation = function () {
    request.url = request.Url + request.art
    request.method = "GET"

    request.data = {
        size: 6,
        page: 1,
        categoryId: 'xwtz'
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {
            data.data.content.map(function (item, index) {
                if (item.icon) {
                    item.img = request.imagesUrl + item.icon
                } else {
                    item.img = ''
                }
               item.url = ''
               item.createTime = item.createTime.split(' ')[0]
                // if (item.url.substr(0,5).toLowerCase() !== 'https' && item.url.substr(0,5).toLowerCase() !== 'http:') {
                //     // 自定义URL参数跳转
                //     item.url = 'page/index/article/article.html?move=' + window.btoa('xwzx') + '&id=' +window.btoa(item.url) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
                // }
            })
            // var obj = {
            //     data: {
            //         content: []
            //     }
            // }
            // obj.data.content[0] = data.data.content[0]
            data.data.content = data.data.content

            // var Html = template("information-cell", obj.data);
            // $('.information .title').html(Html)

            var str = template("information1-cell",data.data);
            $('.information .news').html(str)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(Gerinformation);

var Gernews = function () {
    request.url = request.Url + request.art
    request.method = "GET"

    request.data = {
        size: 6,
        page: 1,
        categoryId: 'zcfg'
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {

            data.data.content.map(function (item, index) {
                if (item.icon) {
                    item.img = request.imagesUrl + item.icon
                } else {
                    item.img = ''
                }
                item.url = ''
                item.createTime = item.createTime.split(' ')[0]
                // if (item.url.substr(0,5).toLowerCase() !== 'https' && item.url.substr(0,5).toLowerCase() !== 'http:') {
                //     // 自定义URL参数跳转
                //     item.url = 'page/index/article/article.html?move=' + window.btoa('xwzx') + '&id=' +window.btoa(item.url) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
                // }
            })
            var str = template("information2-cell",data.data);
            $('.information .law').html(str)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(Gernews);

var Gerhealth = function () {
    request.url = request.Url + request.art
    request.method = "GET"

    request.data = {
        size: 8,
        page: 1,
        categoryId: 'yscs'
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {

            data.data.content.map(function (item, index) {
                item.img = item.img
                item.url = ''
                item.createTime = item.createTime.split(' ')[0]
                // if (item.url.substr(0,5).toLowerCase() !== 'https' && item.url.substr(0,5).toLowerCase() !== 'http:') {
                //     // 自定义URL参数跳转
                //     item.url = 'page/index/article/article.html?move=' + window.btoa('xwzx') + '&id=' +window.btoa(item.url) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
                // }
            })

            var str = template("health-cell",data.data);
            $('.health ul').html(str)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(Gerhealth);

var GerCase = function () {
    request.url = request.Url + request.art
    request.method = "GET"

    request.data = {
        size: 5,
        page: 1,
        categoryId: 'yxal'
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {

            data.data.content.map(function (item, index) {
                item.img = item.img
                item.url = ''
                item.createTime = item.createTime.split(' ')[0]
                // if (item.url.substr(0,5).toLowerCase() !== 'https' && item.url.substr(0,5).toLowerCase() !== 'http:') {
                //     // 自定义URL参数跳转
                //     item.url = 'page/index/article/article.html?move=' + window.btoa('xwzx') + '&id=' +window.btoa(item.url) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree')
                // }
            })

            var str = template("case-cell",data.data);
            $('.case ul').html(str)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(GerCase);

function newCement (index) {

    window.location.href = 'page/subColumn/subColumn.html?level=U2Vjb25kbGV2ZWw=&id=' + index
}

function health(id) {
    window.location.href = 'page/article/article.html?level=U2Vjb25kbGV2ZWw=&move=' + id
}

function cases(id) {
    window.location.href = 'page/article/article.html?level=U2Vjb25kbGV2ZWw=&move=' + id
}


// 获取行业动态模块数据
var IndustryDynamic = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        size: 8,
        page: 1,
        recommendId: iD.index().hydt
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {

            data.data.content.map(function (item, index) {
                item.img = request.imagesUrl + item.img

                if (item.url.substr(0,5).toLowerCase() !== 'https' && item.url.substr(0,5).toLowerCase() !== 'http:') {
                    // 自定义URL参数跳转
                    item.url = 'page/index/article/article.html?move=' + window.btoa('hydt') + '&id=' + window.btoa(item.url) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree');
                }
            })

            var Html = template("dynamic-cell", data.data);
            $('.dynamic ul').html(Html)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(IndustryDynamic);

// 获取专家模块数据
var expertFinAll = function () {
    request.url = request.Url + request.expert
    request.method = "GET"

    request.data = {
        size: 4,
        page: 1
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {

            data.data.content.map(function (item, index) {
                item.icon = request.imagesUrl + item.icon
            })

            var Html = template("expert-cell", data.data);
            $('.experts ul').html(Html)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(expertFinAll);

// 获取园区模块数据
var ParkDetails = function () {
    request.url = request.Url + request.park
    request.method = "GET"

    request.data = {
        size: 4,
        page: 1
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {

            data.data.content.map(function (item, index) {
                var str = item.image
                item.icon = request.imagesUrl + JSON.parse(str)[0]
            })

            var Html = template("park-cell", data.data);
            $('.park ul').html(Html);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(ParkDetails);
