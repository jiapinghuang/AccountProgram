// miniprogram/pages/index/index.js
const util=require('../util/checkLogin.js')
const dateUtil=require('../util/Date.js')
const date = new Date()
const years = []
const months = []
const days = []

//页面加载，年、月数组赋值
var currentDate=new Date()
years.push(currentDate.getFullYear())
months.push(currentDate.getMonth()+1)
for (let i = 1 ; i <= dateUtil.GetCurrentDate(); i++) {
  days.push(i)
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
  //  date:"",

    //日期控件变量
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    year: date.getFullYear(),
    value: [9999, 1, 1],
  },
  //可选日期函数
  bindChange: function(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  }
  ,
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //call云函数，按天查找
  callSelectAccount:function(){
    var m=dateUtil.changeNum(this.data.month)
    var d=dateUtil.changeNum(this.data.day)
    var aDate=this.data.year+'-'+m+'-'+d

    wx.cloud.callFunction({
      // 云函数名称
      name: 'selectByDay',
      // 传给云函数的参数
      data: {
        addDate:aDate
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