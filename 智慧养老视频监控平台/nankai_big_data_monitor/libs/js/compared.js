layui.config({
    base: '../libs/js/'
}).use(['form', 'common'], function () {
    var form = layui.form,
        common = layui.common;
    var myDate = new Date();
    var tYear = myDate.getFullYear();

    var html = '';
    for (var i = 0; i < 3; i++) {
        html += '<option value="' + [tYear - i] + '">' + [tYear - i] + '</option>'
    }
    $('.year').text(tYear);
    $('#year').html(html);
    form.render('select');
    common.getSystemTime();
    // 老人数量同比
    function agedNumber() {
        common.ajaxMethod($.url.compared.countYearOnYearByManNumber, { year: $('#year').val() }, 'get', function (row) {
            if (row.data.data.length > 0) {
                $('#agedNumber').show();
                $('#agedNumberIsShow').hide();
                var xAxisArr = ['第一季度', '第二季度', '第三季度', '第四季度'];
                bar('agedNumber', row.data, xAxisArr, 0);
            } else {
                $('#agedNumber').hide();
                $('#agedNumberIsShow').show();
            }
        })
    }
    // 服务需求数量同比
    function serveDemand() {
        common.ajaxMethod($.url.compared.countYearOnYearByOrder, { year: $('#year').val() }, 'get', function (row) {
            if (row.data.data.length > 0) {
                $('#serveDemand').show();
                $('#serveDemandIsShow').hide();
                var xAxisArr = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
                bar('serveDemand', row.data, xAxisArr, 0);
            } else {
                $('#serveDemand').hide();
                $('#serveDemandIsShow').show();
            }
        })
    }
    // 服务质量环比
    function serveAppraise() {
        common.ajaxMethod($.url.compared.countMonthOnMonthByAppraise, { year: $('#year').val() }, 'get', function (row) {
            if (row.data.length > 0) {
                $('#serveAppraise').show();
                $('#serveAppraiseIsShow').hide();

                var dom = document.getElementById('serveAppraise');
                var myChart = echarts.init(dom);
                var numArr = [];
                row.data.forEach(function (item, index) {
                    numArr.push(item.monthOnMonth);
                })
                option = {
                    width: '80%',
                    color: ['#DE5B64'],
                    grid: {
                        left: '10%',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    legend: {
                        data: [$('#year').val() + '年服务质量环比%'],
                        textStyle: {
                            color: '#fff'
                        },
                    },
                    xAxis: [
                        {
                            name: '',
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            axisPointer: {
                                type: 'shadow'
                            },
                            axisLabel: {
                                show: true,
                                interval: 0,
                                textStyle: {
                                    color: '#fff',  //更改坐标轴文字颜色
                                    fontSize: 10  //更改坐标轴文字大小
                                }
                            },
                            textStyle: {
                                color: '#fff'
                            },
                            // splitLine: { 
                            //      show: false ,
                            //     lineStyle: {
                            //         color: 'rgba(255,255,255,0.12)'
                            //     }
                            // },

                            splitLine: { show: false },
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,0)'
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '单位：%',
                            nameTextStyle: {
                                color: '#fff',
                                fontSize: 10,
                            },
                            axisLabel: {
                                formatter: '{value} %',
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            textStyle: {
                                color: '#fff'
                            },
                            splitLine: { show: false },
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(255,255,255,0)'
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: $('#year').val() + '年服务质量环比%',
                            type: 'line',
                            data: numArr
                        }
                    ]
                };

                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }
            } else {
                $('#serveAppraise').hide();
                $('#serveAppraiseIsShow').show();
            }
        })
    }
    // 服务商数量同比
    function serveNumber() {
        common.ajaxMethod($.url.compared.countYearOnYearByProviderNumber, { year: $('#year').val() }, 'get', function (row) {
            if (row.data.data.length > 0) {
                $('#serveNumber').show();
                $('#serveNumberIsShow').hide();
                var xAxisArr = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
                bar('serveNumber', row.data, xAxisArr, 3);
            } else {
                $('#serveNumber').hide();
                $('#serveNumberIsShow').show();
            }
        })
    }
    // 服务商人员数量同比
    function serveEmpNumber() {
        common.ajaxMethod($.url.compared.countYearOnYearByEmployNumber, { year: $('#year').val() }, 'get', function (row) {
            if (row.data.data.length > 0) {
                $('#serveEmpNumber').show();
                $('#serveEmpNumberIsShow').hide();
                var xAxisArr = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
                bar('serveEmpNumber', row.data, xAxisArr, 4);
            } else {
                $('#serveEmpNumber').hide();
                $('#serveEmpNumberIsShow').show();
            }
        })
    }
    // 服务商人员数量同比
    function serveEmployNumber() {
        common.ajaxMethod($.url.compared.countMonthOnMonthByEmployNumber, { year: $('#year').val() }, 'get', function (row) {
            if (row.data.data.length > 0) {
                $('#serveEmployNumber').show();
                $('#serveEmployNumberIsShow').hide();
                var xAxisArr = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
                bar('serveEmployNumber', row.data, xAxisArr, 5);
            } else {
                $('#serveEmployNumber').hide();
                $('#serveEmployNumberIsShow').show();
            }
        })
    }

    form.on('select(year)', function (data) {
        $('.year').text(data.value);
        agedNumber(data.value);
        serveDemand(data.value);
        serveAppraise(data.value);
        serveNumber(data.value);
        serveEmpNumber(data.value);
        serveEmployNumber(data.value);
    });
    // 横向柱状图
    function bar(Id, dataArr, xAxisArr, type) {
        var dom = document.getElementById(Id);
        var myChart = echarts.init(dom);
        var lastNumArr = [];
        var numArr = [];
        var yearOnYearArr = [];
        dataArr.data.forEach(function (item, index) {
            numArr.push(item.num);
            if (type == 2 || type == 5) {
                yearOnYearArr.push(item.monthOnMonth);
            } else {
                lastNumArr.push(item.lastNum);
                yearOnYearArr.push(item.yearOnYear);
            }
        })
        var colors = ['#4FFD6D', '#5059D2', '#DE5B64'];
        var legendArr = [dataArr.allType.lastNum, dataArr.allType.num, dataArr.allType.yearOnYear + '%']
        var yAxis = [
            {
                type: 'value',
                name: '',
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
                textStyle: {
                    color: '#fff'
                },
                splitLine: { show: false },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0)'
                    }
                }
            },
            {
                type: 'value',
                axisLabel: {
                    formatter: '{value} %',
                    textStyle: {
                        color: '#fff'
                    }
                },
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
                name: dataArr.allType.lastNum,
                type: 'bar',
                data: lastNumArr
            },
            {
                name: dataArr.allType.num,
                type: 'bar',
                data: numArr
            },
            {
                name: type == 2 || type == 5 ? dataArr.allType.monthOnMonth + '%' : dataArr.allType.yearOnYear + '%',
                type: 'line',
                yAxisIndex: 1,
                data: yearOnYearArr
            }
        ]
        /**
         * type = 0 --> 老人数量同比
         * type = 1 --> 服务需求数量同比
         * type = 3 --> 服务商数量同比
         * type = 4 --> 服务商人员数量同比
         * type = 5 --> 服务商人员数量环比
         */
        switch (type) {
            case 0:
                yAxis[0].name = '单位：数量';
                // yAxis[0].min = 0;
                // yAxis[0].max = 100;
                // yAxis[0].interval = 25;
                // yAxis[1].min = 0;
                // yAxis[1].max = 100;
                // yAxis[1].interval = 25;
                break;
            case 1:
                yAxis[0].name = '单位：数量';
                break;
            case 3:
                yAxis[0].name = '单位：数量';
                // series[1].type = 'line';
                break;
            case 4:
                yAxis[0].name = '单位：数量';
                series[0].stack = 'two';
                series[1].stack = 'two';
                break;
            case 5:
                yAxis[0].name = '单位：数量';
                colors = ['#5059D2', '#DE5B64']
                legendArr = [dataArr.allType.num, dataArr.allType.monthOnMonth + '%']
                series.shift();
                break;
        }
        option = {
            width: '78%',
            color: colors,
            grid: {
                left: '10%',
                top: '35%',
                right: '1%',
                bottom: '15%'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: legendArr,
                textStyle: {
                    color: '#fff'
                }
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

    agedNumber();
    serveDemand();
    serveAppraise();
    serveNumber();
    serveEmpNumber();
    serveEmployNumber();
})