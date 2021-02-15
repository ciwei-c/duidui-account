const App = getApp();
import store from "../../store/index"
import classifyBehavior from "../../behavior/classify"
Component({
  properties: {
    type: {
      type: String
    }
  },
  data: {
    actions: [{
        name: '取消'
      },
      {
        name: '删除',
        color: '#ed3f14',
        loading: false
      }
    ],
    modalVisible: false,
    classifies: [],
    loading: false,
    classifyLabel: "数码产品",
    activeClassify: null
  },
  behaviors: [classifyBehavior, Behavior({
    ready() {
      this.createSelectorQuery().select(".dd-account-classify__btn").boundingClientRect(v => {
        this.setData({
          tabHeight: `${v.height * 2 + 20}rpx`
        })
      }).exec()
    }
  })],
  lifetimes: {
    attached() {
      this.watcher = new App.$watcher(store, (v) => {
        this.setClassifies()
      }, "userClassifies")
      this.setClassifies()
      this.setData({
        navHeight: App.globalData.navHeight,
        iconWidth: (App.globalData.systemInfo.screenWidth / 4)
      })
    }
  },
  methods: {
    setClassifies() {
      if (App.$getStore("userClassifies")) {
        this.setData({
          classifies: App.$getStore("userClassifies")
        })
        if (this.data.classifies.length) {
          let activeClassifyIndex = 0
          if (this.data.activeClassify) {
            activeClassifyIndex = this.data.classifies.findIndex(v => v.classifyId === this.data.activeClassify.classifyId)
          }
          this.setActiveClassify(this.data.classifies[Math.max(activeClassifyIndex, 0)])
        }
      }
    },
    onDeleteClassify() {
      if (!this.data.activeClassify) return
      this.setData({
        modalVisible: true
      })
    },
    handleModalClick({
      detail
    }) {
      if (detail.index === 0) {
        this.setData({
          modalVisible: false
        })
      } else {
        let userClassifies = App.$getStore('userClassifies')
        this.deleteClassify(userClassifies, this.data.activeClassify.classifyId)
        this.setLoading(true)
        this.updateClassifies(userClassifies, () => {
          this.setLoading(false)
          App.$toast({
            type: 'success',
            content: '分类删除成功'
          })
          this.setData({
            modalVisible: false
          })
        })
      }
    },
    setLoading(loading) {
      this.setData({
        loading
      })
    },
    onEditClassify() {
      let data = {
        type: this.data.type,
        classifyId: this.data.activeClassify.classifyId,
        label: this.data.activeClassify.label,
        icon: this.data.activeClassify.icon,
        isAdd: false
      }
      let params = ''
      Object.keys(data).forEach((v, idx) => {
        params += `${idx !== 0 ? '&' : ''}${v}=${data[v]}`
      })
      wx.navigateTo({
        url: `/pages/classifyEditor/classifyEditor?${params}`,
      })
    },
    onAddClassify() {
      wx.navigateTo({
        url: `/pages/classifyEditor/classifyEditor?type=${this.data.type}`,
      })
    },
    setActiveClassify(classify) {
      this.setData({
        activeClassify: classify
      })
    },
    onTapClassify(e) {
      this.setActiveClassify(e.currentTarget.dataset.classify)
    }
  }
})