// pages/index/My/my.js
const App = getApp()
const getClientRect = (inst) => {
  inst.createSelectorQuery().select(".dd-account-my-panel__header").boundingClientRect(v => {
    inst.setData({
      topHeight: `${v.height * 2 }rpx`,
      navHeight: App.globalData.navHeight
    })
  }).exec()
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabHeight: {
      type: String
    },
    visible:{
      type:Boolean,
      value:false,
      observer:"onVisible"
    }
  },
  lifetimes:{
    attached(){
      this.setData({
        navHeight: App.globalData.navHeight
      })
      this.getUserInfo()
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onVisible(v){
      if(v && !this.data.topHeight){
        setTimeout(() => {
          this.createSelectorQuery().select(".dd-account-my-panel__header").boundingClientRect(v => {
            this.setData({
              topHeight: `${v.height * 2 }rpx`,
            })
          }).exec()
        });
      }
    },
    getUserInfo(){
      App.getAuthed().then(authed=>{
        this.setData({
          authed
        })
        if(authed){
          App.getUserInfo().then(data=>{
            this.setData({
              userInfo:data
            })
          })
        }
      })
    },
    bindGetUserInfo: function (res) {
      if (res.detail.userInfo) {
        this.getUserInfo()
        setTimeout(() => {
          this.createSelectorQuery().select(".dd-account-my-panel__header").boundingClientRect(v => {
            this.setData({
              topHeight: `${v.height * 2 }rpx`,
              navHeight: App.globalData.navHeight
            })
          }).exec()
        });
      } else {
        
      }
    }
  }
})
