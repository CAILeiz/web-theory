## 使用的是iframe.contentWindow.postMessage进行跨域

## 目的 4000端口b页面获取3000端口a页面的信息
1. a页面中
<iframe src="http://localhost:4000/b.html" frameborder="1" id="frame" onload="load()"></iframe>
<script>
    function load() {
        let frame = document.getElementById("frame");
        // 给b页面的contentWindow使用postMessage发送消息
        frame.contentWindow.postMessage("我是a页面", "http://localhost:4000");
    }
    window.onmessage = function(e) {
        // 接收b页面的信息
        console.log(e.data);
    }
</script>

2. 在b页面自己的window上注册onmessage方法监听传值
<script>
    // 给b页面注册onmessage事件接收a页面的消息
    window.onmessage = function(e) {
        console.log(e.data);
        e.source.postMessage("我是b页面", e.origin)
    }
</script>

## winodw.onmessage 里面的值的e值为
bubbles: false
cancelBubble: false
cancelable: false
composed: false
currentTarget: Window {window: Window, self: Window, document: document, name: "", location: Location, …}
[data:"我是a页面"]
defaultPrevented: false
eventPhase: 0
isTrusted: true
lastEventId: ""
[origin:"http://localhost:3000"]
path: [Window]
ports: []
returnValue: true
source: Window {0: Window, window: Window, self: Window, location: Location, closed: false, frames: Window, …}
srcElement: Window {window: Window, self: Window, document: document, name: "", location: Location, …}
target: Window {window: Window, self: Window, document: document, name: "", location: Location, …}
timeStamp: 41.32500000014261
type: "message"
userActivation: null