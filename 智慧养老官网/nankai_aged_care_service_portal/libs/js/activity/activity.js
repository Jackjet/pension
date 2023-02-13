/**
 * Created by lenovo on 2020/4/10.
 */
/**
 * author: 关宁
 * date: 2019.05.09
 */

// 实例化创建请求方式
var request = new Call_Request();

var Move = GetQueryString('id')

var id = ''

$(function () {
    // 实例化
    layui.use('element', function () {
        var element = layui.element;

    });

    layui.use('laydate', function () {
        var laydate = layui.laydate;

        $(".time").each(function (i, e) {
            laydate.render({
                elem: this,
                theme: '#E85603'
            });
        })
    });


    GetMaiaContent(1, 16);
    getServiceClass(1, 100)
    GeneralPart(1);
})

$(document).on('click', '.cla_child', function (event) {
    $('.ser').html('<div data-loader="circle" class="loading list-loading"></div>');
    $(this).addClass('liang').siblings().removeClass('liang');
    id = event.target.getAttribute('data-id')
    GetMaiaContent(1, 16, id, $('#startTime').val(), $('#endTime').val())
})

$(document).on('click', '#search_ser', function (event) {
    $('.ser').html('<div data-loader="circle" class="loading list-loading"></div>');
    GetMaiaContent(1, 16, id, $('#startTime').val(), $('#endTime').val())
})


// 获取主列表模块数据
var GetMaiaContent = function (page, size, typeId, startTime, endTime) {
    request.url = request.Url + request.activity
    request.method = "GET"

    request.data = {
        size: size,
        page: page,
        typeId: typeId || '',
        startTime: startTime,
        endTime: endTime
    }

    request.redata = function (data) {
        if (data.code === 0) {
            layer.msg(data.msg);
        } else {
            $('.list-loading').css('display', 'none');
            var page = template("text_cen", data.data);
            $('.pagepadding').html(page);
            // 实例化分页模块
            layui.use('laypage', function () {
                var laypage = layui.laypage;
                /**
                 * 实例化轮播图
                 * @param elem 元素节点
                 * @param width 轮播图宽度
                 * @param interval 延迟动画时间
                 * @param anim 动画模式
                 */
                laypage.render({
                    elem: 'laypage',
                    count: data.data.totalElements,
                    theme: '#E85603',
                    curr: page,
                    limit: 16,
                    layout: ['count', 'prev', 'page', 'next', 'skip'],
                    jump: function (obj, first) {
                        // 避免首次执行 死循环
                        if (!first) {
                            // 创建loading 加载元素
                            $('.main_list_left').html('<div data-loader="circle" class="loading list-loading"></div>');
                            GetMaiaContent(obj.curr, obj.limit);
                        }
                    }
                })
            })

            data.data.content.forEach(element => {
                element.HttpUrl = '../article/article.html?move=' + element.id;
            })

            var list = template('list-cell', data.data);
            $('.main_list_left').html(list);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

var getServiceClass = function (page, size) {
    request.url = request.Url + request.dicManage
    request.method = "GET"

    request.data = {
        page: page,
        size: size,
        dicId: 'hdfl'
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

