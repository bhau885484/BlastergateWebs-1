

var dbObj = require('./db')

// example
async function getConnectedUsers(user){

   
    // const resp = await dbObj.query(`select * from tbl_chat_rooms where (from_user = '${user}') or (to_user = '${user}') ORDER BY message_date_time desc`);
    try{
        const resp = await dbObj.query(`select * from tbl_chat_rooms where (from_user = '${user}') or (to_user = '${user}')`);


        return JSON.parse(JSON.stringify(resp));
    } catch (error) {
        console.log("## ERROR in getAllUser");
        return null;
    }
}

async function getUsersInfo(userList,user2){
    try{

        const resps = await dbObj.query(`SELECT * from tbl_users where tbl_users.id in (${userList})`);
         const resps_new  =JSON.parse(JSON.stringify(resps));
         const result = [];
         for (const resp of resps_new) {

             const resps_image = await dbObj.query(`SELECT * from tbl_profile_image where tbl_profile_image.user_id = (${resp.id}) and set_profile = 1`);
             const resps_new_image  =JSON.parse(JSON.stringify(resps_image));
             if(resps_new_image.length > 0 ){
                 $profile_image = resps_new_image[0]['image'];
             }else{
                 $profile_image = resp.image_type;
             }



             const resps_chat_room_user = await dbObj.query(`SELECT * from tbl_chat_rooms where tbl_chat_rooms.to_user = (${resp.id})`);

             const resps_new_chat_room_user  =JSON.parse(JSON.stringify(resps_chat_room_user));
             // if(resps_new_image.length > 0 ){
             //     $profile_image = resps_new_image[0]['image'];
             // }else{
             //     $profile_image = resp.image_type;
             // }


            const resps_last_msg = await dbObj.query(`SELECT * from tbl_chat_messages where (from_user = ${resp.id} and to_user = ${user2}) or (from_user = ${user2} and to_user = ${resp.id}) ORDER BY id DESC LIMIT 1`);

             const resps_new_last_msg  =JSON.parse(JSON.stringify(resps_last_msg));
             if(resps_new_last_msg.length > 0 ){

                 if(resps_new_last_msg[0]['text'] == 'undefined'){
                      $last_msg = 'Photo';
                 }else{
                    $last_msg = resps_new_last_msg[0]['text'];  
                 }
                
                 $message_date_time = resps_new_last_msg[0]['message_date_time'];
             }else{
                 $last_msg = 'Hey there! I am using blastergate';
                 $message_date_time = resps_new_chat_room_user[0]['message_date_time'];
             }



             const resps_chat_block = await dbObj.query(`SELECT * from tbl_chat_block_user where (sendor_id = ${user2} and recieved_id = ${resp.id}) and status = 1`);

             const resps_new_resps_chat_block  =JSON.parse(JSON.stringify(resps_chat_block));
             if(resps_new_resps_chat_block.length > 0 ){

                 $block_user = '1';
             }else{
                 $block_user = '0';
             }

             

             result.push({
                id: resp.id,
                username: resp.username,
                email: resp.email,
                last_login: resp.last_login,
                profile_image:$profile_image,
                last_message:$last_msg,
                message_date_time:$message_date_time,
                block_user:$block_user

                // images: images.map(img => img.image_url) // Extract image URLs into an array
            });
        }

      

 console.log('result',result);
        // const resp = await dbObj.query(`SELECT tbl_users.id, tbl_users.email,tbl_users.username,tbl_users.gender_profile_type,tbl_users.image_type,tbl_users.last_login,tbl_users.status, MAX(tbl_profile_image.image) AS image FROM tbl_users LEFT JOIN tbl_profile_image ON tbl_users.id = tbl_profile_image.user_id  where tbl_users.id in (${userList}) GROUP BY tbl_profile_image.user_id`);
        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.log("## ERROR in getUsersInfo");
        return null;
    }
}


 

async function getUsersImageInfo(userid){
    try{
        
        const resp = await dbObj.query(`select * from tbl_profile_image where user_id  = ${userid}`);
        return JSON.parse(JSON.stringify(resp));
    } catch (error) {
        console.log("## ERROR in ");
        return null;
    }
}

async function checkUser(email, pswd) {
    try {
        const resp = await dbObj.query(`select * from tbl_users where (email = '${email}' and password = '${pswd}')`);
        return JSON.parse(JSON.stringify(resp));
    } catch (error) {
        console.log("## ERROR in checkUser");
        return null;
    }
}

async function authUser(id, cookie) {
    try {
        const resp = await dbObj.query(`select username from tbl_users where id = ${id}`);
        return JSON.parse(JSON.stringify(resp));
    } catch (error) {
        console.log("## ERROR in authUser");
        return null;
    }
}

async function getRoomId(user1, user2) {
    try {
        const resp = await dbObj.query(`select id,room_id from rooms where (user1 = ${user1} and user2 = ${user2}) or (user1 = ${user2} and user2 = ${user1})`);
        return JSON.parse(JSON.stringify(resp));
    } catch (error) {
        console.log("## ERROR in getRoomId");
        return null;
    }
}

async function getMessages(user1, user2) {
    try {
        const resp = await dbObj.query(`select id,text,image,from_user,to_user,created_at,time_at from tbl_chat_messages where (from_user = ${user1} and to_user = ${user2}) or (from_user = ${user2} and to_user = ${user1})`);
        return JSON.parse(JSON.stringify(resp));
    } catch (error) {
        console.log("## ERROR in getMessages");
        return null;
    }
}

async function addMessage(from_user, to_user, text, image) {
    try {
        const currentDate = new Date().toISOString().split('T')[0];
        const currentTime = new Date();
        currentTime.setHours(currentTime.getHours() + 12); // Add 12 hours to current time
        const formattedTime = currentTime.toLocaleTimeString('en-US', { hour12: true });

         const currentDateTime = new Date().toISOString().replace('T', ' ').substring(0, 19);

        const resp = await dbObj.query(`insert into tbl_chat_messages (from_user,to_user,text,image,created_at,time_at,message_date_time) values (${from_user},'${to_user}','${text}','${image}','${currentDate}','${formattedTime}','${currentDateTime}')`);
        return JSON.parse(JSON.stringify(resp));
    } catch (error) {
        console.log("## ERROR in createTask");
        return null;
    }
}

async function offlineUser(id) {
    try {
        const resp = await dbObj.query(`update tbl_users SET last_login = '0' where id = ${id}`);
        return JSON.parse(JSON.stringify(resp));
    } catch (error) {
        console.log("## ERROR in authUser");
        return null;
    }
}

async function onlineUser(id) {

    try {
       
        const resp = await dbObj.query(`update tbl_users SET last_login = '765456' where id = ${id}`);
        return JSON.parse(JSON.stringify(resp));
    } catch (error) {
        console.log(`update tbl_users SET last_login = '765456' where id = ${id}`);
        return null;
    }
}

module.exports = {
    getConnectedUsers, checkUser, authUser, offlineUser, onlineUser, getRoomId, getMessages, addMessage, getUsersInfo, getUsersImageInfo
}