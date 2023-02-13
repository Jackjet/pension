var classModule = {
    session: function () {
        if ($.cookie('session') !== undefined) {
            return JSON.parse($.cookie('session'));
        } else {
            return ''
        }
    }
}

var GeneralPart = (function (index) {
    $('header').html(templates().header(classModule, index));
    $('footer').html(templates().footer(index));
})

function GetQueryString (Param) {
    var BreakString = new RegExp("(^|&)" + Param + "=([^&]*)(&|$)")
    var GetUrl = window.location.search.substr(1).match(BreakString)
    if (GetUrl != null) {
        return unescape(GetUrl[2])
    } else {
        return null
    }
}

function QueryString (Param) {
    var BreakString = new RegExp("(^|&)" + Param + "=([^&]*)(&|$)")
    var GetUrl = window.location.search.substr(1).match(BreakString)
    if (GetUrl != null) {
        return unescape(GetUrl[2])
    } else {
        return null
    }
}

function addLoadEvent (func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

function changeMoney (num) {
    var regexp = /(?:\.0*|(\.\d+?)0+)$/
    num = (num / 100).toFixed(2)
    num = num.replace(regexp, '$1')
    return num
}

function uniq (array) {
    var temp = [];
    var index = [];
    var l = array.length;
    for (var i = 0; i < l; i++) {
        for (var j = i + 1; j < l; j++) {
            if (array[i] === array[j]) {
                i++;
                j = i;
            }
        }
        temp.push(array[i]);
        index.push(i);
    }
    return temp;
}


function CurrentTime () {
    var myDate = new Date;
    var year = myDate.getFullYear();
    var mon = myDate.getMonth() + 1;
    var date = myDate.getDate();
    var h = myDate.getHours();
    var m = myDate.getMinutes();
    var s = myDate.getSeconds();
    return year + '-' + mon + '-' + date + " " + h + ":" + m + ":" + s
}

function CurrentTimee () {
    var myDate = new Date;
    var year = myDate.getFullYear();
    var mon = myDate.getMonth() + 1;

    mon = mon<10 ? "0"+mon:mon ;
    var date = myDate.getDate();
    date = date<10 ? "0"+date:date ;


    return year + '-' + mon + '-' + date
}

function CurrentTimeSecond () {
    var myDate = new Date;
    var h = myDate.getHours();
    var m = myDate.getMinutes();
    var s = myDate.getSeconds();
    return  h+1 + ":" + m + ":" + s
}

function MonthBefor () {
    var resultDate, year, month, date, hms;
    var currDate = new Date();
    year = currDate.getFullYear();
    month = currDate.getMonth() + 1;
    date = currDate.getDate();
    hms = currDate.getHours() + ':' + currDate.getMinutes() + ':' + (currDate.getSeconds() < 10 ? '0' + currDate.getSeconds() : currDate.getSeconds());
    switch (month) {
        case 1:
        case 2:
        case 3:
            month += 9;
            year--;
            break;
        default:
            month -= 3;
            break;
    }
    month = (month < 10) ? ('0' + month) : month;
    resultDate = year + '-' + month + '-' + date + ' ' + hms;
    return resultDate;
}

function getPastHalfYear () {
    // 先获取当前时间
    var curDate = (new Date()).getTime();
    // 将半年的时间单位换算成毫秒
    var halfYear = 365 / 2 * 24 * 3600 * 1000;
    var pastResult = curDate - halfYear;  // 半年前的时间（毫秒单位）

    // 日期函数，定义起点为半年前
    var pastDate = new Date(pastResult),
        pastYear = pastDate.getFullYear(),
        pastMonth = pastDate.getMonth() + 1,
        pastDay = pastDate.getDate();

    return pastYear + '-' + pastMonth + '-' + pastDay;
}


function getPassYearFormatDate () {
    var nowDate = new Date();
    var date = new Date(nowDate);
    date.setDate(date.getDate() - 365);
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

function notOpen () {
    layer.open({
        title: '温馨提示',
        skin: 'my-skin',
        content: '此功能正在升级！'
    });
    return false
}


// 判断是否在时间段内
function time_range(beginTime, endTime, nowTime) {//判断是否在缴费查询时间
    
    var strb = beginTime.split (":");
    if (strb.length != 3) {
      return false;
    }
   
    var stre = endTime.split (":");
    if (stre.length != 3) {
      return false;
    }
   
    var strn = nowTime.split (":");
    if (stre.length != 3) {
      return false;
    }
    var b = new Date ();
    var e = new Date ();
    var n = new Date ();
   
    b.setHours (strb[0]);
    b.setMinutes (strb[1]);
    b.setSeconds(strb[2]);
    e.setHours (stre[0]);
    e.setMinutes (stre[1]);
    e.setSeconds(stre[2]);
    n.setHours (strn[0]);
    n.setMinutes (strn[1]);
    n.setSeconds(strn[2]);
    if ( (n.getTime () - b.getTime () > 0 || n.getTime () - b.getTime () === 0)  && (n.getTime () - e.getTime () < 0 || n.getTime () - e.getTime () === 0) ) {
        if(n.getTime () - e.getTime () === 0){
            return false;
        }else{
            return true;
        }
      
    } else {
      if(b.getTime () > n.getTime ()){ 
        return true 
      } 
      else{
        return false;
      }
    }
}
  
  
