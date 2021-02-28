// component/Common/DatePicker/Month/month.js
import {dateZeroFill, parseTime} from "../../../../utils/index";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    loadMethod:{
      type:String,
      value:"scroll"
    },
    value: {
      type: Number | String,
      observer: 'onValueChange'
    },
    visible: {
      type: Boolean,
      observer: 'onVisibleChange'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    panelHeight: 0,
    activeValue: "",
    panels: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onScrollUpper(e){
      if(!this.data.panels.length) return
      let {year} = this.data.panels[0]
      this.data.panels.unshift(this.getPanelData(year - 1))
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
      if(!this.data.panels.length) return
      let {year} = this.data.panels[this.data.panels.length - 1]
      this.data.panels.push(this.getPanelData(year + 1))
      this.setData({
        panels:this.data.panels
      })
    },
    onValueChange(v){
      let date = new Date(v)
      let timestamp = date.getTime()
      this.setData({
        activeValue:timestamp,
        activeYearValue: date.getFullYear(),
        activeMonthValue: date.getMonth() + 1
      })
    },
    onVisibleChange(v) {
      if (v) {
        this.showPicker()
      } else {
        this.hidePicker()
      }
    },
    showPicker(){
      let date = new Date()
      if(this.data.value){
        date = new Date(this.data.value)
      }
      this.generatePanels(date.getFullYear())
      setTimeout(() => {
        this.createSelectorQuery().select(".dd-date-picker__month-scroll-view").boundingClientRect(v => {
          this.setData({
            panelHeight: v.height,
            scrollTop: v.height
          })
        }).exec() 
      });
    },
    generateMonths(year){
      let months = []
      let chars = ["一","二","三","四","五","六","七","八","九","十","十一","十二"]
      for(let i = 0 ; i < 12 ; i ++){
        months.push({
          month: i + 1,
          monthChar: `${chars[i]}月`,
          year,
          format:`${year}/${dateZeroFill(i+1)}`
        })
      }
      return months
    },
    getPanelData(year){
      return {
        year,
        months:this.generateMonths(year)
      }
    },
    generatePanels(year){
      this.setData({
        panels:[
          this.getPanelData(year - 1),
          this.getPanelData(year),
          this.getPanelData(year + 1)
        ]
      })
    },
    onPickMonth(e){
      let data = e.currentTarget.dataset.data
      let date = parseTime(this.data.activeValue, "{d}")
      this.triggerEvent("change", new Date(`${data.format}/${date}`).getTime())
    },
    hidePicker(){
      this.setData({
        panels:[]
      })
    }
  }
})
