/*
 
 * 首页js代码

*/

/*---------------------------------------------头部隐藏区域----------------------------------------------*/
$(document).scroll(function() {
	if($(document).scrollTop() > 60) {
		$("#top-hide").stop().animate({
			"top": 0
		})
	} else {
		$("#top-hide").stop().animate({
			"top": "-80px"
		})
	}
});
/*------------------------------------------------点击图片消失---------------------------------------------------*/

$("#mei").bind("click", function() {

	$("#top>.active_img").css({
		"display": "none"
	});
});

/*-------------------------------top-nav-上鼠标指上有列表-------（面向对象指针）--hover事件--------------------------*/
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

//-----------------------------------banner--轮播图------------------------------------------------------
move();

function move() {
	var div = document.getElementsByClassName("ban")[0];
	var ul = div.getElementsByTagName("ul")[0];
	var ol = div.getElementsByTagName("ol")[0];
	var lis = Array.from(ol.children);
	var ul_li = Array.from(ul.children);
	var prev1 = document.getElementById("prev1");
	var next1 = document.getElementById("next1");
	lis.forEach(function(li, ind) {
		li.onmouseover = function() {

			num = ind; //将下标赋给全局变量
			tab(); //执行运动代码
			//console.log(num);
		}
	});
	var num = 0;
	lis[num].children[0].className = "active";

	ul_li[num].style.zIndex = 1;
	//点击右下角运动
	function tab() {
		//设置按钮样式  透明度运动
		lis.forEach(function(li, ind) {
			li.children[0].className = "";
			li.children[0].style.width = "";
			startMove(ul_li[ind], {
				"opacity": 0
			}, function() {
				ul_li[ind].style.display = "none";
			});
		});
		lis[num].children[0].className = "active";
		lis[num].children[0].style.width = 30 + "px";

		ul_li[num].style.display = "block";
		startMove(ul_li[num], {
			"opacity": 100
		});
	}
	//自行运动（向右）
	function next() {
		num++;
		if(num == 6) {
			num = 0;
		}
		tab();
	}
	//自行运动（向左）
	function prev() {
		num--;
		if(num == -1) {
			num = 5;
		}
		tab();
	}
	var timer = setInterval(next, 2000);
	//鼠标移入移出效果
	div.onmouseover = function() {
		clearInterval(timer);
	}
	div.onmouseout = function() {
			timer = setInterval(next, 3000);
		}
		//向右
	next1.onclick = next;
	//向左
	prev1.onclick = prev;
}

$("#bannerwrapcenter").bind("mouseenter", function() {
	$("#prev1").stop().animate({
		"left": 0
	});
	$("#next1").stop().animate({
		"right": 0
	})
});
$("#bannerwrapcenter").bind("mouseleave", function() {
	$("#prev1").stop().animate({
		"left": -40
	});
	$("#next1").stop().animate({
		"right": -40
	})
});
//------------------------------------banner轮播图左边的大列表-========--------------------------------------------======

$("#banner .banner-wrap-left ul .m1").bind("mouseenter", function() {
	$("#banner .banner-wrap-left ul .m1 .list1").stop().fadeIn();
	
});
$("#banner .banner-wrap-left ul .m1").bind("mouseleave", function() {
		$("#banner .banner-wrap-left .list1").stop().fadeOut();
});

$("#banner .banner-wrap-left ul .m2").bind("mouseenter", function() {
	$("#banner .banner-wrap-left ul .m2 .list2").stop().animate({
		"opacity": 1
	}, 200);
	$("#banner .banner-wrap-left ul .m2 .list2").css({
		"display": "block"
	}, 200);
});
$("#banner .banner-wrap-left ul .m2").bind("mouseleave", function() {
	$("#banner .banner-wrap-left .list2").stop().animate({
		"opacity": 0
	}, 200);
	$("#banner .banner-wrap-left ul .m2 .list2").css({
		"display": "none"
	}, 200);
});
/////------------------
$("#banner .banner-wrap-left ul .m3").bind("mouseenter", function() {
	$("#banner .banner-wrap-left ul .m3 .list3").stop().animate({
		"opacity": 1
	}, 200);
	$("#banner .banner-wrap-left ul .m3 .list3").css({
		"display": "block"
	}, 200);
});
$("#banner .banner-wrap-left ul .m3").bind("mouseleave", function() {
	$("#banner .banner-wrap-left .list3").stop().animate({
		"opacity": 0
	}, 200);
	$("#banner .banner-wrap-left ul .m3 .list3").css({
		"display": "none"
	}, 200);
});
//-------------------------------------------楼层里面的小轮播图-----------------------------------------------

