// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db=cloud.database();
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await db.collection('Item').add({
    data: {
      text: event.text,
      value: event.text,  
      item_desc:event.item_desc,
      openid: wxContext.OPENID,
      del:false
    }
  })
  
}
