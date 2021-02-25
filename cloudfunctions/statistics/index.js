const cloud = require('wx-server-sdk')
cloud.init({
  env: "account-9gl79b41cb9b17a9",
  traceUser: true,
})
const db = cloud.database()
const $ = db.command.aggregate
exports.main = async (event) => {
  let data = event.data
  let fn = event.fn
  let matchOptions = {
    accountBook:data.accountBook,
    date: db.RegExp({
      regexp: data.date,
      options: 'i',
    })
  }
  if (fn === 'dateGroup') {
    return await db.collection('accounts')
      .aggregate()
      .match(matchOptions)
      .group({
        _id: "$date",
        total: $.sum('$amount')
      })
      .end()
  }
}