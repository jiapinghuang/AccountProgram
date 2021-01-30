// miniprogram/pages/count/count.js
const dateUtil=require('../util/Date.js')
const arrUtil=require('../util/arrUtil.js')
const util=require('../util/checkLogin.js')
// const Form=require('../util/Form.js')
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
      addDate:'',//添加时间
      obj:{},
      //时间控件变量
      date: '',
      show: false,
      minDate:dateUtil.getMinDate(year,month-2),
      defaultDate:new Date().getTime(),
      maxDate:new Date().getTime(),
      //类目
      overlayShow:true,//显示遮罩   

      //选项卡
      curIndex:0
  },
  clickUrl:function(e){
    var data=e.currentTarget.dataset.type
    //console.log(data.detail)
    //跳转带参
    wx.navigateTo({
      url:"/pages/item/item?IO="+data
    })
  },
  //tab卡
  onClick(event) {
    this.setData({
      //恢复为初始值
      curIndex:0,
      obj:{},
      item_type:event.detail.name==0?'I':'O'
    })
  },
  clickItemType(event){
    // console.log(event)
    this.setData({
      item_name:event.currentTarget.dataset.itemname,
      curIndex:event.currentTarget.dataset.index
    })
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
      show: false, // 
      addDate:dateUtil.formatDate(event.detail),
    });
    this.data.obj.addDate=dateUtil.formatDate(event.detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
   // console.log("obj",Iobj)
  },
  //获取数据库类目
  callGetItemType:function(){
    wx.cloud.callFunction({
      // 云函数名称
      name: 'GetItemType',
      complete: res => {
        if(res.result.length>0){
          let a1=res.result[0].data
          let a2=res.result[res.result.length-1].data
          let a3=[...a1,...a2]
          let arr1=arrUtil.GroupByArr(a3,"IO")
           for(let i=0;i<arr1.length;i++){
             if(arr1[i].key==='O'){
               console.log(arr1[i].value)
                this.setData({
                   Olist:arr1[i].value
                })
             }else{
                this.setData({
                   Ilist:arr1[i].value
                })
             }
           }
       
        }
        
      }
    })  
  },
  //金额变化时
  onMoneyChange:function(event){
     var m=event.detail
     this.data.obj.money=m
  },
  //备注变化时
  onDescChange:function(event){
    var d=event.detail
    this.data.obj.desc=d
  },
  //新增方法
  callAdd:function(){
   // console.log(this.data.obj)
    var that=this.data.obj
    that.item_name=this.data.item_name
    that.item_type=this.data.item_type
    if(that.item_type==='O'){
      that.money='-'+that.money
      that.item_name=this.data.item_name || this.data.Olist[0].type
    }else{
      that.item_name=this.data.item_name || this.data.Ilist[0].type
    }
    if(!that.item_name||!that.money||!that.addDate){
        Dialog.alert({
          title: '注意',
          message: '金额、类目、日期不能为空值！',
        }).then(() => {
          // on close
        });
    }else{
      try{
        wx.cloud.callFunction({
          // 云函数名称
          name: 'add',
          // 传给云函数的参数
          data: that,
          complete: res => {
             this.setData({
               obj:{},
               addDate:""
             })
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