Component({
  /**
   * 组件的属性列表
   */
  properties: {
    centerMenuIndex:{
      type:Number,
      value:0
    },
    tabMenus:{
      type:Array,
      value:[]
    },
    activeIndex:{
      type:Number,
      value:0
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
    setActiveIndex(activeIndex){
      this.triggerEvent("setActive", activeIndex)
    },
    onClickMenu(e){
      let {index} = e.currentTarget.dataset
      if(index !== this.data.centerMenuIndex) {
        this.setActiveIndex(index)
      }
    },
    // getActiveMenu(){
    //   return {
    //     index:this.data.activeIndex,
    //     menu:this.data.tabMenus[this.data.activeIndex]
    //   }
    // }
  }
})
