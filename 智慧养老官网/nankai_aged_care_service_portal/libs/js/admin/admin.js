

// 实例化创建请求方式
var request = new Call_Request();

$(function () {
    // 实例化
    layui.use('element', function () {
        var element = layui.element;
        element.render();
    });

    var href = window.location.pathname.split('/');

    // // 如果当前用户瑞出登录或未登录状态需要返回首页
    // for (var i = 0; i < href.length; i++) {
    //     if (href[i] === 'admin.html' && classModule.session() === '') {
    //         window.location.href = '../../index.html'
    //     }
    // }

    // $(document).on('click', '.tree li', function (event) {
    //     console.log(event.target)
    //     $(event.target).parent().addClass('Color');
    //     $(event.target).parent().parent().siblings().children('li').removeClass('Color');
    //     $(event.target).parent().siblings().removeClass('Color');
    //
    //     var index = $(event.target).parent().attr('data-id');
    //
    //     $('.layui-nav li a').each(function (last, item) {
    //         if (item.getAttribute('data-id').split('-')[0] === index.split('-')[0]) {
    //             $(item).parent().addClass('layui-this');
    //             $(item).parent().siblings().removeClass('layui-this');
    //         }
    //     })
    //
    //     $("#iframe").attr("src", event.target.dataset.url);
    // })

    $(document).on('click', '.layui-nav li', function (event) {
        // console.log(event, "=============")
        // $("#title").html($(event.toElement.offsetParent).find('span').eq(0).html())

        $(this).addClass('layui-nav-itemed');
        $(this).siblings().removeClass('layui-nav-itemed');
        $(this).parent().siblings().children().removeClass('layui-nav-itemed');

        if (this.dataset.url == 'account/account.html?level=' || this.dataset.url == 'userInfo/userInfo.html?level=0') {
            // $("#iframe").css('min-height', '600px')
        } else {
            // $("#iframe").css('min-height', '1800px')
            findOrderNumByMan()
        }

        $("#iframe").attr("src", this.dataset.url);
    })

    if (sessionStorage.getItem('user') === '1') {
        $('.second li').eq(1).addClass('layui-nav-itemed');
        $('.second li').eq(1).siblings().removeClass('layui-nav-itemed');
        $('.second li').eq(1).parent().siblings().children().removeClass('layui-nav-itemed');
        $("#iframe").attr("src", 'userInfo/userInfo.html?level=0');
        // $("#iframe").css('min-height', '600px');
    }
    GeneralPart(1);
    getUserInfo()
})

var findOrderNumByMan = function (val) {
    request.url = request.Url + request.findOrderNumByMan
    request.method = "get"

    request.data = {
        startTime: typeof (val) == 'string' ? val : MonthBefor(),
        endTime: CurrentTime(),
    }

    request.token = {
        'Authorization': 'token ' + classModule.session().token,
    }

    request.redata = function (data) {
        data.data.forEach(function (item) {
            switch (item.state) {
                case '0':
                    $(".zero").html(item.num)
                case '1':
                    $(".one").html(item.num)
                case '2':
                    $(".two").html(item.num)
                case '3':
                    $(".three").html(item.num)
            }
        })
    }
    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

addLoadEvent(findOrderNumByMan)

// // 获取当前用户个人基本信息
// var GetUesradmin = function () {
//     request.url = request.Url + request.admin
//     request.method = "GET"

//     request.data = {
//        id: classModule.session().id
//     }

//     request.redata = function (data) {
//         if (data.code === 0 ) {
//             layer.msg(data.msg);
//         } else {
//             $.cookie('accessToken', data.data.accessToken)

//             data.data.imagesUrl = request.imagesUrl

//             var Html = template("user-cell", data.data);
//             $('.adminlogo').html(Html)
//         }
//     }

//     request.reinfo = function (xhr) {
//         console.log(xhr);
//     }
//     request.run();
// }; 
// addLoadEvent(GetUesradmin);

var getUserInfo = function () {
    request.url = request.Url + request.getCurrentAppUser
    request.method = "GET"

    request.data = {}
    request.token = {
        'Authorization': 'token ' + classModule.session().token,
    }

    request.redata = function (data) {
        if (data.code === 0) {
            layer.msg(data.msg);
        } else {
            if (data.data.isPerfect == '0') {
                $("#isPerfect").html('未完善')
            } else if (data.data.isPerfect == '1') {
                $("#isPerfect").html('已完善')
            } else {
                $("#isPerfect").html('')
            }
        }
    }
    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

// 自适应子框架页面高度
function iframeHeight(WightHeight) {
    document.getElementById("nav_main").style.height = WightHeight + "px";
}
