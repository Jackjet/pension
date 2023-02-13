layui.config({
    base: '../libs/js/'
}).use(['form', 'common', 'laydate', 'laypage'], function () {
    var form = layui.form,
        common = layui.common;
    common.getSystemTime();
    $('#returnHome').on('click', function () {
        common.returnHome();
    })
    // 日期选择器
    laydate = layui.laydate;
    laydate.render({
        elem: '#input-time',
        type: 'datetime',
        range: '/',
        format: 'yyyy-MM-dd HH:mm:ss'
    });

    let queryText = { page: 1, size: 10 }
    let pageNum = null;
    let page = 1;
    // 查询事件
    form.on('submit(querySubmit)', function (data) {
        queryText = {
            userName: data.field.userName,
            phone: data.field.phone,
            deviceId: data.field.deviceId,
            startTime: data.field.time ? data.field.time.split('/')[0].trim() : '',
            endTime: data.field.time ? data.field.time.split('/')[1].trim() : '',
            state: data.field.state,
            page: 1,
            size: 10
        }
        alertRecordList(queryText);
        return false;
    });

    // 警报记录列表
    alertRecordList(queryText);
    function alertRecordList(data) {
        var load1 = layer.load();
        common.ajaxMethod($.url.alert.findAll, data, 'get', function (res) {
            if (res.code === 1) {
                pageNum = res.data.totalElements;
                let htmlCon = '';
                $.each(res.data.content, function (index, item) {
                    htmlCon += `<tr>
                        <td>${item.device_id ? item.device_id : ''}</td>
                        <td>${item.user_name ? item.user_name : ''}</td>
                        <td>${item.phone ? item.phone : ''}</td>
                        <td>${item.remind_explain ? item.remind_explain : ''}</td>
                        <td>${item.create_time ? item.create_time : ''}</td>
                        <td>${item.update_time ? item.update_time : ''}</td>
                        <td>${item.processing_content ? item.processing_content : ''}</td>
                        <td>
                            <button type="button" class="handle-clck layui-btn layui-btn-normal layui-btn-xs  ${item.state === 0 ? '' : 'layui-btn-disabled'}" data-id="${item.id}" data-name="${item.link_name}" data-phone="${item.link_phone}">${item.state === 0 ? '未处理' : '已处理'}</button>
                        </td>
                    </tr>`;
                })
                $('#list-content').html(htmlCon)
                layer.close(load1);
                handleClickFun();
                laypage = layui.laypage;
                laypage.render({
                    elem: 'paging',
                    count: pageNum,
                    curr: page,
                    layout: ['count', 'prev', 'page', 'next', 'skip'],
                    jump: function (obj, first) {
                        if (!first) {
                            page = obj.curr;
                            queryText.page = obj.curr;
                            alertRecordList(queryText);
                        }
                    }
                });
            } else {
                layer.msg(res.msg);
                layer.close(load1);
            }
        })
    }

    // 处理弹框
    function handleClickFun() {
        $('.handle-clck').on('click', function () {
            let ids = $(this).attr('data-id');
            let htmlCon = `<p class="prompt-content">紧急联系人:${$(this).attr('data-name') === 'null' ? '' : $(this).attr('data-name')}</p><p class="prompt-content">紧急联系人电话：${$(this).attr('data-phone') === 'null' ? '' : $(this).attr('data-phone')}</p><textarea style="display:inline;" type="text" class="layui-layer-input" placeholder="请填写处理内容"/>`;
            layer.prompt({
                id: 1,
                type: 1,
                formType: 0,
                value: "",
                title: '<span style="color:red">填写处理内容</span>',
                content: htmlCon,
                btn: ['处理', '取消'],
            }, function (value, index) {
                common.ajaxMethod($.url.alert.upload, JSON.stringify({ id: ids, processingContent: value }), 'post', function (res) {
                    layer.msg('操作成功');
                    alertRecordList(queryText);
                });
                layer.close(index);
            });
        })
    }
})