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
      getApp().$listener.remove('getAccounts', this._getAccounts)
    },
    attached(){
      this._getAccounts = () => {
        this.refresh()
      }
      getApp().$listener.on('getAccounts', this._getAccounts)
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
      dateContrast._getDateGroupData()
      dateContrast.refreshChart()
      monthContrast._getDateGroupData()
      monthContrast.refreshChart()
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
