export const uuid = function (len = 32) {
  const $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const maxPos = $chars.length;
  let str = '';
  for (let i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return str;
}

export const parseTime = (time, format = '{y}/{m}/{d}') => {
  let date = new Date(time)
  const zero = (s) => {
    return s < 10 ? `0${s}` : s
  }
  
  let y = date.getFullYear()
  let m = zero(date.getMonth() + 1)
  let d = zero(date.getDate())
  let h = zero(date.getHours())
  let f = zero(date.getMinutes())
  let s = zero(date.getSeconds())

  let ret = format.replace('{y}',y)
                  .replace('{m}',m)
                  .replace('{d}',d)
                  .replace('{h}',h)
                  .replace('{f}',f)
                  .replace('{s}',s)
  return ret
}