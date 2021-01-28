// miniprogram/pages/item/item.js
import Notify from '@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:"",
    IO:'',
    item_desc:''
  },
   ontypeChange:function(event){
    var t=event.detail
    this.setData({
      type:t
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
    var type=this.data.type
    var item_desc=this.data.item_desc
    if(!type||!item_desc){
        console.log("至少有一项为空值")
    }else{
      try{
        wx.cloud.callFunction({
          // 云函数名称
          name: 'addItem',
          // 传给云函数的参数
          data: {
            type:type,
            item_desc:item_desc,
            IO:this.data.IO
          },
          complete: res => {
            if(res.result._id){
              //回到上一页
             wx.navigateBack({
                 delta: 1
             })
           } 
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
    console.log(options.IO)
    this.setData({
      IO:options.IO
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