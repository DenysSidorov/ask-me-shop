
// Parse application/json, application/x-www-form-urlencoded
// NOT form/multipart!
const bodyParser = require('koa-bodyparser');

export default bodyParser({
  // jsonLimit: '56kb'
});
// ctx.request.body = ..
