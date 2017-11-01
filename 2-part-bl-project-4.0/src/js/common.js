 //----------------------点击显示购物车栏--------------------------


tipMove(".user_msg");
	tipMove(".my_collect");
	tipMove(".shopping_car");
	tipMove(".look_history");
	tipMove(".erweima");
	tipMove(".serve_people");
	tipMove(".to_top");
	function tipMove(dom){
		if(dom == ".erweima"){
			$(dom).hover(function(){
			$(this).css("background","#d62233");

			$(dom +"_tip").stop().animate({
				"right":"38px", 
				 'zIndex':"-1"
			}) 
			},function(){
				$(this).css("background","#333");
				$(dom +"_tip").stop().animate({ 
					  'zIndex':"-1",
					"right":"-160px" 
				})
			})
		}else{
			$(dom).hover(function(){
		$(this).css("background","#d62233");

		$(dom +"_tip").stop().animate({
			"right":"38px", 
			"zIndex":"1"
		}) 
		},function(){
			$(this).css("background","#333");
			$(dom +"_tip").stop().animate({ 
				"zIndex":"-1",
				"right":"-100px" 
			})
		})
		} 
	}
	// // 详细信息
	detailsMove(".click_user");
	detailsMove(".click_history");
	detailsMove(".click_shopping");
	detailsMove(".click_collect");
	function detailsMove(dom){
		$(dom).click(function(){ 
			$(this).parent().stop().animate({
				"right":"290px"
			})
			$(this).click(function(){
				$(this).parent().stop().animate({
					"right":"0"
				})
				detailsMove(dom);
			})
			$(dom+"_detail").stop().animate({
				"top":"0" 
			}) 
			$(this).siblings(".all_detail").css("top","700px")
		})
 
	}
//-------------------------详情页的点击的时候进入购物车------------------------
$.ajax({
	type: "get",
	url: "../json/list-goods.json",
	async: true,
	success: function(str) {
		var arr = str.list;
		$.each(arr, function(i, obj) {
			if(type == obj.type) {
				//添加放大镜的两张图片
				var img1 = $("<img src='" + obj.src + "'/>");
				$("#detail .detail-wrap .detail-wrap-left #small").append(img1);
				img1.addClass("small-img");

				var img2 = $("<img src='" + obj.src + "'/>");
				$("#detail .detail-wrap .detail-wrap-left #big").append(img2);
				img2.addClass("big-img");
				//添加名称
				var intr = obj.introduce;
				$("#detail .detail-wrap .detail-wrap-right ._name").append(intr);
				//添加价钱
				var pri = "￥"+obj.price;
				$("#detail .detail-wrap .detail-wrap-right ._price").append(pri);
				//------------------大图下方的小图片----------------
				var xiao = $("<div></div>");
				xiao.addClass("small_box");
				$("#detail .detail-wrap").append(xiao)
				var xiao1 =$("<li></li>")
				xiao1.addClass("xiao_li")
				$(xiao).append(xiao1);
				var ximg1 =$("<img src='" + obj.src1 + "'/>");
				$(xiao1).append(ximg1);
				//---------------------第二张小图片----------------
				var xiao2 =$("<li></li>")
				xiao2.addClass("xiao_li1")
				$(xiao).append(xiao2);
				var ximg2 =$("<img src='" + obj.src2 + "'/>");
				$(xiao2).append(ximg2);
				//---------------------第三张小图片----------------
				var xiao3 =$("<li></li>")
				xiao3.addClass("xiao_li2")
				$(xiao).append(xiao3);
				var ximg3 =$("<img src='" + obj.src + "'/>");
				$(xiao3).append(ximg3);
				//-------------------鼠标指上去会吧图片换上-------------
				$(".xiao_li").mouseenter(function(){
					$("#detail .detail-wrap .detail-wrap-left #small img").attr("src",obj.src1);
					$("#detail .detail-wrap .detail-wrap-left #big img").attr("src",obj.src1);
				});
				$(".xiao_li1").mouseenter(function(){
					$("#detail .detail-wrap .detail-wrap-left #small img").attr("src",obj.src2);
					$("#detail .detail-wrap .detail-wrap-left #big img").attr("src",obj.src2);
				});
				$(".xiao_li2").mouseenter(function(){
					$("#detail .detail-wrap .detail-wrap-left #small img").attr("src",obj.src);
					$("#detail .detail-wrap .detail-wrap-left #big img").attr("src",obj.src);
				});
						
				
//-----------------点击加入到加入到购物车里面----（最恶心的一块)------------------------------------
				$("#detail .detail-wrap .detail-wrap-right .buy .jiaru").click(function(){
					var o = getCookie("g"+obj.type);
					if( o ){	// 表示之前保存过该商品cookie
						obj.num = Number(o.num)+1;
					}else{		// 表示之前没有保存过该商品cookie
						obj.num = 1;
					}
					setCookie("g"+obj.type, obj, 10);
	             	// 根据当前商品，创建图片	
					//从cookie中获取所需要的数据--
					showcar();
	
				});
				showcar();
				function showcar(){
					$(".shopping_res ul").html("");
					var num=getGoodsCookies(function(_name,obj){
						var lis = $("<li></li>")
						 lis.appendTo($(".shopping_res ul"));
						 lis.addClass("lis");
						 var tmpimg = $("<img src='"+obj.src+"'/>");
						 lis.append(tmpimg);
						 tmpimg.addClass("tmpimg");
						 //创建名字--
						 var goods_name = $("<div></div>");
						 lis.append(goods_name);
						 var objname= obj.introduce;
						 goods_name.addClass("goods_name");
						 goods_name.append(objname)
						 //创建价格
						 var goods_price = $("<div></div>");
						 lis.append(goods_price);
						 var objprice= "￥"+obj.price;
						 goods_price.addClass("goods_price");
						 goods_price.append(objprice);
						 //创建数量
						 var m = obj.num;
						 var count1= $("<span></span>");
						 count1.addClass("count2");
						 goods_name.append(count1);
						 count1.html("数量："+m);
						
					});
					$(".count").html(num);
					$(".shopping_detail .shopping_res p span").html(num);
				
				}
			}
			
		});
	}
});

