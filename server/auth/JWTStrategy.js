const passport = require('koa-passport');
import config from '../config/index';
const {Strategy, ExtractJwt} = require('passport-jwt');
import User from '../models/user';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromHeader('authorization'),
    ExtractJwt.fromBodyField('authorization'),
    ExtractJwt.fromUrlQueryParameter('authorization'),

  ]),
  secretOrKey: config.jwt.secret
}

export default (passport) => {

  passport.use(new Strategy(jwtOptions, function(jwtPayload, done) {
    // console.log(jwtPayload)
    User.findById(jwtPayload.id, function(err, user) {
      if (err) {
        return done(err, false);
      }

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    });
  }));

  return passport;
}



