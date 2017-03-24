var validateRegExp = {
    //不为空
    "void": "^[\w\W]+$",
    //数字
    "number": "^[0-9]*$",
    // 六位验证码
    "code6": '^[0-9]{6}$',
    // 手机
    "mobile": "^1[3|4|5|7|8][0-9]\\d{8}$",
    //姓名
    "name": "^[A-Za-z0-9_\\-\\u4e00-\\u9fa5\\•?\\·?\\u4e00-\\u9fa5]+$",
    //身份证号
    "IDcard": '(^([0-9]{17}[0-9Xx]{1})$)|(^([0-9]{15})$)',
    //QQ号
    "qq": "^[1-9]([0-9]{4,10})$",
    // 邮件
    "email": "^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$",
    // 手机和邮箱
    'me': '^(([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3})|(0?(13|15|18|14|17)[0-9]{9})$',
    'pwd': '^[\W_a-zA-z0-9-]{8,20}$',
    // 银行卡号
    'bankNo': '^[0-9]{16,19}$'
};
var _min = 6;
var _max = 20;
var validateRules = {
    isNull: function (str) {
        return (str == "" || typeof str != "string");
    },
    isNumber: function (str) {
        return new RegExp(validateRegExp.number).test(str);
    },
    betweenLength: function (str, _min, _max) {
        return (str.length >= _min && str.length <= _max);
    },
    isPwd: function (str) {
        return new RegExp(validateRegExp.pwd).test(str);
    },
    isMobile: function (str) {
        return new RegExp(validateRegExp.mobile).test(str);
    },
    isQQ: function (str) {
        return new RegExp(validateRegExp.qq).test(str);
    },
    isEmail: function (str) {
        return new RegExp(validateRegExp.email).test(str);
    },
    isBankNo: function (str) {
        return new RegExp(validateRegExp.bankNo).test(str);
    },
    isIdCard: function (str) {
        return new RegExp(validateRegExp.IDcard).test(str);
    },
    isName: function (str) {
        return new RegExp(validateRegExp.name).test(str);
    },
    isCode6: function (str) {
        return new RegExp(validateRegExp.code6).test(str);
    }
};

module.exports = validateRules;
