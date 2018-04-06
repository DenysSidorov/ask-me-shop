import compose from 'koa-compose';

import testTime from './00-testTime';
import views from './001-views';
import errors from './05-errors';
import staticFiles from './002-staticFiles';

export default (app)=>{
  const all = compose([testTime, staticFiles, views, errors ]);
  app.use(all);
}