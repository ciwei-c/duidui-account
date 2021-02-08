import request from "../utils/request"
export default {
  updateUserClassifies(data){

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
