// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

//删除所有数据
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    return await db.collection('Item').where({
      del: false,
      _id:event._id,
      openid: wxContext.OPENID
    })
    .remove()
  } catch(e) {
    console.error(e)
  }
}
