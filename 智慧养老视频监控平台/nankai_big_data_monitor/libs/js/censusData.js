function theOldLivePie() {
  common.ajaxMethod($.url.censusData.live, {}, 'get', function (response) {
    if (response.code == 1) {
      var dataMain = [];
      response.data.forEach( function(element, index) {
        dataMain.push({name: element.live, value: element.num});
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
function theOldSelfCarePie() {
  common.ajaxMethod($.url.censusData.selfCare, {}, 'get', function (response) {
    if (response.code == 1) {
      var dataMain = [];
      response.data.forEach( function(element, index) {
        dataMain.push({name: element.body, value: element.num});
      });
      var Chart = echarts.init(document.getElementById('theOld-selfCare'));
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: "{b}: {c} ({d}%)",
          confine: true,
          textStyle: {
             fontSize: 8
          }
        },
        color: ['#E88686', '#5084D2', '#7CE88E', '#F1FF92'],
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
$(function(){
  layui.config({
    base: '../libs/js/'
  }).use(['common'], function () {
    common = layui.common;
    common.getSystemTime();
    Refresh();
  });
  function Refresh() {
    theOldLivePie();
    theOldTypePie();
    theOldSelfCarePie();
    theOldEconomyPie();
    theOldServiceBar();
    theOtherServiceBar();
  }
})