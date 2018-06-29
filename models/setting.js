module.exports = {
	url:"mongodb://localhost:27017/",
	response:response,
};
function response({status=null,data=null,msg=null}){
	return {
		status:status,
		data:data,
		msg:msg
	}
};