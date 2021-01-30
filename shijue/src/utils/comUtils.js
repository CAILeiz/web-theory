// 判断当前浏览器是PC端还是移动端
// true：移动端   false：PC端
export const isMobile = (() => {
  let sUserAgent = navigator.userAgent.toLowerCase()
  let bIsMobile = /AppleWebKit.*Mobile/i.test(navigator.userAgent)
  let bIsIpad = sUserAgent.match(/ipad/i) !== null
  let bIsIphoneOs = sUserAgent.match(/iphone os/i) !== null
  let bIsMidp = sUserAgent.match(/midp/i) !== null
  let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) !== null
  let bIsUc = sUserAgent.match(/ucbrowser/i) !== null
  let bIsAndroid = sUserAgent.match(/android/i) !== null
  let bIsCE = sUserAgent.match(/windows ce/i) !== null
  let bIsWM = sUserAgent.match(/windows mobile/i) !== null
  if (
    bIsMobile ||
    bIsIpad ||
    bIsIphoneOs ||
    bIsMidp ||
    bIsUc7 ||
    bIsUc ||
    bIsAndroid ||
    bIsCE ||
    bIsWM
  ) {
    return true
  } else {
    return false
  }
})()

/* 缓存操作 */
export const getItem = name => {
  if (window.sessionStorage) {
    let value = window.sessionStorage.getItem(name)
    return window.JSON.parse(value)
  }
  return (window.cache || {})[name]
}

export const setItem = (name, value) => {
  if (window.sessionStorage) {
    return window.sessionStorage.setItem(name, window.JSON.stringify(value))
  }
  ; (window.cache || {})[name] = value
}

export const removeItem = name => {
  if (window.sessionStorage) {
    return window.sessionStorage.removeItem(name)
  }
  ; (window.cache || {})[name] = null
}

/* 缓存操作 */
export const getLocalItem = (name) => {
  if (window.localStorage) {
    let value = window.localStorage.getItem(name)
    return window.JSON.parse(value)
  }
  return (window.cache || {})[name]
}

export const setLocalItem = (name, value) => {
  if (window.localStorage) {
    return window.localStorage.setItem(name, window.JSON.stringify(value))
  }
  (window.cache || {})[name] = value
}

export const removeLocalItem = (name) => {
  if (window.localStorage) {
    return window.localStorage.removeItem(name)
  }
  (window.cache || {})[name] = null
}

// 获取URL search对象
export const getSearchObj = () => {
  let _obj = {}
  let _search = window.location.search || ''

  if (_search) {
    _search = _search
      .substr(1)
      .replace(/&/g, '", "')
      .replace(/=/g, '": "')
    _search = JSON.parse(`{"${_search}"}`)
    _obj = _search
  }
  return _obj
}

export const getSearchValueByKey = (key) => {
  let _value = ''
  let _url = window.decodeURIComponent(window.location.href)
  let _startIndex = _url.search(key)
  if (_startIndex !== -1) {
    _startIndex = _startIndex + key.length + 1
    let _endIndex = _url.indexOf('&', _startIndex)
    if (_endIndex !== -1) {
      _value = _url.slice(_startIndex, _endIndex)
    } else {
      _value = _url.slice(_startIndex)
    }
  }
  return _value
}

export const adaptImg = src => {
  // 图片读取高宽适应外部容器
  let img = new Image()
  let imgMess = {
    width: '',
    height: ''
  }
  img.src = src
  let imgWidth = img.width // 图片实际宽度
  let imgHeight = img.height // 图片实际高度
  console.table({
    imgWidth: imgWidth,
    imgHeight: imgHeight,
    src: src
  })
  if (imgWidth < imgHeight) {
    imgMess.width = 'auto'
    imgMess.height = '100%'
    return imgMess
  } else {
    imgMess.width = '100%'
    imgMess.height = 'auto'
    return imgMess
  }
}

export const scrollCtrlView = ({className = '', minScroll = 0, callback = ''}) => { // className: 监听模块的类名 minScroll: 头部是否有遮挡的基础高度
  if (className === '' || !className) {
    return console.error('类名不能为空')
  }
  let arrClass = document.querySelectorAll('.' + className)
  if (arrClass === '' || !arrClass) {
    return console.error(arrClass + ':未找到对应元素')
  }
  let arrHeightScope = []
  // arrClass.forEach(res => { // 遍历模块元素获取相对顶部的高度存储
  //   // typeof (res.getBoundingClientRect) === 'function' &&  单个模块相对视口的高度（不适用，单个模块比较优）
  //   if (res) {
  //     let obj = res.offsetTop
  //     if (obj) {
  //       arrHeightScope.push(obj)
  //     }
  //   }
  // })
  for (let i = 0; i < arrClass.length; i++) {
    if (arrClass[i]) {
      let obj = arrClass[i].offsetTop
      if (obj) {
        arrHeightScope.push(obj)
      }
    }
  }
  if (arrHeightScope.length > 0) { // 页面刷新执行
    for (let i = 0; i < arrHeightScope.length; i++) {
      let height = scrollTopNum()
      if (height + minScroll < arrHeightScope[i]) {
        if (typeof (callback) === 'function') {
          callback(i)
          break
        }
      }
    }
  }
  window.onscroll = () => {
    if (arrHeightScope.length > 0) {
      for (let i = 0; i < arrHeightScope.length; i++) {
        let height = scrollTopNum()
        if (height + minScroll < arrHeightScope[i]) {
          if (typeof (callback) === 'function') {
            callback(i)
            break
          }
        }
      }
    }
  }
}

export const scrollTopNum = () => { // 检测滚动条获取方法
  let scrollPos

  if (window.pageYOffset) {
    scrollPos = window.pageYOffset
  } else if (document.compatMode && document.compatMode !== 'BackCompat') {
    scrollPos = document.documentElement.scrollTop
  } else if (document.body) {
    scrollPos = document.body.scrollTop
  }
  return scrollPos
}
