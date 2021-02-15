export default {
  events: {},
  emit(eventName, ...data) {
    if(this.events[eventName] && Array.isArray(this.events[eventName])){
      this.events[eventName].forEach(cb=>{
        cb(...data)
      })
    }
  },
  on(eventName, cb) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(cb)
  },
  remove(eventName, cb) {
    if(this.events[eventName] && Array.isArray(this.events[eventName])) {
      let idx = this.events[eventName].indexOf(cb)
      if(idx > -1) {
        this.events[eventName].splice(idx, 1)
      }
    }
  }
}