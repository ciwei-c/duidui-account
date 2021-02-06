const App = getApp();
Page({
  data: {
    type:"",
    calcHeight: "",
    activeClassify: "",
    renderClassifies:[],
    allClassifies:[]
  },
  onLoad(){
    App.apis.classify.getUserClassifies().then(res=>{
      let allClassifies = []
      if(res.data.length){
        allClassifies = res.data[0].classifies
      }

      this.setData({
        allClassifies
      })
      this.getAccountType({detail:this.data.type})
    })
    
  },
  onReady(){
    this.setData({
      iconWidth:(App.globalData.systemInfo.screenWidth / 4)
    })
  },
  getCalcHeight(e){
    this.setData({
      calcHeight:`${e.detail * 2 + 30}rpx`
    })
  },
  getAccountType(e){
    let type = e.detail
    let renderClassifies = this.data.allClassifies.filter(v=>v.type.includes(type))
    this.setData({
      type,
      renderClassifies:[...renderClassifies, ...[{
        label:"自定义",
        icon:"custom",
        type:["outgoings","income"]
      }]],
      activeClassify: renderClassifies.length ? renderClassifies[0].classifyId : ""
    })
  },
  onTapClassify(e){
    let label = e.currentTarget.dataset.classify.label
    if(label === "自定义") {
      wx.navigateTo({
        url: "/pages/classify/classify",
      })
    } else {
      this.setData({
        activeClassify:e.currentTarget.dataset.classify.classifyId
      })
    }
  }
})