/**
 * @date 2019.11.27
 * @author 关宁
 * @describe 封装 axios 异步请求
 */

import * as session from 'js/common'

const getToken = () => {
  let currentUser = session.default.session('currentUser')
  return currentUser ? currentUser.token : ''
}

// 返回相应状态码
const checkStatus = (response) => {
  switch (response.status) {
    case 200:
      return response.data
    case 400:
      return {
        status: -400,
        code: -1,
        msg: '错误请求'
      }
    case 401:
      return {
        status: -401,
        code: -1,
        msg: '身份验证未授权'
      }
    case 403:
      return {
        status: -403,
        code: -1,
        msg: '服务器拒绝请求'
      }
    case 404:
      return {
        status: -404,
        code: -1,
        msg: '请求资源不存在'
      }
    case 408:
      return {
        status: -408,
        code: -1,
        msg: '服务器请求时发生超时'
      }
    case 500:
      return {
        status: -500,
        code: -1,
        msg: '服务器异常'
      }
    case 502:
      return {
        status: -502,
        code: -1,
        msg: '服务器无响应'
      }
    default:
      return {
        status: -1,
        code: -1,
        msg: '服务器遇到不可预知的情况'
      }
  }
}

/**
 * 登录请求 无 token
 * @param {*} that Vue 对象
 * @param {*} url  请求 url
 * @param {*} parameters 请求参数
 */

export const signGET = (that, url, parameters) => {
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params: parameters
  }
  let urls = process.env.VUE_APP_URL + url
  console.log(urls)
  return new Promise((resolve, reject) => {
    that.$axios.get(urls, config).then(
      (response) => {
        if (response.data.code === 0) {
          reject(response.data)
        } else {
          resolve(checkStatus(response))
        }
      }
    ).catch(
      (err) => {
        reject(checkStatus(err.response))
      }
    )
  })
}

/**
 * GET 请求
 * @param {*} that Vue 对象
 * @param {*} url  请求 url
 * @param {*} parameters 请求参数
 */

export const dataGet = (that, url, parameters) => {
  let config = {
    headers: {
      // 'Content-Type': 'application/json;charset=utf-8',
      'Authorization': 'token ' + getToken()
    },
    params: parameters
  }
  let urls = process.env.VUE_APP_URL + url
  return new Promise((resolve, reject) => {
    that.$axios.get(urls, config).then(
      (response) => {
        resolve(checkStatus(response))
        // if (response.data.code === 0) {
        //   reject(response.data)
        // } else {
        //   resolve(checkStatus(response))
        // }
      }
    ).catch(
      (err) => {
        reject(checkStatus(err.response))
      }
    )
  })
}

/**
 * POST 请求
 * @param {*} that Vue 对象
 * @param {*} url  请求 url
 * @param {*} parameters 请求参数
 */

export const dataPost = (that, url, parameters) => {
  return new Promise((resolve, reject) => {
    that.$axios({
      method: 'post',
      url: process.env.VUE_APP_URL + url,
      data: parameters,
      headers: {
        'Authorization': 'token ' + getToken()
      }
    }).then(
      (response) => {
        resolve(checkStatus(response))
        // if (response.data.code === 0) {
        //   reject(response.data)
        // } else {
        //   resolve(checkStatus(response))
        // }
      }
    ).catch(
      (err) => {
        reject(checkStatus(err.response))
      }
    )
  })
}

/**
 * PUT 请求
 * @param {*} that Vue 对象
 * @param {*} url  请求 url
 * @param {*} parameters 请求参数
 */

export const dataPut = (that, url, parameters) => {
  return new Promise((resolve, reject) => {
    that.$axios({
      method: 'put',
      url: process.env.VUE_APP_URL + url,
      data: parameters,
      headers: {
        'Authorization': 'token ' + getToken()
      }
    }).then(
      (response) => {
        resolve(checkStatus(response))
        // if (response.data.code === 0) {
        //   reject(response.data)
        // } else {
        //   resolve(checkStatus(response))
        // }
      }
    ).catch(
      (err) => {
        reject(checkStatus(err.response))
      }
    )
  })
}

/**
 * DELETE 请求
 * @param {*} that Vue 对象
 * @param {*} url  请求 url
 * @param {*} parameters 请求参数
 */

export const dataDelete = (that, url, parameters) => {
  return new Promise((resolve, reject) => {
    that.$axios({
      method: 'delete',
      url: process.env.VUE_APP_URL + url,
      data: parameters,
      headers: {
        'Authorization': 'token ' + getToken()
      }
    }).then(
      (response) => {
        resolve(checkStatus(response))
        // if (response.data.code === 0) {
        //   reject(response.data)
        // } else {
        //   resolve(checkStatus(response))
        // }
      }
    ).catch(
      (err) => {
        reject(checkStatus(err.response))
      }
    )
  })
}

/**
 * 表单下载文件请求（带token）
 * @param {*} that Vue 对象
 * @param {*} url  请求 url
 * @param {*} parameters 请求参数
 * @param {string} file 下载文件名称
 */

export const downloadFile = (that, url, parameters, file) => {
  return new Promise((resolve, reject) => {
    that.$axios({
      method: 'post',
      url: process.env.VUE_APP_URL + url,
      data: parameters,
      responseType: 'blob',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'token ' + getToken()
      }
    }).then(
      (response) => {
        let result = window.URL.createObjectURL(new Blob([response]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = result
        link.setAttribute('download', file)

        document.body.appendChild(link)
        link.click()
      }
    ).catch(
      (err) => {
        reject(checkStatus(err.response))
      }
    )
  })
}

export const downloadFile1 = function (file, that, url, parameters, result, error) {
  let config = {
    headers: {
      // 'Content-Type': 'multipart/form-data',
      'Authorization': 'token ' + getToken()
    },
    responseType: 'blob'
  }
  axiosFormWithConfig(config, that, url, parameters, function (data, res) {
    console.log(data)
    if (!data.data) {
      result()
      return
    }
    if (data.data.type === 'application/json') {
      var reader = new FileReader()
      reader.onloadend = function () {
        let res = JSON.parse(reader.result)
        if (res && res.msg) {
          that.$message.warning(res.msg)
        }
        result()
      }
      reader.readAsText(data.data)
      return
    }
    let url = window.URL.createObjectURL(new Blob([data.data], { type: 'application/vnd.ms-excel' }))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', file)
    document.body.appendChild(link)
    link.click()
    result(data)
  }, error)
}
function axiosFormWithConfig(config, that, url, parameters, result, error) {
  error = errorProcess(that, error)
  that.$axios.post(process.env.VUE_APP_URL + url, parameters, config).then(function (response) {
    responseProcess(that, response, result)
  }).catch(error)
}
function errorProcess(that, error) {
  if (!error) {
    error = function (_err) {
      console.log(_err)
      let msg = (_err.response && _err.response.data.message) ? _err.response.data.message : _err.message
      if (_err.response && _err.response.msg) msg = _err.response.msg
      that.$message.error('error:' + msg)
    }
  }
  return error
}
function responseProcess(that, response, result) {
  if (response && response.data && response.data.code === 0) {
    that.$message.error(response.data.msg)
  }
  result(response)
}
