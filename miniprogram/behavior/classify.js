import {defaultClassifies} from "../utils/constant"
import {uuid} from "../utils/index"
const App = getApp()
export default Behavior({
  methods:{
    updateClassifies(userClassifies, cb){
      App.$apis.classify.updateUserClassifies({classifies:userClassifies}).then(()=>{
        cb(true)
        App.globalData.userClassifies.classifies = [].concat(userClassifies)
      }).catch(()=>{
        cb(false)
      })
    },
    addClassify(userClassifies, data){
      userClassifies.push(this.generateClassify(data))
    },
    deleteClassify(userClassifies, classifyId){
      let index = userClassifies.findIndex(v=>v.classifyId === classifyId)
      userClassifies.splice(index, 1)
    },
    generateClassify(option){
      return Object.assign({
        classifyId:uuid()
      }, option)
    },
    getUserClassifies(){
      App.$apis.classify.getUserClassifies().then(res=>{
        if(res.data.length) {
          App.globalData.userClassifies.classifies = res.data[0].classifies
          App.globalData.userClassifies._id = res.data[0]._id
        } else {
          this.createUserClassifies()
        }
      })
    },
    createUserClassifies(){
      App.getAppId().then(({openid}) => {
        App.$apis.classify.createUserClassifies(
          {
            classifies:defaultClassifies.map(v=>{
              return this.generateClassify(v)
            }),
            accountBook: App.$getStore('activeAccountBook')
          }
        ).then(()=>{
          this.getUserClassifies()
        })
      })
    }
  }
})