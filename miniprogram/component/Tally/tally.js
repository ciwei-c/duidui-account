const App = getApp();
import classifyBehavior from "../../behavior/classify"
import store from "../../store/index"
Component({
  data: {
    type: "",
    calcHeight: "",
    activeClassify: "",
    renderClassifies: [],
    allClassifies: []
  },
  behaviors:[classifyBehavior],
  lifetimes: {
    attached() {
      this.getUserClassifies()
      this.watcher = new App.$watcher(store, (v)=>{
        this.setClassifies()
      }, "userClassifies")
      this.setClassifies()
      this.setData({
        iconWidth: (App.globalData.systemInfo.screenWidth / 4)
      })
    }
  },
  methods:{
    setClassifies(){
      if (App.$getStore("userClassifies")) {
        this.setData({
          allClassifies: App.$getStore("userClassifies")
        })
        this.getAccountType({ detail: this.data.type })
      }
    },
    getCalcHeight(e) {
      this.setData({
        calcHeight: `${e.detail * 2 + 30}rpx`
      })
    },
    getAccountType(e) {
      let type = e.detail
      let renderClassifies = this.data.allClassifies.filter(v => v.type.includes(type))
      this.setData({
        type,
        renderClassifies: [...renderClassifies].concat([{
          label: "自定义",
          icon: "custom",
          type: ["outgoings", "income"]
        }]),
        activeClassify: renderClassifies.length ? renderClassifies[0].classifyId : ""
      })
    },
    onTapClassify(e) {
      let label = e.currentTarget.dataset.classify.label
      if (label === "自定义") {
        wx.navigateTo({
          url: "/pages/classify/classify?type=" + this.data.type,
        })
      } else {
        this.setData({
          activeClassify: e.currentTarget.dataset.classify.classifyId
        })
      }
    }
  }
})