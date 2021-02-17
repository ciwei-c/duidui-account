import request from "../utils/request"
export default {
  updateAccount(data){
    let _id = data._id
    delete data._id
    return request('accounts', ()=>{
      return {
        method:'update',
        queryMethod:"doc",
        queryData:{
          _id:_id
        },
        data
      }
    })
  },
  deleteAccount(data){
    return request('accounts', {
      method:"remove",
      queryMethod:"doc",
      queryData:{
        _id:data._id
      },
    })
  },
  addAccount(data){
    return request('accounts', (openid)=>{
      return {
        method:'add',
        data
      }
    })
  },
  getAccounts(data){
    return request('accounts', (_openid)=>{
      return {
        method:'get',
        queryMethod:'where',
        queryData:Object.assign(data, {
          _openid
        })
      }
    })
  }
}
