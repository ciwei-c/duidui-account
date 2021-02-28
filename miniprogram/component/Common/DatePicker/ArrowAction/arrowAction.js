// component/Common/DatePicker/ArrowAction/arrowAction.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClickLeft(){
      console.log(22)
      this.triggerEvent('clickleft')
    },
    onClickRight(){
      this.triggerEvent('clickright')}
  }
})
