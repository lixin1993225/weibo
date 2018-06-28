const express = require('express');
const mongoDB = require('../../models/db');
const path = require("path");
const fs = require("fs")
module.exports = function(){
	var router = express.Router();
	router.get('/',(req,res)=>{
		if(req.session.login){//已经登录
			mongoDB.find('weibo','userInf',{useraccount:req.session.username},(err,data)=>{
				if(err) throw err;
				var imgFlag = data[0].profile;
				res.render("weibo.ejs",{"where":"index",userInf:{
					login:req.session.login?req.session.login:false,
					username:req.session.username?req.session.username:'',
					headImg:imgFlag?imgFlag:'./images/meng.jpg'
				}});			
			});			
		}else{//暂未登录
			res.render("weibo.ejs",{"where":"index",userInf:{
				login:req.session.login?req.session.login:false,
				username:req.session.username?req.session.username:'',
				headImg:'./images/meng.jpg'
			}});	
		}
	});
	router.post("/upload",(req,res)=>{
		var imgPath = req.files[0]
		var newName = imgPath.path + path.parse(imgPath.originalname).ext;
		fs.rename(imgPath.path,newName,(err,data)=>{
			if(err){
				res.send({status:0,tips:'上传失败'}).end()
			}else{
				mongoDB.changeData('weibo','userInf',{useraccount:req.session.username},{profile:newName},(err,data)=>{
					console.log(data)
				});
				res.redirect("/");
			}
		})
	})
	router.use("/sigin",require("./sigin")());
	router.use("/login",require("./login")());
	return router
}