import * as echarts from '../../Common/Echarts/echarts';
import {getDays, dateZeroFill} from "../../../utils/index";

const getXAxisData = () => {
  let date = new Date()
  let days = getDays({year:date.getFullYear, month:date.getMonth() + 1})
  let data = []
  for(let i = 0 ; i < days; i ++){
    data.push({
      value: dateZeroFill(i + 1)
    })
  }
  return data
}
const setOption = (chart) => {
  var option = {
    color: ["#febb2e"],
    tooltip: {
      trigger: "axis"
    },
    xAxis: {
      data: getXAxisData(),
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      splitLine: {
        show: false
      }
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    dataZoom: {
      type: "inside",
      start: 0,
      end: 50
    },
    series: {
      name: "Beijing AQI",
      type: "bar",
      barWidth: '60%',
      data: [156, 140, 133, 186, 182, 106, 119, 68, 54, 82, 90, 134, 188, 194, 159, 159, 169, 244, 199, 163, 149, 80, 67, 162, 140, 143, 125, 76, 119, 70, 104, 109, 159, 124, 135, 150, 164, 169, 83, 155, 75, 59, 78, 136, 103, 104, 176, 89, 127, 54, 100, 140, 186, 200, 61, 109, 111, 114, 97, 94, 66, 54, 87, 80, 84, 117, 168, 129, 127, 64, 60, 144, 170, 58, 87, 70, 53, 92, 78, 123, 95, 54, 68, 200, 314, 379, 346, 233, 80, 73, 76, 132, 211, 289, 250, 82, 99, 163, 267, 353, 78, 72, 88, 140, 206, 204, 65, 59, 150, 79, 63, 93, 80, 95, 59, 65, 77, 143, 98, 64, 93, 282, 155, 94, 196, 293, 83, 114, 276, 54, 65, 51, 62, 89, 65, 82, 276, 153, 52, 69, 113, 82, 99, 53, 103, 100, 73, 155, 243, 155, 125, 65, 65, 79, 200, 226, 122, 60, 85, 190, 105, 208, 59, 160, 211, 265, 386, 118, 89, 94, 77, 113, 143, 257, 117, 185, 119, 65, 87, 60, 108, 188, 143, 62, 100, 152, 166, 55, 59, 175, 293, 326, 153, 73, 267, 183, 394, 158, 86, 207]
    }
  };
  chart.setOption(option);
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabHeight:{
      type:String
    },
    visible:{
      type:Boolean,
      observer:"onVisibleChange"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    type:"outgoings",
    ec: {
      lazyLoad: true
      // onInit: initChart
    },
    isLoaded: false,
    isDisposed: false
  },
  lifetimes:{
    attached(){
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onChangeType(e){
      let type = e.currentTarget.dataset.type
      this.setData({
        type
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
    initChart(){
      this.ecComponent.init((canvas, width, height, dpr) => {
        // 获取组件的 canvas、width、height 后的回调函数
        // 在这里初始化图表
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        setOption(chart);
  
        // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
        this.chart = chart;
  
        this.setData({
          isLoaded: true,
          isDisposed: false
        });
  
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return chart;
      });
    },
    onVisibleChange(v){
      if(v){
        setTimeout(() => {
          this.ecComponent = this.selectComponent('#mychart-dom-bar'); 
          this.initChart()
        });
      }
    }
  }
})
