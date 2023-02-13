export default {
  /**
   * 获取用户信息
   * @param {string} key 保存字段
   * @param {*} value 返回值
   */
  session: (key, value) => {
    if (value === void (0)) {
      let lsVal = localStorage.getItem(key)
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
    return localStorage.setItem(key, value)
  },

  /**
   * 获取当前系统时间 年月日 时分秒
   * @param {number} value 0 年月日 1 时分秒 默认 年月日 + 时分秒
   */
  getFormDate: (value) => {
    let date = new Date()
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day

    switch (value) {
      case 0:
        return year + '-' + month + '-' + day
      case 1:
        return hour + ':' + minute + ':' + second
      default:
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    }
  },
  /**
   * 联系电话验证
   */
  isTelephone: (rule, value, callback) => {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    const reg1 = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
    if (!value) {
      callback(new Error('请输入联系电话'))
    } else if (!reg.test(value)) {
      callback(new Error('联系电话格式不正确'))
    } else {
      callback()
    }
  },
  // 手机号验证
  isvalidPhone: (rule, value, callback) => {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    if (!value) {
      callback(new Error('请输入联系电话'))
    } else if (!reg.test(value)) {
      callback(new Error('联系电话格式不正确'))
    } else {
      callback()
    }
  },
  /**
   * 紧急联系人验证
   */
  isvalidlinkPhone: (rule, value, callback) => {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    if (!value) {
      callback(new Error('请输入手机号'))
    } else if (!reg.test(value)) {
      callback(new Error('手机号格式不正确'))
    } else {
      callback()
    }
  },
  isvalidFloat: (rule, value, callback) => {
    const reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$/
    if (!reg.test(value)) {
      callback(new Error('保留两位小数'))
    } else {
      callback()
    }
  },
  /**
   * 验证身份证号码
   */
  idcard: (rule, value, callback) => {
    let re = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
    if (!value) {
      callback(new Error('请输入身份证号'))
    } if (!re.test(value)) {
      callback(new Error('身份证格式不正确'))
    } else {
      callback()
    }
  },
  isPositiveInteger: (rule, value, callback) => {
    if (!value) {
      callback(new Error('请输入菜单序号'))
    } if (typeof (value) !== 'number') {
      callback(new Error('请输入正整数'))
    } if (value <= 0) {
      callback(new Error('请输入正整数'))
    } else {
      callback()
    }
  },
  isUrl: (rule, value, callback) => {
    // let reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+(([A-Za-z0-9-~\/])+$|(\.[hH][tT][mM][lL]){0,1}$)/
    let reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/

    if (!value) {
      callback(new Error('请输入页面路径'))
    } if (!reg.test(value)) {
      callback(new Error('请输入以http://，https://开头的网址'))
    } else {
      callback()
    }
  },
  isvalidlinkPhoneOrTel: (rule, value, callback) => {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    const reg1 = /^[0-9]{7,8}$/
    if (!value) {
      callback(new Error('请输入机构电话'))
    } else if (!reg.test(value) && !reg1.test(value)) {
      callback(new Error('机构电话格式不正确'))
    } else {
      callback()
    }
  }
}
