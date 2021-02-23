// component/Common/DatePicker/datePicker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type:{
      type:String,
      value:'date'
    },
    value:{
      type:Number | String,
      observer: 'onValueChange'
    },
    visible:{
      type:Boolean,
      observer: 'onVisibleChange'
    }
  },
  lifetimes: {
    attached() {
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    current:0,
    weeks:['日', '一', '二', '三', '四', '五', '六'],
    scrollTop:0,
    panelHeight:0,
    panels:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onVisibleChange(v){
      if(v){
        this.onShowPicker()
      }else {
        this.onHidePicker()
      }
    },
    onHidePicker(){
      this.setData({
        panels:[]
      })
    },
    onShowPicker(){
      let date = new Date()
      if(this.data.value){
        date = new Date(this.data.value)
      }
      this.generatePanels(date.getFullYear(), date.getMonth() + 1)
      setTimeout(() => {
        this.createSelectorQuery().select(".dd-date-picker__date-scroll-view").boundingClientRect(v => {
          this.setData({
            panelHeight: v.height,
            scrollTop: v.height
          })
        }).exec() 
      });
    },
    onScrollUpper(e){
      if(!this.data.panels.length) return
      let {year, month} = this.data.panels[0]
      this.data.panels.unshift(this.getPanelData(this.getPrevMandY(year, month, 1)))
      
      this.setData({
        panels:this.data.panels
      })
      setTimeout(() => {
        this.setData({
          scrollTop:this.data.panelHeight
        })
      });
    },
    onScrollLower(e){
      let {year, month} = this.data.panels[this.data.panels.length - 1]
      this.data.panels.push(this.getPanelData(this.getNextMandY(year, month, 1)))
      this.setData({
        panels:this.data.panels
      })
    },
    getPrevMandY(year, month, count = 1){
      let prevm = month - count
      let prevy = year
      if(prevm < 1) {
        prevm = 12 + prevm
        prevy --
      }
      return {
        month:prevm, 
        year:prevy
      }
    },
    getNextMandY(year, month, count = 1){
      let nextm = month + count
      let nexty = year
      if(nextm > 12){
        nextm = nextm - 12
        nexty ++
      }
      return {
        month:nextm, 
        year:nexty
      }
    },
    generatePanels(year, month){
      this.setData({
        panels:[
          this.getPanelData(this.getPrevMandY(year, month, 1)), 
          this.getPanelData({year, month}), 
          this.getPanelData(this.getNextMandY(year, month, 1))
        ]
      })
      this.setData({
        current:1
      })
    },
    getPanelData({year, month}){
      return {
        year,
        month,
        prevDays:this.getPrevDays({year, month}),
        nextDays:this.getNextDays({year, month}),
        days:this.getDays({year, month})
      }
    },
    onPickDate(e){
      this.onHidePicker()
      this.triggerEvent('change', e.detail.timestamp)
    },
    onValueChange(v){
      let timestamp = new Date(v).getTime()
      this.setData({
        activeValue:timestamp
      })
    },
    getPrevDays({year, month}){
      month --
      if(month < 1) {
        month = 12
        year --
      }
      return this.getDays({year, month})
    },
    getNextDays({year, month}){
      month ++
      if(month > 12){
        month = 1
        year ++
      }
      return this.getDays({year, month})
    },
    getDays({year, month}) {
      switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          return 31;
        case 4:
        case 6:
        case 9:
        case 11:
          return 30;
        case 2:
          return ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) ? 29 : 28;
        default:
          return 0;
      };
    }
  }
})