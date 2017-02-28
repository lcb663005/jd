// JavaScript Document
documentReady(function(){
	//放大镜;
	//切换图片;
	var preview_oDiv=document.getElementById('preview');
	var preview_img=preview_oDiv.getElementsByTagName('img')[0];
	var previewSpan=preview_oDiv.getElementsByTagName('span')[0];
	var aPreviewLi=document.getElementById('preview_small').getElementsByTagName('li');
	var amplification_box=document.getElementById('amplification')
	var amplification_img=amplification_box.getElementsByTagName('img')[0];
	
	//alert(aPreviewLi.length);
	for(var i=0;i<aPreviewLi.length;i++){
		aPreviewLi[i].onmouseover=function(){
			for(var j=0;j<aPreviewLi.length;j++){
				aPreviewLi[j].className='';
			};
				this.className='hover';
				var t=this.getElementsByTagName('img')[0].src;
				preview_img.src=t;
				amplification_img.src=t;
		};
	};
	//放大图片;	
	preview_oDiv.onmousemove=function(ev){
		
		previewSpan.style.display=amplification_box.style.display='block';
		
		var oEv=ev||event;
		
		//获取滚动条  chrome不识别 documentElement.scrollTop
		var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
		
		//鼠标在span的中心位置

		var l=oEv.clientX-hxsd_tools.offsetLeft(preview_oDiv)-previewSpan.offsetWidth/2; 
		var t=oEv.clientY+scrollTop-hxsd_tools.offsetTop(preview_oDiv)-previewSpan.offsetHeight/2;
		
		//console.log(l,t)
		
		//限制范围 
		if(l<0)l=0;
		if(l>=preview_oDiv.offsetWidth-previewSpan.offsetWidth){
			l=preview_oDiv.offsetWidth-previewSpan.offsetWidth;
		}
		if(t<0)t=0;
		if(t>=preview_oDiv.offsetHeight-previewSpan.offsetHeight){
			t=preview_oDiv.offsetHeight-previewSpan.offsetHeight;
		}
		previewSpan.style.left=l+'px';
		previewSpan.style.top=t+'px';	
		
		var l_rate=l/(preview_oDiv.offsetWidth-previewSpan.offsetWidth);
		var t_rate=t/(preview_oDiv.offsetHeight-previewSpan.offsetHeight);
		
		amplification_img.style.left= (amplification_box.offsetWidth-amplification_img.offsetWidth)*l_rate +'px'; //外box 减 内部大图片，为负值
		amplification_img.style.top= (amplification_box.offsetHeight-amplification_img.offsetHeight)*t_rate +'px';
		
	};
	
	preview_oDiv.onmouseout=function(){
		previewSpan.style.display=amplification_box.style.display='none';	
	};

//物品的各种尺寸的选择;
	function g_size(obj){
		var oDiv=document.getElementById(obj);
		var aLi=oDiv.getElementsByTagName('ul')[0].getElementsByTagName('li');
		for(var i=0;i<aLi.length;i++){
			aLi[i].onclick=function(){
				for(var j=0;j<aLi.length;j++){
					aLi[j].className='';
				};
				this.className='hover';
			};
		};
	};
	g_size('g_size');
	//其它商品选择；
	g_size('insure');
	//商品的贷款白条选择；
	g_size('loan');	
 //商品的购物车数量-------------------------------
 	function shopNum(){
		var oDiv=document.getElementById('shop_num');
		var oInput=oDiv.getElementsByTagName('input')[0];
		//alert(oInput.value);
		var addBtn=oDiv.getElementsByTagName('button')[0];
		var subBtn=oDiv.getElementsByTagName('button')[1];
		var n=1;
		oInput.value=n;
		
		addBtn.onclick=function(){
			n++;
			oInput.value=n;
			if(n<=1){
				n=1;
				subBtn.style.color='#ccc';
			}else{
				subBtn.style.color='#000';
			};
		};	
		subBtn.onclick=function(){
			n--;
			if(n<=1){
				n=1;
				this.style.color='#ccc';
			}else{
				this.style.color='#000';
			};
			oInput.value=n;
		};
	//失去焦点--------------------------------
		var num=null
		
		oInput.onfocus=function(){
			num=oInput.value;
		};
		oInput.onblur=function(){
			
			if(oInput.value){
				n=oInput.value;
			}else{
				oInput.value=num;
				n=num;
			}
		};
		
	};
 	shopNum();
//选项卡-------------------------------
	function run_1(obj1,obj2){
		var oDiv=document.getElementById(obj1);
		var aBtn=oDiv.getElementsByTagName('ul')[0].getElementsByTagName('li');
		var oBox=document.getElementById(obj2);
		var aCase=oBox.children;
		for(var i=0;i<aBtn.length;i++){
			aBtn[i].index=i;
			aBtn[i].onclick=function(){
				for(var j=0;j<aBtn.length;j++){
					aBtn[j].className='';
					aCase[j].style.display='none';
				}
				this.className='hover';
				aCase[this.index].style.display='block';
			};
		};
	};
	run_1('subnav','sel');
//选项卡内---------------------	
	
	function run_12(obj1,obj2){
		var oDiv=document.getElementById(obj1);
		var aBtn=oDiv.getElementsByTagName('li');
		var oBox=document.getElementById(obj2);
		var aCase=oBox.children;
		for(var i=0;i<aBtn.length;i++){

			aBtn[i].index=i;
			aBtn[i].onclick=function(){
				for(var j=0;j<aBtn.length;j++){
					aBtn[j].className='';
					aCase[j].style.display='none';
				}
				this.className='hover';
				aCase[this.index].style.display='block';
			};
		};
	};
	
	run_12('sel_1_title','sel_1_box');

 })
	
	








	
