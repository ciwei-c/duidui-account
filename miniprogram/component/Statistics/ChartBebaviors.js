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
                if(value.day) {
                  return `${value.day}\n${value.date}`
                }else {
                  return `${value.month}`
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
    getChartData(handle) {
      return new Promise(resolve => {
        this.dataGroupDatapromise.then(res => {
          let data = res[`${this.data.type}Data`]
          let dataMap = {}
          data.forEach(v => {
            let s = v._id.date.split("/")
            dataMap[s[s.length - 1]] = v.total
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
    onChangeType(e) {
      let type = e.currentTarget.dataset.type
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
          this.ecComponent = this.selectComponent('#chart-dom'); 
          this.initChart()
        });
      }
    }
  }
})