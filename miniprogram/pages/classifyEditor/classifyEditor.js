Page({
  data: {
    type: "outgoings",
    isAdd: true,
    label: "",
    icon: "",
    classifyId: ""
  },
  onLoad(e) {
    ['type', 'isAdd', 'label', 'icon', 'classifyId'].forEach(v=>{
      if(e[v]){
        let data = {}
        data[v] = e[v]
        if(v === 'isAdd') data[v] = (e[v] === 'true')
        this.setData(data)
      }
    })
  }
})