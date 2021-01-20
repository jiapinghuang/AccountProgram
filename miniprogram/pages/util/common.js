function setOverlayShowStorge(data){
  wx.setStorageSync('overlayShow', data)  
}

//用户授权缓存数据
function getOverlayShowStorge(key){
  try {
    var value = wx.getStorageSync(key)
    if (value) {
       return value
    }
  } catch (e) {
    // Do something when catch error
     
  }
}
module.exports={
  setOverlayShowStorge:setOverlayShowStorge,
  getOverlayShowStorge:getOverlayShowStorge
}