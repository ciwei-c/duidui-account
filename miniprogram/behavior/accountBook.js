const App = getApp()
export default Behavior({
  methods:{
    getAccountBooks(cb){
      cb = cb || (() => {})
      App.$apis.accountBook.getAccountBooks().then(res=>{
        if(res.data.length) {
          if(!App.$getStore('activeAccountBook')){
            App.$setStore('activeAccountBook', res.data[0]._id)
          } else {
            if(res.data.findIndex(v=>v._id === App.$getStore('activeAccountBook')) < 0) {
              App.$setStore('activeAccountBook', res.data[0]._id)
            }
          }
          App.activeAccountBook = res.data.filter(v=>v._id === App.$getStore('activeAccountBook'))[0]
          cb(res.data)
        } else {
          this.createAccountBook({
            bookName:"默认账本"
          }, cb)
        }
      }).catch(()=>{
        cb(false)
      })
    },
    updateAccountBook(data){
      return new Promise(res=>{
        App.$apis.accountBook.updateAccountBook(data).then(()=>{
          res()
        })
      })
    },
    createAccountBook(data, cb){
      return new Promise(res=>{
        App.$apis.accountBook.createAccountBook(data).then(()=>{
          if(cb){
            this.getAccountBooks(cb)
          }
          res()
        })
      })
    }
  }
})