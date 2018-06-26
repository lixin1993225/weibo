const crypto = require("crypto");
module.exports = {
	md5_suffix:"ahjsdgh%$#啊啊三大1238.。",
	md5:function(str){
		var obj = crypto.createHash("md5").update(str);
		var val = obj.digest("hex");
		return val;
	}
}