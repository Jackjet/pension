/*
 * @Author: 于
 * @Date: 2020-04-28
 */
layui.config({
	base: '../libs/js/'
}).define(['jquery', 'cookie'], function (exports) {
	// "use strict";
	var $ = layui.jquery;
	var common = {}
	var storage = window.localStorage.getItem('currentDataUser');
	var currentUser = $.cookie('currentDataUser');
	if (currentUser) {
		var token = JSON.parse(currentUser);
		token = token ? token.token : ''
	} else {
		var token = JSON.parse(storage).token;
	}
	// var token = "3db62feb4ec642a987405e678c201a4f";
	// 公用ajax
	common.ajaxMethod = function (findUrl, askData, method, callback) {
		$.ajax({
			url: findUrl,
			type: method,
			dataType: 'json',
			contentType: "application/json",
			// traditional: true,
			data: askData,
			headers: {
				// 'Content-type': 'application/json;charset=UTF-8',
				'Authorization': 'token ' + token
			},
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
	common.ajaxMethod1 = function (findUrl, askData, method, callback) {
		$.ajax({
			url: findUrl,
			type: method,
			dataType: 'text',
			traditional: true,
			data: askData,
			headers: {
				'Authorization': 'token ' + token
			},
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
	// 上传文件
	common.downloadAjax = function (url, fileObj, callback) {
		var formFile = new FormData();
		formFile.append("file", fileObj); //加入文件对象
		$.ajax({
			url: url,
			data: formFile,
			type: "post",
			headers: { 'Authorization': 'token ' + token },
			dataType: "json",
			cache: false,//上传文件无需缓存
			processData: false,//用于对data参数进行序列化处理 这里必须false
			contentType: false, //必须
			success: function (data) {
				callback(data);
			},
		})
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
	// 返回首页
	common.returnHome = function () {
		window.location.href = window.sessionStorage.getItem('url');
	}
	exports('common', common);
});
