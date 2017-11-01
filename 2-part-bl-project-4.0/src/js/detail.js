//////----------详情页的js,点击列表页的内容进来，有放大镜的功能，点击加入购物车=------------------------
//function hidelist(obj) {
//	this.obj = obj;
//	this.pp = this.obj.children().eq(0).find("span");
//	this.second = this.obj.children().eq(1);
//	this.init();
//}
//
//hidelist.prototype = {
//	init: function() {
//		this.menu();
//	},
//	menu: function() {
//		var that = this;
//		this.obj.hover(function() {
//			// console.log(2)
//			that.obj.children().eq(1).css("display", "block");
//			that.obj.css({
//				"background": "#fff",
//				"borderColor": "#e2e2e2"
//			});
//			that.obj.children().eq(0).css("color", "#cd1c1c")
//		}, function() {
//			that.obj.children().eq(1).css("display", "none");
//			that.obj.css({
//				"background": "#f7f7f7",
//				"borderColor": "#f7f7f7"
//			})
//			that.obj.children().eq(0).css("color", "#666")
//		})
//	}
//
//}
//new hidelist($(".a_div_1"));
//new hidelist($(".a_div_2"));
//new hidelist($(".a_div_3"));
//new hidelist($(".a_div_4"));
//new hidelist($(".web"));
////--------------------------------指向nav的时候变红---------------------------------
//$(".list-nav-wrap-right").find("li").hover(function() {
//	$(this).css({
//		"background": "red"
//	});
//}, function() {
//	$(this).css({
//		"background": ""
//	});
//})
////--------------------------------指向left的时候list下滑---------------------------------
//$("#list-nav .list-nav-wrap-left").hover(function() {
//	$(this).find(".banner-wrap-left").stop().slideDown();
//}, function() {
//	$(this).find(".banner-wrap-left").stop().slideUp();
//})






//--------------------------------ajax数据获取-----转移到common.js里面----------------------------
//$.ajax({
//	type: "get",
//	url: "../json/list-goods.json",
//	async: true,
//	success: function(str) {
//		var arr = str.list;
//		$.each(arr, function(i, obj) {
//			if(type == obj.type) {
//				//添加放大镜的两张图片
//				var img1 = $("<img src='" + obj.src + "'/>");
//				$("#detail .detail-wrap .detail-wrap-left #small").append(img1);
//				img1.addClass("small-img");
//
//				var img2 = $("<img src='" + obj.src + "'/>");
//				$("#detail .detail-wrap .detail-wrap-left #big").append(img2);
//				img2.addClass("big-img");
//				//添加名称
//				var intr = obj.introduce;
//				$("#detail .detail-wrap .detail-wrap-right ._name").append(intr);
//				//添加价钱
//				var pri = obj.price;
//				$("#detail .detail-wrap .detail-wrap-right ._price").append(pri);
//				//-----------------点击加入到加入到购物车里面----（最恶心的一块)------------------------------------
//				$("#detail .detail-wrap .detail-wrap-right .buy .jiaru").click(function(){
//					var o = getCookie("g"+obj.type);
//					if( o ){	// 表示之前保存过该商品cookie
//						obj.num = Number(o.num)+1;
//					}else{		// 表示之前没有保存过该商品cookie
//						obj.num = 1;
//					}
//					setCookie("g"+obj.type, obj, 10);
//	             	// 根据当前商品，创建图片	
//					//从cookie中获取所需要的数据--
//					showcar();
//	
//				});
//				showcar();
//				function showcar(){
//					$(".shopping_res ul").html("");
//					var num=getGoodsCookies(function(_name,obj){
//						var lis = $("<li></li>")
//						 lis.appendTo($(".shopping_res ul"));
//						 lis.addClass("lis");
//						 var tmpimg = $("<img src='"+obj.src+"'/>");
//						 lis.append(tmpimg);
//						 tmpimg.addClass("tmpimg");
//						 //创建名字--
//						 var goods_name = $("<div></div>");
//						 lis.append(goods_name);
//						 var objname= obj.introduce;
//						 goods_name.addClass("goods_name");
//						 goods_name.append(objname)
//						 //创建价格
//						 var goods_price = $("<div></div>");
//						 lis.append(goods_price);
//						 var objprice= obj.price;
//						 goods_price.addClass("goods_price");
//						 goods_price.append(objprice);
//					});
//					$(".count").html(num);
//				
//				}
//			}
//			
//		});
//	}
//});
//
////这个目的是是获取列表页里面的地址的参数---
//function query(_name) {
//	var str = location.search;
//	if(str != "") {
//		str = str.substr(1); // 将第一个字符？去掉
//		var arr = str.split("&"); // 转换为数组
//		for(var i = 0, l = arr.length; i < l; i++) {
//			var col = arr[i].split("=");
//			if(col[0] == _name) {
//				return col[1];
//			}
//		}
//		return "";
//	} else {
//		return "";
//	}
//}
//var type = query("type");
//
////----------------------------------------------放大镜的效果---------------------------------------
//
//scale();
//
//function scale() {
//	$("#detail .detail-wrap .detail-wrap-left #small").mousemove(function(e) {
//		e = e || window.event;
//		var sh = $(window).scrollTop();
//		var x = e.clientX - $("#detail .detail-wrap .detail-wrap-left #small").offset().left - $("#detail .detail-wrap .detail-wrap-left #small .glass").width() / 2;
//		var y = e.clientY - $("#detail .detail-wrap .detail-wrap-left #small").offset().top - $("#detail .detail-wrap .detail-wrap-left #small .glass").height() / 2 + sh;
//		var m = $("#detail .detail-wrap .detail-wrap-left #small").width() - $("#detail .detail-wrap .detail-wrap-left #small .glass").width();
//		var n = $("#detail .detail-wrap .detail-wrap-left #small").height() - $("#detail .detail-wrap .detail-wrap-left #small .glass").height()
//		console.log(sh);
//		if(x < 0) x = 0;
//		if(x > m) x = m;
//		if(y < 0) y = 0;
//		if(y > n) y = n;
//		$("#detail .detail-wrap .detail-wrap-left #small .glass").css({
//			"left": x,
//			"top": y
//		});
//		$("#detail .detail-wrap .detail-wrap-left #big .big-img").css({
//			"left": -x * 2,
//			"top": -y * 2
//		});
//
//	});
//
//	$("#detail .detail-wrap .detail-wrap-left #small").mouseover(function(e) {
//		$("#detail .detail-wrap .detail-wrap-left #big").css({
//			"display": "block"
//		});
//		$("#detail .detail-wrap .detail-wrap-left #small .glass").css({
//			"display": "block"
//		});
//	});
//
//	$("#detail .detail-wrap .detail-wrap-left #small").mouseleave(function(e) {
//		$("#detail .detail-wrap .detail-wrap-left #big").css({
//			"display": "none"
//		});
//		$("#detail .detail-wrap .detail-wrap-left #small .glass").css({
//			"display": "none"
//		});
//	})
//}

