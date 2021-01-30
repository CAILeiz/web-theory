let WebSocket = require("ws");
let wss = new WebSocket.Server({port: 3000});
wss.on("connection", function(ws) {
    console.log("websocket连接成功");
    ws.on("message", function(data) {
        console.log(data);
        ws.send("我不爱你");
    })
})