const express = require('express');

module.exports = function(){
	var router = express.Router();
	router.get('/',(req,res)=>{
		res.render("weibo.ejs",{"where":"index",userInf:{
			login:req.session.login?req.session.login:false,
			username:req.session.username?req.session.username:'',
		}})
	});
	router.use("/sigin",require("./sigin")());
	router.use("/login",require("./login")());
	return router
}