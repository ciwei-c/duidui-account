import { getDays, dateZeroFill, parseTime } from "../../../utils/index";
import ChartBebaviors from "../ChartBebaviors"
import color from "../../../styles/color"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    date: {
      type: String,
      observer: "onDateChange"
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
      this.getDateGroupData()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getDate() {
      return new Date(`${this.data.date}/01`)
    },
    onDateChange(v) {
      this.getDateGroupData()
      this.refreshChart()
    },
    onPickerDate() {
      this.triggerEvent("getParent", (parent) => {
        let datePicker = parent.selectComponent("#dd-account-statistics__date-picker")
        datePicker.onShowPicker()
      })
    },
    getDateGroupData() {
      this.dataGroupDatapromise = wx.cloud.callFunction({
        name: 'statistics', data: {
          fn: "dateGroup",
          data: {
            accountBook: getApp().$getStore("activeAccountBook"),
            date: this.data.date
          }
        }
      })
    },
    getChartData() {
      let date = this.getDate()
      let days = getDays({ year: date.getFullYear, month: date.getMonth() + 1 })
      return new Promise(resolve => {
        this.dataGroupDatapromise.then(res => {
          let data = res.result.list
          let dataMap = {}
          data.forEach(v => {
            dataMap[v._id.split("/")[2]] = v.total
          })
          let xAxisData = []
          let seriesData = []
          for (let i = 0; i < days; i++) {
            xAxisData.push({
              value: {
                date: i + 1,
                day: ["日", "一", "二", "三", "四", "五", "六"][new Date(`${this.data.date}/${dateZeroFill(i + 1)}`).getDay()]
              }
            })
            seriesData.push((dataMap[dateZeroFill(i + 1)] || 0))
          }
          resolve({
            xAxisData,
            seriesData
          })
        })
      })
    },
    setOption(chart) {
      this.getChartData().then(({ xAxisData, seriesData }) => {
        var option = {
          color: [color.primary],
          tooltip: {
            position: function (point, params, dom, rect, size) {
              // 固定在顶部
              let index = params[0].dataIndex
              let viewSize = size.viewSize
              let contentSize = size.contentSize
              let barWidth = (viewSize[0] / xAxisData.length)
              let left = ((viewSize[0] - 40) / xAxisData.length) * (index + 1) - (barWidth / 2 + contentSize[0] / 2) + 20
              return [left, '10%'];
            },
            formatter(v) {
              v = v[0]
              return `￥${(v.data).toFixed(2)}`
            },
            axisPointer: {
              type: "line",
              lineStyle:{
                type:"dashed"
              },
            },
            trigger: "axis"
          },
          xAxis: {
            data: xAxisData,
            axisLabel: {
              formatter: function (value) {
                return `${value.day}\n${value.date}`
              },
              rich: {
                value: {
                  align: 'center'
                }
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: color.desc
              }
            }
          },
          yAxis: {
            show: false,
            splitLine: {
              show: false
            }
          },
          grid: {
            left: 20,
            right: 20,
            bottom: 40,
            top: 40
          },
          series: {
            type: "bar",
            barWidth: '60%',
            data: seriesData
          }
        };
        chart.setOption(option);
      })
    },
    onChangeType(e) {
      let type = e.currentTarget.dataset.type
      this.setData({
        type
      })
    }
  }
})
