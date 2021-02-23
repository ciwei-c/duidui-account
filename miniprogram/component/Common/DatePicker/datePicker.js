// component/Common/DatePicker/datePicker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type:{
      type:String,
      value:'date'
    },
    value:{
      type:Number | String
    }
  },
  lifetimes: {
    attached() {
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    visible:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onHidePicker(){
      this.setData({
        bottom:"-100vh",
        opacity:0
      })
      setTimeout(() => {
        this.setData({
          visible:false,
          panels:[]
        })
      }, 300);
    },
    onShowPicker(){
      this.setData({
        visible:true
      })
      setTimeout(() => {
        this.setData({
          bottom:"0px",
          opacity:0.2
        })
      });
    },
    bindDateChange(e){
      this.onHidePicker()
      this.triggerEvent('change', e.detail)
    }
  }
})