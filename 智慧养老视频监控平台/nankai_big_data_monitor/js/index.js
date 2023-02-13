var request = new Call_Request();
var type = "0";
// 用来播放新版本的视频流
var httpUrl = "http://10.111.254.117:8866/live?url=";
// 用来播放旧版本的视频流
// var httpUrl = "http://10.111.254.117:8865/live?url=";
// var httpUrl = "http://39.102.73.127/ws/live?url=";
$(function () {
    var storage = window.localStorage.getItem('currentDataUser');
    var token = JSON.parse(storage).token;
    // var token = "a0a8acddd04742aaa03b94271cd9a5e3";

    leftNavList(name = "", type);

    // left tabs button
    $('.tabs-btn').on('click', 'span', function () {
        $('.left-nav').unbind();
        $(this).addClass('active').siblings().removeClass('active');
        type = $(this).index();
        leftNavList(name = "", type);
    })

    // search list nav
    $('#input').on('keyup', function (e) {
        if (e.keyCode == 13) {
            leftNavList($(this).val(), type);
        }
    })
    $('#inputBtn').on('click', function () {
        leftNavList($('#input').val(), type);
    })
    $('#getpathbtn').on('click', function () {
        getcallback();
    })


    // left list nav
    function leftNavList(name, type) {
        request.url = request.Url + request.findAll
        request.method = "get"
        request.data = {
            name: name,
            type: type,
            page: 1,
            size: 10000
        }
        request.token = {
            'Authorization': 'token ' + token
        }
        request.redata = function (data) {
            if (data.code === 1) {
                let htmlCon = ''
                $.each(data.data.content, function (index, item) {
                    if (index === 0) {
                        htmlCon += '<li class="active" id=' + item.id + '>' + item.name + '</li>';
                        equipmentList(item.id);
                    } else {
                        htmlCon += '<li id=' + item.id + '>' + item.name + '</li>';
                    }
                })
                $('.left-nav').html(htmlCon);
                $('.left-nav').on('click', 'li', function (e) {
                    $(this).addClass('active').siblings().removeClass('active');
                    equipmentList($(this).attr('id'));
                })
            }
        }
        request.run();
    }

    // camera list
    function equipmentList(organizationId) {
        request.url = request.Url + request.monitorFindAll
        request.method = "get"
        request.data = {
            organizationId: organizationId,
            name: "",
            type: "",
        }
        request.token = {
            'Authorization': 'token ' + token
        }
        request.redata = function (data) {
            if (data.code === 1) {
                let tabsVideo = '<span class="active">不限</span>';
                let videoHtml = '';
                $.each(data.data.content, function (index, item) {
                    tabsVideo += '<span data-id="' + item.id + '">' + item.name + '</span>';
                    videoHtml += '<li><div id="' + item.id + '"></div><p>' + item.name + '</p></li>';
                });
                $('.right-tabs').html(tabsVideo);
                $('.video-list').html(videoHtml);
                let w = $('.video-list li').innerWidth();
                let h = $('.video-list li').innerHeight() - 30;
                $.each(data.data.content, function (index, item) {
                    detailsIdVideo(item.id, httpUrl + item.url, w, h);
                    // detailsIdVideo(item.id, item.url, item.type, w, h);
                });
                $('.right-tabs').on('click', 'span', function () {
                    $(this).addClass('active').siblings().removeClass('active');
                    let id = $(this).attr('data-id');
                    if (id) {
                        videoDetailsFun(id);
                    } else {
                        let videoHtml1 = '';
                        $.each(data.data.content, function (index, item) {
                            videoHtml1 += '<li><video id="' + item.id + '" controls autoplay width="300" height="300"></video><p>' + item.name + '</p></li>';
                            // videoHtml1 += '<li><div id="' + item.id + '"></div><p>' + item.name + '</p></li>';
                        });
                        $('.video-list').html(videoHtml1);
                        $.each(data.data.content, function (index, item) {
                            detailsIdVideo(item.id, httpUrl + item.url, w, h);
                            // detailsIdVideo(item.id, item.url, item.type, w, h);
                        });
                    }
                })
            }
        }
        request.run();
    }

    // video details
    function videoDetailsFun(id) {
        request.url = request.Url + request.videoDetails
        request.method = "get"
        request.data = {
            id: id
        }
        request.token = {
            'Authorization': 'token ' + token
        }
        request.redata = function (data) {
            if (data.code === 1) {
                let w = $('.video-list').innerWidth();
                let h = $('.video-list').innerHeight();
                let input = '<div id="playback"><div class="layui-input-inline"><input type="text" class="layui-input" id="playbackTime" placeholder="选择回放时间"></div></div>';
                // $('.video-list').html('<div id="videoId">' + input + '</div>')
                $('.video-list').html('<video id="videoId" controls autoplay width="' + w + '" height="' + h + '">' + input + '</video>')
                detailsIdVideo("videoId", httpUrl + data.data.url, w, h);
                // detailsIdVideo("videoId", data.data.url, data.data.type, w, h);
                layui.use('laydate', function () {
                    var laydate = layui.laydate;
                    laydate.render({
                        elem: '#playbackTime',
                        format: 'yyyyMMddHHmmss',
                        type: 'datetime',
                        range: true,
                        done: function (value) {
                            playbackDetails(value, data.data.id);
                        }
                    });
                })
            }
        }
        request.run();
    }

    // playback details
    function playbackDetails(time, id) {
        request.url = request.Url + request.playback
        request.method = "get"
        request.data = {
            id: id,
            starttime: time.split('-')[0],
            endtime: time.split('-')[1]
        }
        request.token = {
            'Authorization': 'token ' + token
        }
        request.redata = function (data) {
            if (data.code === 1) {
                let w = $('.video-list').innerWidth();
                let h = $('.video-list').innerHeight();
                detailsIdVideo("videoId", httpUrl + data.data.url, w, h);
                // detailsIdVideo("videoId", data.data.url, data.data.type, w, h);
            }
        }
        request.run();
    }

    function detailsIdVideo(id, url, w, h) {
        // let player = new FlvPlayer({
        //     id: id,
        //     url: url,
        //     hasVideo: true,
        //     hasAudio: true,
        //     volume: false,//音频
        //     isLive: true,
        //     // playbackRate: [0.75, 1, 1.5, 2],   // 当前播放速度
        //     // defaultPlaybackRate: 1,
        //     // playsinline: true,
        //     height: h,
        //     width: w,
        //     loop: false,
        //     loading: true,
        //     error: true,
        //     keyboard: true,
        //     screenShot: true,
        //     replay: true,
        //     lang: 'zh-cn'
        // });
        // player.play();
        if (flvjs.isSupported()) {
            var flvPlayer = flvjs.createPlayer({
                type: 'flv',
                url: url,
                hasVideo: true,
                hasAudio: true,
                // volume: false,//音频
                isLive: true,
                replay: true,
                lang: 'zh-cn'
            });
            flvPlayer.attachMediaElement(id);
            flvPlayer.load(); //加载
        }
    }

    function getcallback() {
        request.url = request.Url + request.loginCallBack
        request.method = "get"
        request.data = {}
        request.token = {
            'Authorization': 'token ' + token
        }
        request.redata = function (data) {
            if (data.code === 1) {
                window.open(data.data);
            }
        }
        request.run();
    }

})
