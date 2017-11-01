
function Slide(elem, ms, d, now){
	this.elem = elem;
	var a = this.elem.children;	// div的子节点
	this.ul = a[0];
	this.ol = a[1];
	this.lBtn = a[2];
	this.rBtn = a[3];
	this.olspan = this.ol.getElementsByTagName("span");
	this.l = this.olspan.length;	// 长度
	this.w = parseInt(getStyle(this.elem, "width"));
	this.h = parseInt(getStyle(this.elem, "height"));
	
	this.ul.innerHTML += this.ul.children[0].outerHTML;	// 拷贝第一张图片
	this.ul.style.width = this.w*(this.l+1)+"px";
	this.lBtn.style.top=this.rBtn.style.top=(this.h-this.rBtn.offsetHeight)/2+"px";
	
	this.d = d;		// 方向
	this.ms = ms;	// 间隔
	this.now = now;	// 初始时哪张图片显示的下标
	this.prev = -this.now*this.w;
	
	var that = this;
	
	this.run = function(){
		var i=0, l=that.l, spans=that.olspan, span;
		for( ; i<l; i++){
			span = spans[i];
			span.i = i;
			span.onclick = function(){
				that.now = this.i;
				that.tab();
			}
		}
		
		that.timer = setInterval(that.next, that.ms);		
		that.elem.onmouseover = that.over;
		that.elem.onmouseout = that.out;
		
		that.lBtn.onclick = function(){
			that.d = -1;
			that.now--;
			that.tab();
		}
		that.rBtn.onclick = function(){
			that.d = 1;
			that.now++;
			that.tab();
		}
		that.lBtn.onmousedown = that.rBtn.onmousedown = function(){
			return false;
		}
		
	}
	
	this.tab = function(){
		// 不管上一次的startMove是否执行完毕，每当执行tab时，都应该瞬间让上一次的定位更新
		that.ul.style.left = that.prev+"px";//让上一次的startMove运行瞬间完成，然后执行本次运动
		if( that.now == that.l ){
			that.prev = 0;	// 设置本次目标值
			//that.ul.style.left=-that.now*that.w+"px";
			startMove(that.ul, {"left":-that.now*that.w}, function(){
				that.ul.style.left = "0px";
			});
			that.now = 0;
		}else if( that.now == -1 ){			
			that.now = that.l-1;
			that.prev = -that.now*that.w;// 设置本次目标值
			that.ul.style.left = -that.l*that.w+"px";			
			startMove(that.ul, {"left":that.prev});		
		}else{
			that.prev = -that.now*that.w;// 设置本次目标值
			startMove(that.ul, {"left":that.prev});
		}
		// 设置按钮样式
		for( var i=0,l=that.l; i<l; i++ ){
			that.olspan[i].className = "";
		}
		that.olspan[that.now].className = "selected";
	}
	this.next = function(){
		that.now+=that.d;
		that.tab();
	}
	this.over = function(){
		clearInterval(that.timer);
		startMove(that.lBtn, {"opacity":100});
		startMove(that.rBtn, {"opacity":100});
	}
	this.out = function(){
		that.timer = setInterval(that.next, that.ms);
		startMove(that.lBtn, {"opacity":0});
		startMove(that.rBtn, {"opacity":0});
	}
	
	this.tab();
	this.run();
}
