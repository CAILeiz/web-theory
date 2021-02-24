import {
    wxToast,
    wxReLaunch
  } from './wxSdkUtils'
  const app = getApp()
  
  function httpGet(url, data) {
    console.log("url", url);
    console.log("data", data);
    return new Promise((resolve, reject) => {
      let tokenId = wx.getStorageSync('tokenId')
      console.log("tokenId", tokenId);
      wx.request({
        header: {
          'Content-Type': 'application/json',
          'token': tokenId,
          "TerminalModule": "SHIPPING_APPLET"
        },
        url,
        method: 'GET',
        // 需要手动调用JSON.stringify将数据进行序列化
        data,
        dataType: 'json',
        success: function (res) {
          res = res.data;
          if (res.returnCode == '200') {
            if (res && res.success) {
              resolve(res.result)
            } else {
              resolve(res)
            }
          } else if (res.errorCode == '#401') {
            // 登录失效时 重新跳转到登录页
            wxToast({
              content: '会话过期, 免登重连!'
            }).then(() => {
              wxReLaunch(`../token/index`)
            })
          } else {
            reject(res)
          }
        },
        fail: function (res) {
          res = res.data
          if (res && res.errorCode == '#401') {
            // 登录失效时 重新跳转到登录页
            wxToast({
              content: '会话过期, 免登重连!'
            }).then(() => {
              wxReLaunch(`../token/index`)
            })
          } else {
            reject(res)
          }
        },
        complete: function (res) {}
      })
    })
  }
  
  // showLoading: 默认不加载loading 传值: 1 加载头部 2 加载mask loading
  function httpPost(url, data, showLoading) {
    if (showLoading == 1) {
      wx.showNavigationBarLoading()
    }
    if (showLoading == 2) {
      wx.showLoading({
        title: '加载中',
        mask: true
      });
    }
    console.log("url", url);
    console.log("data", data);
    return new Promise((resolve, reject) => {
      let tokenId = wx.getStorageSync('tokenId')
      console.log("tokenId", tokenId);
      // console.log(url, data);
      wx.request({
        header: {
          'content-Type': 'application/json',
          "token": tokenId,
          "TerminalModule": "SHIPPING_APPLET"
        },
        url,
        method: 'POST',
        // 需要手动调用JSON.stringify将数据进行序列化
        data: JSON.stringify(data || {}),
        dataType: 'json',
        success: function (res) {
          console.log("post", res);
          res = res.data;
          if (res.returnCode == '200') {
            if (res && res.success) {
              console.log(res);
              resolve(res.result)
            } else {
              if (res.errorCode == '#401') {
                wxToast({
                  title: res.errorMsg,
                  icon: "none"
                })
                wx.removeStorage({
                  key: 'tokenId',
                  success() {
                    wxReLaunch(`../token/index`)
  
                  }
                })
              } else {
                wxToast({
                  title: res.errorMsg,
                  icon: "none"
                })
              }
              reject(res)
            }
          } else if (res.errorCode == '#401') {
            // 登录失效时 重新跳转到登录页
            wxToast({
              content: '会话过期, 免登重连!'
            }).then(() => {
              wxReLaunch(`../token/index`)
            })
          } else {
            wxToast({
              title: res.errorMsg,
              icon: "none"
            })
            reject(res)
          }
        },
        fail: function (res) {
          res = res.data
          if (res && res.errorCode == '#401') {
            // 登录失效时 重新跳转到登录页
            wxToast({
              content: '会话过期, 免登重连!'
            }).then(() => {
              wxReLaunch(`../token/index`)
            })
          } else {
            reject(res)
          }
        },
        complete: function (res) {
          wx.stopPullDownRefresh();
          wx.hideLoading();            
          wx.hideNavigationBarLoading()
        }
      })
    })
  }
  
  export default {
    get: httpGet,
    post: httpPost
  }