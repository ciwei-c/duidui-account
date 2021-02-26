import ChartBebaviors from "../ChartBebaviors"
import color from "../../../styles/color"
const App = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
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
      new App.$watcher(App.globalData.userClassifies, (v) => {
        this.setData({
          chartHeight: v.classifies.length * 30
        })
        if(this.notFirstEnter) {
          this._getDateGroupData()
          this.refreshChart()
        } else {
          this.notFirstEnter = true
        }
      })
      this._getDateGroupData()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setOption(chart) {
      this._getChartData().then(({ xAxisData, seriesData }) => {
        var option = {
          color: this.data.type === "outgoings" ? [color.primary] : [color.success],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: "line",
              lineStyle:{
                type:"dashed"
              },
            },
            formatter(v) {
              v = v[0]
              return `${v.name}: ￥${(v.data).toFixed(2)}`
            },
          },
          grid: {
            top:20,
            left:10,
            bottom:10,
            containLabel: true
          },
          xAxis: {
            splitLine: {
              show: false
            },
            type: 'value',
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
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: color.desc
              }
            },
            type: 'category',
            data: xAxisData
          },
          series: [
            {
              type: this.data.seriesType,
              data: seriesData
            }
          ]
        };
        chart.setOption(option);
      })
    },
    _getDateGroupData() {
      this.getDateGroupData("classifyGroup", "")
    },
    _getChartData() {
      return this.getChartData((dataMap, xAxisData, seriesData) => {
        if(App.globalData.userClassifies && App.globalData.userClassifies.classifies){
          App.globalData.userClassifies.classifies.forEach(v => {
            xAxisData.push({
              value: v.label
            })
            seriesData.push(dataMap[v.classifyId] || 0)
          })
        }
      })
    }
  }
})
