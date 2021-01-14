// miniprogram/pages/count/count.js
Page({

  /**
   * 页面的初始数据
   */
  data:{
      item_type:'I',
      desc:'无',//备注
      item_name:'教育',//类目名称
      money:null,
      addDate:''//添加时间

      //时间控件变量
      ,date: '',
      show: false,
      minDate: new Date(2020, 11, 1).getTime(),
      defaultDate:new Date().getTime(),
      //类目
      catorage:['教育','美容','交通','投资','教育','美容','交通','投资'],
      option1: [
        { text: '教育', value: '教育' },
        { text: '交通', value: '交通' },
        { text: '服饰', value: '服饰' },
      ],
      value1: '教育'      
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
  formatDate(date) {
    date = new Date(date);  
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      addDate: this.formatDate(event.detail),
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var value = wx.getStorageSync('openid')
    // console.log("openid:",value)
   // console.log(options)
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
    console.log(item_name)
    if(!item_name||!money||!addDate||!desc){
        console.log("至少有一项为空值")
    }else{
      console.log("触发云函数")
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
          this.setData({
            item_type:"I",
            money:"",
            addDate:"",
            desc:'',
            item_name:'教育'
          })
        }
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