lunbo(".floor-1-left");
//	lunbo(".channel_floor_2");
//	lunbo(".channel_floor_3");
//	lunbo(".channel_floor_4"); 
//	lunbo(".channel_floor_5");
//	lunbo(".channel_floor_6");
//	lunbo(".channel_floor_7");
//	lunbo(".channel_floor_8"); 
function lunbo(dom) {
	var floor_index = 0;
	var timer = setInterval(function() {
		if(floor_index == 3) {
			floor_index = 0;
		}
		$(dom + " .container .btn_floor").find("i").eq(floor_index).stop().animate({
			"left": "0px"
		}, 1000)
		$(dom + " .container .btn_floor").find("i").eq(floor_index - 1).stop().animate({
			"left": "-31px"
		}, 1000)
		$(dom + " .container ul").stop().animate({
			"marginLeft": -(floor_index * 306) + "px"
		})
		floor_index++;
	}, 1000);
	$(dom + " .container .btn_floor").find("span").hover(function() {
		$(dom + " .container ul").stop().animate({
			"marginLeft": -($(this).index() * 306) + "px"
		})
		floor_index = $(this).index();
		$(dom + " .container .btn_floor").find("i").css({
			"left": "-30px"
		})
		$(dom + " .container .btn_floor").find("i").eq($(this).index()).css("left", "0")
	}, function() {

	})
	
	
	$(dom + " .container").hover(function() {
		clearInterval(timer);
	}, function() {
		clearInterval(timer);
		timer = setInterval(function() {
			if(floor_index == 3) {
				floor_index = 0;
			}
			$(dom + " .container .btn_floor").find("i").eq(floor_index).stop().animate({
				"left": "0px"
			}, 1000)

			$(dom + " .container .btn_floor").find("i").eq(floor_index - 1).stop().animate({
				"left": "-31px"
			}, 1000)
			$(dom + " .container ul").stop().animate({
				"marginLeft": -(floor_index * 306) + "px"
			})
			floor_index++;
		}, 1000);
	})
}
//----------------------------------------楼层按钮定位-------------------------------------------------------
function Floor(lc, lou) {
		this.lc = lc;
		this.lou = lou;
		this.louUlli = lou.find("ul>li");
		this.louOlli = lou.find("ol>li");
		this.init();
	}
	Floor.prototype.init = function() {

		//----------实现点击跳转楼层-------------------------------
		var that = this;
		//每一层距离顶端的距离
		this.arr = this.lc.map(function(ind, elem) {
			return $(elem).offset().top; //不能加括号
		})

		//第五层因为长度减掉一，所以没有显示高亮，需要添加上

		var len = this.arr.length;
		this.arr.push(this.lc.eq(len - 1).height() + this.arr[len - 1]);  //数组下标志   要中括号
		//点击ul里面的li事件---回到顶部
		this.louUlli.click(function() {
			$("html,body").animate({ //谷歌必须加body 兼容
				"scrollTop": 0
			}); //animate用得是：
		})

		//点击ol里面的li事件---定位到每个楼层
		this.louOlli.click(function() {
			var ind = $(this).index();
			$("html,body").animate({
				"scrollTop": that.arr[ind]-75
			});
		})

		//----------实现楼层变换时候，按钮颜色显示-------------------------------	
		//--滚动条滚动时触发的函数//易错点，对于this,window,这种类型的在括号里不要带  ""
		$(window).scroll(function() {
			var st = $(window).scrollTop();
			var h = $(window).height() / 2;
			//让楼梯随着滚动条隐藏或显示
			if(st > h) {
				that.lou.fadeIn();
			} else {
				that.lou.fadeOut();

			}

			//------ 判断可视区显示哪一层,楼梯快就亮------------------
			var ind = -1;
			for(i = 0; i < that.arr.length - 1; i++) {
				var min = that.arr[i];
				var max = that.arr[i + 1];
				if(min < st + h && st + h < max) {
					ind = i;
				}
			}

			that.louOlli.removeClass("selected");
			if(ind > -1) {
				if(ind==0){
					that.louOlli.removeClass();
					that.louOlli.eq(ind).addClass("selected");
				}else if(ind==1){
				//that.louOlli.eq(0).removeClass("selected");
				that.louOlli.removeClass();
				that.louOlli.eq(ind).addClass("selected1");
				//that.louOlli.eq(2).removeClass("selected2");	
				}else if(ind==2){
				//that.louOlli.eq(0).removeClass("selected");
				that.louOlli.removeClass();
				that.louOlli.eq(ind).addClass("selected2");
				//that.louOlli.eq(1).removeClass("selected1");	
				}
				else if(ind==3){
				that.louOlli.removeClass();
				that.louOlli.eq(ind).addClass("selected3");
		
				}
				else if(ind==4){
				that.louOlli.removeClass();
				that.louOlli.eq(ind).addClass("selected4");
		
				}
				else if(ind==5){
				that.louOlli.removeClass();
				that.louOlli.eq(ind).addClass("selected5");
		
				}
				else if(ind==6){
				that.louOlli.removeClass();
				that.louOlli.eq(ind).addClass("selected6");
		
				}
				else if(ind==7){
				that.louOlli.removeClass();
				that.louOlli.eq(ind).addClass("selected7");
		
				}
				
			}

		})

	}
	var f = new Floor($(".lc"), $(".lou"));
//----------------首页ajax获取部分---------------------	

$.ajax({
	url:"json/guess_like_list.json",
	type:"get",
	async:"true",
	success:function(str){
		var arr=str.list;
		$.each(arr, function(i,obj) {//i  下标  obj 是数组的元素
			var li =$("<li></li>");
			li.addClass("llii");
			$(".guess-wrap").append(li);
			var img  = $("<img src='"+obj.src+"' />");
			console.log(obj.src);
			li.append(img);
			//创建商品标题
			var a = $("<a></a>");
			var intr = obj.introduce;
			a.append(intr);
			a.addClass("aa");
			li.append(a);
			//创造商品价钱
			var div =$("<div></div>");
			var pri = obj.price;
			div.append(pri);
			div.addClass("dd");
			li.append(div);
		});
	}
})

//-------加一个函数接受用户名--------------
function user1(){
	var userName = fn("user");	
	if(userName){
		$(".news a").html(userName+"欢迎来到百联")
		//$("#topbar>.wraper>.fr>.frl").html(userName+"   欢迎来到新蛋购物！");
	}
}
user1();
function fn(user){
	var str=location.search;
	if(str != ""){
		str=str.substr(1);
		var arr=str.split("&");
		for(var i=0,l=arr.length;i<l;i++)
		{
			var col=arr[i].split("=");
			if(col[0]==user)
			{
				return col[1];
			}	
		}
	}
}




















