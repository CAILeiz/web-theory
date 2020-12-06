## 同源策略
协议 域名 端口 都相同为同域
http:/b.zl.cn:8080
https://a.zl.cn:8081

## 为什么浏览器不支持跨域
cookie LocalStorage不支持跨域
DOM元素也有同源策略
iframeajax也不支持跨域

## 实现跨域
- jsonp
- cors
- postMessage
- document.domain
- window.name
- location.hash
- http-proxy  --webpack配置代理
- nginx
- websocket

