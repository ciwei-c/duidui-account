
import {tabMenus} from "../../utils/constant"
import classifyBehavior from "../../behavior/classify"
import accountBookBehavior from "../../behavior/accountBook"
Component({
  lifetimes:{
    attached() {
      getApp().$listener.on("getUserClassifies", ()=>{
        this.getUserClassifies()
      })
    }
  },
  behaviors:[classifyBehavior, accountBookBehavior],
  data: {
    centerMenuIndex:(()=>{
      return ( tabMenus.length - 1 ) / 2
    })(),
    activeIndex: 0,
    tabMenus
  },
  methods:{
    getParent(e){
      e.detail(this)
    },
    onSetActiveIndex(e){
      if(e.detail === this.data.centerMenuIndex){
        wx.navigateTo({
          url: '/pages/tally/tally',
        })
      }else {
        this.setData({
          activeIndex:e.detail
        })
      }
    }
  }
})
