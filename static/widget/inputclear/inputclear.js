/**
 * Created by ufenqi on 16/6/29.
 */

;(function($) {
    //定义inputClear的构造函数
    var inputClear = function(ele, opt) {
        this.$element = ele;
        this.defaults = {
            'color': 'red',
            'fontSize': '30px',
            'textDecoration': 'none'
        };
        this.options = $.extend({}, this.defaults, opt);
    };
    
    //定义inputClear的方法
    inputClear.prototype = {
        init: function () {
            var self = this;
            self.bindPage();
        },
        bindPage: function() {
            var self = this;
            self.$element.find('.ic-close').each(function() {
                $(this).on("tap click", function() {
                    $(this).prev('input.u-text').val('').focus();
                });
            });

            self.$element.find('input.u-text').each(function() {
                $(this).on("input focus", function() {
                    var e = $(this).val().trim().length;
                    e > 0 ? $(this).next(".ic-close").show() : $(this).next(".ic-close").hide();
                });

                $(this).on("blur", function() {
                    var e = $(this);
                    setTimeout(function() {
                        e.next(".ic-close").hide();
                    }, 200);
                });
            });
        }
    };
    
    //在插件中使用inputClear对象
    $.fn.inputClear = function(options) {
        //创建inputClear的实体
        var clearBtn = new inputClear(this, options);
        //调用其方法
        return clearBtn.init();
    };
    
})(Zepto);

