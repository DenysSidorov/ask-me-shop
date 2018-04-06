const serve = require('koa-static');
const path = require('path');
export default serve(path.join(__dirname, '../public'));
