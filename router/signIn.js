const express = require('express');
const router = express.Router();
var formidable = require("formidable");
const db = require("../models/db.js");

router.post('/',function(req,res) {
    console.log("doLogin");
    let form = new formidable.IncomingForm();
    let username,password;
    form.parse(req, function (err, fields, files) {
        //得到表单之后做的事情
        username = fields.username;
        password = fields.password;
        console.log(fields);
        //现在可以证明，用户名没有被占用
        db.find("users", {"username": username}, function (err, result) {
            //注意这个result是个数组
            if (err) {
                res.send("-5");
                return;
            }
            //没有这个人
            console.log(result.length);
            if (result.length == 0) {
                res.send("-1");
                return;
            }
            //有的话，进一步看看这个人的密码是否匹配
            req.session.username = username;
            req.session.login = "1";
            // req.session.save();
            console.log(req.session);
            console.log('1',req.session.id);
            console.log(1,req.sessionID)
            // console.log(req.session);
            if (password == result[0].password) {
                res.json({
                    username:username,
                    status:1
                }); //登陆成功
                return;
            } else {
                res.send("-2"); //密码错误
                return;
            }
        })
    });
});

module.exports = router;