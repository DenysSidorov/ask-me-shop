// can be split into files too
import UserAdmin from '../models/user';

const Router = require('koa-router');


const router = new Router();

router.get('/views', async function (ctx, next) {
  let count = ctx.session.count || 0;
  console.log(ctx.session);
  ctx.session.count = ++count;
  // let result = await UserAdmin.create({
  //   email: '1000scorpions000@gmail.com', name: '1lolkin'
  // });
  ctx.body = count;
  // ctx.body = ctx.render('./templates/index.pug', {
  //   user: 'John',
  //   count
  // });
});


// параметр ctx.params
// см. различные варианты https://github.com/pillarjs/path-to-regexp
//   - по умолчанию 1 элемент пути, можно много *
//   - по умолчанию обязателен, можно нет ?
//   - уточнение формы параметра через regexp'ы
router.get('/user/:user/hello',
  async (ctx, next) => {
    if (ctx.params.user === 'admin') {
      await next();
      return;
    }

    ctx.throw(403);
  },
  async function (ctx) {
    ctx.body = "Hello, " + ctx.params.user;
  }
);

router.get('/', async function (ctx) {
  // ctx.redirect('/views');

  ctx.body = '1';
});

module.exports = router;