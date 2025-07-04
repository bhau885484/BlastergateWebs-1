var express = require('express');
var router = express.Router();
const dbObjProxy = require('../services/query')
var md5 = require('md5');
// router.use(async function(req, res, next){
//     console.log("inside the auth middleware");
//     const resp = await dbObjProxy.authUser(req.body.id, req.body.cookie).then(resp => {return resp});
//     console.log("Resp in auth middleware: ", resp);
//     if(resp.length == 0)
//         res.json({"result":"fail.auth", "data":[], "msg":"Authorization failed."})
//     // res.username = resp[0].username;
//     else next();
// })

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('User route');
});

router.all('/allusers', async function(req, res, next) {
	// console.log("req.body: ", req.body);
	const user = req.body.username;
	const resp = await dbObjProxy.getConnectedUsers(user);
	// console.log("resp in alluser: ", resp)
	let temp_user_list = [];
	if(!resp){
		res.json({
			result:"failed", 
			msg:"user not found. Please try again.", 
			data:[]
		});
	}else if(resp.length == 0){
		res.json({
			result:"success", 
			msg:"no connected user", 
			data:[]
		});
	}else{
		let user_roomids = {};

		 // console.log("resp in getUsersInfo: ", resp)
		resp.forEach(element => {
			// console.log('element.from_user',element.from_user);
			// console.log('user',user);
			if(element.from_user != user){
				temp_user_list.push(element.from_user)
				user_roomids[element.from_user] = element.room_id;
			}
			else{
				temp_user_list.push(element.to_user)
				user_roomids[element.to_user] = element.room_id;
			}

			// const resp1 = await dbObjProxy.getUsersInfo(temp_user_list);
		});
		// console.log('temp_user_list',temp_user_list);
		const resp1 = await dbObjProxy.getUsersInfo(temp_user_list,user);

	
		// console.log("resp in getUsersInfo: ", resp)
		res.json({
			result:"success", 
			msg:"Successfully got all users.", 
			data: resp1,
			room_ids: user_roomids
		})
	}
	
})

router.all('/login', async function(req, res, next) {
	const email = req.body.email, userpswd = md5(req.body.userpswd);
	// console.log("Fired SQL");
	await dbObjProxy.checkUser(email, userpswd).then(resp => {
		// console.log("Resp: ", resp.length);
		if (resp && resp.length == 1) {
			res.json({
				result:"success", 
				msg:"Successfully loged in.", 
				data:[{id:resp[0].id, username:resp[0].username, email:email}]
			})
			// console.log(res);
		}else{
			res.json({
				result:"failed", 
				msg:"user not found. Please try again.", 
				data:[]
			})
		}
	});
	 // res.send('Requested for login');
	
});

router.all('/logout', async (req, res, next) => {
	const id = req.body.id, cookie = req.body.cookie;
	let resp = await dbObjProxy.authUser(id, cookie).then(resp => {
		return resp;
	})
	// console.log("Resp in logout: ", resp);
	if(resp && resp.length){
		resp.json({result:"success", data:[], msg:"User logged out successfully."})
	}else{
		resp.json({"result":"fail.auth", "data":[], "msg":"Authorization failed."})
	}
});

module.exports = router;
