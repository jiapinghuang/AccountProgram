// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db=cloud.database();
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await db.collection('Item').where({
      openid: wxContext.OPENID,
      del: false,
      IO:event.IO
  }).field({
    type: true,
    IO:true,
    item_desc:true,
    _id:true
  })
  .get({
    success: function(res) {
      // res.data 是包含以上定义的两条记录的数组
      // console.log(res.data)
    }
  })
}