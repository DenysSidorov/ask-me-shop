// let passport = require('koa-passport');
let LocalStrategy = require('passport-local');
let User = require('../models/user');
// Стратегия берёт поля из req.body
// Вызывает для них функцию
export default (passport) => {
  passport.use(new LocalStrategy({
      usernameField: 'email', // 'username' by default
      passwordField: 'password',
      passReqToCallback: true, // all strategies support ctx: req for more complex cases
      session: true
    },
    function (req, email, password, done) {
      User.findOne({email}, function (err, user) {
        if (err) {
          return done(err);
        }
        console.log(user, ' -------- ');
        if (!user || !user.checkPassword(password)) {
          // don't say whether the user exists
          return done(null, false, {message: 'Нет такого пользователя или пароль неверен.'});
        }

        return done(null, user);
      });
    }
  ));
  return passport;
}