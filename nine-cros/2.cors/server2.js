let express = require("express");
let app = express();
let whiteList = ["http://127.0.0.1:3000"]
app.use(function(req, res, next) {
    let origin = req.headers.origin;
    console.log(origin);
    if(whiteList.includes(origin)) {
        // 允许哪些ip支持跨域 如果跨域设置 * 就不能设置cookie了
        res.setHeader("Access-Control-Allow-Origin", origin); 
        // 允许前端可以设置哪些属性名称的请求头使用","分隔
        res.setHeader("Access-Control-Allow-Headers", "name, age, sex")
        // 设置可以请求PUT
        res.setHeader("Access-Control-Allow-Methods", "PUT")
        // 前端请求的时候必须使携带cookie 需要设
        res.setHeader("Access-Control-Allow-Credentials", true);
        // 后端设置头返回前端 前端想拿到需要设置
        res.setHeader("Access-Control-Expose-Headers", "name");
        // 设置预检测时间 间隔多少秒再次发起
        res.setHeader("Access-Control-Max-Age", 6000);
        // OPTIONS请求不做任何处理 但是还会预检测 
        if(req.method === "OPTIONS") {
            res.end();
        }
        // 设置预检测时间 间隔多少秒再次发起
        res.setHeader("Access-Control-Max-Age", 6000);
        next()
    } 
})
app.get("/getData", function(req, res) {
    console.log(req.headers);
    res.setHeader("name", "zl");
    res.send("我爱你");
})
app.put("/getData", function(req, res) {
    console.log(req.headers);
    res.setHeader("name", "zl");
    res.send("我爱你");
})
app.listen(4000);