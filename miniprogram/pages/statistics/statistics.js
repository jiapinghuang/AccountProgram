//wxcharts.js
const util = require('../util/util.js');
var Charts = require('../util/wxcharts-min.js');
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
    defaultDate:new Date().getTime(),
    activeNames: ['1'] //折叠面板参数
    
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
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
    this.callSelectRangDate()
  },
  onLoad:function(e){
    
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
      this.SelectRangDate(minDate,maxDate)     
    }   
  },
  SelectRangDate:function(minDate,maxDate){
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
        this.setData({
          arrObj:res.result.data
        })
        const arr=ArrUtil.GroupByArr(res.result.data,"item_name")
        const newArr=[]
        const colorArr=['#f5c','#dd0','#0fc','#f85']
        for(let i=0;i<arr.length;i++){
          //count 总数
          newArr.push({
            name:arr[i].key,
            data:Math.abs(arr[i].count) ,
            color:colorArr[i],
            sum:arr[i].sum,
            index:arr[i].index,
            detail:arr[i].value
          })
        }
        this.setData({
          arrObj:newArr
        })
        new Charts({
          canvasId: 'canvas1',
          type: 'pie',
          series:newArr,
          width:400,
          height: 300,
          dataLabel: true
        });
       // drawCanvas.drawRect(newArr)  
      }
    })
  },
  onReady: function (e) {
    //加载图表开发工具会死机，需要删除重启
    
   
  }
  
});

