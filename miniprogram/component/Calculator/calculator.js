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
  label: "",
  type: "empty"
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
  label: "",
  type: "empty"
}]
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
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

  /**
   * 组件的方法列表
   */
  methods: {
    bindDateChange(e){
      this.setData({
        date: e.detail.value.split("-").join("/")
      })
    },
    handleResult(oldCalc, addtion, key){
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
        console.log(value)
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
      let calcResult = this.handleResult(this.data.calc, key.label, key)
      this.setData({
        calcResult
      })
    }
  }
})