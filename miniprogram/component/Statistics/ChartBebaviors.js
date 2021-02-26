import * as echarts from '../Common/Echarts/echarts';
import color from "../../styles/color"
export default Behavior({
  properties: {
    visible:{
      type:Boolean,
      observer:"onVisibleChange"
    }
  },
  data:{
    seriesType: "line",
    seriesTypes: [{
      label:"折线图",
      value:"line"
    },{
      label:"柱状图",
      value:"bar"
    }],
    ec: {
      lazyLoad: true
    },
    isLoaded: false,
    isDisposed: false
  },
  methods:{
    setOption(chart) {
      this._getChartData().then(({ xAxisData, seriesData }) => {
        var option = {
          color: this.data.type === "outgoings" ? [ color.primary ] : [color.success],
          tooltip: {
            position: function (point, params, dom, rect, size) {
              // 固定在顶部
              // let index = params[0].dataIndex
              // let viewSize = size.viewSize
              // let contentSize = size.contentSize
              // let barWidth = (viewSize[0] / xAxisData.length)
              // let left = ((viewSize[0] - 40) / xAxisData.length) * (index + 1) - (barWidth / 2 + contentSize[0] / 2) + 20
              return [point[0], '10%'];
            },
            formatter(v) {
              v = v[0]
              return `￥${(v.data).toFixed(2)}`
            },
            
            trigger: 'axis',
            axisPointer: {
              type: "line",
              lineStyle:{
                type:"dashed"
              },
            }
          },
          xAxis: {
            data: xAxisData,
            axisLabel: {
              formatter: function (value) {
                if(value.day) {
                  return `${value.day}\n${value.date}`
                } else if (value.month) {
                  return `${value.month}`
                } else {
                  return value
                }
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
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: color.desc
              }
            }
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 10,
            top: 20,
            containLabel: true
          },
          series: {
            type: this.data.seriesType,
            barWidth: '60%',
            data: seriesData
          }
        };
        chart.setOption(option);
      })
    },
    getChartData(handle) {
      return new Promise(resolve => {
        this.dataGroupDatapromise.then(res => {
          let data = res[`${this.data.type}Data`]
          let dataMap = {}
          data.forEach(v => {
            if(v._id.date) {
              let s = v._id.date.split("/")
              dataMap[s[s.length - 1]] = v.total
            } else {
              dataMap[v._id.classifyId] = v.total
            }
          })
          let xAxisData = []
          let seriesData = []
          handle(dataMap, xAxisData, seriesData)
          resolve({
            xAxisData,
            seriesData
          })
        })
      })
    },
    getDateGroupData(fn, date) {
      this.dataGroupDatapromise = new Promise(res=>{
        wx.cloud.callFunction({
          name: 'statistics', data: {
            fn,
            data: {
              accountBook: getApp().$getStore("activeAccountBook"),
              date
            }
          }
        }).then(data=>{
          data = data.result.list || []
          let incomeData = []
          let outgoingsData = []
          data.forEach(v=>{
            if(v._id.type === "outgoings"){
              outgoingsData.push(v)
            }else {
              incomeData.push(v)
            }
          })
          res({
            incomeData,
            outgoingsData
          })
        })
      })
    },
    dispose () {
      if (this.chart) {
        this.chart.dispose();
      }
  
      this.setData({
        isDisposed: true
      });
    },
    onChangeSeriesType(e){
      this.setData({
        seriesType: e.detail
      })
      this.refreshChart()
    },
    onChangeType(e) {
      let type = e.detail || e.currentTarget.dataset.type
      this.setData({
        type
      })
      this.refreshChart()
    },
    refreshChart(){
      if(this.chart){
        this.setOption(this.chart)
      }
    },
    initChart(){
      if(this.data.isLoaded) return
      this.ecComponent.init((canvas, width, height, dpr) => {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr
        });
        this.setOption(chart);
        this.chart = chart;
        this.loaded()
        return chart;
      });
    },
    loaded(){
      this.setData({
        isLoaded: true,
        isDisposed: false
      });
    },
    onVisibleChange(v){
      if(v){
        setTimeout(() => {
          this.ecComponent = this.selectComponent('#chart-canvas'); 
          this.initChart()
        });
      }
    }
  }
})