// miniprogram/pages/index/index.js
const util=require('../util/checkLogin.js')
const dateUtil=require('../util/Date.js')
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth()+1;
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
    ODmoney:0,//某天统计
    IDmoney:0,
    IaccountDetail:[],//账本信息数组
    OaccountDetail:[],
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
    console.log(selectDate)
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
    this.calulateMMoney(obj,"d")
    let Iarr=[]
    let Oarr=[]
    obj.forEach(item=>{
      if(item.item_type==="O"){
        Iarr.push(item)
      }else{
        Oarr.push(item)
      }    
    })
    this.setData({
      IaccountDetail:Iarr,
      OaccountDetail:Oarr
    })
  }
  ,
  callSelectCurrentMon:function(){
    var minDate=dateUtil.formatDate(this.data.minDate)
    var maxDate=dateUtil.formatDate(this.data.maxDate)
    console.log(minDate)
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
        console.log('callFunction test result: ', res.result.data)      
        this.calulateMMoney(res.result.data,"m")
      }
    })
  },

  //计算金额收支
  calulateMMoney:function(obj,type) {
    //数组按IO分类
    var Omoney=0
    var Imoney=0
    obj.forEach(item=>{
      if(item.item_type==="O"){
        Omoney-=parseInt(item.money)
      }else{
        Imoney+=parseInt(item.money)
      }    
    })
    if(type==="m"){
      this.setData({
        OMmoney:Omoney,
        IMmoney:Imoney
      })
    }else{
      this.setData({
        ODmoney:Omoney,
        IDmoney:Imoney
      })
    }
   
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
   // this.callSelectAccount()
    }
  }
})