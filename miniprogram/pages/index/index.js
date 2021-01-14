// miniprogram/pages/index/index.js
const util=require('../util/checkLogin.js')
const dateUtil=require('../util/Date.js')
const date = new Date()
Page({
  /**
   * 页面的初始数据
   */
  data: {
  //  date:""
    //vant 日期
    selectDate:'',
    minDate: date.getFullYear()+'-'+ date.getMonth()+1+'-01',
    defaultDate:new Date().getTime(),
    maxDate:'2021-1-31'
  },
  //日期开始
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);  
    var m=date.getMonth() + 1
    var d=date.getDate()
    return `${date.getFullYear()}-${dateUtil.changeNum(m)}-${dateUtil.changeNum(d)}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      selectDate: this.formatDate(event.detail),
    });
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
        addDate:selectDate
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
  
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow");
    util.checkSession(); 
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})