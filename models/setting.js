module.exports = {
	url:"mongodb://localhost:27017/",
	response:response,
};
<<<<<<< HEAD
function response({status=null,data=null,msg=null}){
	return {
		status:status,
		data:data,
		msg:msg
=======
function response({status=null,data=null,desc=null}){
	return {
		status:status,
		data:data,
		desc:desc
>>>>>>> 007235a8f260b50c59e982f2f4993051520aa895
	}
};