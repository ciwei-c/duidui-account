// component/Common/ContainerViewer/containerViewer.js
const App = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabHeight:{
      type:String,
      value:"0rpx"
    },
    refresh:{
      type:Boolean,
      value:true
    }
  },
  lifetimes: {
    attached: function () {
      this.setData({
        navHeight: App.globalData.navHeight,
        navTop: App.globalData.navTop
      })
      setTimeout(() => {
        this.setData({
          refresherTriggered: true,
        })
      }, 1000)
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    triggered: false,
    loading: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onRefresherRefresh(){
      if (this._freshing) return
      this._freshing = true
      this.setData({
        loading:true
      })
      setTimeout(() => {
        this.setData({
          triggered: false
        })
        this._freshing = false
      });
      setTimeout(() => {
        this.setData({
          loading: false
        })
      }, 3000)
    }
  }
})
