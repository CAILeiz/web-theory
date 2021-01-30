export const loadImage = (file) => {
  return new Promise((resolve, reject) => {
    let orientation
    window.EXIF.getData(file, function () {
      orientation = window.EXIF.getTag(this, 'Orientation')
    })
    var reader = new window.FileReader()
    reader.onload = function (e) {
      getImgData(this.result, orientation, function (data) {
        resolve(data)
      })
    }
    reader.readAsDataURL(file)
  })
}

export const getImgData = (img, dir, next) => {
  var image = new window.Image()
  image.onload = function () {
    var degree = 0
    var drawWidth
    var drawHeight
    var width
    var height
    drawWidth = this.naturalWidth
    drawHeight = this.naturalHeight
    // 以下改变一下图片大小
    var maxSide = Math.max(drawWidth, drawHeight)
    if (maxSide > 1024) {
      var minSide = Math.min(drawWidth, drawHeight)
      minSide = minSide / maxSide * 1024
      maxSide = 1024
      if (drawWidth > drawHeight) {
        drawWidth = maxSide
        drawHeight = minSide
      } else {
        drawWidth = minSide
        drawHeight = maxSide
      }
    }
    var canvas = document.createElement('canvas')
    canvas.width = drawWidth
    width = drawWidth
    canvas.height = drawHeight
    height = drawHeight
    var context = canvas.getContext('2d')
    // 判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式
    switch (dir) {
      // iphone横屏拍摄，此时home键在左侧
      case 3:
        degree = 180
        drawWidth = -width
        drawHeight = -height
        break
      // iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
      case 6:
        canvas.width = height
        canvas.height = width
        degree = 90
        drawWidth = width
        drawHeight = -height
        break
      // iphone竖屏拍摄，此时home键在上方
      case 8:
        canvas.width = height
        canvas.height = width
        degree = 270
        drawWidth = -width
        drawHeight = height
        break
    }
    // 使用canvas旋转校正
    context.rotate(degree * Math.PI / 180)
    context.drawImage(this, 0, 0, drawWidth, drawHeight)
    // 返回校正图片
    // console.log(canvas.toDataURL('image/jpeg', 0.8))
    next(canvas.toDataURL('image/jpeg', 0.8))
  }
  image.src = img
}

export const convertBase64UrlToBlob = (urlData) => {
  // convertBase64UrlToBlob函数是将base64编码转换为Blob
  // 去掉url的头，并转换为byte
  var bytes = window.atob(urlData.split(',')[1])
  // 处理异常,将ascii码小于0的转换为大于0
  var ab = new window.ArrayBuffer(bytes.length)
  var ia = new window.Uint8Array(ab)
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new window.Blob([ab], {type: 'image/png'})
}

export const compress = (image, Orientation, next) => {
  var img = new window.Image()
  img.onload = function () {
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    // 瓦片canvas
    let tCanvas = document.createElement('canvas')
    let tctx = tCanvas.getContext('2d')
    // let initSize = img.src.length
    let width = img.width
    let height = img.height
    alert(`img:${img}`)
    // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    let ratio
    if ((ratio = width * height / 4000000) > 1) {
      console.log('大于400万像素')
      ratio = Math.sqrt(ratio)
      width /= ratio
      height /= ratio
    } else {
      ratio = 1
    }
    canvas.width = width
    canvas.height = height
    alert(9)
    // 铺底色
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 如果图片像素大于100万则使用瓦片绘制
    let count
    alert(`hahah${width}   DDD:${height}`)
    if ((count = width * height / 1000000) > 1) {
      alert('超过100W像素')
      alert(8)
      count = ~~(Math.sqrt(count) + 1) // 计算要分成多少块瓦片
      alert(count)
      // 计算每块瓦片的宽和高
      let nw = ~~(width / count)
      let nh = ~~(height / count)
      tCanvas.width = nw
      tCanvas.height = nh
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
        }
      }
    } else {
      ctx.drawImage(img, 0, 0, width, height)
    }
    alert('asakjskjas' + Orientation)
    // 修复ios上传图片的时候 被旋转的问题
    if (Orientation !== '' && Orientation !== 1) {
      switch (Orientation) {
        case 6: // 需要顺时针（向左）90度旋转
          rotateImg(img, 'left', canvas)
          break
        case 8: // 需要逆时针（向右）90度旋转
          rotateImg(img, 'right', canvas)
          break
        case 3: // 需要180度旋转
          rotateImg(img, 'right', canvas) // 转两次
          rotateImg(img, 'right', canvas)
          break
      }
    }
    // 进行最小压缩
    alert(6)
    let ndata = canvas.toDataURL('image/jpeg', 0.8)
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
    next(ndata)
  }
  img.src = image
}
export const rotateImg = (img, direction, canvas) => {
  alert(7)
  // 最小与最大旋转方向，图片旋转4次后回到原方向
  const minStep = 0
  const maxStep = 3
  if (img == null) return
  // img的高度和宽度不能在img元素隐藏后获取，否则会出错
  let height = img.height
  let width = img.width
  let step = 2
  if (step == null) {
    step = minStep
  }
  if (direction === 'right') {
    step++
    // 旋转到原位置，即超过最大值
    step > maxStep && (step = minStep)
  } else {
    step--
    step < minStep && (step = maxStep)
  }
  // 旋转角度以弧度值为参数
  let degree = step * 90 * Math.PI / 180
  let ctx = canvas.getContext('2d')
  switch (step) {
    case 0:
      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0)
      break
    case 1:
      canvas.width = height
      canvas.height = width
      ctx.rotate(degree)
      ctx.drawImage(img, 0, -height)
      break
    case 2:
      canvas.width = width
      canvas.height = height
      ctx.rotate(degree)
      ctx.drawImage(img, -width, -height)
      break
    case 3:
      canvas.width = height
      canvas.height = width
      ctx.rotate(degree)
      ctx.drawImage(img, -width, 0)
      break
  }
}
