function GroupByArr(groupArr,column_name){
  //根据某一项生成分类组
  //column_name要分类的列名 groupArr对象类型的数组
  const s=new Set() 
  groupArr.filter((item)=>{
      s.add(item[column_name])
  })
  let sArr= [...s]
  //2、再分IO
  let arr=[]
 
  for(let i in sArr)
  {
      var newArr=[]
      let count=0
      groupArr.map(function(item){
        if(item[column_name]===sArr[i]){
          count+=parseInt(item.money);
          newArr.push(item) 
        }      
      })
      arr.push({"key":sArr[i],"value":newArr,count:count})
      count=0
  } 
 return arr
}
module.exports={
  GroupByArr:GroupByArr
}