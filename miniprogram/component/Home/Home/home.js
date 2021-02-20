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
    }
  },
  behaviors: [Behavior({
    ready() {
      this.createSelectorQuery().select(".dd-account-home-panel__header").boundingClientRect(v => {
        this.setData({
          topHeight: `${v.height * 2 }rpx`,
          navHeight: App.globalData.navHeight,
          date: parseTime(new Date())
        })
      }).exec()
    }
  })],
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
    outgoings: "0.00",
    income: "0.00",
    date: "",
    accounts: [],
    modalVisible:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getAccounts() {
      return new Promise((resolve, reject) => {
        App.$apis.account.getAccounts({
          date: this.data.date
        }).then(res => {
          this.setData({
            accounts: []
          })
          setTimeout(() => {
            this.setData({
              accounts: res.data
            })
            this.getTotal()
            resolve(true)
          });
        }).catch(() => {
          resolve(false)
        })
      })
    },
    onRefresh(e) {
      this.getAccounts().then((ok) => {
        e.detail()
      })
    },
    bindDateChange(e){
      this.setData({
        date: e.detail.value.split("-").join("/")
      })
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
          this.getAccounts()
          this.setData({
            modalVisible: false
          })
        })
      }
    },
    onDelete(e){
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
    getTotal() {
      let outgoings = 0
      let income = 0
      this.data.accounts.forEach(v => {
        if (v.type === 'outgoings') {
          outgoings += v.amount
        } else {
          income += v.amount
        }
      })
      this.setData({
        outgoings: outgoings.toFixed(2),
        income: income.toFixed(2)
      })
    }
  }
})