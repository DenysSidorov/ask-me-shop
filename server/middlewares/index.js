import compose from 'koa-compose';

import testTime from './00-testTime';
import staticFiles from './002-staticFiles';
import bodyParser from './07-bodyParser';

import views from './001-views';
import errors from './05-errors';
import mongooseSession from './temp/06-mongooseSession'

export default (app)=>{
  const all = compose([testTime, staticFiles, bodyParser,  views, errors ]);
  app.use(all);
}