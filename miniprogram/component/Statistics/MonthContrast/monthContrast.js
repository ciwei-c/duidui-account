import { dateZeroFill } from "../../../utils/index";
import ChartBebaviors from "../ChartBebaviors"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    year: {
      type: String,
      observer: "onYearChange"
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
      this.getDateGroupData("monthGroup", this.data.year)
    },
    onYearChange() {
      if(this.notFirstEnter) {
        this._getDateGroupData()
        this.refreshChart()
      }else {
        this.notFirstEnter = true
      }
    },
    onPickerDate() {
      this.triggerEvent("getParent", (parent) => {
        let datePicker = parent.selectComponent("#dd-account-statistics__year-picker")
        datePicker.onShowPicker()
      })
    },
    _getChartData() {
      let months = 12
      return this.getChartData((dataMap, xAxisData, seriesData)=>{
        for (let i = 0; i < months; i++) {
          xAxisData.push({
            value: {
              month: i + 1,
              monthChar: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"][i]
            }
          })
          seriesData.push((dataMap[dateZeroFill(i + 1)] || 0))
        }
      })
    }
  }
})
