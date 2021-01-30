## 原理使用给多个页面设置document.domain
这几个页面的域名必须是一级域名和二级域名的关系

## 实例
a页面要通过iframe访问b页面给自己属性window设置的b白能量

1. a页面
<h1>域名 一级域名 二级域名</h1>
<h1>www.baidu.com</h1>
<h1>video.baidu.com</h1>
<iframe
    src="http://b.zl.cn:3000/b.html"
    frameborder="0"
    onload="load()"
    id="iframe"
></iframe>
<script>
    document.domain = "zl.cn";
    function load() {
        let frame = document.getElementById("iframe");
        console.log(frame.contentWindow.b);
    }
</script>

2. b页面
b页面
<script>
    document.domain = "zl.cn";
    var b = 100;
</script>

[domain用的挺多的因为有很多的域名]