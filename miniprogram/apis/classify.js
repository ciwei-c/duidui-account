// 云函数入口文件
function uuid(len = 32) {
  const $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const maxPos = $chars.length;
  let str = '';
  for (let i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return str;
}
const defaultClassifies = [{
  label:"餐饮",
  type:["outgoings"],
  icon:"food"
},{
  label:"交通",
  type:["outgoings"],
  icon:"traffic"
},{
  label:"住宿",
  type:["outgoings"],
  icon:"hotel"
},{
  label:"服饰",
  type:["outgoings"],
  icon:"clothes"
},{
  label:"娱乐",
  type:["outgoings"],
  icon:"map"
},{
  label:"家庭",
  type:["outgoings"],
  icon:"family"
},{
  label:"医疗",
  type:["outgoings"],
  icon:"medical"
},{
  label:"投资",
  type:["outgoings", "income"],
  icon:"invest"
},{
  label:"通讯",
  type:["outgoings"],
  icon:"phone"
},{
  label:"其他",
  type:["outgoings", "income"],
  icon:"other"
}]
import request from "../utils/request"
export default {
  getUserClassifies(){
    return request('user-classifies', {
      method:'get',
      whereAssignOpenid:true
    })
  },
  createUserClassifies(){
    return new Promise(resolve=>{
      this.getUserClassifies().then(res=>{
        if(!res.data.length){
          request('user-classifies', {
            method:'add',
            dataAssignOpenid:true,
            data:{
              classifies:defaultClassifies.map(v=>{
                v.classifyId = uuid()
                return v
              }),
              accountBook:'default'
            }
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
