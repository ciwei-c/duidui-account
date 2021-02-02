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
    this.globalData = {}
    this.globalData.$toast = $Toast
  }
})
