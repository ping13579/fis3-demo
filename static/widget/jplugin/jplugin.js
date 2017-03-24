/**
 * Created by ufenqi on 16/6/29.
 */

;(function($) {
    //定义Beautifier的构造函数
    var Beautifier = function(ele, opt) {
        this.$element = ele;
        this.defaults = {
            'color': 'red',
            'fontSize': '30px',
            'textDecoration': 'none'
        };
        this.options = $.extend({}, this.defaults, opt);
    };
    
    //定义Beautifier的方法
    Beautifier.prototype = {
        init: function () {
            var self = this;
            self.beautify();
        },
        beautify: function() {
            var self = this;
            console.log("this======" + self.$element);
            self.$element.css({
                'color': this.options.color,
                'fontSize': this.options.fontSize,
                'textDecoration': this.options.textDecoration
            });
        }
    };
    
    //在插件中使用Beautifier对象
    $.fn.myPlugin = function(options) {
        //创建Beautifier的实体
        var beautifier = new Beautifier(this, options);
        //调用其方法
        return beautifier.init();
    }
    
})(Zepto);