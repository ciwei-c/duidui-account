export default (options, inst) => {
  inst = inst || getApp().globalData.containerViewerInst
  let toast = inst.selectComponent(options.el || '#toast')
  toast.handleShow(options)
}