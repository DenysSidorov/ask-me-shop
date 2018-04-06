let socketIO = require('socket.io');

export default (server) => {

  let io = socketIO(server);

  io.on('connection', function (client) {
    console.log(client.id + ' user connected');
    client.emit('message', 'Hello User');
    client.broadcast.emit('message', '-- Wow, new user');
    client.on('message', function (msg) {
      console.log('message: ' + msg);
      io.emit('message', msg);
    });
    client.on('disconnect', function(){
      console.log(client.id + ' user disconnect');
    });
  });
}


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