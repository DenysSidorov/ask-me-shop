import compose from 'koa-compose';

import testTime from './00-testTime';
import errors from './05-errors';

export default (app)=>{
  const all = compose([testTime, errors ]);
  app.use(all);
}