//这个目的是是获取列表页里面的地址的参数---
function query(_name) {
	var str = location.search;
	if(str != "") {
		str = str.substr(1); // 将第一个字符？去掉
		var arr = str.split("&"); // 转换为数组
		for(var i = 0, l = arr.length; i < l; i++) {
			var col = arr[i].split("=");
			if(col[0] == _name) {
				return col[1];
			}
		}
		return "";
	} else {
		return "";
	}
}
var type = query("type");

//----------------------------------------------放大镜的效果---------------------------------------

scale();

function scale() {
	$("#detail .detail-wrap .detail-wrap-left #small").mousemove(function(e) {
		e = e || window.event;
		var sh = $(window).scrollTop();
		var x = e.clientX - $("#detail .detail-wrap .detail-wrap-left #small").offset().left - $("#detail .detail-wrap .detail-wrap-left #small .glass").width() / 2;
		var y = e.clientY - $("#detail .detail-wrap .detail-wrap-left #small").offset().top - $("#detail .detail-wrap .detail-wrap-left #small .glass").height() / 2 + sh;
		var m = $("#detail .detail-wrap .detail-wrap-left #small").width() - $("#detail .detail-wrap .detail-wrap-left #small .glass").width();
		var n = $("#detail .detail-wrap .detail-wrap-left #small").height() - $("#detail .detail-wrap .detail-wrap-left #small .glass").height()
	
		if(x < 0) x = 0;
		if(x > m) x = m;
		if(y < 0) y = 0;
		if(y > n) y = n;
		$("#detail .detail-wrap .detail-wrap-left #small .glass").css({
			"left": x,
			"top": y
		});
		$("#detail .detail-wrap .detail-wrap-left #big .big-img").css({
			"left": -x * 2,
			"top": -y * 2
		});

	});

	$("#detail .detail-wrap .detail-wrap-left #small").mouseover(function(e) {
		$("#detail .detail-wrap .detail-wrap-left #big").css({
			"display": "block"
		});
		$("#detail .detail-wrap .detail-wrap-left #small .glass").css({
			"display": "block"
		});
	});

	$("#detail .detail-wrap .detail-wrap-left #small").mouseleave(function(e) {
		$("#detail .detail-wrap .detail-wrap-left #big").css({
			"display": "none"
		});
		$("#detail .detail-wrap .detail-wrap-left #small .glass").css({
			"display": "none"
		});
	})
}
