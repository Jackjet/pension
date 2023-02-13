

// 实例化创建请求方式
var request = new Call_Request();

var time = {
    endTime: CurrentTime(),
    startTime: MonthBefor(),
    index: ''
}

$(function () {
    time.index = GetQueryString('level')
    if (time.index === '' || time.index === '5') {
        $('#orderState').val('5')
        time.index = ''
    } else {
        $('#orderState').val(time.index)
    }


    // 实例化
    layui.use('element', function () {
        var element = layui.element;
        element.render()
    });

    layui.use('form', function () {
        var form = layui.form;
        form.render();

        form.on('select(brickType)', function (data) {
            var value = data.value
            if (value === '0') {
                time.startTime = MonthBefor()
                parent.findOrderNumByMan(time.startTime)
            }

            if (value === '1') {
                time.startTime = getPastHalfYear()
                parent.findOrderNumByMan(time.startTime)
            }

            if (value === '2') {
                time.startTime = getPassYearFormatDate()
                parent.findOrderNumByMan(time.startTime)
            }

            $('.order').html('<div data-loader="circle" class="loading list-loading"></div>');

            getOrderAdmin(1, 10);
        })

        form.on('select(orderState)', function (data) {
            parent.findOrderNumByMan(time.startTime)
            if (data.value == 5) {
                time.index = ''
                $(".layui-nav-tree > li", parent.document).removeClass('layui-nav-itemed')
                $($(".layui-nav-tree > li", parent.document)[0]).addClass('layui-nav-itemed')
                $("#title", parent.document).html($($(".layui-nav-tree > li", parent.document)[0]).find('span').eq(0).html())
            } else {
                time.index = Number(data.value)
                $(".layui-nav-tree > li", parent.document).removeClass('layui-nav-itemed')
                $($(".layui-nav-tree > li", parent.document)[time.index + 1]).addClass('layui-nav-itemed')
                $("#title", parent.document).html($($(".layui-nav-tree > li", parent.document)[time.index + 1]).find('span').eq(0).html())
                if (data.value == -1) {
                    $(".layui-nav-tree > li", parent.document).removeClass('layui-nav-itemed')
                    $($(".layui-nav-tree > li", parent.document)[0]).addClass('layui-nav-itemed')
                    $("#title", parent.document).html($($(".layui-nav-tree > li", parent.document)[0]).find('span').eq(0).html())
                }
            }


            $('.order').html('<div data-loader="circle" class="loading list-loading"></div>');
            getOrderAdmin(1, 10);
        })

    });

    $(document).on('click', '.table_body li', function (event) {
        $('.order').html('<div data-loader="circle" class="loading list-loading"></div>');

        time.index = event.target.dataset.id
        getOrderAdmin(1, 10)
    })

    $(document).on('click', '#search', function () {
        getOrderAdmin(1, 10)
    })

    $(document).on('click', '.closeOrder', function (event) {
        layui.use(['form', 'layer', 'laydate'], function () {
            var form = layui.form;
            var layer = layui.layer;
            var top = screen.availHeight / 2 - event.screenY - 150
            var x = event.pageY + top
            if (x < 66) {
                x = 66 + 'px'
            } else if (x > 1438) {
                x = 1438 + 'px'
            }
            layer.open({
                type: 1
                , title: '您确定要取消该条订单吗？' //不显示标题栏
                , closeBtn: '2',
                offset: [x, '30%']
                , area: ['500px', '300px']
                , shade: 0.5
                , id: 'LAY_layui' //设定一个id，防止重复弹出
                , btn: ['取消订单']
                , btnAlign: 'c'
                , moveType: 1 //拖拽模式，0或者1
                , content: '<div class="layui-col-xs2" style="margin: 20px 0 0 20px">' +
                    '<h4 class="inline">取消原因</h4>' +
                    '</div>' +
                    '<div class="layui-col-xs8" style="margin-top: 20px">' +
                    '<textarea class=" layui-col-xs12 layui-textarea" placeholder="请输入取消原因"></textarea>' +
                    '</div>'
                // ,shade: 1 //不显示遮罩
                , yes: function () {
                    orderCancel(event.target.getAttribute('data-id'), $(".layui-textarea").val(), event)
                    layer.closeAll();
                }
            });
        })
    })

    $(document).on('click', '.pjOrder', function (event) {
        layui.use(['form', 'layer', 'laydate'], function () {
            var form = layui.form;
            var layer = layui.layer;
            var top = screen.availHeight / 2 - event.screenY - 150
            var x = event.pageY + top

            if (x < 66) {
                x = 66 + 'px'
            } else if (x > 1438) {
                x = 1438 + 'px'
            }


            layer.open({
                type: 1
                , title: '立即评价' //不显示标题栏
                , closeBtn: '2',
                offset: [x, '30%']
                , area: ['500px', '300px']
                , shade: 0.5
                , id: 'LAY_layui' //设定一个id，防止重复弹出
                , btn: ['提交评价']
                , btnAlign: 'c'
                , moveType: 1 //拖拽模式，0或者1
                , content: '<div style="padding: 20px 20px;">' +
                    '<div class="layui-form-item" pane="">' +
                    '<div class="pd10">' +
                    '<label class="pd10">满意</label>' +
                    '<input type="radio"  name="sex" value="0" title="满意" checked="checked" style="margin-right: 40px">' +
                    '<label class="pd10">一般</label>' +
                    '<input type="radio" name="sex" value="1" title="一般" style="margin-right: 40px">' +
                    '<label class="pd10">不满意</label>' +
                    '<input type="radio" name="sex" value="2" title="不满意" style="margin-right: 40px">' +
                    '</div>' +
                    '</div>' +
                    '<div class="layui-row pd10 " > ' +
                    '<div class="layui-col-xs10">' +
                    '<input class="otext layui-col-xs12" placeholder="请输入内容">' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                , success: function (layero) {
                    var form = layui.form;

                }
                // ,shade: 1 //不显示遮罩
                , yes: function () {
                    evaluate(event.target.getAttribute('data-id'), $('input:radio:checked').val(), $('.otext').val(), event)

                }
            });
        })
    })

    $(document).on('click', '.orderDetail', function (event) {
        // alert(event.target.getAttribute('data-id') )
        // if (event.target.getAttribute('data-id') === '1') {
        //     parent.window.location.href = '../../admin/o/payment.html?id=' + window.btoa(event.target.getAttribute('data-name')) + '&did=' + event.target.getAttribute('data-did') + '&pay=' + window.btoa(event.target.getAttribute('data-pay')) + '&payType=' + event.target.getAttribute('data-payType') + '&level=' + window.btoa('Levelthree')
        // } else {
        parent.window.location.href = '../orderDetail/orderDetail.html?id=' + event.target.getAttribute('data-id')
        // }
    })

    $(document).on('click', '.head1', function (event) {
        event.preventDefault()
        event.stopPropagation()
        // if (event.target.getAttribute('data-id') === '1') {
        //     parent.window.location.href = '../../enterprise/payment/payment.html?id=' + window.btoa(event.target.getAttribute('data-name')) + '&did=' + event.target.getAttribute('data-did') + '&pay=' + window.btoa(event.target.getAttribute('data-pay')) + '&payType=' + event.target.getAttribute('data-payType') + '&level=' + window.btoa('Levelthree')
        // } else {
        //     parent.window.location.href = '../../application/payment/payment.html?id='  + window.btoa(event.target.getAttribute('data-name'))  + '&did=' + event.target.getAttribute('data-did')+ '&pay=' + window.btoa(event.target.getAttribute('data-pay')) + '&payType=' + event.target.getAttribute('data-payType') + '&level=' + window.btoa('Levelthree')
        // }
    })

    getOrderAdmin(1, 10);

})

