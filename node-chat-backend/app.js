var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var messagesRouter = require('./routes/messages');
var commonService = require('./services/common')

var app = express();
let http = require('http');
let server = http.Server(app);
const port = process.env.PORT || 3000;

let socketIO = require('socket.io');
let io = socketIO(server);


const axios = require('axios');
// const express = require('express');
const knoxTokenLibraryJs = require('knox-token-library-js');
// var cors = require('cors')

// app.use(cors({ origin: "http://localhost:4200" }));

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:4200", // Allow Angular frontend
//     methods: ["GET", "POST"],
//   },
// });



// const users = {};
// io.on('connection', (socket) => {

//     console.log('on connection',socket.id);

//     socket.on('login', function(data){
        
//         users[socket.id] = data.userId;
//         // console.log('login user id' + data.userId + ' connected');
//         if(data.userId){
//             commonService.userOnline(data.userId);
//         }
//      });

//       socket.on('disconnect', function(){
//         // console.log('user ' + users[socket.id] + ' disconnected');
//         commonService.userOffline(users[socket.id]);
//         // remove saved socket from users object
//         // delete users[socket.id];
//       });

//     socket.on('join', (data) => {
//         // console.log('data in "join": ', data);
//         socket.join(data.room);
//         socket.broadcast.to(data.room).emit('user joined');
//     });

//     socket.on('message', (data) => {
//         // console.log('data in "message": ', data);
//         commonService.addMessage(data.from_user, data.to_user, data.message, data.image);
//         // io.emit('totalMessageCountUpdate', {
//         //   total: 0,
//         //   users: 0,
//         // });
//         // io.in(data.room).emit('new message', {user: data.user, message: data.message});
//         io.in(data.room).emit('new message', data);
//     });


//     socket.on("register", (email) => {

//         users[email] = socket.id;
//         console.log(`${email} registered with socket ID: ${socket.id}`);
//     });

//     socket.on("call-user", ({ from, targetEmail, live_token, live_channelName, live_uid, live_appId }) => {

       
//         if (users[targetEmail]) {
//             io.to(users[targetEmail]).emit("incoming-call", { from, targetEmail, live_token, live_channelName, live_uid, live_appId});
//         }
//     });

//     socket.on("accept-call", ({ from, targetEmail, channel }) => {
//         console.log('call-accept');
//         if (users[from]) {
//             io.to(users[from]).emit("call-accepted", { channel });
//         }
//     });

//     socket.on("reject-call", ({ from }) => {
//         if (users[from]) {
//             io.to(users[from]).emit("call-rejected");
//         }
//     });

//     socket.on("disconnect", () => {
//         for (let email in users) {
//             if (users[email] === socket.id) {
//                 delete users[email];
//                 break;
//             }
//         }
//     console.log("User disconnected:", socket.id);
//     });

// });



 

//llamada Get device list -> https://docs.samsungknox.com/devref/knox-guard/index.htm#tag/Device/operation/getDevicesUsingPOST

 






// var corsOptions = {
// 	origin: 'http://localhost:4200/',
// 	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/messages', messagesRouter);


var signedAccessToken;
app.use('/tokens', async(req, res) => {

  console.log('req.body',req.body);

  var publicKey = req.body.publicKey

  var clientId = req.body.clientId;

  var signedClientId = knoxTokenLibraryJs.generateSignedClientIdentifierJWT("keys.json", clientId )

 
  var data = JSON.stringify({

    "clientIdentifierJwt": signedClientId,

    "base64EncodedStringPublicKey": publicKey

  });

   

  var config = {    

    headers: {

      'Content-Type': 'application/json'

    },

    method: 'post',

    url: 'https://us-kcs-api.samsungknox.com/ams/v1/users/accesstoken',

    data : data

  };

   

  axios(config)

  .then(function (response) {

    let accessToken = response.data.accessToken;

    signedAccessToken = knoxTokenLibraryJs.generateSignedAccessTokenJWT("keys.json", accessToken);

  })

  .catch(function (error) {

    res.status(500).send(['Error, verify informations and try again', error]);

  });

 

  setTimeout(() => {

    res.json({signedAccessToken});

  }, 5000)

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});




module.exports = app;
server.listen(port, () => {
    console.log(`started on port: ${port}`);
});