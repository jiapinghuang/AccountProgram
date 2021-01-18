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
   
    // const obj=[
    //   {
    //     addDate: 20210114,
    //     del: false,
    //     desc: "面试",
    //     item_name: "交通",
    //     item_type: "O",
    //     money: "1000",
    //     openid: "ok3nA4orVFYQ2ttc9b_YSOw0i9lQ",
    //     _id: "b45a21d55fffecaa04c610cd214ce471"
    //   },
    //   {
    //     addDate: 20210111,
    //     del: false,
    //     desc: "55",
    //     item_name: "教育",
    //     item_type: "O",
    //     money: "55",
    //     openid: "ok3nA4orVFYQ2ttc9b_YSOw0i9lQ",
    //     _id: "023ce9555ffffd20046cfad149ac45ff",
    //   },
    //   {
    //     addDate: 20210103,
    //     del: false,
    //     desc: "跑滴滴",
    //     item_name: "交通",
    //     item_type: "I",
    //     money: "330",
    //     openid: "ok3nA4orVFYQ2ttc9b_YSOw0i9lQ",
    //     _id: "21ded5cb6001054c0508cb5456e30de9"
    //   },
    //   {
    //     addDate: 20210106,
    //     del: false,
    //     desc: "租车服务",
    //     item_name: "教育",
    //     item_type: "I",
    //     money: "100",
    //     openid: "ok3nA4orVFYQ2ttc9b_YSOw0i9lQ",
    //     _id: "023ce9556001056f048025172d40789d"
    //   },  {
    //     addDate: 20210114,
    //     del: false,
    //     desc: "面试",
    //     item_name: "交通",
    //     item_type: "O",
    //     money: "1000",
    //     openid: "ok3nA4orVFYQ2ttc9b_YSOw0i9lQ",
    //     _id: "b45a21d55fffecaa04c610cd214ce471"
    //   },
    //   {
    //     addDate: 20210111,
    //     del: false,
    //     desc: "55",
    //     item_name: "教育",
    //     item_type: "O",
    //     money: "55",
    //     openid: "ok3nA4orVFYQ2ttc9b_YSOw0i9lQ",
    //     _id: "023ce9555ffffd20046cfad149ac45ff",
    //   },
    //   {
    //     addDate: 20210103,
    //     del: false,
    //     desc: "跑滴滴",
    //     item_name: "交通",
    //     item_type: "I",
    //     money: "330",
    //     openid: "ok3nA4orVFYQ2ttc9b_YSOw0i9lQ",
    //     _id: "21ded5cb6001054c0508cb5456e30de9"
    //   },
    //   {
    //     addDate: 20210106,
    //     del: false,
    //     desc: "租车服务",
    //     item_name: "教育",
    //     item_type: "I",
    //     money: "100",
    //     openid: "ok3nA4orVFYQ2ttc9b_YSOw0i9lQ",
    //     _id: "023ce9556001056f048025172d40789d"
    //   }
    // ]
    // const arr=ArrUtil.GroupByArr(obj,"item_name")
    // const newArr=[]
    // const colorArr=['#f5c','#dd0','#0fc','#f85']
    // for(let i=0;i<arr.length;i++){
    //   //const a1= ArrUtil.GroupByArr(arr[i].value,"item_type")
    //   //count 总数
    //   newArr.push({
    //     name:arr[i].key,
    //     data:arr[i].count,
    //     color:colorArr[i]
    //   })
    // }
    // console.log(newArr)
    // drawCanvas.drawRect(newArr)
    
    
  }
});

