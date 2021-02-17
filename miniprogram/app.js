import apis from "./apis/index"
import Watcher from "./store/watcher"
import $listener from "./utils/listener"
import store, {setStore, getStore} from "./store/index"
import $toast from "/component/Common/Toast/$toast"
App({
  getUserInfo() {
    return new Promise(res => {
      if (this.userInfo) {
        res(this.userInfo)
      } else {
        wx.getUserInfo({
          success: ret => {
            this.userInfo = ret
            res(this.userInfo)
          }
        })
      }
    })
  },
  getAppId() {
    return new Promise(res => {
      if (this.appid && this.openid) {
        res({
          appid: this.appid,
          openid: this.openid
        })
      } else {
        wx.cloud.callFunction({ name: 'login' }).then(data => {
          this.appid = data.result.appid || data.result.userInfo.appId
          this.openid = data.result.openid || data.result.userInfo.openId
          res({
            appid:this.appid,
            openid:this.openid
          })
        })
      }
    })
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: "account-9gl79b41cb9b17a9",
        traceUser: true,
      })
    }
    this.globalData = {}
    this.$listener = $listener
    this.$apis = apis
    this.$watcher = Watcher
    this.$store = store
    this.$toast = $toast
    this.$setStore = setStore
    this.$getStore = getStore
    
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight;
        let navTop = menuButtonObject.top; //胶囊按钮与顶部的距离
        let navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2; //导航高度
        this.globalData.systemInfo = res;
        this.globalData.statusBarHeight = statusBarHeight;
        this.globalData.menuButtonObject = menuButtonObject;
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        console.log(err);
      }
    })
  }
})
