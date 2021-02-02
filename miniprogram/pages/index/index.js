const db = wx.cloud.database()
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
Page({
  data: {
    centerMenuIndex:(()=>{
      return ( tabMenus.length - 1 ) / 2
    })(),
    userInfo: {},
    activeIndex: 0,
    tabMenus
  },
  onLoad(){
    
  },
  onSetActiveIndex(e){
    this.setData({
      activeIndex:e.detail
    })
  }
})
