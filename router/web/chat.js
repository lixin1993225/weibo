const express = require("express");
const http = require("http");
const server = http.createServer(express())
const io = require("socket.io");
module.exports = function(){
	var router = express.Router();
	router.get("/",(req,res)=>{
		res.render("chat.ejs",{"where":"chat",userInf:{
			login:req.session.login?req.session.login:false,
			username:req.session.username?req.session.username:'',
		}})
	});
	let wsServer = io.listen(server);
	wsServer.on("connection",(sock)=>{
		sock.on("textInn",(innner)=>{
			console.log(innner)
		})
	});
	server.listen(8089)
	return router;
}