
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
      let sum=0 //总笔数
      groupArr.map(function(item){
        if(item[column_name]===sArr[i]){
          count+=parseInt(item.money);
          newArr.push(item)
          sum++
        }      
      })
      newArr.filter((item)=>{
        var str=item.addDate +''
         return item.addDate= str.substring(0,4)+'年'+str.substring(4,6)+'月'+str.substring(6,10)+'日'
      })
      arr.push({"index":i,"key":sArr[i],"value":newArr,"count":count,"sum":sum})
      count=0
      sum=0
  }
//  console.log("第一手原始数据分类:",arr) 
 return arr
}
module.exports={
  GroupByArr:GroupByArr
}