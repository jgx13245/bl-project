//-------------------------------鼠标指针有二级菜单显示--------------------------------------------------
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
$(".list-nav-wrap-right").find("li").hover(function(){
	$(this).css({"background":"red"});
},function(){
	$(this).css({"background":""});
})
//--------------------------------指向left的时候list下滑---------------------------------
$("#list-nav .list-nav-wrap-left").hover(function(){
	$(this).find(".banner-wrap-left").stop().slideDown();
},function(){
	$(this).find(".banner-wrap-left").stop().slideUp();
})
//-------------------------------点击横向列表时候的向下展开---------------------------------
$("#list-first .lf-right .lf-right-you .duoxuan,#list-first .lf-right .lf-right-you .zhankai").click(function(){
	//----------------用jquery获取元素的属性的办法------------------------
	if($("#list-first .lf-right .lf-right-zuo").css("display") == "block"){
		$("#list-first .lf-right .lf-right-zuo").css({"display":"none"});
		$("#list-first .lf-right .lf-right-zuo-h").css({"display":"block"});
		$("#list-first .lf-right .lf-right-zuo-h ul li").css({"display":"block"});
		$("#list-first #lf-left1").css({"padding-bottom":300});
	}else {
		$("#list-first .lf-right .lf-right-zuo").css({"display":"block"});
		$("#list-first .lf-right .lf-right-zuo-h").css({"display":"none"});
		$("#list-first .lf-right .lf-right-zuo-h ul li").css({"display":"none"});
		$("#list-first #lf-left1").css({"padding-bottom":90});
	}
	
})
//-----------------------------ajax上方的小nav-----------------------------------------------------------------

$("#aj-nav .aj-wrap .aj-wrap-left").find("li").mouseenter(function(){
	$(this).css({"border-color":"#c01133","color":"red","border-right":"1px solid #c01133"})
}).mouseleave(function(){
	$(this).css({"border-color":"#ddd","color":"#000","border-right":"none"})
})

$("#aj-nav .aj-wrap .aj-wrap-left").find("li").each(function(ind,li){
	//里面的li不能加双引号了。
	$(li).click(function(){
		$(this).unbind("mouseenter mouseleave");
		$(this).siblings().bind("mouseenter",function(){
			$(this).css({"border-color":"#c01133","color":"red","border-right":"1px solid #c01133"})
		});
		$(this).siblings().bind("mouseleave",function(){
			$(this).css({"border-color":"#ddd","color":"#000","border-right":"none"})
		});
		$("#aj-nav .aj-wrap .aj-wrap-left").find("li").css({"background":"#f7f7f7","color":"#000"})
		$("#aj-nav .aj-wrap .aj-wrap-left").find("li").eq(ind).css({"background":"#c01133","color":"white"})
	})
});

//-----------------------------ajax数据获取-----------------------------------------------------------------
$.ajax({
	url:"../json/list-goods.json",
	type:"get",
	async:"true",
	success:function(str){
		var arr = str.list;
		console.log(arr);
    $.each(arr, function(i,obj){
	  	var li = $("<li></li>");
	  	var a = $("<a href='../html/details.html?type="+obj.type+"'></a>")
	  	var img = $("<img src= '"+obj.src+"' />");
	  	a.append(img);
	  	li.append(a);
	  	$("#ajax .ajax-wrap").append(li);
	  	//---------排序获取的数据-------------
	  	//------创建价钱的表格div-----
	  	var div1 = $("<div></div>");
	  	li.append(div1);
	  	$(div1).addClass("price1");  //添加class不要加点。
	    var price1 = "￥"+obj.price;
	    div1.append(price1);
	   //------创建详细名称a-----
	    var a1 =$("<a href='../html/details.html?type="+obj.type+"'></a>");
	    var introduce = obj.introduce;
	    a1.append(introduce);
	    li.append(a1);
	    a1.addClass("detail-name");
	    //------创建在什么里面畅销-----
         var div2=$("<div></div>");
         li.append(div2);
         $(div2).addClass("in");
         var changxiao = obj.sellgood;
         div2.append(changxiao);
         //--------创建加入购物车-------
         var a2 = $("<a href='../html/details.html?type="+obj.type+"'></a>");
         a2.addClass("addshop");
         var text1 = obj.text;
         a2.append(text1);
          li.append(a2);
	  })
       
         
	}
})




















