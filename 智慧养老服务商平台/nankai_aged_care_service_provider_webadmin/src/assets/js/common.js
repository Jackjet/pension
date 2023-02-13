export default {
  /**
   * 获取用户信息
   * @param {string} key 保存字段
   * @param {*} value 返回值
   */
  session: (key, value) => {
    if (value === void (0)) {
      let lsVal = sessionStorage.getItem(key)
      if (lsVal && lsVal.indexOf('autostringify-') === 0) {
        return JSON.parse(lsVal.split('autostringify-')[1])
      } else {
        return lsVal
      }
    } else {
      if (typeof (value) === 'object' || Array.isArray(value)) {
        value = 'autostringify-' + JSON.stringify(value)
      }
    }
    return sessionStorage.setItem(key, value)
  },

  /**
   * 获取当前系统时间 年月日 时分秒
   * @param {number} value 0 年月日 1 时分秒 默认 年月日 + 时分秒
   */
  getFormDate: (value) => {
    let date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    switch (value) {
      case 0:
        return year + '-' + month + '-' + day
      case 1:
        return hour + ':' + minute + ':' + second
      default:
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    }
  }
}
