/**
 * author: 关宁
 * date: 2019.04.30
 */

// 实例化创建请求方式
var request = new Call_Request();

// 初始化坐标索引值 
var Index = null;

$(function () {

    layui.use('form', function () {
        // 创建表单实例
        var form = layui.form
        form.render()

        // 添加自定义表单验证
        form.verify({
            loginPhone: function (value, item) {
                if (value === '') {
                    return '手机号或身份证号不能为空'
                }
                var loginReg = /^[1][3,4,5,7,8][0-9]{9}$/;
                var idCardReg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
                if (!loginReg.test(value) && !idCardReg.test(value)) {
                    return '请输入正确的手机号或身份证号'
                }
            },

            // 数组的两个值分别代表：[正则匹配、匹配不符时的提示文字

            password: function (value, item) {
                if (value === '') {
                    return '密码不能为空'
                }
                var pwdReg = /^[a-zA-z0-9]/;
                if (!pwdReg.test(value)) {
                    return '密码不能出现空格或汉字'
                }
            },

            // 自定义注册表单验证
            registerPhone: function (value, item) {
                if (value === '') {
                    return '手机号不能为空'
                }

                var loginReg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!loginReg.test(value)) {
                    return '请输入正确的手机号'
                }
            },

            registerName: function (value, item) {
                if (value === '') {
                    return '身份证号不能为空'
                }
                var idCardReg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
                if (!idCardReg.test(value)) {
                    return '请输入正确的身份证号'
                }
            },

            registerPassword: function (value, item) {
                if (value === '') {
                    return '密码不能为空'
                }
                var pwdReg = /^[a-zA-z0-9]/;
                if (!pwdReg.test(value)) {
                    return '密码不能出现空格或汉字'
                }
            },

            // 自定义忘记密码表单验证
            confirmPassWord: function (value, item) {
                if (value === '') {
                    return '确认密码不能为空'
                }
                var pwdReg = /^[a-zA-z0-9]/;
                if (!pwdReg.test(value)) {
                    return '密码不能出现空格或汉字'
                }
            },

            GetQcodePhone: function (value, item) {
                if (value === '') {
                    return '手机号不能为空'
                }

                var loginReg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!loginReg.test(value)) {
                    return '请输入正确的手机号'
                }
            },

            SubmitCode: function (value, item) {
                if (value === '') {
                    return '验证码不能为空'
                }
            },

            SubmitPassWord: function (value, item) {
                if (value === '') {
                    return '密码不能为空'
                }
                var pwdReg = /^[a-zA-z0-9]/;
                if (!pwdReg.test(value)) {
                    return '密码不能出现空格或汉字'
                }
            },
            SubmitP: function (value, item) {
                if (value === '') {
                    return '密码不能为空'
                }
                var pwdReg = /^[a-zA-z0-9]/;
                if (!pwdReg.test(value)) {
                    return '密码不能出现空格或汉字'
                }
            }
        });

        // 表单提交验证
        form.on('submit(SingIn)', function (date) {
            var loading = layer.load(2, {
                shade: [0.5, '#000']
            })
            SingInlogin(loading, date);
        });

        // 注册提交验证
        form.on('submit(Register)', function (data) {
            // if (data.field.confirmPassWord !== data.field.registerPassword) {
            //     layer.msg('两次密码不一致');
            //     return false
            // }

            var loading = layer.load(2, {
                shade: [0.5, '#000']
            })

            VerifyYourRegistr(loading, data);
        })

        // 提交忘记密码
        form.on('submit(Submit)', function (date) {
            // if (date.field.SubmitP !== date.field.SubmitPassWord) {
            //     layer.msg('两次密码不一致');
            //     return false
            // }

            var loading = layer.load(2, {
                shade: [0.5, '#000']
            })

            ForgotPassWord(loading, date);
        })
    });

    $(document).keydown(function (event) {
        // 敲击回车事件 触发登录按钮
        if (event.keyCode == 13) {
            if (Index === 0) {
                document.getElementById('login').click();
            }
        }
    });
    console.log(GetQueryString('returnUrl'))
    if (GetQueryString('type') === null) {
        Index = 0;
        $('.login').show();
    } else {
        Index = 1;
        $('.register').show();
    }

    if ($.cookie('TanSanUserPhone') && $.cookie('TanSanPassWord')) {
        $('.loginUser').val($.cookie('TanSanUserPhone'));
        $('.loginPassWord').val($.cookie('TanSanPassWord'));
    } else {
        $('.loginUser').val("");
        $('.loginPassWord').val("");
    }

    GeneralPart(1);
})


/**
 * 用户登录验证
 * @param {*} loading  加载效果
 * @param {*} date 表单信息 用户名 密码
 */

