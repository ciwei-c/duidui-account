import { getDays, dateZeroFill, parseTime } from "../../../utils/index";
import ChartBebaviors from "../ChartBebaviors"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    month: {
      type: String,
      observer: "onMonthChange"
    }
  },
  behaviors: [ChartBebaviors],
  /**
   * 组件的初始数据
   */
  data: {
    type: "outgoings",
  },
  lifetimes: {
    attached() {
      this._getDateGroupData()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _getDateGroupData(){
      this.getDateGroupData("dateGroup", this.data.month)
    },
    getDate() {
      return new Date(`${this.data.month}/01`)
    },
    onMonthChange() {
      if(this.notFirstEnter) {
        this._getDateGroupData()
        this.refreshChart()
      } else {
        this.notFirstEnter = true
      }
    },
    onPickerDate() {
      this.triggerEvent("getParent", (parent) => {
        let datePicker = parent.selectComponent("#dd-account-statistics__date-picker")
        datePicker.onShowPicker()
      })
    },
    _getChartData() {
      let date = this.getDate()
      let days = getDays({ year: date.getFullYear, month: date.getMonth() + 1 })
      return this.getChartData((dataMap, xAxisData, seriesData)=>{
        for (let i = 0; i < days; i++) {
          xAxisData.push({
            value: {
              date: i + 1,
              day: ["日", "一", "二", "三", "四", "五", "六"][new Date(`${this.data.month}/${dateZeroFill(i + 1)}`).getDay()]
            }
          })
          seriesData.push((dataMap[dateZeroFill(i + 1)] || 0))
        }
      })
    }
  }
})
