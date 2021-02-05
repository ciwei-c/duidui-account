const App = getApp();
const db = wx.cloud.database();
Page({
  data: {
    classifies:[],
    classifyLabel:"",
    activeClassify:"",
    activeClassifyIcon:"other"
  },
  onLoad () {
    db.collection("all-classifies").get().then(res=>{
      this.setData({
        classifies:res.data
      })
      if(res.data.length){
        this.setData({
          activeClassify:res.data[0]._id,
          activeClassifyIcon:res.data[0].icon
        })
      }
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
      activeClassify:e.currentTarget.dataset.classify._id,
      activeClassifyIcon:e.currentTarget.dataset.classify.icon
    })
  }
})