/* 
 * 日期插件
 * 滑动选取日期（年，月，日）
 * V1.1
 */

(function ($) {
    $.fn.date = function (options) {
        //插件默认选项
        var that = $(this);
        var docType = $(this).is('input');

        var nowdate = new Date();

        var initY = parseInt(nowdate.getFullYear());
        var initM = parseInt(nowdate.getMonth()) + 1;
        var initD = parseInt(nowdate.getDate());

        var YearStartScroll = null, MonthStartScroll = null, DayStartScroll = null;

        $.fn.date.defaultOptions = {
            id: "j_dateSelect",
            title: "请选择日期",
            beginyear: 1900,                 //日期--年--份开始
            endyear: 2020,                   //日期--年--份结束
            beginmonth: 1,                   //日期--月--份结束
            endmonth: 12,                    //日期--月--份结束
            beginday: 1,                     //日期--日--份结束
            endday: 31,                      //日期--日--份结束
            curdate: "",                   //打开日期是否定位到当前日期
            mode: null,                       //操作模式（滑动模式）
            event: "click",                    //打开日期插件默认方式为点击后后弹出日期 
            show: true,
            okCallback: function () {

            },
            cancelCallback: function () {

            }
        };

        //用户选项覆盖插件默认选项   
        var opts = $.extend({}, $.fn.date.defaultOptions, options);

        if (!opts.show) {
            that.unbind('click');
        } else {
            //绑定事件（默认事件为获取焦点）
            that.bind(opts.event, function () {
                createUL();      //动态生成控件显示的日期
                init_iScroll();
                extendOptions(); //显示控件
                that.blur();
                refreshTime();
                bindButton();
            })
        }

        function refreshTime() {
            YearStartScroll.refresh();
            MonthStartScroll.refresh();
            DayStartScroll.refresh();
            resetInitDete();
            //console.log("initY=======" + initY);

            var posY = $("#" + opts.id).find("#YearStartScroll ul li[data-val='" + initY + "']").index() - 2;
            var posM = $("#" + opts.id).find("#MonthStartScroll ul li[data-val='" + initM + "']").index() - 2;
            var posD = $("#" + opts.id).find("#DayStartScroll ul li[data-val='" + initD + "']").index() - 2;

            YearStartScroll.scrollTo(0, posY * 40, 100, true);
            MonthStartScroll.scrollTo(0, posM * 40, 100, true);
            DayStartScroll.scrollTo(0, posD * 40, 100, true);
        }

        function resetInitDete() {
            if (opts.curdate != "") {
                var dateStr = opts.curdate.split("-");
                //console.log("======222====" + dateStr);
                initY = dateStr[0];
                initM = dateStr[1];
                initD = dateStr[2];
            }
        }

        function bindButton() {
            $("#" + opts.id).find(".okBtn").unbind('click').click(function () {

                if(YearStartScroll.animating || MonthStartScroll.animating || DayStartScroll.animating) {
                
                } else {

                    var dataVal = getDateVal();
                    //opts.curdate = dataVal;
                    if (docType) {
                        that.val(dataVal);
                    } else {
                        that.html(dataVal);
                    }
                    $("#" + opts.id).hide();
                    opts.okCallback();
                }
            });

            $("#" + opts.id).find(".cancelBtn").click(function () {
                $("#" + opts.id).hide();
                opts.cancelCallback();
            });
        }

        //日期滑动
        function init_iScroll() {

            YearStartScroll = new iScroll("YearStartScroll", {
                snap: "li",
                vScrollbar: false,
                onScrollEnd: function () {
                    buildDaylist();
                }
            });

            MonthStartScroll = new iScroll("MonthStartScroll", {
                snap: "li",
                vScrollbar: false,
                onScrollEnd: function () {
                    buildDaylist();
                }
            });

            DayStartScroll = new iScroll("DayStartScroll", {
                snap: "li",
                vScrollbar: false,
                onScrollEnd: function () {
                    
                }
            });
        }

        function getDateVal() {
            
            var posY = (YearStartScroll.y / 40) * (-1) + 2;
            var posM = (MonthStartScroll.y / 40) * (-1) + 2;
            var posD = (DayStartScroll.y / 40) * (-1) + 2;
            var s1 = $("#" + opts.id).find("#YearStartScroll ul li:eq(" + posY + ")").attr("data-val");
            var s2 = $("#" + opts.id).find("#MonthStartScroll ul li:eq(" + posM + ")").attr("data-val");
            var s3 = $("#" + opts.id).find("#DayStartScroll ul li:eq(" + posD + ")").attr("data-val");
            return s1 + "-" + s2 + "-" + s3;

            
        }

        function extendOptions() {
            $("#" + opts.id).show();
        }

        function buildDaylist() {
            opts.endday = checkDays();
            //console.log("endday=======" + opts.endday);
            $("#" + opts.id).find("#DayStartScroll ul").html(createDay_UL());
            DayStartScroll.refresh();
        }

        function createUL() {

            CreateDateUI();
            $("#" + opts.id).find("#YearStartScroll ul").html(createYear_UL());
            $("#" + opts.id).find("#MonthStartScroll ul").html(createMonth_UL());
            $("#" + opts.id).find("#DayStartScroll ul").html(createDay_UL());
        }

        function CreateDateUI() {
            var tpl = __inline("/static/tpl/date.tpl");
            var html = tpl({
                id: opts.id,
                title: opts.title,
                type: ""
            });
            if ($("#" + opts.id).length == 0) {
                $("body").append(html);
            }
        }

        //创建年
        function createYear_UL() {
            var str = "<li>&nbsp;</li><li>&nbsp;</li>";
            for (var i = opts.beginyear; i <= opts.endyear; i++) {
                str += '<li data-val="' + i + '">' + i + '年</li>'
            }
            str += '<li>&nbsp;</li><li>&nbsp;</li>';
            return str;
        }

        //创建月份
        function createMonth_UL() {
            var str = "<li>&nbsp;</li><li>&nbsp;</li>";
            for (var i = opts.beginmonth; i <= opts.endmonth; i++) {
                if (i < 10) {
                    i = "0" + i;
                }
                str += '<li data-val="' + i + '">' + i + '月</li>'
            }
            str += '<li>&nbsp;</li><li>&nbsp;</li>';
            return str;
        }

        //创建天
        function createDay_UL() {
            var str = "<li>&nbsp;</li><li>&nbsp;</li>";
            for (var i = opts.beginday; i <= opts.endday; i++) {
                if (i < 10) {
                    i = "0" + i;
                }
                str += '<li data-val="' + i + '">' + i + '日</li>'
            }
            str += '<li>&nbsp;</li><li>&nbsp;</li>';
            return str;
        }

        //检查天
        function checkDays() {
            var posY = (YearStartScroll.y / 40) * (-1) + 2;
            var posM = (MonthStartScroll.y / 40) * (-1) + 2;

            var year = $("#" + opts.id).find("#YearStartScroll ul li:eq(" + posY + ")").attr("data-val");
            var month = $("#" + opts.id).find("#MonthStartScroll ul li:eq(" + posM + ")").attr("data-val");
            //alert(year + "====" + month);

            //定义当月的天数；
            var days;
            //当月份为二月时，根据闰年还是非闰年判断天数
            if (month == 2) {
                days = year % 4 == 0 ? 29 : 28;
            } else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                days = 31;
            } else {
                //其他月份，天数为：30.
                days = 30;
            }
            return days;
        }

    }
})(Zepto);  
