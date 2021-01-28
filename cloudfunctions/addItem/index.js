// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db=cloud.database();
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  return await db.collection('Item').add({
    data: {
      type: event.type,
      item_desc: event.item_desc,  
      IO:event.IO,
      del:false
    }
  })
  
}
