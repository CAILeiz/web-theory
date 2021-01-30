## nginx 默认端口是80

## 使用
1. http://nginx.org/en/download.html下载
Mainline version
2. 双击
运行nginx.exe
此时会默认在起一个nginx服务
访问localhost即可
3. 在根目录的root的conf文件夹中配置即可
```javascript
// 访问/就去找 index目录下的index.html
location / {
    root   html; 
    index  index.html index.htm;
}
// 如过访问.json文件就去json目录中找
location  ~.*\.json {
    root   json;
    add_header "Access-Control-Allow-Origin" "*"; // 设置允许跨域
}
```