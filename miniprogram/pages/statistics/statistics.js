//wxcharts.js
const LoginUtil=require('../util/checkLogin.js')
var Charts = require('../util/wxcharts-min.js');
const dateUtil=require('../util/Date.js')
const ArrUtil=require('../util/arrUtil.js')
import Dialog from '/@vant/weapp/dialog/dialog';
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
    activeNames: ['1'], //折叠面板参数
    overlayShow:true,
    //日历组件数据
    years:['2021','2020','2019','2018'],
    months:['1','2','3','4','5','6','7','8','9','10','11','12'],
    tempMinyear:year,//临时年
    tempMinmon:month, //临时月
    confirmMinYear:year,//确定年
    confirmMinMon:month,//确定月
    tempMinIndex:'0', //控制年的样式添加

    tempMaxyear:year,//临时大年
    temMaxmon:month, //临时大月
    confirmMaxYear:year,//确定大年
    confirmMaxMon:month,//确定大月
    tempMaxIndex:'0' //控制大年的样式添加
  },
  //自定义日历组件
  clickMinYear(event){
    console.log("点击year")
    this.setData({
      tempMinyear:event.currentTarget.dataset.year,
      tempMinIndex:event.currentTarget.dataset.index
    })
  },
  clickMinMon(event){
    console.log("点击mon")
    this.setData({
      tempMinmon:event.currentTarget.dataset.mon
    })
  },
  onMyMinClose() {
    console.log("关闭")
  },
  comfirmMinFun(){
    console.log("确认")
    //将临时year mon 存储到正式区
    this.setData({
      confirmMinYear:this.data.tempMinyear,
      confirmMinMon:this.data.tempMinmon
    })
    //查询
  },
  showRiliMinDialog(){
    //显示日历控件
    this.setData({ showMinRili: true });
  },
  //自定义日历组件2
  clickMaxYear(event){
    this.setData({
      tempMaxyear:event.currentTarget.dataset.year,
      tempMaxIndex:event.currentTarget.dataset.index
    })
  },
  clickMaxMon(event){
    this.setData({
      temMaxmon:event.currentTarget.dataset.mon
    })
  },
  onMyMaxClose() {
   this.setData({ showMaxRili: false });
   console.log("关闭了")
  },
  comfirmMaxFun(){
    //将临时year mon 存储到正式区
    this.setData({
      confirmMaxYear:this.data.tempMaxyear,
      confirmMaxMon:this.data.temMaxmon
    })
    //查询
  },
  showRiliMaxDialog(){
    //显示日历控件
    this.setData({ showMaxRili: true });
  },
  selectDateRang(){

    //区间查找数据
    let miny=this.data.confirmMinYear
    let minm=dateUtil.changeNum(this.data.confirmMinMon)
    let minDate=miny+minm+'01' //最小日期
    let maxy=this.data.confirmMaxYear
    let maxm=dateUtil.changeNum(this.data.confirmMaxMon)
    let mmday=dateUtil.getMaxDate(maxy,maxm)
    let maxDate=dateUtil.formatDate(mmday) //最大日期 
    if(parseInt(minDate)>parseInt(maxDate)){
      Dialog.alert({
        title: '标题',
        message: '右边日期不能小于左边日期',
      }).then(() => {
        // on close
      });
    }else{
      this.SelectRangDate(minDate,maxDate)  
    }
   
  },
  //自定义组件2
  onLoad:function(e){
   
  },
  onLoginTip:function(){
    Dialog.alert({
      message: '在我的页面授权后，才能使用~',
    }).then(() => {
      // on close
    });
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
        console.log(res)
        if(res.result.data.length>0){
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
              arrObj:newArr,
              min:minDate,
              max:maxDate
            })
            new Charts({
              canvasId: 'canvas1',
              type: 'pie',
              series:newArr,
              width:300,
              height: 250,
              dataLabel: true
            });         
        }else{
          this.setData({
            message:"没有记账记录~",
            arrObj:null
          })
        } 
      }
    })
  },
  onReady: function (e) {
    //加载图表开发工具会死机，需要删除重启
    
  },
  onShow:function(){
    var cover=LoginUtil.getOverlayShowStorge()
    if(cover){
      this.setData({
        overlayShow:false
      })
      //加载图表 默认统计当月
      let minDate=dateUtil.formatDate(this.data.minDate) 
      let maxDate=dateUtil.formatDate(this.data.defaultDate)
    //  this.SelectRangDate(minDate,maxDate)   
      this.setData({
        min:minDate,
        max:maxDate
      }) 
    }
  }
  
});

