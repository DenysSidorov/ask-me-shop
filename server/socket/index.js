let socketIO = require('socket.io');
// let socketEmitter = require('socket.io-emitter');

const socketioJwt = require('socketio-jwt'); // auth via JWT for socket.io
import config from '../config/index';

function socket(server){

  let io = socketIO(server);

  io.use(function(socket, next) {
    var handshakeData = socket.request;



    // var cookies = cookie.parse(socket.handshake.headers.cookie);

    function getCookie(name) {
      var cookie = socket.handshake.headers.cookie;
      var matches = cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    var cookieToken = getCookie('t');
    console.log(cookieToken);


    // console.log(handshakeData.cookies);
    // console.log(socket.cookies);
    // console.log(handshakeData.headers, '++++++++++');
    next();
  });
  io.on('connection',
    function (client) {
    console.log(client.id + ' user connected');
    client.emit('message', 'Hello User');
    client.broadcast.emit('message', '-- Wow, new user');
    client.on('message', function (msg) {
      console.log('message: ' + msg);
      io.emit('message', msg);
    });
    client.on('disconnect', function(){
      console.log(client.id + ' user disconnect');
      client.broadcast.emit('message', '-- Wow, Disconnect user =(');
    });
  });
}

export default socket;
/**
 Homework
 Read DOCUMENTATIONS !!!
 Here are some ideas to improve the application:

 Broadcast a message to connected users when someone connects or disconnects
 Add support for nicknames
 Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
 Add “{user} is typing” functionality
 Show who’s online
 Add private messaging
 Share your improvements!
 */