function subsidyNumBar() {
  common.ajaxMethod($.url.subsidyData.num, {}, 'get', function (response) {
    if (response.code == 1) {
      var typeObj = response.data.allType;
      var dataType = ['product', '老人总人数', '发放总人数'];
      var dataMain = [];
      response.data.data.forEach( function(element, index) {
        var resetData = {product: element.homeStreetName, '老人总人数': element.num, '发放总人数': element.subsidyNum};
        dataMain.push(resetData);
      });
      var Chart = echarts.init(document.getElementById('subsidy-num'));
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
        color: ['#626FD1', '#EEF353'],
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
        }]
      };
      Chart.setOption(option, true);
    }
  });
}
function subsidySumBar() {
  common.ajaxMethod($.url.subsidyData.sum, {}, 'get', function (response) {
    if (response.code == 1) {
      var typeObj = response.data.allType;
      var dataType = ['product', '第一季度', '第二季度', '第三季度', '第四季度'];
      var dataMain = [];
      response.data.data.forEach( function(element, index) {
        var resetData = {product: element.homeStreetName, '第一季度': element.first/100, '第二季度': element.second/100, '第三季度': element.third/100, '第四季度': element.fourth/100};
        dataMain.push(resetData);
      });
      var Chart = echarts.init(document.getElementById('subsidy-sum'));
      var option = {
        tooltip: {
          show: true,
          formatter: function(p) {
              return '街道：' + p.name + '<br>' + p.seriesName + '：' + p.value[p.seriesName] + '元';
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
        color: ['#4DFF6B', '#EEF353', '#626FD1', '#A25690'],
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
        series: [{
          type: 'bar',
          barMaxWidth: 20
        },
        {
          type: 'bar',
          barMaxWidth: 20
        },
        {
          type: 'bar',
          barMaxWidth: 20
        },
        {
          type: 'bar',
          barMaxWidth: 20
        }]
      };
      Chart.setOption(option, true);
    }
  });
}
function subsidyAllBar() {
  common.ajaxMethod($.url.subsidyData.all, {}, 'get', function (response) {
    if (response.code == 1) {
      console.log(response);
      var typeObj = {};
      var headerHtml = '<tr><th width="20%">所属街道</th>';
      response.data.allType.forEach( function(element, index) {
        typeObj[element.id] = element.name;
        headerHtml += '<th width="15%">老人数(' + element.name + ')</th>';
      });
      headerHtml += '<th width="15%">实际发放人数</th>'+
                    '<th width="20%">实际发放总金额（元）</th></tr>';
      $('.tableHead').html(headerHtml);
      var allHtml = '<table><tbody>';
      response.data.data.forEach( function(element, index) {
        if (index%2 === 0) {
          allHtml += '<tr><td width="20%">' + element.homeStreetName + '</td>';
        } else {
          allHtml += '<tr class="bgc"><td width="20%">' + element.homeStreetName + '</td>';
        }
        for(var obj in typeObj){
          for (var i = 0; i < element.data.length; i++) {
            if (element.data[i].id == obj) {
              allHtml += '<td width="15%">' + element.data[i].num + '</td>'
            }
          }
        }
        allHtml += '<th width="15%">' + element.realNum + '</th>'+
                    '<th width="20%">' + (element.realMoney/100) + '</th></tr>';
      });
      allHtml += '</tbody></table>';
      $('.tableBody').html(allHtml + allHtml);
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
    subsidyNumBar();
    subsidySumBar();
    subsidyAllBar();
  }
})