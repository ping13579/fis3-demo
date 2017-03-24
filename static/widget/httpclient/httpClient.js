/**
 * Created by ufenqi on 16/6/29.
 */
 __inline('/static/js/common/setCookie.js')
function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge);
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function() {callback(WebViewJavascriptBridge);}, false);
    }
};
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
};
connectWebViewJavascriptBridge(function(bridge) {
    bridge.init(function(message, responseCallback) {
        var data = {
            "Javascript Responds": "Wee!"
        };
        responseCallback(data)
    });
});

function appData() {
    var href = window.location.href;
    var app_data = {
        "type": "login",
        "url": "ufenqi://m.app.com/login",
        "refresh": href
    };
    return app_data
};
var cookie = require('/static/widget/cookie/cookie');

/**
 * post请求方法
 * @param url
 * @param data
 * @param success_callback
 * @param error_callback
 */
 //加入登陆判断的
function post(url, data, success_callback, error_callback) {
    client("POST", url, data, success_callback, error_callback);
}

/**
 * get请求方法
 * @param url
 * @param success_callback
 * @param error_callback
 */
function get(url, data, success_callback, error_callback) {
    client("GET", url, data, success_callback, error_callback);
}

/**
 * 跨域处理get
 * @param url
 * @param data
 * @param success_callback
 * @param error_callback
 */
function crossGet(url, data, success_callback, error_callback) {
    clientCross("GET", url, data, success_callback, error_callback);
}

/**
 * 跨域处理post
 * @param url
 * @param data
 * @param success_callback
 * @param error_callback
 */
function crossPost(url, data, success_callback, error_callback) {
    clientCross("POST", url, data, success_callback, error_callback);
}

//未加入登陆的
function unpost(url, data, success_callback, error_callback) {
    unclient("POST", url, data, success_callback, error_callback);
}
//判断版本
function getVersion(){
    var version1 = UFQ.util.getUrlParam("version");
    var version2 = "5.0.0";
    if (version1) {
        version1 = version1.split(".");
        version2 = version2.split(".");
        var num1 = version1[0] * 100 + version1[1] * 10 + version1[2] * 1;
        var num2 = version2[0] * 100 + version2[1] * 10 + version2[2] * 1;
        if (num1 >= num2 ){
                return true;
        }else{
                return false
        }
    }
}
function versionActions(data){
    if(getVersion()){
        setupWebViewJavascriptBridge(function(bridge) {
            bridge.callHandler("ActionWithUriPushVC", data, function(response) {})
        })
    }else{
        connectWebViewJavascriptBridge(function(bridge) {
            bridge.callHandler("ActionWithUriPushVC",data, function(response) {})
        })
    }
}
//加入登陆的post请求
function client(method, url, data, success_callback, error_callback) {
    $.ajax({
        type: method,
        url: url,
        data: data,
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        beforeSend: function (xhr) {
            setCookie.sendfunction(xhr);
        },
        success: function (resp) {
            // alert(resp.resultCode);
            if (resp.resultCode == 2 || resp.resultCode == 3) {
                console.log(resp.errorMessage);
                var ua = navigator.userAgent;
                if (ua.match(/iphone|ipad/i) != null ) {
                    if (UFQ.util.getUrlParam("source") == "app" || (ua.indexOf('_ufenqi_ios') > -1)) {
                        versionActions(appData())
                    }
                }else if (UFQ.util.getUrlParam("source") == "app" && ua.match(/android/i) != null ) {
                    // alert('555');
                    window.ufenqiJsInterface.openPage("ufenqi://m.app.com/login");
                }
            } else if (typeof(success_callback) != "undefined") {
                success_callback(resp);
            }
        },
        error: function (resp) {
            // alert('5555');
            if (typeof(error_callback) != "undefined") {
                error_callback(resp);
            }
        }
    });
}
function unclient(method, url, data, success_callback, error_callback) {
    $.ajax({
        type: method,
        url: url,
        data: data,
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (resp) {
            if (typeof(success_callback) != "undefined") {
                success_callback(resp);
            }
        },
        error: function (resp) {
            if (typeof(error_callback) != "undefined") {
                error_callback(resp);
            }
        }
    });
}

//跨域请求
function clientCross(method, url, data, success_callback, error_callback) {
    $.ajax({
        type: method,
        url: url,
        data: data,
        dataType: "jsonp",
        jsonp: "jsonpcallback",
        beforeSend: function (xhr) {
            var token = $.cookie("token");
            if (token) {
                //xhr.setRequestHeader("X-Auth-Token", token);
            }
        },
        success: function (resp) {
            // 后台系统状态：SYSTEM_NOT_LOGIN(2, "请登录"),SYSTEM_LOGIN_TIME_OUT(3, "登录超时，请重新登录"),
            if (resp.resultCode == 2 || resp.resultCode == 3) {
                window.location.href = "/page/index.html";
            } else if (typeof(success_callback) != "undefined") {
                success_callback(resp);
            }
        },
        error: function (resp) {
            if (typeof(error_callback) != "undefined") {
                error_callback(resp);
            }
        }
    });
}
module.exports = {
    post: post,
    get: get,
    crossGet: crossGet,
    crossPost: crossPost,
    unpost:unpost,
    versionActions:versionActions,
    connectWebViewJavascriptBridge:connectWebViewJavascriptBridge,
    setupWebViewJavascriptBridge:setupWebViewJavascriptBridge,
    getVersion:getVersion

};
