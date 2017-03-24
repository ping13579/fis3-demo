/**
 * Created by ufenqi on 16/9/27.
 */

/**
 * 数组处理 es5
 * @returns {*[]}
 * 使用一个函数来检查数组值,并去重
 */
if (typeof Array.prototype.unique != "function") {
    Array.prototype.unique = function () {
        this.sort();
        var re = [this[0]];
        for (var i = 1; i < this.length; i++) {
            if (this[i] !== re[re.length - 1]) {
                re.push(this[i]);
            }
        }
        return re;
    };
}

/**
 * array forEach es5 常用
 *使用一个函数来检查一个数组值,如果满足给定的条件,就替换它
 */
if (typeof Array.prototype.forEach != "function") {
    Array.prototype.forEach = function (fn, context) {
        for (var k = 0, length = this.length; k < length; k++) {
            if (typeof fn === "function" && Object.prototype.hasOwnProperty.call(this, k)) {
                fn.call(context, this[k], k, this);
            }
        }
    };
}

/**
 * array map es5
 * 对数组中对每个元素执行一个函数并返回一个新数组
 */
if (typeof Array.prototype.map != "function") {
    Array.prototype.map = function (fn, context) {
        var arr = [];
        if (typeof fn === "function") {
            for (var k = 0, length = this.length; k < length; k++) {
                arr.push(fn.call(context, this[k], k, this));
            }
        }
        return arr;
    };
}

/**
 * array filter es5
 * 创建一个过滤后的数组
 */
if (typeof Array.prototype.filter != "function") {
    Array.prototype.filter = function (fn, context) {
        var arr = [];
        if (typeof fn === "function") {
            for (var k = 0, length = this.length; k < length; k++) {
                fn.call(context, this[k], k, this) && arr.push(this[k]);
            }
        }
        return arr;
    };
}

/**
 * array some es5
 */
if (typeof Array.prototype.some != "function") {
    Array.prototype.some = function (fn, context) {
        var passed = false;
        if (typeof fn === "function") {
            for (var k = 0, length = this.length; k < length; k++) {
                if (passed === true) break;
                passed = !!fn.call(context, this[k], k, this);
            }
        }
        return passed;
    };
}

/**
 * array every es5
 * 验证数组内容
 */
if (typeof Array.prototype.every != "function") {
    Array.prototype.every = function (fn, context) {
        var passed = true;
        if (typeof fn === "function") {
            for (var k = 0, length = this.length; k < length; k++) {
                if (passed === false) break;
                passed = !!fn.call(context, this[k], k, this);
            }
        }
        return passed;
    };
}

/**
 * array indexOf es5
 */
if (typeof Array.prototype.indexOf != "function") {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
        var index = -1;
        fromIndex = fromIndex * 1 || 0;
        for (var k = 0, length = this.length; k < length; k++) {
            if (k >= fromIndex && this[k] === searchElement) {
                index = k;
                break;
            }
        }
        return index;
    };
}

/**
 * commonjs 通用方法
 *
 *
 **/
window.UFQ = window.UFQ || {};
UFQ.util = UFQ.util || {};

/**
 * 移动端判断
 *
 **/
UFQ.util.isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    any: function () {
        return (UFQ.util.isMobile.Android() || UFQ.util.isMobile.BlackBerry() || UFQ.util.isMobile.iOS() || UFQ.util.isMobile.Windows());
    }
};

/**
 * 获取页面大小
 * @returns {{}}
 */
UFQ.util.pageSize = function () {
    var a = document.documentElement;
    var b = ["clientWidth", "clientHeight", "scrollWidth", "scrollHeight"];
    var c = {};
    for (var d in b) c[b[d]] = a[b[d]];
    c.scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
    c.scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    return c
};

/**
 * 进度条
 * @param inparams
 * @constructor
 */
UFQ.util.LoadingShow = function (inparams) {
    var params = {
        alpha: 0.35,
        bgColor: '#000',
        mZindex: 9997
    };
    if (inparams && typeof(inparams) == 'object') {
        for (var key in inparams) {
            if (key.match(/^_/)) {
                continue
            }
            params[key] = inparams[key]
        }
    }

    var _width = UFQ.util.pageSize()['scrollWidth'];
    var _height = UFQ.util.pageSize()['scrollHeight'];
    $(window).size(function () {
        _width = UFQ.util.pageSize()['scrollWidth'];
        _height = UFQ.util.pageSize()['scrollHeight']
    });
    var html = '<div id="loadingLayer" style="position:absolute;left:0;top:0;right:0;bottom:0;z-index:' + params.mZindex + ';width:' + _width + 'px;height:' + _height + 'px;background:' + params.bgColor + ';opacity:' + params.alpha + '"></div>';
    html += '<div id="loadingGif" style="position:absolute;left:50%;top:50%;margin-left:-16px;margin-top:-16px;"><img src="/static/img/loading.gif"></div>'
    $(html).appendTo('body').fadeIn(200);
};

