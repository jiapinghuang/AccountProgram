// miniprogram/pages/mine/mine.js
const util=require('../util/checkLogin.js')
const ArrUtil=require('../util/arrUtil.js')
import Dialog from '/@vant/weapp/dialog/dialog';
import Toast from '/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')//使用授权模块
    ,
    userName:"1",
    userCity:"2",
    avatarUrl:"",
    activeNames: '',
    arrObj:''
  } ,
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  onChange(event) {
    //手风琴
    this.setData({
      activeName: event.detail,
    });
  },
  delclick:function(){
    Dialog.confirm({
      title: '标题',
      message: '弹窗内容',
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
  selectAll:function(){
    this.callselectAll()
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
    var that=this  
    util.SetUserDate(that)
    var obj=[
      {
        addDate: 20210114,
        del: false,
        desc: "面试",
        item_name: "交通",
        item_type: "O",
        money: "1000",
        openid: "ok3nA4orVFYQ2ttc9b_YSOw0i9lQ",
        _id: "b45a21d55fffecaa04c610cd214ce471"
      },
      {
        addDate: 20210111,
        del: false,
        desc: "55",
        item_name: "教育",
        item_type: "O",
        money: "55",
        openid: "ok3nA4orVFYQ2ttc9b_YSOw0i9lQ",
        _id: "023ce9555ffffd20046cfad149ac45ff",
      },
      {
        addDate: 20210103,
        del: false,
        desc: "跑滴滴",
        item_name: "交通",
        item_type: "I",
        money: "330",
        openid: "ok3nA4orVFYQ2ttc9b_YSOw0i9lQ",
        _id: "21ded5cb6001054c0508cb5456e30de9"
      },
      {
        addDate: 20210106,
        del: false,
        desc: "租车服务",
        item_name: "教育",
        item_type: "I",
        money: "100",
        openid: "ok3nA4orVFYQ2ttc9b_YSOw0i9lQ",
        _id: "023ce9556001056f048025172d40789d"
      }
    ]

  },
  //授权成功回调存储数据
  bindGetUserInfo (e) {
    if(e.detail.userInfo){
      var that=this
      util.getUserInfo(that,e.detail.userInfo)
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