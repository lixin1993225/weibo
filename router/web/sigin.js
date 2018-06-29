const express = require("express");
const mongoDb = require("../../models/db");
const resData = require("../../models/setting");
const md5 = require("../../models/md5")
module.exports = function(){
	var router = express.Router();
	router.get("/",(req,res)=>{
		res.render("sigin.ejs",{"where":"sigin",userInf:{
			login:req.session.login?req.session.login:false,
			username:req.session.username?req.session.username:'',
		}});
	});
	router.post("/",(req,res)=>{
		mongoDb.find('weibo','userInf',{useraccount:req.body.useraccount},(err,result)=>{
			if(result.length!=0){
				res.send({
					status:0,
					data:null,
<<<<<<< HEAD
					msg:'已经注册啦胸帝'
=======
					desc:'已经注册啦胸帝'
>>>>>>> 007235a8f260b50c59e982f2f4993051520aa895
				}).end()
			}else{
				mongoDb.insertOne("weibo","userInf",{useraccount:req.body.useraccount,password:md5.md5(req.body.password+md5.md5_suffix)},(err,result)=>{
					if(err){
						resData.response({
							status:2,
							data:null,
<<<<<<< HEAD
							msg:'后台大胸帝的错误'
=======
							desc:'后台大胸帝的错误'
>>>>>>> 007235a8f260b50c59e982f2f4993051520aa895
						})
					}else{
						req.session.login = true;
						req.session.username = req.body.useraccount;
						res.send({
							status:1,
							data:'yes',
<<<<<<< HEAD
							msg:'注册成功'
=======
							desc:'注册成功'
>>>>>>> 007235a8f260b50c59e982f2f4993051520aa895
						}).end();
					}
				})
			}
		});
	});
	return router;
}