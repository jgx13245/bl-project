//导航栏
$(".nav ul li").mouseenter(function(){
	$(this).children(".nav_list").slideDown();
}).mouseleave(function(){
	$(this).children(".nav_list").slideUp();
});
//-------------------轮播图
move();
function move(){
		var div=document.getElementsByClassName("ban")[0];
		var ul=div.getElementsByTagName("ul")[0];
		var ol=div.getElementsByTagName("ol")[0];
		var lis=Array.from(ol.children);
		var ul_li=Array.from(ul.children);
		var prev1=document.getElementById("prev1");
		var next1=document.getElementById("next1");
		lis.forEach(function(li,ind){
			li.onmouseover=function(){
				num=ind;//将下标赋给全局变量
				tab();//执行运动代码
				//console.log(num);
			}
		});
		var num=0;
		lis[num].children[0].className="active";
		ul_li[num].style.zIndex=1;
		//点击右下角运动
		function tab(){
			//设置按钮样式  透明度运动
			lis.forEach(function(li,ind){
				li.children[0].className="";
				startMove(ul_li[ind],{"opacity":0},function(){
					ul_li[ind].style.display="none";
				});
			});
			lis[num].children[0].className="active";
			ul_li[num].style.display="block";
			startMove(ul_li[num],{"opacity":100});
		}
		//自行运动（向右）
		function next(){
				num++;
				if(num==6){
					num=0;
				}
				tab();
		}
		//自行运动（向左）
		function prev(){
				num--;
				if(num==-1){
					num=5;
				}
				tab();
		}
		var timer=setInterval(next,2000);
		//鼠标移入移出效果
		div.onmouseover=function(){
			clearInterval(timer);
		}
		div.onmouseout=function(){
			timer=setInterval(next,3000);
		}
		//向右
		next1.onclick=next;
		//向左
		prev1.onclick=prev;
}

