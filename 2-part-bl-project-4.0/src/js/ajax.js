function get(url, fn){
	var xhr;
	if( window.XMLHttpRequest ){
		xhr = new XMLHttpRequest();
	}else{
		xhr = new ActiveXObject("Msxml2.XMLHTTP");
	}
	xhr.open("get", url, true);	
	xhr.send();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			if( fn ){
				fn(xhr.responseText);   //里面要写参数  
			}
		}
	}
}


function post(url, data, fn){
	var xhr;
	if( window.XMLHttpRequest ){
		xhr = new XMLHttpRequest();
	}else{
		xhr = new ActiveXObject("Msxml2.XMLHTTP");
	}
	xhr.open("post", url, true);
	xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	xhr.send(data);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			if( fn ){
				fn(xhr.responseText);
			}
		}
	}
}































