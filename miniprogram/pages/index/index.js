const tabMenus = [{
  type:"home",
  view:"home"
},{
  type:"account-book",
  view:"account-book"
},{
  type:"add"
},{
  type:"statistics",
  view:"statistics"
},{
  type:"my",
  view:"my"
}]
import {defaultClassifies} from "../../utils/classify"
import {uuid} from "../../utils/index"
import {getStore, setStore } from "../../store/index"
Page({
  onLoad(){
    if(!getStore('init-user-classifies')){
      getApp().$apis.classify.createUserClassifies(
        {
          classifies:defaultClassifies.map(v=>{
            v.classifyId = uuid()
            return v
          }),
          accountBook:'default'
        }
      ).then(()=>{
        setStore("init-user-classifies", true)
      })
    }
  },
  data: {
    centerMenuIndex:(()=>{
      return ( tabMenus.length - 1 ) / 2
    })(),
    userInfo: {},
    activeIndex: 0,
    tabMenus
  },
  onSetActiveIndex(e){
    if(e.detail === this.data.centerMenuIndex){
      wx.navigateTo({
        url: '/pages/tally/tally',
      })
    }else {
      this.setData({
        activeIndex:e.detail
      })
    }
  }
})
