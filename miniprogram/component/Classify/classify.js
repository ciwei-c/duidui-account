const App = getApp();
import classifyBehavior from "../../behavior/classify"
Component({
  properties: {
    type:{
      type:String
    }
  },
  data: {
    classifies:[],
    loading:false,
    classifyLabel:"数码产品",
    activeClassifyIndex:0,
    activeClassifyIcon:"other"
  },
  behaviors:[classifyBehavior, Behavior({
    ready(){
      // this.createSelectorQuery().select(".dd-account-classify__input").boundingClientRect(v=>{
      //   this.setData({
      //     inputHeight:`${v.height * 2 + 20}rpx`
      //   })
      // }).exec() 
    }
  })],
  lifetimes:{
    attached(){
      this.setClassifies()
      this.setData({
        navHeight:App.globalData.navHeight,
        iconWidth:(App.globalData.systemInfo.screenWidth / 4)
      })
    }
  },
  methods:{
    setClassifies(){
      if (App.$getStore("userClassifies")) {
        this.setData({
          classifies: App.$getStore("userClassifies")
        })
        // this.getAccountType({ detail: this.data.type })
      }
    },
    onAddClassify(){
      wx.navigateTo({
        url: '/pages/classifyCreator',
      })
    },
    onTapClassify(e){
      this.setData({
        activeClassifyIndex:e.currentTarget.dataset.index,
        activeClassifyIcon:e.currentTarget.dataset.classify.icon
      })
    }
  }
})