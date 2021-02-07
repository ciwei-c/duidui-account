import request from "../utils/request"
export default {
  getUserClassifies(){
    return request('user-classifies', {
      method:'get',
      queryAssignOpenid:true
    })
  },
  createUserClassifies(data){
    return new Promise(resolve=>{
      this.getUserClassifies().then(res=>{
        if(!res.data.length){
          request('user-classifies', {
            method:'add',
            data
          }).then(()=>{
            resolve()
          })
        } else {
          resolve()
        }
      })
    })
  }
}
