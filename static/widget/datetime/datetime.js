/* 
 * 日期插件
 * 滑动选取日期（年，月，日）
 * V1.1
 */

(function ($) {
    $.fn.dateTime = function (options) {
        //插件默认选项
        var that = $(this);


        var index1 = 1, index2 = 1, index3 = 1, index4 = 1;

        var nowdate = new Date();
        var initStartH = parseInt(nowdate.getHours()) >= 10 ? nowdate.getHours() : "0" + nowdate.getHours();
        var initStartI = parseInt(nowdate.getMinutes()) >= 10 ? nowdate.getMinutes() : "0" + nowdate.getMinutes();


        var scroll1 = null, scroll2 = null, scroll3 = null, scroll4 = null;

        $.fn.dateTime.defaultOptions = {
            id: "j_timeSelect",
            title: "请选择日期",
            s1: 1,
            s2: 0,
            showCur: true,
            curdate: "",                   //打开日期是否定位到当前日期
            mode: null,                       //操作模式（滑动模式）
            event: "click",                    //打开日期插件默认方式为点击后后弹出日期 
            show: true,
            beforeCheck: function(){
                return true;
            },
            okCallback: function () {

            },
            cancelCallback: function () {

            }
        };

        //用户选项覆盖插件默认选项   
        var opts = $.extend({}, $.fn.dateTime.defaultOptions, options);

        if (!opts.show) {
            that.unbind('click');
        } else {
            //绑定事件（默认事件为获取焦点）
            that.bind(opts.event, function () {
                var flag = opts.beforeCheck();
                if(flag) {
                    createUL();      //动态生成控件显示的日期
                    init_iScroll();
                    extendOptions(); //显示控件
                    that.blur();
                    initDate();
                    bindButton();
                }
                
            })
        }

        //初始化时间
        function initDate() {
            if (opts.curdate != "" && opts.showCur) {
                // var dateStr = opts.curdate.split("-");
                // var startHM = dateStr[0].split(":");
                // initStartH = startHM[0];
                // initStartI = startHM[1];
            }
            var pos = getPosTime(initStartH, initStartI);
            //console.log(JSON.stringify(pos));
            scroll1.refresh();
            scroll2.refresh();
            

            scroll1.scrollTo(0, pos.pos1 * 40, 100, true);
            scroll2.scrollTo(0, pos.pos2 * 40, 100, true);
            // scroll3.scrollTo(0, pos.pos1 * 40, 100, true);
            // scroll4.scrollTo(0, pos.pos2 * 40, 100, true);
        }

        //获取选项位置
        function getPosTime(v1, v2) {
            var pos1 = $("#" + opts.id).find("#scroll1 ul li[data-val='" + v1 + "']").index() - 2;
            var pos2 = $("#" + opts.id).find("#scroll2 ul li[data-val='" + v2 + "']").index() - 2;
            return {
                pos1: pos1,
                pos2: pos2
            }
        }

        function bindButton() {
            $("#" + opts.id).find(".okBtn").unbind('click').click(function () {
                if(scroll1.animating || scroll2.animating || scroll3.animating || scroll4.animating) {
                
                } else {
                    var dataVal = getDateVal();
                    //console.log(formateTime(dataVal));
                    opts.okCallback(dataVal);
                    $("#" + opts.id).hide();
                }
                
            });

            $("#" + opts.id).find(".cancelBtn").click(function () {
                opts.cancelCallback();
                $("#" + opts.id).hide();
            });
        }

        function getDateVal() {

            var pos1 = (scroll1.y / 40) * (-1) + 2;
            var pos2 = (scroll2.y / 40) * (-1) + 2;
            var pos3 = (scroll3.y / 40) * (-1) + 2;
            var pos4 = (scroll4.y / 40) * (-1) + 2;

            var s1 = $("#" + opts.id).find("#scroll1 ul li:eq(" + pos1 + ")").attr("data-val");
            var s2 = $("#" + opts.id).find("#scroll2 ul li:eq(" + pos2 + ")").attr("data-val");
            var s3 = $("#" + opts.id).find("#scroll3 ul li:eq(" + pos3 + ")").attr("data-val");
            var s4 = $("#" + opts.id).find("#scroll4 ul li:eq(" + pos4 + ")").attr("data-val");
            return {
                s1: s1,
                s2: s2,
                s3: s3,
                s4: s4
            }
        }

        function formateTime(data) {
            return data.s1 + ":" + data.s2 + "-" + data.s3 + ":" + data.s4;
        }

        function extendOptions() {
            $("#" + opts.id).show();
        }


        function createUL() {
            var tpl = __inline("/static/tpl/datetime.tpl");
            var html = tpl({
                id: opts.id,
                title: opts.title,
                type: ""
            });
            if ($("#" + opts.id).length == 0) {
                $("body").append(html);
                $("#" + opts.id).find("#scroll1 ul").html(createList(opts.s1, 24, "时"));
                $("#" + opts.id).find("#scroll2 ul").html(createList(opts.s2, 59, "分"));
                $("#" + opts.id).find("#scroll3 ul").html(createList(opts.s1, 24, "时"));
                $("#" + opts.id).find("#scroll4 ul").html(createList(opts.s2, 59, "分"));
            }
            
        }

        //日期滑动
        function init_iScroll() {

            scroll1 = new iScroll("scroll1", {
                snap: "li",
                vScrollbar: false,
                onScrollEnd: function () {
                    index1 = (this.y / 40) * (-1) + 2;
                    resetBuild3(index1, 'scroll1', 'scroll3');
                    scroll3.refresh();
                    // scroll3.scrollTo(0, pos.pos1 * 40, 100, true);
                }
            });

            scroll2 = new iScroll("scroll2", {
                snap: "li",
                vScrollbar: false,
                onScrollEnd: function () {
                    index2 = (this.y / 40) * (-1) + 2;
                    resetBuild4(index2, 'scroll2', 'scroll4');
                    scroll4.refresh();
                    // scroll4.scrollTo(0, pos.pos2 * 40, 100, true);
                }
            });

            scroll3 = new iScroll("scroll3", {
                snap: "li",
                vScrollbar: false
            });

            scroll4 = new iScroll("scroll4", {
                snap: "li",
                vScrollbar: false
            });
        }

        //创建列表
        function createList(start, end, suffix) {
            var start = parseInt(start);
            var end = parseInt(end);
            var str = "<li>&nbsp;</li><li>&nbsp;</li>";
            for (var i = start; i <= end; i++) {
                if (i < 10) {
                    i = "0" + i;
                }
                str += '<li data-val="' + i + '">' + i + suffix + '</li>'
            }
            str += '<li>&nbsp;</li><li>&nbsp;</li>';
            return str;
        }

        function resetBuild3(index, m1, m2) {
            var s1 = $("#" + opts.id).find("#" + m1 + " ul li:eq(" + index + ")").attr("data-val");
            var list = createList(s1, 24, "时");
            $("#" + opts.id).find("#" + m2 + " ul").html(list);
            // scroll3 = new iScroll("scroll3", {
            //     snap: "li",
            //     vScrollbar: false,
            //     onScrollEnd: function () {
            //         index3 = (this.y / 40) * (-1) + 2;
            //     }
            // });          
        }

        function resetBuild4(index, m1, m2) {
            var s2 = $("#" + opts.id).find("#" + m1 + " ul li:eq(" + index + ")").attr("data-val");
            var list = createList(s2, 59, "分");
            $("#" + opts.id).find("#" + m2 + " ul").html(list);
            // scroll4 = new iScroll("scroll4", {
            //     snap: "li",
            //     vScrollbar: false,
            //     onScrollEnd: function () {
            //         index4 = (this.y / 40) * (-1) + 2;
            //     }
            // });

        }

    }
})(Zepto);  
