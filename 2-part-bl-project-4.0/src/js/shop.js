//------------------购物车页面的数据详细的增减---------------------
btn.onclick = function(){
	if( confirm("您确定要删除所选商品吗？") ){
		var arr = document.querySelectorAll("tbody input[type='checkbox']");
		for( var i=0,l=arr.length; i<l; i++ ){
			if( arr[i].checked ){
				var type = arr[i].value;
				// 删除tr
				tbody1.removeChild(document.getElementById("tr"+type));
				// 删除cookie
				setCookie("g"+type, "", -1);
			}
		}
	}
}
	
cb1.onclick = function(){
	var v = this.checked;
	var arr = document.querySelectorAll("tbody input[type='checkbox']");
	for( var i=0,l=arr.length; i<l; i++ ){
		arr[i].checked = v;
	}
}
	
getGoodsCookies(function(_name, obj){
	// 行
	var tr = document.createElement("tr");
	tbody1.appendChild(tr);
	tr.type = "tr"+obj.type;
	var td1 = document.createElement("td");
	tr.appendChild(td1);
	
	
	$("tr").mouseenter(function(){
	
		$(this).children().css({"background":"pink"})
	});
	$("tr").mouseleave(function(){
		$(this).children().css({"background":"#f4f4f4"})
	});
	
	
	
	
	// 复选框
	var cb = document.createElement("input");
	td1.appendChild(cb);
	cb.type = "checkbox";
	cb.value = obj.type;
	// 图片
	var td2 = document.createElement("td");
	tr.appendChild(td2);
	td2.innerHTML = "<img src='"+obj.src+"' />";
	// 标题
	var td3 = document.createElement("td");
	tr.appendChild(td3);
	td3.innerHTML = obj.introduce;
	// 单价
	var td4 = document.createElement("td");
	tr.appendChild(td4);
	td4.innerHTML = "￥<i>"+obj.price+"</i>";
	// 数量
	var td5 = document.createElement("td");
	tr.appendChild(td5);
	//td5.innerHTML = obj.num;
	// 减号
	var input1 = document.createElement("input");
	td5.appendChild(input1);
	input1.type = "button";
	input1.value = "-";
	input1.onclick = function(){
		obj.num = obj.num-1;
		if( obj.num < 1 ){
			// 删除tr
			tbody1.removeChild(tr);
			// 删除cookie
			setCookie("g"+obj.type, "", -1);
		}else{
			setNum(input2, obj, td6);
		}
		window.location.reload();
	}
	// 输入框
	var input2 = document.createElement("input");
	td5.appendChild(input2);
	input2.type = "text";
	input2.value = obj.num;
	input2.onblur = function(){
		if( /^\d+$/.test(this.value) ){
			obj.num = Number(this.value);
			setNum(input2, obj, td6);
		}else{
			this.value = obj.num;
		}
	}
	// 加号
	var input3 = document.createElement("input");
	td5.appendChild(input3);
	input3.type = "button";
	input3.value = "+";
	input3.onclick = function(){
		obj.num = obj.num+1;
		setNum(input2, obj, td6);
		window.location.reload();
	}
	// 总价
	var td6 = document.createElement("td");
	tr.appendChild(td6);
	td6.innerHTML = "￥<i>"+(obj.price*obj.num)+"</i>";
	console.log(obj.num);
	// 操作
	var td7 = document.createElement("td");
	tr.appendChild(td7);
	
	var a1= document.createElement("a");
	td7.appendChild(a1);
	a1.innerHTML = "移入收藏夹";
	a1.className="yi";
	
	
	var a = document.createElement("a");
	td7.appendChild(a);
	a.innerHTML = "删除";
	a.className="del";
	
	a.onclick = function(){
		if( confirm("您确定要删除该商品吗？") ){
			// 删除tr
			tbody1.removeChild(tr);
			// 删除cookie
			setCookie("g"+obj.type, "", -1);
			window.location.reload();
			
		}
	}
	

	
});

// 设置数量
function setNum(input2, obj, td6){
	// 输入框的更新
	input2.value = obj.num;
	// cookie的更新
	setCookie("g"+obj.type, obj, 10);
	// 总价的更新
	td6.innerHTML = "￥"+(obj.price*obj.num);
}
//--------------商品区显示价钱--------------

var trs = $("#data tr");
var str = trs.length;
var st = 0
for(i=1;i<str;i++){
	var tr = trs[i];
	var m =$(tr).find("td:eq(5) i").html();
	st=parseInt(m)+st;
    
}

$(".bott span").eq(3).find("i").html("￥"+st);






