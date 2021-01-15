// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //按月查询信息
  return await db.collection('Account').where({
    //addDate: _.gte(event.minDate).and(_.lte(event.maxdDate)) //大于 小于
  })
  .get({
    success: function(res) {
      // res.data 是包含以上定义的两条记录的数组
      console.log(res.data)
    }
  })
}