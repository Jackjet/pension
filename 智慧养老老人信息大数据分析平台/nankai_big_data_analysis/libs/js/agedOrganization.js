layui.config({
	base: '../libs/js/'
}).use(['laytpl', 'form', 'common'], function () {
	var form = layui.form
	var laytpl = layui.laytpl,
		common = layui.common;
	common.getSystemTime();

	// common.ajaxMethod($.url.agedOrganization.countUserNumber, {}, 'get', function (row) {
	//     var gettpl = $('#street-tpl').html();
	//     if (row.data.length > 0) {
	//         $('#streetList').show();
	//         $('#noNtreetList').hide();
	//         laytpl(gettpl).render(row.data, function (html) {
	//             $('#streetList').html(html);
	//         })
	//     } else {
	//         $('#streetList').hide();
	//         $('#noNtreetList').show();
	//     }
	// })
	// var fanwei = [];
	// $.ajax({
	//     type: "GET",
	//     url: "../public/json/jingkai.json",
	//     dataType: "json",
	//     success: function (data) {
	//         fanwei = data.features[0].geometry.coordinates[0][0];
	//     }
	// });

	function getMapData() {
		common.ajaxMethod($.url.agedOrganization.countNumber, { type: $('#type1').val() }, 'get', function (row) {
			if (row.data.length > 0) {
				// row.data.forEach((v,i)=>{
				// 	if(v.name.indexOf('天津市南开区') != -1){
				// 		v.name = v.name.replace('天津市南开区','')
				// 	}
				// 	if(v.name.indexOf('天津南开') != -1){
				// 		v.name = v.name.replace('天津南开','')
				// 	}
				// })
				$('#list').show();
				$('#noList').hide();
				var gettpl = $('#list-tpl').html();
				laytpl(gettpl).render(row.data, function (html) {
					$('#list').html(html);
				});
				map(row.data);
			} else {
				$('#list').hide();
				$('#noList').show();
			}
		})
	}
	getMapData()
	function map(row) {
		$.ajax({
			type: "GET",
			url: "../public/json/mapInfo.json",
			// url: "http://39.102.73.127/nankai/big/public/json/mapInfo.json",
			dataType: "json",
			success: function (data) {
				var map = new window.BMap.Map('allmap') // 创建地图实例

				// var mapPoint = [];
				// fanwei.forEach((item, index) => {
				//     mapPoint.push(new BMap.Point(item[0], item[1]));
				// })
				// 天津
				var point = new window.BMap.Point(117.15, 39.13) // 创建中心点坐标
				// 沈阳
				// var point = new window.BMap.Point(123.43, 41.80) // 创建中心点坐标

				map.centerAndZoom(point, 16); // 初始化地图，设置中心点坐标和地图级别;
				map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
				map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
				map.addControl(new BMap.NavigationControl({
					type: BMAP_NAVIGATION_CONTROL_ZOOM, //缩放控件类型 仅包含缩放按钮
					anchor: BMAP_ANCHOR_TOP_RIGHT //右下角
				}));

				setTimeout(function () {
					// var polygon = new BMap.Polygon(mapPoint, { strokeColor: "#00E7F8", fillColor: "", strokeStyle: 'solid', strokeWeight: 2, strokeOpacity: 0.5 });
					// map.addOverlay(polygon);
					map.setMapStyleV2({
						styleJson: data
					});
				}, 300);

				row.forEach(item => {
					// 复杂的自定义覆盖物
					function ComplexCustomOverlay(point) {
						this._point = point;
					}

					ComplexCustomOverlay.prototype = new BMap.Overlay();
					ComplexCustomOverlay.prototype.initialize = function (map) {
						this._map = map;
						var div = this._div = document.createElement("div");
						div.style.position = "absolute";
						div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
						div.style.height = "30px";
						div.style.width = "30px";
						div.style.textAlign = "center";

						var arrow = this._arrow = document.createElement("img");
						arrow.src = "../libs/image/location.png";
						arrow.style.width = "30px";
						arrow.style.height = "30px";
						arrow.style.top = "22px";
						arrow.style.left = "10px";

						// var bag = this._arrow = document.createElement("img");
						// bag.src = "../libs/image/locationBag.png";
						// bag.style.position = "absolute";
						// bag.style.width = "100%";
						// bag.style.height = "30px";
						// bag.style.top = "-20px";
						// bag.style.left = "-76px";

						var title = this._title = document.createElement("div");
						title.innerHTML = item.name;
						title.style.position = "absolute";
						title.style.backgroundImage = "url('../libs/image/locationBag.png')";
						title.style.width = "180px";
						title.style.height = "35px";
						title.style.lineHeight = "30px";
						title.style.top = "-25px";
						title.style.left = "-75px";
						title.style.padding = "0 5px";
						title.style.color = "#fff";

						// div.appendChild(bag);

						div.appendChild(arrow);

						div.appendChild(title);

						map.getPanes().labelPane.appendChild(div);//getPanes(),返回值:MapPane,返回地图覆盖物容器列表  labelPane呢???

						return div;
					}

					ComplexCustomOverlay.prototype.draw = function () {
						var map = this._map;
						var pixel = map.pointToOverlayPixel(this._point);
						this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
						this._div.style.top = pixel.y - 30 + "px";
					}

					var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(item.longitude, item.latitude));
					map.addOverlay(myCompOverlay);//将标注添加到地图中
				})
			}
		});
	}
	// 服务机构
	function countType() {
		console.log($('#type').val())
		common.ajaxMethod($.url.regions.countByOrganizationType, { type: $('#type').val() }, 'get', function (row) {
			var countTypeArr = row.data;
			if (countTypeArr.length > 0) {
				$('#countTypeEcharts').show();
				$('#countTypeIsShow').hide();

				var colors = ['#FFBE2F', '#1A824F', '#4DFF5E', '#626ED0', '#3B46A2', '#A1568F', '#4DFF5E', '#4FFD6D', '#626ED0', '#1A824F', '#5059D2', '#4FFD6D'];
				var legendArr = [];
				var xAxisArr = [];
				var assessMoneyArr = [];
				countTypeArr.forEach(function (item, index) {
					xAxisArr.push(item.homeStreetName);
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
						data: assessMoneyArr
					}
				]
				bar('countTypeEcharts', colors, legendArr, xAxisArr, 45, yAxis, series);
			} else {
				$('#countTypeEcharts').hide();
				$('#countTypeIsShow').show();
			}
		})
	}
	form.on('select(type)', function (data) {
		console.log(111111111)
		countType()
	});
	form.on('select(type1)', function (data) {
		getMapData()
	});
	// 横向柱状图
	function bar(Id, colors, legendArr, xAxisArr, rotate, yAxis, series) {
		var dom = document.getElementById(Id);
		var myChart = echarts.init(dom);
		option = {
			width: '90%',
			color: colors,
			grid: {
				left: '10%',
				top: '5%',
				bottom: '35%'
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
	countType()
})