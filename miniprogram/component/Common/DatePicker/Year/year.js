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
    addPrevPanel(){
      if(!this.data.panels.length) return
      let {ageStart} = this.data.panels[0]
      this.data.panels.unshift(this.getPanelData(this.getPrevAge((Number(ageStart)))))
      this.setData({
        panels:this.data.panels
      })
    },
    addNextPanel(){
      if(!this.data.panels.length) return
      let {ageStart} = this.data.panels[this.data.panels.length - 1]
      this.data.panels.push(this.getPanelData(this.getNextAge((Number(ageStart)))))
      this.setData({
        panels:this.data.panels
      })
    },
    onClickLeft(){
      this.onScrollUpper()
    },
    onClickRight(){
      
    },
    onScrollUpper(e){
      this.addPrevPanel()
      setTimeout(() => {
        this.setData({
          scrollTop:this.data.panelHeight
        })
      });
    },
    onScrollLower(e){
      this.addNextPanel()
    },
    onValueChange(v){
      this.setData({
        activeValue:v
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
      this.generatePanels(this.data.activeValue)
      setTimeout(() => {
        this.createSelectorQuery().select(".dd-date-picker__year-scroll-view").boundingClientRect(v => {
          this.setData({
            panelHeight: v.height,
            scrollTop: v.height
          })
        }).exec() 
      });
    },
    getPanelData({ageStart, ageEnd}){
      let years = []
      for(let i = ageStart; i <= ageEnd ; i++) {
        years.push(`${i}`)
      }
      return {
        ageStart,
        ageEnd,
        years
      }
    },
    getPrevAge(year){
      let { ageStart, ageEnd } = this.getAge(year)
      return {
        ageStart:ageStart - 10,
        ageEnd:ageEnd - 10
      }
    },
    getAge(year){
      let ageStart = Math.floor(year / 10) * 10
      let ageEnd = ageStart + 9
      return {
        ageStart,
        ageEnd
      }
    },
    getNextAge(year){
      let { ageStart, ageEnd } = this.getAge(year)
      return {
        ageStart:ageStart + 10,
        ageEnd:ageEnd + 10
      }
    },
    generatePanels(year){
      year = Number(year)
      this.setData({
        panels:[
          this.getPanelData(this.getPrevAge(year)),
          this.getPanelData(this.getAge(year)),
          this.getPanelData(this.getNextAge(year))
        ]
      })
    },
    onPickYear(e){
      let data = e.currentTarget.dataset.data
      this.triggerEvent("change", data)
    },
    hidePicker(){
      this.setData({
        panels:[]
      })
    }
  }
})
