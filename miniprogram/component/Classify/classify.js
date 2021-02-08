const App = getApp();
import {allClassifies} from "../../utils/constant" 
Component({
  data: {
    classifies:[],
    classifyLabel:"",
    activeClassifyIndex:0,
    activeClassifyIcon:"other"
  },
  lifetimes:{
    attached(){
      this.setData({
        classifies:allClassifies,
        activeClassifyIndex:0
      })
      this.setData({
        activeClassifyIcon:this.data.classifies[this.data.activeClassifyIndex].icon
      })
      setTimeout(() => {
        this.setData({
          navHeight:App.globalData.navHeight,
          iconWidth:(App.globalData.systemInfo.screenWidth / 4)
        })
        this.createSelectorQuery().select(".dd-account-classify__input").boundingClientRect(v=>{
          this.setData({
            inputHeight:`${v.height * 2 + 20}rpx`
          })
        }).exec() 
      });
    }
  },
  methods:{
    onTapClassify(e){
      this.setData({
        activeClassifyIndex:e.currentTarget.dataset.index,
        activeClassifyIcon:e.currentTarget.dataset.classify.icon
      })
    }
  }
})