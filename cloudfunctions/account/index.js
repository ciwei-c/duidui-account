const cloud = require('wx-server-sdk')
cloud.init({
  env: "account-9gl79b41cb9b17a9",
  traceUser: true,
})
const db = cloud.database()
const MAX_LIMIT = 100
exports.main = async (event) => {
  let data = event.data
  let fn = event.fn
  if(fn === 'getAccountsByMonth'){
    let whereOptions = {
      date: db.RegExp({
        regexp: data,
        options: 'i',
      })
    }
    const countResult = await db.collection('accounts').where(whereOptions).count()
    const total = countResult.total
    if(!total) {
      return {
        data: [],
        errMsg: "",
      }
    }
    const batchTimes = Math.ceil(total / 100)
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('accounts').where(whereOptions).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
      tasks.push(promise)
    }
    return (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data),
        errMsg: acc.errMsg,
      }
    })
  }
}