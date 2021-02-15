import request from "../utils/request"
export default {
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
