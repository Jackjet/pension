layui.config({
    base: '../libs/js/'
}).use(['common'], function () {
    var common = layui.common;
    common.getSystemTime();
    // 重组的数据
    var list = [];
    // 服务商
    common.ajaxMethod($.url.aegdResourceIcon.countProviderNumber, {}, 'get', function (row) {
        var num = row.data.num ? row.data.num : '0';
        var employNum = row.data.employNum ? row.data.employNum : '0';
        $('#providerNum').text(num);
        $('#providerEmployNum').text(employNum);
        row.data.list.forEach(item => {
            list.push({
                type: 'provider',
                name: item.name,
                num: item.num,
                longitude: item.longitude,
                latitude: item.latitude
            })
        })
        countHomeNumber();
    })
    // 养老机构
    function countHomeNumber() {
        common.ajaxMethod($.url.aegdResourceIcon.countHomeNumber, {}, 'get', function (row) {
            var num = row.data.num ? row.data.num : '0';
            var employNum = row.data.employNum ? row.data.employNum : '0';
            $('#homeNumber').text(num);
            $('#homeEmployNum').text(employNum);
            row.data.list.forEach(item => {
                list.push({
                    type: 'home',
                    name: item.name,
                    num: item.num,
                    longitude: item.longitude,
                    latitude: item.latitude
                })
            })
            countSunNumber();
        })
    }
    // 日照中心
    function countSunNumber() {
        common.ajaxMethod($.url.aegdResourceIcon.countSunNumber, {}, 'get', function (row) {
            var num = row.data.num ? row.data.num : '0';
            var employNum = row.data.employNum ? row.data.employNum : '0';
            $('#sunNum').text(num);
            $('#sunEmployNum').text(employNum);
            row.data.list.forEach(item => {
                list.push({
                    type: 'sun',
                    name: item.name,
                    num: item.num,
                    longitude: item.longitude,
                    latitude: item.latitude
                })
            })
            map();
        })
    }
    function map() {
        console.log(list)
        $.ajax({
            type: "GET",
            url: "../public/json/mapInfo.json",
            dataType: "json",
            success: function (data) {
                var map = new window.BMap.Map('allmap') // 创建地图实例

                // 天津
                var point = new window.BMap.Point(117.15, 39.13) // 创建中心点坐标
                // 沈阳
                // var point = new window.BMap.Point(123.43, 41.80) // 创建中心点坐标

                map.centerAndZoom(point, 13); // 初始化地图，设置中心点坐标和地图级别;
                map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
                map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
                map.addControl(new BMap.NavigationControl({
                    type: BMAP_NAVIGATION_CONTROL_ZOOM, //缩放控件类型 仅包含缩放按钮
                    anchor: BMAP_ANCHOR_TOP_RIGHT //右下角
                }));

                setTimeout(function () {
                    map.setMapStyleV2({
                        styleJson: data
                    });
                }, 300);

                list.forEach(item => {
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
                        div.style.width = "20px";
                        div.style.height = "35px";
                        div.style.textAlign = "center";

                        var arrow = this._arrow = document.createElement("img");
                        if (item.type == 'provider') {
                            arrow.src = "../libs/image/provider.png";
                        }
                        if (item.type == 'home') {
                            arrow.src = "../libs/image/home.png";
                        }
                        if (item.type == 'sun') {
                            arrow.src = "../libs/image/sun.png";
                        }
                        arrow.style.width = "20px";
                        arrow.style.height = "35px";
                        arrow.style.top = "22px";
                        arrow.style.left = "10px";

                        var title = this._title = document.createElement("div");
                        title.innerHTML = item.name;
                        title.style.position = "absolute";
                        title.style.width = "180px";
                        title.style.height = "25px";
                        title.style.lineHeight = "25px";
                        title.style.top = "35px";
                        title.style.left = "-80px";
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
})