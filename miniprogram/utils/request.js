let service = null

class Request {
  constructor(){
    const request = (collection, options = {}) => {
      return new Promise((res,rej)=>{
        getApp().getAppId().then(data=>{
          this.openid = data.openid
          if(options.method === 'get'){
            this.collection(collection).where(Object.assign(options.where||{}, {openid:this.openid})).get().then((data)=>{
              res(data)
            }).catch(err=>{
              rej(err)
            })
          }else if(options.method === 'add'){
            this.collection(collection).add({
              data:Object.assign(options.data, options.assignOpenid ? { openid:this.openid } : {})
            }).then(data=>{
              res(data)
            }).catch(err=>{
              rej(err)
            })
          }
        })
      })
    }
    return request.bind(this)
  }
  collection(collection){
    return wx.cloud.database().collection(collection)
  }
}
service = new Request()
export default service