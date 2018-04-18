import Koa from 'koa';
const http = require('http');
const https = require('https');
const views = require('koa-views');
const serve = require('koa-static');
const path = require('path');
let socketIO = require('socket.io');

import config from './config';
import middlewares from './server/middlewares';
import session from './server/middlewares/session';
import socket from './server/socket';
process.env.SUPPRESS_NO_CONFIG_WARNING = true;
// Switch on before main app for ensure that we have connection in app
import  mongoose from './server/connection/index';
const app = new Koa();
session(app, mongoose);
middlewares(app);

const mainRouter = require('./server/routes/index');
app.use(mainRouter.routes());

app.use(async function (ctx) {
  if (ctx.path !== '/') {
     ctx.redirect('/');
  }
  // await ctx.render('index');
});

const port = process.env.PORT || config.server.httpPort;
// var httpServer = app.server.listen(port )

var httpServer = http.createServer(app.callback()).listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// https.createServer(app.callback()).listen(config.server.httpsPort, () => {
//   console.log(`Listening on port ${config.server.httpsPort}`);
// });

socket(httpServer);