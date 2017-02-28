
//首页列表显示效果
function oListnav(){	
	var oListnav=document.getElementById("listNav");
	var aListnav=oListnav.children;
	var overLays=document.getElementById("popups");
	var aoverLays=overLays.children;
	var show_timer=null;
	var hlod_timer=null;
	var self_timer=null;
	//事件处理
	for(var i=0;i<aListnav.length;i++){
		//对li及对应的right进行编号
		aListnav[i].index=i;
		aoverLays[i].index=i;
		//绑定鼠标移入li的事件
		aListnav[i].onmouseover=function(){
			clearTimeout(hlod_timer);//清除鼠标移出li的延时影响
			clearTimeout(self_timer);//清除鼠标移出right的延时影响
			var self=this; //留住This
			//增加移入li延时，防止误触发
			show_timer=setTimeout(function(){
				for(j=0;j<aListnav.length;j++){
					aListnav[j].className="";
					aoverLays[j].style.display="none";	//显示前对right进行初始化
				};
				aListnav[self.index].className="hover";
				overLays.style.display="block";
				aoverLays[self.index].style.display="block";//对当前所在的li所对应的right进行显示				
			},150)
		};
		//绑定鼠标移出li的事件
		aListnav[i].onmouseout=function(){
			clearTimeout(show_timer);//清除鼠标移入li的影响
			//增加鼠标移出li的延时，防止鼠标上下移动时right的抖动
			hlod_timer=setTimeout(function(){
				for(j=0;j<aListnav.length;j++){
					aListnav[j].className="";
					overLays.style.display="none";
					aoverLays[j].style.display="none";//对right进行初始化
				}
			},150)		
		};
		//绑定鼠标移到right的事件
		aoverLays[i].onmousemove=function(){
			
			clearTimeout(self_timer);//清除鼠标移出right的延时影响
			clearTimeout(hlod_timer);//终止鼠标移出li时关闭right的动作
			aListnav[this.index].className="hover";
			overLays.style.display="block";
			aoverLays[this.index].style.display="block";//保持在当前的right
			
		};
		//绑定鼠标移出right的事件
		aoverLays[i].onmouseout=function(){
	
			var self=this;//留住This
			self_timer=setTimeout(function(){//消除鼠标在right和li之间移动的抖动
				aListnav[self.index].className="";
				overLays.style.display="none";
				aoverLays[self.index].style.display="none";//移出right时关闭自己的区域
			},50)
		};
	};
}	


//轮播图
function lunbo(){
	var oDiv=document.getElementById('slide');
	var aBtn=oDiv.getElementsByTagName('ol')[0].children;
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var aLi=oUl.children;
	aLi[0].style.opacity=1;	
	var pBtn=document.getElementById('prevBtn');
	var nBtn=document.getElementById('nextBtn');
	var n=0;//当前显示图片索引
	var timer=null;
	//添加点击事件
	for(var i=0; i<aBtn.length; i++){
		aBtn[i].index=i;//发拍照
		aBtn[i].onclick=function(){			
			if(n!=this.index){
				slideItem(n,this.index);
				n=this.index;
				changeAc();
			}
		};
	};
	//点击切换前一张	
	pBtn.onclick=function(){
		if(n<1){
			n=aLi.length;
			slideItem(0,aLi.length-1);
		}else{
			slideItem(n,n-1);
		};
		n--;
		changeAc();
	};
	//点击切换下一张
	nBtn.onclick=function(){
		n++;
		if(n>aLi.length-1){
			n=0;
			slideItem(aLi.length-1,0);
		}else{
			slideItem(n-1,n);
		};
		changeAc();		
	};	
	function slideItem(a,b){//淡出淡入
		aLi[a].style.display='block';
		aLi[a].style.opacity=1;;
		
		aLi[b].style.display='block';
		aLi[b].style.opacity=0;
		
		move(aLi[a],'opacity',0,900);//淡出
		move(aLi[b],'opacity',100,900,function(){
			aLi[a].style.display='none';
		});
	};
	 //鼠标划在窗口上面，停止计时器
	  oDiv.onmouseover=function(){
		clearInterval(timer);
	  }

	  
	  //鼠标离开窗口，开启计时器
	  oDiv.onmouseout=function(){
		timer=setInterval(run,1800)
	  }
	  //鼠标划在页签上面，停止计时器，手动切换
	  for(var i=0;i<aBtn.length;i++){
		
		aBtn[i].onmouseover=function(){
		  clearInterval(timer);
		  changeAc();
		}
	  }    
	  //定义计时器
	  timer=setInterval(run,1800)
	  //封装函数run
	  function run(){
		n++;
		if(n>aLi.length-1){
			n=0;
			slideItem(aLi.length-1,0);
		}else{
			slideItem(n-1,n);
		};
		
		changeAc();
	  };
	  
	function changeAc(){
		for(var j=0; j<aBtn.length; j++){
			aBtn[j].className='';
		};
		aBtn[n].className='ac';
	}	
};


