var request = new Call_Request();
var indexID = null;

$(function (){
    var fwsId = null
    // 组件实例化
    layui.use('element', function(){
        var element = layui.element;
        element.render();
    });
   GeneralPart(2);
    layui.use('form', function(){
        var form = layui.form;
        form.render();

        form.verify({
            message: function (value, item) {
                if (value === '') {
                    return '评价内容不能为空'
                }
            }
        })
        //监听提交
        form.on('submit(formDemo)', function(date){
            request.url = request.Url + request.evaluate
            request.method = "post"

            request.data = JSON.stringify({
                appManId: classModule.session().id,
                appraiseCode: date.field.appraiseCode,
                appraiseMessage: date.field.message,
                id: GetQueryString('id'),
            })

            request.token = {
                'Authorization': 'token ' + classModule.session().token,
            }

            request.redata = function (data) {
                if (data.code === 0 ) {
                    layer.msg(data.msg);
                } else {
                    layer.msg(data.msg);
                    setTimeout(function () {
                        window.location.reload()
                    },1000)
                }
            }

            request.reinfo = function (xhr) {
                console.log(xhr);
            }
            request.run();

        });
    });
    jQuery('#qrcode').qrcode({
        render: "canvas", //也可以替换为table
        foreground: "#000",
        background: "#FFF",
        text: GetQueryString('id'),
        width: 100,
        height: 100,
    });
   orderFindById(GetQueryString('id'))
    function CurentTime ()
        { 
            var now = new Date();
            var year = now.getFullYear();       //年
            var month = now.getMonth() + 1;     //月
            var day = now.getDate();            //日         
            var hh = now.getHours();            //时
            var mm = now.getMinutes();          //分
            var ss = now.getSeconds();           //秒          
            var clock = year + "-";         
            if(month < 10)
                clock += "0";
            
            clock += month + "-";
            
            if(day < 10)
                clock += "0";
                
            clock += day + " ";
            
            // if(hh < 10)
            //     clock += "0";
                
            // clock += hh + ":";
            // if (mm < 10) clock += '0'; 
            // clock += mm + ":"; 
            
            // if (ss < 10) clock += '0'; 
            // clock += ss; 
            return(clock); 
        }
    $(document).on('click', '#cencal', function () {
        layui.use(['form','layer', 'laydate'],function(){
            var form = layui.form;
            var layer = layui.layer;
            layer.open({
                type: 1
                ,title: '您确定要取消该条订单吗？' //不显示标题栏
                ,closeBtn: '2',
                offset: ['150px', '450px']
                ,area: ['500px','300px']
                ,shade: 0.5
                ,id: 'LAY_layui' //设定一个id，防止重复弹出
                ,btn: ['取消订单']
                ,btnAlign: 'c'
                ,moveType: 1 //拖拽模式，0或者1
                ,content: '<div class="layui-col-xs2" style="margin: 20px 0 0 20px">'+
                '<h4 class="inline">取消原因</h4>'+
                '</div>' +
                '<div class="layui-col-xs8" style="margin-top: 20px">'+
                '<textarea class=" layui-col-xs12 layui-textarea" placeholder="请输入取消原因"></textarea>'+
                '</div>'
                // ,shade: 1 //不显示遮罩
                ,yes: function(){
                    orderCancel($($(".layui-textarea")[1]).val())
                    layer.closeAll();
                }
            });
        })

    })
    $(".serviceTime").mouseenter(function(){
        if($('.serviceProType').html() == '单价服务'){
            $(".popver").css("display","block");
        }
       
    });

    $(".serviceTime").mouseleave(function(){
        if($('.serviceProType').html() == '单价服务'){
            $(".popver").css("display","none");
        }
    });
    
})

