// component/Common/DatePicker/DaysPanel/daysPanel.js
import {dateZeroFill} from "../../../../../utils/index"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value:{
      type:Number
    },
    data: {
      type: Object,
      observer: 'onDataChange'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    renderDates:[],
    dates: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClickDateCol(e){
      let data = e.currentTarget.dataset.data
      if(data.disabled) return
      this.triggerEvent('pick', data)
    },
    onDataChange(v) {
      let {year, month} = v
      month = dateZeroFill(month)
      let dates = []
      for(let i = 1 ; i <= v.days;  i ++ ){
        let date = `${year}/${month}/${dateZeroFill(i)}`
        let day = new Date(date).getDay()
        if(i === 1) {
          for(let k = 1 ; k <= day ; k ++){
            dates.push({
              disabled:true,
              d:dateZeroFill(v.prevDays - day + k)
            })
          }
        }
        dates.push({
          disabled:false,
          timestamp:new Date(date).getTime(),
          d:dateZeroFill(i)
        })
      }
      let renderDates = []
      dates.forEach((v, idx)=>{
        if(idx % 7 === 0){
          renderDates.push([])
        }
        renderDates[renderDates.length - 1].push(v)
      })
      if(renderDates[renderDates.length - 1].length < 7) {
        let fillCount = 7 - renderDates[renderDates.length - 1].length
        for(let i = 0 ; i < fillCount ; i ++){
          renderDates[renderDates.length - 1].push({
            disabled:true,
            d:`${dateZeroFill(i+1)}`
          })
        }
      }
      this.setData({
        renderDates
      })
    }
  }
})