var app_down = {
    init: function (click_ele) {
        //点击事件
        $(click_ele).on("tap", function () {

            if (isWeixin()) {
                location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ufenqi.app';
            } else {
                alert("请在微信中下载");
            }
            return false;

        });

        //判断微信环境
        function isWeixin() {
            var ua = navigator.userAgent.toLowerCase();
            return (ua.match(/MicroMessenger/i) == "micromessenger");
        }
    }
};

module.exports = app_down;