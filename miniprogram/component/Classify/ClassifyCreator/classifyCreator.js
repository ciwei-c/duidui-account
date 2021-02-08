const App = getApp();
import { allClassifies } from "../../../utils/constant" 
import classifyBehavior from "../../../behavior/classify"
Component({
  properties: {
    type:{
      type:String
    }
  },
  data: {
    classifies:[],
    loading:false,
    classifyLabel:"数码产品",
    activeClassifyIndex:0,
    activeClassifyIcon:"other"
  },
  behaviors:[classifyBehavior, Behavior({
    ready(){
      this.createSelectorQuery().select(".dd-account-classify-creator__input").boundingClientRect(v=>{
        this.setData({
          inputHeight:`${v.height * 2 + 20}rpx`
        })
      }).exec() 
    }
  })],
  lifetimes:{
    attached(e){
      this.setData({
        classifies:allClassifies,
        activeClassifyIndex:0
      })
      this.setData({
        activeClassifyIcon:this.data.classifies[this.data.activeClassifyIndex].icon,
        navHeight:App.globalData.navHeight,
        iconWidth:(App.globalData.systemInfo.screenWidth / 4)
      })
    }
  },
  methods:{
    onTapClassify(e){
      this.setData({
        activeClassifyIndex:e.currentTarget.dataset.index,
        activeClassifyIcon:e.currentTarget.dataset.classify.icon
      })
    },
    onInputChange(e){
      this.setData({
        classifyLabel:e.detail.detail.value
      })
    },
    onFinish(){
      let userClassifies = App.$getStore("userClassifies")
      if(!this.data.classifyLabel) {
        return App.$toast(this, {
          type: 'warning',
          content: '请输入分类名称'
        })
      }
      userClassifies.push(this.generateClassify({
        label:this.data.classifyLabel,
        icon:this.data.activeClassifyIcon,
        type:[this.data.type]
      }))
      this.setData({
        loading:true
      })
      App.$apis.classify.updateUserClassifies({classifies:userClassifies}, this).then(()=>{
        this.setData({
          loading:false
        })
        App.$setStore("userClassifies", userClassifies)
        App.$toast(this, {
          type: 'success',
          content: '分类新增成功'
        })
      })
    }
  }
})