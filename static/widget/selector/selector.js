/**
 * 选择框插件
 * 职位信息选择
 */
(function ($) {
    $.fn.Selector = function (options) {
        //插件默认选项
        var that = $(this);
        var docType = $(this).is('input');

        var initY = "";

        var YScroll = null;

        $.fn.Selector.defaultOptions = {
            id: "j_" + new Date().getTime(),
            title: "请选择职位",
            initValue: "",
            initData: [],
            type: "jpb",
            mode: null,                       //操作模式（滑动模式）
            event: "click",                    //打开日期插件默认方式为点击后后弹出日期 
            show: true,
            okCallback: function () {

            },
            cancelCallback: function () {

            }
        };

        //用户选项覆盖插件默认选项   
        var opts = $.extend({}, $.fn.Selector.defaultOptions, options);

        if (!opts.show) {
            that.unbind('click');
        } else {
            //绑定事件（默认事件为获取焦点）
            that.bind(opts.event, function () {
                createUL();
                init_iScroll();
                extendOptions(); //显示控件
                that.blur();
                initSelectItem();
                bindButton();
            })
        }

        function initSelectItem() {
            if (opts.initValue != "") {
                YScroll.refresh();
                var posY = $("#" + opts.id).find("#YScroll ul li[data-val='" + opts.initValue + "']").index() - 2;
                YScroll.scrollTo(0, posY * 40, 100, true);
            }
        }

        function bindButton() {
            $("#" + opts.id).find(".okBtn").unbind('click').click(function () {
                var data = getDateVal();
                //opts.initValue = data.value;
                $("#" + opts.id).hide();
                opts.okCallback(data);
            });

            $("#" + opts.id).find(".cancelBtn").click(function () {
                $("#" + opts.id).hide();
                opts.cancelCallback();
            });
        }

        //日期滑动
        function init_iScroll() {
            YScroll = new iScroll("YScroll", {
                snap: "li",
                vScrollbar: false,
                onScrollEnd: function () {

                }
            });
        }

        function getDateVal() {
            var posY = (YScroll.y / 40) * (-1) + 2;
            var selectItem = $("#" + opts.id).find("#YScroll ul li:eq(" + posY + ")");
            var value = selectItem.attr("data-val");
            var name = selectItem.attr("data-name");
            return {
                value: value,
                name: name
            };
        }

        function extendOptions() {
            $("#" + opts.id).show();
        }

        function createUL() {
            var tpl = __inline("/static/tpl/Selector.tpl");
            var html = tpl({
                id: opts.id,
                title: opts.title,
                data: opts.initData,
                type: opts.type
            });
            if ($("#" + opts.id).length == 0) {
                $("body").append(html);
            }
        }

    }
})(Zepto);  