/**
 * 隐藏进度条
 * @constructor
 */
UFQ.util.LoadingHide = function () {
    $('#loadingLayer').remove();
    $('#loadingGif').remove();
};

/**
 * 格式化金钱
 * @param s
 *
 **/
UFQ.util.fmoney = function (s, n, prefix) {
    n = n >= 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1],
        t = "";
    if (r) {
        r = "." + r;
    } else {
        r = "";
    }
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
    }
    return ((prefix != undefined ? prefix : "￥") + t.split("").reverse().join("") + r).replace("-,", "-");
};

/**
 * 金额格式化
 * @param s
 * @param n
 */
UFQ.util.format_money = function (s, n) {
    //小数点后只保留两位
    n = n > 0 && n <= 20 ? n : 3;
    s = s.replace(/,/g, "");
    var parts = s.split(".");
    var l = parts[0].split("").reverse();
    var t = "";
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    if (parts.length == 1) {
        return t.split("").reverse().join("");
    } else {
        var r = parts[1];
        if (r.length > 2) {
            r = r.substr(0, 2);
        }
        return t.split("").reverse().join("") + "." + r;
    }
};

UFQ.util.isValidMoneyFormat = function (moneyString) {
    var pattern = /^[\+|\-]?(\d{0,3})(\,?\d{3})*(\.|\.\d{1})/;
    return pattern.exec(moneyString);
};

/**
 * 截取字符串(支持中英文混合),中文占两个字符
 * @param str
 * @param n
 * @returns
 */
UFQ.util.subChinese = function (str, n) {
    if (!str || n <= 0) return "";
    var r = /[^\x00-\xff]/g;
    if (str.replace(r, "mm").length <= n) {
        return str;
    }
    var m = Math.floor(n / 2);
    for (var i = m; i < str.length; i++) {
        if (str.substr(0, i).replace(r, "mm").length >= n) {
            return str.substr(0, i) + "...";
        }
    }
    return str;
};

/**
 * 获取微信需要的授权地址
 * @returns {string}
 */
UFQ.util.getRealUrl = function () {
    var url = window.location.href;
    if (url.indexOf("#") > 0) {
        return url.substring(0, url.indexOf("#"));
    } else {
        return url;
    }
};

/**
 * ios的微信下面修改title不生效bug
 * @param title
 */
UFQ.util.setWeixinTitle = function (title) {
    document.title = title;
    var $iframe = $('<iframe src="/favicon.ico"></iframe>');
    $iframe.on('load', function () {
        setTimeout(function () {
            $iframe.off('load').remove();
        }, 0);
    }).appendTo('body');
};

/**
 * 获取地址栏参数
 * @param name
 * @returns {*}
 */
UFQ.util.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
};

/**
 * 判断浏览器
 */
UFQ.util.Browser = function () {
    var a = navigator.userAgent.toLowerCase();
    var u = navigator.userAgent;
    var b = {};
    b.isStrict = document.compatMode == "CSS1Compat";
    b.isFirefox = a.indexOf("firefox") > -1;
    b.isOpera = a.indexOf("opera") > -1;
    b.isSafari = (/webkit|khtml/).test(a);
    b.isSafari3 = b.isSafari && a.indexOf("webkit/5") != -1;
    b.isIE = !b.isOpera && a.indexOf("msie") > -1;
    b.isIE6 = !b.isOpera && a.indexOf("msie 6") > -1;
    b.isIE7 = !b.isOpera && a.indexOf("msie 7") > -1;
    b.isIE8 = !b.isOpera && a.indexOf("msie 8") > -1;
    b.isGecko = !b.isSafari && a.indexOf("gecko") > -1;
    b.isMozilla = document.all != undefined && document.getElementById != undefined && !window.opera != undefined;
    b.isTrident = u.indexOf('Trident') > -1;
    b.isPresto = u.indexOf('Presto') > -1;
    b.isWebKit = u.indexOf('AppleWebKit') > -1;
    b.isGecko = u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1;
    b.isMobile = !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/);
    b.isios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    b.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    b.isiPhone = u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1;
    b.isiPad = u.indexOf('iPad') > -1;
    b.isWebApp = u.indexOf('Safari') == -1;
    return b
}();
