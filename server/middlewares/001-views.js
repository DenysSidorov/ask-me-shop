const views = require('koa-views');
const path = require('path');

views(path.join(__dirname, '../views'), { extension: 'ejs' });

export default views;