Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String
    },
    actions:{
      type:Array,
      value:[{
          name: '取消'
        },
        {
          name: '删除',
          color: '#ed3f14',
          loading: false
        }
      ]
    },
    visible:{
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
    handleModalClick(e){
      this.triggerEvent("click", e.detail)
    }
  }
})
