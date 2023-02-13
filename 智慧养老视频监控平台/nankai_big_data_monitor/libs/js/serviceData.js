function askOldNum() {
  common.ajaxMethod($.url.serviceData.theOldNum, {}, 'get', function (response) {
    if (response.code == 1) {
      $('.theOld-sum-num span').html(response.data.num);
    }
  });
}
function theOldTypePie() {
  common.ajaxMethod($.url.serviceData.countByType, {}, 'get', function (response) {
    if (response.code == 1) {
      var dataMain = [
        {name: '注册老人', value: response.data.registerNum},
        {name: '居家老人', value: response.data.homeNum},
        {name: '普通老人', value: response.data.num},
      ];
      var Chart = echarts.init(document.getElementById('theOld-type'));
      var colors = ['#5084D2', '#E88686', '#F1FF92'];
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: "{b}: {c} ({d}%)",
          confine: true,
          textStyle: {
             fontSize: 8
          }
        },
        color: colors,
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
                  return p.name + ':' + p.percent + '%';
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
function theOldSubsidyBar() {
  common.ajaxMethod($.url.serviceData.subsidy, {}, 'get', function (response) {
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
        var resetData = {product: element.homeStreetName};
        for (var i = 0; i < element.data.length; i++) {
          resetData[typeObj[element.data[i].id]] = element.data[i].num;
        }
        dataMain.push(resetData);
      });
      var Chart = echarts.init(document.getElementById('theOld-subsidy'));
      var option = {
        tooltip: {
          show: true,
          formatter: function(p) {
              return '街道：' + p.name + '<br>' + p.seriesName + '：' + p.value[p.seriesName];
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
          nameTextStyle: {
            color: '#fff',
            fontSize: 8
          },
          axisLabel: {
            color: '#fff',
            fontSize: '8',
            interval:0,  
            rotate:40
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
function subsidyGrantBar() {
  common.ajaxMethod($.url.serviceData.subsidyMonth, {}, 'get', function (response) {
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
        var resetData = {product: element.homeStreetName};
        for (var i = 0; i < element.data.length; i++) {
          resetData[typeObj[element.data[i].id]] = element.data[i].num/100;
        }
        dataMain.push(resetData);
      });
      var Chart = echarts.init(document.getElementById('subsidy-grant'));
      var option = {
        tooltip: {
          show: true,
          formatter: function(p) {
              return '街道：' + p.name + '<br>' + p.seriesName + '：' + p.value[p.seriesName];
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
          nameTextStyle: {
            color: '#fff',
            fontSize: 8
          },
          axisLabel: {
            color: '#fff',
            fontSize: '8',
            interval:0,  
            rotate:40
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          axisLine: {
            show: true
          },
          name: '单位：元',
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
function theOldAtHomeLine() {
  common.ajaxMethod($.url.serviceData.fiveYear, {}, 'get', function (response) {
    if (response.code == 1) {
      var typeObj = {};
      var seriesArr = [];
      var dataType = ['product'];
      response.data.allType.forEach( function(element, index) {
        typeObj[element.id] = element.name;
        dataType.push(element.name);
        seriesArr.push({
          type: 'line',
          barMaxWidth: 20,
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          }
        });
      });
      var dataMain = [];
      response.data.data.forEach( function(element, index) {
        var resetData = {product: element.year};
        for (var i = 0; i < element.data.length; i++) {
          resetData[typeObj[element.data[i].id]] = element.data[i].num;
        }
        dataMain.push(resetData);
      });
      var Chart = echarts.init(document.getElementById('theOld-atHome'));
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
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
            fontSize: 8
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
              fontSize: '8',
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
          radius: 50,
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
function OrderDataLine() {
  common.ajaxMethod($.url.serviceData.OrderNum, {}, 'get', function (response) {
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
$(function(){
  layui.config({
    base: '../libs/js/'
  }).use(['common'], function () {
    common = layui.common;
    common.getSystemTime();
    Refresh();
  });
  function Refresh() {
    askOldNum();
    theOldTypePie();
    theOldSubsidyBar();
    subsidyGrantBar();
    theOldAtHomeLine();
    OrderAbnormalRadar();
    serviceSatisfiedBar();
    OrderDataLine();
  }
})