const App = getApp();
const db = wx.cloud.database();
Page({
  data: {
    type:"",
    calcHeight: "",
    activeClassify: "",
    renderClassifies:[],
    allClassifies:[]
  },
  onLoad(){
    db.collection("default-classifies").get().then(classifiesData=>{
      this.setData({
        allClassifies:classifiesData.data
      })
      App.getAppId().then(v=>{
        db.collection("user-custom-classifies").where({
          openid:v.openId
        }).get().then(customData=>{
          console.log(customData)
        })
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
      activeClassify: renderClassifies.length ? renderClassifies[0]._id : ""
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
        activeClassify:e.currentTarget.dataset.classify._id
      })
    }
  }
})