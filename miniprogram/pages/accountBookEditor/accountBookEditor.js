// miniprogram/pages/accountBookEditor/accountBookEditor.js
Page({
  onLoad(e){
    if(e.accountBookId){
      getApp().$listener.emit('setAccountEditor', e)
    }
  }
})