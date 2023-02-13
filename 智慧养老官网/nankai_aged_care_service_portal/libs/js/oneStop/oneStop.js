
var request = new Call_Request();
var indexID = null;

$(function () {
    // 组件实例化
    layui.use('element', function () {
        var element = layui.element;
        element.render();
    });

    GeneralPart(1);
    Getservice(1, 16);
    getServiceClass(1, 100)

    if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))) {
        new WOW().init();
    };
})

$(document).on('click', '.cla_child', function (event) {
    $('.ser').html('<div data-loader="circle" class="loading list-loading"></div>');
    $(this).addClass('liang').siblings().removeClass('liang');
    Getservice(1, 16, event.target.getAttribute('data-id'))
})

$(document).on('click', '#search_ser', function (event) {
    $('.ser').html('<div data-loader="circle" class="loading list-loading"></div>');
    Getservice(1, 16, $('.liang').attr('data-id'), $('#search_name').val())
})

$(document).on('click', '.reserve', function (event) {
    if (classModule.session().token === '' || classModule.session().token === null || classModule.session().token === undefined) {
        let url = encodeURIComponent('../planOrder/planOrder.html?id=' + window.btoa(event.target.getAttribute('data-id')) + '&name=' + window.btoa(window.encodeURIComponent(event.target.getAttribute('data-name'))) + '&money=' + event.target.getAttribute('data-money') + '&money1=' + event.target.getAttribute('data-money1') + '&time=' + event.target.getAttribute('data-time') + '&type=' + event.target.getAttribute('data-type') + '&unit=' + window.btoa(window.encodeURIComponent(event.target.getAttribute('data-unit'))) + '&liang=' + $('.liang').attr('data-id'))
        window.location.href = "../../../view/page/login/login.html?returnUrl=" + url
    } else {
        window.location.href = '../planOrder/planOrder.html?id=' + window.btoa(event.target.getAttribute('data-id')) + '&name=' + window.btoa(window.encodeURIComponent(event.target.getAttribute('data-name'))) + '&money=' + event.target.getAttribute('data-money') + '&money1=' + event.target.getAttribute('data-money1') + '&time=' + event.target.getAttribute('data-time') + '&type=' + event.target.getAttribute('data-type') + '&unit=' + window.btoa(window.encodeURIComponent(event.target.getAttribute('data-unit'))) + '&liang=' + $('.liang').attr('data-id')
    }
})

var Getservice = function (page, size, serviceType1Id, name) {
    request.url = request.Url + request.serviceProject
    request.method = "GET"
    request.data = {
        page: page,
        size: size,
        serviceType1Id: serviceType1Id,
        name: name,
    }
    request.token = {
        'Authorization': 'token ' + classModule.session().token
    }
    if (request.data.serviceType1Id === '') {
        delete request.data['serviceType1Id']
    }
    if (request.data.name === '') {
        delete request.data['name']
    }

    request.redata = function (data) {
        if (data.code === 0) {
            layer.msg(data.msg);
        } else {
            var pageHtml = template("text_cen", data.data);
            $('.pagepadding').html(pageHtml);
            // 实例化分页模块
            layui.use('laypage', function () {
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
                    theme: '#f47f3d',
                    curr: page,
                    limit: 16,
                    layout: ['count', 'prev', 'page', 'next', 'skip'],
                    jump: function (obj, first) {
                        // 避免首次执行 死循环
                        if (!first) {
                            // 创建loading 加载元素
                            $('.ser').html('<div data-loader="circle" class="loading list-loading"></div>');
                            Getservice(obj.curr, obj.limit, $('.liang').attr('data-id'), $('#search_name').val());
                        }
                    }
                })
            })
            data.data.content.map(function (v, k) {
                v.minMoneyy = changeMoney(v.minMoney)
                v.maxMoneyy = changeMoney(v.maxMoney)
            })
            data.data.content.map(function (v, k) {
                v.minMoneyy = Number(v.minMoneyy).toFixed(2)
                v.maxMoneyy = Number(v.maxMoneyy).toFixed(2)
            })
            var Html = template("user-cell", data.data);
            $('.ser').html(Html);
            var tips = null;
            $(".tipsId").hover(function () {
                if ($(this).text()) {
                    tips = layer.tips($(this).text(), this, {
                        tips: [1, '#555555']
                    });
                }
            }, function () {
                layer.close(tips);
            })
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
};

var getServiceClass = function (page, size) {
    request.url = request.Url + request.serviceType1
    request.method = "GET"

    request.data = {
        page: page,
        size: size,
    }

    request.token = {
        'Authorization': 'token ' + classModule.session().token,
    }

    request.redata = function (data) {
        if (data.code === 0) {
            layer.msg(data.msg);
        } else {
            var htmlClass = template("class-cell", data.data);
            $('.cla').append(htmlClass)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
};
