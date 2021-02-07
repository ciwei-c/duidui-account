const App = getApp();
const db = wx.cloud.database();
import {allClassifies} from "../../utils/classify" 
Page({
  data: {
    classifies:[],
    classifyLabel:"",
    activeClassifyIndex:0,
    activeClassifyIcon:"other"
  },
  onLoad () {
    this.setData({
      classifies:allClassifies,
      activeClassifyIndex:0
    })
    this.setData({
      activeClassifyIcon:this.data.classifies[this.data.activeClassifyIndex].icon
    })
  },
  onReady(){
    this.setData({
      navHeight:App.globalData.navHeight,
      iconWidth:(App.globalData.systemInfo.screenWidth / 4)
    })
    this.createSelectorQuery().select(".dd-account-classify__input").boundingClientRect(v=>{
      this.setData({
        inputHeight:`${v.height * 2 + 20}rpx`
      })
    }).exec()
  },
  onTapClassify(e){
    this.setData({
      activeClassifyIndex:e.currentTarget.dataset.index,
      activeClassifyIcon:e.currentTarget.dataset.classify.icon
    })
  }
})