var getOrderAdmin = function (page, size) {
    request.url = request.Url + request.orderFindall
    request.method = "GET"

    request.data = {
        state: time.index,
        page: page,
        size: size,
        appManId: '',
        employId: '',
        id: $('#UserName').val(),
        isAppraise: '',
        startTime: time.startTime,
        endTime: time.endTime,
    }
    request.token = {
        'Authorization': 'token ' + classModule.session().token,
    }

    if (request.data.status === '') {
        delete request.data['status']
    }

    if (request.data.startTime === '') {
        delete request.data['startTime']
    }

    if (request.data.endTime === '') {
        delete request.data['endTime']
    }

    request.redata = function (data) {
        if (data.code === 0) {
            layer.msg(data.msg);
        } else {

            for (var i = 0; i < data.data.content.length; i++) {
                // data.data.content[i].prodLogo = request.imagesUrl + data.data.content[i].prodLogo
                data.data.content[i].serviceProMoney = changeMoney(data.data.content[i].serviceProMoney)
                data.data.content[i].totalMoney = changeMoney(data.data.content[i].totalMoney)
                if (data.data.content[i].expectStartTime && data.data.content[i].expectEndTime) {
                    var date = data.data.content[i].expectStartTime.split(' ')[0].split('-')
                    var str = date[0] + '年' + date[1] + '月' + date[2] + '日'
                    data.data.content[i].expectTime = str + ' ' + data.data.content[i].expectStartTime.split(' ')[1] + '-' + data.data.content[i].expectEndTime.split(' ')[1]
                }

                if (data.data.content[i].createTime) {
                    var date = data.data.content[i].createTime.split(' ')[0].split('-')
                    var str = date[0] + '年' + date[1] + '月' + date[2] + '日'
                    data.data.content[i].createTime = str + ' ' + data.data.content[i].createTime.split(' ')[1]
                }

            }

            var page = template("text_cen", data.data);
            $('.pagepadding').html(page);

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
                    limit: 10,
                    layout: ['count', 'prev', 'page', 'next', 'skip'],
                    jump: function (obj, first) {
                        // 避免首次执行 死循环
                        if (!first) {
                            // 创建loading 加载元素
                            $('.order').html('<div data-loader="circle" class="loading list-loading"></div>');

                            getOrderAdmin(obj.curr, obj.limit);
                        }
                    }
                })
            })
            data.data.content.forEach(function (item) {
                item.serviceProMoney = Number(item.serviceProMoney).toFixed(2)
                item.totalMoney = Number(item.totalMoney).toFixed(2)
            })
            var Html = template("order-cell", data.data);
            $('.order').html(Html)

            var parentFrame = parent.document.getElementById('iframe');
            parentFrame.height = $('.order').height() + 200;
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
};



