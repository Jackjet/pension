layui.config({
    base: '../libs/js/'
}).use(['form', 'common'], function () {
    var common = layui.common;
    common.ajaxMethod($.url.basicinfo.street, {}, 'get', function (row) {
        let str = `<option value="">请选择</option>`;
        row.data.content.forEach((v, i) => {
            str += `<option value="${v.id}">${v.name}</option>`;
            if (i == 0) {
                common.ajaxMethod($.url.basicinfo.community, { streetId: '' }, 'get', function (row) {
                    let str1 = `<option value="">请选择</option>`;
                    row.data.content.forEach((v, i) => {
                        str1 += `<option value="${v.id}">${v.name}</option>`;
                    })
                    $('#type1').html(str1)
                });
            }
        })
        $('#type').html(str)
    });
    var form = layui.form
    common.getSystemTime();
    countType()
    countByAgeRange()
    countByAgeRange1()
    theOldLivePie()
    $('#type').change(() => {
        common.ajaxMethod($.url.basicinfo.community, { streetId: $('#type').val() }, 'get', function (row) {
            let str1 = `<option value="">请选择</option>`;
            row.data.content.forEach((v, i) => {
                str1 += `<option value="${v.id}">${v.name}</option>`;
            })
            $('#type1').html(str1)
            countType()
        });
    })
    $('#type1').change(() => {
        countType()
    })

    // 老年人年龄区域分布
    $('#ageRange1').val('');
    function countByAgeRange1(ageRange) {
        var countByAgeRangeArr = [];
        // 服务机构老人数量
        common.ajaxMethod($.url.censusData.countByAgeRange, { ageRange: $('#ageRange1').val() }, 'get', function (row) {
            if (row.data.length > 0) {
                var dataArr = row.data[0].list;
                $('#Organization').show();
                $('#OrganizationIsShow').hide();
                var colors = ['#4FFD6D', '#5059D2', '#DE5B64'];
                var legendArr = ['男', '女'];
                var xAxisArr = [];
                var rzzxArr = [];
                var yljgArr = [];
                dataArr.forEach(function (item, index) {
                    xAxisArr.push(item.homeStreetName);
                    rzzxArr.push(item.manNum);
                    yljgArr.push(item.femaleNum);
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
                        name: '男',
                        type: 'bar',
                        data: rzzxArr
                    },
                    {
                        name: '女',
                        type: 'bar',
                        data: yljgArr
                    }
                ]
                bar('Organization', colors, legendArr, xAxisArr, 35, yAxis, series, '38%');
            } else {
                $('#Organization').hide();
                $('#OrganizationIsShow').show();
            }
        })

    }
    form.on('select(ageRange1)', function (data) {
        countByAgeRange1(data.value)
    });

    // 老人数量
    common.ajaxMethod($.url.serviceData.theOldNum, {}, 'get', function (row) {
        if (row.data.num > 0) {
            $('.theOld-sum-num span').text(row.data.num);
            $('#femaleNum').text(row.data.femaleNum);
            $('#manNum').text(row.data.manNum);
        }
    });
    // 社区

    // // 老人分类数据占比
    // common.ajaxMethod($.url.user.countAllByType, {}, 'get', function (row) {
    //     if (row.data.length > 0) {
    //         $('#countAllEcharts').show();
    //         $('#countAllIsShow').hide();
    //         var legend = {
    //             right: '50',
    //             dataType: []
    //         }
    //         var series = {
    //             radius: '60%',
    //             center: ["30%", "50%"],
    //             dataMain: []
    //         }
    //         row.data.forEach(function (element) {
    //             legend.dataType.push(element.name)
    //             series.dataMain.push({ name: element.name, value: element.num });
    //         });
    //         var colors = ['#F1FF92', '#7CE88E', '#5084D2', '#6E50D2', '#E88686', '#f5b031', '#9681ec', '#f87db2', '#22b6fb', '#FFC0CB', '#BFEFFF'];
    //         common.echartsPie('countAllEcharts', colors, legend, series);
    //     } else {
    //         $('#countAllEcharts').hide();
    //         $('#countAllIsShow').show();
    //     }
    // })
    // // 机构养老、社区养老、居家老人占比
    // common.ajaxMethod($.url.user.countAllByOrganizationType, {}, 'get', function (row) {
    //     if (row.data.length > 0) {
    //         $('#organizationEcharts').show();
    //         $('#organizationIsShow').hide();
    //         var legend = {
    //             right: '50',
    //             dataType: []
    //         }
    //         var series = {
    //             name: '年龄段',
    //             radius: ['60%', '40%'],
    //             center: ["30%", "50%"],
    //             dataMain: []
    //         }
    //         row.data.forEach(function (element) {
    //             legend.dataType.push(element.name)
    //             series.dataMain.push({ name: element.name, value: element.num });
    //         });
    //         var colors = ['#F1FF92', '#59D9BB', '#5084D2', '#6E50D2', '#E88686', '#f5b031', '#9681ec', '#f87db2', '#22b6fb', '#FFC0CB', '#BFEFFF'];
    //         common.echartsPie('organizationEcharts', colors, legend, series);
    //     } else {
    //         $('#organizationEcharts').hide();
    //         $('#organizationIsShow').show();
    //     }
    // })
    form.on('select(type)', function (data) {
        countType()
    });
    form.on('select(type1)', function (data) {
        countType()
    });
    // 服务机构
    function countType() {
        common.ajaxMethod($.url.censusData.type, { homeStreetId: $('#type').val(), homeCommunityId: $('#type1').val() }, 'get', function (row) {
            var countTypeArr = row.data;
            if (countTypeArr.length > 0) {
                $('#countTypeEcharts').show();
                $('#countTypeIsShow').hide();

                var colors = ['#FFBE2F', '#1A824F', '#4DFF5E', '#626ED0', '#3B46A2', '#A1568F', '#4DFF5E', '#4FFD6D', '#626ED0', '#1A824F', '#5059D2', '#4FFD6D'];
                var legendArr = [];
                var xAxisArr = [];
                var assessMoneyArr = [];
                countTypeArr.forEach(function (item, index) {
                    xAxisArr.push(item.genreName);
                    assessMoneyArr.push(item.num);
                })
                var yAxis = [
                    {
                        type: 'value',
                        name: '单位：人',
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
                bar('countTypeEcharts', colors, legendArr, xAxisArr, 45, yAxis, series, '35%');
            } else {
                $('#countTypeEcharts').hide();
                $('#countTypeIsShow').show();
            }
        })
    }

    // 老年人年龄区域分布
    $('#ageRange').val('');
    function countByAgeRange(ageRange) {
        var countByAgeRangeArr = [];
        common.ajaxMethod($.url.regions.countByAgeRange, { ageRange: $('#ageRange').val() }, 'get', function (row) {
            countByAgeRangeArr = row.data[0].list
            if (countByAgeRangeArr.length > 0) {
                $('#ageRangeEcharts').show();
                $('#ageRangeIsShow').hide();
                var legend = {
                    right: '10',
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
    // 各街道老人数量
    common.ajaxMethod($.url.user.countUserNumber, {}, 'get', function (row) {
        if (row.data.length > 0) {
            console.log(row)
            let str = ``;
            row.data.forEach((v, i) => {
                str += `
					<p>
						<span>${v.homeStreetName}</span>
						<span>${v.num}人</span>
					</p>
				`;
            })
            $('.monthOldMoney').html(str)
            // var dataArr = row.data;
            // $('#streetEcharts').show();
            // $('#streetIsShow').hide();
            // var colors = ['#F05155'];
            // var legendArr = ['老人数量'];
            // var xAxisArr = [];
            // var assessMoneyArr = [];
            // dataArr.forEach(function (item, index) {
            //     xAxisArr.push(item.homeStreetName);
            //     assessMoneyArr.push(item.num);
            // })
            // var yAxis = [
            //     {
            //         type: 'value',
            //         name: '单位：数量',
            //         nameTextStyle: {
            //             color: '#fff',
            //             fontSize: 10,
            //         },
            //         axisLabel: {
            //             formatter: '{value}',
            //             textStyle: {
            //                 color: '#fff'
            //             }
            //         },
            //         // 隐藏线
            //         splitLine: { show: false },
            //         axisLine: {
            //             lineStyle: {
            //                 color: 'rgba(255,255,255,0)'
            //             }
            //         }
            //     }
            // ];
            // var series = [
            //     {
            //         name: '老人数量',
            //         type: 'bar',
            //         barWidth: '20px',
            //         data: assessMoneyArr
            //     },
            // ]
            // bar('streetEcharts', colors, legendArr, xAxisArr, 35, yAxis, series);
        } else {
            $('#streetEcharts').hide();
            $('#streetIsShow').show();
        }
    })
    // // 各街道居家养老数量
    // common.ajaxMethod($.url.user.countUserNumberByType, {}, 'get', function (row) {
    //     if (row.data.length > 0) {
    //         var dataArr = row.data;
    //         $('#orderCount').show();
    //         $('#orderCountIsShow').hide();
    //         var colors = ['#FDDF4D'];
    //         var legendArr = ['居家养老数量'];
    //         var xAxisArr = [];
    //         var assessMoneyArr = [];
    //         dataArr.forEach(function (item, index) {
    //             xAxisArr.push(item.homeStreetName);
    //             assessMoneyArr.push(item.num);
    //         })
    //         var yAxis = [
    //             {
    //                 type: 'value',
    //                 name: '单位：数量',
    //                 nameTextStyle: {
    //                     color: '#fff',
    //                     fontSize: 10,
    //                 },
    //                 axisLabel: {
    //                     formatter: '{value}',
    //                     textStyle: {
    //                         color: '#fff'
    //                     }
    //                 },
    //                 // 隐藏线
    //                 splitLine: { show: false },
    //                 axisLine: {
    //                     lineStyle: {
    //                         color: 'rgba(255,255,255,0)'
    //                     }
    //                 }
    //             }
    //         ];
    //         var series = [
    //             {
    //                 name: '居家养老数量',
    //                 type: 'bar',
    //                 barWidth: '20px',
    //                 data: assessMoneyArr
    //             }
    //         ]
    //         bar('orderCount', colors, legendArr, xAxisArr, 35, yAxis, series);
    //     } else {
    //         $('#orderCount').hide();
    //         $('#orderCountIsShow').show();
    //     }
    // })
    function theOldLivePie() {
        common.ajaxMethod($.url.censusData.live, {}, 'get', function (response) {
            if (response.code == 1) {
                var dataMain = [];
                response.data.forEach(function (element, index) {
                    dataMain.push({ name: element.live, value: element.num });
                });
                var Chart = echarts.init(document.getElementById('theOld-live'));
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c} ({d}%)",
                        confine: true,
                        textStyle: {
                            fontSize: 8
                        }
                    },
                    color: ['#E88686', '#F1FF92', '#7CE88E', '#5084D2'],
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            radius: ['30%', '50%'],
                            center: ["50%", "50%"],
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '12'
                                    },
                                    formatter: function (p) {
                                        return p.name + '\n' + p.percent + '%' + '\n' + p.value;
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '10'
                                    }
                                }
                            },
                            labelLine: {
                                length: 10,
                                length2: 5
                            },
                            data: dataMain
                        }
                    ]
                }
                Chart.setOption(option, true);
            }
        });
    }
    // 各街道老人自理能力数量
    common.ajaxMethod($.url.user.countUserNumberByBody, {}, 'get', function (row) {
        if (row.data.length > 0) {
            var dataArr = row.data;
            $('#UserNumber').show();
            $('#UserNumberIsShow').hide();
            var colors = ['#4FFD6D', '#5059D2', '#DE5B64', '#FDE602'];
            var legendArr = ['自理', '半自理', '不能自理', '其他'];
            var xAxisArr = [];
            var zlNumArr = [];
            var bzlNumArr = [];
            var bnzlNumArr = [];
            var otherNumArr = [];
            dataArr.forEach(function (item, index) {
                xAxisArr.push(item.homeStreetName);
                zlNumArr.push(item.zlNum);
                bzlNumArr.push(item.bzlNum);
                bnzlNumArr.push(item.bnzlNum);
                otherNumArr.push(item.otherNum);
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
                    name: '自理',
                    type: 'bar',
                    data: zlNumArr
                },
                {
                    name: '半自理',
                    type: 'bar',
                    data: bzlNumArr
                },
                {
                    name: '不能自理',
                    type: 'bar',
                    data: bnzlNumArr
                },
                {
                    name: '其他',
                    type: 'bar',
                    data: otherNumArr
                }
            ]
            bar('UserNumber', colors, legendArr, xAxisArr, 35, yAxis, series, '20%');
        } else {
            $('#UserNumber').hide();
            $('#UserNumberIsShow').show();
        }
    })
    // 服务机构老人数量
    common.ajaxMethod($.url.user.countUserNumberByOrganization, {}, 'get', function (row) {
        if (row.data.length > 0) {
            var dataArr = row.data;
            $('#Organization').show();
            $('#OrganizationIsShow').hide();
            var colors = ['#4FFD6D', '#5059D2', '#DE5B64'];
            var legendArr = ['日照中心', '养老机构'];
            var xAxisArr = [];
            var rzzxArr = [];
            var yljgArr = [];
            // console.log(row.data, "===========")
            dataArr.forEach(function (item, index) {
                xAxisArr.push(item.homeStreetName);
                rzzxArr.push(item.rzzx);
                yljgArr.push(item.yljg);
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
                    name: '日照中心',
                    type: 'bar',
                    data: rzzxArr
                },
                {
                    name: '养老机构',
                    type: 'bar',
                    data: yljgArr
                }
            ]
            bar('Organization', colors, legendArr, xAxisArr, 35, yAxis, series);
        } else {
            $('#Organization').hide();
            $('#OrganizationIsShow').show();
        }
    })

    // 横向柱状图
    function bar(Id, colors, legendArr, xAxisArr, rotate, yAxis, series, bottom) {
        var dom = document.getElementById(Id);
        var myChart = echarts.init(dom);
        option = {
            width: '80%',
            color: colors,
            grid: {
                left: '15%',
                top: '5%',
                bottom: bottom
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
                            fontSize: 12  //更改坐标轴文字大小
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
