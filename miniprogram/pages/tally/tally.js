const App = getApp();

Page({
  data: {
    type:"",
    calcHeight: "",
    activeClassify: "",
    renderClassifies:[],
    allClassifies:[{
      label:"餐饮",
      type:"outgoings",
      icon:"food"
    },{
      label:"交通",
      type:"outgoings",
      icon:"traffic"
    },{
      label:"住宿",
      type:"outgoings",
      icon:"hotel"
    },{
      label:"服饰",
      type:"outgoings",
      icon:"clothes"
    },{
      label:"娱乐",
      type:"outgoings",
      icon:"map"
    },{
      label:"家庭",
      type:"outgoings",
      icon:"family"
    },{
      label:"医疗",
      type:"outgoings",
      icon:"medical"
    },{
      label:"投资",
      type:"income",
      icon:"invest"
    },{
      label:"通讯",
      type:"outgoings",
      icon:"phone"
    },{
      label:"其他",
      icon:"other"
    },{
      label:"自定义",
      icon:"custom"
    }]
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
    let renderClassifies = this.data.allClassifies.filter(v=>{
      return !v.type || v.type === type
    })
    this.setData({
      type,
      renderClassifies,
      activeClassify: renderClassifies.length ? renderClassifies[0].label : ""
    })
  },
  onTapClassify(e){
    let label = e.currentTarget.dataset.classify.label
    if(label === "自定义") {

    } else {
      this.setData({
        activeClassify:e.currentTarget.dataset.classify.label
      })
    }
  }
})