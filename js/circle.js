/***
  @author ----- ningwenjing 
  @time   ----- 2016-10-14
***/

var Circle = function(para){	
	this.id = document.getElementById(para.id);	
	this.width = para.width; 		 //宽
	this.height = para.height;		 //高
	this.gpoint = para.dataGrowth;	 //圆长	
	this.dataColor = para.dataColor; //数据线颜色
	this.dataLine = para.dataLine;   //数据圆线宽	
	this.bgColor = para.bgColor;
	this.bgLine = para.bgLine || 2 ;
	this.speed = para.speed;         //速度,值越大越慢
	this.draw();
}

Circle.prototype.draw = function(){
	var clearani,
		degcount = 0,
		that = this,
		radius = that.width/2, //半径
		inWidth = radius - that.dataLine/2, //内径 
		gdeg = that.gpoint/100;	
	gdeg = gdeg.toFixed(2);
	that.id.width = that.width;
	that.id.height = that.height;
	
	var ctx = that.id.getContext("2d");
	ctx.translate(0, that.width);
	ctx.rotate(-90*Math.PI/180);
	ctx.lineCap = "round";	

	var clear = function(c){
		c.clearRect(0, 0, that.width, that.height);
	};

	clearani = setInterval(function(){
		clear(ctx)
		if(degcount <= gdeg){
			ctx.beginPath();		
			ctx.strokeStyle = that.bgColor;
			ctx.lineWidth = that.bgLine;
			ctx.arc(radius,radius,inWidth,0,2*Math.PI);
			ctx.closePath();
			ctx.stroke();
			ctx.beginPath();
			ctx.lineWidth = that.dataLine;
			ctx.strokeStyle = that.dataColor;
			ctx.arc(radius,radius,inWidth,0,degcount*2*Math.PI);
			ctx.stroke();
			degcount = degcount + 0.005;		
		}else{
			clearInterval(clearani);
			ctx.beginPath();		
			ctx.strokeStyle = that.bgColor;
			ctx.lineWidth = that.bgLine;
			ctx.arc(radius,radius,inWidth,0,2*Math.PI);
			ctx.closePath();
			ctx.stroke();
			ctx.beginPath();
			ctx.lineWidth = that.dataLine;
			ctx.strokeStyle= that.dataColor;
			ctx.arc(radius,radius,inWidth,0,gdeg*2*Math.PI);
			ctx.stroke();

		}
	},that.speed);
}