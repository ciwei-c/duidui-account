const App = getApp();
import { getStore } from "../../store/index"
Component({
  data: {
    type: "",
    calcHeight: "",
    activeClassify: "",
    renderClassifies: [],
    allClassifies: []
  },
  lifetimes: {
    attached() {
      if (getStore("userClassifies")) {
        this.setData({
          allClassifies: getStore("userClassifies")
        })
        this.getAccountType({ detail: this.data.type })
      }
      this.setData({
        iconWidth: (App.globalData.systemInfo.screenWidth / 4)
      })
    }
  },
  methods:{
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
          url: "/pages/classify/classify",
        })
      } else {
        this.setData({
          activeClassify: e.currentTarget.dataset.classify.classifyId
        })
      }
    }
  }
})