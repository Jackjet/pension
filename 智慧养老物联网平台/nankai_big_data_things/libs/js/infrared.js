var num1 = 0, num2 = 0, num3 = 0;
layui.config({
    base: '../libs/js/'
}).use(['tree', 'form', 'common', 'upload'], function () {
    var tree = layui.tree, form = layui.form, common = layui.common;

    common.getSystemTime();
    var url = "";
    if (document.referrer.length > 0) {
        url = document.referrer;
    }
    if (url.length == 0 && opener.location.href.length > 0) {
        url = opener.location.href;
    }
    window.sessionStorage.setItem('url', url);
    $('#returnHome').on('click', function () {
        common.returnHome();
    })

    // 查询条件
    let queryData = { name: "", phone: "", homeStreetId: "", homeCommunityId: "", page: 1, size: 100 };
    $('#routerPage').on('click', function () {
        location.href = './infraredRecord.html?homeStreetId=' + queryData.homeStreetId + '&homeCommunityId=' + queryData.homeCommunityId;
    })
    // 街道社区
    common.ajaxMethod($.url.dictionaries.street, null, 'get', function (res) {
        if (res.code === 1) {
            let dataTree = [];
            res.data.content.forEach((item, index) => {
                dataTree.push({
                    id: item.id,
                    title: item.name,
                    children: []
                })
                common.ajaxMethod($.url.dictionaries.community, { streetId: item.id }, 'get', function (res1) {
                    if (res.code === 1) {
                        res1.data.content.forEach(k => {
                            dataTree[index].children.push({
                                id: k.id,
                                title: k.name
                            })
                        })
                        tree.render({
                            elem: '#tree-box',
                            data: dataTree,
                            accordion: true,
                            click: function (obj) {
                                // 节点高亮
                                let nodes = document.getElementsByClassName("layui-tree-txt");
                                for (var i = 0; i < nodes.length; i++) {
                                    if (nodes[i].innerHTML === obj.data.title) {
                                        nodes[i].style.color = "#7ee1e5";
                                        nodes[i].style.fontWeight = "bold";
                                    } else {
                                        nodes[i].style.color = "#fff";
                                        nodes[i].style.fontWeight = "normal";
                                    }
                                }
                                // 搜索ID
                                if (obj.data.children) {
                                    queryData.homeStreetId = obj.data.id;
                                    queryData.homeCommunityId = "";
                                } else {
                                    queryData.homeCommunityId = obj.data.id;
                                    queryData.homeStreetId = "";
                                }
                                findByStateByUntreated();
                                equipmentListData(queryData);
                            }
                        });
                    } else {
                        layer.msg(res.msg);
                    }
                });
            })
        } else {
            layer.msg(res.msg);
        }
    });

    // 查询事件
    form.on('submit(querySubmit)', function (data) {
        queryData.name = data.field.name;
        queryData.phone = data.field.phone;
        // queryData.state = data.field.state;
        // queryData.alarmType = data.field.alarmType;
        queryData.page = 1;
        queryData.size = 100;
        equipmentListData(queryData);
        return false;
    });
    // 上拉加载
    $('.equipment-list').scroll(function () {
        // 获取滚动距离
        let scrollTop = $(this).scrollTop();
        // 获取列表容器高度
        let boxHeight = $('.equipment-list').height();
        // 滚动条总高度
        let scrollHeight = document.getElementsByClassName('equipment-list')[0].scrollHeight;
        // 滚动到底部
        if (scrollTop + boxHeight >= scrollHeight - 10) {
            queryData.size += 100;
            equipmentListData(queryData);
        }
    })

    equipmentListData(queryData);
    // setInterval(() => {
    //     $('#reset').click();
    //     equipmentListData(queryData);
    // }, 10000);

    // 列表数据
    function equipmentListData(data) {
        var load1 = layer.load();
        common.ajaxMethod($.url.infrared.findAll, data, 'get', function (res) {
            if (res.code === 1) {
                let listCon = ''
                $.each(res.data.content, function (index, item) {
                    let state = '';
                    let classId = '';
                    let color = '';
                    // switch (item.state) {
                    //     case 1: state = "设备上线"; classId = 'layui-icon-face-smile'; color = '#fff'; break;
                    //     case 2: state = "设备离线"; classId = 'layui-icon-face-cry'; color = 'red'; break;
                    //     // case 3: state = "超时未归"; classId = 'layui-icon-face-cry'; color = 'red'; break;
                    // }
                    // listCon += `<li class="equipment-item" item-id="${item.id}">
                    //     <p><i style="color:${color}" class="layui-icon ${classId}"></i> <span style="color:${color}">${state}</span></p>
                    //     <p>${item.name} ${item.phone}</p>
                    //     <p>${item.homeStreetName} ${item.homeCommunityName}</p>
                    //     <p>详细地址：${item.registerAddress}</p>
                    // </li>`;
                    listCon += `<li class="equipment-item" item-id="${item.id}">
					    <p>${item.name} ${item.phone}</p>
					    <p>${item.homeStreetName} ${item.homeCommunityName}</p>
					    <p>详细地址：${item.registerAddress}</p>
					</li>`;
                })
                $('.list-content').html(listCon);
                if (res.data.content.length === 0) {
                    $('.list-content').html('<div class="nothing-data">暂无数据</div>');
                }
                equipmentDetails();
                layer.close(load1);
            } else {
                layer.msg(res.msg);
                layer.close(load1);
            }
        })
    }
    // 报警未处理
    findByStateByUntreated();
    function findByStateByUntreated() {
        common.ajaxMethod($.url.infrared.findByStateByUntreated, queryData, 'get', function (res) {
            if (res.code === 1) {
                $('#call-the-police').text(res.data);
            } else {
                layer.msg(res.msg);
            }
        });
    }
    // 统计
    $('.statistics-box').hide();
    $('.statistics-num span').hover(function () {
        $('.statistics-box').show();
        // common.ajaxMethod($.url.infrared.analysis, queryData, 'get', function (res) {
        //     if (res.code === 1) {
        //         $('#alarm').html(res.data.alarm);
        //         $('#test').html(res.data.test);
        //         $('#lowBattery').html(res.data.lowBattery);
        //         $('#pollute').html(res.data.pollute);
        //         $('#unInstall').html(res.data.unInstall);
        //         $('#reInstall').html(res.data.reInstall);
        //         $('#alarmOff').html(res.data.alarmOff);
        //     } else {
        //         layer.msg(res.msg);
        //     }
        // });
        common.ajaxMethod($.url.infrared.analysis, queryData, 'get', function (res) {
            if (res.code === 1) {
                // $('#on-line').html(res.data.online);
                // $('#off-line').html(res.data.offline);
                $('#equipment-line').html(res.data.total);
            } else {
                layer.msg(res.msg);
            }
        });
    }, function () {
        $('.statistics-box').hide();
    })
    // 下载模板
    $('#downloadTem').on('click', function () {
        window.location.href = $.url.infrared.templateExport;
    });
    // 同步设备信息
    $('#uploadFile').on('click', function () {
        $('#open').click();
        $('#open').on('change', function () {
            var load2 = layer.load();
            common.downloadAjax($.url.infrared.upload, $('#open')[0].files[0], function (res) {
                if (res.code === 1) {
                    layer.msg('同步数据成功');
                    layer.close(load2);
                } else {
                    layer.msg(res.msg);
                    layer.close(load2);
                }
            })
        })
    });

    audioFun();
    // 自动提示 语音播报
    setInterval(() => {
        audioFun();
    }, 10 * 1000);
    function audioFun() {
        common.ajaxMethod1($.url.infraredRecord.findFirstByState, null, 'get', function (res) {
            if (JSON.parse(res).code === 1) {
                let data = JSON.parse(res).data;
                if (data) {
                    automaticVoice(data);
                }
            }
        });
    }
    function automaticVoice(data) {
        if ($('.bullet-frame')) {
            $('.bullet-frame').html(`
            <p class="equipment-id">设备ID：${data.deviceId ? data.deviceId : '未安装'}</p>
            <h1 class="frame-name">${data.name} ${data.phone}</h1>
            <p class="frame-time">时间： ${data.createTime}</p>
            <p class="frame-contacts">预警联系人： ${data.linkName}</p>
            <p class="contacts-phone">设备联系人电话：${data.linkPhone}</p>
            <textarea id="frame-input" placeholder="请填写处理内容" class="layui-layer-input" style="width:400px"></textarea>`)
        }
        let el = `<div class="bullet-frame">
            <p class="equipment-id">设备ID：${data.deviceId ? data.deviceId : '未安装'}</p>
            <h1 class="frame-name">${data.name} ${data.phone}</h1>
            <p class="frame-time">时间： ${data.createTime}</p>
            <p class="frame-contacts">预警联系人： ${data.linkName}</p>
            <p class="contacts-phone">设备联系人电话：${data.linkPhone}</p>
            <textarea id="frame-input" placeholder="请填写处理内容" class="layui-layer-input" style="width:400px"></textarea>
        </div>`;
        layer.prompt({
            id: 1,
            type: 1,
            title: '<span style="color:red">预警提醒-红外感应</span>',
            content: el,
            btn: ['处理', '取消'],
            yes: function (index, ele) {
                let valueData = JSON.stringify({ id: data.id, processingContent: $('#frame-input').val() });
                common.ajaxMethod($.url.infraredRecord.update, valueData, 'post', function (res) {
                    if (res.code === 1) {
                        layer.msg('操作成功');
                        layer.close(index);

                    } else {
                        layer.msg(res.msg);
                    }
                });
            },
            no: function (index, layero) {
                layer.close(index);
            }
        });
        $('#audioId').attr('src', "../libs/mvc/infrared.mp3");
        // common.ajaxMethod($.url.IntelligentMattress.txtToAudio, { text: textVoice }, 'get', function (res) {
        //     if (res.code === 1) {
        //         let url = webUrl + '/' + res.data;
        //         $('#audioId').attr('src', url);
        //     } else {
        //         layer.msg(res.msg);
        //     }
        // });
    }

    // 详情
    function equipmentDetails() {
        $('.equipment-item').on('click', function () {
            let id = $(this).attr('item-id');
            common.ajaxMethod($.url.infrared.findById, { id: id }, 'get', function (res) {
                if (res.code === 1) {
                    let el_details = `<div class="equipment-details">
                        <div class="head-portrait"><img src="${res.data.sex === 1 ? '../libs/image/oldman.jpg' : '../libs/image/oldlady.jpg'}" alt=""></div>
                        <span>设备ID: ${res.data.deviceId ? res.data.deviceId : '未安装'}</span>
                        <h1>${res.data.name} ${res.data.phone}</h1>
                        <p>性别：${res.data.sex === 1 ? '男' : '女'} 年龄：${res.data.age}</p>
                        <p>紧急联系人： ${res.data.linkName ? res.data.linkName : ''}</p>
                        <p>紧急联系人电话：${res.data.linkPhone ? res.data.linkPhone : ''}</p>
                        <p>${res.data.homeStreetName} ${res.data.homeCommunityName} ${res.data.registerAddress}</p>
                    </div>`;
                    layer.prompt({
                        id: 2,
                        value: res.data.off_bed_kpi,
                        title: '<span style="color:red">智能设备-详情</span>',
                        content: el_details,
                        btn: false
                    });
                } else {
                    layer.msg(res.msg);
                }
            })
        })
    }

})