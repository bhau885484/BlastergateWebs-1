const dbObjProxy = require('../services/query')

async function getRoomID(user1, user2) {
    let resp = await dbObjProxy.getRoomId(user1, user2).then(resp => {
		return resp;
	})
	console.log("Resp in logout: ", resp);
	if(resp && resp.length){
		return resp[0].room_id;
	}
    return null;
}

async function addMessage(from_user, to_user, text,image) {
    let resp = await dbObjProxy.addMessage(from_user, to_user, text, image).then(resp => {
		return resp;
	})
	console.log("Resp in logout: ", resp);
	if(resp){
		return true;
	}
    return false;
}

async function userOffline(userid) {
	console.log('logout user id',userid);
    let resp = await dbObjProxy.offlineUser(userid).then(resp => {
		return resp;
	})
	// console.log("user offline: ", resp);
	if(resp){
		return true;
	}
    return false;
}
async function userOnline(newuserid) {
	console.log('login user id',newuserid);
    let resp = await dbObjProxy.onlineUser(newuserid).then(resp => {
		return resp;
	})
	// console.log("user online one:", resp);
	if(resp){
		return true;
	}
    return false;
}

module.exports = {
    getRoomID, addMessage,userOffline,userOnline
}