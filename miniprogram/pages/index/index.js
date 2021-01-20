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
  test:function() {
    var obj=[
      {
        addDate: 20210114,
        del: false,
        desc: "面试",
        item_name: "交通",
        item_type: "O",
        money: "1000",
        openid: "ok3nA4orVFYQ2ttc9b_YSOw0i9lQ",
        _id: "b45a21d55fffecaa04c610cd214ce471"
      },
      {
        addDate: 20210111,
        del: false,
        desc: "55",
        item_name: "教育",
        item_type: "O",
        money: "55",
        openid: "ok3nA4orVFYQ2ttc9b_YSOw0i9lQ",
        _id: "023ce9555ffffd20046cfad149ac45ff",
      },
      {
        addDate: 20210103,
        del: false,
        desc: "跑滴滴",
        item_name: "交通",
        item_type: "I",
        money: "330",
        openid: "ok3nA4orVFYQ2ttc9b_YSOw0i9lQ",
        _id: "21ded5cb6001054c0508cb5456e30de9"
      },
      {
        addDate: 20210106,
        del: false,
        desc: "租车服务",
        item_name: "教育",
        item_type: "I",
        money: "100",
        openid: "ok3nA4orVFYQ2ttc9b_YSOw0i9lQ",
        _id: "023ce9556001056f048025172d40789d"
      }
    ]
    this.showDayDetail(obj)
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