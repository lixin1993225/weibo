const express = require('express');
const mongoDB = require('../../models/db');
const setting = require('../../models/setting');
const path = require("path");
const fs = require("fs")
module.exports = function(){
	var router = express.Router();
	router.get('/',(req,res)=>{
		res.render("weibo.ejs",{"where":"index",userInf:{
			login:req.session.login?req.session.login:false,
			username:req.session.username?req.session.username:'',
		}});	
	});
	router.post("/upload",(req,res)=>{
		var imgPath = req.files[0]
		var newName = imgPath.path + path.parse(imgPath.originalname).ext;
		fs.rename(imgPath.path,newName,(err,data)=>{
			if(err){
				res.send({status:0,tips:'上传失败'}).end()
			}else{
				mongoDB.changeData('weibo','userInf',{useraccount:req.session.username},{$set:{profile:newName}},(err,data)=>{
					if(err) throw err
					if(data.result.ok){
						res.send(setting.response({
							status:1,
							data:newName,
							msg:"上传成功"
						})).end()
					}else{
						res.send(setting.response({
							status:0,
							data:'./images/meng.jpg',
							msg:"上传失败"
						})).end()
					}
				});
			}
		})
	})
	router.use("/chat",require("./chat")());
	router.use("/sigin",require("./sigin")());
	router.use("/login",require("./login")());
	return router;
}