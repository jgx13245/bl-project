/*
 六大主页里面的注册页的js代码
 目的实现：1.每个输入框的验证，（尽量用正则）
          2.右上角的登录按钮，点击时跳转到登录页面
          3.验证码看项目开发情况进行相应的改进
          4.先写着试试
       
 */
$(function() {
	$(".check").click(function() {
		$(".check img").toggle();
	})
	var reg_user = /^[0-9a-z_-]{6,20}$/i;
	var reg_password = /^[0-9a-z_-]{6,18}$/i;
	var reg_tel = /^1[0-9]{10}$/;
	var reg_duan=/^\d{6}$/;
    var reg_email = /^\w+@\w+(\.\w+)+$/i;
	var regArr = {
		"#user": false,
		"#password": false,
		"#tel": false,
		//"#message": false
	};
	fnReg(reg_user, "#user", ".user_div", "用户名长度只能在6-20位字符之间")
	fnReg(reg_password, "#password", '.password_div', "用户名长度只能在6-20位字符之间")
	fnReg(reg_tel, "#tel", '.tel_div', "请输入正确手机号");
	//fnReg(reg_duan, "#message", '.message_div', "短信验证码格式不正确");
	fnReg(reg_email,"#email",'.email_div',"请输入正确格式邮箱");
	function fnReg(reg, input, dom, text) {
		$(input).blur(function() {
			//判断是否为空---
			if(!$(input).val()) {
				$(dom + " li:eq(0)").css("display", "none");
				$(dom + " li:eq(2)").css("display", "none");
				$(dom + " li:eq(1)").css("display", "block");
				$(this).css({
					"box-shadow": "0 0 5px red"
				})
			} else {
				//判断是否一致
				if(reg.test($(input).val())) {
					$(dom + " li:eq(0)").css("display", "none");
					$(dom + " li:eq(1)").css("display", "none");
					$(dom + " li:eq(2)").css("display", "block");
					regArr[input] = true;
					console.log(regArr)
				} else {
					$(dom + " li:eq(0)").css("display", "none");
					$(dom + " li:eq(2)").css("display", "none");
					$(dom + " li:eq(1)").css("display", "block");
					$(dom + " li:eq(1) strong").text(text)

				}
			}
		})

		$(input).focus(function() {
			$(dom + " li:eq(1)").css("display", "none");
			$(dom + " li:eq(2)").css("display", "none");
			$(dom + " li:eq(0)").css("display", "block");
			$(this).css({
				"box-shadow": "0 0 0 white"
			})
		})

	};

	//----确认密码的验证-----------------
	$("#confirm_password").focus(function() {

			$(".confirm_password_div li:eq(0)").css({"display": "none"});
			$(".confirm_password_div li:eq(1)").css({"display": "none"});
			$(".confirm_password_div li:eq(2)").css({"display": "none"});
			$(".confirm_password_div li:eq(3)").css({"display": "none"});
		

		$("#confirm_password").css({"box-shadow": "0 0 0 white"})

	});

	$("#confirm_password").blur(function() {
		if($("#confirm_password").val() == "") {
			$(".confirm_password_div li:eq(1)").css("display", "block");
			$("#confirm_password").css({"box-shadow": "0 0 5px red"})
		} else {
			if($("#confirm_password").val() == $("#password").val()) {
				$(".confirm_password_div li:eq(3)").css("display", "block");
				$(".confirm_password_div li:eq(2)").css("display", "none");
				$(".confirm_password_div li:eq(1)").css("display", "none");
				$(".confirm_password_div li:eq(0)").css("display", "none");
				
			}else{
				$(".confirm_password_div li:eq(2)").css("display", "block");
				$(".confirm_password_div li:eq(3)").css("display", "none");
				$(".confirm_password_div li:eq(1)").css("display", "none");
				$(".confirm_password_div li:eq(0)").css("display", "none");
				
			}
		}

	})

	//--------------cookie存储-------------------------
	
			$(".suc").click(function() {
			var flag = true;
			$.each(regArr,function(i,obj){
				if(obj == false){
					flag = false;
				}
				
			})
			if(flag){
				var user = $("#user").val();
				//console.log(user)
				var password = $("#password").val();
				//console.log(password)
				var arr = [];
				arr.push(user);
				arr.push(password);
				setCookie("user",arr,7);
				alert("注册成功");
				location.href="enter.html";
			
				
				
			}else{
				alert("输入有误，请正确填写必填项");
			}
		})

})