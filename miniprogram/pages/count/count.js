// miniprogram/pages/count/count.js
const dateUtil=require('../util/Date.js')
const util=require('../util/checkLogin.js')
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth()+1;
import Notify from '@vant/weapp/notify/notify';
import Dialog from '/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data:{
      item_type:'I',
      desc:'',//备注
      item_name:'',//类目名称
      money:null,
      addDate:''//添加时间

      //时间控件变量
      ,date: '',
      show: false,
      minDate:dateUtil.getMinDate(year,month-2),
      defaultDate:new Date().getTime(),
      maxDate:new Date().getTime(),
      //类目
      option1: [],
      value1: '' ,
      overlayShow:true //显示遮罩    
  },
  //类目切换时
  itemChange(event){
    var n=event.detail
    this.setData({
      item_name:n
    })
  },
  //单选框的
  onRadioChange(event) {
    this.setData({
      item_type: event.detail,
    });
  },
  onRadioClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      item_type: name,
    });
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
      addDate: dateUtil.formatDate(event.detail),
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //获取数据库类目
  callGetItemType:function(){
    wx.cloud.callFunction({
      // 云函数名称
      name: 'GetItemType',
      complete: res => {
        console.log('callFunction test result: ', res.result.data)
        var v=res.result.data[0].text
        this.setData({
          option1:res.result.data,
          value1:v,
          item_name:v
        })
      }
    })
    
  },
  //金额变化时
  onMoneyChange:function(event){
     var m=event.detail
     console.log(m)
     this.setData({
      money:m
    })
  },
  //备注变化时
  onDescChange:function(event){
    var d=event.detail
    console.log(d)
    this.setData({
     desc:d
   })
  },
  //新增方法
  callAdd:function(){
    var item_name=this.data.item_name
    var money=this.data.money
    var addDate=this.data.addDate 
    var desc=this.data.desc
    var item_type=this.data.item_type
    if(item_type==='O'){
      money='-'+money
    }
    console.log(item_name)
    if(!item_name||!money||!addDate||!desc){
        console.log("至少有一项为空值")
    }else{
      try{
        wx.cloud.callFunction({
          // 云函数名称
          name: 'add',
          // 传给云函数的参数
          data: {
            item_type:item_type,
            money:money,
            addDate:addDate,
            desc:desc,
            item_name:item_name
          },
          complete: res => {
            console.log('callFunction test result: ', res)
            Notify({ type: 'success', message: '添加成功' })
          }
        })
      }catch(err){
        Notify({ type: 'danger', message: '添加失败，请联系管理员' })
      }
      
      
   }
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  onLoginTip:function(){
    Dialog.alert({
      message: '在我的页面授权后，才能使用~',
    }).then(() => {
      // on close
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function(){
    var cover=util.getOverlayShowStorge()
    if(cover){
      this.setData({
        overlayShow:false
      })
      this.callGetItemType()
    }
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