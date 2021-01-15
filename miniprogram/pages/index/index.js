// miniprogram/pages/index/index.js
const util=require('../util/checkLogin.js')
const dateUtil=require('../util/Date.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    defaultDate:dateUtil.currentDate,
    minDate:dateUtil.minDate,
    maxDate:dateUtil.maxDate,
    selectDate:dateUtil.selectDate
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
      }
    })
  },
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
        console.log('callFunction test result: ', res)
      }
    })
  },
  test:function() {
    this.callSelectCurrentMon()
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.callSelectAccount()
   console.log(dateUtil.formatDate(new Date(2010, 0, 1).getTime())) 
  },
    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow");
    //util.checkSession(); 
  }
})