var SingInlogin = function (loading, date) {
    request.url = request.Url + request.SignIn
    request.method = "GET"

    request.data = {
        username: date.field.loginPhone,
        password: hex_md5(date.field.password),
        // type: '0'
    }

    request.redata = function (data) {
        console.log(data, "=============")
        if (data.code === 0) {
            // 如果登录失败 移除loading加载状态
            layer.close(loading);

            // 提示登录失败
            layer.msg(data.msg);
        } else {
            //如果不存在名称，返回的数据增加一个tel节点
            if (!data.data.name) {
                data.data.tel = date.field.loginPhone;
            }
            $.cookie('session', JSON.stringify(data.data), {
                path: '/',
            })
            // 如果勾选记住密码 保存当前账号 密码信息
            if ($('.CheckBox').is(':checked')) {
                $.cookie('TanSanUserPhone', date.field.loginPhone, {
                    path: '/',
                });

                $.cookie('TanSanPassWord', date.field.password, {
                    path: '/',
                });
            } else {
                // 否则移除当前Cookie信息
                $.cookie('TanSanUserPhone', "", {
                    path: '/',
                });

                $.cookie('TanSanPassWord', "", {
                    path: '/',
                });
            }
            if (GetQueryString('returnUrl')) {
                location.href = GetQueryString('returnUrl')
            } else {
                location.href = '../../index.html';
            }


            // var ferrer = document.referrer;
            // if ($.trim(ferrer) === "") {
            //     location.href = '../../index.html';
            // } else {
            //     // 登录后返回记录上级退出页面
            //     for (var i = 0; i < $.trim(ferrer).split('/').length; i++) {
            //         // 如果当前页面为个人中心则返回首页
            //         if ($.trim(ferrer).split('/')[i] === 'password.html') {
            //             location.href = '../../index.html';
            //         } else {
            //             location.href = ferrer;
            //         }
            //     }
            // }
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

/**
 * 注册认证
 * @param {*} element
 */

var VerifyYourRegistr = function (loading, data) {
    request.url = request.Url + request.register
    request.method = "POST"

    request.data = JSON.stringify({
        idCard: data.field.registerName,
        phone: data.field.GetQcodePhone,
        password: hex_md5(data.field.registerPassword),
        code: data.field.SubmitCode,
        source: 'web'
    })

    request.redata = function (data) {
        layer.close(loading);
        if (data.code === 0) {
            layer.msg(data.msg);
        } else {
            layer.msg(data.msg);
            $('.login').show();

            // 清空表单元素
            $('.register, .Forgot').hide();
            $("#SingInRegister")[0].reset();
        }
    }
    request.token = {
        'Authorization': 'token ' + classModule.session().token,
    }
    request.reinfo = function (xhr) {
        console.log(xhr);
    }

    request.run();
}

/**
 * 忘记密码
 * @param {*} element
 */

var ForgotPassWord = function (loading, date) {


    request.url = request.Url + request.forgetPwd
    request.method = "put"

    request.data = JSON.stringify({
        phone: date.field.GetQcodePhone,
        password: hex_md5(date.field.SubmitPassWord),
        code: date.field.SubmitCode,
        source: 'web'
    })

    request.redata = function (data) {
        layer.close(loading);

        if (data.code === 0) {
            layer.msg(data.msg);
        } else {
            layer.msg(data.msg);
            $('.login').show();

            // 清空表单元素
            $('.register, .Forgot').hide();
            $("#SubmitQCode")[0].reset();
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

// 获取验证码
var verificationCode = function (element, id) {
    var Countdown = 59;
    // 判断手机号码是否为空
    var loginReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!loginReg.test($('#' + id).val())) {
        layer.msg('请输入正确的手机号');
        return false;
    }
    if ($('#' + id).val() === '') {
        layer.msg('手机号不能为空');
        return false;
    }

    $(element).html("正在发送");

    request.url = request.Url + request.SmsSend
    request.method = "POST";

    var operation = "insert";
    if (id === "CodePhone") {
        operation = "forgetPwd";
    }
    request.data = JSON.stringify({
        operation: operation,
        phone: $('#' + id).val(),
        source: 'web'
    })

    $(element).attr('disabled', true);

    request.redata = function (data) {
        if (data.code === 0) {
            $(element).html("获取验证码");

            // 发送失败
            layer.msg(data.msg);
            $(element).attr('disabled', false);
        } else {
            layer.msg('验证码发送成功，请注意查收！')

            // 计时器验证码倒计时
            var timer = setInterval(function () {
                if (Countdown === 0) {

                    // 改变按钮状态
                    $(element).attr('disabled', false);
                    $(element).html("获取验证码");

                    // 清空计时器
                    clearInterval(timer)
                    return false
                } else {
                    $(element).html("重新发送(" + Countdown + ")");
                    Countdown--;
                }
            }, 1000);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}


// 切换显示登录注册模块
var Register = function (index) {
    var ObtainIndex = $(index).attr('data-id');

    // 取消关闭当前提示信息 
    layer.tips();

    // 根据当前索引值 切换显示内容
    if (ObtainIndex === '0') {
        Index = 1;

        $('.login, .Forgot').hide();
        $('.register').show();
    } else if (ObtainIndex === '1') {
        Index = 0;

        $('.register, .Forgot').hide();
        $('.login').show();
    } else {
        Index = 2;

        $('.login, .register').hide();
        $('.Forgot').show();
    }
}
