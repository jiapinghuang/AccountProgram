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
     // 展示本地存储能力
      var logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)


  
    function CheckSession(params) {

    }
    function getSession() {    
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
                    console.log(res)                  
                }           
              })
            } else{
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        })
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
    }
  },
  
  globalData: {
    userInfo: null
  }
})
