
import {tabMenus} from "../../utils/constant"
import classifyBehavior from "../../behavior/classify"
import accountBookBehavior from "../../behavior/accountBook"
Component({
  lifetimes:{
    attached() {
      wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline']
      })
      getApp().$listener.on("getUserClassifies", ()=>{
        this.getUserClassifies()
      })
      setTimeout(() => {
        this.setData({
          activeIndex:0
        })
      }, 500);
    }
  },
  behaviors:[classifyBehavior, accountBookBehavior],
  data: {
    centerMenuIndex:(()=>{
      return ( tabMenus.length - 1 ) / 2
    })(),
    activeIndex: -1,
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
