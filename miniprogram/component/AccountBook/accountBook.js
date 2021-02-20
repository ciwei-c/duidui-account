// pages/index/AccountBook/account-book.js
const App = getApp()
import accountBookBehavior from "../../behavior/accountBook"
import store from "../../store/index"
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
      value:false
    }
  },
  behaviors: [accountBookBehavior, Behavior({
    ready() {}
  })],
  lifetimes:{
    detached(){
      App.$listener.remove('refreshAccountBook', this._refreshAccountBook)
    },
    attached(){
      new App.$watcher(store, (v)=>{
        this.setData({
          activeAccountBook:v
        })
      }, 'activeAccountBook')
      this._refreshAccountBook = (emit) => {
        this.getBooks(emit)
      },
      App.$listener.on('refreshAccountBook', this._refreshAccountBook)
      this.getBooks()
      this.setData({
        navHeight: App.globalData.navHeight
      })
      this.setData({
        activeAccountBook:App.$getStore("activeAccountBook")
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    accountBooks:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onAddAccountBook(){
      wx.navigateTo({
        url: '/pages/accountBookEditor/accountBookEditor',
      })
    },
    onChooseAccountBook(e){
      let accountBook = e.currentTarget.dataset.accountbook
      getApp().$setStore('activeAccountBook', accountBook._id)
      App.activeAccountBook = Object.assign(accountBook)
      getApp().$listener.emit("getAccounts")
      getApp().$listener.emit("getUserClassifies")
      this.triggerEvent('getParent', (parent)=>{
        parent.setData({
          activeIndex:0
        })
      })
    },
    getBooks(emit = true){
      return new Promise(res=>{
        this.getAccountBooks((ret)=>{
          if(ret === false){
            res(false)
          } else {
            this.setData({
              accountBooks:ret
            })
            if(emit) {
              getApp().$listener.emit("getAccounts")
              getApp().$listener.emit("getUserClassifies")
            }
            res(true)
          }
        })
      })
    },
    onSettingAccountBook(e){
      let accountBook = e.currentTarget.dataset.accountbook
      wx.navigateTo({
        url: `/pages/accountBookSetting/accountBookSetting?accountBookId=${accountBook._id}&enableDelete=${this.data.accountBooks.length > 1}`,
      })
    },
    onRefresh(e){
      this.getBooks().then(()=>{
        e.detail()
      })
    }
  }
})
