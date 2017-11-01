$(function(){
	$(".enter_enter").click(function(){
		var user = $(".enter_user").val();
		// console.log(user)
		var password = $(".enter_password").val();
		// console.log(password)
		var m = getCookie("user");
		console.log(m);
		var m1 = m[0];
		var m2 = m[1];
		if(user==m1&&password==m2){
			location.href="../index.html?user="+m1;
			
		}else{
			$(".tip") 
				.show()
				.text("用户名或密码错误");
		}
		
		
	});
	//-----判断验证账号和密码是否为空，提醒-----
	var reg_password = /^[0-9a-z_-]{6,18}$/i;
	$(".enter_enter").click(function(){
		if(!reg_password.test($(".enter_password").val())){
			console.log(1)
			$(".tip").text("密码长度为6-20位字符长度") 
			
		}
		if($(".enter_password").val() == ''){
				$(".tip") 
				.show()
				.text("请输入密码") 
		} 
		if($(".enter_user").val() == ''){
			$(".tip")
			.show()
			.text("请输入用户名");
			 
		} 
		
		
	})

})