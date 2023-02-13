layui.config({
    base: '../libs/js/'
}).use(['form', 'common', 'upload'], function () {
    var form = layui.form;
    common = layui.common;
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
    // 字典
    common.ajaxMethod($.url.dictionaries.street, null, 'get', function (res) {
        if (res.code === 1) {
            let select = '<option value=""></option>';
            $.each(res.data.content, function (index, item) {
                select += `<option value="${item.name}">${item.name}</option>`;
            })
            $('#street_id').html(select);
            form.render('select');
        } else {
            layer.msg(res.msg);
        }
    });
    common.ajaxMethod($.url.dictionaries.community, null, 'get', function (res) {
        if (res.code === 1) {
            let select = '<option value=""></option>';
            $.each(res.data.content, function (index, item) {
                select += `<option value="${item.name}">${item.name}</option>`;
            })
            $('#community_id').html(select);
            form.render('select');
        } else {
            layer.msg(res.msg);
        }
    });

    // 查询事件
    form.on('submit(querySubmit)', function (data) {
        data.field.page = 1;
        data.field.size = 100;
        equipmentListData(data.field);
        return false;
    });
    let data = { page: 1, size: 100 }
    equipmentListData(data);
    setInterval(() => {
        $('#reset').click();
        equipmentListData(data);
    }, 10000);
    // 列表数据
    function equipmentListData(data) {
        // var load1 = layer.load();
        common.ajaxMethod($.url.IntelligentMattress.findAll, data, 'get', function (res) {
            if (res.code === 1) {
                let listCon = ''
                $('#equipment-line').html(res.data.totalElements);
                $.each(res.data.content, function (index, item) {
                    let state = '';
                    let classId = '';
                    let color = '';
                    switch (item.state) {
                        case 1: state = "上床"; classId = 'layui-icon-face-smile'; color = '#fff'; break;
                        case 2: state = "离床"; classId = 'layui-icon-face-cry'; color = 'yellow'; break;
                        case 3: state = "离床未归"; classId = 'layui-icon-face-cry'; color = 'orange'; break;
                        case 5: state = "设备离线"; classId = 'layui-icon-face-cry'; color = 'red'; break;
                        case 6: state = "设备上线"; classId = 'layui-icon-face-smile'; color = '#fff'; break;
                        default: state = '其他'; classId = 'layui-icon-face-cry'; color = 'blue'; break;
                    }
                    listCon += `<li class="equipment-item" item-id="${item.id}">
                        <p><i style="color:${color}" class="layui-icon ${classId}"></i> <span style="color:${color}">${state}</span></p>
                        <p>${item.name} ${item.phone}</p>
                        <p>${item.home_street_name} ${item.home_community_name}</p>
                        <p>设备ID: ${item.device_id}</p>
                        ${item.state === 1 ? `<span>心率：${item.heart_rate}</span>&nbsp;&nbsp;<span>呼吸：${item.breath_rate}</span>` : ''}
                    </li>`
                })
                $('.list-content').html(listCon);
                equipmentDetails();
                // layer.close(load1);
            } else {
                layer.msg(res.msg);
                // layer.close(load1);
            }
        })
    }
    // 统计
    $('.statistics-box').hide();
    $('.statistics-num span').hover(function () {
        $('.statistics-box').show();
        common.ajaxMethod($.url.IntelligentMattress.statistics, null, 'get', function (res) {
            if (res.code === 1) {
                $('#on-line').html(res.data.inBedCount);
                $('#off-line').html(res.data.outBedNoReturn);
            } else {
                layer.msg(res.msg);
            }
        })
    }, function () {
        $('.statistics-box').hide();
    })
    // 下载模板
    $('#downloadTem').on('click', function () {
        window.location.href = $.url.IntelligentMattress.templateExport;
    });
    // 同步设备信息
    $('#uploadFile').on('click', function () {
        $('#open').click();
        $('#open').on('change', function () {
            common.downloadAjax($.url.IntelligentMattress.upload, $('#open')[0].files[0], function (res) {
                layer.msg(res.msg);
            })
        })
    })

    // 自动提示 语音播报
    audioFun();
    setInterval(() => {
        audioFun();
    }, 10 * 1000);
    function audioFun() {
        common.ajaxMethod1($.url.alert.findByState, null, 'get', function (res) {
            if (JSON.parse(res).code === 1) {
                let data = JSON.parse(res).data;
                if (data !== null) {
                    automaticVoice(data);
                }
            } else {
                layer.msg(res.msg);
            }
        });
        // 报警未处理
        common.ajaxMethod($.url.alert.findByStateByUntreated, null, 'get', function (res) {
            if (res.code === 1) {
                $('#call-the-police').text(res.data);
            } else {
                layer.msg(res.msg);
            }
        });
    }
    function automaticVoice(data) {
        // let textVoice = data.deviceId + data.userName + data.remindExplain;
        if ($('.bullet-frame')) {
            $('.bullet-frame').html(`
            <p class="equipment-id">设备ID：${data.deviceId}</p>
            <h1 class="frame-name">${data.userName} ${data.phone}</h1>
            <h2 class="frame-equipment">${data.remindExplain}</h2>
            <p class="frame-time">时间： ${data.createTime}</p>
            <p class="frame-contacts">紧急联系人： ${data.userName}</p>
            <p class="contacts-phone">紧急联系人电话：${data.phone}</p>
            <textarea id="frame-input" placeholder="请填写处理内容" class="layui-layer-input" style="width:400px"></textarea>
            `)
        }
        let el = `<div class="bullet-frame">
            <p class="equipment-id">设备ID：${data.deviceId}</p>
            <h1 class="frame-name">${data.userName} ${data.phone}</h1>
            <h2 class="frame-equipment">${data.remindExplain}</h2>
            <p class="frame-time">时间： ${data.createTime}</p>
            <p class="frame-contacts">紧急联系人： ${data.userName}</p>
            <p class="contacts-phone">紧急联系人电话：${data.phone}</p>
            <textarea id="frame-input" placeholder="请填写处理内容" class="layui-layer-input" style="width:400px"></textarea>
        </div>`;
        layer.prompt({
            id: 1,
            type: 1,
            title: '<span style="color:red">预警提醒-智能床垫</span>',
            content: el,
            btn: ['处理', '取消'],
            yes: function (index, ele) {
                let valueData = JSON.stringify({ id: data.id, processingContent: $('#frame-input').val() });
                common.ajaxMethod($.url.alert.upload, valueData, 'post', function (res) {
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
        $('#audioId').attr('src', "../libs/mvc/chuang.mp3");
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
            common.ajaxMethod($.url.IntelligentMattress.findById, { id: id }, 'get', function (res) {
                if (res.code === 1) {
                    let el_details = `<div class="equipment-details">
                        <div class="head-portrait"><img src="${res.data.sex === 1 ? '../libs/image/oldman.jpg' : '../libs/image/oldlady.jpg'}" alt=""></div>
                        <span>设备ID: ${res.data.device_id}</span>
                        <h1>${res.data.name} ${res.data.phone}</h1>
                        <p>性别：${res.data.sex === 1 ? '男' : '女'} 年龄：${res.data.age}</p>
                        <p>预警联系人： ${res.data.link_name ? res.data.link_name : ''}</p>
                        <p>设备联系人电话：${res.data.link_phone ? res.data.link_phone : ''}</p>
                        <p>${res.data.home_street_name} ${res.data.home_community_name}</p>
                        <div class="setUp-time ">
                            <input type="text" style="float: left;width: 150px !important;margin-top:5px;height: 30px;line-height: 30px;" class="layui-input layui-layer-input" id="threshold-input" placeholder="请设置离床预警阀值">
                            <button type="button" style="height: 30px;line-height: 30px;margin: 5px 0 0 10px;"
                                class="layui-btn layui-btn-normal" id="setThreshold">设置</button>
                        </div>
                        <div id="btn-pos">
                            <button id="suimian" type="button" style="height: 30px;line-height: 30px;" class="layui-btn layui-btn-normal">睡眠报告</button>
                        </div>
                    </div>`;
                    layer.prompt({
                        id: 2,
                        value: res.data.off_bed_kpi,
                        title: '<span style="color:red">智能设备-详情</span>',
                        content: el_details,
                        btn: false

                    });
                    $('#setThreshold').on('click', function () {
                        if ($('#threshold-input').val()) {
                            thresholdFun(id);
                        } else {
                            layer.msg('请填写阀值');
                        }
                    })
                    // 睡眠报告
                    $('#suimian').on('click', function () {
                        common.ajaxMethod($.url.IntelligentMattress.sleepReport, { devId: res.data.device_id }, 'get', function (res) {
                            if (res.code === 1) {
                                window.open(res.data);
                            } else {
                                // layer.msg(res.msg);
                                console.log(res.msg)
                            }
                        });
                    })
                } else {
                    layer.msg(res.msg);
                }
            })
        })
    }
    // 离床预警阈值
    function thresholdFun(id) {
        let itputText = $('#threshold-input').val();
        let data = JSON.stringify({ 'id': id, 'offBedKpi': itputText });
        common.ajaxMethod($.url.IntelligentMattress.updateByOffBedKpi, data, 'post', function (res) {
            layer.msg(res.msg);
        });
    }
})
