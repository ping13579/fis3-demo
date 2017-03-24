var httpClient = require('/static/widget/httpclient/httpClient.js');
function judgeIsapp(){
    var urlParam = UFQ.util.getUrlParam("source");
    if(urlParam === "app" || (getTitleActions.opts.ua.indexOf('_ufenqi_ios') > -1)){
        return true
    }else{
        return false
    }
}
var getTitleActions = {
    opts:{
        ua:navigator.userAgent
    },
    init:function(datas,leftActions,rightActions){//app 头部加入左边按钮和右边按钮的方法
        if(this.opts.ua.match(/iphone|ipad/i) != null){
            getTitleActions.getActions(httpClient.setupWebViewJavascriptBridge,datas,leftActions,rightActions);
        }else if(this.opts.ua.match(/android/i) != null){
            getTitleActions.getActions(httpClient.connectWebViewJavascriptBridge,datas,leftActions,rightActions);
        }
    },
    getActions:function(m,datas,leftActions,rightActions){
        var a =function(bridge) {
            bridge.registerHandler('getUserActions', function(data, responseCallback) {
                if(data == 'getTitle'){
                    responseCallback(JSON.stringify(datas));
                }else if(datas.left.itemId == data){
                    leftActions && leftActions(bridge)
                }else if(datas.right.itemId == data){
                    rightActions && rightActions(bridge)
                }
            })
        };
        m(a);
    },
    comeBackActions:function(){  //app安卓端需要加左边返回按钮的方法
        if(this.opts.ua.match(/android/i) != null){
            window.ufenqiJsInterface.callPageBack('');
        }
    }
};
module.exports ={
    getTitleActions:getTitleActions,
    judgeIsapp:judgeIsapp
};