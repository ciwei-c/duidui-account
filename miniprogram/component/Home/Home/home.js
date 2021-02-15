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
    attached() {
      App.$listener.on('onAddcount', () => {
        this.getAccounts()
      })
      this.getAccounts()
    }
  },
  data: {
    outgoings: "0.00",
    income: "0.00",
    accounts: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getAccounts() {
      return new Promise((resolve, reject) => {
        App.$apis.account.getAccounts({
          date: parseTime(new Date())
        }).then(res => {
          this.setData({
            accounts: res.data
          })
          this.getTotal()
          resolve(true)
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