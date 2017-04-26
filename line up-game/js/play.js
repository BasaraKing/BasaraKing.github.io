var persons=document.getElementsByClassName('persons')[0];

var widths=window.innerWidth;

var len=parseInt(window.innerWidth/63)+10;

var str='';
var arr=['male1','child','male2','female'];
for(var i=0;i<len;i++){
	str+='<span class="'+arr[Math.floor(i%4)]+'" style="left:'+i*56+'px";></span>';
}
persons.innerHTML = str;
var movable=document.getElementsByClassName('movable')[0];
//记录可移动黄色 色块的最初位置
var posx=getPos(movable).left;
var posy=getPos(movable).top;
var spl;
var spt;
var spans;
var timer;
var timer1;
var movex;
var number=0;
var tooltip=document.getElementsByClassName('tooltip')[0];
var bg=document.getElementsByClassName('bg')[0];

//鼠标按下可移动黄色 色块
movable.onmousedown=function(ev){
	var disx=ev.clientX-this.offsetLeft;
	var disy=ev.clientY-this.offsetTop;
	//鼠标按下之后 记录黄色 色块 的位置
	var movesx=getPos(movable).left;
	var movesy=getPos(movable).top;
	this.style.cursor='pointer';
	
	timer1=setInterval(function(){
			if(movex>widths/2){
				number++;
				tooltip.innerHTML=(100+number)+' '+'MINTUTES';
			}else{
				number--;
				if(number<0){
					number=0;
					tooltip.innerHTML=number+' '+'MINTUTES';
				}
			}
		},200)
	
	//黄色 色块移动
	document.onmousemove=function(ev){
		//鼠标移动位置
		var x=ev.clientX-disx;
		var y=ev.clientY-disy;
		movex=x;
		//黄色 色块可移动的最大范围
		var maxX = window.innerWidth - movable.offsetWidth;
		//判断位置是否超出，如果超出就拉回
		if(movex<0){
			movex = 0;
		}
		if(movex>maxX){
			movex = maxX;
		}
		
		//获取页面上生成的所有黄色 色块
		var span=document.getElementsByTagName('span');
		for(var i=0;i<span.length;i++){
			//判断什么时候没有碰上
			if(getPos(movable).bottom<getPos(span[i]).top||getPos(span[i]).right<getPos(movable).left||getPos(span[i]).bottom<getPos(movable).top||getPos(movable).right<getPos(span[i]).left){
				//console.log('没碰上');
			}else{
				console.log('碰上了了啦啦啦啦啦');
				//获取被碰到的黄色 色块位置
				 spans=span[i];
				var spanx=getPos(spans).left;
				var spany=getPos(spans).top;
				
				spl=spanx;
				spt=spany;
			}
			
		}
		
		movable.style.left=x+'px';
		movable.style.top=y+'px';
		
	};
	var num=0;
	timer=setInterval(function(){
		if(movex>widths/2){
			num++;
			if(num>1){
				num=0;
			}
			persons.style.left=(num-1)*110+'px';
			bg.style.left=(num-1)*50+'px';
			
		}else{
			num++;
			if(num>1){
				num=0;
			}
			persons.style.left=-num*110+'px';
			bg.style.left=-num*50+'px';
		}
		},200);
	
	document.onmouseup = function(){
		document.onmousemove = null;
		movable.style.left=spl+'px';
		movable.style.top=-144+'px';
//		spans.style.display='none';
		clearInterval(timer);
		clearInterval(timer1);
		shake(movable,'top',function(){
		});
		function shake(obj,attr,callback){
			var arrs = [];
	
			for(var i=10;i>0;i-=5){
				arrs.push(i,-i);
			}
			arrs.push(0);
			// console.log(arr);
			var nums = 0;
			var n = css(obj,attr);
			var timers = setInterval(function(){
				movable.style[attr] = n+arrs[nums]+'px';
				nums++;
				if(nums >= arrs.length){	
					clearInterval(timers);
					callback&&callback();
				}
			}, 30);
		}
		
	};
	return false;
};


function css(obj,attr){
	return parseFloat(obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr]);
}

function getPos(obj){
	return obj.getBoundingClientRect();
}