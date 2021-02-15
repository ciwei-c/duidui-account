const { parseTime } = require("../../../utils/index")

const keys = [{
  label: "7",
  type: "number"
}, {
  label: "8",
  type: "number"
}, {
  label: "9",
  type: "number"
}, {
  label: "+",
  type: "plus"
}, {
  label: "4",
  type: "number"
}, {
  label: "5",
  type: "number"
}, {
  label: "6",
  type: "number"
}, {
  label: "-",
  type: "minus"
}, {
  label: "1",
  type: "number"
}, {
  label: "2",
  type: "number"
}, {
  label: "3",
  type: "number"
}, {
  label: "保存再记",
  type: "button"
}, {
  label: ".",
  type: "dot"
}, {
  label: "0",
  type: "number"
}, {
  type: "delete",
  icon: "delete"
}, {
  label: "完成",
  type: "button"
}]

const behavior = Behavior({
  ready(){
    wx.createSelectorQuery().in(this).select(".dd-account__calculator").boundingClientRect(v=>{
      this.triggerEvent("getCalcHeight", Math.ceil(v.height))
    }).exec()
  }
})

Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['dd-class'],
  properties: {

  },
  behaviors:[behavior],
  /**
   * 组件的初始数据
   */
  data: {
    type: "outgoings",
    remark: "",
    date: "",
    calcResult: "0.00",
    calcCacheList: [],
    keys: (() => {
      let _keys = []
      keys.forEach((v, idx) => {
        if (idx % 4 === 0) {
          _keys.push([])
        }
        _keys[_keys.length - 1].push(v)
      })
      return _keys
    })()
  },
  lifetimes: {
    attached() {
      this.triggerType()
      this.setData({
        date:parseTime(new Date())
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    triggerType(){
      this.triggerEvent("getAccountType", this.data.type)
    },
    onChangeType(e){
      this.setData({
        type:e.currentTarget.dataset.type
      })
      this.triggerType()
    },
    bindDateChange(e){
      this.setData({
        date: e.detail.value.split("-").join("/")
      })
    },
    handleResult(addtion, key){
      let calcCacheList = this.data.calcCacheList
      const addCalcCache = () => {
        calcCacheList.push({
          value:"",
          sign:""
        })
      }
      const createCalcCache = () => {
        if(!calcCacheList.length) {
          addCalcCache()
        }
      }
      const getCalcCache = () => {
        return calcCacheList[calcCacheList.length - 1]
      }
      const deleteLastCache = () => {
        calcCacheList.splice(calcCacheList.length - 1, 1)
      }
      createCalcCache()
      if (key.type === "number"){
        let calcCache = getCalcCache()
        let { value } = calcCache
        if(!value || value === "0") {
          calcCache.value = addtion
        } else {
          if(!(value.split(".")[1] && value.split(".")[1].length >= 2)){
            calcCache.value = `${value}${addtion}`
          }
        }
      } else if (key.type === "dot"){
        let calcCache = getCalcCache()
        let { value } = calcCache
        if(value.indexOf(".") === -1) {
          if(!value) {
            calcCache.value = `0${addtion}`
          } else {
            calcCache.value = `${value}${addtion}`
          }
        }
      } else if (key.type === "delete"){
        let calcCache = getCalcCache()
        let { value, sign } = calcCache
        if(!!value){
          calcCache.value = value.substring(0, value.length - 1)
        } else if (!!sign) {
          calcCache.sign = ""
        }
        if(calcCacheList.length === 1) {
          while(calcCache.value.indexOf(".") > -1 && (calcCache.value.endsWith(".") || calcCache.value.endsWith("0"))){
            calcCache.value = calcCache.value.substring(0, calcCache.value.length - 1)
          }
        }
        if(!calcCache.value && !calcCache.sign) {
          deleteLastCache()
        }
      } else {
        let calcCache = getCalcCache()
        let { value } = calcCache
        if(!value) {
          calcCache.sign = addtion
        } else {
          addCalcCache()
          calcCache = getCalcCache()
          calcCache.sign = addtion
        }
      }
      this.setData({
        calcCacheList
      })
      return this.getCalcResult()
    },
    getCalcResult(){
      let result = 0
      this.data.calcCacheList.forEach(v=>{
        let { value, sign } = v
        if(value.endsWith(".")){
          value = value.substring(0, value.length - 1)
        }
        if(sign === "-"){
          result = result - Number(value)
        } else {
          result += Number(value)
        }
      })
      return result.toFixed(2)
    },
    onTapKey(e){
      let { key } = e.currentTarget.dataset
      if(key.type === "button"){
        this.triggerEvent('save', {
          result:this.data.calcResult,
          back: key.label !== "保存再记",
          date: this.data.date,
          type: this.data.type,
          remark: this.data.remark
        })
      } else {
        let calcResult = this.handleResult(key.label, key)
        this.setData({
          calcResult
        })
      }
    }
  }
})