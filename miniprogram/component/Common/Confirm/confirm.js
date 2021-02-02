const { $Toast } = require('../../../iview/base/index');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:{
      type:Boolean,
      value:false
    },
    date: {
      type: Boolean,
      value: false
    },
    placeholder: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputValue:"",
    selectDate:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(){
      this.setData({
        show:false
      })
    },
    onInput(e){
      this.setData({
        inputValue: e.detail.detail.value
      })
    },
    onConfirm(){
      if(!this.data.inputValue){
        return $Toast({
          content: "输入不能为空",
          type: 'warning'
        });
      }
      if (this.data.date && !this.data.selectDate){
        return $Toast({
          content: "请选择日期",
          type: 'warning'
        });
      }
      this.triggerEvent('confirm', { inputValue: this.data.inputValue, date: this.data.selectDate});
      this.onCancel();
      this.setData({
        inputValue: "",
        selectDate: ""
      })
    },
    bindDateChange(data){
      this.setData({
        selectDate:data.detail.value
      })
    }
  }
})
