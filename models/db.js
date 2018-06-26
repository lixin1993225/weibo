const mongoClient = require("mongodb").MongoClient;
const url = require("./setting")
function _connectDB(callback){
	mongoClient.connect(url.url,(err,db)=>{
		callback(err,db)
	})
};
//增
function insertOne(ku,collectionName,json,callback){
	_connectDB((err,db)=>{
		if(err) throw err;
		var dbO = db.db(ku);
		dbO.collection(collectionName).insertOne(json,(err2,data)=>{
			if(err2){
				callback(err2,null)
			}else{
				callback(null,data)
			}
			db.close();
		})
	})
};
//查
function find(ku,collectionName,json,callback,args){
	_connectDB((err,db)=>{
		if(err) throw err;
		var dbO = db.db(ku);
		var result = []
		var displayNum = null;
		var pagesNum = null;
		var allDatas =null;
		if(arguments.length!=5){
			displayNum = 0;
			pagesNum = 0;
		}else{
			displayNum = args.displayNum;
			pagesNum = parseInt(args.pagesNum-1)*parserInt(displayNum);
		}
		var data = dbO.collection(collectionName).find(json).limit(displayNum).skip(pagesNum)
		data.each((err,doc)=>{
			if(doc!=null){
				result.push(doc)
			}else{
				callback(null,result)
			}
		});
		db.close();
	})
}
module.exports = {
	insertOne:insertOne,
	find:find
}