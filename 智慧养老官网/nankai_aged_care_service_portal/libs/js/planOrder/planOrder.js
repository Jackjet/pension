var request = new Call_Request();
var indexID = null;
var lock = true;
var communityId = '';
var serviceProId = '';
var serviceProType = '';
var serviceMoney = '';
var date = []
var date1 = []
var date2 = []
$(function () {
    var fwsId = null
    // $('.sumbit').hide()
    // 组件实例化
    layui.use('element', function () {
        var element = layui.element;
        element.render();
    });
    if (classModule.session().token === '' || classModule.session().token === null || classModule.session().token === undefined) {
        window.location.href = "../../../view/page/login/login.html"
        return false;
    }

    if (GetQueryString('Id')) {
        shopCartFindById(GetQueryString('Id'))
    } else {

        $("#serviceName").html(decodeURIComponent(window.atob(GetQueryString('name'))))
        var money1 = GetQueryString('money1');
        if (-1 != money1.indexOf('-')) {
            var sp = money1.split('-');
            if (sp[0] === '0.00' && sp[1] === '0.00') {
                money1 = '0';
            } else {
                money1 = sp[0] + ' 至 ' + sp[1];
            }
        }
        $("#serviceMoney").html('￥' + money1)
        $('.totol').html('￥' + Number(changeMoney(parseFloat(GetQueryString('money')))).toFixed(2) + 'x' + 1 + '=' + '￥' + Number(changeMoney(parseFloat(GetQueryString('money')))).toFixed(2))
        getInfore()
        if (GetQueryString('type') == 0) {
            $('.sercise').html('服务时长')
            $("#serviceTime").html(GetQueryString('time') + '小时')
        } else if (GetQueryString('type') == 1) {
            $('.sercise').html('服务次数')
            $("#serviceTime").html(GetQueryString('time'))
        } else if (GetQueryString('type') == 2) {
            var str = '<input style="height: 23px; display: inline-block;width: 50%" type="text" value="1" name="phone" autocomplete="off" class="layui-input pdl5 num">'
            $('.sercise').html(decodeURIComponent(window.atob(GetQueryString('unit'))))
            $("#serviceTime").html(str)
            $('.totol').html('￥' + Number(changeMoney(parseFloat(GetQueryString('money')))).toFixed(2) + 'x' + 1 + 'x' + 1 + '=' + '￥' + Number(changeMoney(parseFloat(GetQueryString('money')))).toFixed(2))

            // $(".num").bind('input propertychange', function() {
            //     if (!/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test($('.num').val()) && $('.num').val() != '') {
            //          layer.msg('请输入正整数')
            //          $('.num').val('1')
            //      }
            //     var price = $("#serviceMoney").html().split('￥')[1]
            //     $('.totol').html('￥' + Number(price).toFixed(2)+ 'x' + 1 + 'x'+ Number($('.num').val()) + '='+ '￥' + ((Number(price).toFixed(2))*Number( $('.num').val())).toFixed(2))
            // })
            $(".num").blur(function () {
                if (!/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test($('.num').val()) && $('.num').val() != '') {
                    layer.msg('请输入正整数或保留两位小数')
                    $('.num').val('1')
                }
                var price = $("#serviceMoney").html().split('￥')[1]
                var storeTime = Number($('.storeTime').html().split('天')[0]) || 1
                $('.totol').html('￥' + Number(price).toFixed(2) + 'x' + storeTime + 'x' + $('.num').val() + '=' + '￥' + ((Number(price).toFixed(2)) * Number($('.num').val()) * storeTime).toFixed(2))
            })
        }
    }

    $(document).on('click', '.chooseTime', function (event) {
        layui.use(['form', 'layer', 'laydate'], function () {
            var form = layui.form;
            var layer = layui.layer;
            layer.open({
                type: 1
                , title: false //不显示标题栏
                , closeBtn: 2
                , area: ['500px', '300px']
                , shade: 0.8
                , id: 'LAY_layuipro' //设定一个id，防止重复弹出
                , btn: ['确认', '取消']
                , btnAlign: 'c'
                , moveType: 1 //拖拽模式，0或者1
                , content: '<div style="padding: 15px; line-height: 22px; background-color: #fff; color: #000; font-weight: 300; border-radius:10px;">' +
                    '<div class="layui-row hp35">' +
                    '<span class="pdl10">选择预约服务时间</span>' +
                    '</div>' +
                    '<div class="layui-row h30 mt10">' +
                    "<div class='layui-col-xs2'><span class='pdl10'>预约范围</span></div>" + "<div class='layui-col-xs4 h30 boder text_cen' id='time1'></div>" + "<div class='layui-col-xs1 text_cen'><span> - </span></div>" + "<div class='layui-col-xs4 h30 boder text_cen' id='time2'></div>" +
                    '</div>' +
                    '<div id="timee" class="layui-row pdt20 h40">' +
                    "<li class='time_hour cursor onetime layui-col-xs3 text_cen boder'>06:00 - 08:00</li>" +
                    "<li class='time_hour cursor twotime layui-col-xs3 text_cen boder layui-col-md-offset1'>08:00 - 10:00</li>" +
                    "<li class='time_hour cursor threetime layui-col-xs3 text_cen boder layui-col-md-offset1'>10:00 - 12:00</li>" +
                    "<li class='time_hour cursor fourtime layui-col-xs3 text_cen boder'>12:00 - 14:00</li>" +
                    "<li class='time_hour cursor fivetime layui-col-xs3 text_cen boder layui-col-md-offset1'>14:00 - 16:00</li>" +
                    "<li class='time_hour cursor sixtime layui-col-xs3 text_cen boder layui-col-md-offset1'>16:00 - 18:00</li>" +
                    '</div>' +
                    '</div>'
                , success: function (layero) {
                    let arr = []
                    //执行一个laydate实例
                    var laydate = layui.laydate;
                    laydate.render({
                        elem: '#time1' //指定元素
                        , value: CurrentTimee()
                        , min: CurrentTimee()
                        , done: function (value, date, endDate) {
                            if (tabb($.trim(CurrentTimee()), $.trim(value))) {
                                $("#timee li").each(function (index) {
                                    $(this).removeClass('noChoose');
                                    $(this).removeClass('liang')
                                })
                            } else {
                                $("#timee li").each(function (index) {
                                    $(this).removeClass('liang')
                                    if (!arr[index]) {
                                        $(this).addClass('noChoose');
                                    }
                                })
                            }
                        }
                    });

                    laydate.render({
                        elem: '#time2' //指定元素
                        , value: CurentTime()
                        , min: CurentTime()
                    });
                    // 比较时间
                    arr.push(time_range('06:00:00', '08:00:00', $.trim(CurrentTimeSecond())));
                    arr.push(time_range('08:00:00', '10:00:00', $.trim(CurrentTimeSecond())));
                    arr.push(time_range('10:00:00', '12:00:00', $.trim(CurrentTimeSecond())));
                    arr.push(time_range('12:00:00', '14:00:00', $.trim(CurrentTimeSecond())));
                    arr.push(time_range('14:00:00', '16:00:00', $.trim(CurrentTimeSecond())));
                    arr.push(time_range('16:00:00', '18:00:00', $.trim(CurrentTimeSecond())));
                    $("#timee li").each(function (index) {
                        if (!arr[index]) {
                            $(this).addClass('noChoose');
                        }
                    })
                    $(document).on('click', '#timee li', function (e) {
                        let index = ""
                        if ($(this).hasClass('onetime')) {
                            index = 0
                        } else if ($(this).hasClass('twotime')) {
                            index = 1
                        } else if ($(this).hasClass('threetime')) {
                            index = 2
                        } else if ($(this).hasClass('fourtime')) {
                            index = 3
                        } else if ($(this).hasClass('fivetime')) {
                            index = 4
                        } else if ($(this).hasClass('sixtime')) {
                            index = 5
                        }
                        if (arr[index] || tabb($.trim(CurrentTimee()), $.trim($('#time1').html()))) {
                            $(this).removeClass('noChoose')
                            $(this).addClass('liang').siblings().removeClass('liang');
                        }

                    })

                }
                , yes: function (index, layero) {
                    if ($('.liang').text() == "") {
                        layer.msg('请选择时间段')
                        return false
                    }
                    if (!tab($.trim($('#time1').html()), $.trim($('#time2').html()))) {
                        layer.msg("开始时间不能大于结束时间")
                        return false
                    }
                    $('.storeTime').html(DateDifference($('#time1').html(), $('#time2').html()) + '天')
                    if ($.trim($('#time1').html()) === $.trim($('#time2').html())) {
                        date = $.trim($('#time2').html()).split('-')
                        var str = date[0] + '年' + date[1] + '月' + date[2] + '日'
                        $('.storeHour').html(str + ' ' + $.trim($('.liang').text().split('-')[0]) + ':00' + '-' + $.trim($('.liang').text().split('-')[1]) + ':00')
                    } else {
                        date1 = $.trim($('#time1').html()).split('-')
                        var str1 = date1[0] + '年' + date1[1] + '月' + date1[2] + '日'

                        date2 = $.trim($('#time2').html()).split('-')
                        var str2 = date2[0] + '年' + date2[1] + '月' + date2[2] + '日'
                        $('.storeHour').html(str1 + '~' + str2 + ' ' + $.trim($('.liang').text().split('-')[0]) + ':00' + '-' + $.trim($('.liang').text().split('-')[1]) + ':00')
                    }
                    $('.clearDaoTime').show()
                    var price = $("#serviceMoney").html().split('￥')[1]
                    if (GetQueryString('type') == 2 || serviceProType == 2) {
                        var totol = parseFloat(price) * parseInt($('.storeTime').html()) * Number($('.num').val())
                        $('.totol').html('￥' + Number(price).toFixed(2) + 'x' + parseInt($('.storeTime').html()) + 'x' + Number($('.num').val()) + '=' + '￥' + totol.toFixed(2))
                    } else {
                        var totol = parseFloat(price) * parseInt($('.storeTime').html())
                        $('.totol').html('￥' + Number(price).toFixed(2) + 'x' + parseInt($('.storeTime').html()) + '=' + '￥' + totol.toFixed(2))
                    }

                    layer.closeAll()
                }
                , btn2: function (index, layero) {
                    //按钮【按钮二】的回调
                    //return false 开启该代码可禁止点击该按钮关闭
                }
            });
        })
    })
    $(document).on('click', '.chooseArea', function (event) {
        serviceFun()
    })


    // $(document).on('click', '.nearSub', function (event) {
    // 	console.log(event.currentTarget)
    // 	var money1 = GetQueryString('money1');
    // 	if(-1 != money1.indexOf('-')){
    // 		var sp = money1.split('-');
    // 		if (sp[0] === '0.00' && sp[1] === '0.00') {
    // 			money1 = '0';
    // 		} else {
    // 			money1 = sp[0] + ' 至 ' + sp[1];
    // 		}
    // 	}
    // 	/* <div class="layui-row hp35">
    // 	    <span class="pdl10">确认订单信息</span>
    // 	    <span class="pdl10 rl tip">温馨提示：可选择意向服务商为您服务&nbsp;&nbsp;&nbsp;&nbsp;<span class="chooseArea cursor" style="color:#ff0000;font-size: 18px;font-weight: 900;">立即选择服务商 ></span></span>
    // 	</div> */
    // 	var html = '<div class="layui-row hp35">' + 
    // 				'<span class="pdl10">确认订单信息</span>' + 
    // 				'</div>' +
    // 				'<div style="width:410px;margin:0 20%;height:145px;display:flex;justify-content: center;align-items: center;color:#f47f3d;font-size:20px;">' +  
    // 				'由于您未指定服务商家，系统采取就近原则分配服务商，服务金额在' 
    // 				+ money1 + 
    // 				'区间 </div>';
    //     layui.use(['form', 'layer', 'laydate'], function () {
    //         var form = layui.form;
    //         var layer = layui.layer;
    //         layer.open({
    //             type: 1
    //             , title: false //不显示标题栏
    //             , closeBtn: 2
    //             , area: ['600px', '250px']
    //             , shade: 0.9
    //             , id: 'LAY_layuipro' //设定一个id，防止重复弹出
    //             ,btn: ['确认', '取消']
    //             , btnAlign: 'c'
    //             , moveType: 1 //拖拽模式，0或者1
    //             , content: html
    //             , success: function (layero) {

    //             }
    //             , yes: function (index, layero) {
    // 				console.log(1)
    // 				$('.sumbit').click();
    //                 layer.closeAll()
    //             }
    //             , btn2: function (index, layero) {
    //                 $('.boy').removeClass('preventScroll')
    //                 //按钮【按钮二】的回调    
    //                 //return false 开启该代码可禁止点击该按钮关闭
    //             }
    //             , cancel: function () {
    //                 $('.boy').removeClass('preventScroll')
    //             }
    //         });
    //     })

    // })

    $(document).on('click', '.upAddress', function (event) {
        if (false) {
            window.sessionStorage.setItem('user', '1')
            window.location.href = '../../../view/page/admin/admin.html'
        }
        else {
            layui.use(['form', 'layer', 'laydate'], function () {
                var form = layui.form;
                var layer = layui.layer;
                form.on('select(street)', function (data) {
                    console.log(data)
                });
                layer.open({
                    type: 1
                    , title: false //不显示标题栏
                    , closeBtn: 2
                    , area: ['600px', '500px']
                    , shade: 0.8
                    , id: 'LAY_layuipro' //设定一个id，防止重复弹出
                    , btn: ['确认']
                    , btnAlign: 'c'
                    , moveType: 1 //拖拽模式，0或者1
                    , content: '<div style="padding: 15px;  line-height: 22px; background-color: #fff; color: #000; font-weight: 300; border-radius:5px;">' +
                        '<div class="layui-row hp35">' +
                        '<span class="pdl10">修改地址</span>' +
                        '</div>' +
                        '<div class="layui-row pd10 mlt20 ">' +
                        '<form class="layui-form" action="" id="Form">' +
                        '<div class="layui-form-item" id="area-picker">' +
                        '<div class="layui-form-label">服务地址<b>*</b></div>' +
                        '<div class="layui-input-inline" style="width: 126px;">' +
                        '<input name="contact" type="text"  disabled value="南开区"  autocomplete="off" class="layui-input">' +
                        '</div>' +
                        '<div class="layui-input-inline" style="width: 129px;">' +
                        '<select id="streett" name="province" class="province-selector" required lay-verify="street" data-value="" lay-filter="province1">' +
                        '<option value="">请选择街道</option>' +
                        '</select>' +
                        '</div>' +
                        '<div class="layui-input-inline" style="width: 129px;">' +
                        '<select id="community" name="prcityovince" class="city-selector" lay-verify="community" required data-value=""  lay-filter="community1">' +
                        '<option value="">请选择社区</option>' +
                        '</select>' +
                        '</div>' +
                        '</div>' +
                        '<div class="layui-form-item mlt30">' +
                        '<label class="layui-form-label">服务详细地址<b>*</b></label>' +
                        '<div class="layui-input-block">' +
                        "<textarea id='addre' name='address' required  lay-verType='tips' lay-verify='address' required placeholder='例：天津市南开区红旗南路263号' class='layui-textarea'></textarea>" +
                        '</div>' +
                        '</div>' +
                        '</form>' +
                        '</div>' +
                        '</div>'
                    , success: function (layero) {
                        getStreet()
                        $('#addre').val($('.ser_address').html().split('-')[3])
                        $(document).on('change', '#streett', function (event) {
                            communityy()
                        })
                    }
                    , yes: function (index, layero) {
                        if ($('#streett option:selected').text() === "请选择街道") {
                            layer.msg('请选择街道')
                            return false
                        }
                        if ($('#community option:selected').text() === "请选择社区") {
                            layer.msg('请选择社区')
                            return false
                        }
                        if ($('#addre').val() === '') {
                            layer.msg('请填写服务详细地址')
                            return false
                        }
                        $('.ser_address').html('南开区' + '-' + $('#streett option:selected').text() + '-' + $('#community option:selected').text() + '-' + $('#addre').val())
                        getAddress($('.ser_address').html().split('-')[0] + $('.ser_address').html().split('-')[1] + $('.ser_address').html().split('-')[2] + $('#addre').val())
                        lock = true
                        layer.closeAll()
                    }
                    , btn2: function (index, layero) {
                        //按钮【按钮二】的回调

                        //return false 开启该代码可禁止点击该按钮关闭
                    }
                    , cancel: function (index, layero) {
                        lock = true
                    }
                });
            })
        }
    })
    function DateDifference(sDate1, sDate2) {
        var dateSpan,
            tempDate,
            iDays;
        sDate1 = Date.parse(sDate1);
        sDate2 = Date.parse(sDate2);
        dateSpan = sDate2 - sDate1;
        dateSpan = Math.abs(dateSpan);
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        return iDays + 1
    };
    function tab(date1, date2) {
        var oDate1 = new Date(date1);
        var oDate2 = new Date(date2);
        if (oDate1.getTime() > oDate2.getTime()) {
            return false
        } else {
            return true
        }
    }
    function tabb(date1, date2) {
        var oDate1 = new Date(date1);
        var oDate2 = new Date(date2);
        if (oDate1.getTime() > oDate2.getTime() || oDate1.getTime() == oDate2.getTime()) {
            return false
        } else {
            return true
        }
    }
    GeneralPart(1);
    // Getservice(1, 5);
    // getServiceClass(1, 100)

    if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))) {
        new WOW().init();
    };
    var provider = function (page, size, serviceProjectId, name, beginMoney, endMoney) {
        let sId = serviceProjectId
        request.url = request.Url + request.provider
        request.method = "GET"
        request.data = {
            page: page,
            size: size,
            serviceProjectId: serviceProjectId,
            providerName: name,
            beginMoney: beginMoney * 100,
            endMoney: endMoney * 100,
        }
        request.token = {
            'Authorization': 'token ' + classModule.session().token
        }
        if (request.data.serviceProjectId === '') {
            delete request.data['serviceProjectId']
        }
        request.redata = function (data) {
            console.log(data)
            if (data.code === 0) {
                layer.msg(data.msg);
            } else {
                if (data.data.content.length > 0) {
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
                                    $('.ser').html('<div data-loader="circle" class="loading list-loading"></div>');
                                    provider(obj.curr, obj.limit, sId, beginMoney, endMoney);
                                }
                            }
                        })
                    })
                } else {
                    $('#laypage').html('')
                }


                data.data.content.forEach(element => {
                    if (element.logo === '' || element.logo === null) {
                        element.logo = '../../../public/images/service.png'
                    } else {
                        element.logo = request.imagesUrl + element.logo;
                    }
                })
                console.log(data.data)
                var Html = template("fws-cell", data.data);
                $('.fws').html(Html)
            }
        }

        request.reinfo = function (xhr) {
            console.log(xhr);
        }
        request.run();
    };
    serviceFun()
    function serviceFun() {
        layui.use(['form', 'layer', 'laydate'], function () {
            var form = layui.form;
            var layer = layui.layer;
            layer.open({
                type: 1
                , title: false //不显示标题栏
                , closeBtn: 2
                , area: ['1200px', '650px']
                , shade: 0.9
                , id: 'LAY_layuipro' //设定一个id，防止重复弹出
                // ,btn: ['确认', '取消']
                , btnAlign: 'c'
                , moveType: 1 //拖拽模式，0或者1
                , content: '<div  class="serviceBox">' +
                    '<div class="layui-row hp35">' +
                    '<span class="pdl10">立即选择服务商</span>' +
                    '</div>' +
                    '<div class="layui-row" style="margin:20px 0">' +
                    '<span class="serverName">服务商名称</span><input id="serverName" type="text"/>' +
                    '<span class="serverName">服务价格</span><input id="serverPrice" class="beginMoney" type="text"/>' +
                    "<span style='margin:0 0 0 5px'> - </span><input id='serverPrice' class='endMoney' type='text'/><button class='searchServer'>查询</button>" +
                    '</div>' +
                    '<div class="layui-row">' +
                    '<ul class="fws pd5" >' +
                    "<script id='fws-cell' type='text/html'>" +
                    '{{if content.length > 0}}' +
                    '{{each content as value i}}' +
                    "<li class='mg' >" +
                    "<div class='layui-col-xs2 pd10 animated fadeInUp'>" +
                    "<img src='{{value.logo}}'>" +
                    '</div>' +
                    "<div class='layui-col-xs8 animated fadeInUp'>" +
                    "<p data-id='{{value.id}}' class='serDetail cursor over-hid' >{{value.name}}<p>" +
                    '<p class="over-hid"><span>{{value.phone}}</span>|<span>{{value.address}}</span><p>' +
                    '<p class="over-hid"> <span>{{value.openTime}}</span><p>' +
                    '<p style="display:{{value.remark?"block":"none"}}" class="over-hid">{{value.remark}}<p>' +
                    '<p class="over-hid" style="color: #f47f3d">￥{{value.money/100|| value.marketMoney/100}}<p>' +
                    '</div>' +
                    "<div class='layui-col-xs2 rl pdt20 animated fadeInUp linh80' style='line-height:80px;'>" +
                    "<button data-id='{{value.id}}' data-name='{{value.name}}' data-money='{{value.money || value.marketMoney}}' class='choose_fws layui-btn rl' style='margin-right: 10px;'>选择</button>" +
                    '</div>' +
                    '</li>' +
                    '{{/each}}' +
                    '{{else}}' +
                    '<div style="height:300px;width:100%;display:flex;justify-content: center;align-items: center;font-size:20px"><i class="iconfont TanSantishi" style="font-size:20px;margin-right:10px"></i>暂无数据</div>' +
                    '{{/if}}' +
                    '</script>' +
                    '</ul>' +
                    '</div>' +
                    '<div class="text_cen" id="laypage"></div>' +
                    '</div>'

                , success: function (layero) {
                    $('.boy').addClass('preventScroll')
                    let beginMoney = GetQueryString('money1').split('-')[0]
                    let endMoney = GetQueryString('money1').split('-')[1]
                    $('.beginMoney').val(beginMoney)
                    $('.endMoney').val(endMoney)
                    //执行一个laydate实例
                    $(document).on('click', '.choose_fws', function (event) {
                        // $('.sumbit').show()
                        // $('.nearSub').hide()
                        $('.boy').removeClass('preventScroll')
                        event.stopPropagation()
                        $('.storeName').html(event.target.getAttribute('data-name'))
                        $('.clearSerName').show()
                        fwsId = event.target.getAttribute('data-id')
                        $("#serviceMoney").html('￥' + (event.target.getAttribute('data-money') / 100).toFixed(2))
                        var storeTime = Number($('.storeTime').html().split('天')[0]) || 1
                        if (GetQueryString('type') == 2 || serviceProType == 2) {
                            $('.totol').html('￥' + Number(event.target.getAttribute('data-money') / 100).toFixed(2) + 'x' + storeTime + 'x' + $(".num").val() + '=' + '￥' + (Number(event.target.getAttribute('data-money') / 100) * Number($(".num").val()) * storeTime).toFixed(2))
                        } else {
                            $('.totol').html('￥' + Number(event.target.getAttribute('data-money') / 100).toFixed(2) + 'x' + storeTime + '=' + '￥' + (Number(event.target.getAttribute('data-money') / 100) * storeTime).toFixed(2))
                        }
                        layer.closeAll()
                    })
                    $(document).on('click', '.searchServer', function (event) {
                        let name = $('#serverName').val()
                        let begin = $('.beginMoney').val()
                        let end = $('.endMoney').val()
                        provider(1, 10, serviceProId || window.atob(GetQueryString('id')), name, begin, end)
                    })
                    provider(1, 10, serviceProId || window.atob(GetQueryString('id')), '', beginMoney, endMoney)

                    $(document).on('click', '.serDetail', function (event) {
                        window.location.href = '../../../view/page/service/service.html?id=' + event.target.getAttribute('data-id')
                    })
                }
                , yes: function (index, layero) {
                    $('.boy').removeClass('preventScroll')
                    layer.closeAll()
                }
                , btn2: function (index, layero) {
                    $('.boy').removeClass('preventScroll')
                    //按钮【按钮二】的回调    
                    //return false 开启该代码可禁止点击该按钮关闭
                }
                , cancel: function () {
                    $('.boy').removeClass('preventScroll')
                }
            });
        })
    }


    function CurentTime() {
        var now = new Date();
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日         
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss = now.getSeconds();           //秒          
        var clock = year + "-";
        if (month < 10)
            clock += "0";

        clock += month + "-";

        if (day < 10)
            clock += "0";

        clock += day + " ";

        // if(hh < 10)
        //     clock += "0";

        // clock += hh + ":";
        // if (mm < 10) clock += '0'; 
        // clock += mm + ":"; 

        // if (ss < 10) clock += '0'; 
        // clock += ss; 
        return (clock);
    }


    // var communityy = function () {
    //     request.url = request.Url + request.community
    //     request.method = "GET"
    //     request.data = {
    //         page: '1',
    //         size: '50',
    //         streetId: $("#streett").val(),
    //         streetName: '',
    //         name: '',
    //     }
    //     request.token = {
    //         'Authorization': 'token ' +  classModule.session().token   
    //     }
    //     request.redata = function (data) {
    //         if (data.code === 0 ) {
    //             layer.msg(data.msg);
    //         } else {
    //             data.data.content.map(function (k,v) {
    //                 $("#community").append('<option value="'+ k.id +'">' + k.name + '</option>');
    //             })

    //         }
    //     }

    //     request.reinfo = function (xhr) {
    //         console.log(xhr);
    //     }
    //     request.run();
    // }; 
    // 立即下单
    $(document).on('click', '.sumbit', function (event) {

        if (info.isPerfect === '0') {
            window.sessionStorage.setItem('user', '1')
            window.location.href = '../../../view/page/admin/admin.html'
        } else {
            if (!$(".storeName").html()) {
                layer.msg('请选择服务商')
                return false;
            }
            if ($('.num').length != 0) {

                if ($('.num').val() === '') {
                    layer.msg('请输入' + decodeURIComponent(window.atob(GetQueryString('unit'))))
                    return false
                } else if ($('.num').val() === 0) {
                    layer.msg('请输入大于0的整数')
                }
                var price = $("#serviceMoney").html().split('￥')[1]
                var storeTime = Number($('.storeTime').html().split('天')[0]) || 1
                var totol = parseFloat(price) * storeTime * Number($('.num').val())
                $('.totol').html('￥' + Number(price).toFixed(2) + 'x' + storeTime + 'x' + Number($('.num').val()) + '=' + '￥' + totol.toFixed(2))
            }


            if ($('.phone').val() === '') {
                layer.msg('手机号不能为空')
                return false
            }

            let loginReg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!loginReg.test($('.phone').val())) {
                layer.msg('请输入正确的手机号码')
                return false
            }

            if ($('.ser_address').html() === '') {
                layer.msg('服务地址不能为空')
                return false
            }
            orderInsert()
        }

    })
    // 加入购物车
    $(document).on('click', '.shopCart', function () {
        // window.sessionStorage.setItem('user','1')
        // window.location.href = '../../../view/page/admin/admin.html'
        if (!$(".storeName").html()) {
            layer.msg('请选择服务商')
            return false;
        }
        var loginReg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if ($('.phone').val() === '') {
            layer.msg('手机号不能为空')
            return false
        }
        if (!loginReg.test($('.phone').val())) {
            layer.msg('请输入正确的手机号码')
            return false
        }

        var price = $("#serviceMoney").html().split('￥')[1]
        var storeTime = Number($('.storeTime').html().split('天')[0]) || 1


        if (GetQueryString('type') == 2 || serviceProType == 2) {
            var totol = Number(price) * storeTime * Number($('.num').val())
            $('.totol').html('￥' + Number(price).toFixed(2) + 'x' + storeTime + 'x' + Number($('.num').val()) + '=' + '￥' + totol.toFixed(2))
        } else {
            var totol = Number(price) * storeTime
            $('.totol').html('￥' + Number(price).toFixed(2) + 'x' + storeTime + '=' + '￥' + totol.toFixed(2))
        }

        if ($('.ser_address').html() === '') {
            layer.msg('服务地址不能为空')
            return false
        }
        shopCartInsert()



    })

    var orderInsert = function () {
        let startTime = ""
        let endTime = ""
        let storeHour = ""
        let time = $('.storeHour').html().split(' ')[0];
        if ($('.storeHour').html() !== "") {
            if (time.indexOf('~') === -1) {
                startTime = date.join('-')
                endTime = date.join('-')

            } else {
                startTime = date1.join('-')
                endTime = date2.join('-')
            }
            storeHour = $('.storeHour').html().split(' ')[1]
        }

        request.url = request.Url + request.orderInsert
        request.method = "post"
        request.data = JSON.stringify({
            serviceProId: serviceProId || window.atob(GetQueryString('id')),
            num: $('.num').val(),
            appManId: classModule.session().id,
            manPhone: $('.phone').val(),
            areaName: '天津市 南开区',
            communityId: communityId,
            address: $('.ser_address').html().split('-')[3],
            longitude: local.lng,
            latitude: local.lat,
            orderWay: '2',
            expectTimeEnd: endTime,
            expectTimeStart: startTime,
            expectTime: storeHour,
            providerId: fwsId,

        })
        request.token = {
            'Authorization': 'token ' + classModule.session().token
        }
        request.redata = function (data) {
            if (data.code === 0) {
                layer.msg(data.msg);
            } else {
                layer.msg(data.msg);
                setTimeout(function () { window.location.href = '../../../view/page/oneStop/oneStop.html' }, 1000);
            }
        }

        request.reinfo = function (xhr) {
            console.log(xhr);
        }
        request.run();
    };

    var shopCartInsert = function () {
        let startTime = ""
        let endTime = ""
        let storeHour = ""
        let time = $('.storeHour').html().split(' ')[0];
        if ($('.storeHour').html() !== "") {
            if (time.indexOf('~') === -1) {
                startTime = date.join('-')
                endTime = date.join('-')

            } else {
                startTime = date1.join('-')
                endTime = date2.join('-')
            }
            storeHour = $('.storeHour').html().split(' ')[1]
        }
        request.url = request.Url + request.shopCartInsert
        request.method = "post"
        request.data = JSON.stringify({
            serviceProId: serviceProId || window.atob(GetQueryString('id')),
            num: $('.num').val(),
            userPhone: $('.phone').val(),
            areaName: '天津市 南开区',
            communityId: communityId,
            address: $('.ser_address').html().split('-')[3],
            longitude: local.lng,
            latitude: local.lat,
            expectTimeEnd: endTime,
            expectTimeStart: startTime,
            expectTime: storeHour,
            providerId: fwsId,

        })
        request.token = {
            'Authorization': 'token ' + classModule.session().token
        }
        request.redata = function (data) {
            if (data.code === 0) {
                layer.msg(data.msg);
            } else {
                layer.msg(data.msg);
                if (serviceProType) {
                    setTimeout(function () { window.location.href = '../../../view/page/shopCart/shopCart.html' }, 1000);
                } else {
                    setTimeout(function () { window.location.href = '../../../view/page/oneStop/oneStop.html' }, 1000);
                }

            }
        }

        request.reinfo = function (xhr) {
            console.log(xhr);
        }
        request.run();
    }

    $(document).on('click', '.clearSerName', function (event) {
        $('.sumbit').hide()
        $('.nearSub').show()
        $('.clearSerName').hide()
        $('.storeName').html('')
        var serviceMoney = Number(serviceMoney) || Number(changeMoney(parseFloat(GetQueryString('money'))))
        $("#serviceMoney").html('￥' + serviceMoney.toFixed(2))
        var storeTime = Number($('.storeTime').html().split('天')[0]) || 1
        if (GetQueryString('type') == 2 || serviceProType == 2) {
            $('.totol').html('￥' + serviceMoney.toFixed(2) + 'x' + storeTime + 'x' + $(".num").val() + '=' + '￥' + (Number(changeMoney(parseFloat(GetQueryString('money')))) * Number($(".num").val()) * storeTime).toFixed(2))
        } else {
            $('.totol').html('￥' + serviceMoney.toFixed(2) + 'x' + storeTime + '=' + '￥' + (Number(changeMoney(parseFloat(GetQueryString('money')))) * storeTime).toFixed(2))
        }
    })

    $(document).on('click', '.clearDaoTime', function (event) {
        $('.clearDaoTime').hide()
        $('.storeHour').html('')
        $('.storeTime').html('')
        var price = $("#serviceMoney").html().split('￥')[1]
        if (GetQueryString('type') == 2 || serviceProType == 2) {
            $('.totol').html('￥' + Number(price).toFixed(2) + 'x' + 1 + 'x' + $(".num").val() + '=' + '￥' + (Number(price) * Number($(".num").val())).toFixed(2))
        } else {
            $('.totol').html('￥' + Number(price).toFixed(2) + 'x' + 1 + '=' + '￥' + Number(price).toFixed(2))
        }
    })


    layui.use('form', function () {
        // 创建表单实例
        var form = layui.form
        form.render()
        // 添加自定义表单验证
        form.verify({
            street: function (value, item) {
                if (value === '') {
                    return '请选择街道';
                }
            },
            community: function (value, item) {
                if (value === '') {
                    return '请选择社区';
                }
            },
            address: function (value, item) {
                if (value === '') {
                    return '请输入服务详细地址';
                }
            },
        });

        // 表单提交验证
        form.on('submit(Submit)', function (date) {
            var streetName = ''
            var communityName = ''
            $("select[name='province']").find('option').each(function () {
                if ($(this).val() == date.field.province) {
                    streetName = $(this).text()
                }
            })
            $("select[name='prcityovince']").find('option').each(function () {
                if ($(this).val() == date.field.prcityovince) {
                    communityName = $(this).text()
                }
            })
            request.url = request.Url + request.update
            request.method = "PUT"
            request.data = JSON.stringify({
                address: date.field.address,
                name: date.field.name,
                streetId: date.field.province,
                streetName: streetName,
                communityId: date.field.prcityovince,
                communityName: communityName
            })

            request.token = {
                'Authorization': 'token ' + classModule.session().token,
            }
            request.redata = function (data) {
                if (data.code === 0) {
                    layer.msg(data.msg);
                } else {
                    layer.msg(data.msg);
                }
            }
            request.reinfo = function (xhr) {
                console.log(xhr);
            }

            request.run();
        });
    });




})

