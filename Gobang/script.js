var chess = document.getElementById("mycanvas");
var context = chess.getContext('2d');
context.strokeStyle = '#bfbfbf';
var me = true;

//记录一个初始位置
var chessboard = [];
for (var i=0;i<15;i++) {
	chessboard[i] = [];
	for (var j=0;j<15;j++) {
		chessboard[i][j]=0;
	}
}
//绘制棋盘
for (var i=0;i<15;i++) {
	context.moveTo(15 + i*30,15);
	context.lineTo(15 + i*30,435);
	context.stroke();
	context.moveTo(15,15 + i*30);
	context.lineTo(435,15 + i*30);
	context.stroke();
}

//绘制棋子
//context.beginPath();
//context.arc(200,200,100,0,2*Math.PI);
//context.closePath();
//var gradient = context.createRadialGradient(200,200,50,200,200,20);//渐变
//gradient.addColorStop(0,'#0a0a0a');
//gradient.addColorStop(1,'#636766');
//
//context.fillStyle = gradient;
//context.fill();

//封装黑白棋子函数
function onestep(i,j,me){
	context.beginPath();
	context.arc(15 + i*30,15 + j*30,13,0,2*Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(15 + i*30 +2,15 + j*30 -2,13,15 + i*30 +2,15 + j*30 -2,0);//渐变
	if(me){
		gradient.addColorStop(0,'#0a0a0a');
		gradient.addColorStop(1,'#636766');
	}else{
		gradient.addColorStop(0,'#d1d1d1');
		gradient.addColorStop(1,'#f9f9f9');
	}
	context.fillStyle = gradient;
	context.fill();
}
//onestep(0,0,true);
//onestep(1,1,false);

//模拟落子函数
chess.onclick = function(e){
	var x = e.offsetX;
	var y = e.offsetY
	var i = Math.floor(x/30);
	var j = Math.floor(y/30);
	
	if (chessboard[i][j]==0) {
		onestep(i,j,me);
		if (me) {
			chessboard[i][j]=1;
		}else{
			chessboard[i][j]=2;
		}
		me = !me; 
	}
};
