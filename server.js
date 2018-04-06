import Koa from 'koa';
const http = require('http');
const https = require('https');
const app = new Koa();
const views = require('koa-views');
const serve = require('koa-static');
const path = require('path');
let socketIO = require('socket.io');

import config from './config';
import middlewares from './server/middlewares';
import socket from './server/socket';

middlewares(app);
app.use(serve(path.join(__dirname, '/server/public')));

// app.get('/', function(ctx, next){
//   res.sendFile(__dirname + '/index.html');
// });


// templates .EJS
app.use(views(path.join(__dirname, '/server/views'), { extension: 'ejs' }));


app.use(async function(ctx) {
  if(ctx.path === '/chat'){
   await ctx.render('index');
  } else {
    ctx.redirect('/');
  }
});


var httpServer = http.createServer(app.callback()).listen(config.server.httpPort, () => {
  console.log(`Listening on port ${config.server.httpPort}`);
});

// https.createServer(app.callback()).listen(config.server.httpsPort, () => {
//   console.log(`Listening on port ${config.server.httpsPort}`);
// });

socket(httpServer);