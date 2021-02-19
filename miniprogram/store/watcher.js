class Observe {
  constructor(data, options, key){
    if(!isObject(data)) return

    for (let k in data) {
      if((key && key.split(".")[0] === k) || !key) {
        let val = data[k]
        let dep = new Dep()
        if(options.deep) {
          new Observe(val, options, key.split(".").slice(1).join("."))
        }
        Object.defineProperty(data, k, {
          configurable: true,
          get() {
            Dep.target && dep.addSubs(Dep.target)
            return val
          },
          set(newValue) {
            if (val === newValue) {
              return
            }
            val = newValue
            if(options.deep) {
              new Observe(newValue, options, key.split(".").slice(1).join(".")) 
            }
            dep.notify()
          }
        })
      }
    }
  }
}

class Dep {
  constructor(){
    this.subs = []
    return this
  }
  addSubs(watcher){
    this.subs.push(watcher)
  }
  notify(){
    this.subs.forEach(watcher => {
      watcher.update()
    })
  }
}

export class Watcher {
  constructor(key, data, fn){
    this.data = data
    this.fn = fn
    this.key = key
    Dep.target = this
    
    let val = data
    let props = key.split(".")
    props.forEach(k=>{
      val = data[k]
      watch(val, fn)
    })
    Dep.target = undefined
  }
  update(){
    this.fn(this.data)
  }
}

const isObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]'

const watch = (data, fn) => {
  if(typeof data === 'object'){
    Object.keys(data).forEach(k=>{
      new Watcher(k, data, fn)
    })
  }
}
export default class {
  constructor(data, fn, key){
    let options = {}
    if(typeof fn === 'function') {
      fn = fn
    } else {
      options = fn
      fn = fn.handler
    }
    if(key) {
      key.split(".").forEach(k=>{
        if(isObject(data[k])){
        } else {
          this.shouldExportKey = k
        }
      })
    }
    Observe.list = Observe.list || []
    if(!Observe.list.includes(data)){
      new Observe(data, options, key)
      Observe.list.push(data)
    } else {
    }
    watch(data, ()=>{
      if(this.shouldExportKey){
        fn(data[this.shouldExportKey])
      } else {
        fn(data)
      }
    })
  }
}