var orderFindById = function (id) {
    request.url = request.Url + request.orderFindById
    request.method = "GET"
    request.data = {
        id: id,
    }
    request.token = {
        'Authorization': 'token ' + classModule.session().token,
    }
    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {
            var data = data.data
            if (data.acceptTime) {
                var cancelTime = data.acceptTime.split(' ')[0].split('-')
                var str = cancelTime[0] + '年' + cancelTime[1] + '月' + cancelTime[2] + '日'
                $('.acceptTime').html(str + ' ' + data.acceptTime.split(' ')[1])
            }
            switch (data.state) {
                case '-1':
                    $('.cancel').hide()
                    $('.hide').show()
                    $(".status").html('已取消')
                    $(".canceled").html('已取消')
                    $('.bg-pic').find('img').eq(2).hide()
                    $('.bg-pic').find('img').eq(3).hide()
                    $('.bg-pic').find('span').eq(1).css('visibility','hidden')
                    $('.bg-pic').find('span').eq(2).hide()
                    $('.bg-pic').find('span').eq(3).hide()
                    $('.bg-pic').find('img').eq(1).attr('src', '../../../../public/images/admin/two-bg.png')
                    if (data.cancelTime) {
                        var cancelTime = data.createTime.split(' ')[0].split('-')
                        var str = cancelTime[0] + '年' + cancelTime[1] + '月' + cancelTime[2] + '日'
                        $('.acceptTime').html(str + ' ' + data.cancelTime.split(' ')[1])
                    }
                    break;
                case '0':
                    $('.preOrder').hide()
                    $(".status").html('待接单')
                    $('.cencal').show()
                    $('.bg-pic').find('img').eq(0).attr('src', '../../../../public/images/admin/one-bg.png')
                    break;
                case '1':
                    $('.ordered').hide()
                    $(".status").html('已接单')
                    $('.bg-pic').find('img').eq(1).attr('src', '../../../../public/images/admin/two-bg.png')
                    break;
                case  '2':
                    // $(".serving").hide()
                    // $(".served").css('visibility','hidden')
                    $(".status").html('服务中')
                    $('.bg-pic').find('img').eq(2).attr('src', '../../../../public/images/admin/three-bg.png')
					if (data.isAppraise == 0) {
					    $('.Appraise').show()
					    $('.Appraised').hide()
					}
                    break;
                case '3':
                    $(".status").html('服务结束')
                    $('.bg-pic').find('img').eq(3).attr('src', '../../../../public/images/admin/four-bg.png')
                    if (data.isAppraise == 0) {
                        $('.Appraise').show()
                        $('.Appraised').hide()
                    }
            }
            $('.orderDetailId').html(data.id)

            if (data.createTime) {
                var cancelTime = data.createTime.split(' ')[0].split('-')
                var str = cancelTime[0] + '年' + cancelTime[1] + '月' + cancelTime[2] + '日'
                $('.orderDetailTime').html(str + ' ' + data.createTime.split(' ')[1])
            }
            if (data.serviceProType == '0') {
                $('.serviceProType').html('计时服务')
                $('.serviceType').html('计时服务')
                $('.serviceProTime').html(data.serviceProTime + '小时')
            } else if (data.serviceProType == '1') {
                $('.serviceProType').html('计次服务')
                $('.serviceType').html('计次服务')
                $('.serviceProTime').html(data.serviceProTime + '次')
            } else if (data.serviceProType == '2') {
                $('.serviceProType').html('单价服务')
                $('.serviceType').html(data.unit )
                $('.serviceProTime').html(data.num)
                $(".w16").each(function(){
                    $(this).removeClass("layui-col-xs").addClass("layui-col-xss")
                });
                $('.total-money').css('display','block');
                $('.totalMoney').html('￥' +  Number(changeMoney(data.totalMoney)).toFixed(2))

            }
            $('.orderAddress').html(data.areaName + data.streetName + data.communityName +data.address)
            $('.info').html(data.manPhone+ ' ' +data.manName)
            $('.storeName').html(data.providerName)
            $('.storePhone').html(data.providerPhone)
            $('.yyTime').html(data.openTime)

            $('.storeAddress').html(data.providerAddress)
            $('.serviceName').html(data.employName)
            $('.servicePhone').html(data.employPhone)
            $('.serName').html(data.serviceProName)

            $('.serMoney').html('￥' +  Number(changeMoney(data.serviceProMoney)).toFixed(2))
          
            $('.serSc').html(data.serviceProTime)

            if (data.orderTime) {
                var cancelTime = data.orderTime.split(' ')[0].split('-')
                var str = cancelTime[0] + '年' + cancelTime[1] + '月' + cancelTime[2] + '日'
                $('.orderTime').html(str + ' ' + data.orderTime.split(' ')[1])
            }

            if (data.startTime) {
                var cancelTime = data.startTime.split(' ')[0].split('-')
                var str = cancelTime[0] + '年' + cancelTime[1] + '月' + cancelTime[2] + '日'
                $('.startTime').html(str + ' ' + data.startTime.split(' ')[1])
            }

            if (data.endTime) {
                var cancelTime = data.endTime.split(' ')[0].split('-')
                var str = cancelTime[0] + '年' + cancelTime[1] + '月' + cancelTime[2] + '日'
                $('.endTime').html(str + ' ' + data.endTime.split(' ')[1])
            }
            $('.serCode').html(data.startCode)
            $('.remark').html(data.remark)
            if (data.appraiseTime) {
                var cancelTime = data.appraiseTime.split(' ')[0].split('-')
                var str = cancelTime[0] + '年' + cancelTime[1] + '月' + cancelTime[2] + '日'
                $('.appraiseTime').html(str + ' ' + data.appraiseTime.split(' ')[1])
            }
            $('.appraiseMessage').html(data.appraiseMessage)
            $('.cancelReason').html(data.cancelReason)
            if (data.cancelTime) {
                var cancelTime = data.cancelTime.split(' ')[0].split('-')
                var str = cancelTime[0] + '年' + cancelTime[1] + '月' + cancelTime[2] + '日'
                $('.cancelTime').html(str + ' ' + data.cancelTime.split(' ')[1])
            }



            if (data.appraiseCode == '0') {
                $('.appraiseCode').html('满意')
            } else if (data.appraiseCode == '1') {
                $('.appraiseCode').html('一般')
            } else if (data.appraiseCode == '2') {
                $('.appraiseCode').html('不满意')
            }
            if (data.expectStartTime && data.expectEndTime) {
                var date = data.expectStartTime.split(' ')[0].split('-')
                var str = date[0] + '年' + date[1] + '月' + date[2] + '日'
                $('.serTime').html(str + ' ' + data.expectStartTime.split(' ')[1] + '-' +  data.expectEndTime.split(' ')[1])
            }

            var obj = {
                content: []
            }

            for (var i = 0; i < 9; i++) {
                if (data['img'+(i+1)]) {
                    data['img'+(i+1)] = request.imagesUrl + data['img'+(i+1)]
                    obj.content.push(data['img'+(i+1)])
                }
            }
            
            if (obj.content.length !== 0 || data.remark) {
                $(".b-right").show()
            }
            var Html = template("pic-cell", obj);
            $('.pic').html(Html)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}; 

var orderCancel = function (val) {
    console.log(val)
    request.url = request.Url + request.orderCancel
    request.method = "POST"

    request.data = JSON.stringify({
        id: GetQueryString('id'),
        cancelReason: val
    })
    request.token = {
        'Authorization': 'token ' + classModule.session().token,
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {
            layer.msg(data.msg);
           setTimeout(function () {
               window.location.reload()
           },1000)
        }
    }
    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}