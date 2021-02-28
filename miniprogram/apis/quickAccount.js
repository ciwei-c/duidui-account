import request from "../utils/request"
export default {
  deleteQuickAccount(data){
    return request('quick-account', {
      method:"remove",
      queryMethod:"doc",
      queryData:{
        _id:data._id
      }
    })
  },
  addQuickAccount(data){
    return request('quick-account', (openid)=>{
      return {
        method:'add',
        data:Object.assign(data, {
          accountBook:getApp().$getStore("activeAccountBook")
        })
      }
    })
  }
}
