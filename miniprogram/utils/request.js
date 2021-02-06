let service = null

class Request {
  constructor() {
    const request = (collectionName, options = {}) => {
      return new Promise((res, rej) => {
        getApp().getAppId().then(data => {
          this.openid = data.openid
          let where = Object.assign(
            options.where || {}, 
            options.whereAssignOpenid ? { openid: this.openid } : {}
          )
          let collection = this.getCollection(collectionName)
          let fn = null
          if(options.method === "get"){
            fn = collection.where(where).get()
          }else if(options.method){
            fn = collection.add({
              data: Object.assign(
                options.data, 
                options.dataAssignOpenid ? { openid: this.openid } : {}
              )
            })
          }
          this.requestHandle(
            fn,
            res,
            rej
          )
        })
      })
    }
    return request.bind(this)
  }
  requestHandle(promise, resolve, reject) {
    promise.then(data => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  }
  getCollection(collectionName) {
    return wx.cloud.database().collection(collectionName)
  }
}
service = new Request()
export default service