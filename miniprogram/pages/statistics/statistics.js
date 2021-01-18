//wxcharts.js
const util = require('../util/util.js');
var wxCharts = require('../util/wxcharts-min.js');
const dateUtil=require('../util/Date.js')
const ArrUtil=require('../util/arrUtil.js')
const drawCanvas=require('../util/drawCanvas.js')
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth()+1;
Page({
  data: {
    showDate: '',
    show: false,
    arrObj:[], //时间段数据
    minDate:dateUtil.getMinDate(year,month),
    defaultDate:new Date().getTime()
  },
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  
  onConfirm(event) {  
    const [start, end] = event.detail;
    console.log(start)
    this.setData({
      show: false,
      showDate: dateUtil.formatDate(start)+'-'+dateUtil.formatDate(end),
    });
  },
  onLoad:function(e){
   // this.test()
  },
  //按区间查找数据
  callSelectRangDate:function(){
    let arr=[]
    let minDate=''
    let maxDate=''
    var rangDate=this.data.showDate
    arr=rangDate.split('-')
    if(arr.length>0){
      minDate=arr[0]
      maxDate=arr[1]

      //call
      console.log(minDate)
      wx.cloud.callFunction({
        // 云函数名称
        name: 'SelectRangDate',
        // 传给云函数的参数
        data: {
          //一个月的范围
          minDate:parseInt(minDate),
          maxDate:parseInt(maxDate) 
        },
        complete: res => {
          console.log('callFunction test result: ', res.result.data)
          const arr=ArrUtil.GroupByArr(res.result.data,"item_name")
          const newArr=[]
          const colorArr=['#f5c','#dd0','#0fc','#f85']
          for(let i=0;i<arr.length;i++){
            //count 总数
            newArr.push({
              name:arr[i].key,
              data:arr[i].count,
              color:colorArr[i]
            })
          }
          console.log(newArr)
          drawCanvas.drawRect(newArr)
        }
      })
    }
    
    
  },
  onReady: function (e) {
   
    const obj=[
    {"_id":"b45a21d55fffecaa04c610cd214ce471","item_name":"交通","money":"-1000","desc":"面试","item_type":"O","addDate":2.0210114E+07,"openid":"ok3nA4orVFYQ2ttc9b_YSOw0i9lQ","del":false},
    {"_id":"023ce9555ffffd20046cfad149ac45ff","item_name":"教育","money":"-55","desc":"55","item_type":"O","addDate":20210111,"openid":"ok3nA4orVFYQ2ttc9b_YSOw0i9lQ","del":false},
    {"_id":"21ded5cb6001054c0508cb5456e30de9","item_name":"交通","money":"330","desc":"跑滴滴","item_type":"I","addDate":20210103,"openid":"ok3nA4orVFYQ2ttc9b_YSOw0i9lQ","del":false},
    {"_id":"023ce9556001056f048025172d40789d","item_name":"教育","money":"100","desc":"租车服务","item_type":"I","addDate":20210106,"openid":"ok3nA4orVFYQ2ttc9b_YSOw0i9lQ","del":false},
    {"_id":"023ce955600145450489b47b2df10eca","item_name":"交通","money":"-50","desc":"打车","item_type":"O","addDate":20210115,"openid":"ok3nA4orVFYQ2ttc9b_YSOw0i9lQ","del":false},
    {"_id":"b45a21d5600145c604e69efc21be1e22","item_name":"交通","money":"-500","desc":"帽子","item_type":"O","addDate":20210109,"openid":"ok3nA4orVFYQ2ttc9b_YSOw0i9lQ","del":false},
    {"_id":"21ded5cb600146620512c9e273820d70","item_name":"服饰","money":"-100","desc":"测试","item_type":"O","addDate":20210105,"openid":"ok3nA4orVFYQ2ttc9b_YSOw0i9lQ","del":false},
    {"_id":"023ce955600146df0489d19418cf65c8","item_name":"服饰","money":"120","desc":"测试2","item_type":"I","addDate":20210110,"openid":"ok3nA4orVFYQ2ttc9b_YSOw0i9lQ","del":false},
    {"_id":"b45a21d560014af204e73e7126e7ee23","item_name":"服饰","money":"11","desc":"测试2","item_type":"I","addDate":20201224,"openid":"ok3nA4orVFYQ2ttc9b_YSOw0i9lQ","del":false},
    {"_id":"023ce95560014bbd048a7061544c602a","item_name":"服饰","money":"-66","desc":"测试真机","item_type":"O","addDate":20210115,"openid":"ok3nA4orVFYQ2ttc9b_YSOw0i9lQ","del":false},
    {"_id":"be7fb3986001639803d09bd807e530ef","item_name":"服饰","money":"-10","desc":"哈哈哈哈","item_type":"O","addDate":20210115,"openid":"ok3nA4ht49soCTicI0IGyT9TL0mU","del":false},
    {"_id":"ce805e7860053a3b04b8013b0086999f","item_name":"教育","money":"-100","desc":"测试支出","item_type":"O","addDate":20210118,"openid":"ok3nA4orVFYQ2ttc9b_YSOw0i9lQ","del":false},
    {"_id":"21ded5cb60053a53056771ba7d50b8c1","item_name":"教育","money":"200","desc":"测试支出","item_type":"I","addDate":20210118,"openid":"ok3nA4orVFYQ2ttc9b_YSOw0i9lQ","del":false}
        ]
    const arr=ArrUtil.GroupByArr(obj,"item_name")
    const newArr=[]
    const colorArr=['#f5c','#dd0','#0fc','#f85']
    for(let i=0;i<arr.length;i++){
      //const a1= ArrUtil.GroupByArr(arr[i].value,"item_type")
      //count 总数
      newArr.push({
        name:arr[i].key,
        data:arr[i].count,
        color:colorArr[i]
      })
    }
    console.log(newArr)
    drawCanvas.drawRect(newArr) 
  }
});

