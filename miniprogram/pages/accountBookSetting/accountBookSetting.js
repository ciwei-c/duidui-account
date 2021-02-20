// miniprogram/pages/accountBookEditor/accountBookEditor.js
Page({
  onLoad(e){
    getApp().$listener.emit('initAccountSetting', e)
  }
})