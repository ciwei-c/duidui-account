const App = getApp();
import classifyBehavior from "../../behavior/classify"
import store from "../../store/index"
Component({
  properties:{
    editorData:{
      type:Object,
      value:{}
    }
  },
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
      new App.$watcher(App.globalData.userClassifies, (v) => {
        this.setClassifies()
      })
      this.setClassifies()
      setTimeout(() => {
        if(this.data.editorData._id){
          this.setData({
            activeClassify: this.data.editorData.classifyId
          })
        }
        this.setData({
          iconWidth: (App.globalData.systemInfo.screenWidth / 4)
        })
      });
    }
  },
  methods:{
    setClassifies(){
      if (App.globalData.userClassifies.classifies) {
        this.setData({
          allClassifies: App.globalData.userClassifies.classifies
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
        activeClassify: (renderClassifies.length ? renderClassifies[0].classifyId : "")
      })
    },
    onSave(e){
      let {date, result:amount, type, remark, back} = e.detail
      let postData = {
        date,
        remark,
        time: new Date().getTime(),
        amount: parseFloat(amount),
        type,
        classifyId: this.data.activeClassify
      }
      let fn = "addAccount"
      if(this.data.editorData._id){
        postData._id = this.data.editorData._id
        fn = "updateAccount"
      }
      App.$apis.account[fn](postData).then(()=>{
        App.$toast({
          type:'success',
          content:''
        })
        App.$listener.emit('onAddcount')
        if(back) {
          wx.navigateBack({
            delta: 1,
          })
        } else {
          this.resetData()
          this.selectComponent("#dd-account-tally__calc").initData()
        }
      })
    },
    resetData(data){
      this.setData({
        editorData: {},
        activeClassify: (this.data.renderClassifies.length ? this.data.renderClassifies[0].classifyId : "")
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