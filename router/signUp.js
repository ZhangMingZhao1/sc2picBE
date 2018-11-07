const express = require('express');
const router = express.Router();
var formidable = require("formidable");
const db = require("../models/db.js");


router.post('/',function(req,res) {
    console.log("doRegister");
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        //得到表单之后做的事情
        let username = fields.username;
        let password = fields.password;
        console.log(fields);
        //现在可以证明，用户名没有被占用
        db.insertOne("users", {
            "username": username,
            "password": password,
            "registerDate": new Date()
        }, function (err, result) {

            // console.log(result);
            if (err) {
                res.send("500"); //服务器错误
                console.log("插入错误");
                return;
            }
            // console.log(result);
            res.send("200");
        })
    })
});

module.exports = router;