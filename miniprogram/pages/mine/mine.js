// miniprogram/pages/mine/mine.js
const util=require('../util/checkLogin.js')
const ArrUtil=require('../util/arrUtil.js')
const comUtil=require('../util/common.js')
import Dialog from '/@vant/weapp/dialog/dialog';
import Toast from '/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')//使用授权模块
    ,
    userName:"",
    userCity:"",
    avatarUrl:"",
    activeName:'',//默认关闭
    isLogin:false
  } ,
  clickUrl:function(e){
    wx.navigateTo({
      url:"/pages/alllist/alllist",   
    })
  },
  delclick:function(){
    Dialog.confirm({
      title: '标题',
      message: '真的要全部删除吗？',
    }).then(() => {
        //弹框确认时
        try {
          this.calldelAll()
          Toast('删除成功');
        } catch (error) {
          
        }
       
    }).catch(() => {
        //弹框取消时
    });
  },
  onClose(event) {
    var _id=event.detail.name  //要修改的id
    const { position } = event.detail;
    switch (position) {
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？',
        }).then(() => {
            //删除item
            this.delItem(_id)
        }) .catch(() => {
          // on cancel
        });
        break;
    }
  },
  delItem:function(_id){
    //删除类目
    wx.cloud.callFunction({
      // 云函数名称
      name: 'delItemType',
      data:{
        _id:_id
      },
      complete: res => {
        this.selectItem(true)//刷新数据
      }
    })    
  },
  callselectAll:function(){
    wx.cloud.callFunction({
      // 云函数名称
      name: 'selectAll',
      // 传给云函数的参数
      complete: res => {
        console.log('callFunction test result: ', res.result.data)
        const arr=ArrUtil.GroupByArr(res.result.data,"item_name")
        const newArr=[]
        for(let i=0;i<arr.length;i++){
          //count 总数
          newArr.push({
            name:arr[i].key,
            data:Math.abs(arr[i].count) ,
            sum:arr[i].sum,
            index:arr[i].index,
            detail:arr[i].value
          })
        }
        this.setData({
          arrObj:newArr
        })
        console.log(newArr)
      }
    })
  },
  calldelAll:function(){
    wx.cloud.callFunction({
      // 云函数名称
      name: 'delAll',
      // 传给云函数的参数
      data: {
        
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
    var user=util.showUserInfo()
    this.setData({
      isLogin:user[0].isLogin,
      avatarUrl:user[0].avatarUrl,
      userName:user[0].nickName,
      userCity:user[0].city
    })
  },
  //授权成功回调存储数据
  bindGetUserInfo (e) {
    if(e.detail.userInfo){
      var that=this
      util.getUserStatus(that,e.detail.userInfo)
    }
    var user=util.showUserInfo()
    this.setData({
      isLogin:user[0].isLogin,
      avatarUrl:user[0].avatarUrl,
      userName:user[0].nickName,
      userCity:user[0].city
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