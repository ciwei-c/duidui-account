let store = {}
export const getStore = (k) => {
  return wx.getStorageSync(k)
}
export const setStore = (k,v) => {
  wx.setStorageSync(k, v)
  store[k] = v
  return
}
export const removeStore = (k) => {
  return wx.removeStorageSync(k)
}
export const clearStore = () => {
  return wx.clearStorageSync()
}
store = {
  'init-user-classifies': getStore('init-user-classifies'),
  'userClassifies': getStore('userClassifies')
}
export default store