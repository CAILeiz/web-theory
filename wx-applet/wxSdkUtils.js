/*
  微信调用API封装
*/
// 获取authcode
export function wxRequestCode() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          resolve(res.code)
        }
      })
    })
  }
  
  export function wxSetBgcColor(backgroundColor) {
    return new Promise((resolve, reject) => {
      wx.setBackgroundColor({
        backgroundColor,
        success() {
          resolve()
        },
        fail() {
          reject()
        }
      })
  
    })
  }
  // 跳转
  export function wxNavigateTo(url) {
    return new Promise((resolve, reject) => {
      wx.navigateTo({
        url,
        success: function (res) {
          resolve(res)
        },
        fail: function (err) {
          reject(err)
        }
      })
    })
  }
  
  // 重定向
  export function wxRedirectTo(url) {
    return new Promise((resolve, reject) => {
      wx.redirectTo({
        url,
        success: function (res) {
          resolve(res)
        },
        fail: function (err) {
          reject(err)
        }
      })
    })
  }
  
  // 回退
  export function wxNavigateBack(delta = 1) {
    wx.navigateBack({
      delta,
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    })
  }
  
  // 重启页面
  export function wxReLaunch(url) {
    return new Promise((resolve, reject) => {
      wx.reLaunch({
        url,
        success: function (res) {
          resolve(res)
        },
        fail: function (err) {
          reject(err)
        }
      })
    })
  }
  
  // 切换 tabBar
  export function wxSwitchTab(url) {
    return new Promise((resolve, reject) => {
      wx.switchTab({
        url,
        success(res) {
          resolve(res)
        },
        fail(e) {
          reject(e)
        }
      })
    })
  }
  
  // confirm 确认框
  export function wxConfirm({
    title = "提示",
    content = "这是一个模态弹窗",
    confirmText = "确定",
    cancelText = "取消",
  } = {}) {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title,
        content,
        confirmText,
        cancelText,
        success(res) {
          if (res.confirm) {
            resolve(res.confirm)
          } else if (res.cancel) {
            resolve(res.cancel)
          }
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  
  // toast提示条
  export function wxToast({
    title,
    icon = 'success',
    duration = 1500
  } = {}) {
    return new Promise((resolve, reject) => {
      wx.showToast({
        title,
        icon,
        duration,
        success() {
          resolve()
        },
        fail(e) {
          reject(e)
        }
      })
    })
  }
  
  // 本地存储
  export function wxSetStorage(key, data, verifyCopId = true) {
    return new Promise((resolve, reject) => {
      wx.setStorage({
        key: `${key}${verifyCopId ? wx.corpId : ''}`,
        data: data,
        success(res) {
          resolve(res)
        },
        fail(e) {
          reject(e)
        }
      })
    })
  }
  
  // 本地存储
  export function wxSetStorageSync(key, data, verifyCopId = true) {
    return new Promise((resolve, reject) => {
      wx.setStorageSync({
        key: `${key}${verifyCopId ? wx.corpId : ''}`,
        data: data
      })
    })
  }
  
  // 获取缓存数据
  export function wxGetStorage(key, verifyCopId = true) {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: `${key}${verifyCopId ? wx.corpId : ''}`,
        success(res) {
          resolve(res)
        },
        fail(e) {
          reject(e)
        }
      })
    })
  }
  
  // 同步获取缓存数据
  export function wxGetStorageSync(key, verifyCopId = true) {
    let _data = wx.getStorageSync({
      key: `${key}${verifyCopId ? wx.corpId : ''}`
    }) || {}
    return _data.data
  }
  
  // 删除缓存数据
  export function wxRemoveStorage(key, verifyCopId = true) {
    return new Promise((resolve, reject) => {
      wx.removeStorage({
        key: `${key}${verifyCopId ? wx.corpId : ''}`,
        success(res) {
          resolve(res)
        },
        fail(e) {
          reject(e)
        }
      })
    })
  }
  export function wxChooseImage(sourceType = ['album', 'camera'], count = 1, sizeType = ['original', 'compressed']) {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count,
        sizeType,
        sourceType,
        success(res) {
          resolve(res);
        },
        fail(e) {
          reject(e)
        }
      })
    })
  }
  export function wxUploadFile({
    url,
    filePath,
    name = 'file',
    formData
  }) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url,
        filePath,
        name,
        formData,
        success(res) {
          let data = res.data
          console.log(res);
          resolve(res);
          resolve(data);
        },
        fail(e) {
          reject(e)
        },
        complete() {
          resolve();
        }
      })
    })
  }
  export function generateRandom(count) {
    var str = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var res = "";
    for (var i = 0; i < count; i++) {
      var id = Math.ceil(Math.random() * 35);
      res += str[id];
    }
    return res;
  }