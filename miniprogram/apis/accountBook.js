import request from "../utils/request"
export default {
  getAccountBooks(data){
    return request('account-books', (_openid)=>{
      return {
        method:'get',
        queryMethod:"where",
        queryData:{
          _openid
        },
        data
      }
    })
  },
  createAccountBook(data){
    return request('account-books', ()=>{
      return {
        method:'add',
        data
      }
    })
  }
}
