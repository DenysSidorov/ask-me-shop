import Koa from 'koa';
const http = require('http');
const https = require('https');
const app = new Koa();
const views = require('koa-views');
const path = require('path');

import config from './config';
import middlewares from './server/middlewares';

middlewares(app);

// app.get('/', function(ctx, next){
//   res.sendFile(__dirname + '/index.html');
// });



app.use(views(path.join(__dirname, '/views'), { extension: 'ejs' }));


app.use(async function(ctx) {
  // await ctx.render('test', { user });
});


http.createServer(app.callback()).listen(config.server.httpPort, () => {
  console.log(`Listening on port ${config.server.httpPort}`);
});

// https.createServer(app.callback()).listen(config.server.httpsPort, () => {
//   console.log(`Listening on port ${config.server.httpsPort}`);
// });