var orderCancel = function (id, value, event) {
    request.url = request.Url + request.orderCancel
    request.method = "post"

    request.data = JSON.stringify({
        cancelReason: value,
        id: id,
    })

    request.token = {
        'Authorization': 'token ' + classModule.session().token
    }

    if (request.data.appManId === '') {
        delete request.data['status']
    }

    if (request.data.id === '') {
        delete request.data['startTime']
    }
    request.redata = function (data) {
        var top = screen.availHeight / 2 - event.screenY
        var x = (event.pageY + top) + 'px'
        if (data.code == 1) {
            layer.msg(data.msg, { offset: [x, '46%'] });
            getOrderAdmin(1, 10);
            parent.findOrderNumByMan(time.startTime)
        }
        else {
            layer.msg(data.msg, { offset: [x, '46%'] });
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
};

var evaluate = function (id, code, message, event) {
    request.url = request.Url + request.evaluate
    request.method = "post"
    request.data = JSON.stringify({
        appManId: classModule.session().id,
        appraiseCode: code,
        appraiseMessage: message,
        id: id,
    })

    request.token = {
        'Authorization': 'token ' + classModule.session().token,
    }

    if (request.data.appManId === '') {
        delete request.data['status']
    }

    if (request.data.id === '') {
        delete request.data['startTime']
    }
    request.redata = function (data) {
        var top = screen.availHeight / 2 - event.screenY
        var x = (event.pageY + top) + 'px'
        if (data.code == 1) {
            layer.closeAll();
            layer.msg(data.msg, { offset: [x, '46%'] });
            getOrderAdmin(1, 10);
            parent.findOrderNumByMan(time.startTime)
        }
        else {
            layer.msg(data.msg, { offset: [x, '46%'] });
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
};


function orderDetails(item) {
    var Parent = window.parent.document.getElementById("iframe");
    Parent.setAttribute('src', 'orderDetails/orderDetails.html?id=' + item.getAttribute('data-id'))
}