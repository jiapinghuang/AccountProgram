// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db=cloud.database();
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const result = await Promise.all([  
  db.collection('ItemCom').where({
        del: false,
        IO:event.IO
    }).field({
      type: true,
      IO:true,
      item_desc:true,
      _id:true
    })
    .get(),db.collection('Item').where({
      del: false,
      IO:event.IO,
      openid:wxContext.OPENID
    }).field({
      type: true,
      IO:true,
      item_desc:true,
      _id:true
    })
    .get()
    ])
    return result
}
