// component/Statistics/ContrastHeader/contrastHeader.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    type:"outgoings"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChangeType(e) {
      let type = e.currentTarget.dataset.type
      this.setData({
        type
      })
      this.triggerEvent('change', type)
    },
  }
})
