const express = require('express');
const mongoDB = require('../../models/db');
<<<<<<< HEAD
const setting = require('../../models/setting');
=======
>>>>>>> 007235a8f260b50c59e982f2f4993051520aa895
const path = require("path");
const fs = require("fs")
module.exports = function(){
	var router = express.Router();
	router.get('/',(req,res)=>{
<<<<<<< HEAD
		res.render("weibo.ejs",{"where":"index",userInf:{
			login:req.session.login?req.session.login:false,
			username:req.session.username?req.session.username:'',
		}});	
=======
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
>>>>>>> 007235a8f260b50c59e982f2f4993051520aa895
	});
	router.post("/upload",(req,res)=>{
		var imgPath = req.files[0]
		var newName = imgPath.path + path.parse(imgPath.originalname).ext;
		fs.rename(imgPath.path,newName,(err,data)=>{
			if(err){
				res.send({status:0,tips:'上传失败'}).end()
			}else{
<<<<<<< HEAD
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
=======
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
>>>>>>> 007235a8f260b50c59e982f2f4993051520aa895
}