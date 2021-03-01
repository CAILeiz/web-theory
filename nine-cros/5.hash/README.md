## 使用的是iframe.contentWindow.name进行跨域 因为window.name在ifame改变src的过程中不会消失

## 目的 a页面获取c页面的信息 但是a和c是不同域
原理: 路径后面的hash值可以用来通信
目的: a想访问c
a给c传一个hash值 c收到hash值后 c把hash值传递给b b将结果放到a的hash值中

1. a页面
<iframe src="http://localhost:4000/c.html#iloveyou" frameborder="0"></iframe>
<script>
    window.onhashchange = function() {
        console.log(location.hash);
    }
</script>

2. c页面
<script>
    console.log(window.location.hash);
    if(window.location.hash === "iloveyou");
    let iframe = document.createElement("iframe");
    iframe.src = "http://localhost:3000/b.html#idontloveyou";
    document.body.appendChild(iframe);
</script>

3. b页面
<script>
    window.parent.parent.location.hash = window.location.hash;
</script>
