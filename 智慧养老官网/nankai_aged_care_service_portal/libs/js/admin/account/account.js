/**
 * Created by lenovo on 2020/5/7.
 */

var request = new Call_Request();

var classModul = {}

$(function () {
    var url = request.Url + request.upload
    layui.use('upload', function () {
        var upload = layui.upload;
        upload.render({
            elem: '#upload',
            url: url,
            accept: 'image',
            acceptMime: 'image/*',
            before: function (obj) {
                layer.load();
                layer.closeAll('loading');
            },
            done: function (res, index, upload) {
                if (res.code == 1) {
                    // layer.msg(res.msg);
                    $('img').attr('src', request.imagesUrl + res.data.filePath)
                    classModul.icon = res.data.filePath
                    updateInfo()
                } else {
                    layer.msg(res.msg);
                }
            },
            error: function (index, upload) {
                // layer.msg('上传失败');
                layer.closeAll('loading'); //关闭loading
            }
        })
    })

    $(document).on('click', '#changePwd', function (event) {
        layui.use(['form', 'layer', 'laydate'], function () {
            var form = layui.form;
            var layer = layui.layer;
            form.render()
            layer.open({
                type: 1
                , title: '修改密码' //不显示标题栏
                , closeBtn: '2',
                offset: ['260px', '245px']
                , area: ['500px', '300px']
                , shade: 0.5
                , id: 'LAY_layui' //设定一个id，防止重复弹出
                , btn: ['确认修改', '取消']
                , btnAlign: 'c'
                , moveType: 1 //拖拽模式，0或者1
                , content: '<form class="layui-form" action="" id="Form">' +
                    ' <div class="layui-form-item">' +
                    ' <label class="layui-form-label">旧密码<b>*</b></label>' +
                    ' <div class="layui-input-block">' +
                    '<input name="oldPwd" id="oldPwd" type="password" required lay-verType="tips" lay-verify="password" placeholder="请输入旧密码" autocomplete="off" class="layui-input">' +
                    ' </div>' +
                    ' </div>' +
                    ' <div class="layui-form-item">' +
                    ' <label class="layui-form-label">新密码<b>*</b></label>' +
                    ' <div class="layui-input-block">' +
                    '<input name="newPwd" id="newPwd" type="password" required lay-verType="tips" lay-verify="password" placeholder="请输入新密码" autocomplete="off" class="layui-input">' +
                    ' </div>' +
                    ' </div>' +
                    ' <div class="layui-form-item">' +
                    ' <label class="layui-form-label">确认密码<b>*</b></label>' +
                    ' <div class="layui-input-block">' +
                    '<input name="conPwd" id="conPwd" type="password" required lay-verType="tips" lay-verify="password" placeholder="请输入确认密码" autocomplete="off" class="layui-input">' +
                    ' </div>' +
                    ' </div>' +
                    '</form>'
                // ,shade: 1 //不显示遮罩
                , yes: function () {
                    var reg = /^[\S]+$/
                    if (!$("#oldPwd").val()) {
                        layer.msg('请输入旧密码');
                        return false
                    }

                    if (!reg.test($("#oldPwd").val())) {
                        layer.msg('密码不能出现空格或汉字');
                        return false
                    }

                    if (!$("#newPwd").val()) {
                        layer.msg('请输入新密码');
                        return false
                    }

                    if (!reg.test($("#newPwd").val())) {
                        layer.msg('密码不能出现空格或汉字');
                        return false
                    }

                    if (!$("#conPwd").val()) {
                        layer.msg('请输入确认密码');
                        return false
                    }

                    if (!reg.test($("#conPwd").val())) {
                        layer.msg('密码不能出现空格或汉字');
                        return false
                    }

                    if ($("#newPwd").val() !== $("#conPwd").val()) {
                        layer.msg('两次密码不一致');
                        return false
                    }
                    request.url = request.Url + request.updatePassword
                    request.method = "PUT"

                    request.data = JSON.stringify({
                        oldPassword: hex_md5($("#oldPwd").val()),
                        newPassword: hex_md5($("#newPwd").val())
                    })
                    request.token = {
                        'Authorization': 'token ' + classModule.session().token,
                    }

                    request.redata = function (data) {
                        if (data.code === 0) {
                            layer.msg("原密码输入错误");
                        } else {
                            layer.msg("修改成功");
                            $.cookie('session', JSON.stringify({ name: undefined }), {
                                path: '/',
                            })
                            setTimeout(function () {
                                parent.location.href = '../../login/login.html'
                            }, 1000)
                        }
                    }

                    request.reinfo = function (xhr) {
                        console.log(xhr);
                    }
                    request.run();

                }
            });
        })
    })
})

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
            if (data.data.icon) {
                $('img').attr('src', request.imagesUrl + data.data.icon)
            }
            $("#idcard").html(data.data.idCard)
            $("#phone").html(data.data.phone)
            classModul = data.data
        }
    }
    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

addLoadEvent(getUserInfo)

var updateInfo = function () {
    request.url = request.Url + request.update
    request.method = "PUT"
    request.data = JSON.stringify(classModul)

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
}