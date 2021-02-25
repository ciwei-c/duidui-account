import {parseTime} from "../../utils/index";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabHeight:{
      type:String
    },
    visible:{
      type:Boolean
    }
  },
  lifetimes:{
    attached(){
      this.setData({
        date:parseTime(new Date()),
        dateForMonth:parseTime(new Date(), "{y}/{m}")
      })
    }
  },
  methods: {
    bindDateChange(e){
      this.setData({
        date: parseTime(e.detail),
        dateForMonth: parseTime(e.detail, "{y}/{m}")
      })
    },
    getParent(e){
      e.detail(this)
    }
  }
})
