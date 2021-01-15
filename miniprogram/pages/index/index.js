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
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.callSelectAccount()
  },
    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow");
    //util.checkSession(); 
  }
})