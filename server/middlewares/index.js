import compose from 'koa-compose';

import testTime from './00-testTime';

export default (app)=>{
  const all = compose([testTime]);
  app.use(all);
}