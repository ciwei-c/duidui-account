// miniprogram/component/AccountBook/AccountBookEditor/accountBookEditor.js
import accountBookBehavior from "../../../behavior/accountBook"
const App = getApp()
Component({
  behaviors:[accountBookBehavior],
  properties:{
    accountBookId:{
      type:String
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    accountBookData:{},
    confirmVisible:false,
    loading:false
  },
  lifetimes:{
    detached(){
      App.$listener.remove('initAccountSetting', this._initAccountSetting)
      App.$listener.remove('refreshAccountSetting', this._refreshAccountSetting)
    },
    attached(){
      this._initAccountSetting = ({enableDelete, accountBookId}) => {
        App.$apis.accountBook.getAccountBook({accountBookId}).then((data)=>{
          this.setData({
            accountBookId:accountBookId,
            accountBookData:data.data,
            enableDelete:enableDelete === "true"
          })
        })
      }
      this._refreshAccountSetting = () => {
        App.$apis.accountBook.getAccountBook({accountBookId:this.data.accountBookId}).then((data)=>{
          this.setData({
            accountBookData:data.data
          })
        })
      }
      App.$listener.on('initAccountSetting', this._initAccountSetting)
      App.$listener.on('refreshAccountSetting', this._refreshAccountSetting)
    }
  },
  methods:{
    onDeleteAccount(){
      this.setData({
        confirmVisible:true
      })
    },
    handleConfirmClick({
      detail
    }) {
      if (detail.index === 0) {
        this.setData({
          confirmVisible: false
        })
      } else {
        this.setData({
          loading:true
        })
        wx.cloud.callFunction({ name: 'accountBook', data:{
          fn:"deleteAccountBook",
          data:this.data.accountBookData
        }}).then(() => {
          App.$listener.emit('refreshAccountBook', true)
          this.setData({
            confirmVisible: false,
            loading:false
          })
          wx.navigateBack({
            delta: 1,
          })
        })
      }
    },
    onEditBookName(){
      wx.navigateTo({
        url: `/pages/accountBookEditor/accountBookEditor?accountBookId=${this.data.accountBookId}&bookName=${this.data.accountBookData.bookName}`,
      })
    },
    onChangeBookName(e){
      this.setData({
        bookName:e.detail.detail.value
      })
    },
    onAddAccountBook(){
      this.createAccountBook({
        bookName:this.data.bookName
      }).then(()=>{
        App.$listener.emit('refreshAccountBook')
        wx.navigateBack({
          delta: 1,
        })
      })
    }
  }
})