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


app.use(async function (ctx) {
  if (ctx.path !== '/') {
     ctx.redirect('/');
  }
  // await ctx.render('index');
});


var httpServer = http.createServer(app.callback()).listen(config.server.httpPort, () => {
  console.log(`Listening on port ${config.server.httpPort}`);
});

// https.createServer(app.callback()).listen(config.server.httpsPort, () => {
//   console.log(`Listening on port ${config.server.httpsPort}`);
// });

socket(httpServer);