import request from "../utils/request"
export default {
  updateUserClassifies(data){
    return request('user-classifies', (openid)=>{
      return {
        method:'update',
        queryMethod:"doc",
        queryData:{
          _id:openid + '_id'
        },
        data
      }
    })
  },
  getUserClassifies(){
    return request('user-classifies', {
      method:'get',
      queryAssignOpenid:true
    })
  },
  createUserClassifies(data){
    return request('user-classifies', {
      method:'add',
      data
    })
  }
}
