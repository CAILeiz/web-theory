let express = require("express");
let app = express();
let whiteList = ["http://localhost:3000"]
app.use(function(req, res, next) {
    let origin = req.headers.origin;
    if(whiteList.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    } 
    next()
})
app.get("/getData", function(req, res) {
    console.log(req.headers);
    res.send("我爱你");
})
app.listen(4000);