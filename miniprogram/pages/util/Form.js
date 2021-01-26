//工厂模式创建对象
function createForm(item_type,desc,item_name,money,addDate) {
  var o = new Object();
  o.item_type = item_type;
  o.desc = desc;
  o.item_name = item_name;
  o.money = money;
  o.addDate = addDate;
  o.addFun = function(){
      console.log("add",this.item_type);
  }
  return o;
}
module.exports={
  createForm:createForm
}
