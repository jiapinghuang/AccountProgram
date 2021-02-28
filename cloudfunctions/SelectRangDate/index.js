// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await db.collection('Account').where({
    addDate: _.gte(event.minDate).and(_.lte(event.maxDate)),//大于 小于
    openid: wxContext.OPENID
    //item_type:event.item_type
  })
  .get({
    success: function(res) {
     
    }
  })
}