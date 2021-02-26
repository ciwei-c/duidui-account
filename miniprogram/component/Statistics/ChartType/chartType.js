// component/Statistics/ChartType/chartType.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type:{
      type:String
    },
    seriesTypes:{
      type:Array,
      value:[]
    }
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
    onClickType(e){
      let type = e.currentTarget.dataset.type
      this.triggerEvent("change", type.value)
    }
  }
})
