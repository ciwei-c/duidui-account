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
        _id: {
          date:"$date",
          type:"$type"
        },
        total: $.sum('$amount')
      })
      .end()
  } else if(fn === 'monthGroup') {
    return await db.collection('accounts')
      .aggregate()
      .match(matchOptions)
      .project({
        _id: 0,
        type: 1,
        amount: 1,
        year: $.substr(['$date', 0, 7])
      })
      .group({
        _id: {
          date:"$year",
          type:"$type"
        },
        total: $.sum('$amount')
      })
      .end()
  }
}