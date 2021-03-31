//app.js
App({
  onLaunch: function () {
        // // 登录
        // wx.login({
        //   success: res => {
        //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //     if(res.code){       
        //       wx.request({
        //         url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx804f9f831841e885&secret=4eee3900721112e5487f313ee60120bf&grant_type=authorization_code&js_code='+res.code,          
        //         header: {
        //           'content-type': 'application/json' // 默认值
        //         },
        //         success (res) {
        //           wx.setStorageSync('openid', res.data.openid)
        //         }                       
        //       })
        //     }
            
        //   }
        // })


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
  },
  
  globalData: {
    userInfo: null
  }
})
