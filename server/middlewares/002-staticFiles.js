const serve = require('koa-static');

let p = (__dirname + '../public')
export default serve(p);