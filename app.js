const express = require("express");
const fs = require("fs");
const gm = require("gm");
const bodyParser = require("body-parser");
const app = express();
const ejs = require("ejs");
const consolidate = require("consolidate");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const multer = require("multer");
const imgObj = multer({dest:"./images/upload"});
//模版引擎
app.set("views","./views");
app.set("view engine","html");
app.engine("html",consolidate.ejs);
//post请求
app.use(bodyParser.urlencoded({extend:false}))
//session存储
app.use(cookieSession({
	name:"sigin",
	keys:['lizn','lala','haha']
}));
//文件上传
app.use(imgObj.any())
//路由
app.use("/",require("./router/web/index")());

app.use(express.static('./public'));
app.use('/images',express.static('./images'));
app.listen(8088)