require('/static/js/lib/zepto.js');
var Handlebars= require('/static/js/lib/handlebars.js');
require('/static/js/lib/handlebars_helpers.js');
var httpClient = require('/static/widget/httpclient/httpClient.js');

var example={
	init:function(){
		example.header();
		example.tablist();
		example.tabtpl();
		example.star();
		example.getStar();
		example.itemDetail();
	},
	header:function(){
		// header.tpl 的添加及传值方式
		var tpl1= __inline('/static/tpl/example/header.tpl');
		var template = Handlebars.compile(tpl1);
		var html = template({
			title: '岗位详情',
			oparete:'修改'
		});
		$('.header').html(html);
	},
	tablist:function(){
		// 动态设置tablist的宽度
		var tabli = $('.tablist').find('li');
		$('.tablist').each(function(){
		    var tabli = $(this).find('li');
		    var n = tabli.length;
			var w = 100/n;
			$(this).find('li').css('width', w+'%');
		});	
	},
	tabtpl:function(){
		// tablist.tpl 的添加及传值方式
		var data={
	        tablist:[
	            {	            
		            list:'Jixing',
		            active:true    
	            },
	            {	            
		            list:'daishenhe',
		            active:false    
	            },
	            {	            
		            list:'yiu',
		            active:true    
	            }
            ]
        }
        // console.log(data);
		var tpl2= __inline('/static/tpl/example/tablist.tpl');
		var template = Handlebars.compile(tpl2);
		var html = template({
			data: data
		});

		$('.tabDiv').html(html);
		example.tablist();
	},
	star:function(){
		// star.tpl 的添加及传值方式
		var tpl1= __inline('/static/tpl/example/star.tpl');
		var template = Handlebars.compile(tpl1);
		var html = template({
			title: '工作质量'
		});
		$('.star').html(html);
		//点击星星评价
		$('.comment-ul').find('li').tap(function(){
			var d = $(this).index();
			$(this).parent('.comment-ul').find('li').removeClass('starActive');
			//循环遍历添加星星
			for(var i = -1; i < d; i++){
				$('.comment-ul').find('li').eq(i+1).addClass('starActive');
			}			
		})
	},
	getStar:function(){
		httpClient.get('/api/uxbPostend/time',{},function(resp){
			var tpl= __inline('/static/tpl/example/star.tpl');
			var template = Handlebars.compile(tpl);
			var html = template({
				title: '工作质量'
			});
			
			$('.getStar').html(html);
			var d = resp.comment.star;
			console.log(d);
			//循环遍历添加星星			
			if(parseInt(d)==d){
				for(var i = 0; i < d; i++){
					$('.getStar').find('li').eq(i).addClass('starActive');
				}
			}else{
				var t=d.split('.');
				var D=t[0];
				var h = parseInt(D);
				for(var i = 0; i < D; i++){
					$('.getStar').find('li').eq(i).addClass('starActive');
				}
				$('.getStar').find('li').eq(h).addClass('starHalf');
			}
			
        },function(resp){
        	console.log(resp);
        });
	},
	itemDetail:function(){
		var tpl= __inline('/static/tpl/example/itemsDetail.tpl');
		var template = Handlebars.compile(tpl);	
		// console.log(tpl);		
			$('.itemsDetail').html(template({}));
	}
}
example.init();



