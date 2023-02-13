/**
 * author: 关宁
 * date: 2019.05.09
 */

// 实例化创建请求方式
var request = new Call_Request();

var species = ['新闻通知', '政策法规', '养生常识', '优秀案例'];
var Move = GetQueryString('id')

$(function () {
    // 实例化
    layui.use('element', function(){
        var element = layui.element;    
    });

    // 创建导航栏模块
    // var dataStream = {
    //     array: [{
    //         city: '',
    //         this: '',
    //         title: '首页',
    //         url: '../policy.html?level=' + window.btoa('Secondlevel')
    //     },
    //     {
    //         city: 'zxzc',
    //         this: '',
    //         title: '最新政策',
    //         url: 'subColumn.html?move=' + window.btoa('zxzc') + '&id=' + window.btoa(iD.policy().column.new) + '&level=' + window.btoa('Levelthree')
    //     },
    //     {
    //         city: 'gjzc',
    //         this: '',
    //         title: '国家政策',
    //         url: 'subColumn.html?move=' + window.btoa('gjzc') + '&id=' + window.btoa(iD.policy().column.guojia) + '&level=' + window.btoa('Levelthree')
    //     },
    //     {
    //         city: 'sszc',
    //         this: '',
    //         title: '省市政策',
    //         url: 'subColumn.html?move=' + window.btoa('sszc') + '&id=' + window.btoa(iD.policy().column.shengshi) + '&level=' + window.btoa('Levelthree')
    //     },
    //     {
    //         city: 'zcjd',
    //         this: '',
    //         title: '政策解读',
    //         url: 'subColumn.html?move=' + window.btoa('zcjd') + '&id=' + window.btoa(iD.policy().column.jiedu) + '&level=' + window.btoa('Levelthree')
    //     }]
    // }

    // 遍历当前导航数据 输出当前样式
    // dataStream.array.forEach(element => {
    //     if (Move === element.city) {
    //         element.url = 'javascript:;';
    //         element.this = 'layui-this';
    //     }
    // })

    // 为页面模板赋值导航数据
    // var Navigation = template('nav-cell', dataStream)
    // $('.layui-nav').html(Navigation)

    // var Title = document.getElementById('species');
    switch (Move) {
        case 'xwtz' :
            $('.layui-nav li').eq(4).addClass('layui-selete')
            // Title.innerHTML = species[0];
            break;
        case 'zcfg' :
            $('.layui-nav li').eq(5).addClass('layui-selete')
            // Title.innerHTML = species[1];
            break;
        case 'yscs' :
            $('.layui-nav li').eq(6).addClass('layui-selete')
            // Title.innerHTML = species[2];
            break;
        default:
            $('.layui-nav li').eq(7).addClass('layui-selete')
            // Title.innerHTML = species[3];
            break;
    }

    GetMaiaContent(1, 10);
    GeneralPart(1);
})


// 获取主列表模块数据
var GetMaiaContent = function (page, size) {
    request.url = request.Url + request.art
    request.method = "GET"

    request.data = {
        size: size,
        page: page,
        categoryId: Move
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            $('.list-loading').css('display', 'none');

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
                            $('.main_list_left').html('<div data-loader="circle" class="loading list-loading"></div>');
                            GetMaiaContent(obj.curr, obj.limit);
                        }
                    }
                })
            })

            data.data.content.forEach(element => {
                element.HttpUrl = '../article/article.html?move=' +  element.id + '&type=' + Move;
            })

            var list = template('list-cell', data.data);
            $('.main_list_left').html(list);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
}

// 获取热门政策模块数据
var GetHotPolicy = function () {
    request.url = request.Url + request.recommend
    request.method = "GET"

    request.data = {
        size: 10,
        page: 1,
        // recommendId: iD.Module().HotID
    }

    request.redata = function (data) {
        if (data.code === 0 ) {
            layer.msg(data.msg); 
        } else {
            $('.hot-loading').css('display', 'none');
            
            // data.data.content.map(function () {
            //     if (item.url.substr(0,5).toLowerCase() !== 'https' && item.url.substr(0,5).toLowerCase() !== 'http:') {
                   // item.url = '../article/article.html?move=' + window.btoa(Move) + '&id=' + window.btoa(item.url) + '&hot=' + window.btoa(iD.Module().HotID) + '&level=' + window.btoa('Levelthree');
            //     }
            // })

            // 为页面模板赋值热门政策数据
            var HotCell = template('hot-cell', data.data);
            $('.hot').html(HotCell);
        }
    }

    request.reinfo = function (xhr) {
        console.log(xhr);
    }
    request.run();
};

addLoadEvent(GetHotPolicy);
