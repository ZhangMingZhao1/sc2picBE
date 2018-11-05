const express = require('express');
const router = express.Router();
const se = require("../se.json");
const qiniu =require("qiniu");

router.get('/',function (req, res, next) {

    var accessKey = se.accessKey;
    var secretKey = se.secretKey;
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var config = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z2;
    var bucketManager = new qiniu.rs.BucketManager(mac, config);

    var options = {
        // prefix: 'images/',
    };
    var bucket = "lawlietimg";
    bucketManager.listPrefix(bucket, options, function(err, respBody, respInfo) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (respInfo.statusCode == 200) {
            //如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，
            //指定options里面的marker为这个值
            var nextMarker = respBody.marker;
            var commonPrefixes = respBody.commonPrefixes;
            console.log(nextMarker);
            console.log(commonPrefixes);
            var items = respBody.items;
            items.forEach(function(item) {
                console.log(item.key);
                // console.log(item.putTime);
                // console.log(item.hash);
                // console.log(item.fsize);
                // console.log(item.mimeType);
                // console.log(item.endUser);
                // console.log(item.type);
            });
            //   res.send("成功");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.json(items);
        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
            res.send("失败");
        }
    });

});

module.exports = router;