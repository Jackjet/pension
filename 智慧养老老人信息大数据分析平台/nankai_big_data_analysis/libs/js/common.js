/*
 * @Author: 于
 * @Date: 2020-04-28
 */
layui.config({
	base: '../libs/js/'
}).define(['jquery', 'cookie'], function (exports) {
	"use strict";
	var $ = layui.jquery;
	var common = {}

	var currentUser = $.cookie('currentDataUser')
	if (currentUser) {
		var token = JSON.parse(currentUser)
		token = token ? token.token : ''
	}
	// var token = "91b2c5d1b96c46bcbc7148dcfaf7188f";
	common.ajaxMethod = function (findUrl, askData, method, callback) {
		$.ajax({
			url: findUrl,
			type: method,
			dataType: 'json',
			traditional: true,
			data: askData,
			headers: { 'Authorization': 'token ' + token },
			// 请求成功
			success: function (data) {
				if (data.length != 0 && data != null) {
					callback(data);
				}
			},
			error: function (error) {
				if (error.responseJSON.status == '401') {
					window.location.href = 'login.html'
				}
			}
		});
	}
	// 获取日期
	common.getSystemTime = function () {
		var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
		var date = new Date();
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		var d = date.getDate();
		var h = date.getHours();
		var mm = date.getMinutes();
		var ss = date.getSeconds();
		m = m < 10 ? "0" + m : m;
		d = d < 10 ? "0" + d : d;
		h = h < 10 ? "0" + h : h;
		mm = mm < 10 ? "0" + mm : mm;
		ss = ss < 10 ? "0" + ss : ss;

		var week = date.getDay();
		var newTime = h + ":" + mm + ":" + ss;
		var newDate = y + "年" + m + "月" + d + "日" + "(" + weeks[week] + ")";
		$('.time-box .time').text(newTime);
		$('.time-box .date').text(newDate);
		// 定时器刷新当前系统时间
		setTimeout(function () {
			common.getSystemTime();
		}, 1000);
	}
	// 饼图
	common.echartsPie = function (Id, colors, legend, series) {
		var dom = document.getElementById(Id);
		var myChart = echarts.init(dom);
		var option = null;
		option = {
			tooltip: {
				trigger: 'item',
				formatter: "{b}: {d}%"
			},
			color: colors,
			legend: {
				type: 'scroll',
				orient: 'vertical',
				y: 'center',
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
							formatter: '{d}%',
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
	exports('common', common);
});