var info = {
    manIdCard: '',
    manName: '',
    manPhone: '',
    isPerfect: '',
}
// 获取个人信息
var getInfore = function () {
    request.url = request.Url + request.getCurrentAppUser
    request.method = "GET"
    request.data = {

    }
    request.token = {
        'Authorization': 'token ' + classModule.session().token
    }
    request.redata = function (data) {
        if (data.code === 0) {
            layer.msg(data.msg);
        } else {
            communityId = data.data.communityId
            info.manIdCard = data.data.idCard
            info.manName = data.data.name
            $('.phone').val(data.data.phone);
            info.isPerfect = data.data.isPerfect
            $('.name').html(data.data.name)
            $('.phone').html(data.data.phone)
            if (data.data.streetName != '' && data.data.streetName != null) {
                $('.ser_address').html(data.data.areaName + '-' + data.data.streetName + '-' + data.data.communityName + '-' + data.data.address)
            }
            getAddress(data.data.areaName + data.data.streetName + data.data.communityName + data.data.address)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();

};
var local = {
    lat: '',
    lng: ''
}
// 获取地址
function getAddress(address) {
    $.ajax({
        url: 'https://api.map.baidu.com/geocoding/v3/?address=' + address + '&output=json&ak=VofoQFsCgcuztMGacj4QEraxM87Iufl5',
        dataType: 'jsonp',
        processData: false,
        type: 'get',
        success: function (data) {
            if (data.status == 0) {
                local.lat = data.result.location.lat
                local.lng = data.result.location.lng
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        }
    });
}



var getStreet = function () {
    request.url = request.Url + request.street
    request.method = "GET"

    request.data = {
        page: 1,
        size: 1000
    }

    request.redata = function (data) {
        if (data.code === 0) {
            // 提示登录失败
            layer.msg(data.msg);
        } else {
            data.data.content.forEach(function (item) {
                $('select[name=province]').append('<option label=' + item.name + ' value=' + item.id + '>' + item.name + '</option>')
            })
            layui.use('form', function () {
                // 创建表单实例
                var form = layui.form
                form.on('select(province1)', function (data) {
                    // if (!first) {
                    getCommunity(data.value)
                    // }
                });

                $("#streett").find("option[label = '" + $('.ser_address').html().split('-')[1] + "']").attr("selected", "selected")
                form.render("select");
                getCommunity(data.value)

            });
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}


var getCommunity = function (val) {
    request.url = request.Url + request.community
    request.method = "GET"

    request.data = {
        streetId: val,
        page: 1,
        size: 1000
    }

    request.redata = function (data) {
        if (data.code === 0) {
            layer.msg(data.msg);
        } else {
            $("option").remove(".item");
            data.data.content.forEach(function (item) {
                $('select[name=prcityovince]').append('<option class="item" label=' + item.name + ' value=' + item.id + '>' + item.name + '</option>')
            })
            layui.use('form', function () {
                // 创建表单实例
                var form = layui.form
                if (lock) {
                    lock = !lock
                    $("#community").find("option[label = '" + $('.ser_address').html().split('-')[2] + "']").attr("selected", "selected")
                }
                form.on('select(community1)', function (data) {
                    // if (!first) {
                    communityId = data.value
                    // }
                });
                form.render("select");
            });
        }
    }
    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

var shopCartFindById = function (id) {
    request.url = request.Url + request.shopCartFindById
    request.method = "GET"

    request.data = {
        id: id
    }

    request.token = {
        'Authorization': 'token ' + classModule.session().token
    }

    request.redata = function (data) {
        if (data.code === 0) {
            layer.msg(data.msg);
        } else {
            communityId = data.data.communityId
            serviceProId = data.data.serviceProId
            serviceProType = data.data.serviceProType
            serviceMoney = data.data.serviceMoney
            local.lat = data.data.latitude
            local.lng = data.data.longitude
            $("#serviceName").html(data.data.serviceProName)
            $("#serviceMoney").html('￥' + (data.data.money / 100).toFixed(2))
            $('.name').html(data.data.userName)
            if (data.data.expectTimeStart && data.data.expectTimeEnd) {
                $('.clearDaoTime').show()
                $('.storeTime').html(DateDifference(data.data.expectTimeStart, data.data.expectTimeEnd) + '天')
                if (data.data.expectTimeStart === data.data.expectTimeEnd) {
                    date = data.data.expectTimeEnd.split('-')
                    var str = date[0] + '年' + date[1] + '月' + date[2] + '日'
                    $('.storeHour').html(str + ' ' + data.data.expectTime)
                } else {
                    date1 = data.data.expectTimeStart.split('-')
                    var str1 = date1[0] + '年' + date1[1] + '月' + date1[2] + '日'

                    date2 = data.data.expectTimeEnd.split('-')
                    var str2 = date2[0] + '年' + date2[1] + '月' + date2[2] + '日'
                    $('.storeHour').html(str1 + '~' + str2 + ' ' + data.data.expectTime)
                }
            }
            var storeTime = Number($('.storeTime').html().split('天')[0]) || 1
            if (data.data.providerName) {
                $('.clearSerName').show()
                $('.storeName').html(data.data.providerName)
            }
            $('.phone').val(data.data.userPhone);
            if (data.data.serviceProType == '2') {
                var str = '<input style="height: 23px; display: inline-block;width: 50%" type="text" value="1" name="phone" autocomplete="off" class="layui-input pdl5 num">'
                $('.sercise').html(data.data.unit)
                $("#serviceTime").html(str)
                $(".num").val(data.data.num)
                var price = data.data.money / 100
                $('.totol').html('￥' + Number(price).toFixed(2) + 'x' + storeTime + 'x' + $('.num').val() + '=' + '￥' + ((Number(price).toFixed(2)) * Number($('.num').val())).toFixed(2))
                $(".num").blur(function () {
                    if (!/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test($('.num').val()) && $('.num').val() != '') {
                        layer.msg('请输入正整数或保留两位小数')
                        $('.num').val('1')
                    }
                    var price = $("#serviceMoney").html().split('￥')[1]
                    $('.totol').html('￥' + Number(price).toFixed(2) + 'x' + storeTime + 'x' + $('.num').val() + '=' + '￥' + ((Number(price).toFixed(2)) * Number($('.num').val())).toFixed(2))
                })
            } else {
                if (data.data.serviceProType == '0') {
                    $('.sercise').html('服务时长')
                    $("#serviceTime").html(data.data.serviceProTime)
                } else if (data.data.serviceProType) {
                    $('.sercise').html('服务次数')
                    $("#serviceTime").html(data.data.serviceProTime)
                }

                var price = data.data.money / 100
                $('.totol').html('￥' + Number(price).toFixed(2) + 'x' + storeTime + '=' + '￥' + Number(price).toFixed(2))
            }
            $('.ser_address').html(data.data.areaName + '-' + data.data.streetName + '-' + data.data.communityName + '-' + data.data.address)
        }
    }
    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

var DateDifference = function (sDate1, sDate2) {
    var dateSpan,
        tempDate,
        iDays;
    sDate1 = Date.parse(sDate1);
    sDate2 = Date.parse(sDate2);
    dateSpan = sDate2 - sDate1;
    dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
    return iDays + 1
};


// var getAdd = function () {
//     console.log($('.ser_address').html().split('-'))

//     $('.ser_address').html().split('-')[0]

//     $('textarea[name=address]').val(data.data.address)
//     if (data.data.streetId) {
//         $('select[name=province]').next().find('input').click();
//         $('select[name=province]').next().find('dd[lay-value=' + data.data.streetId + ']').click();
//         setTimeout(function () {
//             $('select[name=prcityovince]').next().find('input').click();
//             $('select[name=prcityovince]').next().find('dd[lay-value=' + data.data.communityId + ']').click();
//             first = false
//         }, 20)
//     } else {
//         first = false
//     }

// }

