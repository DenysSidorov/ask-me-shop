// const User = require('../models/user');
// const mongoose = require('../connection/index');
// var ObjectId = mongoose.Types.ObjectId;
const jwt = require('jsonwebtoken'); // auth via JWT for hhtp
const passport = require('koa-passport');
import config from '../config/index.js';


module.exports.logIn = async (ctx, next) => {

  // опции @https://github.com/jaredhanson/passport/blob/master/lib/middleware/authenticate.js
  // можно передать и функцию
  // имя local паспорт берет из локальной стратеции из мидлвер
  await passport.authenticate('local', function (err, user) {
      if (err) {
        ctx.throw(400, err);
      }
      if (user == false) {
        ctx.body = "Login failed";
      } else {
        //--payload - информация которую мы храним в токене и можем из него получать
        const payload = {
          id: user.id,
          displayName: user.displayName,
          email: user.email
        };
        //здесь создается JWT
        const token = jwt.sign(payload, config.jwt.secret, { expiresIn: '3d' });

        ctx.body = {user: user.displayName, token: 'JWT ' + token};
        // ctx.body = payload;
      }
    }
    /**{
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true // req.flash, better

        //failureMessage: true // запишет сообщение об ошибке в session.messages[]
        // assignProperty: 'something' присвоить юзера в свойство req.something
        //   - нужно для привязывания акков соц. сетей
        // если не стоит, то залогинит его вызовом req.login(user),
        //   - это поместит user.id в session.passport.user (если не стоит опция session:false)
        //   - также присвоит его в req.user
    }*/
  )(ctx, next);

}

module.exports.logOut = async (ctx, next) => {
  ctx.logout();
  ctx.session = null; // destroy session (!!!)
  ctx.redirect('/');
  ctx.body = 'Beginning! logOut'
}