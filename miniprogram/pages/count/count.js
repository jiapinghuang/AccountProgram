// miniprogram/pages/count/count.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      type:'',
      money:null,
      acountDate:''
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      acountDate: e.detail.value
    })
  },
  test:function(){
    console.log(this)
    console.log("----",this.data.acountDate)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var value = wx.getStorageSync('openid')
    // console.log("openid:",value)
    console.log(options)
  },
  //当输入框发生改变时，获取值。
  typeInputChangeHandle:function(e){
    this.setData({
      type:e.detail.value
    })
  },
  moneyInputChangeHandle:function(e){
    this.setData({
      money:e.detail.value
    })
  },
  callAdd:function(){
    var type=this.data.type
    var money=this.data.money
    var acountDate=this.data.acountDate
    if(!type||!money||!acountDate){
        console.log("至少有一项为空值")
    }else{
      console.log("触发云函数")
       wx.cloud.callFunction({
        // 云函数名称
        name: 'add',
        // 传给云函数的参数
        data: {
          type:type,
          money:money,
          acountDate:acountDate
        },
        complete: res => {
          console.log('callFunction test result: ', res)
        }
      })
      this.setData({
        type:"",
        money:"",
        acoutDate:""
      })
   }
   
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