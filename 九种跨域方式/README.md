## 同源策略
协议 域名 端口 都相同为同域
http:/b.zl.cn:8080
https://a.zl.cn:8081

## 为什么浏览器不支持跨域
cookie LocalStorage不支持跨域
DOM元素也有同源策略
iframe 
ajax也不支持跨域

## 实现跨域
1. jsonp
实现: 
首先定义函数 js文件返回函数执行 定义的函数使用params接收参数
<script>
    // 百度跨域
    function jQuery1102025253739861439106_1607241151433(data) {
        console.log(data);
    }
</script>
<script src="https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd=1233&req=2&csor=4&pwd=123&cb=jQuery1102025253739861439106_1607241151433"></script>

缺点:
// 封装jsonp 跨域 
// 缺点 只能发送get请求 不支持post put delete
// 不安全 xss攻击 别人返回一个脚本给你 你就完了 之后就不采用
// url有长度限制

2. cors[纯后端提供的后端支持前端即可访问] 最常用******************


3. postMessage 两个页面实现通讯
4. document.domain 二级域名和一级域名在同一个域名下通讯
1. window.name
1. location.hash
1. http-proxy  --webpack配置代理
1. nginx
1. websocket1.
