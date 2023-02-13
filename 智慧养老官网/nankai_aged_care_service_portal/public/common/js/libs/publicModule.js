/**
 * Created by 关宁 on 2019.05.08
 */

var templates = (function () {
    return {
        header: function (UserInfo, Index) {
            // 当前用户信息
            var USERNAME = "";
            //如果不存在名称，读取tel手机号码节点
            if (!UserInfo.session().name) {
                USERNAME = UserInfo.session().tel;
            } else {
                USERNAME = UserInfo.session().name;
            }
            // 城市地区相对路径
            var CITYUSERURLPATH;
            // 图片加载物理路径
            var HEADERIMAGES; var RETURNINDEX;

            // 根据索引值判断当前跳转对应UTL
            if (Index === 0) {
                CITYUSERURLPATH = 'page';
                HEADERIMAGES = '..';
                RETURNINDEX = '.'
            } else if (Index === 1) {
                CITYUSERURLPATH = '..';
                HEADERIMAGES = '../../..';
                RETURNINDEX = '../..'
            } else {
                CITYUSERURLPATH = '../..';
                HEADERIMAGES = '../../../..';
                RETURNINDEX = '../../..'
            }

            var exit = 'block';
            var UserName = 'none'
            var hide = 'inline-block';

            if (USERNAME === undefined) {
                UserName = 'block';
                exit = 'none';
            }

            var url_str = window.location.href
            var arr = url_str.split('=')[0]
            var str = arr.split('?')[1]

            if (str == 'city') {
                hide = 'none';
            }

            return '\
                <div class="layui-row layui_header_title">\
                    <div class="layui-main1 " style="background: #f1f1f1; height: 100%;">\
                        <div class="layui-col-xs6">\
                            <div class="layui-text">\
                                您好！欢迎来到天津市南开区智慧养老服务平台\
                            </div>\
                        </div>\
                        <div class="layui-col-xs6 layui_right" style="display: '+ hide + ';">\
                            <div class="layui-text Cluster">\
                                客服电话：<span style="color: #f47f3d">（022)83558800 </span>\
                        </div>\
                    </div>\
                </div>\
            </div>\
            <div  style="background:url('+ HEADERIMAGES + '/public/images/bg.png); height: 120px;">\
            <div class="layui-main1">\
                <div class="layui-col-xs3" style="padding-top:18px;">\
                    <a href="' + RETURNINDEX + '/index.html" class="UrlBootom"></a>\
                    <img class="logo" style="cursor: pointer;" src="'+ HEADERIMAGES + '/public/images/name.png"/>\
                    <img class="logo" style="cursor: pointer;" src="'+ HEADERIMAGES + '/public/images/zim.png"/>\
                </div>\
                <div class="layui-col-xs5" style="padding-left:15px;">\
                    <img class="header_Code"  src="'+ HEADERIMAGES + '/public/images/logn_shan.jpg"/>\
                </div>\
                <div class="layui-col-xs4 " style="padding-top:49px;">\
                    <div class="layui-text text_right" style="display: '+ UserName + ';">\
                         <a class="font_color" href="' + RETURNINDEX + '/page/login/login.html">立即登录 |</a>\
                         <a class="font_color" href="' + RETURNINDEX + '/page/login/login.html?type=1">立即注册 |</a>\
                         <a class="font_color" href="http://106.3.96.60/nankai/providerservice/index.html#/login">商户入驻</a>\
                    </div>\
                   <div class="layui-text text_right" style="display: '+ exit + ';">\
                         <a class="font_color" id="user"  href="' + RETURNINDEX + '/page/admin/admin.html">' + USERNAME + ' |</a>\
                         <a class="font_color" href="' + RETURNINDEX + '/page/admin/admin.html">我的订单 |</a>\
                         <a class="font_color" href="' + RETURNINDEX + '/page/shopCart/shopCart.html">我的购物车 |</a>\
                         <a class="font_color"id="exit" href="' + RETURNINDEX + '/page/login/login.html">退出</a>\
                    </div>\
                </div>\
              </div>\
            </div>'
        },

        footer: function (Index) {
            var TABINDEX;
            var img1 = "";
            var img2 = "";
            var img3 = "";
            var img4 = "";
            var img5 = "";
            var img6 = "";
            if (Index === 0) {
                TABINDEX = 'page'
                img1 = "../public/images/apple.png";
                img2 = "../public/images/ios.jpg";
                img3 = "../public/images/zihuifuwu.png";
                img4 = "../public/images/guohui.png";
                img5 = "../public/images/W020201221406919844563.png";
                img6 = "../public/images/red.png";

            } else if (Index === 1) {
                TABINDEX = '..'
                img1 = "../../../public/images/apple.png";
                img2 = "../../../public/images/ios.jpg";
                img3 = "../../../public/images/zihuifuwu.png";
                img4 = "../../../public/images/guohui.png";
                img5 = "../../../public/images/W020201221406919844563.png";
                img6 = "../../../public/images/red.png";
            } else if (Index === 2) {
                TABINDEX = '../..'
                img1 = "../../../../public/images/apple.png";
                img2 = "../../../../public/images/ios.jpg";
                img3 = "../../../../public/images/zihuifuwu.png";
                img4 = "../../../../public/images/guohui.png";
                img5 = "../../../../public/images/W020201221406919844563.png";
                img6 = "../../../../public/images/red.png";
            }

            // return '<div class="layui-col-xs12 footer_bg">\
            //     <div class="layui-main1">\
            //         <div class="layui-col-xs2" style="width: 13%;">\
            //             <div class="layui-title">\
            //                 快速导航\
            //             </div>\
            //             <div class="layui-col-xs12 footer_list">\
            //                 <a href="'+ TABINDEX + '/about/about.html?index=0">关于我们</a>\
            //             </div>\
            //             <div class="layui-col-xs12 footer_list">\
            //                 <a href="'+ TABINDEX + '/about/about.html?index=1">法律责任</a>\
            //             </div>\
            //             <div class="layui-col-xs12 footer_list">\
            //                 <a href="'+ TABINDEX + '/about/about.html?index=2">隐私保护</a>\
            //             </div>\
            //         </div>\
            //         <div class="layui-col-xs2">\
            //             <div class="layui-title">\
            //                 友情链接\
            //             </div>\
            //             <div class="layui-col-xs12 footer_list">\
            //                 <a href="'+ TABINDEX + '/about/about.html?index=0">天津市共享交换平台</a>\
            //             </div>\
            //             <div class="layui-col-xs12 footer_list">\
            //                 <a href="'+ TABINDEX + '/about/about.html?index=1">综合管理服务平台</a>\
            //             </div>\
            //             <div class="layui-col-xs12 footer_list">\
            //                 <a href="'+ TABINDEX + '/about/about.html?index=2">养老服务信息平台</a>\
            //             </div>\
            //         </div>\
            //         <div class="layui-col-xs2" style="width: 12%;">\
            //             <div class="layui-title">\
            //                 建设单位\
            //             </div>\
            //             <div class="layui-col-xs12 footer_list">\
            //                 天津市南开区民政局\
            //             </div>\
            //        </div>\
            //         <div class="layui-col-xs2">\
            //             <div class="layui-title">\
            //                 联系我们\
            //             </div>\
            //             <div class="layui-col-xs12 footer_list">\
            //                 电子邮箱：nkzf@qq.com\
            //             </div>\
            //         </div>\
            //         <div class="layui-col-xs4" style="width: 40%;">\
            //             <div class="layui-col-xs10 footer_list" style="width: 64%;margin-top: 30px">\
            //               <div class="code"><img class="code_img"  src="' + img1 + '"/><p class="code_p">老人端app</p></div>\
            //               \<div class="code"><img  class="code_img"  src="' + img2 + '"/><p class="code_p">服务端app</p></div>\
            //               <div class="code"><img class="code_img"   src="' + img3 + '"/><p class="code_p">监管端app</p></div>\ \
            //             </div>\
            //              <div class="layui-col-xs2 footer_list" style="margin-top: 54px;width: 36%;">\
            //                客服电话：12359\
            //             </div>\
            //         </div>\
            //     </div>\
            //     <div class="footer_bottom" style="border-top: 1px solid #CCCCCC;width: 90%;margin: 15px auto">\
            //         <div class="layui-main" style="text-align: center">\
            //             <div class="layui-col-xs6 footer_text" style="text-align: right">\
            //                 Copyright（c）2017-2017 www.smehn.cn\
            //             </div>\
            //             <div class="layui-col-xs6 footer_text1" style="text-align: left;padding-left: 40px;">\
            //                 证书编码：冀ICP备17014842号\
            //             </div>\
            //         </div>\
            //     </div>\
            // </div>';
            return '<div class="layui-col-xs12 footer_bg">\
                <div class="layui-main1">\
                    <div class="layui-col-xs1">\
                        <div class="layui-title">\
                            快速导航\
                        </div>\
                        <div class="layui-col-xs12 footer_list">\
                            <a href="http://106.3.96.60/nankai/service_portal/view/page/fastNav/aboutUs.html">关于我们</a>\
                        </div>\
                        <div class="layui-col-xs12 footer_list">\
                            <a href="http://106.3.96.60/nankai/service_portal/view/page/fastNav/legalResponsibility.html">法律责任</a>\
                        </div>\
                        <div class="layui-col-xs12 footer_list">\
                            <a href="http://106.3.96.60/nankai/service_portal/view/page/fastNav/privacy.html">隐私保护</a>\
                        </div>\
                    </div>\
                    <div class="layui-col-xs2">\
                        <div class="layui-title">\
                            友情链接\
                        </div>\
						<div class="layui-col-xs12 footer_list">\
						    <a href="http://www.tjnk.gov.cn" target="_blank">天津市南开区人民政府</a>\
						</div>\
                    </div>\
                    <div class="layui-col-xs2" style="width: 12%;">\
                        <div class="layui-title">\
                            建设单位\
                        </div>\
                        <div class="layui-col-xs12 footer_list">\
                            天津市南开区民政局\
                        </div>\
                   </div>\
                    <div class="layui-col-xs2">\
                        <div class="layui-title">\
                            联系我们\
                        </div>\
                        <div class="layui-col-xs12 footer_list">\
                            电子邮箱：nkqmzj_sfkll@tj.gov.cn\
                        </div>\
                    </div>\
                    <div class="layui-col-xs3">\
                        <div class="layui-col-xs12 footer_list" style="margin-top: 30px">\
                          <div class="code"><img class="code_img"  src="' + img1 + '"/><p class="code_p">智慧养老苹果版</p></div>\
                          \<div class="code"><img  class="code_img"  src="' + img2 + '"/><p class="code_p">智慧养老安卓版</p></div>\
                          \<div class="code"><img  class="code_img"  src="' + img3 + '"/><p class="code_p">智慧服务安卓版</p></div>\
                        </div>\
                    </div>\
                    <div class="layui-col-xs1" style="margin-top: 30px;text-align: center;">\
                        <div class="layui-col-xs1 footer_list" style="width: 190px;">\
                           客服电话：（022)83558800 \
                        </div>\
                        <a href="https://zfwzgl.www.gov.cn/exposure/jiucuo.html?site_code=1201040001" target="_blank"><img   src="' + img5 + '"/></a>\
                        <a href="http://bszs.conac.cn/sitename?method=show&id=53786A55C0B01341E053012819ACBE32" target="_blank"><img    src="' + img6 + '"/></a>\
                    </div>\
                </div>\
                <div class="footer_bottom" style="border-top: 1px solid #CCCCCC;width: 90%;margin: 15px auto">\
                    <div class="layui-main" style="text-align: center">\
                        <a class="footer_text" href="https://beian.miit.gov.cn/state/outPortal/loginPortal.action;jsessionid=BbpSi6ZDXgHBOkEgB6dFVjafK7PalJz8YBpjUPaSHgliMsR4hzZP!-1666066665#/Integrated/index">备案号：津ICP备2021008383号-1</a>\
                        <img style="width:20px;height:20px;margin-left:20px;margin-right:5px;display: inline;" src="'+ img4 + '" alt="">津公网安备 12010402001539号\
                    </div>\
                 </div>\
            </div>';
            // <div class="layui-col-xs6 footer_text" style="text-align: right">\
            //                  connbhdijiij\
            //             </div>\
            //             <div class="layui-col-xs6 footer_text1" style="text-align: center;padding-left: 40px;">\
            //                 <a href="https://beian.miit.gov.cn/state/outPortal/loginPortal.action;jsessionid=BbpSi6ZDXgHBOkEgB6dFVjafK7PalJz8YBpjUPaSHgliMsR4hzZP!-1666066665#/Integrated/index">备案号：津ICP备2021008383号-1</a>\
            //             </div>\

        }
    }
});


