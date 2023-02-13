/**
 * author: 关宁
 * date: 2019.04.30
 */

// 实例化创建请求方式
var request = new Call_Request();

var first = true

// 初始化坐标索引值
var Index = null;

$(function (){
    layui.config({
        base: '../../../../plugin/layui/',
        version: '1.0'
    });
    sessionStorage.setItem("user","0")
    layui.use('form', function(){
        // 创建表单实例
        var form = layui.form
        form.render()
        // 添加自定义表单验证
        form.verify({
            name: function (value, item) {
                if(value === ''){
                    return '请输入姓名';
                }
            },
            street: function (value, item) {
                if(value === ''){
                    return '请选择街道';
                }
            },
            community: function (value, item) {
                if(value === ''){
                    return '请选择社区';
                }
            },
            address: function (value, item) {
                if(value === ''){
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
                communityName: communityName,
                areaName: '天津市 南开区',
                areaId: ''
            })

            request.token = {
                'Authorization': 'token ' + classModule.session().token,
            }
            request.redata = function (data) {
                if (data.code === 0) {
                    layer.msg(data.msg);
                } else {
                    // layer.closeAll();
                    layer.msg(data.msg);
                    var obj = classModule.session()
                    obj.name = date.field.name
                    $.cookie('session', JSON.stringify(obj), {
                        path:'/',
                    })
                    setTimeout(function () {
                        parent.location.reload();
                    },1000)
                }
            }
            request.reinfo = function (xhr) {
                console.log(xhr);
            }

            request.run();
        });
    });
    GeneralPart(1);
})



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
                $('select[name=province]').append('<option label='+ item.name+' value='+ item.id +'>' + item.name + '</option>')
            })
            
            layui.use('form', function(){
                // 创建表单实例
                var form = layui.form
                form.on('select(province1)', function(data){
                    if (!first) {
                        getCommunity(data.value)
                    }
                });
                form.render('select')
            });
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
addLoadEvent(getStreet)

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
                $('select[name=prcityovince]').append('<option class="item" label='+ item.name+' value='+ item.id +'>' + item.name + '</option>')
            })
            layui.use('form', function(){
                // 创建表单实例
                var form = layui.form
                form.render('select')
            });
            if (first) {
                getUserInfo()
            }
        }
    }
    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

addLoadEvent(getCommunity)

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
            $('input[name=name]').val(data.data.name)
            $('textarea[name=address]').val(data.data.address)
            if (data.data.streetId) {
                $('select[name=province]').next().find('input').click();
                $('select[name=province]').next().find('dd[lay-value=' + data.data.streetId + ']').click();
                setTimeout(function () {
                    $('select[name=prcityovince]').next().find('input').click();
                    $('select[name=prcityovince]').next().find('dd[lay-value=' + data.data.communityId + ']').click();
                    first = false
                }, 20)
            } else {
                first = false
            }
        }
    }
    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}
