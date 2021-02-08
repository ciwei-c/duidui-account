import {defaultClassifies} from "../utils/constant"
import {uuid} from "../utils/index"
export default Behavior({
  methods:{
    generateClassify(option){
      return Object.assign({
        classifyId:uuid()
      }, option)
    },
    getUserClassifies(){
      getApp().$apis.classify.getUserClassifies().then(res=>{
        if(res.data.length) {
          getApp().$setStore("userClassifies", res.data[0].classifies)
        } else {
          this.createUserClassifies()
        }
      })
    },
    createUserClassifies(){
      getApp().getAppId().then(({openid}) => {
        getApp().$apis.classify.createUserClassifies(
          {
            classifies:defaultClassifies.map(v=>{
              return this.generateClassify(v)
            }),
            _id:openid + '_id',
            accountBook:'default'
          }
        ).then(()=>{
          this.getUserClassifies()
        })
      })
    }
  }
})