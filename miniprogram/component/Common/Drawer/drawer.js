// component/drawer.js
Component({
  options: {
    multipleSlots: true 
  },
  /**
   * 组件的属性列表
   */
  properties: {
    slot:{
      type:Boolean,
      value:false
    },
    show: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    scrollViewHeight:0
  },
  attached() {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          scrollViewHeight: `${res.windowHeight}px`
        })
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toggleMask(data){
      this.triggerEvent('toggle', data);
    },
    toggleDrawer(data){
      setTimeout(()=>{
        this.triggerEvent('toggle', data);
      },300)
    }
  }
})
