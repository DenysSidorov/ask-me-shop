import Koa from 'koa';
const http = require('http');
const https = require('https');

import config from './config';
const mainRouter = require('./server/routes/index');
import middlewares from './server/middlewares';
import session from './server/middlewares/session';
import socket from './server/socket';
process.env.SUPPRESS_NO_CONFIG_WARNING = true;
// Switch on before main app for ensure that we have connection in app
import  mongoose from './server/connection/index';
const app = new Koa();
session(app, mongoose);
middlewares(app);
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