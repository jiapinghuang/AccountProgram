//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {

      //引入云开发并创建环境
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'test-7gslf8efab2e135a',//云开发环境id
        traceUser: true,
      })
    }

    
    try {
      var value = wx.getStorageSync('openid')
      if (value) {
          console.log("本地缓存："+value)
      }else{
          console.log("重新请求数据：")
          this.getSession();
      }
    } catch (e) {
        console.log(e);
    }
  },
  globalData: {
    userInfo: null
  },
  //获取授权
  info:function(){
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })   
  },
  //登陆和获得openid过程
  getSession:function() {    
        // 登录
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {        
              var  appid='wx804f9f831841e885'
              var  secret='9ea7b4c4cc060321c11bf76878f5424f'
              wx.request({
                  url: 'https://api.weixin.qq.com/sns/jscode2session?'+
                        'appid='+appid+
                        '&secret='+secret+'&js_code='+res.code+               
                        '&grant_type=authorization_code',           
                success:(res)=>{
                    console.log(res.data.session_key);
                    console.log(res.data.openid);
                      //本地存储
                      wx.setStorageSync('openid', res.data.openid),
                      wx.setStorageSync('session_key',res.data.session_key)                  
                }           
              })
            } else{
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        }) 
  },
  checksession:function(){
    wx.checkSession({
      success () {
        //session_key 未过期，并且在本生命周期一直有效
        console.log(res,'登录未过期')
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
        this.getSession();
      }
    })

  }

})
