const cloud = require('wx-server-sdk')
cloud.init({
  env: "account-9gl79b41cb9b17a9",
  traceUser: true,
})
const db = cloud.database()
const MAX_LIMIT = 100
exports.main = async (event) => {
  let { OPENID } = cloud.getWXContext()
  let data = event.data
  let fn = event.fn
  let whereOptions = {
    accountBook:data.accountBook,
    _openid:OPENID
  }
  const getTotal = async () => {
    const countResult = await db.collection('quick-account').where(whereOptions).count()
    return new Promise((res)=>{
      res(countResult.total)
    })
  }
  const getEmptyResult = () => {
    return {
      list: [],
      errMsg: "",
    }
  }
  if(fn === 'getQuickAccounts'){
    const total = await getTotal()
    if(!total) return getEmptyResult();
    const batchTimes = Math.ceil(total / 100)
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('quick-account').where(whereOptions).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
      tasks.push(promise)
    }
    return new Promise(async res=>{
      let data = (await Promise.all(tasks)).reduce((acc, cur) => {
        return {
          data: acc.data.concat(cur.data),
          errMsg: acc.errMsg,
        }
      })
      res({
        list:data.data,
        errMsg:data.errMsg
      })
    })
  }
}