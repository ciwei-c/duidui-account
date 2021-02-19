import request from "../utils/request"
export default {
  updateUserClassifies(data){
    return request('user-classifies', {
      method:'update',
      queryMethod:"doc",
      queryData:{
        _id:getApp().globalData.userClassifies._id
      },
      data
    })
  },
  getUserClassifies(){
    return request('user-classifies', {
      method:'get',
      queryData:{
        accountBook: getApp().$getStore('activeAccountBook')
      }
    })
  },
  createUserClassifies(data){
    return request('user-classifies', {
      method:'add',
      data
    })
  }
}
