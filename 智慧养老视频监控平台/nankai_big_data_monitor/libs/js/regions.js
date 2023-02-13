layui.config({
    base: '../libs/js/'
}).use(['form', 'common'], function () {
    var form = layui.form,
        common = layui.common;
    common.getSystemTime();
    // 获取下拉菜单
    common.ajaxMethod($.url.regions.findAll, { dicId: 'stzk' }, 'get', function (row) {
        var html = ''
        row.data.content.forEach(item => {
            html += '<option value="' + item.id + '">' + item.name + '</option>'
        });
        $('#bodyId').html(html);
        countByBody();
        form.render('select');
    })
    common.ajaxMethod($.url.regions.getNameList, {}, 'get', function (row) {
        var html = ''
        row.data.forEach(item => {
            html += '<option value="' + item + '">' + item + '</option>'
        });
        $('#countProjectSelect').html(html);
        countProject();
        form.render('select')
    })
    // 老年人年龄区域分布
    $('#ageRange').val('0');
    function countByAgeRange(ageRange) {
        var countByAgeRangeArr = [];
        common.ajaxMethod($.url.regions.countByAgeRange, {}, 'get', function (row) {
            switch (ageRange) {
                case '0':
                    countByAgeRangeArr = row.data[1].list
                    break;
                case '1':
                    countByAgeRangeArr = row.data[2].list
                    break;
                case '2':
                    countByAgeRangeArr = row.data[3].list
                    break;
                case '3':
                    countByAgeRangeArr = row.data[4].list
                    break;
                default:
                    countByAgeRangeArr = row.data[0].list
            }
            if (countByAgeRangeArr.length > 0) {
                $('#ageRangeEcharts').show();
                $('#ageRangeIsShow').hide();
                var legend = {
                    right: '100',
                    dataType: []
                }
                var series = {
                    name: '年龄段',
                    radius: ['30%', '40%'],
                    center: ["35%", "62%"],
                    dataMain: []
                }
                countByAgeRangeArr.forEach(function (element, index) {
                    legend.dataType.push(element.homeStreetName)
                    series.dataMain.push({ name: element.homeStreetName, value: element.num });
                });
                var colors = ['#F1FF92', '#7CE88E', '#59D9BB', '#5084D2', '#6E50D2', '#E88686', '#f5b031', '#9681ec', '#f87db2', '#22b6fb', '#FFC0CB', '#BFEFFF'];
                common.echartsPie('ageRangeEcharts', colors, legend, series);
            } else {
                $('#ageRangeEcharts').hide();
                $('#ageRangeIsShow').show();
            }
        })
    }
    form.on('select(ageRange)', function (data) {
        countByAgeRange(data.value)
    });

    // 居家和社区养老服务机构区域分布
    function countProject() {
        common.ajaxMethod($.url.regions.countByOrganizationProject, { name: $('#countProjectSelect').val() }, 'get', function (row) {
            if (row.data.length > 0) {
                $('#countProject').show();
                $('#countProjectIsShow').hide();
                var legend = {
                    right: '100',
                    dataType: []
                }
                var series = {
                    name: '养老机构服务项目',
                    radius: ['30%', '40%'],
                    center: ["35%", "62%"],
                    dataMain: []
                }
                row.data.forEach(function (element, index) {
                    legend.dataType.push(element.homeStreetName)
                    series.dataMain.push({ name: element.homeStreetName, value: element.num });
                });
                var colors = ['#F1FF92', '#7CE88E', '#59D9BB', '#5084D2', '#6E50D2', '#E88686', '#f5b031', '#9681ec', '#f87db2', '#22b6fb', '#FFC0CB', '#BFEFFF'];
                common.echartsPie('countProject', colors, legend, series);
            } else {
                $('#countProject').hide();
                $('#countProjectIsShow').show();
            }
        })
    }
    form.on('select(countProject)', function (data) {
        countProject(data.value)
    });

    // 老年人自理能力区域分布
    function countByBody() {
        var countByBodyArr = [];
        var bodyId = $('#bodyId').val();
        common.ajaxMethod($.url.regions.countByBody, {}, 'get', function (row) {
            row.data.forEach(item => {
                if (bodyId == item.bodyId) {
                    countByBodyArr = item.list;
                }
            })
            if (countByBodyArr.length > 0) {
                $('#countByBodyEcharts').show();
                $('#countByBodyIsShow').hide();

                var colors = ['#FFBE2F', '#1A824F', '#4DFF5E', '#626ED0', '#3B46A2', '#A1568F', '#4DFF5E', '#4FFD6D', '#626ED0', '#1A824F', '#5059D2', '#4FFD6D'];
                var legendArr = [];
                var xAxisArr = [];
                var assessMoneyArr = [];
                countByBodyArr.forEach(function (item, index) {
                    xAxisArr.push(item.homeStreetName);
                    assessMoneyArr.push(item.num);
                })
                var yAxis = [
                    {
                        type: 'value',
                        name: '单位：数量',
                        // minInterval: 1,
                        nameTextStyle: {
                            color: '#fff',
                            fontSize: 10,
                        },
                        axisLabel: {
                            formatter: '{value}',
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        // 隐藏线
                        splitLine: { show: false },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,0)'
                            }
                        }
                    }
                ];
                var series = [
                    {
                        type: 'bar',
                        barWidth: '20px',
                        data: assessMoneyArr
                    },
                ]
                bar('countByBodyEcharts', colors, legendArr, xAxisArr, 45, yAxis, series);
            } else {
                $('#countByBodyEcharts').hide();
                $('#countByBodyIsShow').show();
            }
        })
    }
    form.on('select(bodyId)', function (data) {
        countByBody()
    });

    // 服务机构
    function countType() {
        common.ajaxMethod($.url.regions.countByOrganizationType, { type: $('#type').val() }, 'get', function (row) {
            var countTypeArr = row.data;
            if (countTypeArr.length > 0) {
                $('#countTypeEcharts').show();
                $('#countTypeIsShow').hide();

                var colors = ['#FFBE2F', '#1A824F', '#4DFF5E', '#626ED0', '#3B46A2', '#A1568F', '#4DFF5E', '#4FFD6D', '#626ED0', '#1A824F', '#5059D2', '#4FFD6D'];
                var legendArr = [];
                var xAxisArr = [];
                var assessMoneyArr = [];
                countTypeArr.forEach(function (item, index) {
                    xAxisArr.push(item.homeStreetName);
                    assessMoneyArr.push(item.num);
                })
                var yAxis = [
                    {
                        type: 'value',
                        name: '单位：数量',
                        nameTextStyle: {
                            color: '#fff',
                            fontSize: 10,
                        },
                        axisLabel: {
                            formatter: '{value}',
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        // 隐藏线
                        splitLine: { show: false },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,0)'
                            }
                        }
                    }
                ];
                var series = [
                    {
                        type: 'bar',
                        barWidth: '20px',
                        data: assessMoneyArr
                    }
                ]
                bar('countTypeEcharts', colors, legendArr, xAxisArr, 45, yAxis, series);
            } else {
                $('#countTypeEcharts').hide();
                $('#countTypeIsShow').show();
            }
        })
    }
    form.on('select(type)', function (data) {
        countType()
    });

    // 横向柱状图
    function bar(Id, colors, legendArr, xAxisArr, rotate, yAxis, series) {
        var dom = document.getElementById(Id);
        var myChart = echarts.init(dom);
        option = {
            width: '80%',
            color: colors,
            grid: {
                left: '15%',
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: legendArr,
                textStyle: {
                    color: '#fff'
                },
            },
            xAxis: [
                {
                    name: '',
                    type: 'category',
                    data: xAxisArr,
                    axisPointer: {
                        type: 'shadow'
                    },
                    axisLabel: {
                        show: true,
                        interval: 0,
                        rotate: rotate,
                        textStyle: {
                            color: '#fff',  //更改坐标轴文字颜色
                            fontSize: 10  //更改坐标轴文字大小
                        }
                    },
                    // 隐藏线
                    splitLine: { show: false },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,0)'
                        }
                    }
                }
            ],
            yAxis: yAxis,
            series: series
        };

        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    }
    countByAgeRange('0');
    countType();
})