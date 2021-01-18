function drawRect(obj){
  wx.createSelectorQuery()
  .select('#myCanvas')
  .node()
  .exec(res=> {   
    const canvas = res[0].node
    let ctx = canvas.getContext('2d')
    //画图开始
    let sum=0;
    let now=0;
    let cx=180,cy=80,r=40;
    obj.forEach(data=>{
        sum+=data.data;
    })

    obj.forEach(d=>{
      let ang=360*d.data/sum;//求出需要画多少度
      getPie(ctx,cx,cy,r,now,now+ang,d.color);//画扇形
      
      //添加名字
      let mid=(now+now+ang)/2;//取每一块扇图的中间位置为字体的坐标
      let x = cx + r*Math.cos(d2a(mid)), y = cy + r*Math.sin(d2a(mid));//算出字体的x、y坐标
      ctx.font='bold 12px 宋体';//添加字体
      if(mid<180){//如果小于180°就让坐标大一点，文字往下走
        ctx.fillText(d.name,x+40,y+40);
      }else{//如果大于180°就让坐标小一点，文字往上走
        ctx.fillText(d.name,x-40,y-40);
      }     
      now+=ang;//更新now
    })
  
    //结束
  })
}
function getPie(ctx,cx,cy,r,startAng,endAng,color){
    //圆半径r、圆心cx,cy  startAng起始角度、endAng结束角度
    ctx.beginPath()
    //画笔移到圆心上
    ctx.moveTo(cx,cy)
    var x=(cx+Math.cos(d2a(startAng)))
    var y=cy+Math.sin(d2a(startAng))
    ctx.lineTo(x,y) //把线画过去
    ctx.arc(cx,cy,r,d2a(startAng),d2a(endAng),false) //画弧形
    
    ctx.closePath();
    ctx.fillStyle=color;
    ctx.fill();
   
}
function d2a(n){//角度转弧度
      return (n*Math.PI/180);
 }
function a2d(n){//弧度转角度
      return n*180/Math.PI;
}
module.exports={
  drawRect:drawRect
}