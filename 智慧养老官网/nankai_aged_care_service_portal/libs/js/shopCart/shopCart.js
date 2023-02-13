/**
 * Created by lenovo on 2020/6/5.
 */
var request = new Call_Request();

var obj = {}

var ids = []

var total = 0

$(function () {
    layui.use('element', function(){
        var element = layui.element;
        element.render()
    });

    layui.use('form', function() {
        var form = layui.form;
        form.render();

        form.on('checkbox(all)', function (data) {
            if (data.elem.checked) {
                form.val("item", {
                    "like[write]": true
                });
                form.val("all1", {
                    "like[write]": true
                });
                ids = []
                obj.content.forEach(function (item) {
                    ids.push(item.id)
                    if (item.expectTimeStart && item.expectTimeEnd) {
                        var days = DateDifference(item.expectTimeStart, item.expectTimeEnd)
                    } else {
                        var days = 1
                    }
                    if (item.serviceProType == '2') {
                        total += item.money * Number(days) * item.num
                    } else {
                        total += item.money * Number(days)
                    }
                })
                $(".total").html('￥' + total.toFixed(2))

            } else {
                form.val("item", {
                    "like[write]": false
                });
                form.val("all1", {
                    "like[write]": false
                });

                ids = []
                total = 0
                $(".total").html('￥' + total.toFixed(2))
            }
        })

        form.on('checkbox(all1)', function (data) {
            if (data.elem.checked) {
                form.val("item", {
                    "like[write]": true
                });
                form.val("all", {
                    "like[write]": true
                });

                ids = []
                obj.content.forEach(function (item) {
                    ids.push(item.id)
                    if (item.expectTimeStart && item.expectTimeEnd) {
                        var days = DateDifference(item.expectTimeStart, item.expectTimeEnd)
                    } else {
                        var days = 1
                    }
                    if (item.serviceProType == '2') {
                        total += item.money * Number(days) * item.num
                    } else {
                        total += item.money * Number(days)
                    }
                })
                $(".total").html('￥' + total.toFixed(2))

            } else {
                form.val("item", {
                    "like[write]": false
                });
                form.val("all", {
                    "like[write]": false
                });
                ids = []
                total = 0
                $(".total").html('￥' + total.toFixed(2))
            }
        })

        form.on('checkbox(item)', function (data) {
            if (data.elem.checked) {
                ids.push(data.value)
                obj.content.forEach(function (item) {
                    if (item.id == data.value) {
                        if (item.expectTimeStart && item.expectTimeEnd) {
                            var days = DateDifference(item.expectTimeStart, item.expectTimeEnd)
                        } else {
                            var days = 1
                        }
                        if (item.serviceProType == '2') {
                            total += item.money * Number(days) * item.num
                            $(".total").html('￥' + total.toFixed(2))
                        } else {
                            total += item.money * Number(days)
                            $(".total").html('￥' + total.toFixed(2))
                        }
                    }
                })
            } else {
                var index = ''
                ids.forEach(function (item, i) {
                    if (item == data.value) {
                        index = i
                    }
                })
                ids.splice(index, 1)
                obj.content.forEach(function (item) {
                    if (item.id == data.value) {
                        if (item.expectTimeStart && item.expectTimeEnd) {
                            var days = DateDifference(item.expectTimeStart, item.expectTimeEnd)
                        } else {
                            var days = 1
                        }
                        if (item.serviceProType == '2') {
                            total -= item.money * Number(days) * item.num
                            $(".total").html('￥' + total.toFixed(2))
                        } else {
                            total -=item.money * Number(days)
                            $(".total").html('￥' + total.toFixed(2))
                        }
                    }
                })

            }
        })
    })

    $(document).on('click', '#cancel', function (event) {
        layer.confirm('您确定要删除吗？', {
            btn: ['确定', '取消'], //可以无限个按钮
            title:'删除'
        }, function(index, layero){
           deleteshopCart(event.target.getAttribute('data-id'))
        }, function(index){
           
        });
    })

    $(document).on('click', '#clean', function (event) {
        if (ids.length == 0) {
            layer.msg('请先选择商品');
            return false
        }
        layer.confirm('您确定要清理购物车吗？', {
            btn: ['确定', '取消'] //可以无限个按钮
        }, function(index, layero){
            deleteshopCart()
        }, function(index){

        });
    })

    $(document).on('click', '.reserve', function (event) {
        if (ids.length == 0) {
            layer.msg('请先选择商品');
            return false
        }
        getInfore()
        
    })

    // $(document).on('click', '.serviceName', function (event) {
    //    window.location.href ='../planOrder/planOrder.html?Id=' + event.target.getAttribute('data-id')
    // })

    GeneralPart(1);
    
    if(classModule.session().token === '' || classModule.session().token === null || classModule.session().token === undefined){
        window.location.href = "../../../view/page/login/login.html"
        return false;
    }

    getOrderAdmin(1, 100);
})

var getOrderAdmin = function (page, size) {
    request.url = request.Url + request.shopCart
    request.method = "GET"

    request.data = {
        page: page,
        size: size
    }
    request.token = {
        'Authorization': 'token ' + classModule.session().token,
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {

            for (var i = 0; i < data.data.length; i++) {
                data.data[i].money = changeMoney(data.data[i].money)
                if (data.data[i].expectTimeStart && data.data[i].expectTimeEnd) {
                    if (data.data[i].expectTimeStart == data.data[i].expectTimeEnd) {
                        var date = data.data[i].expectTimeEnd.split('-')
                        var str = date[0] + '年' + date[1] + '月' + date[2] + '日'
                        data.data[i].expectTime1 = str + '  ' + data.data[i].expectTime
                    } else {
                        var date1 = data.data[i].expectTimeStart.split('-')
                        var date2 = data.data[i].expectTimeEnd.split('-')
                        var str1 = date1[0] + '年' + date1[1] + '月' + date1[2] + '日'
                        var str2 = date2[0] + '年' + date2[1] + '月' + date2[2] + '日'

                        data.data[i].expectTime1 = str1 + '-' + str2 + '  ' + data.data[i].expectTime
                    }

                }

            }

            data.data.forEach(function (item) {
                item.money =  Number(item.money).toFixed(2) 
            })
            

           obj.content = data.data
            var Html = template("order-cell", obj);
            $('.order').html(Html)
            
            layui.use('form', function() {
                var form = layui.form;
                form.render();
            })
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
};

var deleteshopCart = function (id) {
    request.url = request.Url + request.shopCartDelete
    request.method = "POST"

    if (id) {
       var idArr = []
        idArr.push(id)
    }
    request.data =JSON.stringify({
        ids: idArr || ids
    })
    request.token = {
        'Authorization': 'token ' + classModule.session().token,
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {
            layer.msg(data.msg);
            setTimeout(function(){
                window.location.reload()
            }, 1000);

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

var order = function () {
    request.url = request.Url + request.shopCartiInsertOrder
    request.method = "POST"

    request.data = JSON.stringify({
        ids: ids,
        orderWay: '2',
    })
    request.token = {
        'Authorization': 'token ' + classModule.session().token,
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {
            layer.msg(data.msg);

            setTimeout(function(){
                window.location.reload()
            }, 1000);

        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

// 获取个人信息
var getInfore = function () {
    request.url = request.Url + request.getCurrentAppUser
    request.method = "GET"
    request.data = {

    }
    request.token = {
        'Authorization': 'token ' +  classModule.session().token
    }
    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg);
        } else {
            if (data.data.isPerfect === '0') {
                window.sessionStorage.setItem('user','1')
                window.location.href = '../../../view/page/admin/admin.html'
            } else {
                order()
            }
           
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();

};