const express = require("express");
const app = express();

app.get("/say", (req, res) => {
    console.log(req.query);
    let {wd, cb} = req.query;
    console.log(wd, cb);
    res.send(`${cb}("我也一样")`);
})
app.listen(3000)