// component/QuickAccount/quickAccount.js
const App = getApp()
import {parseTime} from "../../utils/index";
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  lifetimes:{
    attached(){
      this.getQuickAccounts()
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    data:[],
    loading:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDelete(e){
      let data = e.currentTarget.dataset.data
      App.$apis.quickAccount.deleteQuickAccount({
        _id:data._id
      }).then(()=>{
        this.getQuickAccounts()
      })
    },
    onTouchStart(e){
      this.isCurrentTapEnable = true
      let index = e.currentTarget.dataset.index
      let swipoutComponent = this.selectComponent(`.dd-account-quick-account__swipeout-${index}`)
      if(swipoutComponent.data.position.pageX === 0) {
        this.isCurrentTapEnable = true
      } else {
        this.isCurrentTapEnable = false
      }
    },
    onTouchEnd(e){
      let data = e.currentTarget.dataset.data
      let index = e.currentTarget.dataset.index
      let swipoutComponent = this.selectComponent(`.dd-account-quick-account__swipeout-${index}`)
      if(!(this.isCurrentTapEnable && swipoutComponent.data.position.pageX === 0)) return

      let time = new Date().getTime()
      let postData = {
        date:parseTime(time, "{y}/{m}/{d}"),
        remark:data.remark,
        time: new Date().getTime(),
        amount: data.amount,
        type: data.type,
        classifyId: data.classifyId
      }
      let fn = "addAccount"
      App.$apis.account[fn](postData).then(()=>{
        App.$toast({
          type:'success',
          content:''
        })
        App.$listener.emit('onAddcount')
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 300);
      })
    },
    onRefresh(e){
      this.getQuickAccounts(false).then(()=>{
        e.detail()
      })
    },
    getQuickAccounts(loading = true){
      if(loading) {
        this.setData({
          loading:true
        })
      }
      return new Promise(resolve => {
        wx.cloud.callFunction({ name: 'quickAccount', data:{
          fn:"getQuickAccounts",
          data:{
            accountBook: getApp().$getStore("activeAccountBook")
          }
        }}).then(res=>{
          this.setData({
            loading:false
          })
          let data = res.result.list || []
          data = data.map(v=>{
            let classifies = App.globalData.userClassifies.classifies
            let index = classifies.findIndex(d=>d.classifyId === v.classifyId)
            if(index > -1){
              v.icon = classifies[index].icon
              v.label = classifies[index].label
            } else {
              v.icon = "other"
              v.label = "未知分类"
            }
            v.amountFormat = `${v.amount.toFixed(2)}`
            return v
          })
          this.setData({
            data
          })
          resolve()
        }).catch(()=>{
          this.setData({
            loading:false
          })
          resolve()
        })
      })
    }
  }
})
