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
  var res=num
  if(num<10){
    res='0'+num
  }
  return res
}
var currentDate=getCurrentDate("currentDate")
var selectDate=getCurrentDate("selectDate")
//传入年、月获得最小日期
function getMinDate(y,m) {
   var date=new Date(y, m-1, 1).getTime()
   return date
}
//传入年、月获得最大日期
function getMaxDate(y,m) {
  var d = new Date(y, m, 0);
  var date=new Date(y, m-1, d.getDate()).getTime()
  return date
}

function getCurrentDate(type){
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var d = date.getDate()
  
  if(month<10){
    month='0'+month;
  }
  if(d<10){
    d='0'+d;
  }
  var str='';
  if(type!="selectDate"){
    str=year+'-'+month+'-'+d;
  }else{
    str=year+''+month+''+d;
  }
  return str;
}


//格式化日期20210115
function formatDate(date){
  date = new Date(date);  
  var m=date.getMonth() + 1
  var d=date.getDate()
  var dd=`${date.getFullYear()}${changeNum(m)}${changeNum(d)}`;
  return parseInt(dd);
}
module.exports={
  GetCurrentDate:GetCurrentDate,
  changeNum:changeNum,
  selectDate:selectDate,
  formatDate:formatDate,
  currentDate:currentDate,
  getMinDate:getMinDate,
  getMaxDate:getMaxDate
}