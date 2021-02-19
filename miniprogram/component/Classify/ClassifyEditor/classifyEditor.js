const App = getApp();
import { allClassifies } from "../../../utils/constant" 
import classifyBehavior from "../../../behavior/classify"
Component({
  properties: {
    type:{
      type:String
    },
    isAdd:{
      type:Boolean
    },
    label:{
      type:String
    },
    icon:{
      type:String
    },
    classifyId:{
      type:String
    }
  },
  data: {
    classifies:[],
    loading:false,
    classifyLabel:"",
    activeClassifyIndex:0,
    activeClassifyIcon:""
  },
  behaviors:[classifyBehavior, Behavior({
    ready(){
      this.onReadyExec()
      this.createSelectorQuery().select(".dd-account-classify-editor__input").boundingClientRect(v=>{
        this.setData({
          inputHeight:`${v.height * 2 + 20}rpx`
        })
      }).exec() 
    }
  })],
  lifetimes:{
    attached(e){
      this.onReadyExec = () => {
        let { isAdd, classifyLabel, label, icon } = this.data
        this.setData({
          classifies:allClassifies,
          classifyLabel:isAdd ? classifyLabel : label,
          activeClassifyIndex: Math.max(allClassifies.findIndex(v=>v.icon === icon), 0)
        })
        this.setData({
          activeClassifyIcon: allClassifies[this.data.activeClassifyIndex].icon,
          navHeight:App.globalData.navHeight,
          iconWidth:(App.globalData.systemInfo.screenWidth / 4)
        })
      }
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
      if(!this.data.classifyLabel) {
        return App.$toast(this, {
          type: 'warning',
          content: '请输入分类名称'
        })
      }
      this.setData({
        loading:true
      })
      let userClassifies = App.globalData.userClassifies.classifies
      if(this.data.isAdd) {
        this.addClassify(userClassifies, {
          label:this.data.classifyLabel,
          icon:this.data.activeClassifyIcon,
          type:[this.data.type]
        })
      } else {
        userClassifies = userClassifies.map(v=>{
          if(v.classifyId === this.data.classifyId) {
            return {
              label:this.data.classifyLabel,
              icon:this.data.activeClassifyIcon,
              type:[this.data.type],
              classifyId:this.data.classifyId
            }
          } else {
            return v
          }
        })
      }
      this.updateClassifies(userClassifies, (ok)=>{
        this.setData({
          loading:false
        })
        if(ok){
          wx.navigateBack({
            delta: 1,
          })
        }
        App.$toast({
          type: ok ? 'success' : 'error',
          content: `分类${this.data.isAdd ? '新增' : '修改'}${ok ? '成功' : '失败，请重新尝试'}`
        })
      })
    }
  }
})