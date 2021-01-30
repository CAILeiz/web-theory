##  使用WebSocket进行通讯 WebSocket不存在跨域 但是他是高级API有兼容性问题
前言
WebSocket 没有跨域问题
WebSocket 使用的是tcp进行传输
WebSocket 协议是ws协议
WebSocket和Http的关系是 WebSocket是双向的 http是单向的 内容都是靠tcp进行传输的

## 实例
1. socket.html
<h1>WebSocket是高级API有兼容性问题 一般使用socket.io</h1>
<script>
    let socket = new WebSocket("ws://localhost:3000");
    socket.onopen = function() {
        socket.send("我爱你");
    }
    socket.onmessage = function(e) {
        console.log(e.data);
    }
</script>

2.  serve.js
使用的是ws模块 connection方法进行连接 使用ws进行监听消息传入事件 使用ws.send给客户端或者是页面传递消息
```javascript
let WebSocket = require("ws");
let wss = new WebSocket.Server({port: 3000});
wss.on("connection", function(ws) {
    console.log("websocket连接成功");
    ws.on("message", function(data) {
        console.log(data);
        ws.send("我不爱你");
    })
})
```