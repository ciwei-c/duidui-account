import {defaultClassifies} from "../utils/constant"
import {uuid} from "../utils/index"
import {getStore, setStore } from "../store/index"
const getUserClassifies = () => {
  getApp().$apis.classify.getUserClassifies().then(res=>{
    if(res.data.length) {
      setStore("userClassifies", res.data[0].classifies)
    } else {
      createUserClassifies()
    }
  })
}
const createUserClassifies = () => {
  getApp().getAppId().then(({openid}) => {
    getApp().$apis.classify.createUserClassifies(
      {
        classifies:defaultClassifies.map(v=>{
          v.classifyId = uuid()
          return v
        }),
        _id:openid + '_id',
        accountBook:'default'
      }
    ).then(()=>{
      getUserClassifies()
    })
  })
}

export const classifyBehavior = Behavior({
  methods:{
    getUserClassifies,
    createUserClassifies
  }
})

export default {
  getUserClassifies,
  createUserClassifies
}