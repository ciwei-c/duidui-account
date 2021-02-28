// component/Common/Checkbox/checkbox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    label:{
      type:String
    },
    checked:{
      type:Boolean
    },
    disabled:{
      type:Boolean,
      value:false
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
    onCheck(){
      if(this.data.disabled) return;
      this.triggerEvent('change', {
        value: !this.data.checked
      })
    }
  }
})
