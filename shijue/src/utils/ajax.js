import { removeLocalItem } from './comUtils'
function httpGet(url, data) {
  return new Promise((resolve, reject) => {
    var xhr = window.XMLHttpRequest
      ? new window.XMLHttpRequest()
      : new window.ActiveXObject('Microsoft.XMLHttpRequest')
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var res = window.JSON.parse(xhr.responseText)
        if (res && res.code === '0') {
          resolve(res.data)
        }
        // 登录失效时 重新跳转到登录页
        if (
          +res.code === 1 &&
          res.message &&
          res.message.indexOf('尚未登录或登录信息已过期') > -1
        ) {
          window.location.hash = '#/'
        }
        reject(res)
      }
    }
    var postData = []
    window.Object.keys(data || {}).forEach(function(key) {
      postData.push(key + '=' + data[key])
    })
    url =
      !postData || postData === '' || postData.length === 0
        ? url
        : url + '?' + postData.join('&')
    xhr.open('GET', url, true)
    xhr.withCredentials = true // 允许跨域携带cookies
    xhr.crossDomain = true
    xhr.mode = 'cors'
    xhr.credentials = 'include'
    xhr.send(null)
  })
}

function httpPost(url, data) {
  return new Promise((resolve, reject) => {
    var xhr = window.XMLHttpRequest
      ? new window.XMLHttpRequest()
      : new window.ActiveXObject('Microsoft.XMLHttpRequest')
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var res = window.JSON.parse(xhr.responseText)
        if (res && res.code === '0') {
          resolve(res.data)
        }
        reject(new Error(res.message))
      } else if (xhr.readyState === 4 && xhr.status === 401) {
        var err = window.JSON.parse(xhr.responseText)
        if (err.errorCode === 'ME01010660001') {
          removeLocalItem('token')
          reject(err)
        }
      }
    }

    xhr.open('POST', url, true)
    xhr.withCredentials = true // 允许跨域携带cookies
    xhr.crossDomain = true
    xhr.mode = 'cors'
    xhr.credentials = 'include'
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.setRequestHeader('Accept-Language', 'zh-CN,zh;q=0.9')
    xhr.send(JSON.stringify(data))
  })
}

function httpPut(url, data) {
  return new Promise((resolve, reject) => {
    var xhr = window.XMLHttpRequest
      ? new window.XMLHttpRequest()
      : new window.ActiveXObject('Microsoft.XMLHttpRequest')
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var res = window.JSON.parse(xhr.responseText)
        if (res && res.code === '0') {
          resolve(res.data)
        }
        // 登录失效时 重新跳转到登录页
        if (
          +res.code === 1 &&
          res.message &&
          res.message.indexOf('尚未登录或登录信息已过期') > -1
        ) {
          window.location.hash = '#/'
        }
        reject(res)
      }
    }

    xhr.open('PUT', url, true)
    xhr.withCredentials = true // 允许跨域携带cookies
    xhr.crossDomain = true
    xhr.mode = 'cors'
    xhr.credentials = 'include'
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
    xhr.send(JSON.stringify(data))
  })
}

function httpDelete(url) {
  return new Promise((resolve, reject) => {
    var xhr = window.XMLHttpRequest
      ? new window.XMLHttpRequest()
      : new window.ActiveXObject('Microsoft.XMLHttpRequest')
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var res = window.JSON.parse(xhr.responseText)
        if (res && res.code === '0') {
          resolve(res.data)
        }
        // 登录失效时 重新跳转到登录页
        if (
          +res.code === 1 &&
          res.message &&
          res.message.indexOf('尚未登录或登录信息已过期') > -1
        ) {
          window.location.hash = '#/'
        }
        reject(res)
      }
    }

    xhr.open('DELETE', url, true)
    xhr.withCredentials = true // 允许跨域携带cookies
    xhr.crossDomain = true
    xhr.mode = 'cors'
    xhr.credentials = 'include'
    xhr.send(null)
  })
}
function uploadImage(url, data) {
  return new Promise((resolve, reject) => {
    var xhr = window.XMLHttpRequest
      ? new window.XMLHttpRequest()
      : new window.ActiveXObject('Microsoft.XMLHttpRequest')
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var res = window.JSON.parse(xhr.responseText)
        if (res && res.code === '0') {
          resolve(res.data)
        }
        reject(res)
      }
    }
    xhr.open('POST', url, true)
    xhr.withCredentials = true // 允许跨域携带cookies
    xhr.crossDomain = true
    xhr.mode = 'cors'
    xhr.credentials = 'include'
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data')
    xhr.send(data)
  })
}

function httpPostQuery(url, data) {
  return new Promise((resolve, reject) => {
    var xhr = window.XMLHttpRequest
      ? new window.XMLHttpRequest()
      : new window.ActiveXObject('Microsoft.XMLHttpRequest')
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var res = window.JSON.parse(xhr.responseText)
        if (res && res.code === '0') {
          resolve(res.data || {})
        }
        reject(res)
      }
    }
    var postData = []
    window.Object.keys(data || {}).forEach(function(key) {
      postData.push(key + '=' + data[key])
    })
    xhr.open('POST', url, true)
    xhr.withCredentials = true // 允许跨域携带cookies
    xhr.crossDomain = true
    xhr.mode = 'cors'
    xhr.credentials = 'include'
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(postData.join('&'))
    // xhr.send(JSON.stringify(data))
  })
}

export { httpGet, httpPost, httpPut, httpDelete, uploadImage, httpPostQuery }
