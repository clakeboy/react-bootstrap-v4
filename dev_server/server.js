const express = require('express');
const multiparty = require('multiparty');
const app = express();

// 允许跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    // res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials","true");
    if(req.method === "OPTIONS") {
        res.sendStatus(200);/*让options请求快速返回*/
    } else {
        next();
    }
});

//file post
app.post('/upload',(req,res)=>{
    let form = new multiparty.Form();
    form.parse(req,(err,fields,files)=>{
        res.json({
            'status':!err,
            'msg':err?err:files,
        });
    });
});

module.exports = app;