//-------------------------------配送下拉菜单---------------------------------------------------------
//$("#detail .detail-wrap .detail-wrap-right .address").click(function() {
//	if($("#detail .detail-wrap .detail-wrap-right .address .dizhi").css("display") == "none") {
//		$("#detail .detail-wrap .detail-wrap-right .address .dizhi").css({
//			"display": "block"
//		});
//	} else {
//		$("#detail .detail-wrap .detail-wrap-right .address .dizhi").css({
//			"display": "none"
//		});
//	}
//});
//
//$("#detail .detail-wrap .detail-wrap-right .address .dizhi dl dd").click(function() {
//	$("#detail .detail-wrap .detail-wrap-right .address>span").html($(this).html());
//})



define(function(){
	return function(){
		
	////----------详情页的js,点击列表页的内容进来，有放大镜的功能，点击加入购物车=------------------------
function hidelist(obj) {
	this.obj = obj;
	this.pp = this.obj.children().eq(0).find("span");
	this.second = this.obj.children().eq(1);
	this.init();
}

hidelist.prototype = {
	init: function() {
		this.menu();
	},
	menu: function() {
		var that = this;
		this.obj.hover(function() {
			// console.log(2)
			that.obj.children().eq(1).css("display", "block");
			that.obj.css({
				"background": "#fff",
				"borderColor": "#e2e2e2"
			});
			that.obj.children().eq(0).css("color", "#cd1c1c")
		}, function() {
			that.obj.children().eq(1).css("display", "none");
			that.obj.css({
				"background": "#f7f7f7",
				"borderColor": "#f7f7f7"
			})
			that.obj.children().eq(0).css("color", "#666")
		})
	}

}
new hidelist($(".a_div_1"));
new hidelist($(".a_div_2"));
new hidelist($(".a_div_3"));
new hidelist($(".a_div_4"));
new hidelist($(".web"));
//--------------------------------指向nav的时候变红---------------------------------
$(".list-nav-wrap-right").find("li").hover(function() {
	$(this).css({
		"background": "red"
	});
}, function() {
	$(this).css({
		"background": ""
	});
})
//--------------------------------指向left的时候list下滑---------------------------------
$("#list-nav .list-nav-wrap-left").hover(function() {
	$(this).find(".banner-wrap-left").stop().slideDown();
}, function() {
	$(this).find(".banner-wrap-left").stop().slideUp();
})	
		
		
		
		
		
		
		$("#detail .detail-wrap .detail-wrap-right .address").click(function() {
	if($("#detail .detail-wrap .detail-wrap-right .address .dizhi").css("display") == "none") {
		$("#detail .detail-wrap .detail-wrap-right .address .dizhi").css({
			"display": "block"
		});
	} else {
		$("#detail .detail-wrap .detail-wrap-right .address .dizhi").css({
			"display": "none"
		});
	}
});

$("#detail .detail-wrap .detail-wrap-right .address .dizhi dl dd").click(function() {
	$("#detail .detail-wrap .detail-wrap-right .address>span").html($(this).html());
})
	}
});
