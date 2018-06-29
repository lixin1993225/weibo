const express = require("express");
const mongoDb = require("../../models/db");
const resData = require("../../models/setting");
const md5 = require("../../models/md5");
module.exports = function(){
	var router = express.Router();
	router.get('/',(req,res)=>{
		res.render("login.ejs",{"where":"login",userInf:{
			login:req.session.login?req.session.login:false,
			username:req.session.username?req.session.username:'',
		}});
	});
	router.post('/',(req,res)=>{
		mongoDb.find("weibo","userInf",{useraccount:req.body.useraccount},(err,result)=>{
			if(result.length==0){
				res.send({
					status:0,
					data:null,
					msg:'查无此人'
				}).end()
			}else{
				if(result[0].password==md5.md5(req.body.password+md5.md5_suffix)){
					req.session.login = true;
					req.session.username = result[0].useraccount
					res.send({
						status:1,
						data:'yes',
						msg:'登录成功'
					}).end()
				}else{
					res.send({
						status:2,
						data:'no',
						msg:'用户名密码错误'
					}).end()
				}
			}
		})
	})
	return router;
}
