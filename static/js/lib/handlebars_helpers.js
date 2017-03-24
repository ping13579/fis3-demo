/**
 * Created by ufenqi on 16/6/29.
 */
var Handlebars =require('/static/js/lib/handlebars.js');
//注册一个比较大小的Helper,判断v1是否大于v2
Handlebars.registerHelper("larger", function (v1, v2, options) {
    if (v1 > v2) {
        //满足添加继续执行
        return 'show';
    } else {
        //不满足条件执行{{else}}部分
        return 'hide';
    }
});

/**
 * {{#compare name '==' 'peter'}}
 *   他的名字是peter
 *   {{else}}
 *   他的名字不是peter,而是{{name}}
 *{{/compare}}
 */
Handlebars.registerHelper('compare', function (left, operator, right, options) {
    if (arguments.length < 3) {
        throw new Error('Handlerbars Helper "compare" needs 2 parameters');
    }
    var operators = {
        '==': function (l, r) {
            return l == r;
        },
        '===': function (l, r) {
            return l === r;
        },
        '!=': function (l, r) {
            return l != r;
        },
        '!==': function (l, r) {
            return l !== r;
        },
        '<': function (l, r) {
            return l < r;
        },
        '>': function (l, r) {
            return l > r;
        },
        '<=': function (l, r) {
            return l <= r;
        },
        '>=': function (l, r) {
            return l >= r;
        },
        'typeof': function (l, r) {
            return typeof l == r;
        },
        'in': function (l, r) {
            return r.indexOf(l) > -1;
        }
    };
    if (!operators[operator]) {
        throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator);
    }
    var result = operators[operator](left, right);
    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

/**
 *判断是否是偶数
 * {{#if_even num}}
 *   {{this.num}}是偶数
 *{{else}}
 *   {{this.num}}是奇数
 *{{/if_even}}
 */
Handlebars.registerHelper('if_even', function (value, options) {
    if ((value % 2) == 0) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("equalTo", function (v1, v2, options) {
    return v1 == v2 ? true : false
});

Handlebars.registerHelper("largerThan", function (v1, v2, options) {
    return v1 > v2 ? true : false
});

Handlebars.registerHelper("lessThan", function (v1, v2, options) {
    return v1 < v2 ? true : false
});

Handlebars.registerHelper("brackes", function (v1, v2, options) {
    return v1 < v2 ? '|' : '';
});

Handlebars.registerHelper("getIndexObj", function (v1, v2, options) {
    return v1[v2];
});

/*
 * 格式化时间分钟
 */
Handlebars.registerHelper("formateHour", function (data, options) {
    return data.s1 + ":" + data.s2 + "-" + data.s3 + ":" + data.s4;
});


