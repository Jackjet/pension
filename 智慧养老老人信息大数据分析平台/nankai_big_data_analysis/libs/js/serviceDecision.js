layui.config({
    base: '../libs/js/'
}).use(['common'], function () {
    var common = layui.common;
    common.getSystemTime();
    // 老人数量
    common.ajaxMethod($.url.serviceDecision.countSubsidyUserNumber, {}, 'get', function (row) {
        if (row.data.data.length > 0) {
            var dataArr = row.data;
            $('#agedNumber').show();
            $('#agedNumberIsShow').hide();
            var colors = ['#5059D2', '#4FFD6D'];
            var legendArr = [dataArr.allType.num, dataArr.allType.subsidyNum];
            var xAxisArr = [];
            var subsidyNumArr = [];
            var numArr = [];
            dataArr.data.forEach(function (item, index) {
                xAxisArr.push(item.homeStreetName);
                subsidyNumArr.push(item.subsidyNum);
                numArr.push(item.num);
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
                    textStyle: {
                        color: '#fff'
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
                    name: dataArr.allType.num,
                    type: 'bar',
                    barWidth: '20px',
                    stack: 'two',
                    data: numArr
                },
                {
                    name: dataArr.allType.subsidyNum,
                    type: 'bar',
                    stack: 'two',
                    data: subsidyNumArr
                },
            ]
            bar('agedNumber', colors, legendArr, xAxisArr, 35, yAxis, series);
        } else {
            $('#agedNumber').hide();
            $('#agedNumberIsShow').show();
        }
    })
    // 本年度居家养老领取总金额
    common.ajaxMethod($.url.serviceDecision.countCurrentYearUserSubsidy, {}, 'get', function (row) {
        if (row.data.length > 0) {
            var dataArr = row.data;
            $('#getAmount').show();
            $('#getAmountIsShow').hide();
            var colors = ['#F05155'];
            var legendArr = ['本年度居家养老领取总金额'];
            var xAxisArr = [];
            var assessMoneyArr = [];
            dataArr.forEach(function (item, index) {
                xAxisArr.push(item.homeStreetName);
                assessMoneyArr.push(item.assessMoney / 100);
            })
            var yAxis = [
                {
                    type: 'value',
                    name: '单位：元',
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
                    name: '本年度居家养老领取总金额',
                    type: 'bar',
                    barWidth: '20px',
                    data: assessMoneyArr
                },
            ]
            bar('getAmount', colors, legendArr, xAxisArr, 35, yAxis, series);
        } else {
            $('#getAmount').hide();
            $('#getAmountIsShow').show();
        }
    })
    // 本年度老人服务订单数量
    common.ajaxMethod($.url.serviceDecision.countMonthOnMonthByOrderNumber, {}, 'get', function (row) {
        if (row.data.length > 0) {
            var dataArr = row.data;
            $('#orderCount').show();
            $('#orderCountIsShow').hide();
            var colors = ['#FDDF4D'];
            var legendArr = ['本年度老人服务订单数量'];
            var xAxisArr = [];
            var assessMoneyArr = [];
            dataArr.forEach(function (item, index) {
                xAxisArr.push(item.month + '月');
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
                    name: '本年度老人服务订单数量',
                    type: 'bar',
                    barWidth: '20px',
                    data: assessMoneyArr
                }
            ]
            bar('orderCount', colors, legendArr, xAxisArr, 0, yAxis, series);
        } else {
            $('#orderCount').hide();
            $('#orderCountIsShow').show();
        }
    })
    // 本年度季度订单销量
    common.ajaxMethod($.url.serviceDecision.countQuarterOnYearByOrderNumber, {}, 'get', function (row) {
        if (row.data.length > 0) {
            var dataArr = row.data;
            $('#orderSales').show();
            $('#orderSalesIsShow').hide();
            var colors = ['#2C86FF'];
            var legendArr = [];
            var xAxisArr = ['第一季度', '第二季度', '第三季度', '第四季度'];
            var assessMoneyArr = [];
            dataArr.forEach(function (item, index) {
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
                    label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    data: assessMoneyArr
                }
            ]
            bar('orderSales', colors, legendArr, xAxisArr, 0, yAxis, series);
        } else {
            $('#orderSales').hide();
            $('#orderSalesIsShow').show();
        }
    })
    // 本年度各街道订单统计
    common.ajaxMethod($.url.serviceDecision.countOrderNumberOnYearByStreet, {}, 'get', function (row) {
        if (row.data.length > 0) {
            var dataArr = row.data;
            $('#orderStreet').show();
            $('#orderStreetIsShow').hide();
            var numArr = [];
            var streetArr = [];
            dataArr.forEach(function (item, index) {
                numArr.push(item.num);
                streetArr.push(item.street);
            })
            var dom = document.getElementById('orderStreet');
            var myChart = echarts.init(dom);
            option = {
                color: '#1E2760',
                width: '90%',
                grid: {
                    left: '5%',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                xAxis: [{
                    type: 'category',
                    data: streetArr,
                    // 隐藏线
                    splitLine: { show: false },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,0)'
                        }
                    },
                    axisLabel: {
                        margin: 10,
                        color: '#e2e9ff',
                        rotate: 35,
                        textStyle: {
                            fontSize: 10
                        },
                    }
                }],
                yAxis: [{
                    // axisLabel: {
                    //     formatter: '{value}',
                    //     color: '#e2e9ff',
                    // },
                    // 隐藏线
                    splitLine: { show: false },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,0)'
                        }
                    }
                }],
                series: [{
                    type: 'bar',
                    data: numArr,
                    barWidth: '10px',
                    label: {
                        normal: {
                            show: true,
                            lineHeight: 22,
                            width: 50,
                            height: 22,
                            backgroundColor: 'rgba(0,160,221)',
                            borderRadius: 200,
                            position: ['-20', '-40'],
                            distance: 1,
                            formatter: [
                                ' {a|{c}} '
                            ].join(','),
                            rich: {
                                a: {
                                    color: '#fff',
                                    align: 'right'
                                }
                            }
                        }
                    }
                }]
            };
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
        } else {
            $('#orderStreet').hide();
            $('#orderStreetIsShow').show();
        }
    })

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
})