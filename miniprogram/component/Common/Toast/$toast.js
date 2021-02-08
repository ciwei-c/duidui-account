export default (inst, options) => {
  let toast = inst.selectComponent(options.el || '#toast')
  toast.handleShow(options)
}