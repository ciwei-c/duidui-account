import * as echarts from '../Common/Echarts/echarts';
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
    dispose () {
      if (this.chart) {
        this.chart.dispose();
      }
  
      this.setData({
        isDisposed: true
      });
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