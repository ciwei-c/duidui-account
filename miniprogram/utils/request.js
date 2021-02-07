let service = null

class Request {
  constructor() {
    const request = (collectionName, options = {}) => {
      return new Promise((res, rej) => {
        getApp().getAppId().then(({openid}) => {
          this.openid = openid
          if(!options.queryMethod) options.queryMethod = "where"
          let collection = this.getCollection(collectionName)
          let fn = null
          let data = Object.assign(
            options.data || {},
            options.dataAssignOpenid ? { _openid: this.openid } : {}
          )
          let queryData = ""
          if(options.queryMethod === "doc"){
            queryData = data._id
          } else {
            queryData = Object.assign(
              options.query || {},
              options.queryAssignOpenid ? { _openid: this.openid } : {}
            )
          }

          let fnMap = {
            get:() => collection[options.queryMethod](queryData)[options.method](),
            add:() => collection[options.method]({data}),
            remove:() => collection[options.queryMethod](queryData)[options.method]({data}),
            update:() => collection[options.queryMethod](queryData)[options.method]({data})
          }

          fn = fnMap[options.method]()
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