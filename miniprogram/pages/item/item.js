// miniprogram/pages/item/item.js
import Notify from '@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:"",
    text:'',
    item_desc:''
  },
   //金额变化时
   onTextChange:function(event){
    var t=event.detail
    this.setData({
      text:t
   })
 },
 //备注变化时
 onItemDescChange:function(event){
   var d=event.detail
   this.setData({
    item_desc:d
  })
 },
  callAdd:function(){
    var text=this.data.text
    var item_desc=this.data.item_desc
    if(!text||!item_desc){
        console.log("至少有一项为空值")
    }else{
      try{
        wx.cloud.callFunction({
          // 云函数名称
          name: 'addItem',
          // 传给云函数的参数
          data: {
            text:text,
            item_desc:item_desc
          },
          complete: res => {
            console.log('callFunction test result: ', res)
            Notify({ type: 'success', message: '添加成功' })
            //回到上一页
            wx.navigateBack({
              delta: 1
            })
            //
          }
        })
      }catch(err){
        Notify({ type: 'danger', message: '添加失败，请联系管理员' })
      }     
   }
        
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
    })
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