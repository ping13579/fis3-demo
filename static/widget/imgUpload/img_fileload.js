__inline('/static/js/common/setCookie.js');
var httpClient = require('/static/widget/httpclient/httpClient.js');
function appData() {
    var href = window.location.href;
    var app_data = {
        "type": "login",
        "url": "ufenqi://m.app.com/login",
        "refresh": href
    };
    return app_data
};  
var img_upload={
    init:function(click_el,preview_el,url,targetUrl,callback,goback,el){
            // img_upload.appinit();

            click_el.fileupload({
                url: url,//文件上传地址，当然也可以直接写在input的data-url属性内
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                beforeSend: function (xhr) {
                    //json格式传输，后台应该用@RequestBody方式接受
                    // xhr.setRequestHeader("Content-Type", "multipart/form-data");
                    setCookie.sendfunction(xhr);
                    $("#"+el).parent().addClass('imageUploadNow');
                },
                done: function (e, result) {
                    $("#"+el).parent().removeClass('imageUploadNow');
                    var jsonData = eval(result.result);
                    console.log(jsonData);
                    if (jsonData.resultCode == 2 || jsonData.resultCode == 3) {
                        console.log(jsonData.errorMessage);
                        var ua = navigator.userAgent;
                        if (ua.match(/iphone|ipad/i) != null ) {
                            if (UFQ.util.getUrlParam("source") == "app" || (ua.indexOf('_ufenqi_ios') > -1)) {
                                httpClient.versionActions(appData());
                            }
                        }else if (UFQ.util.getUrlParam("source") == "app" && ua.match(/android/i) != null ) {
                            window.ufenqiJsInterface.openPage("ufenqi://m.app.com/login")
                        }
                    } else if (jsonData.resultCode == 200) {
                        preview_el.attr('src',jsonData.data.imageFullUrl);
                        $(this).attr('data-src',jsonData.data.xdImageUrl)
                        callback && callback(jsonData);
                    }else if(jsonData.resultCode == 1){
                        alert(jsonData.message);
                    }else{
                        goback && goback(jsonData)
                    }
                },
                start: function (e,data ) {

                }
            });

    },
    appinit:function(){
            
    }
};
module.exports = img_upload;

		