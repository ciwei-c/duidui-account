//app.js
const { $Toast } = require('./iview/base/index');
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: "duidui-accounting-6e29yk01e9415f",
        traceUser: true,
      })
    }
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    this.globalData = {}
    this.globalData.$toast = $Toast
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
