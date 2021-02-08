
import {tabMenus} from "../../utils/constant"
Component({
  lifetimes:{
    attached() {
    }
  },
  data: {
    centerMenuIndex:(()=>{
      return ( tabMenus.length - 1 ) / 2
    })(),
    activeIndex: 0,
    tabMenus
  },
  methods:{
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
