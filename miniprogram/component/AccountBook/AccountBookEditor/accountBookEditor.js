// miniprogram/component/AccountBook/AccountBookEditor/accountBookEditor.js
import accountBookBehavior from "../../../behavior/accountBook"
const App = getApp()
Component({
  behaviors:[accountBookBehavior],
  properties:{
  },
  /**
   * 页面的初始数据
   */
  data: {
    bookName:"测试账本2",
    isAdd:true
  },
  lifetimes:{
    detached(){
      App.$listener.remove('setAccountEditor', this._setAccountEditor)
    },
    attached(){
      this._setAccountEditor = (data) => {
        console.log(data)
        this.setData({
          bookName:data.bookName,
          accountBookId:data.accountBookId,
          isAdd:false
        })
      }
      App.$listener.on("setAccountEditor", this._setAccountEditor)
    }
  },
  methods:{
    onChangeBookName(e){
      this.setData({
        bookName:e.detail.detail.value
      })
    },
    onEditAccountBook(){
      let fn = "createAccountBook"
      let postData = {
        bookName:this.data.bookName
      }
      if(!this.data.isAdd) {
        fn = "updateAccountBook"
        postData.accountBookId = this.data.accountBookId
      }
      this[fn](postData).then(()=>{
        App.$listener.emit('refreshAccountBook')
        App.$listener.emit('refreshAccountSetting')
        wx.navigateBack({
          delta: 1,
        })
      })
    }
  }
})