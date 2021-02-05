const App = getApp();

Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  externalClasses: ['dd-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    name:String,
    color:{
      type:String,
      value:"#000"
    },
    bgColor:{
      type:String,
      value:""
    },
    action:{
      type:Boolean,
      value:true
    },
    back: {
      type:Boolean,
      value:true
    },
    home: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navHeight:""
  },
  lifetimes: {
    attached: function () {
      this.setData({
        navHeight: App.globalData.navHeight,
        navTop: App.globalData.navTop,
        statusBarHeight: App.globalData.statusBarHeight,
        menuButtonObject: App.globalData.menuButtonObject
      })
     }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onBack: function () {
        wx.navigateBack({
          delta: 1
        })      
    },
    toHome: function () {
      wx.navigateTo({
        url: '/pages/index/index'
      })
    },
  }
})