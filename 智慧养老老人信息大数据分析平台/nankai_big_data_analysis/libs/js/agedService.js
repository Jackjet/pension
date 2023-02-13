function theOldTypePie() {
  common.ajaxMethod($.url.censusData.type, {}, 'get', function (response) {
    if (response.code == 1) {
      var dataMain = [];
      response.data.forEach( function(element, index) {
        dataMain.push({name: element.genreName, value: element.num});
      });
      var Chart = echarts.init(document.getElementById('theOld-type'));
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: "{b}: {c} ({d}%)",
          confine: true,
          textStyle: {
             fontSize: 8
          }
        },
        color: ['#A25690', '#FF7643', '#E63C4C', '#F1FF92','#7CE88E','#1A824E', '#367DFD', '#1D50B7', '#8634C4'],
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
                  fontSize: '8'
                },
                formatter: function(p) {
                  return p.name + '\n' + p.percent + '%';
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
function theOldEconomyPie() {
  common.ajaxMethod($.url.censusData.economy, {}, 'get', function (response) {
    if (response.code == 1) {
      var dataMain = [];
      response.data.forEach( function(element, index) {
        dataMain.push({name: element.economic, value: element.num});
      });
      var Chart = echarts.init(document.getElementById('theOld-economy'));
      var colors = ['#7CE88E', '#37C7D2', '#367DFD', '#1D50B7', '#8634C4', '#A25690', '#E88686', '#E63C4C', '#FF7643', '#F1FF92'];
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: "{b}: {c} ({d}%)",
          confine: true,
          textStyle: {
             fontSize: 8
          }
        },
        legend: {
          y: 'top',
          x: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 8
          },
          itemWidth: 8,
          itemHeight: 8
        },
        color: colors,
        series: [
          {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ["50%", "50%"], 　
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: '8'
                },
                formatter: function(p) {
                  return p.percent + '%';
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
            roseType: 'radius',
            data: dataMain.sort(function (a, b) { return a.value - b.value; }),
          }
        ]
      }
      Chart.setOption(option, true);
    }
  });
}
function theOldServiceBar() {
  common.ajaxMethod($.url.censusData.theOld, {}, 'get', function (response) {
    if (response.code == 1) {
      var typeObj = {};
      var seriesArr = [];
      var dataType = ['product'];
      response.data.allType.forEach( function(element, index) {
        typeObj[element.id] = element.name;
        dataType.push(element.name);
        seriesArr.push({
          type: 'bar',
          stack: '总量',
          barMaxWidth: 20,
          label: {
            show: true,
            textStyle: {
              fontSize: 8
            },
            position: ['100%', '40%'],
            formatter: function (params){
              var thisValue = params.data[params.seriesName];
              if (thisValue != 0) {
                return thisValue + '%';
              } else {
                return '';
              }
            }
          }
        });
      });
      var dataMain = [];
      response.data.data.forEach( function(element, index) {
        var resetData = {product: element.month};
        for (var i = 0; i < element.values.length; i++) {
          resetData[typeObj[element.values[i].id]] = Number((element.values[i].value*100).toFixed(2));
        }
        dataMain.push(resetData);
      });
      var Chart = echarts.init(document.getElementById('theOld-service'));
      var option = {
        tooltip: {
          show: true,
          formatter: function(p) {
              return '月份：' + p.name + '<br>' + p.seriesName + '：' + p.value[p.seriesName] + '%';
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
        color: ['#FFB92E', '#1A824E', '#4AFF5C', '#626FD1', '#3A46A2', '#A25690'],
        legend: {
          y: 'top',
          x: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 8
          },
          itemWidth: 8,
          itemHeight: 8
        },
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
            show: true
          },
          axisLabel: {
            color: '#fff'
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          axisLine: {
            show: true
          },
          max: 100,
          name: '单位：%',
          nameTextStyle: {
            color: '#fff',
            fontSize: 8
          },
          axisLabel: {
            color: '#fff'
          },
          splitLine: {
            show: false
          },
          type: 'value'
        },
        series: seriesArr
      };
      Chart.setOption(option, true);
    }
  });
}
function theOtherServiceBar() {
  common.ajaxMethod($.url.censusData.theOther, {}, 'get', function (response) {
    if (response.code == 1) {
      var typeObj = {};
      var seriesArr = [];
      var dataType = ['product'];
      response.data.allType.forEach( function(element, index) {
        typeObj[element.id] = element.name;
        dataType.push(element.name);
        seriesArr.push({
          type: 'bar',
          barMaxWidth: 20,
          label: {
            show: false,
            position: 'insideRight'
          }
        });
      });
      var dataMain = [];
      response.data.data.forEach( function(element, index) {
        var resetData = {product: element.age};
        for (var i = 0; i < element.values.length; i++) {
          resetData[typeObj[element.values[i].id]] = element.values[i].value;
        }
        dataMain.push(resetData);
      });
      var Chart = echarts.init(document.getElementById('theOther-service'));
      var option = {
        tooltip: {
          show: true,
          formatter: function(p) {
              return p.name + '<br>' + p.seriesName + '：' + p.value[p.seriesName];
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
        color: ['#FFB92E', '#1A824E', '#4AFF5C', '#626FD1', '#3A46A2', '#A25690'],
        legend: {
          y: 'top',
          x: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 8
          },
          itemWidth: 8,
          itemHeight: 8
        },
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
            show: true
          },
          axisLabel: {
            color: '#fff'
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          axisLine: {
            show: true
          },
          name: '单位：数量',
          nameTextStyle: {
            color: '#fff',
            fontSize: 8
          },
          axisLabel: {
            color: '#fff'
          },
          splitLine: {
            show: false
          },
          type: 'value'
        },
        series: seriesArr
      };
      Chart.setOption(option, true);
    }
  });
}
function OrderAbnormalRadar() {
  common.ajaxMethod($.url.serviceData.OrderErr, {}, 'get', function (response) {
    if (response.code == 1) {
      var Chart = echarts.init(document.getElementById('Order-abnormal'));
      var option = {
        tooltip: {
          confine: true,
          textStyle: {
             fontSize: 8
          }
        },
        legend: {
          y: 'top',
          x: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
          icon: 'circle',
          data: [response.data.allData[0].name, response.data.allData[1].name],
          itemWidth: 8,
          itemHeight: 8
        },
        color: ['#FC941D', '#57FF62'],
        grid: {
          top: '30%',
          left: '30%',
          right: '30%',
          bottom: '30%',
          containLabel: true
        },
        radar: {
          center: ['50%', '55%'],
          name: {
            textStyle: {
              fontSize: '10',
              color: '#fff',
              borderRadius: 3
            }
          },
          splitArea: {
              areaStyle: {
                  color: ['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.4)',
                          'rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.4)',
                          'rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.4)']
              }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.2)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          nameGap: 5,
          radius: 80,
          indicator: response.data.allType
        },
        series: [{
          name: '',
          type: 'radar',
          data: response.data.allData
        }]
      };
      Chart.setOption(option, true);
    }
  });
}
function serviceSatisfiedBar() {
  common.ajaxMethod($.url.serviceData.satisfied, {}, 'get', function (response) {
    if (response.code == 1) {
      var typeObj = response.data.allType;
      var dataType = ['product', '满意', '一般', '不满意'];
      var dataMain = [];
      response.data.date.forEach( function(element, index) {
        var resetData = {product: element.month, '满意': element.num, '一般': element.num1, '不满意': element.num2};
        dataMain.push(resetData);
      });
      var Chart = echarts.init(document.getElementById('service-satisfied'));
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
        color: ['#6DF0FF', '#6E50D2', '#FFB92E'],
        legend: {
          y: 'top',
          x: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 8
          },
          itemWidth: 8,
          itemHeight: 8
        },
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
            show: true
          },
          name: '月',
          nameTextStyle: {
            color: '#fff',
            fontSize: 8
          },
          axisLabel: {
            color: '#fff'
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          axisLine: {
            show: true
          },
          name: '单位：数量',
          nameTextStyle: {
            color: '#fff',
            fontSize: 8
          },
          axisLabel: {
            color: '#fff'
          },
          splitLine: {
            show: false
          },
          type: 'value'
        },
        series: [{
          type: 'bar',
          barMaxWidth: 20,
          label: {
            show: false,
            position: 'insideRight'
          }
        },
        {
          type: 'bar',
          barMaxWidth: 20,
          label: {
            show: false,
            position: 'insideRight'
          }
        },
        {
          type: 'bar',
          barMaxWidth: 20,
          label: {
            show: false,
            position: 'insideRight'
          }
        }]
      };
      Chart.setOption(option, true);
    }
  });
}
function countOrderState(){
	// 近15天养老工单状态统计
	common.ajaxMethod($.url.aegdData.countOrderStatePercentageByState, {}, 'get', function (row) {
		console.log(row)
	    if (row.data.length > 0) {
	        $('#state').show();
	        $('#stateIsShow').hide();
	        var legend = {
	            x: 'center',
	            y: 'bottom',
	            dataType: ['待接单', '已接单', '服务中', '服务结束']
	        }
	        var series = {
	            name: '近15天养老工单状态统计',
	            radius: ['40%', '60%'],
	            center: ["50%", "60%"],
	            dataMain: []
	        }
	        row.data.forEach(function (element, index) {
	            if (element.state != '-1') {
	                var state = '服务结束';
	                if (element.state === '0') {
	                    state = '待接单';
	                }
	                if (element.state === '1') {
	                    state = '已接单';
	                }
	                if (element.state === '2') {
	                    state = '服务中';
	                }
	                series.dataMain.push({ name: state, value: element.num });
	            }
	        });
	        var colors = ['#E88685', '#F2FF93', '#5083D2', '#7BE88D'];
	        echartsPie('state', colors, legend, series);
	    } else {
	        $('#state').hide();
	        $('#stateIsShow').show();
	    }
	})
}
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
$(function(){
  layui.config({
    base: '../libs/js/'
  }).use(['common'], function () {
    common = layui.common;
    common.getSystemTime();
    Refresh();
  });
  function Refresh() {
    theOldTypePie();
    theOldEconomyPie();
    theOldServiceBar();
    theOtherServiceBar();
	OrderAbnormalRadar()
	serviceSatisfiedBar()
	countOrderState()
  }
})