let socketIO = require('socket.io');


export default (server)=>{
  let io = socketIO(server);

  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
  });
}