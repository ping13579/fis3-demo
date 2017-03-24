module.exports = function(req, res, next) {
    var numbers =120000+parseInt(((Math.random()+0.3) * 10000));
    var numbers1 =12000+parseInt(((Math.random()+0.3) * 10000));
    var data={
        errorCode:0,
        result:[{
            icon:'实习',
            title:'高薪周末活动执行人员1',
            single:'150元/天',
            area:'朝阳',
            date:'长期接受报名',
            uissueing:'2016-10-30',
            company:'实名企业',
            hash:'20160101'
        },{
            icon:'实习',
            title:'高薪周末活动执行人员2',
            single:'150元/天',
            area:'朝阳',
            date:'长期接受报名',
            uissueing:'2016-10-30',
            company:'实名企业',
            hash:'20160102'
        },{
            icon:'实习',
            title:'高薪周末活动执行人员1',
            single:'150元/天',
            area:'朝阳',
            date:'长期接受报名',
            uissueing:'2016-10-30',
            company:'实名企业',
            hash:'20160103'
        },{
            icon:'实习',
            title:'高薪周末活动执行人员2',
            single:'150元/天',
            area:'朝阳',
            date:'长期接受报名',
            uissueing:'2016-10-30',
            company:'实名企业',
            hash:'20160104'
        },{
            icon:'实习',
            title:'高薪周末活动执行人员1',
            single:'150元/天',
            area:'朝阳',
            date:'长期接受报名',
            uissueing:'2016-10-30',
            company:'实名企业',
            hash:'20160105'
        },{
            icon:'实习',
            title:'高薪周末活动执行人员2',
            single:'150元/天',
            area:'朝阳',
            date:'长期接受报名',
            uissueing:'2016-10-30',
            company:'实名企业',
            hash:'20160106'
        },{
            icon:'实习',
            title:'高薪周末活动执行人员1',
            single:'150元/天',
            area:'朝阳',
            date:'长期接受报名',
            uissueing:'2016-10-30',
            company:'实名企业',
            hash:'20160107'
        },{
            icon:'实习',
            title:'高薪周末活动执行人员2',
            single:'150元/天',
            area:'朝阳',
            date:'长期接受报名',
            uissueing:'2016-10-30',
            company:'实名企业',
            hash:'20160108'
        },{
            icon:'实习',
            title:'高薪周末活动执行人员3',
            single:'150元/天',
            area:'朝阳',
            date:'长期接受报名',
            uissueing:'2016-10-30',
            company:'实名企业',
            hash:'20160109'
        },{
            icon:'实习',
            title:'高薪周末活动执行人员4',
            single:'150元/天',
            area:'朝阳',
            date:'长期接受报名',
            uissueing:'2016-10-30',
            company:'实名企业',
            hash:'20160110'
        }],

        result:[
            {
                success:true,
                num:numbers
            },
            {
                num:numbers1
            }
        ]

    };


    // {resultCode: 200, success: true,…}
    // data
    //     :
    // {hasPostCity: [{citys: [{name: "北京市", code: "110100"}], alpha: "B"},…],…}
    // hasPostCity
    //     :
    //     [{citys: [{name: "北京市", code: "110100"}], alpha: "B"},…]
    // hotCityList
    //     :
    //     [{name: "北京", code: "110100"}, {name: "济南", code: "250100"}, {name: "南京", code: "200100"},…]
    // message
    //     :
    //     "OK"
    // requestSuccess
    //     :
    //     true
    // resultCode
    //     :
    //     200
    // success
    //     :
    //     true
    res.end(JSON.stringify(data));
};