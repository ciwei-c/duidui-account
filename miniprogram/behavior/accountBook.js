const App = getApp()
export default Behavior({
  methods:{
    getAccountBooks(cb){
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
    createAccountBook(data, cb){
      App.$apis.accountBook.createAccountBook(data).then(()=>{
        this.getAccountBooks(cb)
      })
    }
  }
})