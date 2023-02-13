/*
 * @Author: your name
 * @Date: 2020-05-12 19:59:05
 * @LastEditTime: 2020-05-15 16:16:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nankai_aged_care_service_portal\libs\js\service\service.js
 */

var request = new Call_Request();
var indexID = null;
$(function (){
    // 组件实例化
    layui.use('element', function(){
        var element = layui.element;
        element.render();
    });

    GeneralPart(1);
    GetMaiaContent(GetQueryString('id'))
    GetMaiaContentt(1,10,GetQueryString('id'))
})

// 获取服务商详情
var GetMaiaContent = function (id) {
    request.url = request.Url + request.providerDetail
    request.method = "GET"
    request.data = {
        id: id,
    }
    request.token = {
        'Authorization': 'token ' +  classModule.session().token   
    }
    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            console.log(data)
            if(data.data.logo === null || data.data.logo === ''){
               $(".pjImg").attr('src','../../../public/images/service.png');
            }else{
               $(".pjImg").attr('src',request.imagesUrl + data.data.logo);
            }
            $('.address').html(data.data.address)
            $('.phone').html(data.data.phone)
            $('.time').html('&nbsp;'+ data.data.openTime)
            $('.content').html(data.data.remark)
            $('.name').html(data.data.name)
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

// 获取评价列表
var GetMaiaContentt = function (page, size, id) {
    let idData = id
    request.url = request.Url + request.findAllEvaluateByProviderId
    request.method = "GET"
    
    request.data = {
        size: size,
        page: page,
        providerId: id,
        isAppraise: '1'
    }
    request.token = {
        'Authorization': 'token ' +  classModule.session().token   
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            // $('.list-loading').css('display', 'none');
            // 实例化分页模块
            layui.use('laypage', function(){
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
                    layout: ['count', 'prev', 'page', 'next','skip'],
                    jump: function(obj, first) {
                        // 避免首次执行 死循环
                        if (!first) {
                            // 创建loading 加载元素
                            $('.pj_list').html('<div data-loader="circle" class="loading list-loading"></div>');
                            GetMaiaContentt(obj.curr, obj.limit, idData);
                        }
                    }
                })
            })
            data.data.content.forEach(element => {
                if(element.icon === '' || element.icon === null || element.icon === undefined ){
                    element.icon = '../../../public/images/plogo.png';
                }else{
                    element.icon = request.imagesUrl +  element.icon;
                }
               
                switch(element.appraiseCode){
                    case '0': element.appraiseCode = '满意';  break;;
                    case '1': element.appraiseCode = '一般';   break;
                    case '2': element.appraiseCode = '不满意';   break;
                }
            })
            var list = template('list-cell', data.data);
            $('.pj_list').html(list);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}