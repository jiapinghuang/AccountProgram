//日期工具类
//获取当前月份天数:
function GetCurrentDate(){
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var d = new Date(year, month, 0);
  return d.getDate();
}
function changeNum(num){
  //将1~9格式化为01~09  
  var res=num
  if(num<10){
    res='0'+num
  }
  return res
}
module.exports={
  GetCurrentDate:GetCurrentDate,
  changeNum:changeNum
}