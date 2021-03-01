## 使用的是iframe.contentWindow.name进行跨域 因为window.name在ifame改变src的过程中不会消失

## 目的 a页面获取c页面的信息 但是a和c是不同域
a和b是同域的 http://localhost:3000
c是独立的 http://localhost:4000
a要获取c的数据
a先引用c c先把值放到window.name上 立马把a引用的地址改到b

1. a页面
<iframe src="http://localhost:4000/c.html" frameborder="0" id="iframe" onload="load()"></iframe>
    <script> 
        let first = true;
        function load() {
            if(first) {
                let iframe = document.getElementById("iframe");
                iframe.src = "http://localhost:3000/b.html";
                first = false;
            } else {
                console.log(iframe.contentWindow.name);
            }
        }
</script>

2. c页面
我是c页面
<script>
    window.name = 'ccc';
</script>