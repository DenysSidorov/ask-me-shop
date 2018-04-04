import Koa from 'koa';
const http = require('http');
const https = require('https');
const app = new Koa();
import config from './config';
import middlewares from './server/middlewares';

middlewares(app);

http.createServer(app.callback()).listen(config.server.httpPort, () => {
  console.log(`Listening on port ${config.server.httpPort}`);
});

// https.createServer(app.callback()).listen(config.server.httpsPort, () => {
//   console.log(`Listening on port ${config.server.httpsPort}`);
// });