$(function () {
    // 获取当前URL参数
    var href = window.location.pathname.split('/');

    $('body').on('click', '.out', function (event) {

        /**
         * @param title 弹出层标题
         * @param content 内容
         * @param skin 主题
         * @function yes 成功回调
         **/

        layer.open({
            title: '温馨提示',
            content: '是否退出登录？',
            skin: 'my-skin',
            btn: ['确定', '取消',],
            yes: function (index, layero) {

                // 移除Cookie用户信息
                $.cookie('session', null, {
                    expires: -1,
                    path: '/'
                });

                for (var i = 0; i < href.length; i++) {
                    // 如果在当前页面索引在admin当中。
                    if (href[i] === 'admin.html') {
                        window.location.href = '../../index.html'
                        // 退出登录将返回首页
                        window.history.back(-1);

                        return false;
                    }

                    // 如果在当前页面索引在发布相关 更新相关当中。
                    if (href[i] === 'pubService.html' || href[i] === 'releaseDemand.html' || href[i] === 'launchEvent.html') {
                        window.location.href = '../../../index.html'
                        window.history.back(-1);
                        return false;
                    }

                    window.location.reload()
                }
            }
        });
    })

    $('body').on('click', '.layuiSelete', function (event) {
        event.stopPropagation();

        // 点击按钮切换为隐藏的 如果是隐藏的 切换为可见的 
        $('.layui_list').stop().toggle();
        $('.industry').stop().slideUp();
    })

    $('body').on('click', '.Cluster', function (event) {
        event.stopPropagation();

        // 点击按钮切换为隐藏的 如果是隐藏的 切换为可见的 
        $('.industry').stop().toggle();
        $('.layui_list').stop().slideUp(300);
    })

    // 触碰空白处 收起头部下拉列表项
    $(document).click(function (even) {
        var SelectDown = $('.layui_list, .industry');

        // 获取需要收起的元素
        if (!SelectDown.is(even.target) && SelectDown.has(even.target).length === 0) {
            $('.layui_list, .industry').stop().slideUp(300);
        }
    })

    $('body').on('click', '#user', function () {
        sessionStorage.setItem("user", "1")
    })

    $('body').on('click', '#exit', function () {
        $.cookie('session', JSON.stringify({ name: undefined }), {
            path: '/',
        })
    })

    $('body').on('click', '#Search', function (even) {
        event.stopPropagation();
        layer.open({
            title: '温馨提示',
            skin: 'my-skin',
            content: '此功能正在升级！'
        });
    })
})
