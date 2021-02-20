const cloud = require('wx-server-sdk')
cloud.init({
  env: "account-9gl79b41cb9b17a9",
  traceUser: true,
})
exports.main = async (event) => {
  const db = cloud.database()
  let fn = event.fn
  let data = event.data
  let fnMap = {
    deleteAccountBook(){
      return new Promise((res, rej)=>{
        db.collection('account-books').doc(data._id).remove().then(()=>{
          res()
          db.collection('user-classifies').where({accountBook:data._id}).remove()
          db.collection('accounts').where({accountBook:data._id}).remove()
        }).catch(e=>{
          rej(e)
        })
      })
    }
  }
  return await fnMap[fn]()
}
