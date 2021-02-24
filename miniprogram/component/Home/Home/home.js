// pages/index/Home/home.js
const App = getApp()
import {
  parseTime
} from "../../../utils/index"
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
  lifetimes: {
    detached(){
      App.$listener.remove('onAddcount', this._getAccounts)
      App.$listener.remove('getAccounts', this._getAccounts)
    },
    attached() {
      this._getAccounts = () => {
        this.initRenderedFlag()
        this.getAccounts()
      }
      App.$listener.on('onAddcount', this._getAccounts)
      App.$listener.on('getAccounts', this._getAccounts)
      this.setData({
        date:parseTime(new Date())
      })
    }
  },
  data: {
    range:'date',
    outgoings: "0.00",
    loading:false,
    income: "0.00",
    date: "",
    accounts: [],
    monthAccounts:[],
    isMonthRendered:false,
    isDateRendered:false,
    dateAccounts:[],
    modalVisible:false,
    emptyAccounts:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onVisibleChange(v){
      if(v && !this.data.topHeight){
        setTimeout(() => {
          this.createSelectorQuery().select(".dd-account-home-panel__header").boundingClientRect(v => {
            this.setData({
              topHeight: `${v.height * 2 }rpx`,
              navHeight: App.globalData.navHeight,
              date: parseTime(new Date()),
              dateForMonth: parseTime(new Date(), "{y}/{m}")
            })
          }).exec()
        });
      }
    },
    setLoading(loading){
      this.setData({
        loading
      })
    },
    onChangeRange(e){
      if(this.data.range !== e.currentTarget.dataset.data) {
        let range = e.currentTarget.dataset.data
        this.setData({
          range
        })
        if((range === "month" && !this.data.isMonthRendered) || (range === "date" && !this.data.isDateRendered)) {
          this.getAccounts()
        } else {
          this.data.accounts = range === "month" ? this.data.monthAccounts : this.data.dateAccounts
          this.getAmount()
        }
      }
    },
    getAccounts() {
      this.setLoading(true)
      let isMonth = this.data.range === "month"
      return new Promise((resolve) => {
        wx.cloud.callFunction({ name: 'account', data:{
          fn:isMonth ? "getAccountsByMonth" : "getAccountsByDate",
          data:{
            accountBook: getApp().$getStore("activeAccountBook"),
            date: parseTime(this.data.date, isMonth ? "{y}/{m}" : "{y}/{m}/{d}")
          }
        }}).then((res) => {
          let data = res.result.data
          this.setData({
            accounts: [],
            emptyAccounts:!data.length
          })
          data.sort((a,b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
          })
          let accounts = []
          let currentDate = ""
          data.forEach(v=>{
            if(v.date !== currentDate){
              currentDate = v.date
              accounts.push({
                date: parseTime(v.date, '{m}/{d}'),
                week: this.getWeek(v.date) ,
                data: []
              })
            }
            accounts[accounts.length - 1].data.push(v)
          })
          this.data.accounts = accounts
          if(isMonth) {
            this.setData({
              monthAccounts:accounts,
              isMonthRendered:true
            })
          } else {
            this.setData({
              dateAccounts:accounts,
              isDateRendered:true
            })
          }
          this.getAmount()
          this.setLoading(false)
          resolve(true)
        }).catch(()=>{
          this.setLoading(false)
          resolve(false)
        })
      })
    },
    getWeek(date){
      let weeks = ['日','一','二','三','四','五','六']
      return `星期${weeks[new Date(date).getDay()]}`
    },
    onRefresh(e) {
      this.getAccounts().then((ok) => {
        e.detail()
      })
    },
    initRenderedFlag(){
      this.setData({
        isDateRendered:false,
        isMonthRendered:false
      })
    },
    bindDateChange(e){
      this.setData({
        date: parseTime(e.detail),
        dateForMonth: parseTime(e.detail, "{y}/{m}")
      })
      this.initRenderedFlag()
      this.getAccounts()
    },
    handleModalClick({
      detail
    }) {
      if (detail.index === 0) {
        this.setData({
          modalVisible: false
        })
      } else {
        App.$apis.account.deleteAccount({_id:this.data.deleteId}).then(()=>{
          this.initRenderedFlag()
          this.getAccounts()
          this.setData({
            modalVisible: false
          })
        })
      }
    },
    onDelete(e){
      console.log(e)
      this.setData({
        modalVisible:true,
        deleteId:e.detail._id
      })
    },
    onEdit(e){
      let data = e.detail
      let query = ""
      Object.keys(data).forEach((v, idx)=>{
        query += `${!idx ? '' : '&'}${v}=${data[v]}`
      })
      wx.navigateTo({
        url: '/pages/tally/tally?' + query,
      })
    },
    getAmount() {
      let outgoings = 0
      let income = 0
      this.data.accounts.forEach(v => {
        v.outgoings = 0
        v.income = 0
        v.data.forEach(innerV=>{
          if (innerV.type === 'outgoings') {
            v.outgoings += innerV.amount
            outgoings += innerV.amount
          } else {
            v.income += innerV.amount
            income += innerV.amount
          }
        })
        v.outgoings = v.outgoings.toFixed(2)
        v.income = v.income.toFixed(2)
      })
      this.setData({
        accounts: this.data.accounts,
        outgoings: outgoings.toFixed(2),
        income: income.toFixed(2)
      })
    }
  }
})