//楼层显示----------------------------------------------------------------

function floors(){
	
	var LocationFloorList=document.getElementsByClassName('LocationFloorList')[0];
	var aLi=LocationFloorList.getElementsByTagName('li');
	var aFloor=document.getElementsByClassName('floorbig');
	var arr=[];
		
	//-------------------------------------------------
		
	for(var i=0; i<aFloor.length; i++){
		var json={};
		json.name=i;
		json.offsetTop=aFloor[i].offsetTop;
		arr.push(json);
	};
	
	//console.log(arr);
	
	window.onscroll=function(){
		//显示楼层编号-------------------------------------------------
		var scrolltop=document.documentElement.scrollTop || document.body.scrollTop;
		if(scrolltop<1300){
			LocationFloorList.style.display='none';
		}else if(scrolltop>9500){
			LocationFloorList.style.display='none';
		}else{
			LocationFloorList.style.display='block';
		};
		
		// 根据楼层滚动位置，定位编号------------------------------------------------
		var last_arr=[];
		
		for(var j=0; j<arr.length; j++){
			if(arr[j].offsetTop<scrolltop+400){
				last_arr.push(arr[j].name);
			}
		};
		
		//console.log(last_arr)
		
		var li_index=last_arr[last_arr.length-1];

		for(var l=0; l<aFloor.length; l++){
			aLi[l].className='';
		};
		aLi[li_index].className='ac';
	};
	
	//点击编号，跳转到相对楼层-----------------------------------------------
	for(var i=0; i<aFloor.length; i++){
		aLi[i].index=i;
		aLi[i].onclick=function(){
			var start=document.documentElement.scrollTop || document.body.scrollTop;
			var end=arr[this.index].offsetTop;
			move(start,end)
		}
	};
	//move-------------------------------------------------------
	var timer;
	function move(start,end){
		var dis=end-start;
		var count=parseInt(1500/30);
		var n=0;
		clearInterval(timer);
		timer=setInterval(function(){
			n++;
			var a=1-n/count;
			var step_dis=start+dis*(1-a*a*a*a);
			window.scrollTo(0,step_dis);
			if(n==count){
				clearInterval(timer);
			};
		},30)
	};
}

//楼层选项卡--------------------------------------
function subrun(n){
	var aFloor=document.getElementsByClassName('floorbig');
	var tabBtn=aFloor[n].getElementsByClassName('floorstabs')[0];
	var aBtn=tabBtn.children;
	var aBox=aFloor[n].getElementsByClassName('floorstab');
	for(var i=0;i<aBox.length;i++){
		aBox[i].style.display='none';
	};
	aBox[0].style.display='block';
	for(var i=0;i<aBtn.length;i++){
		aBtn[i].index=i;
		aBtn[i].onmouseover=function(){
			for(var j=0;j<aBtn.length;j++){
				aBtn[j].className='';
				aBox[j].style.display='none';
			};
			this.className='hover';
			aBox[this.index].style.display='block';
		};
	};
		
};










