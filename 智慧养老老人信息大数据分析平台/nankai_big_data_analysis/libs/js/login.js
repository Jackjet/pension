layui.config({
    base: '../libs/js/'
}).use(['form', 'layer', 'common'], function () {
    var form = layui.form,
        common = layui.common,
        layer = layui.layer;
    common.getSystemTime()
    if ($.cookie('yangLaoUserName') && $.cookie('yangLaoPassWord')) {
        console.log(1)
        $('#CheckBox').attr('checked', true);
        $('input[name="username"]').val($.cookie('yangLaoUserName'));
        $('input[name="password"]').val($.cookie('yangLaoPassWord'));
        form.render('checkbox')
    }

    form.verify({
        username: function (value, item) {
            if (!value) {
                return '用户名不能为空';
            }
        },
        password: function (value, item) {
            if (!value) {
                return '密码不能为空';
            }
        }
    });
    var isLogin = true;
    form.on('submit(login)', function (data) {
        try {
            if (!isLogin) {
                return;
            }
            isLogin = false;
            var obj = {
                username: data.field.username,
                password: hex_md5(data.field.password)
            }
            common.ajaxMethod($.url.userlogin.login, obj, 'get', function (row) {
                if (row.code != "1") {
                    layer.msg(row.msg);
                    isLogin = true;
                    return false;
                }
                $.cookie('currentDataUser', JSON.stringify(row.data), {
                    path: '/',
                })
                if ($('#CheckBox').prop('checked')) {
                    $.cookie('yangLaoUserName', data.field.username, {
                        path: '/',
                    });

                    $.cookie('yangLaoPassWord', data.field.password, {
                        path: '/',
                    });
                } else {
                    // 否则移除当前Cookie信息
                    $.cookie('yangLaoUserName', '', {
                        path: '/',
                    });

                    $.cookie('yangLaoPassWord', '', {
                        path: '/',
                    });
                }
                window.location.href = 'index.html'
            })
        }
        catch (e) {
            isLogin = true;
            layer.msg('登录异常');
            console.log(e)
        }
        return false;
    });

})