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
  getAccountBook(data){
    return request('account-books', ()=>{
      return {
        method:'get',
        queryMethod:"doc",
        queryData:{
          _id:data.accountBookId
        }
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
  },
  updateAccountBook(data){
    let accountBookId = data.accountBookId
    delete data.accountBookId
    return request('account-books', ()=>{
      return {
        method:'update',
        queryMethod:'doc',
        queryData:{
          _id:accountBookId
        },
        data
      }
    })
  }
}
