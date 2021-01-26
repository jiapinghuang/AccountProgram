// miniprogram/pages/index/index.js
const util=require('../util/checkLogin.js')
const dateUtil=require('../util/Date.js')
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth()+1;
import arrUtil from '../util/arrUtil.js';
import Dialog from '/@vant/weapp/dialog/dialog';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    defaultDate:dateUtil.currentDate,
    minDate:dateUtil.getMinDate(year,month),
    maxDate:dateUtil.getMaxDate(year,month),
    selectDate:dateUtil.selectDate,
    OMmoney:0,//某月统计
    IMmoney:0,
    Isum:0,//某天统计
    Osum:0,
    accountDetail:[],//总账本信息
    overlayShow: true //遮罩层控制
    
  },
  //日期开始
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  onConfirm(event) {
    this.setData({
      show: false,
      selectDate: dateUtil.formatDate(event.detail)
    });
    this.callSelectAccount()
  },
  //call云函数，按天查找
  callSelectAccount:function(){
    var selectDate=this.data.selectDate
    wx.cloud.callFunction({
      // 云函数名称
      name: 'selectByDay',
      // 传给云函数的参数
      data: {
        addDate:parseInt(selectDate) 
      },
      complete: res => {
        console.log('callFunction test result: ', res)
        this.showDayDetail(res.result.data)
      }
    })
  },
  //展示账本信息
  showDayDetail:function(obj) {
   // this.calulateMMoney(obj,"d")
   let Isum=0;
   let Osum=0;
    let arr=arrUtil.GroupByArr(obj,"item_name")
    arr.filter((item)=>{
      if(item<0){
        Osum=Osum-item.count
      }else{
        Isum=Isum+item.count
      }
    })
    this.setData({
      accountDetail:arr,
      Isum:Isum,
      Osum:Osum
    })
  }
  ,
  callSelectCurrentMon:function(){
    var minDate=dateUtil.formatDate(this.data.minDate)
    var maxDate=dateUtil.formatDate(this.data.maxDate)
    wx.cloud.callFunction({
      // 云函数名称
      name: 'selectCurrentMon',
      // 传给云函数的参数
      data: {
        //一个月的范围
        minDate:parseInt(minDate),
        maxDate:parseInt(maxDate) 
      },
      complete: res => {    
        let IMsum=0;
        let OMsum=0;
        let arr=arrUtil.GroupByArr(res.result.data,"item_name")
        console.log('arr', arr)     
          arr.filter((item1)=>{
             for(let i=0;i<item1.value.length;i++){             
                if(item1.value[i].money<0){
                  OMsum=OMsum- parseInt(item1.value[i].money) 
                }else{
                  IMsum=IMsum+parseInt(item1.value[i].money)
                }
             }            
          })
          this.setData({
            IMsum:IMsum,
            OMsum:OMsum
          })
      }
    })
  },
  addAccount:function(){
    //跳转到新增页面
    wx.navigateTo({
      url:'pages/count/count'
    })
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    //util.checkSession(); 
  },
  onLoginTip:function(){
    Dialog.alert({
      message: '在我的页面授权后，才能使用~',
    }).then(() => {
      // on close
    });
  },
  onReady:function(){

  },
  onShow:function(){
    var cover=util.getOverlayShowStorge()
    if(cover){
      this.setData({
        overlayShow:false
      })
      this.callSelectCurrentMon()
      this.callSelectAccount()
    }
  }
})