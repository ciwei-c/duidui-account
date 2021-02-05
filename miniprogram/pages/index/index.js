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
