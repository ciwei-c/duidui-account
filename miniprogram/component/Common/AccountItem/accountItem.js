import {
  parseTime
} from "../../../utils/index"
const App = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLast:{
      type: Boolean
    },
    item: {
      type: Object
    }
  },
  lifetimes: {
    attached() {
      new App.$watcher(App.globalData.userClassifies, () => {
        this.setClassify()
      })
      this.setData({
        time: parseTime(this.data.item.time, "{h}:{f}"),
        remark: this.data.item.remark,
        amount: `${this.data.item.type === 'income' ? '' : '-'}${this.data.item.amount.toFixed(2)}`
      })
      this.setClassify()
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onEdit(){
      this.triggerEvent("edit", this.data.item)
    },
    onDelete(){
      this.triggerEvent("delete", this.data.item)
    },
    setClassify() {
      if(App.globalData.userClassifies.classifies) {
        let classifies = App.globalData.userClassifies.classifies
        let idx = classifies.findIndex(v =>
          v.classifyId === this.data.item.classifyId
        )
        if (idx > -1) {
          this.setData({
            label: classifies[idx].label,
            icon: classifies[idx].icon
          })
        } else {
          this.setData({
            label: "未知分类",
            icon: "other"
          })
        }
      }
    }
  }
})