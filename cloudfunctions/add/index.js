// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db=cloud.database();
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await db.collection('Account').add({
    data: {
      type: event.type,
      money: event.money,
      acoutDate:event.acountDate
    }
  })
  
}