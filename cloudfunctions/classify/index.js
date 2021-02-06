// 云函数入口文件
const cloud = require('wx-server-sdk')
function uuid(len = 32) {
  const $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const maxPos = $chars.length;
  let str = '';
  for (let i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return str;
}
cloud.init({
  env: "account-9gl79b41cb9b17a9",
  traceUser: true,
})
const db = cloud.database()
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
// 云函数入口函数
exports.main = async (event, context) => {
  let { OPENID } = cloud.getWXContext()
  const createUserClassifies = () => {
    return new Promise(resolve=>{
      db.collection('user-classifies').where({
        openid: OPENID,
      }).get().then(res=>{
        if(!res.data.length){
          db.collection('user-classifies').add({
            data:{
              classifies:defaultClassifies.map(v=>{
                v.classifyId = uuid()
                return v
              }),
              openid:OPENID,
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

  const getUserClassifies = () => {
    return new Promise(resolve=>{
      db.collection('user-classifies').where({
        openid: OPENID,
      }).get().then(res=>{
        if(res.data.length) {
          resolve(res.data[0])
        } else {
          resolve()
        }
      })
    })
  }

  let fns = {
    createUserClassifies,
    getUserClassifies
  }
  return await fns[event.fn]()
}