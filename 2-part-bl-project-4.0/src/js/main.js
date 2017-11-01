// 模块配置
require.config({
	paths : {
		"jquery" : "../js/jquery-1.11.3",
		"detail":"../js/detail"
	}
});

// 模块使用
require(["jquery","detail"], function($,f){
	f();
//	console.log("bbb");
});


















