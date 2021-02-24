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

export const getDays = ({year, month}) => {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      return ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) ? 29 : 28;
    default:
      return 0;
  };
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