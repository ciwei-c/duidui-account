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
    detached(){
      getApp().$listener.remove('onAddcount', this._refresh)
      getApp().$listener.remove('getAccounts', this._refresh)
    },
    attached(){
      this._refresh = () => {
        if(this.notFirstEnter){
          this.refresh()
        } else {
          this.notFirstEnter = true
        }
      }
      getApp().$listener.on('onAddcount', this._refresh)
      getApp().$listener.on('getAccounts', this._refresh)
      this.setData({
        date:parseTime(new Date()),
        dateForMonth:parseTime(new Date(), "{y}/{m}"),
        year:parseTime(new Date(), "{y}")
      })
    }
  },
  methods: {
    refresh(){
      let dateContrast = this.selectComponent("#date-contrast")
      let monthContrast = this.selectComponent("#month-contrast")
      let classifyContrast = this.selectComponent("#classify-contrast")
      dateContrast._getDateGroupData()
      dateContrast.refreshChart()
      monthContrast._getDateGroupData()
      monthContrast.refreshChart()
      classifyContrast._getDateGroupData()
      classifyContrast.refreshChart()
    },
    onRefresh(e) {
      setTimeout(() => {
        this.refresh()
        e.detail()
      }, 300);
    },
    bindYearChange(e){
      this.setData({
        year: e.detail
      })
    },
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
