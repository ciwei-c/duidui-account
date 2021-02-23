export const uuid = function (len = 32) {
  const $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const maxPos = $chars.length;
  let str = '';
  for (let i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return str;
}

export const dateZeroFill = (s) => {
  return s < 10 ? `0${s}` : s
}

export const parseTime = (time, format = '{y}/{m}/{d}') => {
  let date = new Date(time)
  
  let y = date.getFullYear()
  let m = dateZeroFill(date.getMonth() + 1)
  let d = dateZeroFill(date.getDate())
  let h = dateZeroFill(date.getHours())
  let f = dateZeroFill(date.getMinutes())
  let s = dateZeroFill(date.getSeconds())

  let ret = format.replace('{y}',y)
                  .replace('{m}',m)
                  .replace('{d}',d)
                  .replace('{h}',h)
                  .replace('{f}',f)
                  .replace('{s}',s)
  return ret
}