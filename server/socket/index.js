let socketIO = require('socket.io');

export default (server) => {

  let io = socketIO(server);

  io.on('connection', function (client) {
    console.log(client.id + ' user connected');
    client.on('chat message', function (msg) {
      console.log('message: ' + msg);
    });
    client.on('disconnect', function(){
      console.log(client.id + ' user disconnect');
    });
  });
}