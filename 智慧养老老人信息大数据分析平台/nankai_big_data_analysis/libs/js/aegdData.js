layui.config({
    base: '../libs/js/'
}).use(['common', 'laytpl'], function () {
    var common = layui.common,
        laytpl = layui.laytpl;
	OrderDataLine()
    common.getSystemTime();
    // 累计服务订单数量
    common.ajaxMethod($.url.aegdData.countOrderNumber, {}, 'get', function (row) {
        var num = row.data.num;
        if (num) {
            $('#orderNumber').text(num);
        }
    })
    // 累计服务工时
    common.ajaxMethod($.url.aegdData.countOrderServiceTime, {}, 'get', function (row) {
        var num = row.data.num;
        if (num) {
            $('#serviceTime').text(num);
        }
    })
    // 注册用户数量
    common.ajaxMethod($.url.aegdData.countRegisterUserNum, {}, 'get', function (row) {
        var num = row.data.num;
        if (num) {
            $('#userNum').text(num);
        }
    })
    // 呼叫中心接收服务数量
    common.ajaxMethod($.url.aegdData.countOrderNumberByCentre, {}, 'get', function (row) {
        var num = row.data.num;
        if (num) {
            $('#centre').text(num);
        }
    })
    // 近15天各类服务工单统计
    // common.ajaxMethod($.url.aegdData.countOrderNumberByOrderDay, {}, 'get', function (row) {
    //     if (row.data.data.length > 0) {
    //         var dataArr = row.data;
    //         $('#orderStreet').show();
    //         $('#orderStreetIsShow').hide();
    //         var colors = ['#FFBE2F', '#1A824F', '#4DFF5E', '#626ED0', '#3B46A2', '#A1568F', '#4DFF5E', '#4FFD6D', '#626ED0', '#1A824F', '#5059D2', '#4FFD6D'];
    //         var legend = [];
    //         var xAxisArr = [];
    //         var series = [];
    //         dataArr.data.forEach(function (item, index) {
    //             var day = item.day.split('/');
    //             var newDay = day[0] + '月' + day[1] + '日';
    //             xAxisArr.push(newDay)
    //         })
    //         dataArr.allType.forEach(function (item, i) {
    //             legend.push(item.name);
    //             var val = [];
    //             dataArr.data.forEach(function (item, index) {
    //                 val.push(item.value[i]);
    //             })
    //             series.push(
    //                 {
    //                     name: item.name,
    //                     type: 'bar',
    //                     stack: 'two',
    //                     barWidth: '20px',
    //                     data: val
    //                 }
    //             )
    //         })
    //         var dom = document.getElementById('orderStreet');
    //         var myChart = echarts.init(dom);
    //         option = {
    //             width: '90%',
    //             color: colors,
    //             grid: {
    //                 left: '7%',
    //             },
    //             tooltip: {
    //                 trigger: 'axis'
    //             },
    //             legend: {
    //                 data: legend,
    //                 textStyle: {
    //                     color: '#fff'
    //                 },
    //             },
    //             xAxis: [
    //                 {
    //                     name: '',
    //                     type: 'category',
    //                     data: xAxisArr,
    //                     axisPointer: {
    //                         type: 'shadow'
    //                     },
    //                     axisLabel: {
    //                         show: true,
    //                         interval: 0,
    //                         textStyle: {
    //                             color: '#fff',  //更改坐标轴文字颜色
    //                             fontSize: 10  //更改坐标轴文字大小
    //                         }
    //                     },
    //                     // 隐藏线
    //                     splitLine: { show: false },
    //                     axisLine: {
    //                         lineStyle: {
    //                             color: 'rgba(255,255,255,0)'
    //                         }
    //                     }
    //                 }
    //             ],
    //             yAxis: [
    //                 {
    //                     type: 'value',
    //                     name: '单位：数量',
    //                     nameTextStyle: {
    //                         color: '#fff',
    //                         fontSize: 10,
    //                     },
    //                     axisLabel: {
    //                         formatter: '{value}',
    //                         textStyle: {
    //                             color: '#fff'
    //                         }
    //                     },
    //                     textStyle: {
    //                         color: '#fff'
    //                     },
    //                     // 隐藏线
    //                     splitLine: { show: false },
    //                     axisLine: {
    //                         lineStyle: {
    //                             color: 'rgba(255,255,255,0)'
    //                         }
    //                     }
    //                 }
    //             ],
    //             series: series
    //         };

    //         if (option && typeof option === "object") {
    //             myChart.setOption(option, true);
    //         }
    //     } else {
    //         $('#orderStreet').hide();
    //         $('#orderStreetIsShow').show();
    //     }
    // })
    // 年度服务质量评价占比
    common.ajaxMethod($.url.aegdData.countOrderAppraisePercentageByAppraise, {}, 'get', function (row) {
        if (row.data.length > 0) {
            $('#orderDay').show();
            $('#orderDayIsShow').hide();
            var legend = {
                x: 'center',
                y: 'bottom',
                dataType: ['满意', '一般', '不满意']
            }
            var series = {
                name: '年度服务质量评价占比',
                radius: ['40%', '60%'],
                center: ["50%", "60%"],
                dataMain: []
            }
            row.data.forEach(function (element, index) {
                var appraiseCode = '满意';
                if (element.appraiseCode === '1') {
                    appraiseCode = '一般';
                }
                if (element.appraiseCode === '2') {
                    appraiseCode = '不满意';
                }
                series.dataMain.push({ value: element.num, name: appraiseCode });
            });
            var colors = ['#7BE88D', '#5083D2', '#E88685'];
            echartsPie('orderDay', colors, legend, series);
        } else {
            $('#orderDay').hide();
            $('#orderDayIsShow').show();
        }
    })
    // 年度TOP5服务项目
    common.ajaxMethod($.url.aegdData.countOrderTopServiceProjectByOrderNumber, {}, 'get', function (row) {
        row.data.forEach(item => {
            switch (item.top) {
                case 1:
                    item.img = '../libs/image/one.png'
                    item.top = '第一名'
                    break;
                case 2:
                    item.img = '../libs/image/two.png'
                    item.top = '第二名'
                    break;
                case 3:
                    item.img = '../libs/image/three.png'
                    item.top = '第三名'
                    break;
                case 4:
                    item.img = '../libs/image/else.png'
                    item.top = '第四名'
                    break;
                case 5:
                    item.img = '../libs/image/else.png'
                    item.top = '第五名'
                    break;
				case 6:
					item.img = '../libs/image/else.png'
					item.top = '第六名'
					break;
				case 7:
					item.img = '../libs/image/else.png'
					item.top = '第七名'
					break;	
				case 8:
					item.img = '../libs/image/else.png'
					item.top = '第八名'
					break;
				case 9:
					item.img = '../libs/image/else.png'
					item.top = '第九名'
					break;
				case 10:
					item.img = '../libs/image/else.png'
					item.top = '第十名'
					break;
            }
        })
        var gettpl = $('#list-tpl').html();
        laytpl(gettpl).render(row.data, function (html) {
            $('#list').html(html);
        });
    })
	
	// 年度TOP5服务项目
	common.ajaxMethod($.url.basicinfo.countAllByOrderTop10, {}, 'get', function (row) {
	    row.data.forEach((item,index) => {
	        switch (index) {
	            case 0:
	                item.img = '../libs/image/one.png'
	                item.rank = '第一名'
	                break;
	            case 1:
	                item.img = '../libs/image/two.png'
	                item.rank = '第二名'
	                break;
	            case 2:
	                item.img = '../libs/image/three.png'
	                item.rank = '第三名'
	                break;
	            case 3:
	                item.img = '../libs/image/else.png'
	                item.rank = '第四名'
	                break;
	            case 4:
	                item.img = '../libs/image/else.png'
	                item.rank = '第五名'
	                break;
				case 5:
					item.img = '../libs/image/else.png'
					item.rank = '第六名'
					break;
				case 6:
					item.img = '../libs/image/else.png'
					item.rank = '第七名'
					break;	
				case 7:
					item.img = '../libs/image/else.png'
					item.rank = '第八名'
					break;
				case 8:
					item.img = '../libs/image/else.png'
					item.rank = '第九名'
					break;
				case 9:
					item.img = '../libs/image/else.png'
					item.rank = '第十名'
					break;
	        }
	    })
		console.log(row)
	    var gettpl = $('#list-tpl1').html();
	    laytpl(gettpl).render(row.data, function (html) {
	        $('#list1').html(html);
	    });
	})
    // // 近15天养老工单状态统计
    // common.ajaxMethod($.url.aegdData.countOrderStatePercentageByState, {}, 'get', function (row) {
    //     if (row.data.length > 0) {
    //         $('#state').show();
    //         $('#stateIsShow').hide();
    //         var legend = {
    //             x: 'center',
    //             y: 'bottom',
    //             dataType: ['待接单', '已接单', '服务中', '服务结束']
    //         }
    //         var series = {
    //             name: '近15天养老工单状态统计',
    //             radius: ['40%', '60%'],
    //             center: ["50%", "60%"],
    //             dataMain: []
    //         }
    //         row.data.forEach(function (element, index) {
    //             if (element.state != '-1') {
    //                 var state = '服务结束';
    //                 if (element.state === '0') {
    //                     state = '待接单';
    //                 }
    //                 if (element.state === '1') {
    //                     state = '已接单';
    //                 }
    //                 if (element.state === '2') {
    //                     state = '服务中';
    //                 }
    //                 series.dataMain.push({ name: state, value: element.num });
    //             }
    //         });
    //         var colors = ['#E88685', '#F2FF93', '#5083D2', '#7BE88D'];
    //         echartsPie('state', colors, legend, series);
    //     } else {
    //         $('#state').hide();
    //         $('#stateIsShow').show();
    //     }
    // })
	// 本年度各街道订单统计
	common.ajaxMethod($.url.serviceDecision.countOrderNumberOnYearByStreet, {}, 'get', function (row) {
	    if (row.data.length > 0) {
	        var dataArr = row.data;
	        $('#orderStreet').show();
	        $('#orderStreetIsShow').hide();
			var dataType = ['product', '数量'];
			var dataMain = [];
			console.log(dataArr)
			dataArr.forEach( function(element, index) {
			  dataMain.push({
			    product: element.street,
			    '数量': element.num
			  });
			});
	        var dom = document.getElementById('orderStreet');
	        var myChart = echarts.init(dom);
	        option = {
	            width: '90%',
	            tooltip: {
	                trigger: 'axis',
	                axisPointer: {
	                    type: 'shadow'
	                }
	            },
				dataset: {
				  dimensions: dataType,
				  source: dataMain
				},
				color: '#FFB92E',
				grid: {
				  top: '20%',
				  left: '10%',
				  right: '10%',
				  bottom: '30%',
				  containLabel: true
				},
				xAxis: {
				    type: 'category',
				    axisLine: {
				      show: false
				    },
				    axisLabel: {
				      color: '#fff',
					 interval:0,  
					 rotate:40  
				    },
				    name: '月',
				    nameTextStyle: {
				      color: '#fff',
				      fontSize: 8
				    },
				    splitLine: {
				      show: false
				    }
				},
				yAxis: {
				    axisLine: {
				      show: false
				    },
				    axisLabel: {
				      color: '#fff'
				    },
				    name: '单位：数量',
				    nameTextStyle: {
				      color: '#fff',
				      fontSize: 8
				    },
				    splitLine: {
				      show: false
				    },
				    type: 'value'
				},
				series: [{
				  type: 'line',
				  label: {
				    normal: {
				      show: true,
				      position: 'top'
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
	// 饼图
    function echartsPie(Id, colors, legend, series) {
        var dom = document.getElementById(Id);
        var myChart = echarts.init(dom);
        var option = null;
        option = {
            tooltip: {
                show: false,
                // trigger: 'item',
                // formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            color: colors,
            legend: {
                type: 'scroll',
                right: legend.right,
                textStyle: {
                    color: '#fff'
                },
                data: legend.dataType
            },
            series: [
                {
                    type: 'pie',
                    name: series.name,
                    radius: series.radius,
                    center: series.center,
                    label: {
                        normal: {
                            show: true,
                            formatter: function (p) {
                                return p.name + '\n' + p.percent + '%';
                            }
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '14',
                                fontWeight: 'bold',
                            }
                        }
                    },
                    data: series.dataMain
                }
            ]
        };

        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    }
	// 本年服务工单数据统计
	function OrderDataLine() {
	  common.ajaxMethod($.url.serviceData.OrderNum, {}, 'get', function (response) {
		  console.log(response,'222222222')
	    var dataType = ['product', '数量'];
	    var dataMain = [];
	    response.data.forEach( function(element, index) {
	      dataMain.push({
	        product: element.month,
	        '数量': element.num
	      });
	    });
	    var Chart = echarts.init(document.getElementById('Order-data'));
	
	    var option = {
	      tooltip: {
	        show: true,
	        formatter: function(p) {
	            return '月份：' + p.name + '<br>' + p.seriesName + '：' + p.value[p.seriesName];
	        },
	        confine: true,
	        textStyle: {
	           fontSize: 8
	        }
	      },
	      dataset: {
	        dimensions: dataType,
	        source: dataMain
	      },
	      color: '#FFB92E',
	      grid: {
	        top: '20%',
	        left: '10%',
	        right: '10%',
	        bottom: '8%',
	        containLabel: true
	      },
	      xAxis: {
	          type: 'category',
	          axisLine: {
	            show: false
	          },
	          axisLabel: {
	            color: '#fff'
	          },
	          name: '月',
	          nameTextStyle: {
	            color: '#fff',
	            fontSize: 8
	          },
	          splitLine: {
	            show: false
	          }
	      },
	      yAxis: {
	          axisLine: {
	            show: false
	          },
	          axisLabel: {
	            color: '#fff'
	          },
	          name: '单位：数量',
	          nameTextStyle: {
	            color: '#fff',
	            fontSize: 8
	          },
	          splitLine: {
	            show: false
	          },
	          type: 'value'
	      },
	      series: [{
	        type: 'line',
	        label: {
	          normal: {
	            show: true,
	            position: 'top'
	          }
	        }
	      }]
	    };
	    Chart.setOption(option, true);
	  });
	}
})