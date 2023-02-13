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
      'Authorization': 'token ' + getToken()
    },
    params: parameters
  }
  let urls = process.env.VUE_APP_URL + url
  return new Promise((resolve, reject) => {
    that.$axios.get(urls, config).then(
      (response) => {
        // if (response.data.code === 0) {
        //   reject(response.data)
        // } else {
        resolve(checkStatus(response))
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
        // if (response.data.code === 0) {
        //   reject(response.data)
        // } else {
        resolve(checkStatus(response))
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
        // if (response.data.code === 0) {
        //   reject(response.data)
        // } else {
        resolve(checkStatus(response))
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
