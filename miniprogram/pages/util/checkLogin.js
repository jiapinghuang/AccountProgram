//登陆和获得openid过程
function getSession() {
  console.log("进入getSession");    
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
  console.log("离开getSession");    
}
//判断登陆状态
function checkSession(){
    //判断登陆是否过期
    wx.checkSession({
      success (res) {
        //session_key 未过期，并且在本生命周期一直有效
        console.log(res,'登录未过期')
      },
      fail (err) {
        // session_key 已经失效，需要重新执行登录流程
        console.log(err,'登录过期')
        getSession();
      }
    }) 
}
function tool() {
  console.log('i am a tool function.');
}
module.exports={
  checkSession:checkSession,
  tool:tool
}